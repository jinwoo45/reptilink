import { createHash } from "node:crypto";
import OpenAI from "openai";
import { isLocale } from "@/lib/i18n";
import { isSpecies } from "@/lib/identity";
import { STABLE_PROMPT, perReader } from "@/lib/entityPrompt";

/**
 * The reptilian, live. POST a conversation, receive the reply as NDJSON:
 *   {"t":"text","v":"…"}   a fragment of the reply
 *   {"t":"end"}            finished normally
 *   {"t":"declined"}       the model refused
 * Before any output, failures are plain JSON with a status code, and the
 * client answers from its local script instead.
 */

export const dynamic = "force-dynamic";

/**
 * GPT via the OpenAI Responses API. The model is configurable: set
 * OPENAI_MODEL to override the default. OPENAI_REASONING_EFFORT is sent only
 * when set, because models without reasoning reject the parameter.
 */
const MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const EFFORT = process.env.OPENAI_REASONING_EFFORT as OpenAI.ReasoningEffort | undefined;

const hasCredentials = () => Boolean(process.env.OPENAI_API_KEY);

/** Lets the page say which mode it is in before anyone types. */
export function GET() {
  return Response.json({ live: hasCredentials() }, { headers: { "Cache-Control": "no-store" } });
}

// --- abuse limits ----------------------------------------------------------
// A public page with a paid API behind it. These are per server instance, so
// they bound a single abuser rather than the whole bill — set a monthly spend
// limit on the API key as well.

const WINDOW_MS = 10 * 60 * 1000;
const PER_IP = 20;
const PER_INSTANCE_PER_MINUTE = 60;
const MAX_TURNS = 16;
const MAX_CHARS_PER_TURN = 1200;
const MAX_USER_CHARS = 600;

const hits = new Map<string, number[]>();
let instanceHits: number[] = [];

function allow(ip: string): boolean {
  const now = Date.now();
  instanceHits = instanceHits.filter((t) => now - t < 60_000);
  if (instanceHits.length >= PER_INSTANCE_PER_MINUTE) return false;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  instanceHits.push(now);
  if (hits.size > 5000) hits.clear();
  return true;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/** Only this site's own pages may call it. */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

// --- request shape -----------------------------------------------------------

type Turn = { role: "user" | "assistant"; text: string };

function parseBody(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (!isLocale(b.locale as string)) return null;
  const species = isSpecies(b.species) ? b.species : null;
  if (!Array.isArray(b.history)) return null;

  const turns: Turn[] = b.history
    .filter(
      (t): t is Turn =>
        !!t &&
        (t.role === "user" || t.role === "assistant") &&
        typeof t.text === "string" &&
        t.text.trim().length > 0
    )
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_CHARS_PER_TURN) }));

  // The API wants the first turn to be the reader's; the entity's opening
  // line, spoken before anyone typed, is dropped.
  while (turns.length && turns[0].role === "assistant") turns.shift();
  const last = turns[turns.length - 1];
  if (!last || last.role !== "user" || last.text.length > MAX_USER_CHARS) return null;

  return { locale: b.locale as Parameters<typeof perReader>[0], species, turns };
}

const json = (status: number, body: object) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, { error: "forbidden" });
  if (!hasCredentials()) return json(503, { error: "offline" });
  if (!allow(clientIp(req))) return json(429, { error: "rate_limited" });

  let parsed;
  try {
    parsed = parseBody(await req.json());
  } catch {
    parsed = null;
  }
  if (!parsed) return json(400, { error: "bad_request" });

  const client = new OpenAI();
  const ip = clientIp(req);

  // With stream: true, HTTP failures are raised here, before any output — so
  // they are still ordinary status codes the client can act on.
  let stream: AsyncIterable<OpenAI.Responses.ResponseStreamEvent>;
  try {
    stream = await client.responses.create({
      model: MODEL,
      // The stable persona first and the per-reader lines after it, so the
      // long prefix is identical on every request and can be cached.
      instructions: `${STABLE_PROMPT}\n\n${perReader(parsed.locale, parsed.species)}`,
      input: parsed.turns.map((t) => ({ role: t.role, content: t.text })),
      // Replies are two to five sentences; this bounds the cost of any one.
      max_output_tokens: 1024,
      ...(EFFORT ? { reasoning: { effort: EFFORT } } : {}),
      // Conversations are not kept on OpenAI's side.
      store: false,
      prompt_cache_key: "reptilink-entity",
      // OpenAI's per-user abuse signal, as a hash rather than the address.
      safety_identifier: createHash("sha256").update(ip).digest("hex").slice(0, 32),
      stream: true,
    });
  } catch (error) {
    if (error instanceof OpenAI.RateLimitError) return json(429, { error: "rate_limited" });
    if (error instanceof OpenAI.AuthenticationError) return json(503, { error: "offline" });
    if (error instanceof OpenAI.APIError) return json(502, { error: "upstream", status: error.status });
    return json(502, { error: "upstream" });
  }

  const encoder = new TextEncoder();
  const line = (o: object) => encoder.encode(JSON.stringify(o) + "\n");

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      let refused = false;
      try {
        for await (const event of stream) {
          if (event.type === "response.output_text.delta") {
            wrote = true;
            controller.enqueue(line({ t: "text", v: event.delta }));
          } else if (event.type === "response.refusal.delta") {
            refused = true;
          } else if (event.type === "response.failed" || event.type === "error") {
            throw new Error("response failed");
          }
        }
        controller.enqueue(line({ t: refused && !wrote ? "declined" : "end" }));
      } catch {
        controller.enqueue(line({ t: "error" }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

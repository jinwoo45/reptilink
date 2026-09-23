"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReptilianEye from "./ReptilianEye";
import { LOCALE_META, isLocale, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import {
  isEntityLine,
  lineOriginal,
  lineText,
  openingFor,
  respond,
  toOriginal,
  type EntityLine,
} from "@/data/entity";
import { KEYS, readStored, writeStored } from "@/lib/storage";
import { isSpecies, type Species } from "@/lib/identity";

/**
 * The first thing a visitor meets: the reptilian, already talking.
 *
 * Replies come from the live model when the site has credentials, and from
 * the local script otherwise — or whenever the live link fails. Script lines
 * are stored as keys and re-render in any language; live replies are stored
 * as the text they were written in, and say which language that was.
 */
type Message =
  | { id: number; from: "entity"; line: EntityLine }
  | { id: number; from: "entity"; text: string; language: Locale }
  | { id: number; from: "you"; text: string; language: Locale };

type Stored = { messages: Message[]; turn: number };

const MAX_MESSAGES = 120;
const MAX_INPUT = 600;

function isMessage(v: unknown): v is Message {
  if (!v || typeof v !== "object") return false;
  const m = v as Record<string, unknown>;
  if (typeof m.id !== "number") return false;
  if (m.from === "entity" && "line" in m) return isEntityLine(m.line);
  if (m.from === "entity" || m.from === "you") {
    return typeof m.text === "string" && isLocale(m.language as string);
  }
  return false;
}

function load(): Stored | null {
  const raw = readStored(KEYS.channel);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Stored>;
    const messages = Array.isArray(parsed.messages)
      ? parsed.messages.filter(isMessage).slice(-MAX_MESSAGES)
      : [];
    if (!messages.length) return null;
    return { messages, turn: Number.isInteger(parsed.turn) ? (parsed.turn as number) : 0 };
  } catch {
    return null;
  }
}

const fresh = (species: Species | null): Stored => ({
  messages: [{ id: 0, from: "entity", line: openingFor(species) }],
  turn: 0,
});

const textOf = (m: Message, locale: Locale) => ("line" in m ? lineText(m.line, locale) : m.text);

export default function Encounter({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [state, setState] = useState<Stored | null>(null);
  const [draft, setDraft] = useState("");
  const [receiving, setReceiving] = useState(false);
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const [shown, setShown] = useState<number[]>([]);
  const [species, setSpecies] = useState<Species | null>(null);
  const [live, setLive] = useState<boolean | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const pending = useRef<number | undefined>(undefined);

  useEffect(() => {
    const stored = readStored(KEYS.species);
    const declared = isSpecies(stored) ? stored : null;
    setSpecies(declared);
    setState(load() ?? fresh(declared));

    fetch("/api/entity", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { live?: boolean }) => setLive(Boolean(d.live)))
      .catch(() => setLive(false));

    return () => window.clearTimeout(pending.current);
  }, []);

  useEffect(() => {
    // Written once a reply settles, not on every streamed fragment.
    if (state && streamingId === null) writeStored(KEYS.channel, JSON.stringify(state));
  }, [state, streamingId]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [state, receiving]);

  const nextId = (messages: Message[]) =>
    messages.length ? messages[messages.length - 1].id + 1 : 0;

  function append(message: Message) {
    setState((prev) =>
      prev && { ...prev, messages: [...prev.messages, message].slice(-MAX_MESSAGES) }
    );
  }

  /** The local script's answer, after a pause long enough to feel like distance. */
  function answerLocally(text: string, turn: number) {
    pending.current = window.setTimeout(() => {
      setState((prev) =>
        prev && {
          turn: prev.turn + 1,
          messages: [
            ...prev.messages,
            { id: nextId(prev.messages), from: "entity" as const, line: respond(text, turn) },
          ].slice(-MAX_MESSAGES),
        }
      );
      setReceiving(false);
    }, 700 + Math.random() * 600);
  }

  async function answerLive(text: string, history: Message[], turn: number) {
    let res: Response;
    try {
      res = await fetch("/api/entity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          species,
          history: history.map((m) => ({
            role: m.from === "you" ? "user" : "assistant",
            text: textOf(m, locale),
          })),
        }),
      });
    } catch {
      return answerLocally(text, turn);
    }

    if (!res.ok || !res.body) {
      if (res.status === 503) setLive(false);
      return answerLocally(text, turn);
    }

    const id = nextId(history);
    let got = "";
    const write = (value: string) =>
      setState((prev) => {
        if (!prev) return prev;
        const rest = prev.messages.filter((m) => m.id !== id);
        return {
          ...prev,
          messages: [...rest, { id, from: "entity" as const, text: value, language: locale }],
        };
      });

    setStreamingId(id);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let outcome: "end" | "declined" | "error" = "error";

    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) >= 0) {
          const raw = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (!raw.trim()) continue;
          const event = JSON.parse(raw) as { t: string; v?: string };
          if (event.t === "text" && event.v) {
            got += event.v;
            write(got);
          } else if (event.t === "end" || event.t === "declined" || event.t === "error") {
            outcome = event.t;
          }
        }
      }
    } catch {
      outcome = "error";
    }

    setStreamingId(null);
    setReceiving(false);

    if (outcome === "declined") {
      // A declined reply is replaced, not left half-said.
      setState((prev) =>
        prev && {
          turn: prev.turn + 1,
          messages: [
            ...prev.messages.filter((m) => m.id !== id),
            { id, from: "entity" as const, line: { kind: "declined" } },
          ],
        }
      );
    } else if (!got.trim()) {
      setState((prev) => prev && { ...prev, messages: prev.messages.filter((m) => m.id !== id) });
      setReceiving(true);
      answerLocally(text, turn);
    } else {
      setState((prev) => prev && { ...prev, turn: prev.turn + 1 });
    }
  }

  function send(raw?: string) {
    const text = (raw ?? draft).trim().slice(0, MAX_INPUT);
    if (!text || receiving || !state) return;
    setDraft("");
    const mine: Message = { id: nextId(state.messages), from: "you", text, language: locale };
    const history = [...state.messages, mine];
    append(mine);
    setReceiving(true);
    if (live) void answerLive(text, history, state.turn);
    else answerLocally(text, state.turn);
    input.current?.focus();
  }

  function close() {
    window.clearTimeout(pending.current);
    setReceiving(false);
    setShown([]);
    setState(fresh(species));
  }

  function toggle(id: number, target: HTMLElement) {
    const article = target.closest("article");
    setShown((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    requestAnimationFrame(() => article?.scrollIntoView({ block: "nearest" }));
  }

  const asked = state?.messages.some((m) => m.from === "you") ?? false;
  const recognised = species === "reptilian";

  return (
    <section className="enc">
      <div className="enc__eye">
        <ReptilianEye awake={receiving} recognised={recognised} />
        <p className="gate__status enc__status">
          <span className={receiving ? "toxic" : recognised ? "acid" : "dim"}>●</span>
          <span className="mono-label">
            {receiving ? dict.receiving : recognised ? "ENTITY RECOGNISED" : "CHANNEL OPEN"}
          </span>
          {live !== null && (
            <span className={`mono-label enc__mode${live ? " toxic" : ""}`}>
              {live ? "LIVE LINK" : "LOCAL SCRIPT"}
            </span>
          )}
        </p>
      </div>

      <div className="enc__talk">
        <div className="enc__log" ref={log} aria-live="polite">
          {state?.messages.map((m) => {
            if (m.from === "you") {
              return (
                <article key={m.id} className="msg msg--you">
                  <p className="mono-label">
                    {dict.you}
                    {m.language !== locale && ` · ${LOCALE_META[m.language].native}`}
                  </p>
                  <p className="msg__text" lang={m.language}>
                    {m.text}
                  </p>
                </article>
              );
            }
            const open = shown.includes(m.id);
            const streaming = m.id === streamingId;
            const language = "line" in m ? locale : m.language;
            return (
              <article key={m.id} className="msg msg--entity">
                <p className="mono-label">
                  ENTITY
                  {language !== locale && ` · ${LOCALE_META[language].native}`}
                </p>
                <p className="msg__text" lang={language}>
                  {textOf(m, locale)}
                  {streaming && <span className="caret" style={{ marginLeft: 4 }} />}
                </p>
                {!streaming && (
                  <button className="msg__orig" onClick={(e) => toggle(m.id, e.currentTarget)}>
                    {open ? dict.hideOriginal : dict.viewOriginal}
                  </button>
                )}
                {open && (
                  <p className="msg__glyphs" aria-hidden>
                    {"line" in m ? lineOriginal(m.line) : toOriginal(m.text)}
                  </p>
                )}
              </article>
            );
          })}

          {receiving && streamingId === null && (
            <p className="msg__typing mono-label flicker">
              {dict.receiving} <span className="caret" />
            </p>
          )}
        </div>

        {/* A first-time visitor should never wonder what to do. */}
        {!asked && (
          <ul className="enc__suggest">
            {dict.suggestions.map((q) => (
              <li key={q}>
                <button className="chip" onClick={() => send(q)} disabled={receiving}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="chan__input enc__input">
          <textarea
            ref={input}
            value={draft}
            maxLength={MAX_INPUT}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // isComposing guards the IME: in Korean, Japanese and Thai input
              // Enter confirms a candidate before it ever means "send".
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={dict.askPlaceholder}
            rows={2}
            autoFocus
          />
          <button className="btn gate__enter--ready" onClick={() => send()} disabled={!draft.trim() || receiving}>
            {dict.send}
          </button>
        </div>

        <div className="enc__foot">
          <p className="enc__notice">{live ? dict.channelNoticeLive : dict.channelNotice}</p>
          <div className="enc__actions">
            <span className="mono-label">
              {dict.identityDeclared}:{" "}
              <span className={recognised ? "acid" : undefined}>{species ? dict[species] : "—"}</span>
            </span>
            <Link href="/?gate" className="chan__redeclare">
              ↺ {dict.redeclare}
            </Link>
            <button className="chan__redeclare" onClick={close}>
              ✕ {dict.clearChannel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

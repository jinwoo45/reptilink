import { ImageResponse } from "next/og";
import { decodeScan, scanResult } from "@/data/quiz";
import { resolveLocale } from "@/lib/i18n";
import { OG_SIZE, defaultCard, nodeCard, scanCard } from "@/lib/ogCards";
import { ARCHIVE_BY_SLUG } from "@/data/archive";

/**
 * Preview images for links that carry state a static image cannot know:
 *   /og?r=ko01230            → the shared scan, in the sharer's language
 *   /og?node=naga&lang=ja    → an archive node, in the reader's language
 *   /og?lang=ja              → the default card
 * Output is a pure function of the query, so it caches hard.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const shared = decodeScan(params.get("r"));
  const node = ARCHIVE_BY_SLUG[params.get("node") ?? ""];
  const lang = resolveLocale(params.get("lang") ?? undefined);

  const card = shared
    ? await scanCard(shared.locale, scanResult(shared.answers, shared.locale))
    : node
      ? await nodeCard(lang, node)
      : await defaultCard(lang);

  return new ImageResponse(card.element, {
    ...OG_SIZE,
    fonts: card.fonts,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}

import type { Metadata } from "next";
import Entry from "@/components/Entry";
import { getDict } from "@/data/dict";
import { decodeScan, scanResult } from "@/data/quiz";

const OG = { width: 1200, height: 630 };

/**
 * The entry gate is also where shared scans land, so its preview depends on
 * the link: a shared scan unfurls as that scan's card, in the sharer's
 * language — the people who see it are the sharer's own audience.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const r = (await searchParams).r;
  const code = typeof r === "string" ? r : null;
  const shared = decodeScan(code);

  if (shared && code) {
    const result = scanResult(shared.answers, shared.locale);
    const dict = getDict(shared.locale);
    const title = `REPTILIAN INDEX ${result.index.toFixed(1)}% — ${result.klass}`;
    const image = { url: `/og?r=${code}`, ...OG, alt: title };
    return {
      title: { absolute: `${title} — REPTILINK` },
      description: dict.receivedScan,
      openGraph: {
        type: "website",
        siteName: "REPTILINK",
        title,
        description: dict.receivedScan,
        locale: shared.locale,
        images: [image],
      },
      twitter: { card: "summary_large_image", title, images: [image.url] },
    };
  }

  const image = { url: "/og", ...OG, alt: "REPTILINK" };
  return {
    openGraph: {
      type: "website",
      siteName: "REPTILINK",
      title: "REPTILINK — EVERY LANGUAGE. SAME SIGNAL.",
      description: "A multilingual underground network for the world's strangest stories.",
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}

export default function Page() {
  return <Entry />;
}

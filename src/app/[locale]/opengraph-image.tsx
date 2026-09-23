import { ImageResponse } from "next/og";
import { LOCALES, resolveLocale } from "@/lib/i18n";
import { OG_SIZE, defaultCard } from "@/lib/ogCards";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "REPTILINK — EVERY LANGUAGE. SAME SIGNAL.";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** Every page under a locale unfurls with the tagline in that locale (§27). */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const card = await defaultCard(resolveLocale((await params).locale));
  return new ImageResponse(card.element, { ...OG_SIZE, fonts: card.fonts });
}

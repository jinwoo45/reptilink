import type { Metadata } from "next";
import Radar from "@/components/Radar";
import { getDict } from "@/data/dict";
import { resolveLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);
  return {
    title: "REPTI RADAR",
    description: dict.radarIntro,
    alternates: localeAlternates(locale, "/radar"),
  };
}

export default async function RadarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">GLOBAL SIGNAL NETWORK</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          REPTI RADAR
        </h1>
        <p className="page__intro">{dict.radarIntro}</p>
      </div>
      <Radar locale={locale} dict={dict} />
    </main>
  );
}

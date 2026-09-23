import Link from "next/link";
import type { Metadata } from "next";
import Encounter from "@/components/Encounter";
import ArchiveCarousel from "@/components/ArchiveCarousel";
import ArchiveTable from "@/components/ArchiveTable";
import { getDict } from "@/data/dict";
import { resolveLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import { ARCHIVE } from "@/data/archive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);
  return {
    title: { absolute: `REPTILINK — ${dict.tagline}` },
    description: dict.channelIntro,
    alternates: localeAlternates(locale, ""),
    openGraph: { title: "REPTILINK", description: dict.tagline, locale },
  };
}

/**
 * Home is the encounter, laid out as Blur lays out its front page: one thing
 * large — here the reptilian, talking — then a featured strip, then a dense
 * table for whoever wants to go deeper.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="enc-page">
      <div className="wrap">
        <Encounter locale={locale} dict={dict} />
      </div>

      <section className="wrap home__block">
        <div className="home__head">
          <h2 className="mono-label">CLASSIFIED · MOST CONNECTED</h2>
          <Link href={`/${locale}/archive`} className="home__all">
            THE ARCHIVE →
          </Link>
        </div>
        <ArchiveCarousel locale={locale} />
      </section>

      <section className="wrap home__block">
        <ArchiveTable locale={locale} limit={10} />
        <Link href={`/${locale}/archive`} className="btn home__more">
          {`ALL ${ARCHIVE.length} ENTRIES →`}
        </Link>
      </section>
    </main>
  );
}

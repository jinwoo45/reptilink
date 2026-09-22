import Link from "next/link";
import type { Metadata } from "next";
import Feed from "@/components/Feed";
import { getDict } from "@/data/dict";
import { resolveLocale, LOCALE_META, LOCALES } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import { ARCHIVE, archiveTitle } from "@/data/archive";
import { NODES } from "@/data/nodes";
import { SIGNALS } from "@/data/signals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);
  return {
    title: { absolute: `REPTILINK — ${dict.tagline}` },
    description: dict.taglineAlt,
    alternates: localeAlternates(locale, ""),
    openGraph: { title: "REPTILINK", description: dict.tagline, locale },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  const featured = ARCHIVE.slice(0, 8);

  return (
    <main className="page">
      <section className="wrap hero">
        <p className="mono-label">REPTILIAN SIGNAL / {LOCALE_META[locale].code}</p>
        <h1 className="display rgb" data-text={dict.tagline} style={{ marginTop: 14 }}>
          {dict.tagline}
        </h1>
        <p className="page__intro">{dict.taglineAlt}</p>

        {/* Everything here is a count of what this build contains. */}
        <dl className="hero__stats">
          <div>
            <dt className="mono-label">{dict.transmissions}</dt>
            <dd className="toxic">{SIGNALS.length}</dd>
          </div>
          <div>
            <dt className="mono-label">{dict.archiveNodes}</dt>
            <dd>{ARCHIVE.length}</dd>
          </div>
          <div>
            <dt className="mono-label">{dict.availableLanguages}</dt>
            <dd>{LOCALES.length}</dd>
          </div>
          <div>
            <dt className="mono-label">NODES</dt>
            <dd>{NODES.filter((n) => !n.fiction).length}</dd>
          </div>
        </dl>
        <p className="note" style={{ marginTop: 16 }}>
          {dict.countedNotice}
        </p>
      </section>

      <section className="wrap" style={{ marginTop: 54 }}>
        <div className="page__head">
          <h2 className="display--sm">{dict.globalFeed}</h2>
          <p className="page__intro">{dict.feedIntro}</p>
        </div>
        <Feed locale={locale} dict={dict} showCompose={false} limit={4} />
        <Link
          href={`/${locale}/signal`}
          className="btn"
          style={{ marginTop: 20 }}
        >
          {dict.globalFeed} →
        </Link>
      </section>

      <section className="wrap" style={{ marginTop: 64 }}>
        <div className="page__head">
          <h2 className="display--sm">THE ARCHIVE</h2>
          <p className="page__intro">{dict.archiveIntro}</p>
        </div>
        <ul className="chips">
          {featured.map((n) => (
            <li key={n.slug}>
              <Link href={`/${locale}/archive/${n.slug}`} className="chip">
                {archiveTitle(n, locale)}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/${locale}/archive`} className="chip chip--more">
              +{ARCHIVE.length - featured.length}
            </Link>
          </li>
        </ul>
      </section>

      <section className="wrap" style={{ marginTop: 64 }}>
        <div className="split">
          <Link href={`/${locale}/radar`} className="split__card panel pad">
            <p className="mono-label">REPTI RADAR</p>
            <p className="display--sm" style={{ marginTop: 10 }}>
              {NODES.filter((n) => !n.fiction).length} NODES
            </p>
            <p className="dim" style={{ marginTop: 10, fontSize: 12 }}>
              {dict.radarIntro}
            </p>
          </Link>
          <Link href={`/${locale}/scan`} className="split__card panel pad">
            <p className="mono-label">REPTILIAN INDEX</p>
            <p className="display--sm toxic" style={{ marginTop: 10 }}>
              ██████████░░ ?
            </p>
            <p className="dim" style={{ marginTop: 10, fontSize: 12 }}>
              {dict.scanIntro}
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import Encounter from "@/components/Encounter";
import { getDict } from "@/data/dict";
import { resolveLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import { ARCHIVE } from "@/data/archive";
import { SIGNALS } from "@/data/signals";
import { NODES } from "@/data/nodes";

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
 * Home is the encounter. Everything else on the network is one level down,
 * for whoever wants to go deeper after the conversation.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  const deeper = [
    { href: "/archive", label: "THE ARCHIVE", count: ARCHIVE.length, text: dict.archiveIntro },
    { href: "/signal", label: "SIGNAL", count: SIGNALS.length, text: dict.feedIntro },
    { href: "/radar", label: "REPTI RADAR", count: NODES.filter((n) => !n.fiction).length, text: dict.radarIntro },
    { href: "/scan", label: "REPTILIAN INDEX", count: null, text: dict.scanIntro },
  ];

  return (
    <main className="wrap enc-page">
      <Encounter locale={locale} dict={dict} />

      <section className="deeper">
        <h2 className="mono-label">{dict.goDeeper}</h2>
        <div className="deeper__grid">
          {deeper.map((d) => (
            <Link key={d.href} href={`/${locale}${d.href}`} className="deeper__card panel">
              <span className="mono-label">
                {d.label}
                {d.count !== null && <span className="toxic"> · {d.count}</span>}
              </span>
              <span className="deeper__text">{d.text}</span>
              <span className="deeper__go">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

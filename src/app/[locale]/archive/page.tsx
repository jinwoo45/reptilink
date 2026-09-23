import Link from "next/link";
import type { Metadata } from "next";
import ArchiveGraph from "@/components/ArchiveGraph";
import ArchiveTable from "@/components/ArchiveTable";
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
    title: "THE ARCHIVE",
    description: dict.archiveIntro,
    alternates: localeAlternates(locale, "/archive"),
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">KNOWLEDGE GRAPH</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          THE ARCHIVE
        </h1>
        <p className="page__intro">{dict.archiveIntro}</p>
      </div>

      <ArchiveTable locale={locale} showSummary />

      <section style={{ marginTop: 48 }}>
        <h2 className="mono-label">KNOWLEDGE GRAPH</h2>
        <div style={{ marginTop: 12 }}>
          <ArchiveGraph locale={locale} />
        </div>
      </section>
    </main>
  );
}

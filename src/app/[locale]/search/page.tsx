import type { Metadata } from "next";
import Search from "@/components/Search";
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
    title: dict.search,
    description: dict.searchIntro,
    alternates: localeAlternates(locale, "/search"),
    // Result pages are the reader's own query; the archive pages are what to index.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">CROSS-LINGUAL</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          {dict.search}
        </h1>
        <p className="page__intro">{dict.searchIntro}</p>
      </div>
      <Search locale={locale} dict={dict} />
    </main>
  );
}

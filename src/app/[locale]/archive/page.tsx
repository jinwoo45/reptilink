import Link from "next/link";
import type { Metadata } from "next";
import ArchiveGraph from "@/components/ArchiveGraph";
import { getDict } from "@/data/dict";
import { resolveLocale, resolveTranslation } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import {
  ARCHIVE,
  CLASSIFICATION_MARK,
  type ArchiveText,
} from "@/data/archive";

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

      {/* A plain GET form: it works before, and without, any JavaScript. */}
      <form
        action={`/${locale}/search`}
        className="searchbar searchbar--compact"
        role="search"
      >
        <span className="searchbar__icon" aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          name="q"
          placeholder={dict.searchPlaceholder}
          aria-label={dict.search}
        />
        <button className="btn" type="submit">
          {dict.search}
        </button>
      </form>

      <ArchiveGraph locale={locale} />

      <ul className="nodes" style={{ marginTop: 26 }}>
        {ARCHIVE.map((node) => {
          const t = resolveTranslation<ArchiveText>(
            node.sourceLanguage,
            node.i18n,
            locale
          );
          return (
            <li key={node.slug}>
              <Link href={`/${locale}/archive/${node.slug}`}>
                <span className="nodes__mark">
                  {CLASSIFICATION_MARK[node.classification]}
                </span>
                <span>
                  <span className="nodes__title">{t.value.title}</span>
                  <span
                    className="nodes__sum"
                    style={{ display: "block" }}
                    lang={t.language}
                  >
                    {t.value.summary}
                  </span>
                </span>
                <span
                  className={`tag tag--${node.classification.toLowerCase()}`}
                >
                  {node.classification}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

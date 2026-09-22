import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveGraph from "@/components/ArchiveGraph";
import ReptilianEye from "@/components/ReptilianEye";
import SignalCard from "@/components/SignalCard";
import { getDict } from "@/data/dict";
import {
  LOCALES,
  LOCALE_META,
  resolveLocale,
  resolveTranslation,
} from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";
import {
  ARCHIVE,
  ARCHIVE_BY_SLUG,
  CLASSIFICATION_MARK,
  CLASSIFICATION_NOTE,
  archiveTitle,
  availableLanguageCount,
  type ArchiveText,
} from "@/data/archive";
import { SIGNALS } from "@/data/signals";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ARCHIVE.map((node) => ({ locale, slug: node.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const node = ARCHIVE_BY_SLUG[slug];
  if (!node) return {};
  const t = resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, locale);
  return {
    title: t.value.title,
    description: t.value.summary,
    alternates: localeAlternates(locale, `/archive/${slug}`),
    openGraph: {
      title: `${t.value.title} — REPTILINK`,
      description: t.value.summary,
      locale,
    },
  };
}

export default async function ArchiveNodePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const dict = getDict(locale);
  const node = ARCHIVE_BY_SLUG[slug];
  if (!node) notFound();

  const t = resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, locale);
  const related = SIGNALS.filter((s) => s.archive === slug);

  return (
    <main className="page wrap">
      <Link href={`/${locale}/archive`} className="btn btn--ghost">
        ← {dict.back}
      </Link>

      <div className="page__head" style={{ marginTop: 14 }}>
        <p className="mono-label">
          {CLASSIFICATION_MARK[node.classification]} {node.classification}
        </p>
        <h1 className="display" style={{ marginTop: 10 }}>
          {t.value.title}
        </h1>
      </div>

      <div className="detail">
        <div>
          <p className="detail__body" lang={t.language}>
            {t.value.summary}
          </p>

          {t.isTranslated && (
            <p className="tag" style={{ marginTop: 18 }}>
              {dict.translatedFrom}{" "}
              {LOCALE_META[t.originalLanguage].english.toUpperCase()}
            </p>
          )}
          {t.isPending && (
            <p className="tag tag--unknown" style={{ marginTop: 18 }}>
              {dict.translationPending}
            </p>
          )}

          <p className="note" style={{ marginTop: 26 }}>
            {CLASSIFICATION_NOTE[locale][node.classification]}
          </p>

          <h2 className="mono-label" style={{ marginTop: 40 }}>
            {dict.connectedNodes}
          </h2>
          <ul className="chips" style={{ marginTop: 12 }}>
            {node.edges.map((e) => {
              const target = ARCHIVE_BY_SLUG[e];
              if (!target) return null;
              return (
                <li key={e}>
                  <Link href={`/${locale}/archive/${e}`} className="chip">
                    {archiveTitle(target, locale)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {related.length > 0 && (
            <>
              <h2 className="mono-label" style={{ marginTop: 40 }}>
                {dict.relatedSignals}
              </h2>
              <div className="feed" style={{ marginTop: 12 }}>
                {related.map((s) => (
                  <SignalCard key={s.id} signal={s} locale={locale} dict={dict} />
                ))}
              </div>
            </>
          )}
        </div>

        <aside>
          {node.art === "eye" && (
            <div className="panel pad" style={{ marginBottom: 22 }}>
              <ReptilianEye className="eye--sm" />
            </div>
          )}
          <div className="meta">
            <div className="meta__row">
              <p className="mono-label">{dict.classification}</p>
              <p className={`tag tag--${node.classification.toLowerCase()}`}>
                {CLASSIFICATION_MARK[node.classification]} {node.classification}
              </p>
            </div>
            <div className="meta__row">
              <p className="mono-label">{dict.status}</p>
              <p>{node.classification === "FACT" ? "DOCUMENTED" : dict.unverified}</p>
            </div>
            <div className="meta__row">
              <p className="mono-label">{dict.sourceLanguage}</p>
              <p>{LOCALE_META[node.sourceLanguage].english.toUpperCase()}</p>
            </div>
            <div className="meta__row">
              <p className="mono-label">{dict.availableLanguages}</p>
              <p className="toxic">{availableLanguageCount(node)}</p>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <ArchiveGraph locale={locale} highlight={node.slug} />
          </div>
        </aside>
      </div>
    </main>
  );
}

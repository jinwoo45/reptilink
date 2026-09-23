import Link from "next/link";
import { CLASSIFICATION_MARK, type ArchiveText } from "@/data/archive";
import { LINKS, mostConnected } from "@/lib/archiveStats";
import { resolveTranslation, type Locale } from "@/lib/i18n";

/**
 * The strip under the hero, as Blur runs featured collections under its hero:
 * the most connected entries, each card drawn from its classification — the
 * archive has no pictures, so the mark is the picture.
 */
export default function ArchiveCarousel({ locale }: { locale: Locale }) {
  return (
    <div className="carousel" role="list">
      {mostConnected(8).map((node) => {
        const t = resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, locale);
        const cls = node.classification.toLowerCase();
        return (
          <Link
            key={node.slug}
            href={`/${locale}/archive/${node.slug}`}
            className={`card card--${cls}`}
            role="listitem"
          >
            <span className="card__mark" aria-hidden>
              {CLASSIFICATION_MARK[node.classification]}
            </span>
            <span className="card__foot">
              <span className="card__title" lang={t.language}>
                {t.value.title}
              </span>
              <span className="card__meta">
                <span className={`tag tag--${cls}`}>{node.classification}</span>
                <span className="mono-label">LINKS {LINKS[node.slug]}</span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

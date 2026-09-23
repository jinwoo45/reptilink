"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ARCHIVE, CLASSIFICATION_MARK, type ArchiveText, type Classification } from "@/data/archive";
import { CITED_BY, CLASS_COUNT, CLASS_ORDER, LINKS } from "@/lib/archiveStats";
import { LOCALE_META, resolveTranslation, type Locale } from "@/lib/i18n";

type SortKey = "links" | "cited" | "name";

/**
 * The archive as a terminal table: tabs by classification, sortable columns,
 * numbers right-aligned. Every figure is a count over this build's data.
 */
export default function ArchiveTable({
  locale,
  limit,
  showSummary = false,
}: {
  locale: Locale;
  limit?: number;
  showSummary?: boolean;
}) {
  const [tab, setTab] = useState<Classification | "ALL">("ALL");
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: "links", desc: true });

  const rows = useMemo(() => {
    const pool = tab === "ALL" ? ARCHIVE : ARCHIVE.filter((n) => n.classification === tab);
    const withText = pool.map((node) => ({
      node,
      t: resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, locale),
    }));
    const dir = sort.desc ? -1 : 1;
    withText.sort((a, b) => {
      if (sort.key === "name") return dir * a.t.value.title.localeCompare(b.t.value.title, locale);
      const va = sort.key === "links" ? LINKS[a.node.slug] : CITED_BY[a.node.slug];
      const vb = sort.key === "links" ? LINKS[b.node.slug] : CITED_BY[b.node.slug];
      return dir * (va - vb) || a.node.slug.localeCompare(b.node.slug);
    });
    return limit ? withText.slice(0, limit) : withText;
  }, [tab, sort, locale, limit]);

  function sortBy(key: SortKey) {
    setSort((s) => (s.key === key ? { key, desc: !s.desc } : { key, desc: key !== "name" }));
  }

  const arrow = (key: SortKey) => (sort.key === key ? (sort.desc ? " ↓" : " ↑") : "");
  const tabs: (Classification | "ALL")[] = ["ALL", ...CLASS_ORDER.filter((c) => CLASS_COUNT[c] > 0)];

  return (
    <div className="atable">
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`tabs__tab${tab === t ? " tabs__tab--on" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "ALL" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
            <span className="tabs__n">{t === "ALL" ? ARCHIVE.length : CLASS_COUNT[t]}</span>
          </button>
        ))}
      </div>

      <div className="atable__head" role="row">
        <span>#</span>
        <button onClick={() => sortBy("name")}>NODE{arrow("name")}</button>
        <span>CLASS</span>
        <button className="num" onClick={() => sortBy("links")}>
          LINKS{arrow("links")}
        </button>
        <button className="num" onClick={() => sortBy("cited")}>
          SIGNALS{arrow("cited")}
        </button>
        <span className="num atable__src">SOURCE</span>
      </div>

      {rows.map(({ node, t }, i) => (
        <Link key={node.slug} href={`/${locale}/archive/${node.slug}`} className="atable__row" role="row">
          <span className="atable__rank">{i + 1}</span>
          <span className="atable__node">
            <span className={`atable__mark atable__mark--${node.classification.toLowerCase()}`}>
              {CLASSIFICATION_MARK[node.classification]}
            </span>
            <span className="atable__title">
              <span lang={t.language}>{t.value.title}</span>
              {showSummary && (
                <span className="atable__sum" lang={t.language}>
                  {t.value.summary}
                </span>
              )}
            </span>
          </span>
          <span>
            <span className={`tag tag--${node.classification.toLowerCase()}`}>{node.classification}</span>
          </span>
          <span className="num">{LINKS[node.slug]}</span>
          <span className={`num${CITED_BY[node.slug] ? " up" : " zero"}`}>{CITED_BY[node.slug]}</span>
          <span className="num atable__src">{LOCALE_META[node.sourceLanguage].code}</span>
        </Link>
      ))}
    </div>
  );
}

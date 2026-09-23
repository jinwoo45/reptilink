"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SignalCard from "./SignalCard";
import { LOCALE_META, resolveTranslation, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import { CLASSIFICATION_MARK, type ArchiveText } from "@/data/archive";
import { SIGNALS, type Signal } from "@/data/signals";
import { loadMine } from "@/lib/mySignals";
import { highlight, search, type Match } from "@/lib/search";

/** Deliberately mixed: the point is that any of these works from any locale. */
const EXAMPLES = ["지하 문명", "Anunnaki", "爬虫類", "ovni", "นาค", "음모론", "Tokyo"];

function Marked({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlight(text, query).map((run, i) =>
        run.hit ? (
          <mark key={i} className="hit__mark">
            {run.text}
          </mark>
        ) : (
          <span key={i}>{run.text}</span>
        )
      )}
    </>
  );
}

function clip(text: string, max = 90) {
  const chars = [...text];
  return chars.length > max ? `${chars.slice(0, max).join("")}…` : text;
}

export default function Search({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [query, setQuery] = useState("");
  const [mine, setMine] = useState<Signal[]>([]);
  const input = useRef<HTMLInputElement>(null);

  // The query lives in the URL, so a search can be linked and survives a reload.
  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    setMine(loadMine());
    input.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== input.current) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function update(next: string) {
    setQuery(next);
    const url = next.trim()
      ? `${window.location.pathname}?q=${encodeURIComponent(next)}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  const results = useMemo(
    () => search(query, locale, [...mine, ...SIGNALS]),
    [query, locale, mine]
  );
  const total = results ? results.archive.length + results.signals.length : 0;

  /** Says where a match came from whenever it is not visible in the reader's text. */
  function provenance(match: Match, shownLanguage: Locale) {
    if (match.field === "classification") return `↳ CLASSIFICATION · ${match.text}`;
    if (match.field === "node") return `↳ ${dict.node} · ${match.text}`;
    if (match.field === "codename") return `↳ ${match.text}`;
    if (match.language && match.language !== shownLanguage) {
      return `↳ ${dict.matchedIn} ${LOCALE_META[match.language].native} · “${clip(match.text)}”`;
    }
    return null;
  }

  return (
    <div className="search">
      <form
        className="searchbar"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="searchbar__icon" aria-hidden>
          ⌕
        </span>
        <input
          ref={input}
          type="search"
          name="q"
          value={query}
          onChange={(e) => update(e.target.value)}
          placeholder={dict.searchPlaceholder}
          aria-label={dict.search}
          autoComplete="off"
          spellCheck={false}
        />
        {results && (
          <span className="searchbar__count mono-label">
            {total} {total === 1 ? dict.resultOne : dict.results}
          </span>
        )}
      </form>

      {(!results || total === 0) && (
        <div className="search__empty">
          {results && <p className="dim">{dict.noResults}</p>}
          <p className="mono-label" style={{ marginTop: results ? 22 : 0 }}>
            {dict.tryQueries}
          </p>
          <ul className="chips" style={{ marginTop: 10 }}>
            {EXAMPLES.map((q) => (
              <li key={q}>
                <button className="chip" onClick={() => update(q)}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results && results.archive.length > 0 && (
        <section style={{ marginTop: 30 }}>
          <h2 className="mono-label">
            THE ARCHIVE · {results.archive.length}
          </h2>
          <ul className="nodes" style={{ marginTop: 12 }}>
            {results.archive.map(({ node, match }) => {
              const t = resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, locale);
              const from = provenance(match, t.language);
              return (
                <li key={node.slug}>
                  <Link href={`/${locale}/archive/${node.slug}`}>
                    <span className="nodes__mark">
                      {CLASSIFICATION_MARK[node.classification]}
                    </span>
                    <span>
                      <span className="nodes__title" lang={t.language}>
                        <Marked text={t.value.title} query={query} />
                      </span>
                      <span className="nodes__sum" style={{ display: "block" }} lang={t.language}>
                        <Marked text={t.value.summary} query={query} />
                      </span>
                      {from && (
                        <span className="hit__from" lang={match.language ?? undefined}>
                          {from}
                        </span>
                      )}
                    </span>
                    <span className={`tag tag--${node.classification.toLowerCase()}`}>
                      {node.classification}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {results && results.signals.length > 0 && (
        <section style={{ marginTop: 34 }}>
          <h2 className="mono-label">SIGNAL · {results.signals.length}</h2>
          <div className="feed" style={{ marginTop: 12 }}>
            {results.signals.map(({ signal, match }) => {
              const shown = resolveTranslation(signal.originalLanguage, signal.text, locale).language;
              const from = provenance(match, shown);
              return (
                <div key={`${signal.mine ? "m" : "s"}${signal.id}`}>
                  {from && <p className="hit__from hit__from--above">{from}</p>}
                  <SignalCard signal={signal} locale={locale} dict={dict} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <p className="note" style={{ marginTop: 34 }}>
        {dict.searchNotice}
      </p>
    </div>
  );
}

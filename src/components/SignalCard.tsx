"use client";

import Link from "next/link";
import { useState } from "react";
import { LOCALE_META, resolveTranslation, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import type { Signal } from "@/data/signals";
import { NODES_BY_ID } from "@/data/nodes";
import { ARCHIVE_BY_SLUG, archiveTitle } from "@/data/archive";

export default function SignalCard({
  signal,
  locale,
  dict,
}: {
  signal: Signal;
  locale: Locale;
  dict: Dict;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const t = resolveTranslation(signal.originalLanguage, signal.text, locale);
  const node = NODES_BY_ID[signal.node];
  const linked = signal.archive ? ARCHIVE_BY_SLUG[signal.archive] : undefined;

  return (
    <article className="sig panel">
      <header className="sig__head">
        <span className="sig__name">@{signal.codename}</span>
        <span className="mono-label">
          {node.name} NODE · {signal.time} {node.tz}
        </span>
      </header>

      <p className="sig__body" lang={t.language}>
        {t.value}
      </p>

      {/* The original is never discarded — only ever folded away. */}
      {t.isTranslated && (
        <div className="sig__trans">
          <span className="tag">
            {dict.translatedFrom}{" "}
            {LOCALE_META[t.originalLanguage].english.toUpperCase()}
          </span>
          <button
            className="btn btn--ghost"
            onClick={() => setShowOriginal((v) => !v)}
          >
            {showOriginal ? dict.hideOriginal : dict.viewOriginal}
          </button>
        </div>
      )}

      {t.isPending && (
        <div className="sig__trans">
          <span className="tag tag--unknown">{dict.translationPending}</span>
        </div>
      )}

      {showOriginal && (
        <div className="sig__compare">
          <div>
            <p className="mono-label">{dict.originalLabel}</p>
            <p lang={t.originalLanguage}>{t.original}</p>
          </div>
          <div>
            <p className="mono-label">{dict.translationLabel}</p>
            <p lang={locale}>{t.value}</p>
          </div>
        </div>
      )}

      <footer className="sig__foot">
        <span>🦎 {dict.signals} {signal.id}</span>
        <span>
          ⌁ {LOCALE_META[signal.originalLanguage].english.toUpperCase()} ORIGIN
        </span>
        {linked && (
          <Link
            href={`/${locale}/archive/${linked.slug}`}
            className="sig__link toxic"
          >
            ▸ {archiveTitle(linked, locale)}
          </Link>
        )}
      </footer>
    </article>
  );
}

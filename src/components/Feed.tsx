"use client";

import { useMemo, useState } from "react";
import SignalCard from "./SignalCard";
import type { Dict } from "@/data/dict";
import { SIGNALS, type Signal } from "@/data/signals";
import { NODES } from "@/data/nodes";
import { LOCALE_META, type Locale } from "@/lib/i18n";

export default function Feed({
  locale,
  dict,
  showCompose = true,
  limit,
}: {
  locale: Locale;
  dict: Dict;
  showCompose?: boolean;
  limit?: number;
}) {
  const [node, setNode] = useState<string>("all");
  const [draft, setDraft] = useState("");
  const [mine, setMine] = useState<Signal[]>([]);

  const visible = useMemo(() => {
    const all = [...mine, ...SIGNALS];
    const filtered = node === "all" ? all : all.filter((s) => s.node === node);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [node, mine, limit]);

  const activeNodes = useMemo(
    () => NODES.filter((n) => SIGNALS.some((s) => s.node === n.id)),
    []
  );

  function transmit() {
    const text = draft.trim();
    if (!text) return;
    setMine((prev) => [
      {
        id: 9300 + prev.length,
        codename: "you",
        node: activeNodes[0].id,
        time: new Date().toTimeString().slice(0, 5),
        originalLanguage: locale,
        relay: 0,
        watch: 0,
        // Written in the viewer's language; every other locale would be a
        // translation request against the live translation layer.
        text: { [locale]: text } as Signal["text"],
      },
      ...prev,
    ]);
    setDraft("");
  }

  return (
    <>
      {showCompose && (
        <div className="compose panel">
          <p className="mono-label">
            {dict.compose} · {LOCALE_META[locale].native}
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={dict.composePlaceholder}
            style={{ marginTop: 12 }}
          />
          <div className="compose__row">
            <span className="faint" style={{ fontSize: 10 }}>
              {dict.localDemoNote}
            </span>
            <button className="btn" onClick={transmit} disabled={!draft.trim()}>
              {dict.transmit}
            </button>
          </div>
        </div>
      )}

      <div className="filters">
        <button
          onClick={() => setNode("all")}
          aria-pressed={node === "all"}
        >
          {dict.all}
        </button>
        {activeNodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setNode(n.id)}
            aria-pressed={node === n.id}
          >
            {n.name}
          </button>
        ))}
      </div>

      <p className="note" style={{ margin: "0 0 18px" }}>
        {dict.sampleNotice}
      </p>

      <div className="feed">
        {visible.map((s) => (
          <SignalCard key={s.id} signal={s} locale={locale} dict={dict} />
        ))}
      </div>
    </>
  );
}

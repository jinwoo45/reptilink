"use client";

import { useEffect, useMemo, useState } from "react";
import SignalCard from "./SignalCard";
import type { Dict } from "@/data/dict";
import { SIGNALS, type Signal } from "@/data/signals";
import { NODES, NODES_BY_ID, defaultNodeFor } from "@/data/nodes";
import { LOCALE_META, isLocale, type Locale } from "@/lib/i18n";
import { KEYS, readStored, writeStored } from "@/lib/storage";

const MAX_STORED = 50;

/** The reader's real clock zone, e.g. "GMT+9" or "PDT". */
function localZone(): string {
  try {
    return (
      new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

/** Stored data is untrusted: anything malformed is dropped, not rendered. */
function loadMine(): Signal[] {
  const raw = readStored(KEYS.signals);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (s): s is Signal =>
          !!s &&
          typeof s.id === "number" &&
          typeof s.time === "string" &&
          isLocale(s.originalLanguage) &&
          typeof s.node === "string" &&
          !!NODES_BY_ID[s.node] &&
          typeof s.text?.[s.originalLanguage] === "string"
      )
      .slice(0, MAX_STORED)
      .map((s) => ({ ...s, codename: "you", mine: true as const }));
  } catch {
    return [];
  }
}

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
  const [filter, setFilter] = useState<string>("all");
  const [draft, setDraft] = useState("");
  const [node, setNode] = useState(() => defaultNodeFor(locale));
  const [mine, setMine] = useState<Signal[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read after mount so the server render and first client render agree.
  useEffect(() => {
    setMine(loadMine());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeStored(KEYS.signals, JSON.stringify(mine));
  }, [mine, loaded]);

  const places = useMemo(() => NODES.filter((n) => !n.fiction), []);

  const visible = useMemo(() => {
    const all = [...mine, ...SIGNALS];
    const filtered = filter === "all" ? all : all.filter((s) => s.node === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, mine, limit]);

  const filterNodes = useMemo(
    () => places.filter((n) => [...mine, ...SIGNALS].some((s) => s.node === n.id)),
    [places, mine]
  );

  function transmit() {
    const text = draft.trim();
    if (!text) return;
    setMine((prev) => {
      const nextId =
        Math.max(9300, ...prev.map((s) => s.id)) + 1;
      return [
        {
          id: nextId,
          codename: "you",
          node,
          time: new Date().toTimeString().slice(0, 5),
          tz: localZone(),
          originalLanguage: locale,
          mine: true as const,
          // Written in the viewer's language; every other locale would be a
          // translation request against the live translation layer.
          text: { [locale]: text } as Signal["text"],
        },
        ...prev,
      ].slice(0, MAX_STORED);
    });
    setDraft("");
  }

  function remove(id: number) {
    setMine((prev) => prev.filter((s) => s.id !== id));
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
            <label className="compose__node">
              <span className="mono-label">{dict.yourNode}</span>
              <select value={node} onChange={(e) => setNode(e.target.value)}>
                {places.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn" onClick={transmit} disabled={!draft.trim()}>
              {dict.transmit}
            </button>
          </div>
          <p className="faint" style={{ fontSize: 10, margin: "12px 0 0" }}>
            {dict.localDemoNote}
          </p>
        </div>
      )}

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          {dict.all}
        </button>
        {filterNodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setFilter(n.id)}
            aria-pressed={filter === n.id}
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
          <SignalCard
            key={`${s.mine ? "m" : "s"}${s.id}`}
            signal={s}
            locale={locale}
            dict={dict}
            onRemove={s.mine ? () => remove(s.id) : undefined}
          />
        ))}
      </div>
    </>
  );
}

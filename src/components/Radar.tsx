"use client";

import Link from "next/link";
import { useState } from "react";
import { MAX_NODE_SIGNALS, NODES, languagesAt, signalsAt } from "@/data/nodes";
import { SIGNALS } from "@/data/signals";
import { ARCHIVE_BY_SLUG, archiveTitle } from "@/data/archive";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";

export default function Radar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [selected, setSelected] = useState<string>("seoul");
  const node = NODES.find((n) => n.id === selected)!;
  const local = SIGNALS.filter((s) => s.node === selected);

  return (
    <div className="radar">
      <div className="radar__plate panel">
        <div className="radar__sweep" aria-hidden />
        <svg viewBox="0 0 100 56" className="radar__svg" role="img" aria-label="Global signal network">
          <defs>
            <pattern id="rgrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M5 0H0V5" fill="none" stroke="#1c1c1a" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="56" fill="url(#rgrid)" />
          <line x1="0" y1="28" x2="100" y2="28" stroke="#2a2a27" strokeWidth="0.15" />
          <line x1="50" y1="0" x2="50" y2="56" stroke="#2a2a27" strokeWidth="0.15" />
          {NODES.map((n) => {
            const cx = n.x * 100;
            const cy = n.y * 56;
            const on = n.id === selected;
            const r = 0.7 + (signalsAt(n.id) / MAX_NODE_SIGNALS) * 1.8;
            return (
              <g key={n.id} onClick={() => setSelected(n.id)} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={r + 2.6} fill="transparent" />
                {on && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 1.6}
                    fill="none"
                    stroke="#b6ff00"
                    strokeWidth="0.2"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={n.fiction ? "#8d35ff" : on ? "#b6ff00" : "#46443f"}
                />
                <text
                  x={cx + r + 1.2}
                  y={cy + 0.9}
                  fontSize="1.7"
                  fill={on ? "#e7e4db" : "#46443f"}
                  fontFamily="inherit"
                >
                  {n.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="radar__side">
        <ul className="bars">
          {NODES.map((n) => {
            const count = signalsAt(n.id);
            const filled = Math.round((count / MAX_NODE_SIGNALS) * 9);
            return (
              <li key={n.id}>
                <button onClick={() => setSelected(n.id)} aria-pressed={n.id === selected}>
                  <span className="bars__name">{n.name}</span>
                  <span className={n.fiction ? "acid" : "toxic"}>
                    {"█".repeat(filled)}
                    <span className="faint">{"░".repeat(9 - filled)}</span>
                  </span>
                  <span className="bars__n dim">
                    {n.fiction ? "☠" : count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="panel pad" style={{ marginTop: 16 }}>
          <p className="mono-label">
            {node.name} / {node.country}
          </p>
          {node.fiction && (
            <p className="tag tag--fiction" style={{ marginTop: 10 }}>
              ☠ FICTION — THIS NODE IS NOT A PLACE
            </p>
          )}

          <div className="radar__meta">
            <div>
              <p className="mono-label">{dict.localSignals}</p>
              <p className="toxic">{local.length}</p>
            </div>
            <div>
              <p className="mono-label">{dict.activeLanguages}</p>
              <p>
                {languagesAt(node.id)
                  .map((l) => LOCALE_META[l].code)
                  .join(" / ") || "—"}
              </p>
            </div>
            <div>
              <p className="mono-label">TIME ZONE</p>
              <p>{node.tz}</p>
            </div>
          </div>

          {local.length > 0 ? (
            <ul className="radar__list">
              {local.map((s) => (
                <li key={s.id}>
                  <span className="dim">@{s.codename}</span>{" "}
                  {s.archive && ARCHIVE_BY_SLUG[s.archive] && (
                    <Link
                      href={`/${locale}/archive/${s.archive}`}
                      className="toxic"
                    >
                      {archiveTitle(ARCHIVE_BY_SLUG[s.archive], locale)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dim" style={{ marginTop: 14, fontSize: 11 }}>
              NO RESOLVED SIGNALS AT THIS NODE.
            </p>
          )}
        </div>

        <p className="note" style={{ marginTop: 16 }}>
          {dict.countedNotice}
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ARCHIVE, archiveTitle, type ArchiveNode } from "@/data/archive";
import type { Locale } from "@/lib/i18n";

const SIZE = 100;
const CENTER = SIZE / 2;

/**
 * A deterministic three-ring layout: the more connected a node is, the closer
 * it sits to the centre. No physics, no client JS — the graph is just markup.
 */
function layout(nodes: ArchiveNode[]) {
  const degree = new Map<string, number>();
  for (const n of nodes) {
    degree.set(n.slug, (degree.get(n.slug) ?? 0) + n.edges.length);
    for (const e of n.edges) degree.set(e, (degree.get(e) ?? 0) + 1);
  }

  const ranked = [...nodes].sort(
    (a, b) =>
      (degree.get(b.slug) ?? 0) - (degree.get(a.slug) ?? 0) ||
      a.slug.localeCompare(b.slug)
  );

  const rings: { count: number; radius: number }[] = [
    { count: 5, radius: 13 },
    { count: 10, radius: 27 },
    { count: ranked.length - 15, radius: 41 },
  ];

  const pos = new Map<string, { x: number; y: number; r: number }>();
  let i = 0;
  rings.forEach((ring, ringIndex) => {
    for (let k = 0; k < ring.count; k++) {
      const node = ranked[i++];
      if (!node) break;
      const angle =
        (k / ring.count) * Math.PI * 2 - Math.PI / 2 + ringIndex * 0.35;
      pos.set(node.slug, {
        x: CENTER + Math.cos(angle) * ring.radius,
        y: CENTER + Math.sin(angle) * ring.radius,
        r: 0.7 + Math.min(6, degree.get(node.slug) ?? 1) * 0.16,
      });
    }
  });

  return pos;
}

export default function ArchiveGraph({
  locale,
  highlight,
}: {
  locale: Locale;
  highlight?: string;
}) {
  const pos = layout(ARCHIVE);
  const seen = new Set<string>();

  return (
    <div className="graph panel">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Archive knowledge graph">
        <g stroke="#1c1c1a" strokeWidth="0.12">
          {ARCHIVE.flatMap((n) =>
            n.edges.map((e) => {
              const key = [n.slug, e].sort().join("|");
              if (seen.has(key)) return null;
              seen.add(key);
              const a = pos.get(n.slug);
              const b = pos.get(e);
              if (!a || !b) return null;
              const hot = highlight === n.slug || highlight === e;
              return (
                <line
                  key={key}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? "#b6ff00" : undefined}
                  strokeWidth={hot ? 0.22 : undefined}
                />
              );
            })
          )}
        </g>
        {ARCHIVE.map((n) => {
          const p = pos.get(n.slug)!;
          const on = highlight === n.slug;
          return (
            <Link key={n.slug} href={`/${locale}/archive/${n.slug}`}>
              <g className="graph__node">
                <circle cx={p.x} cy={p.y} r={p.r + 1.8} fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r}
                  fill={on ? "#b6ff00" : "#8e8b83"}
                />
                <text
                  x={p.x}
                  y={p.y - p.r - 1}
                  fontSize="1.5"
                  textAnchor="middle"
                  fill={on ? "#e7e4db" : "#46443f"}
                  fontFamily="inherit"
                >
                  {archiveTitle(n, locale)}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}

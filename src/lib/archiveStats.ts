import { ARCHIVE, type ArchiveNode, type Classification } from "@/data/archive";
import { SIGNALS } from "@/data/signals";

/**
 * The figures the archive table shows. Every one is a count over data in this
 * build — connections in the graph, transmissions that cite an entry — so the
 * table can be as dense as a trading terminal without a single invented number.
 */

const neighbours = new Map<string, Set<string>>();
for (const node of ARCHIVE) {
  for (const edge of node.edges) {
    if (!neighbours.has(node.slug)) neighbours.set(node.slug, new Set());
    if (!neighbours.has(edge)) neighbours.set(edge, new Set());
    neighbours.get(node.slug)!.add(edge);
    neighbours.get(edge)!.add(node.slug);
  }
}

/** Distinct entries linked to this one, in either direction. */
export const LINKS: Record<string, number> = Object.fromEntries(
  ARCHIVE.map((n) => [n.slug, neighbours.get(n.slug)?.size ?? 0])
);

/** Transmissions on the feed that point at this entry. */
export const CITED_BY: Record<string, number> = Object.fromEntries(
  ARCHIVE.map((n) => [n.slug, SIGNALS.filter((s) => s.archive === n.slug).length])
);

export function mostConnected(count: number): ArchiveNode[] {
  return [...ARCHIVE]
    .sort((a, b) => LINKS[b.slug] - LINKS[a.slug] || a.slug.localeCompare(b.slug))
    .slice(0, count);
}

export const CLASS_ORDER: Classification[] = [
  "FACT",
  "HYPOTHESIS",
  "MYTH",
  "CONSPIRACY",
  "UNKNOWN",
  "FICTION",
];

export const CLASS_COUNT: Record<Classification, number> = Object.fromEntries(
  CLASS_ORDER.map((c) => [c, ARCHIVE.filter((n) => n.classification === c).length])
) as Record<Classification, number>;

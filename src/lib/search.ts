import {
  ARCHIVE,
  type ArchiveNode,
  type Classification,
} from "@/data/archive";
import { NODES_BY_ID, NODE_ALIASES } from "@/data/nodes";
import type { Signal } from "@/data/signals";
import type { Locale } from "./i18n";

/**
 * Cross-lingual search (§32), entirely in the browser.
 *
 * Every item is indexed in every language it exists in, so a query in any
 * language finds it; the result is then shown in the reader's language, with
 * the language and phrase that actually matched. There is no translation of
 * the query and no semantic model — it finds what was written, in whatever
 * language it was written in.
 */

/** Case, accents, full-width forms: "Civilización" and "CIVILIZACION" agree. */
export function fold(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFKC")
    .toLowerCase();
}

const SEPARATORS = /[\s\p{P}\p{S}]+/gu;

/** Spacing is not meaning: "지하문명" should find "지하 문명". */
export function compact(s: string): string {
  return fold(s).replace(SEPARATORS, "");
}

const KO_PARTICLES = ["에서", "으로", "은", "는", "이", "가", "을", "를", "의", "에", "도", "로", "와", "과"];

/** A term, plus the term without a trailing Korean particle ("렙틸리언이" → "렙틸리언"). */
function variants(term: string): string[] {
  const out = [term];
  const chars = [...term];
  if (chars.length >= 3 && /[가-힣]$/.test(term)) {
    const p = KO_PARTICLES.find(
      (x) => term.endsWith(x) && chars.length - [...x].length >= 2
    );
    if (p) out.push(term.slice(0, -p.length));
  }
  return out;
}

type Query = { whole: string; terms: string[][] };

export function parseQuery(q: string): Query | null {
  const whole = compact(q);
  // One Latin letter matches everything; one kanji or hangul syllable is a word.
  if (!whole || (whole.length < 2 && /^[\x00-\x7f]+$/.test(whole))) return null;
  const terms = fold(q)
    .split(SEPARATORS)
    .filter(Boolean)
    .map(variants);
  return { whole, terms };
}

function containsAll(haystack: string, q: Query): boolean {
  return q.terms.every((vs) => vs.some((v) => haystack.includes(v)));
}

/** Classification names in every language, so "음모론" or "神話" lists a class. */
const CLASS_ALIASES: Record<Classification, string[]> = {
  FACT: ["fact", "사실", "事実", "hecho", "fato", "ข้อเท็จจริง"],
  HYPOTHESIS: ["hypothesis", "가설", "仮説", "hipótesis", "hipótese", "สมมติฐาน"],
  MYTH: ["myth", "신화", "神話", "mito", "ตำนาน"],
  CONSPIRACY: ["conspiracy", "음모론", "陰謀論", "conspiración", "conspiração", "ทฤษฎีสมคบคิด"],
  UNKNOWN: ["unknown", "미상", "不明", "desconocido", "desconhecido", "ไม่ทราบ"],
  FICTION: ["fiction", "픽션", "フィクション", "ficción", "ficção", "เรื่องแต่ง"],
};

export type Match = {
  /** The language the matching text is in; null for a language-free match. */
  language: Locale | null;
  /** The phrase that matched, as written. */
  text: string;
  field: "title" | "summary" | "classification" | "text" | "node" | "codename";
};

export type ArchiveHit = { node: ArchiveNode; score: number; match: Match };
export type SignalHit = { signal: Signal; score: number; match: Match };

type Scored = { score: number; match: Match };

function better(a: Scored | null, b: Scored | null): Scored | null {
  if (!a) return b;
  if (!b) return a;
  return b.score > a.score ? b : a;
}

function scoreNode(node: ArchiveNode, q: Query, reader: Locale): Scored | null {
  let best: Scored | null = null;

  for (const [lang, t] of Object.entries(node.i18n) as [Locale, { title: string; summary: string }][]) {
    const title = compact(t.title);
    const summary = compact(t.summary);
    // Prefer showing a match in the reader's own language when scores tie.
    const own = lang === reader ? 3 : 0;
    let s: Scored | null = null;

    if (title === q.whole) s = { score: 100 + own, match: { language: lang, text: t.title, field: "title" } };
    else if (containsAll(title, q))
      s = {
        score: 60 + (title.startsWith(q.terms[0][0]) ? 10 : 0) + own,
        match: { language: lang, text: t.title, field: "title" },
      };
    else if (containsAll(summary, q)) s = { score: 15 + own, match: { language: lang, text: t.summary, field: "summary" } };
    else if (containsAll(title + summary, q)) s = { score: 8 + own, match: { language: lang, text: t.title, field: "summary" } };

    best = better(best, s);
  }

  const alias = CLASS_ALIASES[node.classification].find((a) => compact(a) === q.whole);
  if (alias) {
    best = better(best, {
      score: 20,
      match: { language: null, text: node.classification, field: "classification" },
    });
  }
  return best;
}

function scoreSignal(signal: Signal, q: Query, reader: Locale): Scored | null {
  let best: Scored | null = null;

  if (q.whole.length >= 2 && compact(signal.codename).includes(q.whole)) {
    best = { score: 40, match: { language: null, text: `@${signal.codename}`, field: "codename" } };
  }

  const node = NODES_BY_ID[signal.node];
  const names = [node.name, ...(NODE_ALIASES[node.id] ?? [])];
  const name = names.find((n) => {
    const c = compact(n);
    return c === q.whole || (q.whole.length >= 2 && c.startsWith(q.whole));
  });
  if (name) {
    best = better(best, { score: 30, match: { language: null, text: name, field: "node" } });
  }

  for (const [lang, text] of Object.entries(signal.text) as [Locale, string][]) {
    if (containsAll(compact(text), q)) {
      best = better(best, {
        score: 12 + (lang === reader ? 3 : 0),
        match: { language: lang, text, field: "text" },
      });
    }
  }
  return best;
}

export function search(
  input: string,
  reader: Locale,
  signals: Signal[]
): { archive: ArchiveHit[]; signals: SignalHit[] } | null {
  const q = parseQuery(input);
  if (!q) return null;

  const archive = ARCHIVE.flatMap((node) => {
    const s = scoreNode(node, q, reader);
    return s ? [{ node, ...s }] : [];
  }).sort((a, b) => b.score - a.score || a.node.slug.localeCompare(b.node.slug));

  const found = signals
    .flatMap((signal) => {
      const s = scoreSignal(signal, q, reader);
      return s ? [{ signal, ...s }] : [];
    })
    .sort((a, b) => b.score - a.score || b.signal.id - a.signal.id);

  return { archive, signals: found };
}

/**
 * Splits text into plain and matched runs for display. Folding is done per
 * character so positions line up with the original text.
 */
export function highlight(text: string, input: string): { text: string; hit: boolean }[] {
  const q = parseQuery(input);
  const chars = [...text];
  if (!q) return [{ text, hit: false }];

  const folded = chars.map((c) => {
    const f = fold(c);
    return [...f].length === 1 ? f : c.toLowerCase();
  });
  const marks = new Array<boolean>(chars.length).fill(false);

  for (const vs of q.terms) {
    for (const v of vs) {
      const needle = [...v];
      if (!needle.length) continue;
      for (let i = 0; i + needle.length <= folded.length; i++) {
        let ok = true;
        for (let j = 0; j < needle.length; j++) {
          if (folded[i + j] !== needle[j]) {
            ok = false;
            break;
          }
        }
        if (ok) for (let j = 0; j < needle.length; j++) marks[i + j] = true;
      }
    }
  }

  const runs: { text: string; hit: boolean }[] = [];
  chars.forEach((c, i) => {
    const last = runs[runs.length - 1];
    if (last && last.hit === marks[i]) last.text += c;
    else runs.push({ text: c, hit: marks[i] });
  });
  return runs;
}

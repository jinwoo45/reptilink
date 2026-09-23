import type { Locale } from "@/lib/i18n";
import { SIGNALS } from "./signals";

export type NodeCity = {
  id: string;
  name: string;
  country: string;
  tz: string;
  /** Equirectangular position, 0..1 from top-left of the world plate. */
  x: number;
  y: number;
  /** A node that exists only inside the fiction layer, and says so. */
  fiction?: true;
};

export const NODES: NodeCity[] = [
  { id: "seoul", name: "SEOUL", country: "KR", tz: "KST", x: 0.855, y: 0.325 },
  { id: "tokyo", name: "TOKYO", country: "JP", tz: "JST", x: 0.885, y: 0.34 },
  { id: "los-angeles", name: "LOS ANGELES", country: "US", tz: "PST", x: 0.155, y: 0.365 },
  { id: "mexico-city", name: "MEXICO CITY", country: "MX", tz: "CST", x: 0.205, y: 0.455 },
  { id: "berlin", name: "BERLIN", country: "DE", tz: "CET", x: 0.535, y: 0.275 },
  { id: "bangkok", name: "BANGKOK", country: "TH", tz: "ICT", x: 0.775, y: 0.455 },
  { id: "sao-paulo", name: "SÃO PAULO", country: "BR", tz: "BRT", x: 0.335, y: 0.665 },
  { id: "london", name: "LONDON", country: "GB", tz: "GMT", x: 0.492, y: 0.265 },
  { id: "jakarta", name: "JAKARTA", country: "ID", tz: "WIB", x: 0.79, y: 0.555 },
  { id: "lima", name: "LIMA", country: "PE", tz: "PET", x: 0.27, y: 0.605 },
  { id: "reykjavik", name: "REYKJAVÍK", country: "IS", tz: "GMT", x: 0.452, y: 0.195 },
  { id: "unknown", name: "UNKNOWN", country: "??", tz: "???", x: 0.63, y: 0.52, fiction: true },
];

/**
 * What each city is called in the six languages, for search only — the map
 * keeps one name per node. "서울", "ソウル" and "Seúl" all find SEOUL.
 */
export const NODE_ALIASES: Record<string, string[]> = {
  seoul: ["서울", "ソウル", "seúl", "seul", "โซล"],
  tokyo: ["도쿄", "東京", "とうきょう", "tóquio", "โตเกียว"],
  "los-angeles": ["로스앤젤레스", "엘에이", "ロサンゼルス", "los ángeles", "ลอสแอนเจลิส"],
  "mexico-city": ["멕시코시티", "メキシコシティ", "ciudad de méxico", "cdmx", "cidade do méxico", "เม็กซิโกซิตี"],
  berlin: ["베를린", "ベルリン", "berlim", "เบอร์ลิน"],
  bangkok: ["방콕", "バンコク", "กรุงเทพ", "bangcoc", "banguecoque"],
  "sao-paulo": ["상파울루", "サンパウロ", "sao paulo", "เซาเปาโล"],
  london: ["런던", "ロンドン", "londres", "ลอนดอน"],
  jakarta: ["자카르타", "ジャカルタ", "yakarta", "จาการ์ตา"],
  lima: ["리마", "リマ", "ลิมา"],
  reykjavik: ["레이캬비크", "レイキャビク", "reikiavik", "reiquiavique", "เรคยาวิก"],
};

/** Where a reader of each language most likely is. A default, never a location. */
const DEFAULT_NODE: Record<Locale, string> = {
  ko: "seoul",
  ja: "tokyo",
  es: "mexico-city",
  pt: "sao-paulo",
  th: "bangkok",
  en: "london",
};

export function defaultNodeFor(locale: Locale): string {
  return DEFAULT_NODE[locale];
}

export const NODES_BY_ID: Record<string, NodeCity> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);

/**
 * Every number the radar shows is counted from the transmissions that actually
 * exist in this build. Nothing here is an invented engagement figure.
 */
export function signalsAt(nodeId: string): number {
  return SIGNALS.filter((s) => s.node === nodeId).length;
}

export function languagesAt(nodeId: string): Locale[] {
  const seen = new Set<Locale>();
  for (const s of SIGNALS) {
    if (s.node === nodeId) seen.add(s.originalLanguage);
  }
  return [...seen];
}

export const MAX_NODE_SIGNALS = Math.max(
  1,
  ...NODES.map((n) => signalsAt(n.id))
);

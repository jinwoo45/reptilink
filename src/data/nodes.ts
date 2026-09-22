import type { Locale } from "@/lib/i18n";

export type NodeCity = {
  id: string;
  name: string;
  country: string;
  tz: string;
  signals: number;
  languages: Locale[];
  /** Equirectangular position, 0..1 from top-left of the world plate. */
  x: number;
  y: number;
};

export const NODES: NodeCity[] = [
  { id: "seoul", name: "SEOUL", country: "KR", tz: "KST", signals: 8291, languages: ["ko", "en", "ja"], x: 0.855, y: 0.325 },
  { id: "tokyo", name: "TOKYO", country: "JP", tz: "JST", signals: 14201, languages: ["ja", "en", "ko"], x: 0.885, y: 0.34 },
  { id: "los-angeles", name: "LOS ANGELES", country: "US", tz: "PST", signals: 19291, languages: ["en", "es"], x: 0.155, y: 0.365 },
  { id: "mexico-city", name: "MEXICO CITY", country: "MX", tz: "CST", signals: 7182, languages: ["es", "en"], x: 0.205, y: 0.455 },
  { id: "berlin", name: "BERLIN", country: "DE", tz: "CET", signals: 4821, languages: ["en", "pt"], x: 0.535, y: 0.275 },
  { id: "bangkok", name: "BANGKOK", country: "TH", tz: "ICT", signals: 6402, languages: ["th", "en"], x: 0.775, y: 0.455 },
  { id: "sao-paulo", name: "SÃO PAULO", country: "BR", tz: "BRT", signals: 9114, languages: ["pt", "es", "en"], x: 0.335, y: 0.665 },
  { id: "london", name: "LONDON", country: "GB", tz: "GMT", signals: 6870, languages: ["en"], x: 0.492, y: 0.265 },
  { id: "jakarta", name: "JAKARTA", country: "ID", tz: "WIB", signals: 3908, languages: ["en", "th"], x: 0.79, y: 0.555 },
  { id: "lima", name: "LIMA", country: "PE", tz: "PET", signals: 2617, languages: ["es", "pt"], x: 0.27, y: 0.605 },
  { id: "reykjavik", name: "REYKJAVÍK", country: "IS", tz: "GMT", signals: 411, languages: ["en"], x: 0.452, y: 0.195 },
  { id: "unknown", name: "UNKNOWN", country: "??", tz: "???", signals: 0, languages: [], x: 0.63, y: 0.52 },
];

export const NODES_BY_ID: Record<string, NodeCity> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);

export const MAX_NODE_SIGNALS = Math.max(...NODES.map((n) => n.signals));

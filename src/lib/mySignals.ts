import type { Signal } from "@/data/signals";
import { NODES_BY_ID } from "@/data/nodes";
import { isLocale } from "./i18n";
import { KEYS, readStored } from "./storage";

export const MAX_STORED = 50;

/** The reader's real clock zone, e.g. "GMT+9" or "PDT". */
export function localZone(): string {
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
export function loadMine(): Signal[] {
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


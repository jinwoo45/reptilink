/**
 * Per-viewer storage. Private windows and blocked site data can make
 * localStorage throw on access, so every call is guarded and the site must
 * behave correctly when it returns null.
 */
export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — the feature degrades to this page view only */
  }
}

export const KEYS = {
  locale: "reptilink:locale",
  species: "reptilink:species",
  signals: "reptilink:signals",
  channel: "reptilink:channel",
} as const;

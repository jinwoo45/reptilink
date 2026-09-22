export const LOCALES = ["en", "ko", "ja", "es", "pt", "th"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<
  Locale,
  { native: string; english: string; code: string; dir: "ltr" | "rtl" }
> = {
  en: { native: "ENGLISH", english: "English", code: "EN", dir: "ltr" },
  ko: { native: "한국어", english: "Korean", code: "KO", dir: "ltr" },
  ja: { native: "日本語", english: "Japanese", code: "JA", dir: "ltr" },
  es: { native: "ESPAÑOL", english: "Spanish", code: "ES", dir: "ltr" },
  pt: { native: "PORTUGUÊS", english: "Portuguese", code: "PT", dir: "ltr" },
  th: { native: "ไทย", english: "Thai", code: "TH", dir: "ltr" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Matches a browser Accept-Language style tag ("ko-KR", "pt-BR") to a supported locale. */
export function matchLocale(tags: readonly string[]): Locale | null {
  for (const tag of tags) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/**
 * Translation-layer resolver.
 *
 * Mirrors the REPTILINK spec: the original is never discarded. A viewer sees the
 * translation for their own locale when one is cached, otherwise the original,
 * flagged so the UI can offer VIEW ORIGINAL SIGNAL / TRANSLATION PENDING.
 */
export type Translated<T> = {
  value: T;
  language: Locale;
  originalLanguage: Locale;
  original: T;
  isTranslated: boolean;
  isPending: boolean;
};

export function resolveTranslation<T>(
  originalLanguage: Locale,
  translations: Partial<Record<Locale, T>>,
  viewer: Locale
): Translated<T> {
  const original = translations[originalLanguage] as T;
  if (viewer === originalLanguage) {
    return {
      value: original,
      language: originalLanguage,
      originalLanguage,
      original,
      isTranslated: false,
      isPending: false,
    };
  }
  const translation = translations[viewer];
  if (translation !== undefined) {
    return {
      value: translation,
      language: viewer,
      originalLanguage,
      original,
      isTranslated: true,
      isPending: false,
    };
  }
  return {
    value: original,
    language: originalLanguage,
    originalLanguage,
    original,
    isTranslated: false,
    isPending: true,
  };
}

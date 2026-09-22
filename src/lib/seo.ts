import type { Metadata } from "next";
import { LOCALES, type Locale } from "./i18n";

/**
 * Every page exists once per language, so every page advertises all of them.
 * x-default points at the entry gate, which detects the reader's own language.
 */
export function localeAlternates(
  locale: Locale,
  path: string
): Metadata["alternates"] {
  const languages: Record<string, string> = { "x-default": "/" };
  for (const l of LOCALES) languages[l] = `/${l}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

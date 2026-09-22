"use client";

import { useEffect } from "react";
import { LOCALE_META, type Locale } from "@/lib/i18n";

/**
 * The document element lives in the root layout, so the locale segment sets
 * lang/dir from the client. RTL is handled here too, ready for the first
 * right-to-left locale the network picks up.
 */
export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = LOCALE_META[locale].dir;
  }, [locale]);
  return null;
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import HtmlLang from "@/components/HtmlLang";
import { getDict } from "@/data/dict";
import { LOCALES, LOCALE_META, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    // lang on a wrapper, not only <html>: the root layout renders <html>
    // before the locale is known, and CSS keys label tracking off :lang().
    <div lang={locale}>
      <HtmlLang locale={locale} />
      <Nav locale={locale} searchPlaceholder={dict.searchPlaceholder} />
      {children}
      <footer className="foot">
        <div className="wrap foot__grid">
          <div>
            <p className="mono-label">REPTILINK</p>
            <p className="foot__note" style={{ marginTop: 10 }}>
              {dict.taglineAlt}
            </p>
          </div>
          <div>
            <p className="mono-label">{dict.fictionLayer}</p>
            <p className="foot__note" style={{ marginTop: 10 }}>
              {dict.fictionNotice}
            </p>
          </div>
          <div>
            <p className="mono-label">{dict.availableLanguages}</p>
            <ul className="foot__langs" style={{ marginTop: 10 }}>
              {LOCALES.map((l) => (
                <li key={l}>
                  <Link href={`/${l}`} hrefLang={l}>
                    {LOCALE_META[l].code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

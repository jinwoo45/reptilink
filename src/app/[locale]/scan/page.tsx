import type { Metadata } from "next";
import Scan from "@/components/Scan";
import { getDict } from "@/data/dict";
import { resolveLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);
  return {
    title: "REPTILIAN INDEX",
    description: dict.scanIntro,
    alternates: localeAlternates(locale, "/scan"),
  };
}

export default async function ScanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">IDENTITY SCAN</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          REPTILIAN INDEX
        </h1>
      </div>
      <Scan locale={locale} dict={dict} />
    </main>
  );
}

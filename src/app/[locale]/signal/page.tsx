import type { Metadata } from "next";
import Feed from "@/components/Feed";
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
    title: dict.globalFeed,
    description: dict.feedIntro,
    alternates: localeAlternates(locale, "/signal"),
  };
}

export default async function SignalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">GLOBAL</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          {dict.globalFeed}
        </h1>
        <p className="page__intro">{dict.feedIntro}</p>
      </div>
      <Feed locale={locale} dict={dict} />
    </main>
  );
}

import type { Metadata } from "next";
import Channel from "@/components/Channel";
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
    title: dict.channel,
    description: dict.channelIntro,
    alternates: localeAlternates(locale, "/channel"),
  };
}

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);

  return (
    <main className="page wrap">
      <div className="page__head">
        <p className="mono-label">CONTACT ESTABLISHED</p>
        <h1 className="display--sm" style={{ marginTop: 10 }}>
          {dict.channel}
        </h1>
        <p className="page__intro">{dict.channelIntro}</p>
      </div>
      <Channel locale={locale} dict={dict} />
    </main>
  );
}

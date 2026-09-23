import { redirect } from "next/navigation";
import { resolveLocale } from "@/lib/i18n";

/** The channel became the home page; old links land on it. */
export default async function ChannelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  redirect(`/${resolveLocale((await params).locale)}`);
}

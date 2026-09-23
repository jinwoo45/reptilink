import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { ARCHIVE } from "@/data/archive";

const BASE = "https://reptilink.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/signal", "/radar", "/archive", "/scan"];
  const entries: MetadataRoute.Sitemap = [{ url: BASE, priority: 1 }];

  for (const locale of LOCALES) {
    for (const path of paths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE}/${l}${path}`])
          ),
        },
      });
    }
    for (const node of ARCHIVE) {
      entries.push({
        url: `${BASE}/${locale}/archive/${node.slug}`,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE}/${l}/archive/${node.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}

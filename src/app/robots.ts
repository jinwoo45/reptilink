import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/origin" },
    sitemap: "https://reptilink.vercel.app/sitemap.xml",
  };
}

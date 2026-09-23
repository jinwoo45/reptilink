import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reptilink.vercel.app"),
  title: {
    default: "REPTILINK — EVERY LANGUAGE. SAME SIGNAL.",
    template: "%s — REPTILINK",
  },
  description:
    "A multilingual underground network for the world's strangest stories. Write in your language, read the world in yours.",
  applicationName: "REPTILINK",
  // Pages outside a locale (/origin) fall back to this; locale pages carry
  // their own localized card via [locale]/opengraph-image.
  openGraph: {
    type: "website",
    siteName: "REPTILINK",
    title: "REPTILINK — EVERY LANGUAGE. SAME SIGNAL.",
    description:
      "A multilingual underground network for the world's strangest stories.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "REPTILINK" }],
  },
  twitter: { card: "summary_large_image" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        />
        {/*
          THE SIGNAL IS ALREADY INSIDE YOU.
          If you are reading the source, you are already looking in the right place.
          ACCESS: /origin
        */}
      </head>
      <body>{children}</body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import AudioToggle from "./AudioToggle";

const LINKS = [
  { href: "", label: "HOME" },
  { href: "/signal", label: "SIGNAL" },
  { href: "/radar", label: "RADAR" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/channel", label: "CHANNEL" },
  { href: "/scan", label: "INDEX" },
];

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);

  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <Link href={`/${locale}`} className="nav__mark">
          REPTILINK
        </Link>

        <nav className="nav__links" aria-label="primary">
          {LINKS.map((l) => {
            const href = `/${locale}${l.href}`;
            const active =
              l.href === "" ? rest === "" : rest.startsWith(l.href);
            return (
              <Link
                key={l.label}
                href={href}
                className={`nav__link${active ? " nav__link--on" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav__right">
          <AudioToggle />
          <div className="lang">
            <button
              className="lang__btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              {LOCALE_META[locale].code} ▾
            </button>
            {open && (
              <ul className="lang__menu">
                {LOCALES.map((l) => (
                  <li key={l}>
                    {/* Swapping only the locale segment keeps the reader in place. */}
                    <Link
                      href={`/${l}${rest}`}
                      className={l === locale ? "toxic" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {LOCALE_META[l].code} · {LOCALE_META[l].native}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

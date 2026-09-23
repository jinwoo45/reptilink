"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import AudioToggle from "./AudioToggle";

const LINKS = [
  { href: "/signal", label: "SIGNAL" },
  { href: "/radar", label: "RADAR" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/scan", label: "INDEX" },
  // The header search box stands in for this on wide screens.
  { href: "/search", label: "⌕ SEARCH", narrowOnly: true },
];

/**
 * Laid out the way Blur lays out its bar: mark and sections on the left, one
 * search box in the middle, and a single filled button on the right — here,
 * the way back to the reptilian.
 */
export default function Nav({
  locale,
  searchPlaceholder,
}: {
  locale: Locale;
  searchPlaceholder: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "";
  const onSearchPage = rest.startsWith("/search");
  const links = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);

  // On narrow screens the links scroll sideways; keep the current one in view.
  useEffect(() => {
    const row = links.current;
    const on = row?.querySelector<HTMLElement>(".nav__link--on");
    if (!row || !on) return;
    // Measured against the row itself: offsetLeft would be relative to the
    // sticky header, not to the scrolling row.
    const x =
      on.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
    row.scrollTo({ left: x - row.clientWidth / 2 + on.clientWidth / 2 });
  }, [pathname]);

  // "/" jumps to search from anywhere, unless the reader is already typing.
  // The search page binds its own box.
  useEffect(() => {
    if (onSearchPage) return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearchPage]);

  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <Link href={`/${locale}`} className="nav__mark glow">
          REPTILINK
        </Link>

        <nav className="nav__links" aria-label="primary" ref={links}>
          {LINKS.map((l) => {
            const active = rest.startsWith(l.href);
            return (
              <Link
                key={l.label}
                href={`/${locale}${l.href}`}
                className={`nav__link${active ? " nav__link--on" : ""}${
                  l.narrowOnly ? " nav__link--narrow" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {!onSearchPage && (
          <form action={`/${locale}/search`} className="nav__search" role="search">
            <span aria-hidden>⌕</span>
            <input ref={search} type="search" name="q" placeholder={searchPlaceholder} aria-label="search" />
            <kbd aria-hidden>/</kbd>
          </form>
        )}

        <div className="nav__right">
          <AudioToggle />
          <div className="lang">
            <button className="lang__btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
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
                      onClick={(e) => {
                        setOpen(false);
                        // Keep the query: a search, or a received scan card,
                        // should reappear in the new language, not vanish.
                        if (window.location.search) {
                          e.preventDefault();
                          router.push(`/${l}${rest}${window.location.search}`);
                        }
                      }}
                    >
                      {LOCALE_META[l].code} · {LOCALE_META[l].native}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            href={`/${locale}`}
            className={`btn btn--primary nav__cta${rest === "" ? " nav__cta--on" : ""}`}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}

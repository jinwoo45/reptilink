"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  matchLocale,
  type Locale,
} from "@/lib/i18n";
import { getDict } from "@/data/dict";
import { NODES } from "@/data/nodes";

type Stage = "boot" | "language" | "identity";

const SPECIES = ["human", "reptilian", "other", "dontKnow"] as const;
export type Species = (typeof SPECIES)[number];

const BOOT_LINES = [
  "REPTILINK NETWORK",
  "HANDSHAKE ........... OK",
  "TRANSLATION NETWORK . ONLINE",
  "CARRIER ............. UNKNOWN ORIGIN",
];

export default function Entry() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("boot");
  const [progress, setProgress] = useState(0);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [picking, setPicking] = useState(false);
  const [species, setSpecies] = useState<Species | null>(null);
  const detected = useRef(false);

  // Language detection, exactly once, from the browser's own preference list.
  useEffect(() => {
    if (detected.current) return;
    detected.current = true;
    const stored = window.localStorage.getItem("reptilink:locale");
    const fromStore = stored && (LOCALES as readonly string[]).includes(stored);
    const next = fromStore
      ? (stored as Locale)
      : matchLocale(navigator.languages ?? [navigator.language]) ?? DEFAULT_LOCALE;
    setLocale(next);
  }, []);

  useEffect(() => {
    if (stage !== "boot") return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + 3 + Math.random() * 9);
      });
    }, 70);
    return () => window.clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "boot" && progress >= 100) {
      const id = window.setTimeout(() => setStage("language"), 420);
      return () => window.clearTimeout(id);
    }
  }, [stage, progress]);

  const dict = useMemo(() => getDict(locale), [locale]);
  const nodeGuess = useMemo(() => {
    const byLocale: Partial<Record<Locale, string>> = {
      ko: "seoul",
      ja: "tokyo",
      es: "mexico-city",
      pt: "sao-paulo",
      th: "bangkok",
      en: "london",
    };
    return NODES.find((n) => n.id === byLocale[locale]) ?? NODES[0];
  }, [locale]);

  const unknownSignals = useMemo(
    () => NODES.reduce((sum, n) => sum + n.signals, 0),
    []
  );

  const enter = useCallback(
    (chosen: Species) => {
      window.localStorage.setItem("reptilink:locale", locale);
      window.localStorage.setItem("reptilink:species", chosen);
      router.push(`/${locale}`);
    },
    [locale, router]
  );

  const bars = Math.round((Math.min(progress, 100) / 100) * 18);

  return (
    <main className="entry grid-lines">
      <div className="entry__inner">
        {stage === "boot" && (
          <section aria-live="polite">
            <pre className="entry__boot flicker">
              {BOOT_LINES.join("\n")}
            </pre>
            <p className="mono-label" style={{ marginTop: 26 }}>
              {dict.connecting}
            </p>
            <p className="entry__bar">
              <span className="toxic">{"█".repeat(bars)}</span>
              <span className="faint">{"░".repeat(18 - bars)}</span>{" "}
              <span className="dim">{Math.min(100, Math.floor(progress))}%</span>
            </p>
          </section>
        )}

        {stage === "language" && (
          <section>
            <p className="mono-label">{dict.languageDetected}</p>
            <h1 className="display" style={{ marginTop: 8 }}>
              {LOCALE_META[locale].native}
            </h1>

            <dl className="entry__readout">
              <div>
                <dt className="mono-label">NODE</dt>
                <dd>
                  {nodeGuess.name} / {nodeGuess.country}
                </dd>
              </div>
              <div>
                <dt className="mono-label">UNKNOWN SIGNALS</dt>
                <dd className="toxic">{unknownSignals.toLocaleString("en-US")}</dd>
              </div>
              <div>
                <dt className="mono-label">TRANSLATION NETWORK</dt>
                <dd className="toxic">ONLINE</dd>
              </div>
            </dl>

            {picking ? (
              <ul className="entry__langs">
                {LOCALES.map((l) => (
                  <li key={l}>
                    <button
                      className="btn"
                      onClick={() => {
                        setLocale(l);
                        setPicking(false);
                      }}
                      aria-pressed={l === locale}
                      style={
                        l === locale
                          ? { borderColor: "var(--toxic)", color: "var(--toxic)" }
                          : undefined
                      }
                    >
                      {LOCALE_META[l].code} · {LOCALE_META[l].native}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="entry__actions">
                <button className="btn" onClick={() => setStage("identity")}>
                  {dict.continueAs} →
                </button>
                <button
                  className="btn btn--ghost"
                  onClick={() => setPicking(true)}
                >
                  {dict.changeLanguage}
                </button>
              </div>
            )}
          </section>
        )}

        {stage === "identity" && (
          <section>
            <p className="display--sm rgb" data-text={dict.humansWereNotFirst}>
              {dict.humansWereNotFirst}
            </p>

            <h2 className="mono-label" style={{ marginTop: 34 }}>
              {dict.whatAreYou}
            </h2>

            <ul className="entry__species">
              {SPECIES.map((s) => (
                <li key={s}>
                  <button
                    className="btn"
                    onClick={() => setSpecies(s)}
                    aria-pressed={species === s}
                    style={
                      species === s
                        ? { borderColor: "var(--toxic)", color: "var(--toxic)" }
                        : undefined
                    }
                  >
                    [ {dict[s]} ]
                  </button>
                </li>
              ))}
            </ul>

            <p className="entry__note dim">{dict.identityNote}</p>

            <button
              className="btn"
              disabled={!species}
              onClick={() => species && enter(species)}
              style={{
                marginTop: 18,
                opacity: species ? 1 : 0.35,
                borderColor: species ? "var(--toxic)" : undefined,
                color: species ? "var(--toxic)" : undefined,
              }}
            >
              {dict.enter} <span className="caret" />
            </button>
          </section>
        )}
      </div>

      <footer className="entry__foot">
        <span className="mono-label">REPTILINK</span>
        <span className="mono-label">{dict.taglineAlt}</span>
      </footer>
    </main>
  );
}

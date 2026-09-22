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
import ReptilianEye from "./ReptilianEye";

type Stage = "boot" | "select";

const SPECIES = ["human", "reptilian", "other", "dontKnow"] as const;
export type Species = (typeof SPECIES)[number];

const BOOT_LINES = [
  "REPTILINK NETWORK",
  "HANDSHAKE ........... OK",
  "TRANSLATION NETWORK . ONLINE",
  "CARRIER ............. UNKNOWN ORIGIN",
];

const NODE_BY_LOCALE: Record<Locale, string> = {
  ko: "seoul",
  ja: "tokyo",
  es: "mexico-city",
  pt: "sao-paulo",
  th: "bangkok",
  en: "london",
};

export default function Entry() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("boot");
  const [progress, setProgress] = useState(0);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
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
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + 3 + Math.random() * 9)));
    }, 70);
    return () => window.clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "boot" && progress >= 100) {
      const id = window.setTimeout(() => setStage("select"), 420);
      return () => window.clearTimeout(id);
    }
  }, [stage, progress]);

  const dict = useMemo(() => getDict(locale), [locale]);
  const node = useMemo(
    () => NODES.find((n) => n.id === NODE_BY_LOCALE[locale]) ?? NODES[0],
    [locale]
  );
  const unknownSignals = useMemo(
    () => NODES.reduce((sum, n) => sum + n.signals, 0),
    []
  );

  const enter = useCallback(() => {
    if (!species) return;
    window.localStorage.setItem("reptilink:locale", locale);
    window.localStorage.setItem("reptilink:species", species);
    router.push(`/${locale}`);
  }, [locale, species, router]);

  const recognised = species === "reptilian";
  const bars = Math.round((Math.min(progress, 100) / 100) * 18);

  if (stage === "boot") {
    return (
      <main className="entry grid-lines">
        <div className="entry__inner">
          <section aria-live="polite">
            <pre className="entry__boot flicker">{BOOT_LINES.join("\n")}</pre>
            <p className="mono-label" style={{ marginTop: 26 }}>
              {dict.connecting}
            </p>
            <p className="entry__bar">
              <span className="toxic">{"█".repeat(bars)}</span>
              <span className="faint">{"░".repeat(18 - bars)}</span>{" "}
              <span className="dim">{Math.min(100, Math.floor(progress))}%</span>
            </p>
          </section>
        </div>
        <Foot tagline={dict.taglineAlt} />
      </main>
    );
  }

  return (
    <main className="entry entry--wide grid-lines">
      <div className="gate">
        <div className="gate__art">
          <ReptilianEye awake={species !== null} recognised={recognised} />

          <p className="gate__status" aria-live="polite">
            <span className={recognised ? "acid" : species ? "toxic" : "dim"}>
              ●
            </span>
            <span className="mono-label">
              {recognised
                ? "ENTITY RECOGNISED"
                : species
                  ? "CONTACT ESTABLISHED"
                  : "OBSERVATION · MUTUAL"}
            </span>
          </p>

          <p className="display--sm rgb gate__line" data-text={dict.humansWereNotFirst}>
            {dict.humansWereNotFirst}
          </p>

          <p
            key={recognised ? "recognised" : "watching"}
            className={`gate__whisper${species ? " gate__whisper--now" : ""}`}
          >
            {recognised ? dict.recognised : dict.lookingBack}
          </p>
          <dl className="gate__readout">
            <div>
              <dt className="mono-label">NODE</dt>
              <dd>
                {node.name} / {node.country}
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
        </div>

        <div className="gate__form">
          {/* Language and identity are one decision, taken on one screen. */}
          <section>
            <p className="mono-label">{dict.languageDetected}</p>
            <h1 className="gate__lang">{LOCALE_META[locale].native}</h1>
            <ul className="gate__options">
              {LOCALES.map((l) => (
                <li key={l}>
                  <button
                    className={`opt${l === locale ? " opt--on" : ""}`}
                    onClick={() => setLocale(l)}
                    aria-pressed={l === locale}
                    lang={l}
                  >
                    <span className="opt__code">{LOCALE_META[l].code}</span>
                    {LOCALE_META[l].native}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: 34 }}>
            <p className="mono-label">{dict.whatAreYou}</p>
            <ul className="gate__options" style={{ marginTop: 14 }}>
              {SPECIES.map((s) => (
                <li key={s}>
                  <button
                    className={`opt${species === s ? " opt--on" : ""}`}
                    onClick={() => setSpecies(s)}
                    aria-pressed={species === s}
                  >
                    <span className="opt__code">
                      {species === s ? "◉" : "○"}
                    </span>
                    {dict[s]}
                  </button>
                </li>
              ))}
            </ul>
            <p className="entry__note dim">{dict.identityNote}</p>
          </section>

          <button
            className={`btn gate__enter${species ? " gate__enter--ready" : ""}`}
            disabled={!species}
            onClick={enter}
          >
            {dict.enter}
            {species && <span className="caret" />}
          </button>
        </div>
      </div>

      <Foot tagline={dict.taglineAlt} />
    </main>
  );
}

function Foot({ tagline }: { tagline: string }) {
  return (
    <footer className="entry__foot">
      <span className="mono-label">REPTILINK</span>
      <span className="mono-label">{tagline}</span>
    </footer>
  );
}

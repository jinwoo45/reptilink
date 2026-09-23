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
import { NODES, defaultNodeFor } from "@/data/nodes";
import { ARCHIVE } from "@/data/archive";
import { decodeScan } from "@/data/quiz";
import { KEYS, readStored, writeStored } from "@/lib/storage";
import { SPECIES, isSpecies, type Species } from "@/lib/identity";
import ReptilianEye from "./ReptilianEye";

type Stage = "boot" | "select" | "return";

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
  const [species, setSpecies] = useState<Species | null>(null);
  const detected = useRef(false);

  // Language detection, exactly once, from the browser's own preference list.
  useEffect(() => {
    if (detected.current) return;
    detected.current = true;
    const stored = readStored(KEYS.locale);
    const fromStore = stored && (LOCALES as readonly string[]).includes(stored);
    const next = fromStore
      ? (stored as Locale)
      : matchLocale(navigator.languages ?? [navigator.language]) ?? DEFAULT_LOCALE;
    setLocale(next);

    const params = new URLSearchParams(window.location.search);

    // Someone sent a scan. The reason they clicked is that result, so it goes
    // straight to it — in the recipient's language, not the sharer's (§22).
    const shared = params.get("r");
    if (decodeScan(shared)) {
      router.replace(`/${next}/scan?r=${shared}`);
      return;
    }

    // Already declared at a previous visit: the gate has had its answer. A
    // short reconnect, then straight in. ?gate reopens it on purpose.
    const declared = readStored(KEYS.species);
    if (fromStore && isSpecies(declared) && !params.has("gate")) {
      setSpecies(declared);
      setStage("return");
    }
  }, [router]);

  useEffect(() => {
    if (stage !== "return") return;
    const id = window.setTimeout(() => router.replace(`/${locale}`), 1100);
    return () => window.clearTimeout(id);
  }, [stage, locale, router]);

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
    () => NODES.find((n) => n.id === defaultNodeFor(locale)) ?? NODES[0],
    [locale]
  );

  const enter = useCallback(() => {
    if (!species) return;
    writeStored(KEYS.locale, locale);
    writeStored(KEYS.species, species);
    router.push(`/${locale}`);
  }, [locale, species, router]);

  const recognised = species === "reptilian";
  const bars = Math.round((Math.min(progress, 100) / 100) * 18);

  if (stage === "return" && species) {
    return (
      <main className="entry grid-lines" lang={locale}>
        <div className="entry__inner">
          <section aria-live="polite">
            <pre className="entry__boot flicker">
              {[
                "REPTILINK NETWORK",
                "RECONNECTING ........ OK",
                `ENTITY .............. ${dict[species]}`,
                `LANGUAGE ............ ${LOCALE_META[locale].native}`,
              ].join("\n")}
            </pre>
            <p className="entry__bar">
              <span className={species === "reptilian" ? "acid" : "toxic"}>
                ● {species === "reptilian" ? "ENTITY RECOGNISED" : "CONTACT ESTABLISHED"}
              </span>
            </p>
          </section>
        </div>
        <Foot tagline={dict.taglineAlt} />
      </main>
    );
  }

  if (stage === "boot") {
    return (
      <main className="entry grid-lines" lang={locale}>
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
    <main className="entry entry--wide grid-lines" lang={locale}>
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
              <dt className="mono-label">ARCHIVE</dt>
              <dd className="toxic">{ARCHIVE.length}</dd>
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
            className={`btn gate__enter${species ? " btn--primary" : ""}`}
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

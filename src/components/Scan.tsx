"use client";

import { useMemo, useState } from "react";
import { QUIZ, CLASSES, ORIGINS, ELEMENTS } from "@/data/quiz";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import { NODES } from "@/data/nodes";

type Phase = "intro" | "asking" | "scanning" | "result";

/** Same answers, same result — the index is a hash, not a roll. */
function compute(answers: number[], locale: Locale) {
  const seed = answers.reduce((acc, a, i) => acc + (a + 1) * (i * 7 + 13), 0);
  const index = 41 + ((seed * 37) % 590) / 10;
  return {
    index,
    klass: CLASSES[seed % CLASSES.length],
    origin: ORIGINS[(seed * 3) % ORIGINS.length],
    element: ELEMENTS[(seed * 5) % ELEMENTS.length],
    hours: `0${1 + (seed % 3)}:${String(10 + (seed % 48)).padStart(2, "0")} — 0${
      4 + (seed % 2)
    }:${String(10 + ((seed * 3) % 48)).padStart(2, "0")}`,
    entityId: `${locale.toUpperCase()}-${
      NODES[seed % (NODES.length - 1)].name.slice(0, 3)
    }-${String(10000 + ((seed * 971) % 89999)).slice(0, 5)}`,
  };
}

export default function Scan({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const questions = QUIZ[locale];
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (answers.length === questions.length ? compute(answers, locale) : null),
    [answers, questions.length, locale]
  );

  function answer(i: number) {
    const next = [...answers, i];
    setAnswers(next);
    if (next.length === questions.length) {
      setPhase("scanning");
      window.setTimeout(() => setPhase("result"), 1400);
    } else {
      setStep(next.length);
    }
  }

  function reset() {
    setAnswers([]);
    setStep(0);
    setCopied(false);
    setPhase("asking");
  }

  if (phase === "intro") {
    return (
      <div className="panel pad scan">
        <p className="dim" style={{ maxWidth: "58ch" }}>
          {dict.scanIntro}
        </p>
        <button className="btn" style={{ marginTop: 20 }} onClick={() => setPhase("asking")}>
          {dict.startScan} <span className="caret" />
        </button>
      </div>
    );
  }

  if (phase === "asking") {
    const q = questions[step];
    return (
      <div className="panel pad scan">
        <p className="mono-label">
          {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </p>
        <h2 className="display--sm" style={{ marginTop: 12 }}>
          {q.q}
        </h2>
        <ul className="scan__answers">
          {q.a.map((a, i) => (
            <li key={a}>
              <button className="btn" onClick={() => answer(i)}>
                [ {a} ]
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (phase === "scanning" || !result) {
    return (
      <div className="panel pad scan" aria-live="polite">
        <p className="mono-label">{dict.scanning}</p>
        <p className="scan__bars toxic flicker" style={{ marginTop: 14 }}>
          ████████████████░░░
        </p>
      </div>
    );
  }

  const filled = Math.round((result.index / 100) * 19);

  return (
    <div className="panel pad scan" data-depth="3">
      <p className="mono-label">{dict.scanComplete}</p>
      <p className="mono-label" style={{ marginTop: 22 }}>
        REPTILIAN INDEX
      </p>
      <p className="scan__bars">
        <span className="toxic">{"█".repeat(filled)}</span>
        <span className="faint">{"░".repeat(19 - filled)}</span>
      </p>
      <p className="display" style={{ marginTop: 6 }}>
        {result.index.toFixed(1)}%
      </p>

      <dl className="scan__grid">
        <div>
          <dt className="mono-label">{dict.class}</dt>
          <dd>{result.klass}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.origin}</dt>
          <dd>{result.origin}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.activeHours}</dt>
          <dd>{result.hours}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.element}</dt>
          <dd>{result.element}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.language}</dt>
          <dd>{LOCALE_META[locale].native}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.entityId}</dt>
          <dd className="toxic">{result.entityId}</dd>
        </div>
      </dl>

      <div className="scan__actions">
        <button
          className="btn"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                `${window.location.origin}/?index=${result.index.toFixed(1)}`
              );
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? dict.copied : dict.shareCard}
        </button>
        <button className="btn btn--ghost" onClick={reset}>
          {dict.rescan}
        </button>
      </div>

      <p className="note" style={{ marginTop: 26 }}>
        {dict.scanIntro}
      </p>
    </div>
  );
}

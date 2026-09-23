"use client";

import { useEffect, useState } from "react";
import {
  QUIZ,
  decodeScan,
  encodeScan,
  scanResult,
  type ScanResult,
} from "@/data/quiz";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";

type Phase = "intro" | "asking" | "scanning" | "result" | "received";

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
  const [received, setReceived] = useState<{
    locale: Locale;
    result: ScanResult;
  } | null>(null);

  // Arrived from someone's share link: show their card before anything else.
  useEffect(() => {
    const shared = decodeScan(new URLSearchParams(window.location.search).get("r"));
    if (!shared) return;
    setReceived({
      locale: shared.locale,
      result: scanResult(shared.answers, shared.locale),
    });
    setPhase("received");
  }, []);

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

  function begin() {
    setAnswers([]);
    setStep(0);
    setCopied(false);
    setPhase("asking");
    // Leaving the received card behind: a reload should start the reader's own scan.
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  async function share() {
    const url = `${window.location.origin}/?r=${encodeScan(locale, answers)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (phase === "received" && received) {
    return (
      <div className="panel pad scan" data-depth="3">
        <p className="mono-label acid">{dict.receivedScan}</p>
        <p className="dim" style={{ marginTop: 10, maxWidth: "56ch" }}>
          {dict.receivedNote}
        </p>
        <ResultCard
          result={received.result}
          language={received.locale}
          dict={dict}
        />
        <div className="scan__actions">
          <button className="btn btn--primary" onClick={begin}>
            {dict.startScan} <span className="caret" />
          </button>
        </div>
        <p className="note" style={{ marginTop: 26 }}>
          {dict.scanIntro}
        </p>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="panel pad scan">
        <p className="dim" style={{ maxWidth: "58ch" }}>
          {dict.scanIntro}
        </p>
        <button className="btn btn--primary" style={{ marginTop: 20 }} onClick={begin}>
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

  if (phase === "scanning" || answers.length !== questions.length) {
    return (
      <div className="panel pad scan" aria-live="polite">
        <p className="mono-label">{dict.scanning}</p>
        <p className="scan__bars toxic flicker" style={{ marginTop: 14 }}>
          ████████████████░░░
        </p>
      </div>
    );
  }

  return (
    <div className="panel pad scan" data-depth="3">
      <p className="mono-label">{dict.scanComplete}</p>
      <ResultCard result={scanResult(answers, locale)} language={locale} dict={dict} />
      <div className="scan__actions">
        <button className="btn btn--primary" onClick={share}>
          {copied ? dict.copied : dict.shareCard}
        </button>
        <button className="btn btn--ghost" onClick={begin}>
          {dict.rescan}
        </button>
      </div>
      <p className="note" style={{ marginTop: 26 }}>
        {dict.scanIntro}
      </p>
    </div>
  );
}

function ResultCard({
  result,
  language,
  dict,
}: {
  result: ScanResult;
  /** The language the scan was answered in — the sharer's, on a received card. */
  language: Locale;
  dict: Dict;
}) {
  const filled = Math.round((result.index / 100) * 19);
  return (
    <>
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
          <dd>{LOCALE_META[language].native}</dd>
        </div>
        <div>
          <dt className="mono-label">{dict.entityId}</dt>
          <dd className="toxic">{result.entityId}</dd>
        </div>
      </dl>
    </>
  );
}

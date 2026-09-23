"use client";

import { useEffect, useRef, useState } from "react";
import ReptilianEye from "./ReptilianEye";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import { openingLine, reply, toOriginal } from "@/data/entity";
import { KEYS, readStored } from "@/lib/storage";
import { isSpecies, type Species } from "@/lib/identity";

type Message = {
  id: number;
  from: "entity" | "you";
  text: string;
  /** Present only on entity messages: the transmission before translation. */
  original?: string;
};

export default function Channel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [receiving, setReceiving] = useState(false);
  const [shown, setShown] = useState<number[]>([]);
  const [species, setSpecies] = useState<Species | null>(null);
  const turn = useRef(0);
  const log = useRef<HTMLDivElement>(null);

  // The channel opens itself; the entity speaks first, and remembers the gate.
  useEffect(() => {
    const stored = readStored(KEYS.species);
    const declared = isSpecies(stored) ? stored : null;
    setSpecies(declared);
    const text = openingLine(locale, declared);
    setMessages([{ id: 0, from: "entity", text, original: toOriginal(text) }]);
    turn.current = 0;
    setShown([]);
  }, [locale]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [messages, receiving]);

  function send() {
    const text = draft.trim();
    if (!text || receiving) return;
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "you", text },
    ]);
    setReceiving(true);

    // A pause long enough to feel like distance, short enough to be a channel.
    window.setTimeout(() => {
      const answer = reply(text, locale, turn.current++);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          from: "entity",
          text: answer.text,
          original: toOriginal(answer.text),
        },
      ]);
      setReceiving(false);
    }, 700 + Math.random() * 700);
  }

  return (
    <div className="chan">
      <aside className="chan__side">
        <ReptilianEye
          awake={receiving}
          recognised={species === "reptilian"}
          className="eye--sm"
        />
        <p className="gate__status" style={{ marginTop: 14 }}>
          <span className={receiving ? "toxic" : "dim"}>●</span>
          <span className="mono-label">
            {receiving ? dict.receiving : "CHANNEL OPEN"}
          </span>
        </p>
        <dl className="chan__meta">
          <div>
            <dt className="mono-label">CODENAME</dt>
            <dd>—</dd>
          </div>
          <div>
            <dt className="mono-label">{dict.origin}</dt>
            <dd>UNKNOWN</dd>
          </div>
          <div>
            <dt className="mono-label">{dict.language}</dt>
            <dd className="acid">UNCLASSIFIED</dd>
          </div>
          <div>
            <dt className="mono-label">YOUR {dict.language}</dt>
            <dd className="toxic">{LOCALE_META[locale].native}</dd>
          </div>
          <div>
            <dt className="mono-label">{dict.identityDeclared}</dt>
            <dd className={species === "reptilian" ? "acid" : undefined}>
              {species ? dict[species] : "—"}
            </dd>
          </div>
        </dl>
        <p className="note" style={{ marginTop: 18 }}>
          {dict.channelNotice}
        </p>
      </aside>

      <div className="chan__main panel">
        <div className="chan__log" ref={log} aria-live="polite">
          {messages.map((m) => {
            const open = shown.includes(m.id);
            return (
              <article
                key={m.id}
                className={`msg msg--${m.from}`}
              >
                <p className="mono-label">
                  {m.from === "you" ? dict.you : "ENTITY"}
                </p>
                <p className="msg__text">{m.text}</p>

                {m.original && (
                  <>
                    <div className="sig__trans">
                      <span className="tag">{dict.translatedFrom} ???</span>
                      <button
                        className="btn btn--ghost"
                        onClick={(e) => {
                          const article = e.currentTarget.closest("article");
                          setShown((s) =>
                            s.includes(m.id)
                              ? s.filter((x) => x !== m.id)
                              : [...s, m.id]
                          );
                          // Expanding the last message must not push it out of view.
                          requestAnimationFrame(() =>
                            article?.scrollIntoView({ block: "nearest" })
                          );
                        }}
                      >
                        {open ? dict.hideOriginal : dict.viewOriginal}
                      </button>
                    </div>
                    {open && (
                      <p className="msg__glyphs" aria-hidden>
                        {m.original}
                      </p>
                    )}
                  </>
                )}
              </article>
            );
          })}

          {receiving && (
            <p className="msg__typing mono-label flicker">
              {dict.receiving} <span className="caret" />
            </p>
          )}
        </div>

        <div className="chan__input">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // isComposing guards the IME: in Korean, Japanese and Thai input
              // Enter confirms a candidate before it ever means "send".
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={dict.channelPlaceholder}
            rows={2}
          />
          <button className="btn" onClick={send} disabled={!draft.trim() || receiving}>
            {dict.send}
          </button>
        </div>
      </div>
    </div>
  );
}

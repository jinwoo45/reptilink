"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReptilianEye from "./ReptilianEye";
import { LOCALE_META, isLocale, type Locale } from "@/lib/i18n";
import type { Dict } from "@/data/dict";
import {
  isEntityLine,
  lineOriginal,
  lineText,
  openingFor,
  respond,
  type EntityLine,
} from "@/data/entity";
import { KEYS, readStored, writeStored } from "@/lib/storage";
import { isSpecies, type Species } from "@/lib/identity";

/**
 * Entity messages are stored as lines, not text, and rendered in whatever
 * language the reader has now. The reader's own messages are stored as written:
 * their original is theirs, and it is never rewritten.
 */
type Message =
  | { id: number; from: "entity"; line: EntityLine }
  | { id: number; from: "you"; text: string; language: Locale };

type Stored = { messages: Message[]; turn: number };

const MAX_MESSAGES = 120;

function isMessage(v: unknown): v is Message {
  if (!v || typeof v !== "object") return false;
  const m = v as Record<string, unknown>;
  if (typeof m.id !== "number") return false;
  if (m.from === "entity") return isEntityLine(m.line);
  if (m.from === "you") return typeof m.text === "string" && isLocale(m.language as string);
  return false;
}

function loadChannel(): Stored | null {
  const raw = readStored(KEYS.channel);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Stored>;
    const messages = Array.isArray(parsed.messages)
      ? parsed.messages.filter(isMessage).slice(-MAX_MESSAGES)
      : [];
    if (!messages.length) return null;
    const turn = Number.isInteger(parsed.turn) ? (parsed.turn as number) : 0;
    return { messages, turn };
  } catch {
    return null;
  }
}

function fresh(species: Species | null): Stored {
  return { messages: [{ id: 0, from: "entity", line: openingFor(species) }], turn: 0 };
}

export default function Channel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [state, setState] = useState<Stored | null>(null);
  const [draft, setDraft] = useState("");
  const [receiving, setReceiving] = useState(false);
  const [shown, setShown] = useState<number[]>([]);
  const [species, setSpecies] = useState<Species | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const pending = useRef<number | undefined>(undefined);

  // Resume the stored conversation, or open a new one. The entity speaks first.
  useEffect(() => {
    const stored = readStored(KEYS.species);
    const declared = isSpecies(stored) ? stored : null;
    setSpecies(declared);

    const resumed = loadChannel() ?? fresh(declared);
    // Left mid-reply last time: answer now rather than leave the reader hanging.
    const last = resumed.messages[resumed.messages.length - 1];
    if (last.from === "you") {
      resumed.messages.push({
        id: last.id + 1,
        from: "entity",
        line: respond(last.text, resumed.turn),
      });
      resumed.turn += 1;
    }
    setState(resumed);
    return () => window.clearTimeout(pending.current);
  }, []);

  useEffect(() => {
    if (state) writeStored(KEYS.channel, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [state?.messages.length, receiving]);

  function nextId(messages: Message[]) {
    return messages.length ? messages[messages.length - 1].id + 1 : 0;
  }

  function send() {
    const text = draft.trim();
    if (!text || receiving || !state) return;
    setDraft("");
    setState((prev) =>
      prev && {
        ...prev,
        messages: [
          ...prev.messages,
          { id: nextId(prev.messages), from: "you" as const, text, language: locale },
        ].slice(-MAX_MESSAGES),
      }
    );
    setReceiving(true);

    // A pause long enough to feel like distance, short enough to be a channel.
    pending.current = window.setTimeout(() => {
      setState((prev) =>
        prev && {
          turn: prev.turn + 1,
          messages: [
            ...prev.messages,
            {
              id: nextId(prev.messages),
              from: "entity" as const,
              line: respond(text, prev.turn),
            },
          ].slice(-MAX_MESSAGES),
        }
      );
      setReceiving(false);
    }, 700 + Math.random() * 700);
  }

  function close() {
    window.clearTimeout(pending.current);
    setReceiving(false);
    setShown([]);
    setState(fresh(species));
  }

  function toggle(id: number, target: HTMLElement) {
    const article = target.closest("article");
    setShown((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    // Expanding the last message must not push it out of view.
    requestAnimationFrame(() => article?.scrollIntoView({ block: "nearest" }));
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
              {species ? dict[species] : "—"}{" "}
              <Link href="/?gate" className="chan__redeclare">
                ↺ {dict.redeclare}
              </Link>
            </dd>
          </div>
        </dl>
        <p className="note" style={{ marginTop: 18 }}>
          {dict.channelNotice}
        </p>
      </aside>

      <div className="chan__main panel">
        <div className="chan__log" ref={log} aria-live="polite">
          {state?.messages.map((m) => {
            if (m.from === "you") {
              return (
                <article key={m.id} className="msg msg--you">
                  <p className="mono-label">
                    {dict.you}
                    {m.language !== locale && ` · ${LOCALE_META[m.language].native}`}
                  </p>
                  <p className="msg__text" lang={m.language}>
                    {m.text}
                  </p>
                </article>
              );
            }
            const open = shown.includes(m.id);
            return (
              <article key={m.id} className="msg msg--entity">
                <p className="mono-label">ENTITY</p>
                <p className="msg__text">{lineText(m.line, locale)}</p>
                <div className="sig__trans">
                  <span className="tag">{dict.translatedFrom} ???</span>
                  <button
                    className="btn btn--ghost"
                    onClick={(e) => toggle(m.id, e.currentTarget)}
                  >
                    {open ? dict.hideOriginal : dict.viewOriginal}
                  </button>
                </div>
                {open && (
                  <p className="msg__glyphs" aria-hidden>
                    {lineOriginal(m.line)}
                  </p>
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
        <div className="chan__foot">
          <button className="btn btn--ghost" onClick={close}>
            ✕ {dict.clearChannel}
          </button>
        </div>
      </div>
    </div>
  );
}

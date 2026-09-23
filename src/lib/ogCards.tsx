import type { Locale } from "./i18n";
import { getDict } from "@/data/dict";
import {
  CLASSIFICATION_MARK,
  type ArchiveNode,
  type ArchiveText,
} from "@/data/archive";
import { resolveTranslation } from "./i18n";
import type { ScanResult } from "@/data/quiz";
import { loadGoogleFont, type OgFont } from "./ogFont";

export const OG_SIZE = { width: 1200, height: 630 };

const VOID = "#050505";
const BONE = "#e7e4db";
const DIM = "#8e8b83";
const FAINT = "#46443f";
const TOXIC = "#b6ff00";
const ACID = "#8d35ff";

/** Locales whose script the Latin mono face cannot draw. */
const SCRIPT_FONT: Partial<Record<Locale, string>> = {
  ko: "Noto Sans KR",
  ja: "Noto Sans JP",
  th: "Noto Sans Thai",
};

const MONO = "JetBrains Mono";

/**
 * How the headline wraps. Korean spaces its words, so it must break only at
 * spaces (keep-all) or a word splits across lines. Japanese breaks between
 * characters, which is correct for it. Thai has no spaces and the renderer
 * has no Thai dictionary, so it cannot wrap at all — it is sized to fit.
 */
function headline(locale: Locale, text: string) {
  if (locale === "th") {
    return { fontSize: Math.min(60, Math.floor(1100 / Math.max(1, [...text].length) * 1.25)), wordBreak: "normal" as const };
  }
  return { fontSize: 62, wordBreak: locale === "ko" ? ("keep-all" as const) : ("normal" as const) };
}

const LATIN =
  // Includes the accented capitals node names put into ENTITY IDs (SÃO…).
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;!?%/—–-·●'’()ÃÁÉÍÓÚÑÇÕÊÔÀ■△◇?☠";

/**
 * Loads what a card needs and reports the locale it can actually draw. If the
 * script font cannot be fetched, that is "en" — English copy, never boxes.
 */
async function prepare(locale: Locale, texts: (l: Locale) => string[]) {
  const scriptFamily = SCRIPT_FONT[locale];
  let used: Locale = locale;
  const fonts: OgFont[] = [];

  if (scriptFamily) {
    const subset = texts(locale).join("");
    const [bold, regular] = await Promise.all([
      loadGoogleFont(scriptFamily, 700, subset),
      loadGoogleFont(scriptFamily, 400, subset),
    ]);
    if (bold) {
      fonts.push(bold);
      if (regular) fonts.push(regular);
    } else {
      used = "en";
    }
  }

  const latin = LATIN + (SCRIPT_FONT[used] ? "" : texts(used).join(""));
  const [mono700, mono400] = await Promise.all([
    loadGoogleFont(MONO, 700, latin),
    loadGoogleFont(MONO, 400, latin),
  ]);
  if (mono700) fonts.push(mono700);
  if (mono400) fonts.push(mono400);

  const family = SCRIPT_FONT[used] ? `${SCRIPT_FONT[used]}, ${MONO}` : MONO;
  return { used, fonts, family };
}

/** The eye, as an image the renderer can embed. Pupil width follows `dilate`. */
function eyeDataUri(dilate: number): string {
  const rx = 15 * dilate;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<defs>
<radialGradient id="i" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d8ff6b"/><stop offset="34%" stop-color="#b6ff00"/><stop offset="72%" stop-color="#4d7a00"/><stop offset="100%" stop-color="#12250a"/></radialGradient>
<radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b6ff00" stop-opacity="0.28"/><stop offset="100%" stop-color="#b6ff00" stop-opacity="0"/></radialGradient>
<clipPath id="c"><path d="M18 200C90 96 310 96 382 200 310 304 90 304 18 200Z"/></clipPath>
</defs>
<circle cx="200" cy="200" r="186" fill="none" stroke="#1c1c1a"/>
<circle cx="200" cy="200" r="160" fill="url(#g)"/>
<g clip-path="url(#c)">
<rect width="400" height="400" fill="#0a0d06"/>
<circle cx="200" cy="200" r="86" fill="url(#i)"/>
<ellipse cx="200" cy="200" rx="${rx}" ry="74" fill="#040604"/>
<ellipse cx="168" cy="164" rx="26" ry="15" fill="#e7e4db" opacity="0.3" transform="rotate(-24 168 164)"/>
</g>
<path d="M18 200C90 96 310 96 382 200 310 304 90 304 18 200Z" fill="none" stroke="#b6ff00" stroke-width="1.6" stroke-opacity="0.55"/>
<path d="M18 200C90 96 310 96 382 200" fill="none" stroke="#b6ff00" stroke-width="2.6"/>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const frame = {
  width: "100%",
  height: "100%",
  display: "flex",
  background: VOID,
  backgroundImage:
    "linear-gradient(#141412 1px, transparent 1px), linear-gradient(90deg, #141412 1px, transparent 1px)",
  backgroundSize: "44px 44px",
  color: BONE,
  padding: "64px 72px",
} as const;

const label = {
  fontSize: 18,
  letterSpacing: 5,
  color: DIM,
  fontWeight: 400,
} as const;

/** The card every REPTILINK page shows when its link is shared. */
export async function defaultCard(locale: Locale) {
  const { used, fonts, family } = await prepare(locale, (l) => [getDict(l).tagline]);
  const dict = getDict(used);

  return {
    fonts,
    element: (
      <div style={{ ...frame, fontFamily: family }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600 }}>
          <div style={{ ...label, fontFamily: MONO, display: "flex" }}>
            {`REPTILIAN SIGNAL / ${locale.toUpperCase()}`}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                ...headline(used, dict.tagline),
                fontWeight: 700,
                lineHeight: 1.14,
                letterSpacing: -1,
                display: "flex",
              }}
            >
              {dict.tagline}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 24, color: TOXIC, marginTop: 28, letterSpacing: 2, fontWeight: 700 }}>
              EVERY LANGUAGE. SAME SIGNAL.
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 700, letterSpacing: 6 }}>REPTILINK</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eyeDataUri(1)} width={440} height={440} alt="" />
        </div>
      </div>
    ),
  };
}

/** The card a shared scan unfurls into, written in the sharer's language. */
export async function scanCard(locale: Locale, result: ScanResult) {
  const { used, fonts, family } = await prepare(locale, (l) => [getDict(l).receivedScan]);
  const dict = getDict(used);
  const filled = Math.round((result.index / 100) * 19);

  const rows: [string, string][] = [
    ["CLASS", result.klass],
    ["ORIGIN", result.origin],
    ["ELEMENT", result.element],
    ["ENTITY ID", result.entityId],
  ];

  return {
    fonts,
    element: (
      <div style={{ ...frame, fontFamily: family }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: ACID, fontWeight: 700, display: "flex", wordBreak: used === "ko" ? "keep-all" : "normal" }}>
              {dict.receivedScan}
            </div>
            <div style={{ ...label, fontFamily: MONO, marginTop: 30, display: "flex" }}>REPTILIAN INDEX</div>
            <div style={{ display: "flex", marginTop: 14 }}>
              {Array.from({ length: 19 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 26,
                    height: 22,
                    marginRight: 4,
                    background: i < filled ? TOXIC : "#1c1c1a",
                  }}
                />
              ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 132, fontWeight: 700, letterSpacing: -6, lineHeight: 1, marginTop: 14 }}>
              {`${result.index.toFixed(1)}%`}
            </div>
          </div>

          <div style={{ fontFamily: MONO, display: "flex", flexWrap: "wrap", borderTop: `1px solid ${FAINT}`, paddingTop: 22 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", width: 330, marginBottom: 16 }}>
                <div style={{ ...label, fontSize: 15, letterSpacing: 4 }}>{k}</div>
                <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, color: k === "ENTITY ID" ? TOXIC : BONE }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: MONO, display: "flex", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            <span>REPTILINK</span>
            <span style={{ color: DIM, marginLeft: 22, fontWeight: 400 }}>EVERY LANGUAGE. SAME SIGNAL.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* The higher the index, the wider it looks back. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eyeDataUri(1 + (result.index - 41) / 30)} width={360} height={360} alt="" />
        </div>
      </div>
    ),
  };
}

const CLASS_COLOR: Record<ArchiveNode["classification"], string> = {
  FACT: BONE,
  HYPOTHESIS: "#7fd4ff",
  MYTH: "#e0b24a",
  CONSPIRACY: "#ff3030",
  UNKNOWN: DIM,
  FICTION: ACID,
};

/** An archive node's card: its title, what it is, and what it says (§27). */
export async function nodeCard(locale: Locale, node: ArchiveNode) {
  const text = (l: Locale) =>
    resolveTranslation<ArchiveText>(node.sourceLanguage, node.i18n, l).value;
  const { used, fonts, family } = await prepare(locale, (l) => {
    const t = text(l);
    return [t.title, t.summary];
  });
  const t = text(used);
  const color = CLASS_COLOR[node.classification];

  return {
    fonts,
    element: (
      <div style={{ ...frame, fontFamily: family }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...label, fontFamily: MONO, display: "flex" }}>
              {`THE ARCHIVE / ${used.toUpperCase()}`}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontFamily: MONO,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 4,
                color,
                border: `1px solid ${color}`,
                padding: "6px 14px",
                alignSelf: "flex-start",
              }}
            >
              {`${CLASSIFICATION_MARK[node.classification]} ${node.classification}`}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: [...t.title].length > 18 ? 58 : 76,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: -1,
                wordBreak: used === "ko" ? "keep-all" : "normal",
              }}
            >
              {t.title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 24,
                lineHeight: 1.55,
                fontWeight: 400,
                color: DIM,
                wordBreak: used === "ko" ? "keep-all" : "normal",
              }}
            >
              {t.summary}
            </div>
          </div>
          <div style={{ fontFamily: MONO, display: "flex", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            <span>REPTILINK</span>
            <span style={{ color: DIM, marginLeft: 22, fontWeight: 400 }}>EVERY LANGUAGE. SAME SIGNAL.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eyeDataUri(1)} width={300} height={300} alt="" />
        </div>
      </div>
    ),
  };
}

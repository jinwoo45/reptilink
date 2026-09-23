import { isLocale, type Locale } from "@/lib/i18n";
import { NODES } from "./nodes";

export type Question = { q: string; a: string[] };

/**
 * REPTILIAN INDEX — an entertainment test. Five questions, four answers each,
 * localized in full so the share card reads natively wherever it lands.
 */
export const QUIZ: Record<Locale, Question[]> = {
  en: [
    { q: "You wake at the same minute every night. Which minute is it?", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "A light moves against the traffic of the sky. What do you do?", a: ["Record it", "Watch until it leaves", "Look away", "Follow it"] },
    { q: "Someone repeats a sentence you have not said out loud yet.", a: ["Say it anyway", "Change the subject", "Write it down", "Leave"] },
    { q: "Which surface do you trust least?", a: ["Mirrors", "Screens", "Water", "Concrete"] },
    { q: "You are handed one file from a sealed archive. It is about you.", a: ["Read all of it", "Read the last page", "Return it", "Burn it"] },
  ],
  ko: [
    { q: "매일 밤 같은 시각에 깬다. 몇 시였나?", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "하늘의 흐름을 거슬러 빛 하나가 움직인다. 당신은?", a: ["기록한다", "사라질 때까지 본다", "눈을 돌린다", "따라간다"] },
    { q: "아직 소리 내어 말하지 않은 문장을 누군가 그대로 반복한다.", a: ["그래도 말한다", "화제를 돌린다", "받아 적는다", "자리를 뜬다"] },
    { q: "가장 믿기 어려운 표면은?", a: ["거울", "화면", "물", "콘크리트"] },
    { q: "봉인된 아카이브에서 파일 하나를 받았다. 당신에 관한 것이다.", a: ["전부 읽는다", "마지막 장만 읽는다", "돌려준다", "태운다"] },
  ],
  ja: [
    { q: "毎晩同じ時刻に目が覚める。それは何時か。", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "空の流れに逆らって光が動く。あなたはどうする。", a: ["記録する", "消えるまで見る", "目をそらす", "追いかける"] },
    { q: "まだ声に出していない一文を、誰かがそのまま繰り返す。", a: ["それでも言う", "話題を変える", "書き留める", "その場を離れる"] },
    { q: "最も信用できない表面はどれか。", a: ["鏡", "画面", "水", "コンクリート"] },
    { q: "封印された保管庫から一つのファイルを渡された。あなたのことが書かれている。", a: ["全部読む", "最後の一枚だけ読む", "返す", "燃やす"] },
  ],
  es: [
    { q: "Despiertas al mismo minuto cada noche. ¿Qué minuto era?", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "Una luz se mueve contra el tráfico del cielo. ¿Qué haces?", a: ["Grabarla", "Mirar hasta que se vaya", "Apartar la vista", "Seguirla"] },
    { q: "Alguien repite una frase que aún no has dicho en voz alta.", a: ["Decirla igual", "Cambiar de tema", "Anotarla", "Irte"] },
    { q: "¿De qué superficie desconfías más?", a: ["Espejos", "Pantallas", "Agua", "Concreto"] },
    { q: "Te entregan un archivo de un fondo sellado. Trata de ti.", a: ["Leerlo entero", "Leer la última página", "Devolverlo", "Quemarlo"] },
  ],
  pt: [
    { q: "Você acorda no mesmo minuto todas as noites. Que minuto era?", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "Uma luz se move contra o tráfego do céu. O que você faz?", a: ["Gravar", "Olhar até sumir", "Desviar o olhar", "Seguir"] },
    { q: "Alguém repete uma frase que você ainda não disse em voz alta.", a: ["Dizer mesmo assim", "Mudar de assunto", "Anotar", "Ir embora"] },
    { q: "De qual superfície você desconfia mais?", a: ["Espelhos", "Telas", "Água", "Concreto"] },
    { q: "Entregam a você um arquivo de um acervo lacrado. É sobre você.", a: ["Ler tudo", "Ler a última página", "Devolver", "Queimar"] },
  ],
  th: [
    { q: "คุณตื่นในเวลาเดียวกันทุกคืน เวลานั้นคือกี่นาฬิกา", a: ["01:42", "02:17", "03:03", "04:18"] },
    { q: "แสงดวงหนึ่งเคลื่อนสวนทางกับท้องฟ้า คุณจะทำอย่างไร", a: ["บันทึกไว้", "มองจนกว่ามันจะหายไป", "หันไปทางอื่น", "ตามไป"] },
    { q: "มีคนพูดซ้ำประโยคที่คุณยังไม่ได้พูดออกมาดัง ๆ", a: ["พูดมันออกไปอยู่ดี", "เปลี่ยนเรื่อง", "จดเอาไว้", "เดินออกไป"] },
    { q: "พื้นผิวใดที่คุณไว้ใจน้อยที่สุด", a: ["กระจก", "หน้าจอ", "น้ำ", "คอนกรีต"] },
    { q: "คุณได้รับแฟ้มหนึ่งจากคลังที่ถูกผนึก มันเป็นเรื่องของคุณ", a: ["อ่านทั้งหมด", "อ่านแค่หน้าสุดท้าย", "คืนไป", "เผาทิ้ง"] },
  ],
};

export const CLASSES = [
  "URBAN REPTILIAN",
  "DEEP NODE",
  "SURFACE DWELLER",
  "CARRIER",
  "NULL ENTITY",
] as const;

export const ORIGINS = ["UNDERGROUND", "COASTAL", "ORBITAL", "EARTH NATIVE", "UNKNOWN"] as const;
export const ELEMENTS = ["NEON", "SALT", "IRON", "STATIC", "ASH"] as const;

export type ScanResult = {
  index: number;
  klass: (typeof CLASSES)[number];
  origin: (typeof ORIGINS)[number];
  element: (typeof ELEMENTS)[number];
  hours: string;
  entityId: string;
};

/** Same answers, same result — the index is a hash, not a roll. */
export function scanResult(answers: number[], locale: Locale): ScanResult {
  const seed = answers.reduce((acc, a, i) => acc + (a + 1) * (i * 7 + 13), 0);
  const places = NODES.filter((n) => !n.fiction);
  return {
    index: 41 + ((seed * 37) % 590) / 10,
    klass: CLASSES[seed % CLASSES.length],
    origin: ORIGINS[(seed * 3) % ORIGINS.length],
    element: ELEMENTS[(seed * 5) % ELEMENTS.length],
    hours: `0${1 + (seed % 3)}:${String(10 + (seed % 48)).padStart(2, "0")} — 0${
      4 + (seed % 2)
    }:${String(10 + ((seed * 3) % 48)).padStart(2, "0")}`,
    entityId: `${locale.toUpperCase()}-${places[seed % places.length].name.slice(0, 3)}-${String(
      10000 + ((seed * 971) % 89999)
    ).slice(0, 5)}`,
  };
}

/**
 * A share code carries the answers and the sharer's language, not the score:
 * the recipient recomputes the whole card, so it cannot be forged into a
 * number the scan could never produce. Example: "ko01230".
 */
export function encodeScan(locale: Locale, answers: number[]): string {
  return `${locale}${answers.join("")}`;
}

export function decodeScan(
  code: string | null
): { locale: Locale; answers: number[] } | null {
  if (!code) return null;
  const locale = code.slice(0, 2);
  if (!isLocale(locale)) return null;
  const digits = code.slice(2);
  if (digits.length !== QUIZ[locale].length || !/^[0-3]+$/.test(digits)) return null;
  return { locale, answers: [...digits].map(Number) };
}

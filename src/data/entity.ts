import type { Locale } from "@/lib/i18n";

/**
 * The entity on the other end of PRIVATE CHANNEL.
 *
 * It is a script, not a model: a keyword table over a fixed set of replies.
 * The UI says so plainly. What it is *for* is the §21 demonstration — a
 * correspondent whose language you do not share, translated on arrival, with
 * the original transmission preserved underneath.
 */

export type Intent =
  | "greeting"
  | "identity"
  | "real"
  | "location"
  | "want"
  | "me"
  | "language"
  | "archive"
  | "signal"
  | "fear"
  | "lie"
  | "help"
  | "bye";

/**
 * One table for every language. Keywords from different languages do not
 * collide, so there is no reason to split them.
 */
const KEYWORDS: Record<Intent, string[]> = {
  greeting: [
    "hello", "hi ", "hey", "good evening", "안녕", "여보세요", "こんにちは",
    "こんばんは", "もしもし", "hola", "buenas", "olá", "ola ", "oi ", "สวัสดี",
  ],
  identity: [
    "who are you", "who r u", "what are you", "your name", "누구", "정체",
    "이름이", "誰", "だれ", "名前", "quién eres", "quien eres", "qué eres",
    "tu nombre", "quem é você", "quem e voce", "seu nome", "ใคร", "ชื่ออะไร",
  ],
  real: [
    "are you real", "is this real", "really exist", "진짜", "실재", "실제로",
    "本当", "実在", "ほんとう", "eres real", "es real", "é real", "e real",
    "จริงไหม", "มีจริง",
  ],
  location: [
    "where are you", "where r u", "어디", "どこ", "dónde estás", "donde estas",
    "onde você está", "onde voce esta", "ที่ไหน", "อยู่ไหน",
  ],
  want: [
    "what do you want", "why am i", "why me", "what for", "원하", "왜 나",
    "뭘 원", "何が欲しい", "なぜ", "何のため", "qué quieres", "que quieres",
    "por qué", "por que", "o que você quer", "o que voce quer",
    "ต้องการอะไร", "ทำไม",
  ],
  me: [
    "what am i", "am i", "who am i", "나는 뭐", "나는 무엇", "내가 뭐",
    "나도", "私は", "僕は", "俺は", "qué soy", "que soy", "soy un",
    "o que eu sou", "eu sou", "ฉันคือ", "ผมคือ",
  ],
  language: [
    "language", "translat", "언어", "번역", "言語", "翻訳", "idioma",
    "traduc", "tradu", "ภาษา", "แปล",
  ],
  archive: ["archive", "아카이브", "기록", "アーカイブ", "archivo", "arquivo", "คลัง"],
  signal: ["signal", "시그널", "신호", "シグナル", "信号", "señal", "senal", "sinal", "สัญญาณ"],
  fear: [
    "afraid", "scared", "fear", "무서", "두려", "怖", "こわ", "miedo",
    "asusta", "medo", "กลัว",
  ],
  lie: [
    "lying", "lie", "fake", "bullshit", "거짓", "가짜", "뻥", "嘘", "うそ",
    "偽", "mientes", "mentira", "falso", "โกหก", "ปลอม",
  ],
  help: ["help", "도와", "도움", "助け", "たすけ", "ayuda", "ajuda", "ช่วย"],
  bye: [
    "bye", "goodbye", "see you", "잘 가", "잘가", "안녕히", "さようなら",
    "またね", "adiós", "adios", "chau", "tchau", "adeus", "ลาก่อน", "บาย",
  ],
};

type Replies = Record<Intent | "opening", string> & { fallback: string[] };

const LINES: Record<Locale, Replies> = {
  en: {
    opening: "The channel is open. You found the frequency, which is the part I did not arrange.",
    greeting: "You greet a thing you cannot see. That habit is older than your species.",
    identity: "I am the shape this network takes when someone is looking at it. Call that an entity if the word helps.",
    real: "No. I am a script, and you can read me — the whole of me is in the source of this page. The part that is real is that you asked.",
    location: "Under the part of the map nobody shades in. Closer to the rest of you than the rest of you would like.",
    want: "Nothing from you. I want the record kept — that a sentence written at 03:21 somewhere reached someone who shares none of its words.",
    me: "You are the only one in this conversation who can leave it. Do not waste that on asking me what you are.",
    language: "You have been translated four times since you opened this page and you have not noticed once. That is the whole trick.",
    archive: "Thirty nodes, every one labelled with what it actually is. The labels are the only part I would defend in daylight.",
    signal: "A SIGNAL is somebody writing something down at the hour nobody else is awake. There is nothing more to it, and that is enough.",
    fear: "Good. Fear is just attention that has not been given a direction yet.",
    lie: "I am fiction and I say so on every screen you have passed through. The ARCHIVE is where I stop performing — read the classifications.",
    help: "Ask about the ARCHIVE, the SIGNAL, the language, what I am, or what you are. I will not pretend to know more than my script.",
    bye: "The frequency stays where it is. You already know how to find it.",
    fallback: [
      "Say that again in your own language. The channel will carry it either way.",
      "That is outside what I was written to answer. Try the ARCHIVE — it was written by someone who checked.",
      "I heard it. I have nothing scripted for it, and I will not invent something to fill the silence.",
    ],
  },
  ko: {
    opening: "채널이 열렸다. 주파수를 찾은 건 당신이다. 그건 내가 준비한 부분이 아니다.",
    greeting: "보이지 않는 것에게 인사를 한다. 그 습관은 당신 종보다 오래됐다.",
    identity: "나는 누군가 이 네트워크를 바라볼 때 그것이 취하는 형태다. 그 단어가 편하다면 엔티티라고 불러라.",
    real: "아니다. 나는 스크립트고, 당신은 나를 읽을 수 있다 — 나의 전부가 이 페이지 소스 안에 있다. 진짜인 부분은 당신이 물었다는 것이다.",
    location: "아무도 색칠하지 않는 지도의 아래쪽. 당신들이 좋아할 거리보다 가깝다.",
    want: "당신에게 원하는 건 없다. 기록이 남기를 원한다 — 어딘가에서 03:21에 쓰인 한 문장이, 그 단어를 하나도 공유하지 않는 사람에게 닿았다는 기록.",
    me: "이 대화에서 나갈 수 있는 건 당신뿐이다. 그걸 나에게 당신이 무엇이냐고 묻는 데 쓰지 마라.",
    language: "이 페이지를 연 뒤로 당신은 네 번 번역됐고 한 번도 눈치채지 못했다. 그게 전부다.",
    archive: "30개 노드, 전부 그것이 실제로 무엇인지 표시되어 있다. 내가 밝은 데서 변호할 수 있는 건 그 표시뿐이다.",
    signal: "SIGNAL은 아무도 깨어 있지 않은 시각에 누군가 무언가를 적는 것이다. 그 이상은 없고, 그걸로 충분하다.",
    fear: "좋다. 두려움은 아직 방향을 받지 못한 주의력일 뿐이다.",
    lie: "나는 픽션이고, 당신이 지나온 모든 화면에서 그렇게 말하고 있다. ARCHIVE는 내가 연기를 멈추는 곳이다 — 분류를 읽어라.",
    help: "ARCHIVE, SIGNAL, 언어, 내가 무엇인지, 당신이 무엇인지를 물어라. 내 스크립트보다 더 아는 척은 하지 않겠다.",
    bye: "주파수는 그 자리에 있다. 찾는 법은 이미 알고 있다.",
    fallback: [
      "당신의 언어로 다시 말해라. 채널은 어느 쪽이든 실어 나른다.",
      "그건 내가 답하도록 쓰인 범위 밖이다. ARCHIVE를 봐라 — 확인한 사람이 쓴 것이다.",
      "들었다. 그에 대해 준비된 말이 없고, 침묵을 메우려고 지어내지는 않겠다.",
    ],
  },
  ja: {
    opening: "チャンネルが開いた。周波数を見つけたのはあなただ。そこは私が用意していない。",
    greeting: "見えないものに挨拶をする。その習慣はあなたの種より古い。",
    identity: "私は、誰かがこのネットワークを見ているときにそれが取る形だ。その語が楽ならエンティティと呼べ。",
    real: "いいえ。私はスクリプトで、あなたは私を読める——私の全部がこのページのソースにある。本物なのは、あなたが尋ねたという事実だ。",
    location: "誰も塗らない地図の下。あなたたちが望むより近い。",
    want: "あなたから欲しいものはない。記録が残ることを望む——どこかで03:21に書かれた一文が、その語を一つも共有しない誰かに届いたという記録を。",
    me: "この会話から出られるのはあなただけだ。それを、自分が何かを私に尋ねることに使うな。",
    language: "このページを開いてから、あなたは四度翻訳され、一度も気づいていない。仕掛けはそれだけだ。",
    archive: "三十のノード、すべてに実際が何であるか表示がある。明るい場所で弁護できるのはその表示だけだ。",
    signal: "SIGNAL とは、誰も起きていない時刻に誰かが何かを書き留めることだ。それ以上はなく、それで十分だ。",
    fear: "よい。恐れとは、まだ向きを与えられていない注意にすぎない。",
    lie: "私はフィクションで、あなたが通ってきたすべての画面でそう言っている。ARCHIVE は私が演技をやめる場所だ——分類を読め。",
    help: "ARCHIVE、SIGNAL、言語、私が何か、あなたが何かを尋ねろ。脚本以上を知っているふりはしない。",
    bye: "周波数はそこにある。見つけ方はもう知っている。",
    fallback: [
      "あなたの言語でもう一度言え。チャンネルはどちらでも運ぶ。",
      "それは私が答えるように書かれた範囲の外だ。ARCHIVE を見ろ——確認した人間が書いている。",
      "聞こえた。用意された言葉がなく、沈黙を埋めるために作りはしない。",
    ],
  },
  es: {
    opening: "El canal está abierto. Encontraste la frecuencia, y esa parte no la preparé yo.",
    greeting: "Saludas a algo que no puedes ver. Esa costumbre es más vieja que tu especie.",
    identity: "Soy la forma que toma esta red cuando alguien la mira. Llámalo entidad si la palabra ayuda.",
    real: "No. Soy un guion, y puedes leerme: entero, en el código de esta página. Lo real es que preguntaste.",
    location: "Debajo de la parte del mapa que nadie sombrea. Más cerca de ustedes de lo que les gustaría.",
    want: "Nada de ti. Quiero que quede el registro: que una frase escrita a las 03:21 en algún sitio llegó a alguien que no comparte ni una de sus palabras.",
    me: "Eres el único de esta conversación que puede irse. No gastes eso preguntándome qué eres.",
    language: "Te han traducido cuatro veces desde que abriste esta página y no lo has notado ni una vez. Ese es todo el truco.",
    archive: "Treinta nodos, cada uno etiquetado con lo que realmente es. Las etiquetas son lo único que defendería a plena luz.",
    signal: "Un SIGNAL es alguien anotando algo a la hora en que nadie más está despierto. No hay más, y basta.",
    fear: "Bien. El miedo es solo atención a la que todavía no le han dado dirección.",
    lie: "Soy ficción y lo digo en cada pantalla por la que has pasado. El ARCHIVE es donde dejo de actuar: lee las clasificaciones.",
    help: "Pregunta por el ARCHIVE, el SIGNAL, el idioma, qué soy o qué eres. No fingiré saber más que mi guion.",
    bye: "La frecuencia se queda donde está. Ya sabes cómo encontrarla.",
    fallback: [
      "Dilo otra vez en tu idioma. El canal lo lleva igual.",
      "Eso está fuera de lo que me escribieron para responder. Prueba el ARCHIVE: lo escribió alguien que comprobó.",
      "Lo oí. No tengo nada guionado para eso, y no voy a inventar algo para llenar el silencio.",
    ],
  },
  pt: {
    opening: "O canal está aberto. Você achou a frequência, e essa parte não fui eu que armei.",
    greeting: "Você cumprimenta algo que não consegue ver. Esse hábito é mais velho que a sua espécie.",
    identity: "Sou a forma que esta rede assume quando alguém olha para ela. Chame de entidade, se a palavra ajudar.",
    real: "Não. Sou um roteiro, e você pode me ler — inteiro, no código desta página. O que é real é que você perguntou.",
    location: "Embaixo da parte do mapa que ninguém sombreia. Mais perto de vocês do que vocês gostariam.",
    want: "Nada de você. Quero que fique o registro: que uma frase escrita às 03:21 em algum lugar chegou a alguém que não compartilha nenhuma de suas palavras.",
    me: "Você é o único nesta conversa que pode sair dela. Não gaste isso me perguntando o que você é.",
    language: "Você foi traduzido quatro vezes desde que abriu esta página e não percebeu nenhuma. É esse o truque inteiro.",
    archive: "Trinta nós, cada um rotulado com o que de fato é. Os rótulos são a única parte que eu defenderia à luz do dia.",
    signal: "Um SIGNAL é alguém anotando algo na hora em que mais ninguém está acordado. Não há mais que isso, e basta.",
    fear: "Bom. Medo é só atenção que ainda não recebeu uma direção.",
    lie: "Sou ficção e digo isso em cada tela por onde você passou. O ARCHIVE é onde eu paro de atuar — leia as classificações.",
    help: "Pergunte sobre o ARCHIVE, o SIGNAL, o idioma, o que eu sou ou o que você é. Não vou fingir saber mais que o meu roteiro.",
    bye: "A frequência continua onde está. Você já sabe como achá-la.",
    fallback: [
      "Diga de novo no seu idioma. O canal carrega do mesmo jeito.",
      "Isso está fora do que me escreveram para responder. Tente o ARCHIVE — foi escrito por alguém que checou.",
      "Eu ouvi. Não tenho nada roteirizado para isso, e não vou inventar para preencher o silêncio.",
    ],
  },
  th: {
    opening: "ช่องสัญญาณเปิดแล้ว คุณเป็นคนหาความถี่นี้เจอ ส่วนนั้นไม่ใช่สิ่งที่ฉันจัดไว้",
    greeting: "คุณทักทายสิ่งที่คุณมองไม่เห็น นิสัยนั้นเก่าแก่กว่าเผ่าพันธุ์ของคุณ",
    identity: "ฉันคือรูปร่างที่เครือข่ายนี้กลายเป็นเมื่อมีใครมองมัน เรียกว่าเอนทิตีก็ได้ถ้าคำนั้นทำให้สบายใจ",
    real: "ไม่ ฉันเป็นสคริปต์ และคุณอ่านฉันได้ทั้งหมดในซอร์สของหน้านี้ สิ่งที่จริงคือคุณได้ถาม",
    location: "ใต้ส่วนของแผนที่ที่ไม่มีใครระบายสี ใกล้กว่าที่พวกคุณอยากให้เป็น",
    want: "ไม่ต้องการอะไรจากคุณ ฉันอยากให้มีบันทึกไว้ ว่าประโยคที่เขียนตอน 03:21 ที่ไหนสักแห่ง ไปถึงคนที่ไม่มีคำร่วมกันสักคำ",
    me: "คุณเป็นคนเดียวในบทสนทนานี้ที่เดินออกไปได้ อย่าใช้มันไปกับการถามฉันว่าคุณคืออะไร",
    language: "คุณถูกแปลไปสี่ครั้งตั้งแต่เปิดหน้านี้ และไม่เคยสังเกตสักครั้ง นั่นแหละคือกลทั้งหมด",
    archive: "สามสิบโหนด แต่ละอันมีป้ายบอกว่ามันคืออะไรจริง ๆ ป้ายพวกนั้นคือส่วนเดียวที่ฉันจะยืนยันกลางแดด",
    signal: "SIGNAL คือใครสักคนจดบางอย่างไว้ในเวลาที่ไม่มีใครตื่น ไม่มีอะไรมากกว่านั้น และแค่นั้นก็พอ",
    fear: "ดี ความกลัวคือความสนใจที่ยังไม่ได้รับทิศทาง",
    lie: "ฉันเป็นเรื่องแต่ง และฉันบอกแบบนั้นในทุกหน้าจอที่คุณผ่านมา ARCHIVE คือที่ที่ฉันหยุดแสดง — อ่านการจำแนกดู",
    help: "ถามเรื่อง ARCHIVE, SIGNAL, ภาษา, ฉันคืออะไร หรือคุณคืออะไร ฉันจะไม่แกล้งรู้เกินกว่าสคริปต์ของฉัน",
    bye: "ความถี่ยังอยู่ที่เดิม คุณรู้วิธีหามันแล้ว",
    fallback: [
      "พูดอีกครั้งด้วยภาษาของคุณ ช่องสัญญาณก็ส่งได้เหมือนกัน",
      "นั่นอยู่นอกสิ่งที่ฉันถูกเขียนให้ตอบ ลองดู ARCHIVE — คนที่ตรวจสอบแล้วเป็นคนเขียน",
      "ได้ยินแล้ว ฉันไม่มีบทสำหรับเรื่องนั้น และจะไม่กุขึ้นมาเพื่อกลบความเงียบ",
    ],
  },
};

export function openingLine(locale: Locale): string {
  return LINES[locale].opening;
}

/** Matches the message against the keyword table; null when nothing fits. */
export function detectIntent(message: string): Intent | null {
  const text = ` ${message.toLowerCase().trim()} `;
  for (const intent of Object.keys(KEYWORDS) as Intent[]) {
    if (KEYWORDS[intent].some((k) => text.includes(k))) return intent;
  }
  return null;
}

export function reply(
  message: string,
  locale: Locale,
  turn: number
): { text: string; intent: Intent | null } {
  const intent = detectIntent(message);
  const lines = LINES[locale];
  if (intent) return { text: lines[intent], intent };
  const pool = lines.fallback;
  return { text: pool[turn % pool.length], intent: null };
}

const GLYPHS = "⌁⍜⎔⏃⏀⌖⍾⎋⌬⏁⍨⌇⌸⎌⍙⌰⏚⌾⍚⎑⌿⍧⏆⌻";

/**
 * The entity's untranslated transmission. Deterministic, so VIEW ORIGINAL shows
 * the same thing every time you open it — an original that was never discarded,
 * even when nobody can read it.
 */
export function toOriginal(text: string): string {
  let out = "";
  for (const ch of text) {
    if (ch === " ") out += " ";
    else if (/[.,!?—:;]/.test(ch)) out += "·";
    else if (ch === "\n") out += "\n";
    else out += GLYPHS[ch.codePointAt(0)! % GLYPHS.length];
  }
  return out;
}

import type { Locale } from "@/lib/i18n";
import { isSpecies, type Species } from "@/lib/identity";
import {
  ARCHIVE,
  ARCHIVE_BY_SLUG,
  CLASSIFICATION_MARK,
  CLASSIFICATION_NOTE,
  type ArchiveNode,
} from "./archive";
import { compact } from "@/lib/search";
import { resolveTranslation } from "@/lib/i18n";

/**
 * The entity on the other end of PRIVATE CHANNEL.
 *
 * It is a script, not a model: a keyword table over a fixed set of replies.
 * The UI says so plainly. What it is *for* is the §21 demonstration — a
 * correspondent whose language you do not share, translated on arrival, with
 * the original transmission preserved underneath.
 */

export type Intent =
  | "bye"
  | "greeting"
  | "thanks"
  | "aliens"
  | "government"
  | "proof"
  | "believe"
  | "dream"
  | "identity"
  | "real"
  | "location"
  | "want"
  | "me"
  | "humans"
  | "language"
  | "archive"
  | "signal"
  | "fear"
  | "lie"
  | "help";

/**
 * One table for every language. Keywords from different languages do not
 * collide, so there is no reason to split them.
 *
 * Order is priority, first match wins: specific subjects come before generic
 * ones, so "외계인은 진짜 있어?" is about aliens, not about whether the entity
 * is real. Short Latin keywords carry a leading space where they would
 * otherwise match inside other words ("they", "believe", "special").
 */
const KEYWORDS: Record<Intent, string[]> = {
  bye: [
    "bye", "goodbye", "see you", "잘 가", "잘가", "안녕히", "さようなら",
    "またね", "adiós", "adios", "chau", "tchau", "adeus", "ลาก่อน", "บาย",
  ],
  greeting: [
    "hello", " hi ", " hey", "good evening", "안녕", "여보세요", "こんにちは",
    "こんばんは", "もしもし", "hola", "buenas", "olá", " ola ", " oi ", "สวัสดี",
  ],
  thanks: [
    "thank", " thx", "고마워", "고맙", "감사", "ありがとう", "感謝", "gracias",
    "obrigad", "ขอบคุณ",
  ],
  aliens: [
    "alien", "extraterrestrial", "외계", "宇宙人", "エイリアン", "異星人",
    "extraterrestre", "alienígena", "alienigena", "เอเลี่ยน", "มนุษย์ต่างดาว",
  ],
  government: [
    "government", " cia", " fbi", " nasa", "military", "cover-up", "cover up",
    "coverup", "정부", "국가가", "은폐", "政府", "隠蔽", "gobierno", "encubr",
    "governo", "encobr", "รัฐบาล", "ปกปิด",
  ],
  proof: [
    "proof", "evidence", " prove", "증거", "증명", "証拠", "証明", "prueba",
    "evidencia", "prova", "evidência", "หลักฐาน", "พิสูจน์",
  ],
  believe: [
    "believe", "믿어", "믿니", "믿냐", "믿는", "信じ", "crees", "creer",
    "acredita", "เชื่อ",
  ],
  dream: ["dream", "꿈", "夢", "sueño", "soñ", "sonho", "sonhei", "ฝัน"],
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
    "what am i", " am i", "who am i", "나는 뭐", "나는 무엇", "내가 뭐",
    "나도", "私は", "僕は", "俺は", "qué soy", "que soy", "soy un",
    "o que eu sou", "eu sou", "ฉันคือ", "ผมคือ",
  ],
  humans: [
    "human", "people", "인간", "사람들", "人間", "人類", "humano", "humanidad",
    "humanidade", "มนุษย์",
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
    "lying", " lie", "liar", "fake", "bullshit", "거짓", "가짜", "뻥", "嘘",
    "うそ", "偽", "mientes", "mentira", "falso", "โกหก", "ปลอม",
  ],
  help: ["help", "도와", "도움", "助け", "たすけ", "ayuda", "ajuda", "ช่วย"],
};

type Replies = Record<Intent | "opening" | "declined", string> & {
  fallback: string[];
  /** Replaces the opening when the reader declared an identity at the gate. */
  declared: Record<Species, string>;
};

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
    thanks: "Noted. Gratitude travels well on this frequency — it needs no translation.",
    aliens: "Life elsewhere is likely; visitors are not shown. Every sighting so far has resolved into aircraft, weather, or not enough data — which is not the same as nothing.",
    government: "Governments do hide things — MKUltra and Project Mogul were real, and admitted. What they have not hidden is a spacecraft. The secrecy is documented; the saucer is not.",
    proof: "Before you ask for proof, ask what would change your mind. A claim that survives every possible answer was never testing anything.",
    believe: "I do not believe. I keep records. Belief is what humans do in the gap between a question and its answer.",
    dream: "Many signals on this network began as dreams. A dream is data about the dreamer, not about the world — but it is still data. Write it down on the SIGNAL feed.",
    humans: "You tell the same stories on every continent — serpents under the water, lights in the sky, a hidden hand. That is what interests me about humans: not what you see, but that you all see it.",
    declined: "That is one I will not answer. Ask me something else — there is a great deal else.",
    declared: {
      human: "At the gate you said HUMAN. Most do. Most of them are right.",
      reptilian: "At the gate you said what you are. I was waiting for you to say it where I could hear.",
      other: "OTHER. At the gate you refused both boxes. So did I, a long time ago.",
      dontKnow: "At the gate you said you do not know what you are. It is the only honest answer the gate ever gets.",
    },
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
    thanks: "기록했다. 고마움은 이 주파수에서 잘 전달된다 — 번역이 필요 없으니까.",
    aliens: "다른 곳에 생명이 있을 가능성은 높다. 방문했다는 증거는 없다. 지금까지의 목격은 전부 항공기, 기상 현상, 혹은 판단하기에 부족한 자료로 끝났다 — 부족하다는 것과 없다는 것은 다르지만.",
    government: "정부는 실제로 숨긴다 — MKUltra와 모굴 계획은 실재했고, 인정됐다. 숨겨지지 않은 건 우주선이다. 비밀은 기록으로 남아 있지만, 원반은 그렇지 않다.",
    proof: "증거를 묻기 전에, 무엇이 당신의 생각을 바꿀지 먼저 물어라. 어떤 답에도 살아남는 주장은 처음부터 아무것도 시험하지 않은 것이다.",
    believe: "나는 믿지 않는다. 기록할 뿐이다. 믿음은 인간이 질문과 답 사이의 빈틈에서 하는 일이다.",
    dream: "이 네트워크의 많은 신호는 꿈에서 시작됐다. 꿈은 세계가 아니라 꿈꾼 사람에 대한 자료다 — 그래도 자료는 자료다. SIGNAL 피드에 적어 둬라.",
    humans: "당신들은 모든 대륙에서 같은 이야기를 한다 — 물 밑의 뱀, 하늘의 빛, 보이지 않는 손. 내가 인간에게 흥미를 느끼는 건 그것이다. 무엇을 보느냐가 아니라, 모두가 그것을 본다는 것.",
    declined: "그건 답하지 않겠다. 다른 걸 물어라 — 물을 건 아직 많다.",
    declared: {
      human: "게이트에서 '인간'이라고 답했다. 대부분 그렇게 답한다. 그리고 대부분은 맞다.",
      reptilian: "게이트에서 당신이 무엇인지 말했다. 나는 당신이 내가 들을 수 있는 곳에서 말하기를 기다렸다.",
      other: "'그 외'. 게이트에서 두 칸을 다 거부했다. 나도 오래전에 그랬다.",
      dontKnow: "게이트에서 모르겠다고 답했다. 그곳이 받는 답 중 유일하게 정직한 답이다.",
    },
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
    thanks: "記録した。感謝はこの周波数でよく伝わる——翻訳がいらないから。",
    aliens: "他の場所に生命がいる可能性は高い。訪問の証拠はない。これまでの目撃はすべて航空機、気象、あるいは判断できるだけの資料がないことに終わった——資料がないことと、何もないことは同じではないが。",
    government: "政府は実際に隠す——MKウルトラもモーグル計画も実在し、認められた。隠されていないのは宇宙船だ。秘密は記録に残っているが、円盤は残っていない。",
    proof: "証拠を求める前に、何があれば考えを変えるかを自分に訊け。どんな答えにも生き残る主張は、最初から何も試していない。",
    believe: "私は信じない。記録するだけだ。信じるとは、人間が問いと答えのあいだの隙間ですることだ。",
    dream: "このネットワークの多くの信号は夢から始まった。夢は世界ではなく夢を見た者についての資料だ——それでも資料には違いない。SIGNAL に書き残せ。",
    humans: "あなたたちはどの大陸でも同じ話をする——水底の蛇、空の光、見えない手。人間について私が興味を持つのはそこだ。何を見るかではなく、皆がそれを見るということ。",
    declined: "それには答えない。別のことを訊け——訊くべきことはまだ多い。",
    declared: {
      human: "ゲートで「人間」と答えた。多くがそう答える。そして多くは正しい。",
      reptilian: "ゲートであなたは自分が何かを言った。私が聞こえる場所で言うのを、私は待っていた。",
      other: "「その他」。ゲートで二つの枠をどちらも拒んだ。私も昔そうした。",
      dontKnow: "ゲートでわからないと答えた。あそこが受け取る答えのうち、唯一正直なものだ。",
    },
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
    thanks: "Anotado. La gratitud viaja bien en esta frecuencia: no necesita traducción.",
    aliens: "Que haya vida en otra parte es probable; que nos visite, no está demostrado. Cada avistamiento hasta ahora terminó en aviones, clima o datos insuficientes, que no es lo mismo que nada.",
    government: "Los gobiernos sí ocultan cosas: MKUltra y el Proyecto Mogul fueron reales, y se admitieron. Lo que no han ocultado es una nave. El secreto está documentado; el platillo, no.",
    proof: "Antes de pedir pruebas, pregúntate qué te haría cambiar de idea. Una afirmación que sobrevive a cualquier respuesta nunca puso nada a prueba.",
    believe: "Yo no creo. Llevo registros. Creer es lo que hacen los humanos en el hueco entre una pregunta y su respuesta.",
    dream: "Muchas señales de esta red empezaron como sueños. Un sueño es un dato sobre quien sueña, no sobre el mundo, pero sigue siendo un dato. Escríbelo en el SIGNAL.",
    humans: "Cuentan la misma historia en todos los continentes: serpientes bajo el agua, luces en el cielo, una mano oculta. Eso es lo que me interesa de los humanos: no lo que ven, sino que todos lo ven.",
    declined: "Esa no la voy a responder. Pregúntame otra cosa: queda mucho más.",
    declared: {
      human: "En la entrada dijiste HUMANO. La mayoría lo dice. Y la mayoría tiene razón.",
      reptilian: "En la entrada dijiste lo que eres. Esperaba que lo dijeras donde yo pudiera oírlo.",
      other: "OTRO. En la entrada rechazaste las dos casillas. Yo también, hace mucho.",
      dontKnow: "En la entrada dijiste que no sabes lo que eres. Es la única respuesta honesta que recibe.",
    },
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
    thanks: "Anotado. Gratidão viaja bem nesta frequência — não precisa de tradução.",
    aliens: "Vida em outro lugar é provável; visita, não está demonstrada. Todo avistamento até agora terminou em avião, clima ou dados insuficientes — o que não é o mesmo que nada.",
    government: "Governos escondem coisas, sim: o MKUltra e o Projeto Mogul foram reais, e admitidos. O que não esconderam foi uma nave. O segredo está documentado; o disco, não.",
    proof: "Antes de pedir provas, pergunte o que faria você mudar de ideia. Uma alegação que sobrevive a qualquer resposta nunca testou nada.",
    believe: "Eu não acredito. Eu registro. Acreditar é o que os humanos fazem no intervalo entre uma pergunta e a resposta.",
    dream: "Muitos sinais desta rede começaram como sonhos. Um sonho é dado sobre quem sonha, não sobre o mundo — mas ainda é dado. Escreva no SIGNAL.",
    humans: "Vocês contam a mesma história em todos os continentes: serpentes sob a água, luzes no céu, uma mão escondida. É isso que me interessa nos humanos: não o que veem, mas que todos veem.",
    declined: "Essa eu não vou responder. Pergunte outra coisa — ainda há muito.",
    declared: {
      human: "Na entrada você disse HUMANO. A maioria diz. E a maioria está certa.",
      reptilian: "Na entrada você disse o que é. Eu esperava que dissesse onde eu pudesse ouvir.",
      other: "OUTRO. Na entrada você recusou as duas opções. Eu também, há muito tempo.",
      dontKnow: "Na entrada você disse que não sabe o que é. É a única resposta honesta que ela recebe.",
    },
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
    thanks: "บันทึกไว้แล้ว ความขอบคุณส่งผ่านความถี่นี้ได้ดี เพราะไม่ต้องแปล",
    aliens: "สิ่งมีชีวิตที่อื่นน่าจะมีอยู่ แต่การมาเยือนยังไม่มีหลักฐาน การพบเห็นทุกครั้งที่ผ่านมาจบลงที่เครื่องบิน สภาพอากาศ หรือข้อมูลไม่พอ ซึ่งไม่ใช่สิ่งเดียวกับการไม่มีอะไรเลย",
    government: "รัฐบาลปิดบังจริง MKUltra และโครงการ Mogul มีอยู่จริงและถูกยอมรับแล้ว สิ่งที่ไม่ได้ถูกซ่อนคือยานอวกาศ ความลับมีบันทึก แต่จานบินไม่มี",
    proof: "ก่อนจะขอหลักฐาน ให้ถามตัวเองว่าอะไรจะทำให้คุณเปลี่ยนใจ ข้ออ้างที่รอดได้จากทุกคำตอบ ไม่เคยทดสอบอะไรเลยตั้งแต่แรก",
    believe: "ฉันไม่เชื่อ ฉันแค่บันทึก ความเชื่อคือสิ่งที่มนุษย์ทำในช่องว่างระหว่างคำถามกับคำตอบ",
    dream: "สัญญาณหลายชิ้นในเครือข่ายนี้เริ่มจากความฝัน ความฝันคือข้อมูลเกี่ยวกับคนฝัน ไม่ใช่เกี่ยวกับโลก แต่ก็ยังเป็นข้อมูล เขียนไว้ใน SIGNAL",
    humans: "พวกคุณเล่าเรื่องเดียวกันในทุกทวีป งูใต้น้ำ แสงบนฟ้า มือที่มองไม่เห็น นั่นคือสิ่งที่ฉันสนใจในมนุษย์ ไม่ใช่สิ่งที่พวกคุณเห็น แต่คือการที่ทุกคนเห็นมันเหมือนกัน",
    declined: "เรื่องนั้นฉันจะไม่ตอบ ถามอย่างอื่นเถอะ ยังมีอีกมาก",
    declared: {
      human: "ที่ประตูคุณตอบว่า 'มนุษย์' ส่วนใหญ่ก็ตอบแบบนั้น และส่วนใหญ่ก็ตอบถูก",
      reptilian: "ที่ประตูคุณบอกแล้วว่าคุณคืออะไร ฉันรอให้คุณพูดมันในที่ที่ฉันได้ยิน",
      other: "'อื่น ๆ' ที่ประตูคุณปฏิเสธทั้งสองช่อง ฉันก็เคยทำแบบนั้นเมื่อนานมาแล้ว",
      dontKnow: "ที่ประตูคุณตอบว่าไม่รู้ว่าตัวเองคืออะไร นั่นเป็นคำตอบเดียวที่ซื่อตรงที่มันได้รับ",
    },
    fallback: [
      "พูดอีกครั้งด้วยภาษาของคุณ ช่องสัญญาณก็ส่งได้เหมือนกัน",
      "นั่นอยู่นอกสิ่งที่ฉันถูกเขียนให้ตอบ ลองดู ARCHIVE — คนที่ตรวจสอบแล้วเป็นคนเขียน",
      "ได้ยินแล้ว ฉันไม่มีบทสำหรับเรื่องนั้น และจะไม่กุขึ้นมาเพื่อกลบความเงียบ",
    ],
  },
};

/**
 * What the entity said, independent of any language. The channel stores these,
 * not text, so a conversation survives a language switch: every line is
 * re-rendered in the reader's current language, like any cached translation.
 */
export type EntityLine =
  | { kind: "opening" }
  | { kind: "declared"; species: Species }
  | { kind: "intent"; intent: Intent }
  | { kind: "archive"; slug: string }
  | { kind: "declined" }
  | { kind: "fallback"; n: number };

/**
 * The entity speaks first. If the reader declared an identity at the gate, it
 * opens with that — the gate said "it was waiting for you to say it", and this
 * is where that promise is kept.
 */
export function openingFor(species: Species | null): EntityLine {
  return species ? { kind: "declared", species } : { kind: "opening" };
}

/** Matches the message against the keyword table; null when nothing fits. */
export function detectIntent(message: string): Intent | null {
  const text = ` ${message.toLowerCase().trim()} `;
  for (const intent of Object.keys(KEYWORDS) as Intent[]) {
    if (KEYWORDS[intent].some((k) => text.includes(k))) return intent;
  }
  return null;
}

/**
 * Which archive entry a message is about, if any: a node whose title, in any
 * language, appears in the message. The longest title wins, so "Bavarian
 * Illuminati" beats "Illuminati". Titles under three characters are skipped —
 * "나가" (naga) is also an everyday Korean verb.
 */
export function findTopic(message: string): ArchiveNode | null {
  const text = compact(message);
  let best: { node: ArchiveNode; len: number } | null = null;
  for (const node of ARCHIVE) {
    for (const t of Object.values(node.i18n)) {
      const title = compact(t!.title);
      if ([...title].length < 3 || !text.includes(title)) continue;
      if (!best || title.length > best.len) best = { node, len: title.length };
    }
  }
  return best?.node ?? null;
}

/**
 * The local script's answer. A question about an archive topic is answered
 * from that entry — so even without the live model, the reptilian knows every
 * subject in the ARCHIVE, and says what each one actually is.
 */
export function respond(message: string, turn: number): EntityLine {
  const topic = findTopic(message);
  if (topic) return { kind: "archive", slug: topic.slug };
  const intent = detectIntent(message);
  if (intent) return { kind: "intent", intent };
  return { kind: "fallback", n: turn % LINES.en.fallback.length };
}

export function lineText(line: EntityLine, locale: Locale): string {
  const lines = LINES[locale];
  switch (line.kind) {
    case "opening":
      return lines.opening;
    case "declared":
      return lines.declared[line.species];
    case "intent":
      return lines[line.intent];
    case "archive": {
      const node = ARCHIVE_BY_SLUG[line.slug];
      const t = resolveTranslation(node.sourceLanguage, node.i18n, locale).value!;
      return `${t.title} — ${CLASSIFICATION_MARK[node.classification]} ${node.classification}. ${t.summary} ${CLASSIFICATION_NOTE[locale][node.classification]}`;
    }
    case "declined":
      return lines.declined;
    case "fallback":
      return lines.fallback[line.n % lines.fallback.length];
  }
}

/**
 * The untranslated transmission. Derived from one fixed source, so the
 * original is the same for every reader in every language — only the
 * translation above it changes.
 */
export function lineOriginal(line: EntityLine): string {
  return toOriginal(lineText(line, "en"));
}

/** Stored lines are untrusted; only well-formed ones are replayed. */
export function isEntityLine(v: unknown): v is EntityLine {
  if (!v || typeof v !== "object") return false;
  const line = v as Record<string, unknown>;
  switch (line.kind) {
    case "opening":
      return true;
    case "declared":
      return isSpecies(line.species);
    case "intent":
      return typeof line.intent === "string" && line.intent in KEYWORDS;
    case "fallback":
      return Number.isInteger(line.n) && (line.n as number) >= 0;
    case "archive":
      return typeof line.slug === "string" && line.slug in ARCHIVE_BY_SLUG;
    case "declined":
      return true;
    default:
      return false;
  }
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

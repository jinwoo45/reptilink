import type { Locale } from "@/lib/i18n";

/**
 * REPTILINK keeps its terminology (SIGNAL, ARCHIVE, RADAR, ENTITY) untranslated
 * by design — the network speaks one protocol. Only human-facing prose is localized.
 */
export type Dict = {
  tagline: string;
  taglineAlt: string;
  connecting: string;
  languageDetected: string;
  continueAs: string;
  changeLanguage: string;
  whatAreYou: string;
  identityNote: string;
  human: string;
  reptilian: string;
  other: string;
  dontKnow: string;
  enter: string;
  humansWereNotFirst: string;
  lookingBack: string;
  recognised: string;
  globalFeed: string;
  feedIntro: string;
  translatedFrom: string;
  viewOriginal: string;
  hideOriginal: string;
  translationPending: string;
  originalLabel: string;
  translationLabel: string;
  compose: string;
  composePlaceholder: string;
  transmit: string;
  localDemoNote: string;
  radarIntro: string;
  archiveIntro: string;
  classification: string;
  status: string;
  unverified: string;
  sourceLanguage: string;
  availableLanguages: string;
  connectedNodes: string;
  relatedSignals: string;
  scanIntro: string;
  startScan: string;
  scanning: string;
  scanComplete: string;
  rescan: string;
  shareCard: string;
  copied: string;
  entityId: string;
  class: string;
  origin: string;
  activeHours: string;
  element: string;
  node: string;
  language: string;
  disclosureLevel: string;
  species: string;
  interest: string;
  back: string;
  notFoundTitle: string;
  notFoundBody: string;
  access: string;
  fictionNotice: string;
  fictionLayer: string;
  audioOn: string;
  audioOff: string;
  signals: string;
  localSignals: string;
  activeLanguages: string;
  all: string;
  sampleNotice: string;
  countedNotice: string;
  transmissions: string;
  archiveNodes: string;
  channel: string;
  channelIntro: string;
  channelNotice: string;
  channelPlaceholder: string;
  send: string;
  receiving: string;
  you: string;
  clearChannel: string;
  receivedScan: string;
  receivedNote: string;
  remove: string;
  yourNode: string;
  identityDeclared: string;
  redeclare: string;
};

const en: Dict = {
  tagline: "THE SIGNAL IS ALREADY INSIDE YOU.",
  taglineAlt: "NO MATTER THE LANGUAGE. WE RECEIVE THE SAME SIGNAL.",
  connecting: "ESTABLISHING CONNECTION",
  languageDetected: "LANGUAGE DETECTED",
  continueAs: "CONTINUE",
  changeLanguage: "CHANGE LANGUAGE",
  whatAreYou: "WHAT ARE YOU?",
  identityNote:
    "This is not a biological classification. It is an ENTITY IDENTITY used inside REPTILINK, for entertainment only.",
  human: "HUMAN",
  reptilian: "REPTILIAN",
  other: "OTHER",
  dontKnow: "I DON'T KNOW",
  enter: "ENTER THE NETWORK",
  humansWereNotFirst: "HUMANS WERE NOT THE FIRST.",
  lookingBack: "Whatever this is, it is looking back at you.",
  recognised: "It knows what you are. It was waiting for you to say it.",
  globalFeed: "GLOBAL SIGNAL FEED",
  feedIntro:
    "Every SIGNAL on this network was written in someone else's language. You are reading them in yours.",
  translatedFrom: "TRANSLATED FROM",
  viewOriginal: "VIEW ORIGINAL SIGNAL",
  hideOriginal: "HIDE ORIGINAL",
  translationPending: "TRANSLATION PENDING — SHOWING ORIGINAL",
  originalLabel: "ORIGINAL",
  translationLabel: "TRANSLATION",
  compose: "TRANSMIT A SIGNAL",
  composePlaceholder: "Write in your own language. The network handles the rest.",
  transmit: "TRANSMIT",
  localDemoNote:
    "Demo build — your SIGNALs are kept in this browser only. Nothing is sent anywhere, and nobody else can see them.",
  radarIntro:
    "Activity is aggregated to city level only. REPTILINK never plots an individual position.",
  archiveIntro:
    "The ARCHIVE is not a document list. It is a graph. Follow the edges.",
  classification: "CLASSIFICATION",
  status: "STATUS",
  unverified: "UNVERIFIED",
  sourceLanguage: "SOURCE LANGUAGE",
  availableLanguages: "AVAILABLE LANGUAGES",
  connectedNodes: "CONNECTED NODES",
  relatedSignals: "RELATED SIGNALS",
  scanIntro:
    "An entertainment test. No data leaves your device, and the result means nothing.",
  startScan: "BEGIN IDENTITY SCAN",
  scanning: "SCANNING",
  scanComplete: "IDENTITY SCAN COMPLETE",
  rescan: "SCAN AGAIN",
  shareCard: "COPY SHARE LINK",
  copied: "LINK COPIED",
  entityId: "ENTITY ID",
  class: "CLASS",
  origin: "ORIGIN",
  activeHours: "ACTIVE HOURS",
  element: "ELEMENT",
  node: "NODE",
  language: "LANGUAGE",
  disclosureLevel: "DISCLOSURE LEVEL",
  species: "SPECIES",
  interest: "INTEREST",
  back: "BACK",
  notFoundTitle: "YOU WERE NOT SUPPOSED TO FIND THIS.",
  notFoundBody: "This node is not on any map. Someone removed it.",
  access: "ACCESS",
  fictionNotice:
    "REPTILINK is a fiction layer. Nothing here impersonates a real agency, and every entry is labelled with what it actually is.",
  fictionLayer: "FICTION LAYER",
  audioOn: "ENABLE AUDIO",
  audioOff: "DISABLE AUDIO",
  signals: "SIGNAL",
  localSignals: "LOCAL SIGNALS",
  activeLanguages: "ACTIVE LANGUAGES",
  all: "GLOBAL",
  sampleNotice:
    "These transmissions were written for this build, each one in six languages. They are specimens, not traffic — REPTILINK has no users yet, and no number on this site is estimated or invented.",
  countedNotice:
    "Counted from the transmissions that exist in this build. Nothing here is a projection.",
  transmissions: "TRANSMISSIONS",
  archiveNodes: "ARCHIVE NODES",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "Something answers on this frequency. It does not speak your language, so the channel translates — and keeps the original, as it does everywhere else.",
  channelNotice:
    "This entity is scripted, not a language model. It matches what you write against a fixed set of replies. Nothing you type leaves your browser.",
  channelPlaceholder: "Write in your own language.",
  send: "SEND",
  receiving: "RECEIVING",
  you: "YOU",
  clearChannel: "CLOSE CHANNEL",
  receivedScan: "SOMEONE SENT YOU THEIR SCAN",
  receivedNote: "They answered in their language. You are reading their result in yours.",
  remove: "REMOVE",
  yourNode: "YOUR NODE",
  identityDeclared: "DECLARED",
  redeclare: "RE-DECLARE",
};

const ko: Dict = {
  ...en,
  tagline: "신호는 이미 당신 안에 있다.",
  taglineAlt: "언어가 달라도, 우리는 같은 신호를 수신한다.",
  connecting: "연결 수립 중",
  languageDetected: "언어 감지됨",
  continueAs: "계속하기",
  changeLanguage: "언어 변경",
  whatAreYou: "당신은 무엇입니까?",
  identityNote:
    "생물학적 분류가 아닙니다. REPTILINK 안에서만 사용하는 엔터테인먼트용 ENTITY IDENTITY입니다.",
  human: "인간",
  reptilian: "렙틸리언",
  other: "그 외",
  dontKnow: "모르겠다",
  enter: "네트워크 진입",
  humansWereNotFirst: "인류가 처음은 아니었다.",
  lookingBack: "이것이 무엇이든, 당신을 마주 보고 있다.",
  recognised: "그것은 당신이 무엇인지 알고 있었다. 당신이 말하기를 기다렸을 뿐이다.",
  feedIntro:
    "이 네트워크의 모든 SIGNAL은 다른 언어로 쓰였습니다. 당신은 그것을 당신의 언어로 읽고 있습니다.",
  translatedFrom: "원문 언어",
  viewOriginal: "원문 신호 보기",
  hideOriginal: "원문 닫기",
  translationPending: "번역 대기 중 — 원문 표시",
  originalLabel: "원문",
  translationLabel: "번역",
  compose: "신호 송출",
  composePlaceholder: "당신의 언어로 쓰세요. 나머지는 네트워크가 처리합니다.",
  transmit: "송출",
  localDemoNote:
    "데모 빌드입니다 — 작성한 SIGNAL은 이 브라우저에만 저장됩니다. 어디로도 전송되지 않고, 다른 사람은 볼 수 없습니다.",
  radarIntro:
    "활동은 도시 단위로만 집계됩니다. REPTILINK는 개인의 위치를 표시하지 않습니다.",
  archiveIntro:
    "ARCHIVE는 문서 목록이 아니라 그래프입니다. 연결선을 따라가세요.",
  status: "상태",
  unverified: "미검증",
  sourceLanguage: "원본 언어",
  availableLanguages: "제공 언어",
  connectedNodes: "연결된 노드",
  relatedSignals: "관련 신호",
  scanIntro:
    "엔터테인먼트용 테스트입니다. 어떤 데이터도 기기 밖으로 나가지 않으며, 결과에는 아무 의미가 없습니다.",
  startScan: "정체성 스캔 시작",
  scanning: "스캔 중",
  scanComplete: "정체성 스캔 완료",
  rescan: "다시 스캔",
  shareCard: "공유 링크 복사",
  copied: "링크 복사됨",
  class: "분류",
  origin: "기원",
  activeHours: "활동 시간",
  element: "원소",
  language: "언어",
  disclosureLevel: "공개 등급",
  species: "종",
  interest: "관심사",
  back: "뒤로",
  notFoundTitle: "당신은 이곳을 찾으면 안 됐다.",
  notFoundBody: "이 노드는 어떤 지도에도 없습니다. 누군가 지웠습니다.",
  access: "접근",
  fictionNotice:
    "REPTILINK는 픽션 레이어입니다. 실제 기관을 사칭하지 않으며, 모든 항목에는 그것이 무엇인지 표시되어 있습니다.",
  audioOn: "오디오 켜기",
  audioOff: "오디오 끄기",
  localSignals: "지역 신호",
  sampleNotice:
    "이 전송들은 이 빌드를 위해 작성되었고, 각각 6개 언어로 되어 있습니다. 트래픽이 아니라 표본입니다 — REPTILINK에는 아직 사용자가 없고, 이 사이트의 어떤 숫자도 추정하거나 지어내지 않았습니다.",
  countedNotice:
    "이 빌드에 실제로 존재하는 전송을 센 값입니다. 추정치는 하나도 없습니다.",
  transmissions: "전송",
  archiveNodes: "아카이브 노드",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "이 주파수에서 무언가 응답합니다. 그것은 당신의 언어를 쓰지 않으므로 채널이 번역합니다 — 그리고 다른 곳과 마찬가지로 원문을 남겨둡니다.",
  channelNotice:
    "이 엔티티는 언어 모델이 아니라 스크립트입니다. 당신이 쓴 말을 정해진 응답 집합과 대조할 뿐입니다. 입력한 내용은 브라우저 밖으로 나가지 않습니다.",
  channelPlaceholder: "당신의 언어로 쓰세요.",
  send: "전송",
  receiving: "수신 중",
  you: "당신",
  clearChannel: "채널 닫기",
  receivedScan: "누군가 당신에게 스캔 결과를 보냈다",
  receivedNote: "그 사람은 자기 언어로 답했습니다. 당신은 그 결과를 당신의 언어로 읽고 있습니다.",
  remove: "삭제",
  yourNode: "나의 노드",
  identityDeclared: "선언한 정체",
  redeclare: "다시 선언",
  activeLanguages: "활성 언어",
};

const ja: Dict = {
  ...en,
  tagline: "信号はすでにあなたの中にある。",
  taglineAlt: "言語が違っても、我々は同じ信号を受信する。",
  connecting: "接続確立中",
  languageDetected: "言語を検出",
  continueAs: "続行",
  changeLanguage: "言語を変更",
  whatAreYou: "あなたは何者か？",
  identityNote:
    "生物学的分類ではありません。REPTILINK 内で使う娯楽用の ENTITY IDENTITY です。",
  human: "人間",
  reptilian: "レプティリアン",
  other: "その他",
  dontKnow: "わからない",
  enter: "ネットワークへ",
  humansWereNotFirst: "人類が最初ではなかった。",
  lookingBack: "これが何であれ、こちらを見返している。",
  recognised: "それはあなたが何かを知っていた。あなたが口にするのを待っていただけだ。",
  feedIntro:
    "このネットワークのすべての SIGNAL は別の言語で書かれました。あなたはそれを自分の言語で読んでいます。",
  translatedFrom: "原文言語",
  viewOriginal: "原文の信号を見る",
  hideOriginal: "原文を閉じる",
  translationPending: "翻訳待ち — 原文を表示",
  originalLabel: "原文",
  translationLabel: "翻訳",
  compose: "信号を送信",
  composePlaceholder: "あなたの言語で書いてください。あとはネットワークが処理します。",
  transmit: "送信",
  localDemoNote:
    "デモビルドです — 書いた SIGNAL はこのブラウザにのみ保存されます。どこにも送信されず、他の人には見えません。",
  radarIntro:
    "活動は都市単位でのみ集計されます。REPTILINK が個人の位置を示すことはありません。",
  archiveIntro:
    "ARCHIVE は文書一覧ではなくグラフです。辺をたどってください。",
  status: "状態",
  unverified: "未検証",
  sourceLanguage: "原文言語",
  availableLanguages: "対応言語",
  connectedNodes: "接続ノード",
  relatedSignals: "関連信号",
  scanIntro:
    "娯楽用のテストです。データは端末から出ず、結果に意味はありません。",
  startScan: "アイデンティティ・スキャン開始",
  scanning: "スキャン中",
  scanComplete: "アイデンティティ・スキャン完了",
  rescan: "再スキャン",
  shareCard: "共有リンクをコピー",
  copied: "リンクをコピーしました",
  class: "クラス",
  origin: "起源",
  activeHours: "活動時間",
  element: "元素",
  language: "言語",
  disclosureLevel: "開示レベル",
  species: "種",
  interest: "関心",
  back: "戻る",
  notFoundTitle: "ここを見つけるはずではなかった。",
  notFoundBody: "このノードはどの地図にもありません。誰かが消しました。",
  access: "アクセス",
  fictionNotice:
    "REPTILINK はフィクション・レイヤーです。実在の機関を騙ることはなく、各項目には性質が明示されています。",
  audioOn: "音声をオン",
  audioOff: "音声をオフ",
  localSignals: "ローカル信号",
  sampleNotice:
    "これらの送信はこのビルドのために書かれ、それぞれ6言語で用意されています。トラフィックではなく標本です——REPTILINK にはまだ利用者がおらず、このサイトのどの数値も推定や捏造ではありません。",
  countedNotice:
    "このビルドに実在する送信を数えた値です。推計は一つもありません。",
  transmissions: "送信",
  archiveNodes: "アーカイブ・ノード",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "この周波数では何かが応答します。あなたの言語を話さないため、チャンネルが翻訳します——そして他と同じく原文を残します。",
  channelNotice:
    "このエンティティは言語モデルではなくスクリプトです。入力を決められた応答集合と照合するだけです。書いた内容がブラウザの外に出ることはありません。",
  channelPlaceholder: "あなたの言語で書いてください。",
  send: "送信",
  receiving: "受信中",
  you: "あなた",
  clearChannel: "チャンネルを閉じる",
  receivedScan: "誰かがあなたにスキャン結果を送った",
  receivedNote: "その人は自分の言語で答えました。あなたはその結果を自分の言語で読んでいます。",
  remove: "削除",
  yourNode: "あなたのノード",
  identityDeclared: "申告した正体",
  redeclare: "申告し直す",
  activeLanguages: "使用言語",
};

const es: Dict = {
  ...en,
  tagline: "LA SEÑAL YA ESTÁ DENTRO DE TI.",
  taglineAlt: "NO IMPORTA EL IDIOMA. RECIBIMOS LA MISMA SEÑAL.",
  connecting: "ESTABLECIENDO CONEXIÓN",
  languageDetected: "IDIOMA DETECTADO",
  continueAs: "CONTINUAR",
  changeLanguage: "CAMBIAR IDIOMA",
  whatAreYou: "¿QUÉ ERES?",
  identityNote:
    "No es una clasificación biológica. Es una ENTITY IDENTITY usada dentro de REPTILINK, solo como entretenimiento.",
  human: "HUMANO",
  reptilian: "REPTILIANO",
  other: "OTRO",
  dontKnow: "NO LO SÉ",
  enter: "ENTRAR A LA RED",
  humansWereNotFirst: "LOS HUMANOS NO FUERON LOS PRIMEROS.",
  lookingBack: "Sea lo que sea, te está devolviendo la mirada.",
  recognised: "Sabe lo que eres. Solo esperaba a que lo dijeras.",
  feedIntro:
    "Cada SIGNAL de esta red se escribió en otro idioma. Tú los estás leyendo en el tuyo.",
  translatedFrom: "TRADUCIDO DEL",
  viewOriginal: "VER SEÑAL ORIGINAL",
  hideOriginal: "OCULTAR ORIGINAL",
  translationPending: "TRADUCCIÓN PENDIENTE — MOSTRANDO ORIGINAL",
  originalLabel: "ORIGINAL",
  translationLabel: "TRADUCCIÓN",
  compose: "TRANSMITIR UNA SEÑAL",
  composePlaceholder: "Escribe en tu idioma. La red se encarga del resto.",
  transmit: "TRANSMITIR",
  localDemoNote:
    "Versión de demostración: tus SIGNAL se guardan solo en este navegador. No se envían a ningún sitio y nadie más puede verlos.",
  radarIntro:
    "La actividad se agrega solo a nivel de ciudad. REPTILINK nunca ubica a una persona.",
  archiveIntro:
    "El ARCHIVE no es una lista de documentos. Es un grafo. Sigue las conexiones.",
  classification: "CLASIFICACIÓN",
  status: "ESTADO",
  unverified: "SIN VERIFICAR",
  sourceLanguage: "IDIOMA DE ORIGEN",
  availableLanguages: "IDIOMAS DISPONIBLES",
  connectedNodes: "NODOS CONECTADOS",
  relatedSignals: "SEÑALES RELACIONADAS",
  scanIntro:
    "Una prueba de entretenimiento. Ningún dato sale de tu dispositivo y el resultado no significa nada.",
  startScan: "INICIAR ESCANEO DE IDENTIDAD",
  scanning: "ESCANEANDO",
  scanComplete: "ESCANEO DE IDENTIDAD COMPLETO",
  rescan: "ESCANEAR DE NUEVO",
  shareCard: "COPIAR ENLACE",
  copied: "ENLACE COPIADO",
  class: "CLASE",
  origin: "ORIGEN",
  activeHours: "HORAS ACTIVAS",
  element: "ELEMENTO",
  language: "IDIOMA",
  disclosureLevel: "NIVEL DE DIVULGACIÓN",
  species: "ESPECIE",
  interest: "INTERESES",
  back: "VOLVER",
  notFoundTitle: "NO DEBÍAS ENCONTRAR ESTO.",
  notFoundBody: "Este nodo no está en ningún mapa. Alguien lo borró.",
  access: "ACCESO",
  fictionNotice:
    "REPTILINK es una capa de ficción. No suplanta a ninguna agencia real y cada entrada indica qué es en realidad.",
  audioOn: "ACTIVAR AUDIO",
  audioOff: "DESACTIVAR AUDIO",
  localSignals: "SEÑALES LOCALES",
  sampleNotice:
    "Estas transmisiones se escribieron para esta versión, cada una en seis idiomas. Son muestras, no tráfico: REPTILINK todavía no tiene usuarios, y ninguna cifra de este sitio es estimada ni inventada.",
  countedNotice:
    "Contado a partir de las transmisiones que existen en esta versión. Aquí no hay ninguna proyección.",
  transmissions: "TRANSMISIONES",
  archiveNodes: "NODOS DEL ARCHIVE",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "Algo responde en esta frecuencia. No habla tu idioma, así que el canal traduce, y conserva el original, como en todo lo demás.",
  channelNotice:
    "Esta entidad está escrita a mano, no es un modelo de lenguaje. Compara lo que escribes con un conjunto fijo de respuestas. Nada de lo que escribas sale de tu navegador.",
  channelPlaceholder: "Escribe en tu idioma.",
  send: "ENVIAR",
  receiving: "RECIBIENDO",
  you: "TÚ",
  clearChannel: "CERRAR CANAL",
  receivedScan: "ALGUIEN TE ENVIÓ SU ESCANEO",
  receivedNote: "Respondió en su idioma. Tú estás leyendo su resultado en el tuyo.",
  remove: "ELIMINAR",
  yourNode: "TU NODO",
  identityDeclared: "DECLARADO",
  redeclare: "VOLVER A DECLARAR",
  activeLanguages: "IDIOMAS ACTIVOS",
};

const pt: Dict = {
  ...en,
  tagline: "O SINAL JÁ ESTÁ DENTRO DE VOCÊ.",
  taglineAlt: "NÃO IMPORTA O IDIOMA. RECEBEMOS O MESMO SINAL.",
  connecting: "ESTABELECENDO CONEXÃO",
  languageDetected: "IDIOMA DETECTADO",
  continueAs: "CONTINUAR",
  changeLanguage: "MUDAR IDIOMA",
  whatAreYou: "O QUE VOCÊ É?",
  identityNote:
    "Não é uma classificação biológica. É uma ENTITY IDENTITY usada dentro da REPTILINK, apenas como entretenimento.",
  human: "HUMANO",
  reptilian: "REPTILIANO",
  other: "OUTRO",
  dontKnow: "NÃO SEI",
  enter: "ENTRAR NA REDE",
  humansWereNotFirst: "OS HUMANOS NÃO FORAM OS PRIMEIROS.",
  lookingBack: "Seja lá o que for, está olhando de volta para você.",
  recognised: "Ele sabe o que você é. Só esperava que você dissesse.",
  feedIntro:
    "Cada SIGNAL desta rede foi escrito em outro idioma. Você está lendo no seu.",
  translatedFrom: "TRADUZIDO DO",
  viewOriginal: "VER SINAL ORIGINAL",
  hideOriginal: "OCULTAR ORIGINAL",
  translationPending: "TRADUÇÃO PENDENTE — EXIBINDO ORIGINAL",
  originalLabel: "ORIGINAL",
  translationLabel: "TRADUÇÃO",
  compose: "TRANSMITIR UM SINAL",
  composePlaceholder: "Escreva no seu idioma. A rede cuida do resto.",
  transmit: "TRANSMITIR",
  localDemoNote:
    "Versão de demonstração: seus SIGNAL ficam salvos só neste navegador. Nada é enviado e ninguém mais pode vê-los.",
  radarIntro:
    "A atividade é agregada apenas por cidade. A REPTILINK nunca marca a posição de uma pessoa.",
  archiveIntro:
    "O ARCHIVE não é uma lista de documentos. É um grafo. Siga as ligações.",
  classification: "CLASSIFICAÇÃO",
  status: "ESTADO",
  unverified: "NÃO VERIFICADO",
  sourceLanguage: "IDIOMA DE ORIGEM",
  availableLanguages: "IDIOMAS DISPONÍVEIS",
  connectedNodes: "NÓS CONECTADOS",
  relatedSignals: "SINAIS RELACIONADOS",
  scanIntro:
    "Um teste de entretenimento. Nenhum dado sai do seu aparelho e o resultado não significa nada.",
  startScan: "INICIAR ESCANEAMENTO DE IDENTIDADE",
  scanning: "ESCANEANDO",
  scanComplete: "ESCANEAMENTO DE IDENTIDADE COMPLETO",
  rescan: "ESCANEAR DE NOVO",
  shareCard: "COPIAR LINK",
  copied: "LINK COPIADO",
  class: "CLASSE",
  origin: "ORIGEM",
  activeHours: "HORAS ATIVAS",
  element: "ELEMENTO",
  language: "IDIOMA",
  disclosureLevel: "NÍVEL DE DIVULGAÇÃO",
  species: "ESPÉCIE",
  interest: "INTERESSES",
  back: "VOLTAR",
  notFoundTitle: "VOCÊ NÃO DEVIA TER ENCONTRADO ISTO.",
  notFoundBody: "Este nó não está em mapa nenhum. Alguém o apagou.",
  access: "ACESSO",
  fictionNotice:
    "REPTILINK é uma camada de ficção. Não se passa por nenhuma agência real e cada entrada indica o que de fato é.",
  audioOn: "ATIVAR ÁUDIO",
  audioOff: "DESATIVAR ÁUDIO",
  localSignals: "SINAIS LOCAIS",
  sampleNotice:
    "Estas transmissões foram escritas para esta versão, cada uma em seis idiomas. São amostras, não tráfego: a REPTILINK ainda não tem usuários, e nenhum número deste site é estimado ou inventado.",
  countedNotice:
    "Contado a partir das transmissões que existem nesta versão. Não há nenhuma projeção aqui.",
  transmissions: "TRANSMISSÕES",
  archiveNodes: "NÓS DO ARCHIVE",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "Algo responde nesta frequência. Não fala o seu idioma, então o canal traduz — e guarda o original, como em todo o resto.",
  channelNotice:
    "Esta entidade é roteirizada, não é um modelo de linguagem. Ela compara o que você escreve com um conjunto fixo de respostas. Nada do que você digitar sai do seu navegador.",
  channelPlaceholder: "Escreva no seu idioma.",
  send: "ENVIAR",
  receiving: "RECEBENDO",
  you: "VOCÊ",
  clearChannel: "FECHAR CANAL",
  receivedScan: "ALGUÉM TE ENVIOU O ESCANEAMENTO",
  receivedNote: "A pessoa respondeu no idioma dela. Você está lendo o resultado no seu.",
  remove: "REMOVER",
  yourNode: "SEU NÓ",
  identityDeclared: "DECLARADO",
  redeclare: "DECLARAR DE NOVO",
  activeLanguages: "IDIOMAS ATIVOS",
};

const th: Dict = {
  ...en,
  tagline: "สัญญาณอยู่ในตัวคุณแล้ว",
  taglineAlt: "ไม่ว่าภาษาใด เรารับสัญญาณเดียวกัน",
  connecting: "กำลังสร้างการเชื่อมต่อ",
  languageDetected: "ตรวจพบภาษา",
  continueAs: "ดำเนินการต่อ",
  changeLanguage: "เปลี่ยนภาษา",
  whatAreYou: "คุณคืออะไร?",
  identityNote:
    "นี่ไม่ใช่การจำแนกทางชีววิทยา แต่เป็น ENTITY IDENTITY ที่ใช้ภายใน REPTILINK เพื่อความบันเทิงเท่านั้น",
  human: "มนุษย์",
  reptilian: "เรปทิเลียน",
  other: "อื่น ๆ",
  dontKnow: "ไม่รู้",
  enter: "เข้าสู่เครือข่าย",
  humansWereNotFirst: "มนุษย์ไม่ใช่สิ่งแรก",
  lookingBack: "ไม่ว่าสิ่งนี้คืออะไร มันกำลังมองกลับมาที่คุณ",
  recognised: "มันรู้ว่าคุณเป็นอะไร มันแค่รอให้คุณพูดออกมา",
  feedIntro:
    "ทุก SIGNAL ในเครือข่ายนี้ถูกเขียนด้วยภาษาอื่น คุณกำลังอ่านมันในภาษาของคุณ",
  translatedFrom: "แปลจาก",
  viewOriginal: "ดูสัญญาณต้นฉบับ",
  hideOriginal: "ซ่อนต้นฉบับ",
  translationPending: "รอการแปล — แสดงต้นฉบับ",
  originalLabel: "ต้นฉบับ",
  translationLabel: "คำแปล",
  compose: "ส่งสัญญาณ",
  composePlaceholder: "เขียนด้วยภาษาของคุณ ที่เหลือเครือข่ายจัดการเอง",
  transmit: "ส่ง",
  localDemoNote:
    "เวอร์ชันทดลอง — SIGNAL ของคุณถูกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น ไม่ถูกส่งไปที่ใด และไม่มีใครอื่นเห็น",
  radarIntro:
    "กิจกรรมถูกรวมในระดับเมืองเท่านั้น REPTILINK ไม่เคยระบุตำแหน่งของบุคคล",
  archiveIntro: "ARCHIVE ไม่ใช่รายการเอกสาร แต่เป็นกราฟ เดินตามเส้นเชื่อม",
  status: "สถานะ",
  unverified: "ยังไม่ยืนยัน",
  sourceLanguage: "ภาษาต้นฉบับ",
  availableLanguages: "ภาษาที่มี",
  connectedNodes: "โหนดที่เชื่อมต่อ",
  relatedSignals: "สัญญาณที่เกี่ยวข้อง",
  scanIntro:
    "แบบทดสอบเพื่อความบันเทิง ไม่มีข้อมูลออกจากเครื่องของคุณ และผลลัพธ์ไม่มีความหมายใด ๆ",
  startScan: "เริ่มสแกนอัตลักษณ์",
  scanning: "กำลังสแกน",
  scanComplete: "สแกนอัตลักษณ์เสร็จสิ้น",
  rescan: "สแกนอีกครั้ง",
  shareCard: "คัดลอกลิงก์",
  copied: "คัดลอกลิงก์แล้ว",
  class: "คลาส",
  origin: "ต้นกำเนิด",
  activeHours: "ช่วงเวลาที่ตื่นตัว",
  element: "ธาตุ",
  language: "ภาษา",
  disclosureLevel: "ระดับการเปิดเผย",
  species: "สปีชีส์",
  interest: "ความสนใจ",
  back: "ย้อนกลับ",
  notFoundTitle: "คุณไม่ควรพบสิ่งนี้",
  notFoundBody: "โหนดนี้ไม่มีอยู่ในแผนที่ใด มีใครบางคนลบมันไป",
  access: "เข้าถึง",
  fictionNotice:
    "REPTILINK เป็นชั้นเรื่องแต่ง ไม่แอบอ้างหน่วยงานจริง และทุกรายการระบุไว้ว่ามันคืออะไร",
  audioOn: "เปิดเสียง",
  audioOff: "ปิดเสียง",
  localSignals: "สัญญาณท้องถิ่น",
  sampleNotice:
    "ข้อความเหล่านี้ถูกเขียนขึ้นสำหรับบิลด์นี้ แต่ละชิ้นมีครบหกภาษา มันคือตัวอย่าง ไม่ใช่ทราฟฟิก — REPTILINK ยังไม่มีผู้ใช้ และไม่มีตัวเลขใดในเว็บนี้ที่ประมาณหรือกุขึ้น",
  countedNotice:
    "นับจากข้อความที่มีอยู่จริงในบิลด์นี้ ไม่มีการคาดการณ์ใด ๆ",
  transmissions: "การส่งสัญญาณ",
  archiveNodes: "โหนดของ ARCHIVE",
  channel: "PRIVATE CHANNEL",
  channelIntro:
    "มีบางสิ่งตอบกลับบนความถี่นี้ มันไม่ได้พูดภาษาของคุณ ช่องสัญญาณจึงแปลให้ และเก็บต้นฉบับไว้เหมือนที่อื่นทุกแห่ง",
  channelNotice:
    "เอนทิตีนี้เขียนด้วยสคริปต์ ไม่ใช่โมเดลภาษา มันเทียบสิ่งที่คุณพิมพ์กับชุดคำตอบที่กำหนดไว้ สิ่งที่คุณพิมพ์ไม่ออกไปจากเบราว์เซอร์",
  channelPlaceholder: "เขียนด้วยภาษาของคุณ",
  send: "ส่ง",
  receiving: "กำลังรับ",
  you: "คุณ",
  clearChannel: "ปิดช่องสัญญาณ",
  receivedScan: "มีคนส่งผลสแกนของเขามาให้คุณ",
  receivedNote: "เขาตอบด้วยภาษาของเขา คุณกำลังอ่านผลลัพธ์ด้วยภาษาของคุณ",
  remove: "ลบ",
  yourNode: "โหนดของคุณ",
  identityDeclared: "ตัวตนที่ประกาศ",
  redeclare: "ประกาศใหม่",
  activeLanguages: "ภาษาที่ใช้งาน",
};

export const DICT: Record<Locale, Dict> = { en, ko, ja, es, pt, th };

export function getDict(locale: Locale): Dict {
  return DICT[locale];
}

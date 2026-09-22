import type { Locale } from "@/lib/i18n";

export type Signal = {
  id: number;
  codename: string;
  node: string;
  time: string;
  originalLanguage: Locale;
  archive?: string;
  text: Partial<Record<Locale, string>>;
};

export const SIGNALS: Signal[] = [
  {
    id: 9182,
    codename: "coldblooded96",
    node: "seoul",
    time: "03:21",
    originalLanguage: "ko",
    archive: "reptilian",
    text: {
      ko: "또 같은 꿈을 꿨다. 지하철 3호선인데 역 이름이 전부 지워져 있었다.",
      en: "Same dream again. Seoul subway line 3, except every station name had been wiped off.",
      ja: "また同じ夢を見た。地下鉄3号線なのに、駅名がすべて消されていた。",
      es: "Otra vez el mismo sueño. La línea 3 del metro de Seúl, pero sin ningún nombre de estación.",
      pt: "De novo o mesmo sonho. Linha 3 do metrô de Seul, só que sem nenhum nome de estação.",
      th: "ฝันเรื่องเดิมอีกแล้ว รถไฟใต้ดินสายสามของโซล แต่ชื่อสถานีถูกลบหมด",
    },
  },
  {
    id: 9184,
    codename: "nyx_77",
    node: "tokyo",
    time: "02:48",
    originalLanguage: "ja",
    archive: "ufo",
    text: {
      ja: "昨夜、奇妙な光を見た。二分間、まったく動かなかった。飛行機はああいう止まり方をしない。",
      en: "Saw a strange light last night. It held completely still for two minutes. Aircraft do not stop like that.",
      ko: "어젯밤 이상한 빛을 봤다. 2분 동안 완전히 멈춰 있었다. 비행기는 그렇게 멈추지 않는다.",
      es: "Anoche vi una luz extraña. Se quedó totalmente quieta dos minutos. Un avión no se detiene así.",
      pt: "Ontem à noite vi uma luz estranha. Ficou parada dois minutos. Avião não para assim.",
      th: "เมื่อคืนเห็นแสงประหลาด มันนิ่งสนิทอยู่สองนาที เครื่องบินไม่หยุดแบบนั้น",
    },
  },
  {
    id: 9190,
    codename: "hueso_dorado",
    node: "mexico-city",
    time: "23:07",
    originalLanguage: "es",
    archive: "underground-civilization",
    text: {
      es: "Debajo del centro hay túneles que no aparecen en ningún plano público. Mi abuelo trabajó en ellos y nunca quiso decir para qué eran.",
      en: "There are tunnels under the city centre that appear on no public plan. My grandfather worked in them and never said what for.",
      ko: "도심 아래에는 어떤 공개 도면에도 없는 터널이 있다. 할아버지가 거기서 일했지만 용도는 끝내 말하지 않았다.",
      ja: "都心の地下には、公開図面のどこにも載らないトンネルがある。祖父はそこで働いたが、用途は決して語らなかった。",
      pt: "Há túneis sob o centro que não constam em nenhuma planta pública. Meu avô trabalhou neles e nunca disse para quê.",
      th: "ใต้ใจกลางเมืองมีอุโมงค์ที่ไม่ปรากฏในผังสาธารณะใด ๆ ปู่ผมเคยทำงานที่นั่นแต่ไม่เคยบอกว่าเพื่ออะไร",
    },
  },
  {
    id: 9201,
    codename: "phra_khanong",
    node: "bangkok",
    time: "01:12",
    originalLanguage: "th",
    archive: "naga",
    text: {
      th: "ยายบอกว่าอย่าถ่ายรูปแม่น้ำตอนตีหนึ่ง ผมถ่าย และในภาพมีเส้นหนึ่งที่ไม่มีอยู่ตอนผมยืนดู",
      en: "My grandmother said never photograph the river at one in the morning. I did. There is a line in the photo that was not there while I stood watching.",
      ko: "할머니는 새벽 1시에 강을 찍지 말라고 했다. 나는 찍었고, 사진에는 내가 서서 볼 때 없던 선이 하나 있다.",
      ja: "祖母は午前1時に川を撮るなと言った。撮った。立って見ていたときにはなかった線が写真にある。",
      es: "Mi abuela decía que nunca fotografiara el río a la una de la madrugada. Lo hice. En la foto hay una línea que no estaba mientras yo miraba.",
      pt: "Minha avó dizia para nunca fotografar o rio à uma da manhã. Fotografei. Na foto há uma linha que não estava ali enquanto eu olhava.",
    },
  },
  {
    id: 9215,
    codename: "grao_de_sal",
    node: "sao-paulo",
    time: "04:33",
    originalLanguage: "pt",
    archive: "internet-mystery-culture",
    text: {
      pt: "Achei um canal com 400 vídeos, todos de 11 segundos, todos gravados no mesmo corredor. A conta foi criada em 2009 e nunca comentou nada.",
      en: "Found a channel with 400 videos, all eleven seconds long, all filmed in the same corridor. The account was made in 2009 and has never commented.",
      ko: "영상 400개짜리 채널을 찾았다. 전부 11초이고 전부 같은 복도에서 찍혔다. 계정은 2009년에 만들어졌고 댓글은 한 번도 없다.",
      ja: "400本の動画があるチャンネルを見つけた。すべて11秒、すべて同じ廊下。アカウントは2009年作成で、一度もコメントしていない。",
      es: "Encontré un canal con 400 videos, todos de once segundos, todos filmados en el mismo pasillo. La cuenta se creó en 2009 y nunca comentó nada.",
      th: "เจอช่องหนึ่งมีวิดีโอ 400 คลิป ยาว 11 วินาทีเท่ากันหมด ถ่ายในทางเดินเดียวกันทั้งหมด บัญชีสร้างปี 2009 และไม่เคยคอมเมนต์อะไรเลย",
    },
  },
  {
    id: 9228,
    codename: "dead_air_la",
    node: "los-angeles",
    time: "03:02",
    originalLanguage: "en",
    archive: "remote-viewing",
    text: {
      en: "Between 3:02 and 3:06 the scanner picks up a woman counting in a language nobody in the group has identified. Same four minutes, every night, for six weeks.",
      ko: "3시 2분부터 6분까지, 스캐너에 한 여자가 아무도 식별하지 못한 언어로 숫자를 세는 소리가 잡힌다. 6주째, 매일 밤 같은 4분간.",
      ja: "3時2分から6分まで、スキャナーに誰も特定できない言語で数を数える女性の声が入る。六週間、毎晩同じ四分間。",
      es: "Entre las 3:02 y las 3:06 el escáner capta a una mujer contando en un idioma que nadie ha identificado. Los mismos cuatro minutos, cada noche, seis semanas.",
      pt: "Entre 3:02 e 3:06 o scanner capta uma mulher contando num idioma que ninguém identificou. Os mesmos quatro minutos, toda noite, há seis semanas.",
      th: "ระหว่าง 3:02 ถึง 3:06 เครื่องสแกนจับเสียงผู้หญิงนับเลขในภาษาที่ยังไม่มีใครระบุได้ สี่นาทีเดิมทุกคืน ติดต่อกันหกสัปดาห์",
    },
  },
  {
    id: 9240,
    codename: "kellerkind",
    node: "berlin",
    time: "22:19",
    originalLanguage: "en",
    archive: "government-experiments",
    text: {
      en: "The building has a basement level that the lift acknowledges but will not stop at. The button lights. The car passes it.",
      ko: "이 건물에는 엘리베이터가 인식은 하지만 서지 않는 지하층이 있다. 버튼에 불은 들어온다. 그냥 지나친다.",
      ja: "この建物には、エレベーターが認識はするのに停まらない地下階がある。ボタンは光る。箱は通過する。",
      es: "El edificio tiene un sótano que el ascensor reconoce pero en el que no se detiene. El botón se enciende. La cabina pasa de largo.",
      pt: "O prédio tem um subsolo que o elevador reconhece mas no qual não para. O botão acende. A cabine passa direto.",
      th: "ตึกนี้มีชั้นใต้ดินที่ลิฟต์รับรู้แต่ไม่จอด ปุ่มติดไฟ แต่ลิฟต์ผ่านเลยไป",
    },
  },
  {
    id: 9256,
    codename: "vozdelsur",
    node: "lima",
    time: "05:41",
    originalLanguage: "es",
    archive: "ancient-civilization",
    text: {
      es: "Los geoglifos nuevos que encontraron el año pasado no eran nuevos. Estaban en una foto de 1954 que nadie volvió a mirar.",
      en: "The new geoglyphs they found last year were not new. They are in a 1954 photograph that nobody looked at again.",
      ko: "작년에 발견됐다는 새 지상화는 새것이 아니었다. 1954년 사진에 이미 있었고, 아무도 다시 보지 않았을 뿐이다.",
      ja: "去年見つかった「新しい」地上絵は新しくない。1954年の写真に写っていて、誰も見返さなかっただけだ。",
      pt: "Os geoglifos novos achados no ano passado não eram novos. Estão numa foto de 1954 que ninguém voltou a olhar.",
      th: "ภาพสลักบนพื้นดินที่ถูกพบเมื่อปีก่อนไม่ได้ใหม่เลย มันอยู่ในภาพถ่ายปี 1954 ที่ไม่มีใครกลับไปดูอีก",
    },
  },
  {
    id: 9263,
    codename: "low_tide",
    node: "reykjavik",
    time: "00:58",
    originalLanguage: "en",
    archive: "collective-consciousness",
    text: {
      en: "Four of us, none from the same country, described the same room to each other before anyone had described it. I have no theory. I only have the transcript.",
      ko: "네 명, 국적은 모두 다르다. 누구도 먼저 묘사하기 전에 우리는 서로에게 같은 방을 설명했다. 이론은 없다. 기록만 있다.",
      ja: "四人、国籍はばらばら。誰かが先に描写する前に、我々は互いに同じ部屋を説明していた。理論はない。記録だけがある。",
      es: "Cuatro personas, ninguna del mismo país, nos describimos la misma habitación antes de que nadie la describiera. No tengo teoría. Solo la transcripción.",
      pt: "Quatro pessoas, nenhuma do mesmo país, descrevemos o mesmo quarto antes de alguém descrevê-lo. Não tenho teoria. Só a transcrição.",
      th: "พวกเราสี่คน ไม่มีใครมาจากประเทศเดียวกัน ต่างบรรยายห้องเดียวกันให้กันฟังก่อนที่ใครจะบรรยายมันเสียอีก ผมไม่มีทฤษฎี มีแต่บันทึก",
    },
  },
  {
    id: 9271,
    codename: "sunda_static",
    node: "jakarta",
    time: "02:04",
    originalLanguage: "en",
    archive: "interdimensional-beings",
    text: {
      en: "There is a frequency here that carries nothing at all — no static, no carrier, nothing. Dead bands hiss. This one is silent.",
      ko: "여기에는 아무것도 실려 있지 않은 주파수가 하나 있다. 잡음도, 반송파도 없다. 죽은 대역은 쉭쉭거린다. 이건 완전한 침묵이다.",
      ja: "ここには何も載っていない周波数がある。ノイズも搬送波もない。死んだ帯域は雑音を出す。これは無音だ。",
      es: "Aquí hay una frecuencia que no lleva absolutamente nada: ni estática, ni portadora. Las bandas muertas sisean. Esta calla.",
      pt: "Aqui existe uma frequência que não carrega nada: nem estática, nem portadora. Bandas mortas chiam. Esta é silenciosa.",
      th: "ที่นี่มีความถี่หนึ่งที่ไม่มีอะไรอยู่เลย ไม่มีเสียงซ่า ไม่มีคลื่นพาห์ ย่านที่ตายแล้วยังมีเสียงซ่า แต่อันนี้เงียบสนิท",
    },
  },
  {
    id: 9288,
    codename: "archivist_0",
    node: "london",
    time: "19:45",
    originalLanguage: "en",
    archive: "secret-society",
    text: {
      en: "Request 40 of the file was released in full. Requests 1 through 39 were released in full. Request 41 does not exist and never did, according to the index that lists it.",
      ko: "문서 40번 요청은 전문 공개되었다. 1번부터 39번까지도 전문 공개되었다. 41번은 존재하지 않으며 존재한 적도 없다 — 그것을 목록에 올린 색인에 따르면.",
      ja: "文書40番の請求は全文公開された。1番から39番も全文公開された。41番は存在せず、存在したこともない——それを一覧に載せている索引によれば。",
      es: "La solicitud 40 del expediente se publicó íntegra. Las solicitudes 1 a 39 también. La 41 no existe ni existió jamás, según el índice que la enumera.",
      pt: "O pedido 40 do arquivo foi liberado na íntegra. Os pedidos 1 a 39 também. O 41 não existe e nunca existiu, segundo o índice que o lista.",
      th: "คำขอลำดับที่ 40 ถูกเปิดเผยทั้งฉบับ ลำดับ 1 ถึง 39 ก็เช่นกัน ส่วนลำดับ 41 ไม่มีอยู่และไม่เคยมี ตามสารบัญที่ระบุมันไว้",
    },
  },
  {
    id: 9294,
    codename: "kkotbi",
    node: "seoul",
    time: "04:18",
    originalLanguage: "ko",
    archive: "psychedelic-experience",
    text: {
      ko: "같은 얼굴을 세 도시에서 봤다. 나는 그 사람을 모른다. 그 사람도 매번 나를 못 알아본다. 그런데 매번 먼저 고개를 돌린다.",
      en: "I have seen the same face in three cities. I do not know them. They do not recognise me either. But they turn away first, every time.",
      ja: "同じ顔を三つの都市で見た。私はその人を知らない。向こうも私に気づかない。それでも毎回、先に顔を背ける。",
      es: "He visto la misma cara en tres ciudades. No la conozco. Tampoco me reconoce. Pero siempre gira la cabeza primero.",
      pt: "Vi o mesmo rosto em três cidades. Não o conheço. Ele também não me reconhece. Mas sempre desvia o olhar primeiro.",
      th: "ผมเห็นใบหน้าเดียวกันในสามเมือง ผมไม่รู้จักเขา เขาก็จำผมไม่ได้ แต่ทุกครั้งเขาเป็นฝ่ายหันหน้าหนีก่อน",
    },
  },
];

export const SIGNAL_BY_ID: Record<number, Signal> = Object.fromEntries(
  SIGNALS.map((s) => [s.id, s])
);

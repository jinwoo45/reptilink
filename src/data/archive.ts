import type { Locale } from "@/lib/i18n";

export type Classification =
  | "FACT"
  | "HYPOTHESIS"
  | "MYTH"
  | "CONSPIRACY"
  | "UNKNOWN"
  | "FICTION";

export const CLASSIFICATION_MARK: Record<Classification, string> = {
  FACT: "■",
  HYPOTHESIS: "△",
  MYTH: "◇",
  CONSPIRACY: "●",
  UNKNOWN: "?",
  FICTION: "☠",
};

/**
 * What each label actually claims, in the reader's own language. The
 * classification is the one place REPTILINK drops the fiction entirely.
 */
export const CLASSIFICATION_NOTE: Record<Locale, Record<Classification, string>> = {
  en: {
    FACT: "Verifiable. Documented by sources that can be checked.",
    HYPOTHESIS: "Proposed in academic or scientific terms. Not established.",
    MYTH: "Mythology, folklore, tradition. A cultural record, not a physical claim.",
    CONSPIRACY: "Circulated without sufficient evidence. Presented as a claim, not a finding.",
    UNKNOWN: "Cannot be judged true or false from the available material.",
    FICTION: "Invented inside REPTILINK or by its community.",
  },
  ko: {
    FACT: "검증 가능하다. 확인할 수 있는 출처로 문서화되어 있다.",
    HYPOTHESIS: "학술적·과학적으로 제시된 가설. 정립된 사실은 아니다.",
    MYTH: "신화·민속·전승. 물리적 주장이 아니라 문화적 기록이다.",
    CONSPIRACY: "충분한 근거 없이 유통되는 주장. 밝혀진 사실이 아니라 주장으로 제시한다.",
    UNKNOWN: "현재 자료만으로는 진위를 판단할 수 없다.",
    FICTION: "REPTILINK 또는 커뮤니티가 만들어낸 창작이다.",
  },
  ja: {
    FACT: "検証可能。確認できる出典で記録されている。",
    HYPOTHESIS: "学術的・科学的に提示された仮説。確立された事実ではない。",
    MYTH: "神話・民俗・伝承。物理的主張ではなく文化的記録である。",
    CONSPIRACY: "十分な根拠なく流通している主張。判明した事実ではなく主張として示す。",
    UNKNOWN: "現在の資料だけでは真偽を判断できない。",
    FICTION: "REPTILINK またはそのコミュニティによる創作。",
  },
  es: {
    FACT: "Verificable. Documentado por fuentes que pueden comprobarse.",
    HYPOTHESIS: "Propuesto en términos académicos o científicos. No establecido.",
    MYTH: "Mitología, folclore, tradición. Un registro cultural, no una afirmación física.",
    CONSPIRACY: "Circula sin pruebas suficientes. Se presenta como afirmación, no como hallazgo.",
    UNKNOWN: "No puede juzgarse verdadero ni falso con el material disponible.",
    FICTION: "Inventado dentro de REPTILINK o por su comunidad.",
  },
  pt: {
    FACT: "Verificável. Documentado por fontes que podem ser checadas.",
    HYPOTHESIS: "Proposto em termos acadêmicos ou científicos. Não estabelecido.",
    MYTH: "Mitologia, folclore, tradição. Um registro cultural, não uma alegação física.",
    CONSPIRACY: "Circula sem provas suficientes. Apresentado como alegação, não como constatação.",
    UNKNOWN: "Não pode ser julgado verdadeiro ou falso com o material disponível.",
    FICTION: "Inventado dentro da REPTILINK ou por sua comunidade.",
  },
  th: {
    FACT: "ตรวจสอบได้ มีเอกสารจากแหล่งที่ตรวจสอบย้อนกลับได้",
    HYPOTHESIS: "ถูกเสนอในเชิงวิชาการหรือวิทยาศาสตร์ ยังไม่เป็นข้อสรุป",
    MYTH: "ตำนาน คติชน ประเพณี เป็นบันทึกทางวัฒนธรรม ไม่ใช่ข้ออ้างเชิงกายภาพ",
    CONSPIRACY: "แพร่กระจายโดยไม่มีหลักฐานเพียงพอ นำเสนอในฐานะข้ออ้าง ไม่ใช่ข้อค้นพบ",
    UNKNOWN: "ไม่อาจตัดสินว่าจริงหรือเท็จได้จากข้อมูลที่มีอยู่",
    FICTION: "ถูกสร้างขึ้นภายใน REPTILINK หรือโดยชุมชนของมัน",
  },
};

export type ArchiveText = { title: string; summary: string };

export type ArchiveNode = {
  slug: string;
  classification: Classification;
  sourceLanguage: Locale;
  edges: string[];
  i18n: Partial<Record<Locale, ArchiveText>>;
};

export const ARCHIVE: ArchiveNode[] = [
  {
    slug: "reptilian",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["anunnaki", "naga", "illuminati", "new-world-order", "ufo", "dragon-mythology"],
    i18n: {
      en: { title: "Reptilian", summary: "The claim that reptile-like beings live among humans in disguise. Popularised in the 1990s; no evidence supports it." },
      ko: { title: "렙틸리언", summary: "파충류형 존재가 인간으로 위장해 섞여 산다는 주장. 1990년대에 확산되었으며 근거는 확인되지 않았다." },
      ja: { title: "レプティリアン", summary: "爬虫類型の存在が人間に擬態して紛れているという主張。1990年代に広まったが、裏づけはない。" },
      es: { title: "Reptiliano", summary: "La afirmación de que seres reptilianos viven disfrazados entre humanos. Se popularizó en los noventa; no hay pruebas." },
      pt: { title: "Reptiliano", summary: "A alegação de que seres reptilianos vivem disfarçados entre humanos. Popularizou-se nos anos 1990; não há provas." },
      th: { title: "เรปทิเลียน", summary: "ข้ออ้างว่ามีสิ่งมีชีวิตคล้ายสัตว์เลื้อยคลานปลอมตัวอยู่ในหมู่มนุษย์ แพร่หลายในยุค 1990 และไม่มีหลักฐานรองรับ" },
    },
  },
  {
    slug: "ufo",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["uap", "roswell", "area-51", "grey-aliens", "crop-circles", "men-in-black"],
    i18n: {
      en: { title: "UFO", summary: "Any aerial object an observer cannot identify. The sightings are real events; their cause is the open question." },
      ko: { title: "UFO", summary: "관측자가 식별하지 못한 모든 비행 물체. 목격 자체는 실재하는 사건이며, 원인이 미해결로 남는다." },
      ja: { title: "UFO", summary: "観測者が識別できない飛行物体の総称。目撃は実際の出来事であり、原因が未解決のまま残る。" },
      es: { title: "OVNI", summary: "Cualquier objeto aéreo que un observador no logra identificar. Los avistamientos son reales; su causa sigue abierta." },
      pt: { title: "OVNI", summary: "Qualquer objeto aéreo que um observador não consegue identificar. Os avistamentos são reais; a causa segue em aberto." },
      th: { title: "ยูเอฟโอ", summary: "วัตถุบินใด ๆ ที่ผู้สังเกตระบุไม่ได้ การพบเห็นเป็นเหตุการณ์จริง ส่วนสาเหตุยังเป็นคำถามเปิด" },
    },
  },
  {
    slug: "uap",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["ufo", "government-experiments", "moon-conspiracies"],
    i18n: {
      en: { title: "UAP", summary: "The term military and civil agencies now use instead of UFO, covering objects in air, sea and space." },
      ko: { title: "UAP", summary: "군과 정부 기관이 UFO 대신 사용하는 용어. 공중·해상·우주의 미확인 현상을 모두 포괄한다." },
      ja: { title: "UAP", summary: "軍や政府機関が UFO に代えて用いる用語。空中・海中・宇宙の未確認現象を広く含む。" },
      es: { title: "UAP", summary: "El término que agencias militares y civiles usan ahora en lugar de OVNI: objetos en aire, mar y espacio." },
      pt: { title: "UAP", summary: "O termo que agências militares e civis usam hoje no lugar de OVNI: objetos no ar, no mar e no espaço." },
      th: { title: "ยูเอพี", summary: "คำที่หน่วยงานทหารและพลเรือนใช้แทน UFO ครอบคลุมวัตถุในอากาศ ทะเล และอวกาศ" },
    },
  },
  {
    slug: "area-51",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["ufo", "roswell", "government-experiments", "grey-aliens"],
    i18n: {
      en: { title: "Area 51", summary: "A real US Air Force facility in Nevada, declassified in 2013, built to test aircraft in secret." },
      ko: { title: "51구역", summary: "네바다에 실재하는 미 공군 시설. 2013년 공식 인정되었으며 항공기 비밀 시험을 위해 만들어졌다." },
      ja: { title: "エリア51", summary: "ネバダに実在する米空軍施設。2013年に存在が公式に認められ、航空機の秘密試験のために造られた。" },
      es: { title: "Área 51", summary: "Instalación real de la Fuerza Aérea de EE. UU. en Nevada, desclasificada en 2013, creada para probar aviones en secreto." },
      pt: { title: "Área 51", summary: "Instalação real da Força Aérea dos EUA em Nevada, desclassificada em 2013, criada para testar aeronaves em segredo." },
      th: { title: "แอเรีย 51", summary: "ฐานทัพอากาศสหรัฐที่มีอยู่จริงในเนวาดา เปิดเผยอย่างเป็นทางการปี 2013 สร้างขึ้นเพื่อทดสอบอากาศยานอย่างลับ ๆ" },
    },
  },
  {
    slug: "roswell",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["ufo", "area-51", "grey-aliens", "men-in-black"],
    i18n: {
      en: { title: "Roswell", summary: "A 1947 crash in New Mexico. The debris was from Project Mogul, a classified balloon programme — the first press release said disc." },
      ko: { title: "로스웰", summary: "1947년 뉴멕시코 추락 사건. 잔해는 기밀 기구 계획 '모굴'의 것이었으나, 최초 보도자료는 '원반'이라 적었다." },
      ja: { title: "ロズウェル", summary: "1947年ニューメキシコの墜落事件。残骸は機密の気球計画モーグルのものだったが、最初の発表は「円盤」と書いた。" },
      es: { title: "Roswell", summary: "Un accidente de 1947 en Nuevo México. Los restos eran del Proyecto Mogul, un programa secreto de globos; el primer comunicado dijo disco." },
      pt: { title: "Roswell", summary: "Uma queda de 1947 no Novo México. Os destroços eram do Projeto Mogul, um programa secreto de balões; o primeiro comunicado disse disco." },
      th: { title: "รอสเวลล์", summary: "เหตุตกปี 1947 ในนิวเม็กซิโก เศษซากมาจากโครงการบอลลูนลับ Mogul แต่แถลงข่าวแรกเขียนว่า 'จานบิน'" },
    },
  },
  {
    slug: "anunnaki",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["reptilian", "ancient-civilization", "ancient-aliens", "naga"],
    i18n: {
      en: { title: "Anunnaki", summary: "Deities of Sumerian and Akkadian texts. The astronaut reading of them is a modern addition, not part of the tablets." },
      ko: { title: "아눈나키", summary: "수메르·아카드 문헌의 신격. 이들을 우주비행사로 읽는 해석은 점토판이 아니라 현대에 덧붙여진 것이다." },
      ja: { title: "アヌンナキ", summary: "シュメール・アッカド文献の神々。宇宙飛行士とする読みは粘土板にはなく、近代に付け足された解釈。" },
      es: { title: "Anunnaki", summary: "Deidades de los textos sumerios y acadios. Leerlos como astronautas es un añadido moderno, ausente en las tablillas." },
      pt: { title: "Anunnaki", summary: "Divindades dos textos sumérios e acádios. Lê-los como astronautas é um acréscimo moderno, ausente nas tábuas." },
      th: { title: "อานุนนากิ", summary: "เทพเจ้าในจารึกสุเมเรียนและอัคคาเดียน การตีความว่าเป็นนักบินอวกาศเป็นสิ่งที่เติมเข้ามาภายหลัง ไม่มีในแผ่นดินเหนียว" },
    },
  },
  {
    slug: "naga",
    classification: "MYTH",
    sourceLanguage: "th",
    edges: ["reptilian", "dragon-mythology", "underground-civilization", "anunnaki"],
    i18n: {
      en: { title: "Naga", summary: "Serpent beings of South and Southeast Asian tradition, guardians of water and of what lies beneath it." },
      ko: { title: "나가", summary: "남아시아·동남아시아 전승의 뱀 존재. 물과 그 아래에 있는 것을 지키는 수호자로 전해진다." },
      ja: { title: "ナーガ", summary: "南アジア・東南アジア伝承の蛇の存在。水と、その下にあるものを守る者とされる。" },
      es: { title: "Naga", summary: "Seres serpiente de la tradición del sur y sudeste de Asia, guardianes del agua y de lo que hay debajo." },
      pt: { title: "Naga", summary: "Seres serpentes da tradição do sul e sudeste asiático, guardiões da água e do que está sob ela." },
      th: { title: "นาค", summary: "ภูตงูในความเชื่อของเอเชียใต้และเอเชียตะวันออกเฉียงใต้ ผู้พิทักษ์แห่งน้ำและสิ่งที่อยู่ใต้น้ำ" },
    },
  },
  {
    slug: "dragon-mythology",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["naga", "reptilian", "ancient-civilization", "collective-consciousness"],
    i18n: {
      en: { title: "Dragon Mythology", summary: "Serpent-dragon figures appear on nearly every continent. Why the shape recurs is an open question in folklore studies." },
      ko: { title: "용 신화", summary: "뱀·용 형상은 거의 모든 대륙에 나타난다. 왜 같은 형상이 반복되는지는 민속학의 미해결 질문이다." },
      ja: { title: "竜の神話", summary: "蛇・竜の形象はほぼ全大陸に現れる。なぜ同じ形が繰り返されるのかは民俗学の未解決問題。" },
      es: { title: "Mitología del dragón", summary: "Figuras de serpiente-dragón aparecen en casi todos los continentes. Por qué se repite la forma sigue sin respuesta." },
      pt: { title: "Mitologia do dragão", summary: "Figuras de serpente-dragão surgem em quase todos os continentes. Por que a forma se repete continua sem resposta." },
      th: { title: "ตำนานมังกร", summary: "รูปงู-มังกรปรากฏแทบทุกทวีป เหตุใดรูปทรงนี้จึงเกิดซ้ำยังเป็นคำถามที่ไม่มีคำตอบในคติชนวิทยา" },
    },
  },
  {
    slug: "ancient-aliens",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["anunnaki", "ancient-civilization", "ufo", "crop-circles"],
    i18n: {
      en: { title: "Ancient Aliens", summary: "The claim that visitors built or taught early civilisations. Archaeology accounts for these sites without it." },
      ko: { title: "고대 외계인", summary: "방문자가 초기 문명을 세우거나 가르쳤다는 주장. 고고학은 해당 유적을 그 가정 없이 설명한다." },
      ja: { title: "古代宇宙人", summary: "訪問者が初期文明を築いた、あるいは教えたという主張。考古学はその仮定なしに遺跡を説明している。" },
      es: { title: "Alienígenas ancestrales", summary: "La idea de que visitantes construyeron o enseñaron a las primeras civilizaciones. La arqueología explica esos sitios sin ella." },
      pt: { title: "Alienígenas ancestrais", summary: "A ideia de que visitantes construíram ou ensinaram as primeiras civilizações. A arqueologia explica esses sítios sem ela." },
      th: { title: "มนุษย์ต่างดาวยุคโบราณ", summary: "ข้ออ้างว่าผู้มาเยือนสร้างหรือสอนอารยธรรมยุคแรก โบราณคดีอธิบายแหล่งเหล่านั้นได้โดยไม่ต้องใช้ข้ออ้างนี้" },
    },
  },
  {
    slug: "silurian-hypothesis",
    classification: "HYPOTHESIS",
    sourceLanguage: "en",
    edges: ["ancient-civilization", "underground-civilization", "simulation-theory"],
    i18n: {
      en: { title: "Silurian Hypothesis", summary: "A 2018 paper asking whether an industrial civilisation millions of years old would leave any trace we could still read." },
      ko: { title: "실루리안 가설", summary: "수백만 년 전의 산업 문명이 있었다면 지금 읽어낼 흔적이 남았을지 묻는 2018년 논문." },
      ja: { title: "シルル人仮説", summary: "数百万年前に産業文明があったなら、今も読み取れる痕跡が残るかを問う2018年の論文。" },
      es: { title: "Hipótesis siluriana", summary: "Un artículo de 2018 que pregunta si una civilización industrial de hace millones de años dejaría algún rastro legible hoy." },
      pt: { title: "Hipótese siluriana", summary: "Um artigo de 2018 que pergunta se uma civilização industrial de milhões de anos deixaria algum rastro legível hoje." },
      th: { title: "สมมติฐานซิลูเรียน", summary: "บทความปี 2018 ที่ตั้งคำถามว่าอารยธรรมอุตสาหกรรมเมื่อหลายล้านปีก่อนจะทิ้งร่องรอยที่เรายังอ่านได้หรือไม่" },
    },
  },
];

ARCHIVE.push(
  {
    slug: "ancient-civilization",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["anunnaki", "naga", "underground-civilization", "silurian-hypothesis", "ancient-aliens"],
    i18n: {
      en: { title: "Ancient Civilization", summary: "The documented record of early societies — and the gaps in it that every later theory tries to fill." },
      ko: { title: "고대 문명", summary: "초기 사회에 대한 문헌·유물 기록, 그리고 이후의 모든 이론이 메우려 드는 그 공백." },
      ja: { title: "古代文明", summary: "初期社会についての記録と、後世のあらゆる理論が埋めようとするその空白。" },
      es: { title: "Civilización antigua", summary: "El registro documentado de las sociedades tempranas, y los huecos que toda teoría posterior intenta llenar." },
      pt: { title: "Civilização antiga", summary: "O registro documentado das sociedades antigas e as lacunas que toda teoria posterior tenta preencher." },
      th: { title: "อารยธรรมโบราณ", summary: "บันทึกที่มีหลักฐานเกี่ยวกับสังคมยุคแรก และช่องว่างที่ทฤษฎีรุ่นหลังทุกทฤษฎีพยายามเติมเต็ม" },
    },
  },
  {
    slug: "underground-civilization",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["naga", "ancient-civilization", "interdimensional-beings", "reptilian"],
    i18n: {
      en: { title: "Underground Civilization", summary: "Hollow-earth and inner-world traditions, from Agartha to modern tunnel lore. Geology rules out the cavity." },
      ko: { title: "지하 문명", summary: "아가르타에서 현대 터널 괴담까지 이어지는 지구 공동설 전승. 지질학은 그런 공동의 존재를 배제한다." },
      ja: { title: "地下文明", summary: "アガルタから現代のトンネル怪談まで続く地球空洞説の系譜。地質学はその空洞を否定する。" },
      es: { title: "Civilización subterránea", summary: "Tradiciones de la tierra hueca, de Agartha al folclore moderno de túneles. La geología descarta esa cavidad." },
      pt: { title: "Civilização subterrânea", summary: "Tradições da terra oca, de Agartha ao folclore moderno dos túneis. A geologia descarta essa cavidade." },
      th: { title: "อารยธรรมใต้พิภพ", summary: "ความเชื่อเรื่องโลกกลวงและโลกภายใน ตั้งแต่อากาธาถึงเรื่องเล่าอุโมงค์ยุคใหม่ ธรณีวิทยาปฏิเสธโพรงเช่นนั้น" },
    },
  },
  {
    slug: "interdimensional-beings",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["ufo", "underground-civilization", "psychedelic-experience", "simulation-theory"],
    i18n: {
      en: { title: "Interdimensional Beings", summary: "The proposal that anomalous encounters come from adjacent dimensions rather than distant stars. Untestable as stated." },
      ko: { title: "차원 간 존재", summary: "이상 조우가 먼 별이 아니라 인접한 차원에서 온다는 주장. 현재 형태로는 검증이 불가능하다." },
      ja: { title: "異次元存在", summary: "異常な遭遇は遠い星ではなく隣接する次元から来るとする説。現在の形では検証できない。" },
      es: { title: "Seres interdimensionales", summary: "La propuesta de que los encuentros anómalos vienen de dimensiones contiguas, no de estrellas lejanas. Hoy no es comprobable." },
      pt: { title: "Seres interdimensionais", summary: "A proposta de que encontros anômalos vêm de dimensões vizinhas, não de estrelas distantes. Como está, não é testável." },
      th: { title: "สิ่งมีชีวิตข้ามมิติ", summary: "ข้อเสนอว่าการเผชิญหน้าแปลกประหลาดมาจากมิติข้างเคียง ไม่ใช่ดาวไกลโพ้น ในรูปแบบปัจจุบันยังพิสูจน์ไม่ได้" },
    },
  },
  {
    slug: "men-in-black",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["ufo", "roswell", "secret-society", "government-experiments"],
    i18n: {
      en: { title: "Men in Black", summary: "Figures said to visit witnesses after a sighting and ask them to stop talking. Documented as folklore since the 1950s." },
      ko: { title: "맨 인 블랙", summary: "목격 이후 증인을 찾아와 침묵을 요구한다는 인물들. 1950년대부터 민속 전승으로 기록되어 왔다." },
      ja: { title: "メン・イン・ブラック", summary: "目撃の後に証人を訪ね、口をつぐむよう求めるとされる人物。1950年代から民間伝承として記録される。" },
      es: { title: "Hombres de negro", summary: "Figuras que supuestamente visitan a testigos tras un avistamiento y les piden callar. Documentadas como folclore desde los cincuenta." },
      pt: { title: "Homens de preto", summary: "Figuras que supostamente visitam testemunhas após um avistamento e pedem silêncio. Documentadas como folclore desde os anos 1950." },
      th: { title: "เมน อิน แบล็ก", summary: "บุคคลที่ว่ากันว่ามาเยือนพยานหลังการพบเห็นและขอให้เงียบ ถูกบันทึกเป็นคติชนมาตั้งแต่ทศวรรษ 1950" },
    },
  },
  {
    slug: "illuminati",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["bavarian-illuminati", "freemasonry", "new-world-order", "secret-society", "reptilian"],
    i18n: {
      en: { title: "Illuminati", summary: "The modern shorthand for a hidden group steering world events. The name was borrowed from a society dissolved in 1785." },
      ko: { title: "일루미나티", summary: "세계를 배후에서 조종한다는 집단을 가리키는 현대의 약칭. 이름은 1785년 해산된 실제 결사에서 빌려왔다." },
      ja: { title: "イルミナティ", summary: "世界を裏で操る集団を指す現代の通称。名称は1785年に解散した実在の結社から借りられた。" },
      es: { title: "Illuminati", summary: "El nombre moderno para un grupo oculto que dirigiría el mundo. Se tomó de una sociedad disuelta en 1785." },
      pt: { title: "Illuminati", summary: "O nome moderno para um grupo oculto que dirigiria o mundo. Foi tomado de uma sociedade dissolvida em 1785." },
      th: { title: "อิลลูมินาติ", summary: "คำเรียกยุคใหม่สำหรับกลุ่มลับที่ถูกอ้างว่าชักใยโลก ชื่อนี้ยืมมาจากสมาคมที่ถูกยุบไปในปี 1785" },
    },
  },
  {
    slug: "bavarian-illuminati",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["illuminati", "freemasonry", "secret-society"],
    i18n: {
      en: { title: "Bavarian Illuminati", summary: "A real Enlightenment society founded in Ingolstadt in 1776 and banned by the state in 1785. It did not survive." },
      ko: { title: "바이에른 일루미나티", summary: "1776년 잉골슈타트에서 창립된 실제 계몽주의 결사. 1785년 국가에 의해 금지되었고 존속하지 못했다." },
      ja: { title: "バイエルン啓明結社", summary: "1776年インゴルシュタットで創設された実在の啓蒙結社。1785年に禁止され、存続しなかった。" },
      es: { title: "Illuminati de Baviera", summary: "Sociedad ilustrada real fundada en Ingolstadt en 1776 y prohibida por el Estado en 1785. No sobrevivió." },
      pt: { title: "Illuminati da Baviera", summary: "Sociedade iluminista real fundada em Ingolstadt em 1776 e proibida pelo Estado em 1785. Não sobreviveu." },
      th: { title: "อิลลูมินาติบาวาเรีย", summary: "สมาคมยุคเรืองปัญญาที่มีอยู่จริง ก่อตั้งที่อิงโกลชตัดท์ปี 1776 และถูกรัฐสั่งห้ามปี 1785 จึงไม่หลงเหลือต่อมา" },
    },
  },
  {
    slug: "freemasonry",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["illuminati", "bavarian-illuminati", "secret-society", "new-world-order"],
    i18n: {
      en: { title: "Freemasonry", summary: "A fraternal order with public lodges, published constitutions and a private ritual. Its secrecy is procedural, not political." },
      ko: { title: "프리메이슨", summary: "공개된 지부와 성문 헌장, 비공개 의례를 가진 우애 결사. 그 비밀성은 정치적이라기보다 절차적이다." },
      ja: { title: "フリーメイソン", summary: "公開されたロッジと成文憲章、非公開の儀礼を持つ友愛団体。その秘密性は政治的ではなく手続的なもの。" },
      es: { title: "Masonería", summary: "Orden fraternal con logias públicas, constituciones publicadas y ritual privado. Su secreto es procedimental, no político." },
      pt: { title: "Maçonaria", summary: "Ordem fraternal com lojas públicas, constituições publicadas e ritual privado. Seu sigilo é procedimental, não político." },
      th: { title: "ฟรีเมสัน", summary: "สมาคมภราดรภาพที่มีลอดจ์เปิดเผย ธรรมนูญที่ตีพิมพ์ และพิธีกรรมที่ปิด ความลับของมันเป็นเรื่องขั้นตอน ไม่ใช่การเมือง" },
    },
  },
  {
    slug: "new-world-order",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["illuminati", "freemasonry", "secret-society", "reptilian", "government-experiments"],
    i18n: {
      en: { title: "New World Order", summary: "A single authoritarian world government said to be assembling in secret. The phrase itself long predates the theory." },
      ko: { title: "신세계질서", summary: "단일 권위주의 세계정부가 비밀리에 구성되고 있다는 주장. 이 표현 자체는 해당 이론보다 훨씬 오래되었다." },
      ja: { title: "新世界秩序", summary: "単一の権威主義的世界政府が密かに形成されているという主張。語そのものは理論よりはるかに古い。" },
      es: { title: "Nuevo Orden Mundial", summary: "Un gobierno mundial autoritario que se estaría formando en secreto. La expresión es mucho anterior a la teoría." },
      pt: { title: "Nova Ordem Mundial", summary: "Um governo mundial autoritário que estaria se formando em segredo. A expressão é bem anterior à teoria." },
      th: { title: "ระเบียบโลกใหม่", summary: "ข้ออ้างว่ามีรัฐบาลโลกอำนาจนิยมเดียวกำลังก่อตัวอย่างลับ ๆ ตัววลีนี้เก่าแก่กว่าตัวทฤษฎีมาก" },
    },
  },
  {
    slug: "secret-society",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["freemasonry", "illuminati", "men-in-black", "new-world-order"],
    i18n: {
      en: { title: "Secret Society", summary: "Closed orders exist and always have. The historical question is what they actually did, not what they are imagined to do." },
      ko: { title: "비밀결사", summary: "폐쇄적 결사는 실재했고 늘 존재해 왔다. 역사의 질문은 상상된 역할이 아니라 실제로 무엇을 했는가다." },
      ja: { title: "秘密結社", summary: "閉じた結社は実在し、常に存在してきた。歴史の問いは想像された役割ではなく実際に何をしたかである。" },
      es: { title: "Sociedad secreta", summary: "Las órdenes cerradas existen y siempre existieron. La pregunta histórica es qué hicieron, no qué se imagina que hacen." },
      pt: { title: "Sociedade secreta", summary: "Ordens fechadas existem e sempre existiram. A pergunta histórica é o que fizeram, não o que se imagina que fazem." },
      th: { title: "สมาคมลับ", summary: "องค์กรปิดมีอยู่จริงและมีมาตลอด คำถามทางประวัติศาสตร์คือพวกเขาทำอะไรจริง ไม่ใช่สิ่งที่ถูกจินตนาการ" },
    },
  },
  {
    slug: "simulation-theory",
    classification: "HYPOTHESIS",
    sourceLanguage: "en",
    edges: ["silurian-hypothesis", "interdimensional-beings", "collective-consciousness", "internet-mystery-culture"],
    i18n: {
      en: { title: "Simulation Theory", summary: "Bostrom's 2003 argument that we are probably inside a computed world. A probability claim, not a discovery." },
      ko: { title: "시뮬레이션 가설", summary: "우리가 계산된 세계 안에 있을 가능성이 높다는 보스트롬의 2003년 논증. 발견이 아니라 확률에 대한 주장이다." },
      ja: { title: "シミュレーション仮説", summary: "我々は計算された世界の内側にいる可能性が高いとするボストロムの2003年の論証。発見ではなく確率の主張。" },
      es: { title: "Teoría de la simulación", summary: "El argumento de Bostrom (2003) de que probablemente estamos dentro de un mundo computado. Es una afirmación de probabilidad." },
      pt: { title: "Teoria da simulação", summary: "O argumento de Bostrom (2003) de que provavelmente estamos dentro de um mundo computado. É uma afirmação de probabilidade." },
      th: { title: "ทฤษฎีการจำลอง", summary: "ข้อโต้แย้งของบอสทรอมปี 2003 ว่าเราน่าจะอยู่ในโลกที่ถูกคำนวณขึ้น เป็นข้ออ้างเชิงความน่าจะเป็น ไม่ใช่การค้นพบ" },
    },
  }
);

ARCHIVE.push(
  {
    slug: "government-experiments",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["remote-viewing", "area-51", "new-world-order", "uap"],
    i18n: {
      en: { title: "Government Experiments", summary: "Programmes like MKUltra were real, declassified and abusive. The record is the reason later claims get a hearing." },
      ko: { title: "정부 실험", summary: "MKUltra 같은 계획은 실재했고 기밀 해제되었으며 인권을 침해했다. 이후의 주장들이 귀를 얻는 이유가 이 기록이다." },
      ja: { title: "政府実験", summary: "MKウルトラのような計画は実在し、機密解除され、人権を侵害した。後の主張が耳を得る理由はこの記録にある。" },
      es: { title: "Experimentos gubernamentales", summary: "Programas como MKUltra fueron reales, desclasificados y abusivos. Ese registro explica por qué se escuchan las afirmaciones posteriores." },
      pt: { title: "Experimentos governamentais", summary: "Programas como o MKUltra foram reais, desclassificados e abusivos. Esse registro explica por que alegações posteriores são ouvidas." },
      th: { title: "การทดลองของรัฐ", summary: "โครงการอย่าง MKUltra มีอยู่จริง ถูกเปิดเผย และละเมิดสิทธิ บันทึกนี้คือเหตุผลที่ข้ออ้างรุ่นหลังได้รับการรับฟัง" },
    },
  },
  {
    slug: "remote-viewing",
    classification: "HYPOTHESIS",
    sourceLanguage: "en",
    edges: ["government-experiments", "collective-consciousness", "psychedelic-experience"],
    i18n: {
      en: { title: "Remote Viewing", summary: "The Stargate programme funded it for two decades. The 1995 review found no usable intelligence ever came out." },
      ko: { title: "원격 투시", summary: "스타게이트 계획이 20년간 자금을 댔다. 1995년 평가는 활용 가능한 정보가 한 건도 없었다고 결론지었다." },
      ja: { title: "遠隔透視", summary: "スターゲイト計画が20年資金を投じた。1995年の評価は、使える情報は一件も出なかったと結論づけた。" },
      es: { title: "Visión remota", summary: "El programa Stargate la financió dos décadas. La revisión de 1995 concluyó que nunca produjo inteligencia utilizable." },
      pt: { title: "Visão remota", summary: "O programa Stargate a financiou por duas décadas. A revisão de 1995 concluiu que nunca gerou inteligência utilizável." },
      th: { title: "การมองระยะไกล", summary: "โครงการสตาร์เกตให้ทุนสองทศวรรษ การประเมินปี 1995 สรุปว่าไม่เคยได้ข่าวกรองที่ใช้งานได้เลย" },
    },
  },
  {
    slug: "crop-circles",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["ufo", "ancient-aliens", "internet-mystery-culture"],
    i18n: {
      en: { title: "Crop Circles", summary: "Two men admitted making the first English formations in 1991. The craft outlived the confession and became an art form." },
      ko: { title: "미스터리 서클", summary: "1991년 두 사람이 초기 영국 문양을 자신들이 만들었다고 밝혔다. 기법은 고백보다 오래 살아남아 하나의 예술이 되었다." },
      ja: { title: "ミステリーサークル", summary: "1991年、二人が初期の英国の模様を自作と認めた。技法は告白より長く生き、一つの表現形式になった。" },
      es: { title: "Círculos de las cosechas", summary: "Dos hombres admitieron en 1991 haber hecho las primeras figuras inglesas. La técnica sobrevivió a la confesión y se volvió arte." },
      pt: { title: "Círculos nas plantações", summary: "Dois homens admitiram em 1991 ter feito as primeiras figuras inglesas. A técnica sobreviveu à confissão e virou arte." },
      th: { title: "ครอปเซอร์เคิล", summary: "ปี 1991 ชายสองคนยอมรับว่าเป็นผู้ทำลวดลายชุดแรกในอังกฤษ เทคนิคนี้อยู่ยืนกว่าคำสารภาพและกลายเป็นศิลปะ" },
    },
  },
  {
    slug: "grey-aliens",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["ufo", "roswell", "area-51", "nordic-aliens"],
    i18n: {
      en: { title: "Grey Aliens", summary: "Small grey body, large black eyes. The image spread through media after 1961 and standardised what witnesses reported." },
      ko: { title: "그레이", summary: "작은 회색 몸과 큰 검은 눈. 1961년 이후 매체를 통해 퍼지며 목격 진술의 형태를 균일하게 만들었다." },
      ja: { title: "グレイ", summary: "小柄な灰色の体と大きな黒い目。1961年以降メディアで広まり、証言の形を均質化した。" },
      es: { title: "Grises", summary: "Cuerpo gris pequeño, ojos negros grandes. La imagen se difundió tras 1961 y uniformó lo que reportaban los testigos." },
      pt: { title: "Cinzentos", summary: "Corpo cinza pequeno, olhos pretos grandes. A imagem se espalhou após 1961 e uniformizou o que as testemunhas relatavam." },
      th: { title: "เกรย์", summary: "ร่างเทาเล็ก ตาดำโต ภาพนี้แพร่ผ่านสื่อหลังปี 1961 และทำให้คำให้การของพยานมีรูปแบบเดียวกัน" },
    },
  },
  {
    slug: "nordic-aliens",
    classification: "MYTH",
    sourceLanguage: "en",
    edges: ["grey-aliens", "ufo", "collective-consciousness"],
    i18n: {
      en: { title: "Nordic Aliens", summary: "Tall, fair, benevolent. A 1950s contactee archetype whose politics are easier to read than its origin." },
      ko: { title: "노르딕", summary: "키 크고 밝은 피부의 우호적 존재. 1950년대 접촉자 서사의 원형으로, 기원보다 그 정치성이 더 잘 읽힌다." },
      ja: { title: "ノルディック", summary: "長身で色白、友好的。1950年代のコンタクティ神話の原型で、起源より政治性が読み取りやすい。" },
      es: { title: "Nórdicos", summary: "Altos, claros, benévolos. Un arquetipo de contactados de los cincuenta cuya política se lee mejor que su origen." },
      pt: { title: "Nórdicos", summary: "Altos, claros, benevolentes. Arquétipo de contatados dos anos 1950 cuja política se lê melhor que a origem." },
      th: { title: "นอร์ดิก", summary: "สูง ผิวขาว เป็นมิตร ต้นแบบเรื่องเล่าผู้ติดต่อยุค 1950 ที่อ่านนัยการเมืองได้ง่ายกว่าที่มา" },
    },
  },
  {
    slug: "moon-conspiracies",
    classification: "CONSPIRACY",
    sourceLanguage: "en",
    edges: ["uap", "mars-mysteries", "government-experiments"],
    i18n: {
      en: { title: "Moon Conspiracies", summary: "Claims that the landings were staged. Retroreflectors left in 1969 are still ranged from Earth today." },
      ko: { title: "달 착륙 음모론", summary: "착륙이 연출되었다는 주장. 1969년에 설치된 반사경은 지금도 지구에서 레이저로 측정된다." },
      ja: { title: "月着陸陰謀論", summary: "着陸は演出だったとする主張。1969年に置かれた反射鏡は今も地球から測距されている。" },
      es: { title: "Conspiraciones lunares", summary: "Afirmaciones de que los alunizajes se falsearon. Los retrorreflectores dejados en 1969 se siguen midiendo desde la Tierra." },
      pt: { title: "Conspirações lunares", summary: "Alegações de que os pousos foram encenados. Os retrorrefletores deixados em 1969 ainda são medidos da Terra." },
      th: { title: "ทฤษฎีสมคบคิดดวงจันทร์", summary: "ข้ออ้างว่าการลงจอดถูกจัดฉาก แผ่นสะท้อนแสงที่ติดตั้งปี 1969 ยังถูกยิงเลเซอร์วัดจากโลกจนถึงวันนี้" },
    },
  },
  {
    slug: "mars-mysteries",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["moon-conspiracies", "ancient-aliens", "uap"],
    i18n: {
      en: { title: "Mars Mysteries", summary: "The Cydonia face was a shadow, resolved by later imaging. The open Martian questions are chemical, not architectural." },
      ko: { title: "화성 미스터리", summary: "시도니아의 '얼굴'은 그림자였고 이후 촬영으로 해소되었다. 화성의 남은 질문은 건축이 아니라 화학이다." },
      ja: { title: "火星の謎", summary: "シドニアの「顔」は影であり、後の撮像で解決した。火星に残る問いは建築ではなく化学のものだ。" },
      es: { title: "Misterios de Marte", summary: "La cara de Cydonia era una sombra, resuelta por imágenes posteriores. Las preguntas marcianas abiertas son químicas, no arquitectónicas." },
      pt: { title: "Mistérios de Marte", summary: "A face de Cydonia era sombra, resolvida por imagens posteriores. As perguntas marcianas em aberto são químicas, não arquitetônicas." },
      th: { title: "ปริศนาดาวอังคาร", summary: "ใบหน้าที่ไซโดเนียคือเงา และคลี่คลายด้วยภาพถ่ายรุ่นหลัง คำถามที่ยังเปิดอยู่ของดาวอังคารเป็นเรื่องเคมี ไม่ใช่สถาปัตยกรรม" },
    },
  },
  {
    slug: "psychedelic-experience",
    classification: "FACT",
    sourceLanguage: "en",
    edges: ["collective-consciousness", "interdimensional-beings", "remote-viewing"],
    i18n: {
      en: { title: "Psychedelic Experience", summary: "Reported encounters with entities are consistent across cultures. What that consistency means is genuinely unsettled." },
      ko: { title: "환각 경험", summary: "존재와의 조우 보고는 문화권을 넘어 일관된다. 그 일관성이 무엇을 뜻하는지는 아직 결론이 없다." },
      ja: { title: "サイケデリック体験", summary: "存在との遭遇報告は文化を越えて一貫している。その一貫性が何を意味するかは未決着のままだ。" },
      es: { title: "Experiencia psicodélica", summary: "Los encuentros con entidades se reportan de forma consistente entre culturas. Qué significa esa consistencia sigue sin resolverse." },
      pt: { title: "Experiência psicodélica", summary: "Encontros com entidades são relatados de forma consistente entre culturas. O que essa consistência significa segue em aberto." },
      th: { title: "ประสบการณ์หลอนประสาท", summary: "รายงานการพบสิ่งมีชีวิตสอดคล้องกันข้ามวัฒนธรรม ความสอดคล้องนั้นหมายถึงอะไรยังไม่มีข้อสรุป" },
    },
  },
  {
    slug: "collective-consciousness",
    classification: "HYPOTHESIS",
    sourceLanguage: "ja",
    edges: ["psychedelic-experience", "dragon-mythology", "internet-mystery-culture", "simulation-theory"],
    i18n: {
      en: { title: "Collective Consciousness", summary: "From Jung's archetypes to network effects: why unrelated groups keep producing the same image." },
      ko: { title: "집단 무의식", summary: "융의 원형에서 네트워크 효과까지 — 서로 무관한 집단이 왜 같은 이미지를 반복해 만들어내는가." },
      ja: { title: "集合的無意識", summary: "ユングの元型からネットワーク効果まで。無関係な集団がなぜ同じ像を作り続けるのか。" },
      es: { title: "Conciencia colectiva", summary: "De los arquetipos de Jung a los efectos de red: por qué grupos sin contacto producen la misma imagen." },
      pt: { title: "Consciência coletiva", summary: "Dos arquétipos de Jung aos efeitos de rede: por que grupos sem contato produzem a mesma imagem." },
      th: { title: "จิตสำนึกร่วม", summary: "จากต้นแบบของยุงถึงผลกระทบเครือข่าย เหตุใดกลุ่มที่ไม่เกี่ยวกันจึงสร้างภาพเดียวกันซ้ำ ๆ" },
    },
  },
  {
    slug: "internet-mystery-culture",
    classification: "FACT",
    sourceLanguage: "ko",
    edges: ["simulation-theory", "collective-consciousness", "crop-circles", "reptilian"],
    i18n: {
      en: { title: "Internet Mystery Culture", summary: "Cicada 3301, ARGs, lost media, analog horror. The forum is now where mystery is made, not only where it is told." },
      ko: { title: "인터넷 미스터리 문화", summary: "시케이다 3301, ARG, 로스트 미디어, 아날로그 호러. 이제 미스터리는 전해지는 곳이 아니라 만들어지는 곳에 있다." },
      ja: { title: "インターネット・ミステリー文化", summary: "Cicada 3301、ARG、ロストメディア、アナログホラー。謎はもはや語られる場ではなく作られる場にある。" },
      es: { title: "Cultura de misterio en internet", summary: "Cicada 3301, ARGs, medios perdidos, terror analógico. El foro ya no solo cuenta el misterio: lo fabrica." },
      pt: { title: "Cultura de mistério na internet", summary: "Cicada 3301, ARGs, mídia perdida, terror analógico. O fórum não só conta o mistério: ele o fabrica." },
      th: { title: "วัฒนธรรมปริศนาอินเทอร์เน็ต", summary: "Cicada 3301, ARG, สื่อที่สูญหาย, อนาล็อกฮอร์เรอร์ วันนี้ฟอรัมไม่ได้แค่เล่าปริศนา แต่เป็นที่ผลิตมันขึ้นมา" },
    },
  }
);

export const ARCHIVE_BY_SLUG: Record<string, ArchiveNode> = Object.fromEntries(
  ARCHIVE.map((node) => [node.slug, node])
);

export function archiveTitle(node: ArchiveNode, locale: Locale): string {
  return (node.i18n[locale] ?? node.i18n[node.sourceLanguage] ?? node.i18n.en)!.title;
}

export function availableLanguageCount(node: ArchiveNode): number {
  return Object.keys(node.i18n).length;
}

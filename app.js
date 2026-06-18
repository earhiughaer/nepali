const alphabet = [
  { id: "a", char: "अ", roman: "a", type: "vowel", sound: "a wie in allein" },
  { id: "aa", char: "आ", roman: "aa", type: "vowel", sound: "langes a" },
  { id: "i", char: "इ", roman: "i", type: "vowel", sound: "kurzes i" },
  { id: "ii", char: "ई", roman: "ii", type: "vowel", sound: "langes i" },
  { id: "u", char: "उ", roman: "u", type: "vowel", sound: "kurzes u" },
  { id: "uu", char: "ऊ", roman: "uu", type: "vowel", sound: "langes u" },
  { id: "ri", char: "ऋ", roman: "ri", type: "vowel", sound: "silbisches ri" },
  { id: "e", char: "ए", roman: "e", type: "vowel", sound: "e" },
  { id: "ai", char: "ऐ", roman: "ai", type: "vowel", sound: "ai" },
  { id: "o", char: "ओ", roman: "o", type: "vowel", sound: "o" },
  { id: "au", char: "औ", roman: "au", type: "vowel", sound: "au" },
  { id: "am", char: "अं", roman: "am", type: "vowel", sound: "nasal" },
  { id: "ah", char: "अः", roman: "ah", type: "vowel", sound: "behaucht" },
  { id: "ka", char: "क", roman: "ka", type: "consonant", sound: "ka" },
  { id: "kha", char: "ख", roman: "kha", type: "consonant", sound: "kha" },
  { id: "ga", char: "ग", roman: "ga", type: "consonant", sound: "ga" },
  { id: "gha", char: "घ", roman: "gha", type: "consonant", sound: "gha" },
  { id: "nga", char: "ङ", roman: "nga", type: "consonant", sound: "nga" },
  { id: "cha", char: "च", roman: "cha", type: "consonant", sound: "cha" },
  { id: "chha", char: "छ", roman: "chha", type: "consonant", sound: "chha" },
  { id: "ja", char: "ज", roman: "ja", type: "consonant", sound: "ja" },
  { id: "jha", char: "झ", roman: "jha", type: "consonant", sound: "jha" },
  { id: "nya", char: "ञ", roman: "nya", type: "consonant", sound: "nya" },
  { id: "tta", char: "ट", roman: "tta", type: "consonant", sound: "retroflex ta" },
  { id: "ttha", char: "ठ", roman: "ttha", type: "consonant", sound: "retroflex tha" },
  { id: "dda", char: "ड", roman: "dda", type: "consonant", sound: "retroflex da" },
  { id: "ddha", char: "ढ", roman: "ddha", type: "consonant", sound: "retroflex dha" },
  { id: "nna", char: "ण", roman: "nna", type: "consonant", sound: "retroflex na" },
  { id: "ta", char: "त", roman: "ta", type: "consonant", sound: "dental ta" },
  { id: "tha", char: "थ", roman: "tha", type: "consonant", sound: "dental tha" },
  { id: "da", char: "द", roman: "da", type: "consonant", sound: "dental da" },
  { id: "dha", char: "ध", roman: "dha", type: "consonant", sound: "dental dha" },
  { id: "na", char: "न", roman: "na", type: "consonant", sound: "na" },
  { id: "pa", char: "प", roman: "pa", type: "consonant", sound: "pa" },
  { id: "pha", char: "फ", roman: "pha/fa", type: "consonant", sound: "pha/fa" },
  { id: "ba", char: "ब", roman: "ba", type: "consonant", sound: "ba" },
  { id: "bha", char: "भ", roman: "bha", type: "consonant", sound: "bha" },
  { id: "ma", char: "म", roman: "ma", type: "consonant", sound: "ma" },
  { id: "ya", char: "य", roman: "ya", type: "consonant", sound: "ya" },
  { id: "ra", char: "र", roman: "ra", type: "consonant", sound: "ra" },
  { id: "la", char: "ल", roman: "la", type: "consonant", sound: "la" },
  { id: "wa", char: "व", roman: "wa/va", type: "consonant", sound: "wa oder va" },
  { id: "sha", char: "श", roman: "sha", type: "consonant", sound: "sha" },
  { id: "ssa", char: "ष", roman: "ssa", type: "consonant", sound: "retroflex sha" },
  { id: "sa", char: "स", roman: "sa", type: "consonant", sound: "sa" },
  { id: "ha", char: "ह", roman: "ha", type: "consonant", sound: "ha" },
  { id: "ksha", char: "क्ष", roman: "ksha", type: "consonant", sound: "ksha" },
  { id: "tra", char: "त्र", roman: "tra", type: "consonant", sound: "tra" },
  { id: "gya", char: "ज्ञ", roman: "gya", type: "consonant", sound: "gya" }
];

const content = window.NEPALI_CONTENT;
const words = content.words;
const excludedSentenceIds = new Set(["hello", "thank_you"]);
const sentences = content.sentences.filter(isPracticeSentence);
const lessonLetters = [
  ...alphabet.filter((item) => item.type === "consonant"),
  ...alphabet.filter((item) => item.type === "vowel")
];
const phaseIntervals = content.phaseIntervals;
const baseStoreKey = "nepali-pwa-progress-v13";
const profileListKey = "nepali-pwa-profiles-v1";
const activeProfileKey = "nepali-pwa-active-profile-v1";
const defaultProfileId = "martin";
let storeKey = baseStoreKey;
const lessonRomanKey = "nepali-pwa-lesson-roman-v3";
const soundKey = "nepali-pwa-sound-v1";
const legacyStoreKey = "nepali-pwa-progress-v1";
const lessonUnitGap = 4;
const lessonRomanDefaults = {
  teachWord: true,
  teachSentence: true,
  teachLetter: true,
  letterRecognize: false,
  letterWrite: true,
  wordRecognize: true,
  wordListen: false,
  wordRecall: true,
  wordWrite: true,
  sentenceMeaning: true,
  sentenceBuild: true,
  sentenceListen: false,
  sentenceRecall: true
};
const lessonTypeLabels = {
  teachWord: "Neues Wort",
  teachSentence: "Neuer Satz",
  teachLetter: "Neuer Buchstabe",
  letterRecognize: "Wähle den Buchstaben",
  letterWrite: "Buchstabe schreiben",
  wordRecognize: "Wort wählen",
  wordListen: "Wort hören",
  wordRecall: "Wort erinnern",
  wordWrite: "Zahl schreiben",
  sentenceMeaning: "Satz verstehen",
  sentenceBuild: "Satz übersetzen",
  sentenceListen: "Satz hören",
  sentenceRecall: "Satz erinnern"
};
const feedbackCopy = {
  correct: [
    "Sehr gut, das sitzt!",
    "Genau richtig. Weiter so!",
    "Treffer. Du hast es erkannt!",
    "Stark, das war sauber!"
  ],
  wrong: [""],
  recallCorrect: [
    "Gut erinnert! Das bleibt für diese Runde sicher!",
    "Gut erinnert! Genau so soll es abrufbar sein!",
    "Gut erinnert! Das war aus dem Kopf da!",
    "Gut erinnert! Weiter so!"
  ],
  recallWrong: [
    "Leider nicht gewusst! Du bekommst es nochmal!",
    "Leider nicht gewusst! Das üben wir weiter!",
    "Leider nicht gewusst! Beim nächsten Durchlauf wird es leichter!",
    "Leider nicht gewusst! Kurz ansehen, dann festigen!"
  ]
};

const state = {
  view: "home",
  profileId: defaultProfileId,
  profiles: [{ id: defaultProfileId, name: "Martin" }],
  homePhase: 1,
  alphabetFilter: "all",
  wordFilter: "all",
  sentenceFilter: "all",
  letterIndex: 0,
  letterFlipped: false,
  wordIndex: 0,
  wordFlipped: false,
  sentenceIndex: 0,
  sentenceFlipped: false,
  knownLetters: new Set(),
  cards: {},
  streak: 0,
  lastLessonDate: null,
  mediaRecorder: null,
  recordingChunks: [],
  drawingCompared: false,
  activeAudio: null,
  correctSound: null,
  levelUpSound: null,
  soundEnabled: true,
  lessonRoman: { ...lessonRomanDefaults },
  lesson: {
    index: 0,
    steps: [],
    selected: [],
    checked: false,
    results: {},
    evaluated: false
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  tabs: $$(".tab"),
  views: {
    home: $("#homeView"),
    phases: $("#phasesView"),
    lesson: $("#lessonView"),
    alphabet: $("#alphabetView"),
    drawing: $("#drawingView"),
    words: $("#wordsView"),
    sentences: $("#sentencesView"),
    speech: $("#speechView")
  },
  dueCount: $("#dueCount"),
  masteredCount: $("#masteredCount"),
  streakCount: $("#streakCount"),
  profileSelect: $("#profileSelect"),
  addProfileButton: $("#addProfileButton"),
  lessonExitButton: $("#lessonExitButton"),
  lessonSoundButton: $("#lessonSoundButton"),
  lessonPathTitle: $("#lessonPathTitle"),
  lessonPathMeta: $("#lessonPathMeta"),
  homePhaseTabs: $("#homePhaseTabs"),
  homePhaseList: $("#homePhaseList"),
  lessonProgressBar: $("#lessonProgressBar"),
  lessonStage: $("#lessonStage"),
  lessonFeedback: $("#lessonFeedback"),
  lessonContinueButton: $("#lessonContinueButton"),
  letterCard: $("#letterCard"),
  letterSymbol: $("#letterSymbol"),
  letterDetail: $("#letterDetail"),
  letterGrid: $("#letterGrid"),
  speakLetterButton: $("#speakLetterButton"),
  toggleKnownLetterButton: $("#toggleKnownLetterButton"),
  prevLetterButton: $("#prevLetterButton"),
  nextLetterButton: $("#nextLetterButton"),
  drawingLetterSelect: $("#drawingLetterSelect"),
  prevDrawingButton: $("#prevDrawingButton"),
  nextDrawingButton: $("#nextDrawingButton"),
  drawingCanvas: $("#drawingCanvas"),
  drawingTarget: $("#drawingTarget"),
  drawingMeta: $("#drawingMeta"),
  targetOverlay: $("#targetOverlay"),
  scoreBar: $("#scoreBar"),
  scoreCopy: $("#scoreCopy"),
  compareButton: $("#compareButton"),
  clearCanvasButton: $("#clearCanvasButton"),
  wordCard: $("#wordCard"),
  wordSymbol: $("#wordSymbol"),
  wordDetail: $("#wordDetail"),
  wordCategory: $("#wordCategory"),
  wordPhase: $("#wordPhase"),
  wordDue: $("#wordDue"),
  wordPhaseStrip: $("#wordPhaseStrip"),
  prevWordButton: $("#prevWordButton"),
  nextWordButton: $("#nextWordButton"),
  speakWordButton: $("#speakWordButton"),
  rightWordButton: $("#rightWordButton"),
  wrongWordButton: $("#wrongWordButton"),
  wordList: $("#wordList"),
  sentenceCard: $("#sentenceCard"),
  sentenceSymbol: $("#sentenceSymbol"),
  sentenceDetail: $("#sentenceDetail"),
  sentenceCategory: $("#sentenceCategory"),
  sentencePhase: $("#sentencePhase"),
  sentenceDue: $("#sentenceDue"),
  sentencePhaseStrip: $("#sentencePhaseStrip"),
  prevSentenceButton: $("#prevSentenceButton"),
  nextSentenceButton: $("#nextSentenceButton"),
  speakSentenceButton: $("#speakSentenceButton"),
  rightSentenceButton: $("#rightSentenceButton"),
  wrongSentenceButton: $("#wrongSentenceButton"),
  sentenceList: $("#sentenceList"),
  phraseSelect: $("#phraseSelect"),
  phraseNepali: $("#phraseNepali"),
  phraseRoman: $("#phraseRoman"),
  phraseGerman: $("#phraseGerman"),
  playPhraseButton: $("#playPhraseButton"),
  recordButton: $("#recordButton"),
  nativePlayback: $("#nativePlayback"),
  recordingPlayback: $("#recordingPlayback"),
  recordingStatus: $("#recordingStatus")
};

const canvasContext = els.drawingCanvas.getContext("2d", { willReadFrequently: true });
let isDrawing = false;
let lastPoint = null;
let drawingMoved = false;

function todayKey(offset = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function cardKey(kind, id) {
  return `${kind}:${id}`;
}

function profileStoreKey(profileId = state.profileId) {
  return `nepali-pwa-progress-v13:${profileId}`;
}

function profileIdFromName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `profil-${Date.now()}`;
}

function loadProfiles() {
  try {
    const profiles = JSON.parse(localStorage.getItem(profileListKey));
    if (Array.isArray(profiles) && profiles.length) state.profiles = profiles;
  } catch {
    localStorage.removeItem(profileListKey);
  }
  state.profileId = localStorage.getItem(activeProfileKey) || state.profiles[0].id;
  if (!state.profiles.some((profile) => profile.id === state.profileId)) state.profileId = state.profiles[0].id;
  storeKey = profileStoreKey();
}

function saveProfiles() {
  localStorage.setItem(profileListKey, JSON.stringify(state.profiles));
  localStorage.setItem(activeProfileKey, state.profileId);
}

function resetProgressState() {
  state.knownLetters = new Set();
  state.cards = {};
  state.streak = 0;
  state.lastLessonDate = null;
}

function ensureCard(kind, item) {
  const key = cardKey(kind, item.id);
  if (!state.cards[key]) {
    state.cards[key] = {
      phase: 1,
      nextDue: todayKey(),
      correct: 0,
      wrong: 0,
      lastSeen: null
    };
  }
  return state.cards[key];
}

function allLearningItems() {
  return [
    ...lessonLetters.map((item) => ({ kind: "letter", item })),
    ...words.map((item) => ({ kind: "word", item })),
    ...sentences.map((item) => ({ kind: "sentence", item }))
  ];
}

function isDue(card) {
  return card.nextDue <= todayKey();
}

function isNew(card) {
  return card.correct === 0 && card.wrong === 0;
}

function dailyNewLimit(kind) {
  if (kind === "letter") return 3;
  if (kind === "word") return 4;
  return 2;
}

function dailyNewItems(kind) {
  const items = kind === "letter" ? lessonLetters : kind === "word" ? words : sentences;
  return items.filter((item) => isNew(ensureCard(kind, item))).slice(0, dailyNewLimit(kind));
}

function isTodayDue(kind, item) {
  const card = ensureCard(kind, item);
  if (!isDue(card)) return false;
  if (!isNew(card)) return true;
  return dailyNewItems(kind).some((candidate) => candidate.id === item.id);
}

function todayDueLearningItems() {
  return allLearningItems().filter(({ kind, item }) => isTodayDue(kind, item));
}

function filteredItems(kind) {
  const items = kind === "word" ? words : sentences;
  const filter = kind === "word" ? state.wordFilter : state.sentenceFilter;
  if (filter === "all") return items;
  return items.filter((item) => {
    const card = ensureCard(kind, item);
    return filter === "due" ? isTodayDue(kind, item) : isNew(card);
  });
}

function currentLetter() {
  const letters = filteredAlphabet();
  state.letterIndex = clampIndex(state.letterIndex, letters.length);
  return letters[state.letterIndex];
}

function currentWord() {
  const items = filteredItems("word");
  if (!items.length) return words[0];
  state.wordIndex = clampIndex(state.wordIndex, items.length);
  return items[state.wordIndex];
}

function currentSentence() {
  const items = filteredItems("sentence");
  if (!items.length) return sentences[0];
  state.sentenceIndex = clampIndex(state.sentenceIndex, items.length);
  return items[state.sentenceIndex];
}

function isPracticeSentence(sentence) {
  if (excludedSentenceIds.has(sentence.id)) return false;
  const germanWords = sentence.german.replace(/[.,!?]/g, "").trim().split(/\s+/).filter(Boolean);
  return germanWords.length > 1;
}

function clampIndex(index, length) {
  if (!length) return 0;
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
}

function filteredAlphabet() {
  const items = alphabetCardItems();
  if (state.alphabetFilter === "all") return items;
  return items.filter((item) => item.type === state.alphabetFilter);
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey)) || (state.profileId === defaultProfileId ? JSON.parse(localStorage.getItem(baseStoreKey)) : null);
    if (saved) {
      state.knownLetters = new Set(saved.knownLetters || []);
      state.cards = saved.cards || {};
      state.streak = saved.streak || 0;
      state.lastLessonDate = saved.lastLessonDate || null;
      return;
    }
    const legacy = JSON.parse(localStorage.getItem(legacyStoreKey));
    if (legacy) {
      state.knownLetters = new Set(legacy.knownLetters || []);
      state.streak = legacy.streak || 0;
      state.lastLessonDate = null;
    }
  } catch {
    localStorage.removeItem(storeKey);
  }
}

function saveProgress() {
  localStorage.setItem(storeKey, JSON.stringify({
    knownLetters: [...state.knownLetters],
    cards: state.cards,
    streak: state.streak,
    lastLessonDate: state.lastLessonDate
  }));
}

function loadLessonSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(lessonRomanKey));
    if (saved) state.lessonRoman = { ...lessonRomanDefaults, ...saved };
  } catch {
    localStorage.removeItem(lessonRomanKey);
  }
  try {
    const savedSound = localStorage.getItem(soundKey);
    if (savedSound !== null) state.soundEnabled = savedSound === "true";
  } catch {
    localStorage.removeItem(soundKey);
  }
}

function saveLessonSettings() {
  localStorage.setItem(lessonRomanKey, JSON.stringify(state.lessonRoman));
}

function saveSoundSetting() {
  localStorage.setItem(soundKey, String(state.soundEnabled));
}

function setView(view) {
  state.view = view;
  document.body.dataset.view = view;
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  $$("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view && button.classList.contains("home-card"));
  });
  Object.entries(els.views).forEach(([key, el]) => el.classList.toggle("active", key === view));
  if (view === "lesson" && !state.lesson.steps.length) {
    startLesson();
  }
  if (view === "home" || view === "phases") {
    renderProgress();
    renderHomePhaseList();
  }
  renderSoundButton();
}

function renderProgress() {
  const due = todayDueLearningItems().length;
  const mastered = allLearningItems().filter(({ kind, item }) => ensureCard(kind, item).phase >= 6).length;
  els.dueCount.textContent = due;
  els.masteredCount.textContent = mastered;
  els.streakCount.textContent = state.streak;
  renderHomePhaseList();
}

function renderProfiles() {
  if (!els.profileSelect) return;
  els.profileSelect.innerHTML = "";
  state.profiles.forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    option.selected = profile.id === state.profileId;
    els.profileSelect.append(option);
  });
}

function switchProfile(profileId) {
  saveProgress();
  state.profileId = profileId;
  storeKey = profileStoreKey();
  resetProgressState();
  state.lesson = {
    index: 0,
    steps: [],
    selected: [],
    checked: false,
    results: {},
    evaluated: false
  };
  loadProgress();
  initCards();
  saveProfiles();
  renderProfiles();
  renderProgress();
  renderLetter();
  renderDrawingSelect();
  clearCanvas();
  renderDrawingTarget();
  renderWord();
  renderSentence();
}

function addProfile() {
  const name = window.prompt("Name für das neue Profil?");
  if (!name || !name.trim()) return;
  let id = profileIdFromName(name);
  let suffix = 2;
  while (state.profiles.some((profile) => profile.id === id)) {
    id = `${profileIdFromName(name)}-${suffix}`;
    suffix += 1;
  }
  state.profiles.push({ id, name: name.trim() });
  switchProfile(id);
}

function renderHomePhaseList() {
  if (!els.homePhaseTabs || !els.homePhaseList) return;
  els.homePhaseTabs.innerHTML = "";
  for (let phase = 1; phase <= 6; phase += 1) {
    const count = phaseLearningItems(phase).length;
    const button = document.createElement("button");
    button.className = "home-phase-button";
    button.classList.toggle("active", state.homePhase === phase);
    button.type = "button";
    button.textContent = `Stufe ${phase}`;
    button.setAttribute("aria-label", `Stufe ${phase}, ${count} Inhalte`);
    button.addEventListener("click", () => {
      state.homePhase = phase;
      renderHomePhaseList();
    });
    const badge = document.createElement("span");
    badge.textContent = count;
    button.append(badge);
    els.homePhaseTabs.append(button);
  }

  const phaseItems = phaseLearningItems(state.homePhase);
  els.homePhaseList.innerHTML = phaseItems.length
    ? phaseItems.map(phaseItemMarkup).join("")
    : `<p class="empty-phase">In Stufe ${state.homePhase} sind gerade keine Inhalte.</p>`;
}

function phaseLearningItems(phase) {
  return allLearningItems()
    .filter(({ kind, item }) => ensureCard(kind, item).phase === phase)
    .sort((a, b) => phaseKindOrder(a.kind, a.item) - phaseKindOrder(b.kind, b.item));
}

function phaseKindOrder(kind, item) {
  if (kind === "letter") return 0;
  if (kind === "word" && item.category === "Zahlen") return 1;
  if (kind === "word") return 2;
  return 3;
}

function phaseItemMarkup({ kind, item }) {
  const card = ensureCard(kind, item);
  const label = kind === "letter" ? "Buchstabe" : kind === "sentence" ? "Satz" : item.category === "Zahlen" ? "Zahl" : "Wort";
  const main = kind === "letter" ? item.char : kind === "sentence" ? item.nepali : wordDisplayText(item);
  const roman = kind === "letter" ? item.roman : item.roman;
  const german = kind === "letter" ? item.sound : item.german;
  return `
    <article class="home-phase-word">
      <small class="phase-kind">${label}</small>
      <strong>${main}</strong>
      <span>${roman}</span>
      <em>${german}</em>
      <small>${dueLabelForItem(kind, item)}</small>
    </article>
  `;
}

function renderPhaseStrip(kind) {
  const host = kind === "word" ? els.wordPhaseStrip : els.sentencePhaseStrip;
  const items = kind === "word" ? words : sentences;
  host.innerHTML = "";
  for (let phase = 1; phase <= 6; phase += 1) {
    const count = items.filter((item) => ensureCard(kind, item).phase === phase).length;
    const pill = document.createElement("span");
    pill.className = "phase-pill";
    pill.textContent = `Stufe ${phase}: ${count}`;
    host.append(pill);
  }
}

function renderLetter() {
  const letter = currentLetter();
  els.letterSymbol.textContent = letter.char;
  els.letterDetail.textContent = state.letterFlipped ? `${letter.roman} · ${letter.sound}` : " ";
  els.toggleKnownLetterButton.textContent = state.knownLetters.has(letter.id) ? "Doch nicht" : "Kann ich";
  els.letterGrid.querySelectorAll(".letter-chip").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === letter.id);
    button.classList.toggle("known", state.knownLetters.has(button.dataset.id));
  });
}

function renderLetterGrid() {
  els.letterGrid.innerHTML = "";
  filteredAlphabet().forEach((letter, index) => {
    const button = document.createElement("button");
    button.className = "letter-chip";
    button.dataset.id = letter.id;
    button.textContent = letter.char;
    button.title = `${letter.roman} · ${letter.sound}`;
    button.addEventListener("click", () => {
      state.letterIndex = index;
      state.letterFlipped = false;
      renderLetter();
    });
    els.letterGrid.append(button);
  });
}

function renderDrawingSelect() {
  els.drawingLetterSelect.innerHTML = "";
  drawingItems().forEach((letter) => {
    const option = document.createElement("option");
    option.value = letter.id;
    option.textContent = letter.kind === "number" ? `Zahl: ${letter.german}` : `Buchstabe: ${letter.roman}`;
    els.drawingLetterSelect.append(option);
  });
}

function selectedDrawingLetter() {
  return drawingItems().find((letter) => letter.id === els.drawingLetterSelect.value) || drawingItems()[0];
}

function stepDrawing(delta) {
  const items = drawingItems();
  const currentIndex = Math.max(0, items.findIndex((item) => item.id === els.drawingLetterSelect.value));
  const next = items[clampIndex(currentIndex + delta, items.length)];
  els.drawingLetterSelect.value = next.id;
  clearCanvas();
  renderDrawingTarget();
}

function renderDrawingTarget() {
  const letter = selectedDrawingLetter();
  els.drawingTarget.textContent = letter.char;
  els.targetOverlay.textContent = letter.char;
  els.drawingTarget.classList.toggle("hidden", !state.drawingCompared);
  els.drawingMeta.textContent = letter.kind === "number"
    ? `Schreibe die Zahl: ${letter.german}`
    : `Schreibe den Buchstaben: ${letter.roman}`;
  if (!state.drawingCompared) els.targetOverlay.classList.add("hidden");
}

function drawingItems() {
  return [
    ...lessonLetters.map((letter) => ({ ...letter, kind: "letter" })),
    ...numberCardItems()
  ];
}

function alphabetCardItems() {
  return [
    ...alphabet,
    ...numberCardItems()
  ];
}

function numberCardItems() {
  return words.filter((word) => word.category === "Zahlen").map((word) => ({
      id: `number-${word.id}`,
      sourceId: word.id,
      char: nepaliNumberDigit(word),
      roman: word.roman,
      german: word.german,
      sound: word.german,
      type: "number",
      kind: "number"
    }));
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, els.drawingCanvas.width, els.drawingCanvas.height);
  state.drawingCompared = false;
  els.targetOverlay.classList.add("hidden");
  els.drawingTarget.classList.add("hidden");
  els.scoreBar.style.width = "0%";
  els.scoreCopy.textContent = "Zeichne das Zeichen aus dem Gedächtnis.";
}

function canvasPoint(event) {
  const rect = els.drawingCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (els.drawingCanvas.width / rect.width),
    y: (event.clientY - rect.top) * (els.drawingCanvas.height / rect.height)
  };
}

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;
  lastPoint = canvasPoint(event);
  drawingMoved = false;
  canvasContext.lineCap = "round";
  canvasContext.lineJoin = "round";
  canvasContext.strokeStyle = "#111827";
  canvasContext.lineWidth = 28;
  els.drawingCanvas.setPointerCapture(event.pointerId);
}

function draw(event) {
  if (!isDrawing || !lastPoint) return;
  event.preventDefault();
  const point = canvasPoint(event);
  drawingMoved = true;
  canvasContext.beginPath();
  canvasContext.moveTo(lastPoint.x, lastPoint.y);
  canvasContext.lineTo(point.x, point.y);
  canvasContext.stroke();
  lastPoint = point;
}

function stopDrawing(event) {
  if (event) event.preventDefault();
  if (isDrawing && lastPoint && !drawingMoved) {
    canvasContext.beginPath();
    canvasContext.arc(lastPoint.x, lastPoint.y, canvasContext.lineWidth / 2, 0, Math.PI * 2);
    canvasContext.fillStyle = canvasContext.strokeStyle;
    canvasContext.fill();
  }
  isDrawing = false;
  lastPoint = null;
}

function compareDrawing() {
  const letter = selectedDrawingLetter();
  const score = drawingSimilarityScore(els.drawingCanvas, canvasContext, letter.char);
  els.targetOverlay.classList.remove("hidden");
  els.drawingTarget.classList.remove("hidden");
  els.scoreBar.style.width = `${score}%`;
  els.scoreCopy.textContent = score >= 76
    ? `${score}% Ähnlichkeit. Direkt nochmal langsam wiederholen.`
    : score >= 48
      ? `${score}% Ähnlichkeit. Grundform passt, Details prüfen.`
      : `${score}% Ähnlichkeit. Nutze die rote Vorlage als Orientierung.`;
  state.drawingCompared = true;
}

function drawingSimilarityScore(canvas, context, targetChar) {
  const targetCanvas = document.createElement("canvas");
  targetCanvas.width = canvas.width;
  targetCanvas.height = canvas.height;
  const targetContext = targetCanvas.getContext("2d", { willReadFrequently: true });
  targetContext.fillStyle = "#000";
  targetContext.textAlign = "center";
  targetContext.textBaseline = "middle";
  targetContext.font = `${Math.round(canvas.width * 0.84)}px Georgia, serif`;
  targetContext.fillText(targetChar, targetCanvas.width / 2, targetCanvas.height / 2 + Math.round(canvas.height * 0.02));

  const userData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const targetData = targetContext.getImageData(0, 0, targetCanvas.width, targetCanvas.height).data;
  let overlap = 0;
  let drawn = 0;
  let target = 0;

  for (let index = 3; index < userData.length; index += 16) {
    const userInk = userData[index] > 30;
    const targetInk = targetData[index] > 30;
    if (userInk) drawn += 1;
    if (targetInk) target += 1;
    if (userInk && nearbyTargetInk(targetData, index, targetCanvas.width)) overlap += 1;
  }

  const coverage = target ? Math.min(1, overlap / Math.max(1, target * 0.42)) : 0;
  const precision = drawn ? Math.min(1, overlap / Math.max(1, drawn * 0.66)) : 0;
  return drawn ? Math.min(100, Math.round((coverage * 0.7 + precision * 0.3) * 118)) : 0;
}

function compareLessonWriting(targetChar) {
  const canvas = $("#lessonWritingCanvas");
  const bar = $("#lessonScoreBar");
  const copy = $("#lessonScoreCopy");
  if (!canvas || !bar || !copy) return;
  const score = drawingSimilarityScore(canvas, canvas.getContext("2d", { willReadFrequently: true }), targetChar);
  bar.style.width = `${score}%`;
  copy.textContent = `${score}% Ähnlichkeit.`;
  $("#lessonWritingTarget")?.classList.remove("hidden");
}

function nearbyTargetInk(data, alphaIndex, width) {
  const pixelIndex = (alphaIndex - 3) / 4;
  const x = pixelIndex % width;
  const y = Math.floor(pixelIndex / width);
  const radius = 9;
  for (let dy = -radius; dy <= radius; dy += 3) {
    for (let dx = -radius; dx <= radius; dx += 3) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width) continue;
      const nextAlpha = ((ny * width + nx) * 4) + 3;
      if (data[nextAlpha] > 30) return true;
    }
  }
  return false;
}

function renderWord() {
  const item = currentWord();
  const card = ensureCard("word", item);
  els.wordSymbol.textContent = item.nepali;
  els.wordDetail.innerHTML = state.wordFlipped ? `<span>${item.roman}</span><em>${item.german}</em>` : " ";
  els.wordCategory.textContent = item.category;
  els.wordPhase.textContent = `Stufe ${card.phase}`;
  els.wordDue.textContent = dueLabelForItem("word", item);
  renderPhaseStrip("word");
  renderProgress();
  updateListStates("word");
}

function renderSentence() {
  const item = currentSentence();
  const card = ensureCard("sentence", item);
  els.sentenceSymbol.textContent = item.nepali;
  els.sentenceDetail.innerHTML = state.sentenceFlipped ? `<span>${item.roman}</span><em>${item.german}</em>` : " ";
  els.sentenceCategory.textContent = item.category;
  els.sentencePhase.textContent = `Stufe ${card.phase}`;
  els.sentenceDue.textContent = dueLabelForItem("sentence", item);
  renderPhaseStrip("sentence");
  renderProgress();
  updateListStates("sentence");
}

function dueLabel(nextDue) {
  if (nextDue <= todayKey()) return "heute fällig";
  const due = new Date(`${nextDue}T12:00:00`);
  const now = new Date(`${todayKey()}T12:00:00`);
  const days = Math.round((due - now) / 86400000);
  return days === 1 ? "morgen" : `in ${days} Tagen`;
}

function dueLabelForItem(kind, item) {
  const card = ensureCard(kind, item);
  if (isTodayDue(kind, item)) return "heute fällig";
  if (isNew(card)) return "neu";
  return dueLabel(card.nextDue);
}

function renderWordList() {
  els.wordList.innerHTML = "";
  words.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "word-item";
    button.dataset.id = item.id;
    button.innerHTML = cardListMarkup("word", item);
    button.addEventListener("click", () => {
      state.wordFilter = "all";
      state.wordIndex = index;
      state.wordFlipped = false;
      setFilterButtons("word", "all");
      renderWord();
    });
    els.wordList.append(button);
  });
  updateListStates("word");
}

function renderSentenceList() {
  els.sentenceList.innerHTML = "";
  sentences.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "sentence-item";
    button.dataset.id = item.id;
    button.innerHTML = cardListMarkup("sentence", item);
    button.addEventListener("click", () => {
      state.sentenceFilter = "all";
      state.sentenceIndex = index;
      state.sentenceFlipped = false;
      setFilterButtons("sentence", "all");
      renderSentence();
    });
    els.sentenceList.append(button);
  });
  updateListStates("sentence");
}

function cardListMarkup(kind, item) {
  const card = ensureCard(kind, item);
  return `
    <strong>${item.nepali}</strong>
    <span>${item.roman}</span>
    <span>${item.german}</span>
    <em>Stufe ${card.phase} · ${dueLabelForItem(kind, item)}</em>
  `;
}

function updateListStates(kind) {
  const selector = kind === "word" ? ".word-item" : ".sentence-item";
  const host = kind === "word" ? els.wordList : els.sentenceList;
  host.querySelectorAll(selector).forEach((button) => {
    const card = ensureCard(kind, { id: button.dataset.id });
    button.classList.toggle("known", card.phase >= 6);
    button.classList.toggle("due", isTodayDue(kind, { id: button.dataset.id }));
    const em = button.querySelector("em");
    if (em) em.textContent = `Stufe ${card.phase} · ${dueLabelForItem(kind, { id: button.dataset.id })}`;
  });
}

function review(kind, correct) {
  const item = kind === "word" ? currentWord() : currentSentence();
  reviewItem(kind, item, correct);
  if (kind === "word") {
    state.wordFlipped = false;
    stepWord(1);
  } else {
    state.sentenceFlipped = false;
    stepSentence(1);
  }
}

function reviewItem(kind, item, correct) {
  const card = ensureCard(kind, item);
  if (correct) {
    card.phase = Math.min(6, card.phase + 1);
    card.correct += 1;
  } else {
    card.phase = Math.max(1, card.phase - 2);
    card.wrong += 1;
  }
  card.lastSeen = todayKey();
  card.nextDue = todayKey(phaseIntervals[card.phase - 1]);
  saveProgress();
  renderProgress();
  renderPhaseStrip("word");
  renderPhaseStrip("sentence");
  renderHomePhaseList();
  updateListStates("word");
  updateListStates("sentence");
}

function startLesson() {
  prepareCorrectSound();
  const steps = buildLessonSteps();
  state.lesson = {
    index: 0,
    steps,
    selected: [],
    checked: false,
    results: {},
    evaluated: false
  };
  renderLesson();
}

function buildLessonSteps() {
  const lessonUnits = pickLessonUnits();
  const lessonLetterItems = lessonUnits.filter((unit) => unit.kind === "letter").map((unit) => unit.item);
  const lessonWords = lessonUnits.filter((unit) => unit.kind === "word").map((unit) => unit.item);
  const lessonSentences = lessonUnits.filter((unit) => unit.kind === "sentence").map((unit) => unit.item);
  const teachSteps = [
    ...lessonUnits
      .filter((unit) => unit.isNew)
      .map((unit) => lessonStep(unit.kind === "letter" ? "teachLetter" : unit.kind === "word" ? "teachWord" : "teachSentence", unit.kind, unit.item))
  ];
  const practiceQueues = [
    lessonLetterItems.map((item) => lessonStep("letterRecognize", "letter", item, "erkennen")),
    lessonWords.map((item) => lessonStep("wordRecognize", "word", item, "zuordnen")),
    lessonSentences.map((item) => lessonStep("sentenceMeaning", "sentence", item, "bedeutung")),
    lessonWords.map((item) => lessonStep("wordListen", "word", item, "hoeren")),
    lessonLetterItems.map((item) => lessonStep("letterWrite", "letter", item, "schreiben")),
    lessonSentences.map((item) => lessonStep("sentenceBuild", "sentence", item, "bauen")),
    lessonWords.filter((item) => item.category === "Zahlen").map((item) => lessonStep("wordWrite", "word", item, "schreiben")),
    lessonWords.map((item) => lessonStep("wordRecall", "word", item, "erinnern")),
    lessonSentences.map((item) => lessonStep("sentenceListen", "sentence", item, "hoeren")),
    lessonSentences.map((item) => lessonStep("sentenceRecall", "sentence", item, "erinnern"))
  ].map(shuffle);

  return [
    ...teachSteps,
    ...interleaveLessonSteps(practiceQueues, teachSteps),
    { type: "lessonComplete" }
  ];
}

function pickLessonUnits() {
  const dueReview = todayDueLearningItems().filter(({ kind, item }) => {
    const card = ensureCard(kind, item);
    return !isNew(card);
  });
  const newUnits = [
    dailyNewItems("letter")[0] ? { kind: "letter", item: dailyNewItems("letter")[0], isNew: true } : null,
    dailyNewItems("word")[0] ? { kind: "word", item: dailyNewItems("word")[0], isNew: true } : null,
    dailyNewItems("sentence")[0] ? { kind: "sentence", item: dailyNewItems("sentence")[0], isNew: true } : null
  ].filter(Boolean);
  const neededNewCount = dueReview.length ? 1 : 3;
  const selected = uniqueLessonUnits([...dueReview, ...newUnits.slice(0, Math.max(neededNewCount, 3 - dueReview.length))]);
  return fillLessonUnits(selected, lessonUnitGap + 1);
}

function fillLessonUnits(units, minimumCount) {
  const selected = uniqueLessonUnits(units);
  const selectedKeys = new Set(selected.map((unit) => unitKey(unit.kind, unit.item)));
  const candidates = allLearningItems()
    .filter(({ kind, item }) => !selectedKeys.has(unitKey(kind, item)))
    .filter(({ kind, item }) => kind !== "word" || !isNew(ensureCard(kind, item)))
    .sort((a, b) => unitPriority(a) - unitPriority(b));
  candidates.forEach((candidate) => {
    if (selected.length >= minimumCount) return;
    selected.push({
      ...candidate,
      isNew: isNew(ensureCard(candidate.kind, candidate.item))
    });
    selectedKeys.add(unitKey(candidate.kind, candidate.item));
  });
  return selected;
}

function unitPriority({ kind, item }) {
  const card = ensureCard(kind, item);
  if (isTodayDue(kind, item) && !isNew(card)) return 0;
  if (!isNew(card)) return 1;
  if (kind === "letter") return 2;
  if (kind === "sentence") return 3;
  return 4;
}

function pickNewUnit(kind) {
  const items = kind === "letter" ? lessonLetters : kind === "word" ? words : sentences;
  const newItems = items.filter((item) => {
    const card = ensureCard(kind, item);
    return isDue(card) && isNew(card);
  });
  const selected = kind === "word" ? pickNewWords(newItems, 1)[0] : newItems[0];
  return selected ? { kind, item: selected, isNew: true } : null;
}

function uniqueLessonUnits(units) {
  const seen = new Set();
  return units.filter((unit) => {
    const key = unitKey(unit.kind, unit.item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pickLessonItems(kind, count, maxNew = 1) {
  const items = kind === "letter" ? lessonLetters : kind === "word" ? words : sentences;
  const due = items.filter((item) => isDue(ensureCard(kind, item)));
  const newItems = due.filter((item) => isNew(ensureCard(kind, item)));
  const reviewItems = due.filter((item) => !isNew(ensureCard(kind, item)));
  const fallbackReviewItems = items.filter((item) => !isNew(ensureCard(kind, item)));
  const selectedNewItems = kind === "word" ? pickNewWords(newItems, maxNew) : newItems.slice(0, maxNew);
  const ordered = uniqueItems([...selectedNewItems, ...reviewItems, ...fallbackReviewItems]);
  if (!ordered.length) return newItems.slice(0, 1);
  return ordered.slice(0, count);
}

function pickNewWords(newItems, maxNew) {
  const numberItems = newItems.filter((item) => item.category === "Zahlen");
  const hasLearnedNumber = words.some((item) => item.category === "Zahlen" && !isNew(ensureCard("word", item)));
  if (!hasLearnedNumber && numberItems.length) return numberItems.slice(0, maxNew);
  return newItems.slice(0, maxNew);
}

function uniqueItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function lessonStep(type, kind, item, skill = null) {
  return { type, unit: unitKey(kind, item), kind, item, skill };
}

function interleaveLessonSteps(queues, initialSteps = []) {
  const openQueues = queues.filter((queue) => queue.length);
  const mixed = [];
  const history = initialSteps.filter((step) => step.unit);
  let cursor = 0;
  while (openQueues.some((queue) => queue.length)) {
    let queueIndex = -1;
    let stepIndex = 0;
    for (let offset = 0; offset < openQueues.length; offset += 1) {
      const index = (cursor + offset) % openQueues.length;
      const queue = openQueues[index];
      if (!queue.length) continue;
      const candidateIndex = queue.findIndex((step) => !hasRecentUnit([...history, ...mixed], step.unit, lessonUnitGap));
      if (candidateIndex < 0) continue;
      queueIndex = index;
      stepIndex = candidateIndex;
      break;
    }
    if (queueIndex < 0) {
      const best = bestFallbackStep(openQueues, [...history, ...mixed], cursor);
      queueIndex = best.queueIndex;
      stepIndex = best.stepIndex;
    }
    const queue = openQueues[queueIndex];
    mixed.push(queue.splice(stepIndex, 1)[0]);
    cursor = (queueIndex + 1) % openQueues.length;
  }
  return mixed;
}

function bestFallbackStep(queues, history, cursor) {
  let best = { queueIndex: queues.findIndex((queue) => queue.length), stepIndex: 0, distance: -1 };
  queues.forEach((queue, queueIndex) => {
    if (!queue.length) return;
    queue.forEach((step, stepIndex) => {
      const distance = distanceSinceUnit(history, step.unit);
      const cursorBonus = queueIndex >= cursor ? 0.1 : 0;
      if (distance + cursorBonus > best.distance) best = { queueIndex, stepIndex, distance: distance + cursorBonus };
    });
  });
  return best;
}

function hasRecentUnit(steps, unit, gap) {
  if (gap <= 0) return false;
  return steps.slice(-gap).some((step) => step.unit === unit);
}

function distanceSinceUnit(steps, unit) {
  for (let index = steps.length - 1; index >= 0; index -= 1) {
    if (steps[index].unit === unit) return steps.length - index - 1;
  }
  return Number.MAX_SAFE_INTEGER;
}

function unitKey(kind, item) {
  return `${kind}:${item.id}`;
}

function renderLesson() {
  const step = state.lesson.steps[state.lesson.index];
  const total = Math.max(1, state.lesson.steps.length);
  els.lessonProgressBar.style.width = `${Math.round((state.lesson.index / total) * 100)}%`;
  els.lessonFeedback.className = "lesson-feedback hidden";
  els.lessonFeedback.textContent = "";
  els.lessonContinueButton.classList.remove("is-hidden-until-ready");
  els.lessonContinueButton.disabled = false;
  els.lessonContinueButton.textContent = step ? lessonButtonText(step) : "Neue Übung";
  if (!step) {
    els.lessonProgressBar.style.width = "100%";
    els.lessonPathTitle.textContent = "Lektion fertig";
    els.lessonPathMeta.textContent = "Nächsten gemischten Lauf starten";
    els.lessonStage.innerHTML = `
      <div class="lesson-complete">
        <p class="lesson-kicker">Lektion fertig</p>
        <h2>Bereit für die nächste Runde!</h2>
        <p>Der nächste Lauf mischt neue und fällige Buchstaben, Wörter und Sätze wieder anders.</p>
      </div>
    `;
    return;
  }
  els.lessonPathTitle.textContent = lessonTitle(step);
  els.lessonPathMeta.textContent = step.item ? phaseLabel(step.kind, step.item) : "Schauen, was schon sitzt";
  state.lesson.selected = [];
  state.lesson.checked = false;
  if (step.type === "teachLetter") renderTeachLetterStep(step);
  if (step.type === "letterRecognize") renderLetterRecognizeStep(step);
  if (step.type === "letterWrite") renderLetterWriteStep(step);
  if (step.type === "teachWord") renderTeachWordStep(step);
  if (step.type === "wordRecognize") renderWordRecognizeStep(step);
  if (step.type === "wordWrite") renderWordWriteStep(step);
  if (step.type === "wordRecall") renderRecallStep(step);
  if (step.type === "wordListen") renderListenStep(step);
  if (step.type === "teachSentence") renderTeachSentenceStep(step);
  if (step.type === "sentenceMeaning") renderSentenceMeaningStep(step);
  if (step.type === "sentenceBuild") renderBuildSentenceStep(step);
  if (step.type === "sentenceListen") renderListenStep(step);
  if (step.type === "sentenceRecall") renderRecallStep(step);
  if (step.type === "lessonComplete") renderLessonCompleteStep();
  bindRomanToggle(step);
}

function phaseLabel(kind, item) {
  const card = ensureCard(kind, item);
  return `Stufe ${card.phase}`;
}

function lessonTitle(step) {
  if (!step) return "Üben";
  const titles = {
    teachLetter: "Neuer Buchstabe",
    letterRecognize: "Wähle den Buchstaben",
    letterWrite: "Schreibe den Buchstaben",
    teachWord: "Neues Wort",
    wordRecognize: "Wähle die richtige Antwort",
    wordWrite: "Schreibe die Zahl auf Nepali",
    wordRecall: "Wie heißt das Wort auf Nepali?",
    wordListen: "Was hast du gehört?",
    teachSentence: "Neuer Satz",
    sentenceMeaning: "Was ist die richtige Antwort?",
    sentenceBuild: "Übersetze diesen Satz",
    sentenceListen: "Was hast du gehört?",
    sentenceRecall: "Erinnere dich an den Nepali-Satz",
    lessonComplete: "Auswertung"
  };
  return titles[step.type] || lessonTypeLabels[step.type] || "Üben";
}

function lessonButtonText(step) {
  if (isTeachingStep(step)) return "Weiter";
  if (step.type === "lessonComplete") return state.lesson.evaluated ? "Neue Übung" : "Stufen aktualisieren";
  if (isSelfCheckStep(step)) return "Weiter";
  return "Überprüfen";
}

function isTeachingStep(step) {
  return step.type === "teachLetter" || step.type === "teachWord" || step.type === "teachSentence";
}

function isSelfCheckStep(step) {
  return step.type === "wordRecall" || step.type === "sentenceRecall" || step.type === "letterWrite" || step.type === "wordWrite";
}

function lessonHeadingMarkup(step) {
  if (!canToggleRoman(step)) return "";
  return `
    <div class="lesson-heading-row">
      <button class="roman-toggle" data-roman-toggle="${step.type}" type="button" aria-pressed="${shouldShowRoman(step)}">
        ${lessonTypeLabels[step.type] || "Diese Aufgabe"}: Lautschrift ${shouldShowRoman(step) ? "an" : "aus"}
      </button>
    </div>
  `;
}

function lessonAudioControlMarkup(step) {
  return `
    <div class="lesson-heading-row listen-control-row">
      ${canToggleRoman(step) ? `
        <button class="roman-toggle" data-roman-toggle="${step.type}" type="button" aria-pressed="${shouldShowRoman(step)}">
          ${lessonTypeLabels[step.type] || "Diese Aufgabe"}: Lautschrift ${shouldShowRoman(step) ? "an" : "aus"}
        </button>
      ` : "<span></span>"}
      <button class="audio-square listen-audio-button" data-audio-kind="${step.kind}" type="button" aria-label="Anhören">${audioIcon()}</button>
    </div>
  `;
}

function bindRomanToggle(step) {
  const button = els.lessonStage.querySelector("[data-roman-toggle]");
  if (!button) return;
  button.addEventListener("click", () => {
    state.lessonRoman[step.type] = !shouldShowRoman(step);
    saveLessonSettings();
    renderLesson();
  });
}

function shouldShowRoman(step) {
  if (["letterRecognize", "letterWrite", "wordWrite"].includes(step.type)) return false;
  return state.lessonRoman[step.type] !== false;
}

function canToggleRoman(step) {
  return !["letterRecognize", "letterWrite", "wordWrite", "sentenceMeaning"].includes(step.type);
}

function romanLine(item, step) {
  return shouldShowRoman(step) ? `<span class="roman-line">${item.roman}</span>` : "";
}

function audioIcon() {
  return `
    <svg class="audio-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5v5h3.3L12 18.2V5.8L7.3 9.5H4z"></path>
      <path d="M16 8.5a5 5 0 0 1 0 7"></path>
      <path d="M18.7 5.8a8.8 8.8 0 0 1 0 12.4"></path>
    </svg>
  `;
}

function mutedAudioIcon() {
  return `
    <svg class="audio-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5v5h3.3L12 18.2V5.8L7.3 9.5H4z"></path>
      <path d="M18.5 9l-5 5"></path>
      <path d="M13.5 9l5 5"></path>
    </svg>
  `;
}

function renderTeachLetterStep(step) {
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-intro-card letter-intro-card">
      <div class="lesson-word-lines">
        <strong>${step.item.char}</strong>
        ${romanLine(step.item, step)}
        <em>${step.item.sound}</em>
      </div>
      <button class="audio-split" data-audio-kind="letter" type="button" aria-label="Buchstabe anhören">${audioIcon()}</button>
    </div>
  `;
  bindLessonAudio(step.item, null);
  window.setTimeout(() => playItem(step.item), 150);
}

function renderLetterRecognizeStep(step) {
  const options = optionSet(lessonLetters, step.item, "roman", 4);
  els.lessonStage.innerHTML = `
    <div class="lesson-prompt-card">
      <span>${step.item.roman}</span>
      <button class="audio-square" data-audio-kind="letter" type="button" aria-label="Anhören">${audioIcon()}</button>
    </div>
    <div class="answer-grid letter-answer-grid">
      ${options.map((item) => `
        <button class="answer-card letter-answer-card" data-correct="${item.id === step.item.id}">
          <strong>${item.char}</strong>
          ${romanLine(item, step)}
        </button>
      `).join("")}
    </div>
  `;
  bindLessonOptions();
  bindLessonAudio(step.item, null);
}

function renderLetterWriteStep(step) {
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-writing lesson-writing-full">
      <p class="writing-prompt">Schreibe: <strong>${step.item.roman}</strong></p>
      <div class="lesson-canvas-wrap">
        <canvas class="lesson-canvas" id="lessonWritingCanvas" width="520" height="520" aria-label="Buchstaben zeichnen"></canvas>
        <div class="lesson-canvas-target hidden" id="lessonWritingTarget">${step.item.char}</div>
      </div>
      <div class="recall-answer writing-answer hidden" id="lessonLetterAnswer">
        <strong>${step.item.char}</strong>
        ${romanLine(step.item, step)}
      </div>
      <div class="lesson-writing-tools">
        <button class="primary-button" id="lessonCompareWritingButton">Vergleichen</button>
        <button class="secondary-button" id="lessonShowLetterButton">Buchstabe anzeigen</button>
        <button class="secondary-button" id="lessonClearCanvasButton">Löschen</button>
      </div>
      <div class="score-meter lesson-score-meter" aria-label="Ähnlichkeit"><span id="lessonScoreBar"></span></div>
      <p class="score-copy" id="lessonScoreCopy">Zeichne erst aus dem Gedächtnis.</p>
    </div>
    <div class="recall-actions" id="recallActions">
      <button class="secondary-button danger-button" data-self-check="false">Nicht gewusst</button>
      <button class="secondary-button success-button" data-self-check="true">Gewusst</button>
    </div>
  `;
  bindLessonWritingCanvas();
  bindLessonSelfCheck();
  $("#lessonCompareWritingButton").addEventListener("click", () => compareLessonWriting(step.item.char));
  $("#lessonShowLetterButton").addEventListener("click", () => {
    $("#lessonWritingTarget").classList.remove("hidden");
    $("#lessonLetterAnswer").classList.remove("hidden");
    playItem(step.item);
  });
  $("#lessonClearCanvasButton").addEventListener("click", clearLessonWritingCanvas);
}

function renderWordWriteStep(step) {
  const digit = nepaliNumberDigit(step.item);
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-writing lesson-writing-full">
      <p class="writing-prompt">Schreibe: <strong>${step.item.german}</strong></p>
      <div class="lesson-canvas-wrap">
        <canvas class="lesson-canvas" id="lessonWritingCanvas" width="520" height="360" aria-label="Zahl zeichnen"></canvas>
        <div class="lesson-canvas-target hidden" id="lessonWritingTarget">${digit}</div>
      </div>
      <div class="recall-answer writing-answer word-writing-answer hidden" id="lessonLetterAnswer">
        <strong>${digit}</strong>
      </div>
      <div class="lesson-writing-tools">
        <button class="primary-button" id="lessonCompareWritingButton">Vergleichen</button>
        <button class="secondary-button" id="lessonShowLetterButton">Zahl anzeigen</button>
        <button class="secondary-button" id="lessonClearCanvasButton">Löschen</button>
      </div>
      <div class="score-meter lesson-score-meter" aria-label="Ähnlichkeit"><span id="lessonScoreBar"></span></div>
      <p class="score-copy" id="lessonScoreCopy">Zeichne erst aus dem Gedächtnis.</p>
    </div>
    <div class="recall-actions" id="recallActions">
      <button class="secondary-button danger-button" data-self-check="false">Nicht gewusst</button>
      <button class="secondary-button success-button" data-self-check="true">Gewusst</button>
    </div>
  `;
  bindLessonWritingCanvas();
  bindLessonSelfCheck();
  $("#lessonCompareWritingButton").addEventListener("click", () => compareLessonWriting(digit));
  $("#lessonShowLetterButton").addEventListener("click", () => {
    $("#lessonWritingTarget").classList.remove("hidden");
    $("#lessonLetterAnswer").classList.remove("hidden");
  });
  $("#lessonClearCanvasButton").addEventListener("click", clearLessonWritingCanvas);
}

function nepaliNumberDigit(item) {
  const digits = {
    ek: "१",
    dui: "२",
    tin: "३",
    char: "४",
    panch: "५",
    chha_number: "६",
    sat: "७",
    aath: "८",
    nau: "९",
    das: "१०"
  };
  return digits[item.id] || item.nepali;
}

function wordDisplayText(item) {
  return item.category === "Zahlen" ? nepaliNumberDigit(item) : item.nepali;
}

function renderTeachWordStep(step) {
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-intro-card">
      <div class="lesson-word-lines">
        <strong>${wordDisplayText(step.item)}</strong>
        ${romanLine(step.item, step)}
        <em>${step.item.german}</em>
      </div>
      <button class="audio-split" data-audio-kind="word" type="button" aria-label="Wort anhören">${audioIcon()}</button>
    </div>
  `;
  bindLessonAudio(step.item, null);
  window.setTimeout(() => playItem(step.item), 150);
}

function renderTeachSentenceStep(step) {
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-intro-card sentence-intro-card">
      <div class="lesson-word-lines">
        <strong>${step.item.nepali}</strong>
        ${romanLine(step.item, step)}
        <em>${step.item.german}</em>
      </div>
      <button class="audio-split" data-audio-kind="sentence" type="button" aria-label="Satz anhören">${audioIcon()}</button>
    </div>
  `;
  bindLessonAudio(null, step.item);
  window.setTimeout(() => playItem(step.item), 150);
}

function renderWordRecognizeStep(step) {
  const options = optionSet(wordOptionPool(step.item), step.item, "german", 4);
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-prompt-card">
      <span>${step.item.german}</span>
      <button class="audio-square" data-audio-kind="word" type="button" aria-label="Anhören">${audioIcon()}</button>
    </div>
    <div class="answer-grid">
      ${options.map((item) => optionButtonMarkup(item, item.id === step.item.id, step)).join("")}
    </div>
  `;
  bindLessonOptions();
  if (shouldShowRoman(step)) bindAnswerAudio(options);
  bindLessonAudio(step.item, null);
}

function renderSentenceMeaningStep(step) {
  const options = optionSet(sentences, step.item, "german", 4);
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-prompt-card tall">
      <div>
        <strong>${step.item.nepali}</strong>
        ${romanLine(step.item, step)}
      </div>
      <button class="audio-square" data-audio-kind="sentence" type="button" aria-label="Anhören">${audioIcon()}</button>
    </div>
    <div class="choice-list">
      ${options.map((item) => `<button class="choice-answer" data-correct="${item.id === step.item.id}">${item.german}</button>`).join("")}
    </div>
  `;
  bindLessonOptions();
  bindLessonAudio(null, step.item);
}

function renderListenStep(step) {
  const items = step.kind === "word" ? wordOptionPool(step.item) : sentences;
  const options = optionSet(items, step.item, "roman", 4);
  els.lessonStage.innerHTML = `
    ${lessonAudioControlMarkup(step)}
    <div class="choice-list">
      ${options.map((item) => `
        <button class="choice-answer stacked" data-correct="${item.id === step.item.id}">
          <strong>${step.kind === "word" ? wordDisplayText(item) : item.nepali}</strong>
          ${romanLine(item, step)}
        </button>
      `).join("")}
    </div>
  `;
  bindLessonOptions();
  bindLessonAudio(step.kind === "word" ? step.item : null, step.kind === "sentence" ? step.item : null);
  window.setTimeout(() => playItem(step.item), 150);
}

function renderBuildSentenceStep(step) {
  const correctWords = tokenizeGerman(step.item.german);
  const distractors = shuffle([
    "ich", "du", "sie", "wir", "nicht", "gut", "bitte", "morgen", "heute", "wasser",
    "tee", "reis", "hier", "dort", "ist", "bin", "sind", "ein", "eine", "das",
    "der", "die", "gehen", "brauche", "sprechen", "langsam", "klein", "groß"
  ])
    .filter((word) => !correctWords.includes(word.toLowerCase()))
    .slice(0, 8);
  const chips = shuffle([...correctWords, ...distractors]);
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="lesson-prompt-card tall">
      <div>
        <strong>${step.item.nepali}</strong>
        ${romanLine(step.item, step)}
      </div>
      <button class="audio-square" data-audio-kind="sentence" type="button" aria-label="Anhören">${audioIcon()}</button>
    </div>
    <div class="build-slots" id="buildSlots">${correctWords.map(() => "<span></span>").join("")}</div>
    <div class="chip-bank">
      ${chips.map((word) => `<button class="word-chip" data-word="${word}">${word}</button>`).join("")}
    </div>
  `;
  bindBuildChips(correctWords);
  bindLessonAudio(null, step.item);
}

function renderRecallStep(step) {
  const isSentence = step.kind === "sentence";
  const answerText = isSentence ? step.item.nepali : wordDisplayText(step.item);
  els.lessonStage.innerHTML = `
    ${lessonHeadingMarkup(step)}
    <div class="recall-card" id="recallCard">
      <p>${step.item.german}</p>
      <button class="secondary-button" id="revealRecallButton">Aufdecken</button>
      <div class="recall-answer hidden" id="recallAnswer">
        <strong>${answerText}</strong>
        ${romanLine(step.item, step)}
      </div>
    </div>
    <div class="recall-actions hidden" id="recallActions">
      <button class="secondary-button danger-button" data-self-check="false">Nicht gewusst</button>
      <button class="secondary-button success-button" data-self-check="true">Gewusst</button>
    </div>
  `;
  $("#revealRecallButton").addEventListener("click", () => {
    $("#recallAnswer").classList.remove("hidden");
    $("#recallActions").classList.remove("hidden");
    $("#revealRecallButton").classList.add("revealed");
    $("#revealRecallButton").disabled = true;
    playItem(step.item);
  });
  els.lessonContinueButton.classList.add("is-hidden-until-ready");
  bindLessonSelfCheck();
}

function bindLessonSelfCheck() {
  els.lessonContinueButton.disabled = true;
  els.lessonStage.querySelectorAll("[data-self-check]").forEach((button) => {
    button.addEventListener("click", () => {
      els.lessonStage.querySelectorAll("[data-self-check]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      state.lesson.selected = [button];
      els.lessonContinueButton.classList.remove("is-hidden-until-ready");
      els.lessonContinueButton.disabled = false;
    });
  });
}

function bindLessonWritingCanvas() {
  const canvas = $("#lessonWritingCanvas");
  const context = canvas.getContext("2d");
  let drawing = false;
  let previous = null;
  let moved = false;
  context.lineWidth = 12;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#334855";

  const point = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
  };
  const drawPoint = (event) => {
    if (!drawing) return;
    event.preventDefault();
    const next = point(event);
    moved = true;
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(next.x, next.y);
    context.stroke();
    previous = next;
  };
  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    drawing = true;
    previous = point(event);
    moved = false;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", drawPoint);
  canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    if (drawing && previous && !moved) {
      context.beginPath();
      context.arc(previous.x, previous.y, context.lineWidth / 2, 0, Math.PI * 2);
      context.fillStyle = context.strokeStyle;
      context.fill();
    }
    drawing = false;
    previous = null;
  });
  canvas.addEventListener("pointercancel", (event) => {
    event.preventDefault();
    drawing = false;
    previous = null;
  });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
}

function clearLessonWritingCanvas() {
  const canvas = $("#lessonWritingCanvas");
  if (!canvas) return;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function optionButtonMarkup(item, correct, step) {
  return `
    <button class="answer-card" data-correct="${correct}" data-item-id="${item.id}">
      <strong>${wordDisplayText(item)}</strong>
      ${romanLine(item, step)}
    </button>
  `;
}

function bindAnswerAudio(options) {
  els.lessonStage.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = options.find((candidate) => candidate.id === button.dataset.itemId);
      if (item) playItem(item);
    });
  });
}

function bindLessonAudio(word, sentence) {
  els.lessonStage.querySelectorAll("[data-audio-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.dataset.audioKind === "sentence" ? sentence : word;
      if (item) playItem(item);
    });
  });
}

function bindLessonOptions() {
  els.lessonContinueButton.disabled = true;
  els.lessonStage.querySelectorAll("[data-correct]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.lesson.checked) return;
      els.lessonStage.querySelectorAll("[data-correct]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      state.lesson.selected = [button];
      els.lessonContinueButton.disabled = false;
    });
  });
}

function bindBuildChips(correctWords) {
  els.lessonContinueButton.disabled = true;
  state.lesson.selected = [];
  els.lessonStage.querySelectorAll(".word-chip").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.lesson.checked) return;
      if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        state.lesson.selected = state.lesson.selected.filter((item) => item !== button);
      } else {
        button.classList.add("selected");
        state.lesson.selected.push(button);
      }
      renderBuildSlots(correctWords);
      els.lessonContinueButton.disabled = state.lesson.selected.length !== correctWords.length;
    });
  });
}

function renderBuildSlots(correctWords) {
  const slots = $("#buildSlots");
  slots.innerHTML = "";
  correctWords.forEach((_, index) => {
    const span = document.createElement("span");
    span.textContent = state.lesson.selected[index]?.dataset.word || "";
    slots.append(span);
  });
}

async function continueLesson() {
  const step = state.lesson.steps[state.lesson.index];
  if (!step) {
    startLesson();
    return;
  }
  if (isTeachingStep(step)) {
    state.lesson.index += 1;
    renderLesson();
    return;
  }
  if (step.type === "lessonComplete") {
    if (!state.lesson.evaluated) {
      els.lessonContinueButton.disabled = true;
      evaluateLessonRun();
      state.lesson.evaluated = true;
      renderLesson();
      if (lessonRunStars(lessonRunSummary()) >= 2) await playLevelUpSound();
      return;
    }
    startLesson();
    return;
  }
  if (!state.lesson.checked) {
    checkLessonAnswer(step);
    return;
  }
  state.lesson.index += 1;
  renderLesson();
}

function checkLessonAnswer(step) {
  let correct = false;
  if (step.type === "sentenceBuild") {
    const answer = state.lesson.selected.map((button) => button.dataset.word.toLowerCase()).join(" ");
    correct = answer === tokenizeGerman(step.item.german).join(" ");
  } else if (isSelfCheckStep(step)) {
    correct = state.lesson.selected[0]?.dataset.selfCheck === "true";
  } else {
    correct = state.lesson.selected[0]?.dataset.correct === "true";
  }
  state.lesson.checked = true;
  stopActiveAudio();
  recordLessonResult(step, correct);
  if (correct) playCorrectSound();
  if (isSelfCheckStep(step)) {
    if (correct) {
      showLessonFeedback("correct", "Gut erinnert!", randomCopy("recallCorrect"));
    } else {
      showLessonFeedback("wrong", "Leider nicht gewusst", randomCopy("recallWrong"));
    }
  } else if (correct) {
    showLessonFeedback("correct", "Richtig!", correctFeedbackText(step));
  } else {
    showLessonFeedback("wrong", "Leider falsch", correctAnswerText(step));
  }
  saveProgress();
  renderProgress();
  markLessonAnswers(correct);
  els.lessonContinueButton.disabled = false;
  els.lessonContinueButton.textContent = "Weiter";
  els.lessonFeedback.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function correctFeedbackText(step) {
  if (step.type === "wordListen" || step.type === "sentenceListen") return step.item.german;
  return randomCopy("correct");
}

function randomCopy(kind) {
  const options = feedbackCopy[kind] || [""];
  return options[Math.floor(Math.random() * options.length)];
}

function recordLessonResult(step, correct) {
  if (!state.lesson.results[step.unit]) state.lesson.results[step.unit] = {};
  state.lesson.results[step.unit][step.skill] = correct;
}

function renderLessonCompleteStep() {
  const summary = lessonRunSummary();
  const stars = lessonRunStars(summary);
  els.lessonContinueButton.textContent = state.lesson.evaluated ? "Neue Übung" : "Stufen aktualisieren";
  els.lessonStage.innerHTML = `
    <div class="lesson-complete">
      <p class="lesson-kicker">${state.lesson.evaluated ? "Bewertet" : "Auswertung"}</p>
      <h2>${lessonCompleteTitle(summary)}</h2>
      <p>${lessonCompleteText(summary)}</p>
      ${state.lesson.evaluated ? `
        <div class="lesson-stars" aria-label="${stars} von 3 Sternen">${renderStars(stars)}</div>
        <div class="lesson-summary-grid">
          <span><strong>${summary.passed}</strong> sicher gewusst</span>
          <span><strong>${summary.failed}</strong> nochmal üben</span>
        </div>
      ` : ""}
    </div>
  `;
}

function unitPassed(unit) {
  const values = Object.values(state.lesson.results[unit] || {});
  return values.length > 0 && values.every(Boolean);
}

function lessonRunSummary() {
  return lessonUnits().reduce((summary, unit) => {
    if (unitPassed(unit.key)) summary.passed += 1;
    else summary.failed += 1;
    return summary;
  }, { passed: 0, failed: 0 });
}

function lessonRunStars(summary) {
  const total = summary.passed + summary.failed;
  if (!total || summary.passed === 0) return 0;
  const ratio = summary.passed / total;
  if (ratio === 1) return 3;
  if (ratio >= 0.6) return 2;
  return 1;
}

function renderStars(count) {
  return [0, 1, 2].map((index) => `<span class="${index < count ? "filled" : ""}">★</span>`).join("");
}

function lessonUnits() {
  const byUnit = new Map();
  state.lesson.steps.forEach((step) => {
    if (!step.item || !step.kind || !step.skill) return;
    if (!byUnit.has(step.unit)) byUnit.set(step.unit, { key: step.unit, kind: step.kind, item: step.item });
  });
  return Array.from(byUnit.values());
}

function lessonCompleteTitle(summary) {
  if (!state.lesson.evaluated) return "Runde geschafft!";
  if (summary.failed === 0) return "Stark, das saß richtig gut!";
  if (summary.passed === 0) return "Guter Anfang, wir festigen das!";
  return "Gut gemacht, ein Teil sitzt schon!";
}

function lessonCompleteText(summary) {
  if (!state.lesson.evaluated) {
    return "Schau dir kurz an, was schon sicher sitzt und was du in der nächsten Runde nochmal bekommst.";
  }
  if (summary.failed === 0) return "Alles aus dieser Runde sitzt. Beim nächsten Mal darf es ruhig etwas gemischter werden.";
  if (summary.passed === 0) return "Das sitzt noch nicht sicher. Du bekommst diese Inhalte wieder.";
  return "Was sicher war, zählt als geschafft. Was noch wackelt, kommt nochmal dran.";
}

function evaluateLessonRun() {
  lessonUnits().forEach((unit) => reviewItem(unit.kind, unit.item, unitPassed(unit.key)));
  updateDailyLessonStreak();
  saveProgress();
  renderProgress();
}

function updateDailyLessonStreak() {
  const today = todayKey();
  if (state.lastLessonDate === today) return;
  state.streak = state.lastLessonDate === todayKey(-1) ? state.streak + 1 : 1;
  state.lastLessonDate = today;
}

function showLessonFeedback(status, title, text) {
  els.lessonFeedback.className = `lesson-feedback ${status}`;
  els.lessonFeedback.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
}

function correctAnswerText(step) {
  if (step.type === "sentenceBuild" || step.type === "sentenceMeaning" || step.type === "sentenceListen" || step.type === "wordListen") {
    return `<span class="correct-answer-label">Richtige Antwort</span><span class="correct-answer-text">${step.item.german}</span>`;
  }
  if (step.kind === "letter") {
    return `<span class="correct-answer-label">Richtige Antwort</span><span class="correct-answer-devanagari">${step.item.char}</span><span class="correct-answer-roman">${step.item.roman}</span>`;
  }
  return `<span class="correct-answer-label">Richtige Antwort</span><span class="correct-answer-devanagari">${wordDisplayText(step.item)}</span><span class="correct-answer-roman">${step.item.roman}</span>`;
}

function markLessonAnswers(correct) {
  if (correct && state.lesson.selected[0]) state.lesson.selected[0].classList.add("correct");
  if (!correct) {
    state.lesson.selected.forEach((button) => button.classList.add("wrong"));
    els.lessonStage.querySelectorAll('[data-correct="true"]').forEach((button) => button.classList.add("correct"));
  }
}

function optionSet(items, correctItem, field, count) {
  const distractors = shuffle(items.filter((item) => item.id !== correctItem.id && item[field] !== correctItem[field])).slice(0, count - 1);
  return shuffle([correctItem, ...distractors]);
}

function wordOptionPool(correctItem) {
  if (correctItem.category !== "Zahlen") return words;
  return words.filter((item) => item.category === "Zahlen");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function sentenceForWord(word) {
  const search = word.nepali.replace(/[।?]/g, "");
  return sentences.find((sentence) => sentence.nepali.includes(search));
}

function tokenizeGerman(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function stepWord(delta) {
  const items = filteredItems("word");
  state.wordIndex = clampIndex(state.wordIndex + delta, items.length);
  renderWord();
}

function stepSentence(delta) {
  const items = filteredItems("sentence");
  state.sentenceIndex = clampIndex(state.sentenceIndex + delta, items.length);
  renderSentence();
}

function setFilterButtons(kind, value) {
  const attr = kind === "word" ? "wordFilter" : "sentenceFilter";
  $$(`[data-${kind}-filter]`).forEach((button) => {
    button.classList.toggle("active", button.dataset[attr] === value);
  });
}

function renderPhrases() {
  els.phraseSelect.innerHTML = "";
  sentences.forEach((phrase, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = phrase.german;
    els.phraseSelect.append(option);
  });
  renderCurrentPhrase();
}

function renderCurrentPhrase() {
  const phrase = sentences[Number(els.phraseSelect.value)] || sentences[0];
  els.phraseNepali.textContent = phrase.nepali;
  els.phraseRoman.textContent = phrase.roman;
  els.phraseGerman.textContent = phrase.german;
  els.nativePlayback.classList.add("hidden");
}

async function playItem(item, visible = false) {
  if (!state.soundEnabled) return;
  stopActiveAudio();
  if (item.audio) {
    try {
      const player = visible ? els.nativePlayback : new Audio();
      player.src = item.audio;
      player.currentTime = 0;
      if (visible) player.classList.remove("hidden");
      state.activeAudio = player;
      await player.play();
      return;
    } catch {
      speak(item.nepali);
      return;
    }
  }
  speak(item.nepali || item.char);
}

async function playCorrectSound() {
  if (!state.soundEnabled) return;
  try {
    const player = state.correctSound || new Audio("bling.mp3");
    state.correctSound = player;
    player.pause();
    player.currentTime = 0;
    await player.play();
  } catch {
    // The browser can block short effects in some autoplay states; the answer still counts.
  }
}

async function playLevelUpSound() {
  if (!state.soundEnabled) return;
  try {
    const player = state.levelUpSound || new Audio("fanfaren.mp3");
    state.levelUpSound = player;
    player.pause();
    player.currentTime = 0;
    const finished = new Promise((resolve) => {
      player.addEventListener("ended", resolve, { once: true });
      player.addEventListener("error", resolve, { once: true });
    });
    await player.play();
    await finished;
  } catch {
    // fanfaren.mp3 is optional; if it is missing or blocked, the evaluation still works.
  }
}

function stopActiveAudio() {
  if (state.activeAudio) {
    state.activeAudio.pause();
    state.activeAudio = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function prepareCorrectSound() {
  if (state.correctSound) return;
  state.correctSound = new Audio("bling.mp3");
  state.correctSound.preload = "auto";
  state.correctSound.load();
  if (!state.levelUpSound) {
    state.levelUpSound = new Audio("fanfaren.mp3");
    state.levelUpSound.preload = "auto";
    state.levelUpSound.load();
  }
}

function renderSoundButton() {
  if (!els.lessonSoundButton) return;
  els.lessonSoundButton.innerHTML = state.soundEnabled ? audioIcon() : mutedAudioIcon();
  els.lessonSoundButton.setAttribute("aria-label", state.soundEnabled ? "Ton an" : "Ton aus");
  els.lessonSoundButton.setAttribute("aria-pressed", String(state.soundEnabled));
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  if (!state.soundEnabled && state.activeAudio) {
    state.activeAudio.pause();
    state.activeAudio = null;
  }
  saveSoundSetting();
  renderSoundButton();
}

function confirmExitLesson() {
  if (!state.lesson.steps.length || window.confirm("Möchtest du die Lektion abbrechen?")) {
    state.lesson = {
      index: 0,
      steps: [],
      selected: [],
      checked: false,
      results: {},
      evaluated: false
    };
    setView("home");
  }
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  utterance.lang = "hi-IN";
  const voice = voices.find((item) => item.lang.toLowerCase().startsWith("ne"))
    || voices.find((item) => item.lang.toLowerCase().startsWith("hi"))
    || voices.find((item) => item.lang.toLowerCase() === "en-in");
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

async function toggleRecording() {
  if (state.mediaRecorder?.state === "recording") {
    state.mediaRecorder.stop();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    els.recordingStatus.textContent = "Audioaufnahme wird in diesem Browser nicht unterstützt.";
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordingChunks = [];
    state.mediaRecorder = new MediaRecorder(stream);
    state.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) state.recordingChunks.push(event.data);
    });
    state.mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(state.recordingChunks, { type: state.mediaRecorder.mimeType });
      els.recordingPlayback.src = URL.createObjectURL(blob);
      els.recordingPlayback.classList.remove("hidden");
      els.recordingStatus.textContent = "Aufnahme fertig. Vergleiche sie mit der Vorlage.";
      els.recordButton.textContent = "Aufnehmen";
      stream.getTracks().forEach((track) => track.stop());
    });
    state.mediaRecorder.start();
    els.recordingStatus.textContent = "Aufnahme läuft.";
    els.recordButton.textContent = "Stoppen";
  } catch {
    els.recordingStatus.textContent = "Mikrofonzugriff wurde nicht erlaubt.";
  }
}

function bindEvents() {
  els.tabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  $$(".segment[data-alphabet-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.alphabetFilter = button.dataset.alphabetFilter;
      state.letterIndex = 0;
      state.letterFlipped = false;
      $$(".segment[data-alphabet-filter]").forEach((segment) => segment.classList.toggle("active", segment === button));
      renderLetterGrid();
      renderLetter();
    });
  });
  $$(".segment[data-word-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.wordFilter = button.dataset.wordFilter;
      state.wordIndex = 0;
      state.wordFlipped = false;
      setFilterButtons("word", state.wordFilter);
      renderWord();
    });
  });
  $$(".segment[data-sentence-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sentenceFilter = button.dataset.sentenceFilter;
      state.sentenceIndex = 0;
      state.sentenceFlipped = false;
      setFilterButtons("sentence", state.sentenceFilter);
      renderSentence();
    });
  });
  els.letterCard.addEventListener("click", () => {
    state.letterFlipped = !state.letterFlipped;
    renderLetter();
  });
  els.prevLetterButton.addEventListener("click", () => {
    state.letterIndex -= 1;
    state.letterFlipped = false;
    renderLetter();
  });
  els.nextLetterButton.addEventListener("click", () => {
    state.letterIndex += 1;
    state.letterFlipped = false;
    renderLetter();
  });
  els.speakLetterButton.addEventListener("click", () => playItem(currentLetter()));
  els.toggleKnownLetterButton.addEventListener("click", () => {
    const letter = currentLetter();
    toggleSet(state.knownLetters, letter.id);
    saveProgress();
    renderLetter();
  });

  els.drawingLetterSelect.addEventListener("change", () => {
    clearCanvas();
    renderDrawingTarget();
  });
  els.prevDrawingButton.addEventListener("click", () => stepDrawing(-1));
  els.nextDrawingButton.addEventListener("click", () => stepDrawing(1));
  els.drawingCanvas.addEventListener("pointerdown", startDrawing);
  els.drawingCanvas.addEventListener("pointermove", draw);
  els.drawingCanvas.addEventListener("pointerup", stopDrawing);
  els.drawingCanvas.addEventListener("pointercancel", stopDrawing);
  els.drawingCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  els.compareButton.addEventListener("click", compareDrawing);
  els.clearCanvasButton.addEventListener("click", clearCanvas);

  els.wordCard.addEventListener("click", () => {
    state.wordFlipped = !state.wordFlipped;
    renderWord();
  });
  els.prevWordButton.addEventListener("click", () => stepWord(-1));
  els.nextWordButton.addEventListener("click", () => stepWord(1));
  els.speakWordButton.addEventListener("click", () => playItem(currentWord()));
  els.rightWordButton.addEventListener("click", () => review("word", true));
  els.wrongWordButton.addEventListener("click", () => review("word", false));

  els.sentenceCard.addEventListener("click", () => {
    state.sentenceFlipped = !state.sentenceFlipped;
    renderSentence();
  });
  els.prevSentenceButton.addEventListener("click", () => stepSentence(-1));
  els.nextSentenceButton.addEventListener("click", () => stepSentence(1));
  els.speakSentenceButton.addEventListener("click", () => playItem(currentSentence()));
  els.rightSentenceButton.addEventListener("click", () => review("sentence", true));
  els.wrongSentenceButton.addEventListener("click", () => review("sentence", false));

  els.phraseSelect.addEventListener("change", renderCurrentPhrase);
  els.playPhraseButton.addEventListener("click", () => {
    const phrase = sentences[Number(els.phraseSelect.value)] || sentences[0];
    playItem(phrase, true);
  });
  els.recordButton.addEventListener("click", toggleRecording);
  els.lessonExitButton.addEventListener("click", confirmExitLesson);
  els.lessonSoundButton.addEventListener("click", toggleSound);
  els.lessonContinueButton.addEventListener("click", continueLesson);
  els.profileSelect.addEventListener("change", () => switchProfile(els.profileSelect.value));
  els.addProfileButton.addEventListener("click", addProfile);
}

function toggleSet(set, value) {
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

function initCards() {
  allLearningItems().forEach(({ kind, item }) => ensureCard(kind, item));
}

function init() {
  loadProfiles();
  loadProgress();
  loadLessonSettings();
  initCards();
  renderProfiles();
  bindEvents();
  document.body.dataset.view = state.view;
  renderLetterGrid();
  renderDrawingSelect();
  renderWordList();
  renderSentenceList();
  renderPhrases();
  renderProgress();
  renderHomePhaseList();
  renderLetter();
  renderDrawingTarget();
  renderWord();
  renderSentence();
  renderSoundButton();
  registerServiceWorker();
}

init();

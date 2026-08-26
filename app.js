/**
 * Sisters' Learning Quest - Multi-User RBAC Learning Engine
 * Users:
 *   1. 🌟 Aezza (Grade 3 - SA-1):
 *      - 🇫🇷 French Quest (La Vie de Luc, Le Monde Multiculturel, La Nourriture, Conjugaison & Loisirs)
 *      - 🔢 Mathematics Quest (Addition/Subtraction, Estimation, PEMDAS, Tables 2-15, Factors/Multiples, Place Value, Negative Numbers, Time)
 *   2. 🎈 Fayra (Prep-I - SA-1, Baldwin International School Little Wings):
 *      - 🔤 English Phonics & Rhymes (Letters Aa-Oo, Picture Phonics, 4 Sing-Along Rhymes)
 *      - 🔢 Math Magic (Numbers 1-30, Shapes: Square/Circle/Triangle/Rectangle/Oval, Counting 1-10)
 *      - 🌍 General Awareness (Days of Week, Water Animals, Insects, Safe vs Unsafe Touch, Emotions, Birds)
 */

// =============================================================================
// 1. RBAC AUTHENTICATION & USER PROFILE CONTROLLER
// =============================================================================

const AuthController = {
  isLoggedIn: false,
  currentUser: "aezza", // "aezza" or "fayra"

  init() {
    this.checkAuth();
    this.bindEvents();
  },

  checkAuth() {
    try {
      const savedUser = localStorage.getItem("sisters_quest_active_user");
      const isAuth = localStorage.getItem("sisters_quest_auth");
      if (isAuth === "true" && (savedUser === "aezza" || savedUser === "fayra")) {
        this.currentUser = savedUser;
        this.isLoggedIn = true;
        AppState.currentUser = savedUser;
        this.renderAuthenticatedUI();
        return true;
      }
    } catch (e) {
      console.warn("Auth check error:", e);
    }

    this.isLoggedIn = false;
    this.renderLockedUI();
    return false;
  },

  loginAs(username) {
    this.currentUser = username;
    this.isLoggedIn = true;
    AppState.currentUser = username;
    localStorage.setItem("sisters_quest_auth", "true");
    localStorage.setItem("sisters_quest_active_user", username);
    sfx.correct();
    confetti.blast();
    showToast(username === "aezza" ? "🌟" : "🎈", `Welcome ${username === "aezza" ? "Aezza (Grade 3)" : "Fayra (Prep-I)"}!`);
    this.renderAuthenticatedUI();
  },

  renderAuthenticatedUI() {
    const mainNav = document.getElementById("main-nav");
    const mascotBar = document.getElementById("mascot-bar");
    const authStats = document.getElementById("header-authenticated-stats");
    const profilePill = document.getElementById("github-profile-pill");
    const headerAvatar = document.getElementById("header-user-avatar");
    const headerLabel = document.getElementById("header-user-label");
    const displayName = document.getElementById("display-user-name");
    const subjSwitcher = document.getElementById("subject-switcher-container");

    if (mainNav) mainNav.style.display = "flex";
    if (mascotBar) mascotBar.style.display = "flex";
    if (authStats) authStats.style.display = "flex";
    if (profilePill) profilePill.style.display = "flex";
    if (subjSwitcher) subjSwitcher.style.display = "flex";

    const isAezza = this.currentUser === "aezza";
    if (headerAvatar) headerAvatar.textContent = isAezza ? "🌟" : "🎈";
    if (headerLabel) headerLabel.textContent = isAezza ? "Aezza (Grade 3)" : "Fayra (Prep-I)";
    if (displayName) displayName.textContent = isAezza ? "Aezza 🌟" : "Fayra 🎈";

    document.body.classList.toggle("user-fayra", !isAezza);
    document.body.classList.toggle("user-aezza", isAezza);

    loadSavedStateForUser(this.currentUser);
    renderSubjectSwitcherButtons();
    renderAdventureGrid();
    renderTrophiesView();
    updateGamificationDisplay();

    showView("view-adventure");
  },

  renderLockedUI() {
    const mainNav = document.getElementById("main-nav");
    const mascotBar = document.getElementById("mascot-bar");
    const authStats = document.getElementById("header-authenticated-stats");
    const profilePill = document.getElementById("github-profile-pill");
    const displayName = document.getElementById("display-user-name");
    const subjSwitcher = document.getElementById("subject-switcher-container");

    if (mainNav) mainNav.style.display = "none";
    if (mascotBar) mascotBar.style.display = "none";
    if (authStats) authStats.style.display = "none";
    if (profilePill) profilePill.style.display = "none";
    if (subjSwitcher) subjSwitcher.style.display = "none";
    if (displayName) displayName.textContent = "Select Profile 👑";

    showView("view-login");
  },

  bindEvents() {
    const btnAezza = document.getElementById("btn-select-aezza");
    const btnFayra = document.getElementById("btn-select-fayra");
    const btnSwitch = document.getElementById("btn-switch-user");
    const logoutBtn = document.getElementById("btn-logout");
    const loginForm = document.getElementById("family-login-form");

    if (btnAezza) {
      btnAezza.addEventListener("click", () => {
        sfx.pop();
        this.loginAs("aezza");
      });
    }

    if (btnFayra) {
      btnFayra.addEventListener("click", () => {
        sfx.pop();
        this.loginAs("fayra");
      });
    }

    if (btnSwitch) {
      btnSwitch.addEventListener("click", () => {
        sfx.pop();
        const nextUser = this.currentUser === "aezza" ? "fayra" : "aezza";
        this.loginAs(nextUser);
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sfx.pop();
        this.logout();
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sfx.pop();
        this.handlePasscodeSubmit();
      });
    }
  },

  handlePasscodeSubmit() {
    const passwordInput = document.getElementById("family-password");
    const errBanner = document.getElementById("login-error-banner");
    const errText = document.getElementById("login-error-text");
    const entered = passwordInput ? passwordInput.value.trim().toLowerCase() : "";

    if (errBanner) errBanner.style.display = "none";

    if (entered === "fayra" || entered === "fayra2026" || entered === "prep1" || entered === "5678") {
      this.loginAs("fayra");
    } else if (entered === "aezza" || entered === "aezza2026" || entered === "1234" || entered === "french" || entered === "math") {
      this.loginAs("aezza");
    } else if (entered === "papa" || entered === "family" || entered === "asim" || entered === "2026") {
      this.loginAs("aezza");
      showToast("👑", "Family pass verified! You can switch sisters anytime.");
    } else {
      sfx.incorrect();
      if (errText) errText.textContent = "Incorrect code. Tap 'Aezza' or 'Fayra' above or try 1234!";
      if (errBanner) errBanner.style.display = "flex";
      if (passwordInput) passwordInput.focus();
    }
  },

  logout() {
    localStorage.removeItem("sisters_quest_auth");
    showToast("🔒", "Portal locked.");
    this.checkAuth();
  }
};

// =============================================================================
// 2. GENERAL HELPERS, AUDIO & CONFETTI
// =============================================================================

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

class SoundFX {
  constructor() { this.ctx = null; }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }

  playBeep(freq, type, duration, startTime = 0) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }

  correct() {
    this.playBeep(523.25, "triangle", 0.15, 0);
    this.playBeep(659.25, "triangle", 0.15, 0.08);
    this.playBeep(783.99, "triangle", 0.18, 0.16);
    this.playBeep(1046.50, "sine", 0.35, 0.24);
  }

  incorrect() {
    this.playBeep(330, "sine", 0.18, 0);
    this.playBeep(260, "sine", 0.28, 0.12);
  }

  pop() { this.playBeep(600, "sine", 0.08, 0); }

  fanfare() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
      this.playBeep(freq, "triangle", 0.22, idx * 0.09);
    });
  }
}

const sfx = new SoundFX();

class VoiceReciter {
  constructor() {
    this.synth = window.speechSynthesis;
    this.frenchVoice = null;
    this.englishVoice = null;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const findVoices = () => {
      const voices = this.synth.getVoices();
      this.frenchVoice = voices.find(v => v.lang.startsWith("fr") || v.name.toLowerCase().includes("french")) || null;
      this.englishVoice = voices.find(v => v.lang.startsWith("en") || v.name.toLowerCase().includes("english")) || null;
    };
    findVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoices;
    }
  }

  speak(text, lang = "fr-FR", rate = 0.9) {
    if (!this.synth) return;
    try {
      if (this.synth.paused) this.synth.resume();
      this.synth.cancel();

      this.initVoices();
      const cleanText = text.replace(/_+/g, "").replace(/\s+/g, " ").trim();
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.rate = parseFloat(rate) || 0.9;
      utter.pitch = 1.08;

      if (lang.startsWith("fr")) {
        utter.lang = "fr-FR";
        if (this.frenchVoice) utter.voice = this.frenchVoice;
      } else {
        utter.lang = "en-US";
        if (this.englishVoice) utter.voice = this.englishVoice;
      }

      this.synth.speak(utter);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  }
}

const voice = new VoiceReciter();

class ConfettiLauncher {
  constructor() {
    this.canvas = document.getElementById("confetti-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  blast() {
    if (!this.canvas) return;
    this.resize();
    const colors = ["#ff529a", "#2eb872", "#0284c7", "#f59e0b", "#8b5cf6", "#ec4899", "#3b82f6", "#fbbf24", "#10b981"];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 + 50,
        r: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18 - 6,
        gravity: 0.35
      });
    }

    if (!this.animationId) this.animate();
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.tiltAngle += p.tiltAngleInc;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      this.ctx.beginPath();
      this.ctx.lineWidth = p.r / 2;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      this.ctx.stroke();

      if (p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        i--;
      }
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

const confetti = new ConfettiLauncher();

function showToast(icon, message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const pill = document.createElement("div");
  pill.className = "toast-pill";
  pill.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
  container.appendChild(pill);
  setTimeout(() => {
    if (pill.parentNode) pill.parentNode.removeChild(pill);
  }, 4000);
}

// =============================================================================
// 3. APPLICATION STATE & PERSISTENCE
// =============================================================================

const AppState = {
  currentUser: "aezza",
  currentSubject: "french",
  xp: 350,
  stars: 120,
  streak: 5,
  completedUnits: {},
  unscrambleSolved: 0,
  currentQuiz: [],
  currentQuizKey: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswersHistory: [],
  isMockExam: false,
  unscramblePuzzles: [],
  unscrambleIndex: 0,
  assembledTokens: [],
  matchingCategory: "nationalities",
  matchingSelected: [],
  matchedPairsCount: 0,
  isMatchingBusy: false,
  flashcardCategory: "verbes",
  flashcardIndex: 0
};

function loadSavedStateForUser(username) {
  try {
    const storageKey = `sisters_quest_state_${username}`;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const saved = JSON.parse(raw);
      AppState.xp = saved.xp || (username === "aezza" ? 350 : 200);
      AppState.stars = saved.stars || (username === "aezza" ? 120 : 80);
      AppState.streak = saved.streak || 5;
      AppState.completedUnits = saved.completedUnits || {};
      AppState.unscrambleSolved = saved.unscrambleSolved || 0;
      AppState.currentSubject = saved.currentSubject || (username === "aezza" ? "french" : "phonics");
    } else {
      AppState.xp = username === "aezza" ? 350 : 200;
      AppState.stars = username === "aezza" ? 120 : 80;
      AppState.streak = 5;
      AppState.completedUnits = {};
      AppState.unscrambleSolved = 0;
      AppState.currentSubject = username === "aezza" ? "french" : "phonics";
    }
  } catch (e) {
    console.warn("User state load error:", e);
  }
}

function saveStateForUser() {
  try {
    const username = AppState.currentUser;
    const storageKey = `sisters_quest_state_${username}`;
    localStorage.setItem(storageKey, JSON.stringify({
      xp: AppState.xp,
      stars: AppState.stars,
      streak: AppState.streak,
      completedUnits: AppState.completedUnits,
      unscrambleSolved: AppState.unscrambleSolved,
      currentSubject: AppState.currentSubject
    }));
  } catch (e) {
    console.warn("User state save error:", e);
  }
}

function addXP(amount) {
  AppState.xp += amount;
  AppState.stars += Math.floor(amount / 10);
  updateGamificationDisplay();
  saveStateForUser();
  showToast("⚡", `+${amount} XP gained!`);
}

function updateGamificationDisplay() {
  const elXp = document.getElementById("stat-xp");
  const elStars = document.getElementById("stat-stars");
  const elStreak = document.getElementById("stat-streak");
  if (elXp) elXp.textContent = AppState.xp;
  if (elStars) elStars.textContent = AppState.stars;
  if (elStreak) elStreak.textContent = AppState.streak;
}

// =============================================================================
// 4. AEZZA'S FRENCH GRAMMAR DATABASE & GENERATORS
// =============================================================================

const FRENCH_DB = {
  subjects: {
    firstSing: { text: "Je", pron: "me", pronVowel: "m'", endingEr: "e", aller: "vais", aimer: "J'aime" },
    secondSing: { text: "Tu", pron: "te", pronVowel: "t'", endingEr: "es", aller: "vas", aimer: "Tu aimes" },
    thirdSingMasc: [
      { text: "Luc", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Luc aime" },
      { text: "Paul", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Paul aime" },
      { text: "Il", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Il aime" }
    ],
    thirdSingFem: [
      { text: "Aezza", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Aezza aime" },
      { text: "Marie", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Marie aime" },
      { text: "Elle", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Elle aime" }
    ],
    firstPlur: { text: "Nous", pron: "nous", pronVowel: "nous", endingEr: "ons", aller: "allons", aimer: "Nous aimons" },
    secondPlur: { text: "Vous", pron: "vous", pronVowel: "vous", endingEr: "ez", aller: "allez", aimer: "Vous aimez" },
    thirdPlurMasc: [
      { text: "Ils", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Ils aiment" }
    ],
    thirdPlurFem: [
      { text: "Elles", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Elles aiment" }
    ]
  },

  reflexiveVerbs: [
    { infinitive: "se réveiller", root: "réveill", meaning: "to wake up", startsVowel: false, times: ["à sept heures du matin", "à 6h30", "tôt le matin"] },
    { infinitive: "se lever", root: "lèv", rootPlur: "lev", meaning: "to get out of bed", startsVowel: false, times: ["rapidement", "aussitôt", "à 7 heures"] },
    { infinitive: "se doucher", root: "douch", meaning: "to take a shower", startsVowel: false, times: ["dans la salle de bain", "avant l'école", "le matin"] },
    { infinitive: "se brosser les dents", root: "bross", suffix: "les dents", meaning: "to brush teeth", startsVowel: false, times: ["après le petit déjeuner", "avant d'aller au lit"] },
    { infinitive: "s'habiller", root: "habill", meaning: "to get dressed", startsVowel: true, times: ["pour aller à l'école", "dans sa chambre"] },
    { infinitive: "se coucher", root: "couch", meaning: "to go to bed", startsVowel: false, times: ["à vingt et une heures", "le soir à 20h30"] }
  ],

  places: [
    { name: "France", type: "country-fem", prep: "en", mascNat: "français", femNat: "française" },
    { name: "Inde", type: "country-vowel", prep: "en", mascNat: "indien", femNat: "indienne" },
    { name: "Italie", type: "country-vowel", prep: "en", mascNat: "italien", femNat: "italienne" },
    { name: "Canada", type: "country-masc", prep: "au", mascNat: "canadien", femNat: "canadienne" },
    { name: "Japon", type: "country-masc", prep: "au", mascNat: "japonais", femNat: "japonaise" },
    { name: "États-Unis", type: "country-plur", prep: "aux", mascNat: "américain", femNat: "américaine" },
    { name: "Paris", type: "city", prep: "à" },
    { name: "Lyon", type: "city", prep: "à" },
    { name: "Rome", type: "city", prep: "à" }
  ],

  food: {
    masculine: [{ name: "pain", en: "bread", emoji: "🥖" }, { name: "croissant", en: "croissant", emoji: "🥐" }, { name: "fromage", en: "cheese", emoji: "🧀" }, { name: "beurre", en: "butter", emoji: "🧈" }],
    feminine: [{ name: "confiture", en: "jam", emoji: "🍓" }, { name: "salade", en: "salad", emoji: "🥗" }, { name: "soupe", en: "soup", emoji: "🍲" }],
    vowel: [{ name: "eau fraîche", en: "fresh water", emoji: "💧" }],
    plural: [{ name: "fruits", en: "fruits", emoji: "🍎" }, { name: "légumes", en: "vegetables", emoji: "🥦" }]
  }
};

function getRandomFrenchSubject() {
  const groups = ["firstSing", "secondSing", "thirdSingMasc", "thirdSingFem", "firstPlur", "secondPlur", "thirdPlurMasc", "thirdPlurFem"];
  const val = FRENCH_DB.subjects[pickRandom(groups)];
  return Array.isArray(val) ? pickRandom(val) : val;
}

function generateFrenchCh1Question() {
  const subj = getRandomFrenchSubject();
  const verb = pickRandom(FRENCH_DB.reflexiveVerbs);
  const time = pickRandom(verb.times);
  const correctPron = verb.startsVowel ? subj.pronVowel : subj.pron;
  let root = verb.root;
  if ((subj.text === "Nous" || subj.text === "Vous") && verb.rootPlur) root = verb.rootPlur;
  const conjVerb = root + subj.endingEr;

  const sentence = `${subj.text} ______ ${conjVerb} ${verb.suffix || ""} ${time}.`;
  const fullAudio = `${subj.text} ${correctPron} ${conjVerb} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
  const distractors = ["me", "te", "se", "nous", "vous"].filter(p => p !== correctPron).slice(0, 3);
  const options = shuffle([correctPron, ...distractors]);

  return {
    category: "Grammaire • Verbe Pronominal",
    fr: sentence,
    en: `${subj.text} (${verb.meaning}) ${time}.`,
    audio: fullAudio,
    options: options,
    correct: options.indexOf(correctPron),
    explanation: `Pour le sujet "${subj.text}", le pronom réfléchi est "${correctPron}".`,
    lang: "fr-FR"
  };
}

function generateFrenchCh2Question() {
  const isCity = Math.random() > 0.5;
  const place = isCity ? pickRandom(FRENCH_DB.places.filter(p => p.type === "city")) : pickRandom(FRENCH_DB.places.filter(p => p.type.startsWith("country")));
  const person = pickRandom(["Luc", "Aezza", "Paul"]);
  const sentence = `${person} habite ______ ${place.name}.`;
  const fullAudio = `${person} habite ${place.prep} ${place.name}.`;
  const distractors = ["à", "en", "au", "aux"].filter(p => p !== place.prep);
  const options = shuffle([place.prep, ...distractors]);

  return {
    category: "Prépositions de Lieux",
    fr: sentence,
    en: `${person} lives in ${place.name}.`,
    audio: fullAudio,
    options: options,
    correct: options.indexOf(place.prep),
    explanation: place.type === "city" ? `Pour les villes (${place.name}), on utilise "à".` : `Pour "${place.name}", on utilise "${place.prep}".`,
    lang: "fr-FR"
  };
}

function generateFrenchCh3Question() {
  const itemType = pickRandom(["masculine", "feminine", "plural"]);
  let item, correctArticle;
  if (itemType === "masculine") {
    item = pickRandom(FRENCH_DB.food.masculine);
    correctArticle = "du";
  } else if (itemType === "feminine") {
    item = pickRandom(FRENCH_DB.food.feminine);
    correctArticle = "de la";
  } else {
    item = pickRandom(FRENCH_DB.food.plural);
    correctArticle = "des";
  }

  const subj = pickRandom(["Au petit déjeuner, je prends", "À midi, Aezza mange", "Pour le dîner, Luc boit"]);
  const sentence = `${subj} ______ ${item.name}.`;
  const fullAudio = `${subj} ${correctArticle} ${item.name}.`;
  const options = shuffle(["du", "de la", "de l'", "des"]);

  return {
    category: "Articles Partitifs (du, de la, de l', des)",
    fr: sentence,
    en: `${subj} some ${item.en}.`,
    audio: fullAudio,
    options: options,
    correct: options.indexOf(correctArticle),
    explanation: `"${item.name}" demande l'article partitif "${correctArticle}".`,
    lang: "fr-FR"
  };
}

function generateFrenchCh4Question() {
  const subj = getRandomFrenchSubject();
  const place = pickRandom(["à l'école", "au parc", "à Paris"]);
  const sentence = `${subj.text} ______ ${place}. (aller)`;
  const fullAudio = `${subj.text} ${subj.aller} ${place}.`;
  const forms = ["vais", "vas", "va", "allons", "allez", "vont"];
  const distractors = forms.filter(f => f !== subj.aller).slice(0, 3);
  const options = shuffle([subj.aller, ...distractors]);

  return {
    category: "Conjugaison • Verbe Aller",
    fr: sentence,
    en: `${subj.text} go(es) to ${place}.`,
    audio: fullAudio,
    options: options,
    correct: options.indexOf(subj.aller),
    explanation: `Le verbe "aller" avec "${subj.text}" se conjugue "${subj.aller}".`,
    lang: "fr-FR"
  };
}

// =============================================================================
// 5. AEZZA'S GRADE 3 MATHEMATICS PROCEDURAL GENERATORS (SA-1)
// =============================================================================

function generateMathUnit1Question() {
  const qType = pickRandom(["estimation-add", "pemdas-simple", "pemdas-parentheses", "even-odd-rule"]);

  if (qType === "estimation-add") {
    const a = randInt(120, 580);
    const b = randInt(110, 390);
    const roundA = Math.round(a / 100) * 100;
    const roundB = Math.round(b / 100) * 100;
    const estSum = roundA + roundB;
    const sentence = `Estimate the sum of ${a} + ${b} by rounding each number to the nearest 100.`;
    const explanation = `${a} rounds to ${roundA}, and ${b} rounds to ${roundB}. Estimated sum: ${roundA} + ${roundB} = ${estSum}.`;
    const distractors = [estSum + 100, estSum - 100, estSum + 50].filter(d => d !== estSum);
    const options = shuffle([String(estSum), ...distractors.map(String)]);
    return {
      category: "Unit 3 • Estimation & Rounding (Nearest 100)",
      fr: sentence,
      en: `Step 1: Round to nearest 100 -> ${roundA} + ${roundB}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(estSum)),
      explanation: explanation,
      lang: "en-US"
    };
  } else if (qType === "pemdas-simple") {
    const a = randInt(4, 15);
    const b = randInt(2, 6);
    const c = randInt(3, 7);
    const ans = a + b * c;
    const wrong = (a + b) * c;
    const sentence = `Evaluate using PEMDAS: ${a} + ${b} × ${c} = ?`;
    const explanation = `Multiplication comes first: ${b} × ${c} = ${b * c}. Then add: ${a} + ${b * c} = ${ans}.`;
    const options = shuffle([String(ans), String(wrong), String(ans + 2), String(ans - 3)]);
    return {
      category: "Unit 3 • Order of Operations (PEMDAS)",
      fr: sentence,
      en: `Multiply before adding!`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(ans)),
      explanation: explanation,
      lang: "en-US"
    };
  } else if (qType === "pemdas-parentheses") {
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(2, 5);
    const ans = (a + b) * c;
    const sentence = `Evaluate using PEMDAS: (${a} + ${b}) × ${c} = ?`;
    const explanation = `Solve brackets first: (${a} + ${b}) = ${a + b}. Then multiply: ${a + b} × ${c} = ${ans}.`;
    const options = shuffle([String(ans), String(a + b * c), String(ans + 4), String(ans - 2)]);
    return {
      category: "Unit 3 • Order of Operations with Brackets",
      fr: sentence,
      en: `Solve parentheses first!`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(ans)),
      explanation: explanation,
      lang: "en-US"
    };
  } else {
    const rules = [
      { text: "Odd + Odd is ALWAYS...", ans: "Even", exp: "Example: 3 + 5 = 8 (Even). Odd + Odd is always Even!" },
      { text: "Odd + Even is ALWAYS...", ans: "Odd", exp: "Example: 7 + 4 = 11 (Odd). Odd + Even is always Odd!" },
      { text: "Odd × Odd is ALWAYS...", ans: "Odd", exp: "Example: 3 × 5 = 15 (Odd). Odd × Odd is always Odd!" }
    ];
    const picked = pickRandom(rules);
    const sentence = `Generalization Rule: ${picked.text}`;
    const options = shuffle(["Even", "Odd", "Sometimes Even, Sometimes Odd", "Zero"]);
    return {
      category: "Unit 3 • Even & Odd Number Rules",
      fr: sentence,
      en: picked.exp,
      audio: sentence,
      options: options,
      correct: options.indexOf(picked.ans),
      explanation: picked.exp,
      lang: "en-US"
    };
  }
}

function generateMathUnit2Question() {
  const a = randInt(6, 15);
  const b = randInt(3, 12);
  const product = a * b;
  const sentence = `What is ${a} × ${b} = ?`;
  const explanation = `${a} multiplied by ${b} is equal to ${product}.`;
  const distractors = [product + a, product - b, product + 10].filter(d => d !== product);
  const options = shuffle([String(product), ...distractors.map(String)]);
  return {
    category: "Unit 5 • Multiplication Tables (2-15)",
    fr: sentence,
    en: `Multiplication fact: ${a} times ${b}`,
    audio: `What is ${a} times ${b}?`,
    options: options,
    correct: options.indexOf(String(product)),
    explanation: explanation,
    lang: "en-US"
  };
}

function generateMathUnit3Question() {
  const thousands = randInt(2, 9);
  const hundreds = randInt(1, 9);
  const tens = randInt(1, 9);
  const ones = randInt(1, 9);
  const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
  const sentence = `In the 4-digit number ${num.toLocaleString()}, what is the PLACE VALUE of ${hundreds}?`;
  const correctVal = `${hundreds * 100} (${hundreds} Hundreds)`;
  const distractors = [`${hundreds * 1000} (${hundreds} Thousands)`, `${hundreds * 10} (${hundreds} Tens)`, `${hundreds} (${hundreds} Ones)`];
  const options = shuffle([correctVal, ...distractors]);
  return {
    category: "1.3 • Place Value in 4-Digit Numbers",
    fr: sentence,
    en: `Thousands | Hundreds | Tens | Ones`,
    audio: sentence,
    options: options,
    correct: options.indexOf(correctVal),
    explanation: `The digit ${hundreds} is in the hundreds column, so its value is ${hundreds * 100}.`,
    lang: "en-US"
  };
}

function generateMathUnit4Question() {
  const conv = pickRandom([
    { q: "How many minutes are in 2 hours?", ans: "120 minutes", exp: "1 hour = 60 minutes. 2 hours = 2 × 60 = 120 minutes." },
    { q: "How many hours are in 3 days?", ans: "72 hours", exp: "1 day = 24 hours. 3 days = 3 × 24 = 72 hours." },
    { q: "An analog clock shows minute hand on 3, hour hand past 4. What time is it?", ans: "4:15 (Quarter past 4)", exp: "Minute hand on 3 means 15 minutes (Quarter past 4)." }
  ]);
  const distractors = ["60 minutes", "100 minutes", "180 minutes", "48 hours"].filter(d => d !== conv.ans);
  const options = shuffle([conv.ans, ...distractors.slice(0, 3)]);
  return {
    category: "2.1 • Time & Clocks",
    fr: conv.q,
    en: conv.exp,
    audio: conv.q,
    options: options,
    correct: options.indexOf(conv.ans),
    explanation: conv.exp,
    lang: "en-US"
  };
}

function generateDynamicMathQuiz(unitKey, count = 6) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    if (unitKey === "math-u1") questions.push(generateMathUnit1Question());
    else if (unitKey === "math-u2") questions.push(generateMathUnit2Question());
    else if (unitKey === "math-u3") questions.push(generateMathUnit3Question());
    else if (unitKey === "math-u4") questions.push(generateMathUnit4Question());
    else questions.push(generateMathUnit1Question());
  }
  return questions;
}

function generateDynamicMathMockExam(count = 15) {
  const generators = [generateMathUnit1Question, generateMathUnit2Question, generateMathUnit3Question, generateMathUnit4Question];
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(pickRandom(generators)());
  }
  return list;
}

// =============================================================================
// 6. FAYRA'S PREP-I KNOWLEDGE BASE & GENERATORS
// =============================================================================

const FAYRA_DB = {
  phonics: [
    { letter: "Aa", small: "a", sound: "ah", word: "Apple", emoji: "🍎", phonicsHint: "A says /a/ as in Apple" },
    { letter: "Bb", small: "b", sound: "buh", word: "Ball", emoji: "⚽", phonicsHint: "B says /b/ as in Ball" },
    { letter: "Cc", small: "c", sound: "cuh", word: "Cat", emoji: "🐱", phonicsHint: "C says /k/ as in Cat" },
    { letter: "Dd", small: "d", sound: "duh", word: "Dog", emoji: "🐶", phonicsHint: "D says /d/ as in Dog" },
    { letter: "Ee", small: "e", sound: "eh", word: "Elephant", emoji: "🐘", phonicsHint: "E says /e/ as in Elephant" },
    { letter: "Ff", small: "f", sound: "fuh", word: "Fish", emoji: "🐟", phonicsHint: "F says /f/ as in Fish" },
    { letter: "Gg", small: "g", sound: "guh", word: "Grapes", emoji: "🍇", phonicsHint: "G says /g/ as in Grapes" },
    { letter: "Hh", small: "h", sound: "huh", word: "Hat", emoji: "🎩", phonicsHint: "H says /h/ as in Hat" },
    { letter: "Ii", small: "i", sound: "ih", word: "Igloo", emoji: "🧊", phonicsHint: "I says /i/ as in Igloo" },
    { letter: "Jj", small: "j", sound: "juh", word: "Jug", emoji: "🏺", phonicsHint: "J says /j/ as in Jug" },
    { letter: "Kk", small: "k", sound: "kuh", word: "Kite", emoji: "🪁", phonicsHint: "K says /k/ as in Kite" },
    { letter: "Ll", small: "l", sound: "luh", word: "Lion", emoji: "🦁", phonicsHint: "L says /l/ as in Lion" },
    { letter: "Mm", small: "m", sound: "mmm", word: "Monkey", emoji: "🐒", phonicsHint: "M says /m/ as in Monkey" },
    { letter: "Nn", small: "n", sound: "nnn", word: "Nest", emoji: "🪺", phonicsHint: "N says /n/ as in Nest" },
    { letter: "Oo", small: "o", sound: "aww", word: "Orange", emoji: "🍊", phonicsHint: "O says /o/ as in Orange" }
  ],

  rhymes: [
    {
      title: "Mary had a little lamb 🐑",
      lyrics: "Mary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nThe lamb was sure to go!",
      icon: "🐑",
      audioText: "Mary had a little lamb, Its fleece was white as snow. And everywhere that Mary went, The lamb was sure to go!"
    },
    {
      title: "I’m a little tadpole 🐸",
      lyrics: "I'm a little tadpole swimming in the lake,\nSwimming all day, no mistake!\nWhen I grow up, hopping on a log,\nLook at me now, I'm a friendly frog! Ribbit ribbit!",
      icon: "🐸",
      audioText: "I'm a little tadpole swimming in the lake, Swimming all day, no mistake! When I grow up, hopping on a log, Look at me now, I'm a friendly frog!"
    },
    {
      title: "Little Seeds 🌱",
      lyrics: "I plant a little seed in the cold cold ground,\nOut comes the yellow sun, big and round.\nDown comes the gentle rain, soft and slow,\nUp comes the little plant, grow grow grow!",
      icon: "🌱",
      audioText: "I plant a little seed in the cold cold ground. Out comes the yellow sun, big and round. Down comes the gentle rain, soft and slow. Up comes the little plant, grow grow grow!"
    },
    {
      title: "I hear thunder ⛈️",
      lyrics: "I hear thunder! I hear thunder!\nHark don't you? Hark don't you?\nPitter patter raindrops, pitter patter raindrops,\nI'm wet through! So are you!",
      icon: "⛈️",
      audioText: "I hear thunder! I hear thunder! Hark don't you? Hark don't you? Pitter patter raindrops, pitter patter raindrops, I'm wet through! So are you!"
    }
  ],

  shapes: [
    { name: "Circle", emoji: "🔴", desc: "Round with no corners (like a ball, clock, or coin)" },
    { name: "Square", emoji: "🟦", desc: "4 equal sides and 4 corners (like a dice or window)" },
    { name: "Triangle", emoji: "🔺", desc: "3 sides and 3 sharp corners (like a slice of pizza or party hat)" },
    { name: "Rectangle", emoji: "🟩", desc: "4 sides: 2 long sides and 2 short sides (like a book or door)" },
    { name: "Oval", emoji: "🥚", desc: "Egg shape, curved with no straight lines" }
  ],

  waterAnimals: [
    { name: "Fish", emoji: "🐟" },
    { name: "Dolphin", emoji: "🐬" },
    { name: "Octopus", emoji: "🐙" },
    { name: "Whale", emoji: "🐋" },
    { name: "Shark", emoji: "🦈" },
    { name: "Seahorse", emoji: "🌊" },
    { name: "Turtle", emoji: "🐢" },
    { name: "Crab", emoji: "🦀" }
  ],

  insects: [
    { name: "Butterfly", emoji: "🦋" },
    { name: "Honeybee", emoji: "🐝" },
    { name: "Ladybug", emoji: "🐞" },
    { name: "Ant", emoji: "🐜" },
    { name: "Caterpillar", emoji: "🐛" },
    { name: "Mosquito", emoji: "🦟" }
  ],

  safeItems: [
    { name: "Teddy Bear 🧸", isSafe: true, reason: "Soft and safe to cuddle!" },
    { name: "Storybook 📖", isSafe: true, reason: "Fun and safe to read!" },
    { name: "Toy Ball ⚽", isSafe: true, reason: "Safe to play in the garden!" },
    { name: "Apple 🍎", isSafe: true, reason: "Healthy and safe to eat!" }
  ],

  unsafeItems: [
    { name: "Hot Cup of Tea ☕", isSafe: false, reason: "Danger! Very hot, can burn your hands." },
    { name: "Sharp Knife 🔪", isSafe: false, reason: "Danger! Very sharp, can cut fingers." },
    { name: "Electric Plug Socket 🔌", isSafe: false, reason: "Danger! High electricity, never touch." },
    { name: "Fire & Matches 🔥", isSafe: false, reason: "Danger! Fire can cause serious burns." }
  ],

  daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

  emotions: [
    { emotion: "Happy", emoji: "😊", desc: "Smiling with joy!" },
    { emotion: "Sad", emoji: "😢", desc: "Feeling down or crying." },
    { emotion: "Angry", emoji: "😠", desc: "Feeling cross or upset." },
    { emotion: "Surprised", emoji: "😲", desc: "Wide eyes with wonder!" }
  ]
};

function generateFayraPhonicsQuestion() {
  const item = pickRandom(FAYRA_DB.phonics);
  const sentence = `Which picture starts with the letter sound "${item.letter}" (${item.phonicsHint})?`;
  const correctAns = `${item.emoji} ${item.word}`;
  const distractors = FAYRA_DB.phonics.filter(p => p.letter !== item.letter).slice(0, 3).map(p => `${p.emoji} ${p.word}`);
  const options = shuffle([correctAns, ...distractors]);
  return {
    category: "English Orals • Letter Phonics (Aa - Oo)",
    fr: sentence,
    en: `${item.letter} is for ${item.word}!`,
    audio: sentence,
    options: options,
    correct: options.indexOf(correctAns),
    explanation: `Great job Fayra! Letter "${item.letter}" starts with "${item.word}" (${item.emoji}). ${item.phonicsHint}.`,
    lang: "en-US"
  };
}

function generateFayraMathQuestion() {
  const count = randInt(1, 10);
  const icons = ["🍎", "⭐", "🎈", "🐱", "🐟", "🧁", "🦆", "🌸"];
  const icon = pickRandom(icons);
  const objects = Array(count).fill(icon).join(" ");
  const sentence = `Count the ${icon} objects: ${objects}. How many are there?`;
  const correctAns = `${count} ${icon}`;
  const distractors = [count + 1, count - 1, count + 2].filter(n => n >= 1 && n !== count).slice(0, 3).map(n => `${n} ${icon}`);
  const options = shuffle([correctAns, ...distractors]);
  return {
    category: "Math Magic • Counting 1 to 10",
    fr: sentence,
    en: `Count carefully: 1, 2, 3... up to ${count}!`,
    audio: `Count the objects: How many are there?`,
    options: options,
    correct: options.indexOf(correctAns),
    explanation: `There are ${count} ${icon} objects in the set!`,
    lang: "en-US"
  };
}

function generateFayraAwarenessQuestion() {
  const animal = pickRandom(FAYRA_DB.waterAnimals);
  const sentence = `Which of the following is a WATER ANIMAL that swims in the sea?`;
  const correctAns = `${animal.emoji} ${animal.name}`;
  const landAnimals = ["🐶 Dog", "🐱 Cat", "🦁 Lion", "🐒 Monkey"];
  const options = shuffle([correctAns, ...landAnimals.slice(0, 3)]);
  return {
    category: "General Awareness • Water Animals",
    fr: sentence,
    en: `${animal.name} lives in the water!`,
    audio: sentence,
    options: options,
    correct: options.indexOf(correctAns),
    explanation: `${animal.name} (${animal.emoji}) is a water animal that lives in water.`,
    lang: "en-US"
  };
}

function generateDynamicFayraQuiz(unitKey, count = 5) {
  const list = [];
  for (let i = 0; i < count; i++) {
    if (unitKey === "fayra-phonics") list.push(generateFayraPhonicsQuestion());
    else if (unitKey === "fayra-math") list.push(generateFayraMathQuestion());
    else list.push(generateFayraAwarenessQuestion());
  }
  return list;
}

// =============================================================================
// 7. UNSCRAMBLE & EQUATION BUILDER GAME
// =============================================================================

function generateDynamicMathUnscramblePuzzles(count = 6) {
  const templates = [
    () => {
      const a = randInt(4, 8);
      const b = randInt(2, 6);
      const c = randInt(2, 5);
      const res = (a + b) * c;
      return {
        targetTokens: ["(", String(a), "+", String(b), ")", "×", String(c), "=", String(res)],
        en: `PEMDAS Equation: (${a} + ${b}) × ${c} = ${res}`,
        audio: `Open bracket ${a} plus ${b} close bracket times ${c} equals ${res}`
      };
    },
    () => {
      const a = randInt(7, 15);
      const b = randInt(4, 9);
      const res = a * b;
      return {
        targetTokens: [String(a), "×", String(b), "=", String(res)],
        en: `Multiplication fact: ${a} × ${b} = ${res}`,
        audio: `${a} times ${b} equals ${res}`
      };
    }
  ];
  return shuffle(templates).slice(0, count).map(fn => {
    const p = fn();
    p.scrambledTokens = shuffle([...p.targetTokens]);
    return p;
  });
}

function generateDynamicFrenchUnscramblePuzzles(count = 6) {
  const templates = [
    () => ({
      targetTokens: ["Luc", "se", "réveille", "à", "sept", "heures", "."],
      en: "Luc wakes up at 7 o'clock.",
      audio: "Luc se réveille à sept heures."
    }),
    () => ({
      targetTokens: ["Aezza", "se", "brosse", "les", "dents", "le", "matin", "."],
      en: "Aezza brushes her teeth in the morning.",
      audio: "Aezza se brosse les dents le matin."
    })
  ];
  return shuffle(templates).slice(0, count).map(fn => {
    const p = fn();
    p.scrambledTokens = shuffle([...p.targetTokens]);
    return p;
  });
}

function updateUnscrambleForSubject() {
  const isAezza = AppState.currentUser === "aezza";
  const title = document.getElementById("unscramble-title");
  const desc = document.getElementById("unscramble-desc");

  if (isAezza) {
    const isMath = AppState.currentSubject === "math";
    if (title) title.textContent = isMath ? "Equation & Math Builder 🧩" : "Remets les Mots dans l'Ordre ! 🧩";
    if (desc) desc.textContent = isMath
      ? "Click the numbers, operators, and brackets in the correct mathematical order!"
      : "Clique sur les étiquettes pour construire la phrase française dans le bon ordre grammatical.";

    AppState.unscramblePuzzles = isMath
      ? generateDynamicMathUnscramblePuzzles(6)
      : generateDynamicFrenchUnscramblePuzzles(6);
  } else {
    if (title) title.textContent = "Letter & Word Builder 🎈";
    if (desc) desc.textContent = "Put the letters in order to spell the word or count numbers!";

    const fayraPuzzles = [
      { targetTokens: ["A", "P", "P", "L", "E"], en: "A is for Apple 🍎", audio: "Apple starts with A" },
      { targetTokens: ["B", "A", "L", "L"], en: "B is for Ball ⚽", audio: "Ball starts with B" },
      { targetTokens: ["C", "A", "T"], en: "C is for Cat 🐱", audio: "Cat starts with C" },
      { targetTokens: ["1", "2", "3", "4", "5"], en: "Counting Numbers 1 to 5", audio: "One, Two, Three, Four, Five" }
    ];

    AppState.unscramblePuzzles = shuffle(fayraPuzzles).map(p => ({
      ...p,
      scrambledTokens: shuffle([...p.targetTokens])
    }));
  }

  AppState.unscrambleIndex = 0;
  AppState.assembledTokens = [];
  document.getElementById("unscramble-total").textContent = AppState.unscramblePuzzles.length;
  renderUnscramblePuzzle();
}

function initUnscrambleGame() {
  document.getElementById("btn-reset-words").addEventListener("click", () => {
    sfx.pop();
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-check-unscramble").addEventListener("click", checkUnscrambleAnswer);

  document.getElementById("btn-next-unscramble").addEventListener("click", () => {
    sfx.pop();
    AppState.unscrambleIndex++;
    if (AppState.unscrambleIndex >= AppState.unscramblePuzzles.length) {
      updateUnscrambleForSubject();
      AppState.unscrambleIndex = 0;
    }
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-unscramble-speak").addEventListener("click", () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const puzzle = AppState.unscramblePuzzles[AppState.unscrambleIndex];
    voice.speak(puzzle.audio, AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
  });

  updateUnscrambleForSubject();
}

function renderUnscramblePuzzle() {
  if (!AppState.unscramblePuzzles || AppState.unscramblePuzzles.length === 0) return;
  const puzzle = AppState.unscramblePuzzles[AppState.unscrambleIndex];
  document.getElementById("unscramble-lvl").textContent = AppState.unscrambleIndex + 1;
  document.getElementById("unscramble-english-hint").textContent = `"${puzzle.en}"`;

  const feedback = document.getElementById("unscramble-feedback");
  feedback.classList.remove("show", "correct", "incorrect");

  const dropZone = document.getElementById("word-drop-zone");
  const bankZone = document.getElementById("word-bank-zone");
  dropZone.innerHTML = "";
  bankZone.innerHTML = "";

  const allTokens = puzzle.scrambledTokens.map((text, idx) => ({ id: `token_${idx}`, text }));

  if (AppState.assembledTokens.length === 0) {
    dropZone.innerHTML = `<span class="placeholder-text">Click tiles below to build...</span>`;
  } else {
    AppState.assembledTokens.forEach((tok, pos) => {
      const chip = document.createElement("div");
      chip.className = "word-chip in-drop-zone";
      chip.textContent = tok.text;
      chip.addEventListener("click", () => {
        sfx.pop();
        AppState.assembledTokens.splice(pos, 1);
        renderUnscramblePuzzle();
      });
      dropZone.appendChild(chip);
    });
  }

  const assembledIds = new Set(AppState.assembledTokens.map(t => t.id));
  allTokens.forEach(tok => {
    if (!assembledIds.has(tok.id)) {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.textContent = tok.text;
      chip.addEventListener("click", () => {
        sfx.pop();
        AppState.assembledTokens.push(tok);
        const speed = document.getElementById("audio-speed-select").value;
        voice.speak(tok.text, AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
        renderUnscramblePuzzle();
      });
      bankZone.appendChild(chip);
    }
  });
}

function checkUnscrambleAnswer() {
  const puzzle = AppState.unscramblePuzzles[AppState.unscrambleIndex];
  const targetStr = puzzle.targetTokens.join(" ").replace(/\s+\./g, ".").replace(/\s+,/g, ",").trim();
  const userStr = AppState.assembledTokens.map(t => t.text).join(" ").replace(/\s+\./g, ".").replace(/\s+,/g, ",").trim();

  const feedback = document.getElementById("unscramble-feedback");
  const fbTitle = document.getElementById("unscramble-feedback-title");
  const fbText = document.getElementById("unscramble-feedback-text");
  const fbIcon = document.getElementById("unscramble-feedback-icon");

  if (userStr.toLowerCase() === targetStr.toLowerCase()) {
    sfx.correct();
    confetti.blast();
    addXP(30);

    AppState.unscrambleSolved++;
    saveStateForUser();

    fbIcon.textContent = "🎉";
    fbTitle.textContent = "Perfect! That's 100% correct!";
    fbText.textContent = `Model: "${puzzle.audio}"`;
    feedback.className = "feedback-banner show correct";

    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(puzzle.audio, AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
  } else {
    sfx.incorrect();
    fbIcon.textContent = "🤔";
    fbTitle.textContent = "Almost! Check the order carefully.";
    fbText.textContent = "Tip: Listen to the audio hint above!";
    feedback.className = "feedback-banner show incorrect";
  }
}

// =============================================================================
// 8. MATCHING PAIRS GAME
// =============================================================================

function generateDynamicMatchingPairs(subject, category, count = 5) {
  if (subject === "math") {
    const pairs = [
      { left: "13 × 4", right: "52" },
      { left: "14 × 5", right: "70" },
      { left: "15 × 6", right: "90" },
      { left: "12 × 8", right: "96" },
      { left: "Odd + Odd", right: "Even" }
    ];
    return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
  } else {
    const pairs = [
      { left: "Français (Masc)", right: "Française (Fém)" },
      { left: "Indien (Masc)", right: "Indienne (Fém)" },
      { left: "Paris (Ville)", right: "à Paris" },
      { left: "France (Pays)", right: "en France" },
      { left: "du pain", right: "🥖 pain" }
    ];
    return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
  }
}

function updateMatchingTabsForSubject() {
  const container = document.getElementById("matching-category-tabs-container");
  if (!container) return;

  const isAezza = AppState.currentUser === "aezza";
  container.innerHTML = "";

  const tabs = isAezza ? (
    AppState.currentSubject === "math" ? [
      { key: "tables", label: "✖️ Tables (2-15)" },
      { key: "evenodd", label: "⚡ Even & Odd Rules" }
    ] : [
      { key: "nationalities", label: "👥 Nationalités (Masc ↔ Fem)" },
      { key: "prepositions", label: "🌍 Pays & Prépositions" }
    ]
  ) : [
    { key: "phonics-pairs", label: "🔤 Capital ↔ Small Letters" },
    { key: "shapes-pairs", label: "🔺 Shapes ↔ Names" },
    { key: "water-animals-pairs", label: "🐬 Water Animals ↔ Names" },
    { key: "insects-pairs", label: "🐝 Insects ↔ Names" }
  ];

  AppState.matchingCategory = tabs[0].key;

  tabs.forEach((tab, idx) => {
    const btn = document.createElement("button");
    btn.className = `match-cat-btn ${idx === 0 ? "active" : ""}`;
    btn.textContent = tab.label;
    btn.dataset.matchCat = tab.key;
    btn.addEventListener("click", () => {
      sfx.pop();
      container.querySelectorAll(".match-cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.matchingCategory = tab.key;
      setupMatchingBoard();
    });
    container.appendChild(btn);
  });

  setupMatchingBoard();
}

function setupMatchingBoard() {
  const isAezza = AppState.currentUser === "aezza";
  let pairs = [];

  if (isAezza) {
    pairs = generateDynamicMatchingPairs(AppState.currentSubject, AppState.matchingCategory, 5);
  } else {
    if (AppState.matchingCategory === "phonics-pairs") {
      const sample = shuffle(FAYRA_DB.phonics).slice(0, 5);
      pairs = sample.map((p, idx) => ({ left: `Capital ${p.letter.charAt(0)}`, right: `Small ${p.small} (${p.emoji})`, id: idx + 1 }));
    } else if (AppState.matchingCategory === "shapes-pairs") {
      pairs = FAYRA_DB.shapes.map((s, idx) => ({ left: `${s.emoji} Shape`, right: s.name, id: idx + 1 }));
    } else if (AppState.matchingCategory === "water-animals-pairs") {
      const sample = shuffle(FAYRA_DB.waterAnimals).slice(0, 5);
      pairs = sample.map((a, idx) => ({ left: `${a.emoji} Creature`, right: a.name, id: idx + 1 }));
    } else {
      const sample = shuffle(FAYRA_DB.insects).slice(0, 5);
      pairs = sample.map((i, idx) => ({ left: `${i.emoji} Insect`, right: i.name, id: idx + 1 }));
    }
  }

  AppState.matchingSelected = [];
  AppState.matchedPairsCount = 0;
  AppState.isMatchingBusy = false;

  document.getElementById("match-found-count").textContent = "0";
  document.getElementById("match-total-count").textContent = pairs.length;
  document.getElementById("matching-complete-box").style.display = "none";

  const grid = document.getElementById("matching-grid");
  grid.innerHTML = "";

  const tiles = [];
  pairs.forEach(p => {
    tiles.push({ text: p.left, id: p.id, side: "left" });
    tiles.push({ text: p.right, id: p.id, side: "right" });
  });

  shuffle(tiles).forEach(tileData => {
    const tile = document.createElement("div");
    tile.className = "match-tile";
    tile.textContent = tileData.text;
    tile.dataset.id = tileData.id;

    tile.addEventListener("click", () => handleTileClick(tile, tileData, pairs.length));
    grid.appendChild(tile);
  });
}

function handleTileClick(tileElement, tileData, totalPairs) {
  if (AppState.isMatchingBusy) return;
  if (tileElement.classList.contains("matched") || tileElement.classList.contains("selected")) return;

  sfx.pop();
  const speed = document.getElementById("audio-speed-select").value;
  voice.speak(tileData.text.split("(")[0], AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);

  tileElement.classList.add("selected");
  AppState.matchingSelected.push({ element: tileElement, data: tileData });

  if (AppState.matchingSelected.length === 2) {
    AppState.isMatchingBusy = true;
    const [first, second] = AppState.matchingSelected;

    if (first.data.id === second.data.id && first.data.side !== second.data.side) {
      setTimeout(() => {
        sfx.correct();
        first.element.classList.remove("selected");
        second.element.classList.remove("selected");
        first.element.classList.add("matched");
        second.element.classList.add("matched");
        AppState.matchedPairsCount++;
        document.getElementById("match-found-count").textContent = AppState.matchedPairsCount;
        addXP(15);

        if (AppState.matchedPairsCount === totalPairs) {
          confetti.blast();
          sfx.fanfare();
          document.getElementById("matching-complete-box").style.display = "flex";
        }
        AppState.matchingSelected = [];
        AppState.isMatchingBusy = false;
      }, 300);
    } else {
      setTimeout(() => {
        sfx.incorrect();
        first.element.classList.add("wrong");
        second.element.classList.add("wrong");
        setTimeout(() => {
          first.element.classList.remove("selected", "wrong");
          second.element.classList.remove("selected", "wrong");
          AppState.matchingSelected = [];
          AppState.isMatchingBusy = false;
        }, 500);
      }, 300);
    }
  }
}

function initMatchingGame() {
  document.getElementById("btn-matching-replay-cat").addEventListener("click", () => {
    sfx.pop();
    setupMatchingBoard();
  });

  document.getElementById("btn-match-next-cat").addEventListener("click", () => {
    sfx.pop();
    updateMatchingTabsForSubject();
  });

  updateMatchingTabsForSubject();
}

// =============================================================================
// 9. FLASHCARDS CONTROLLER
// =============================================================================

const STATIC_FLASHCARDS = {
  french: {
    verbes: [
      { emoji: "⏰", fr: "se réveiller", en: "to wake up", tag: "Verbe Pronominal", exampleFr: "Je me réveille à sept heures.", exampleEn: "I wake up at seven o'clock." },
      { emoji: "🛏️", fr: "se lever", en: "to get out of bed", tag: "Verbe Pronominal", exampleFr: "Luc se lève aussitôt.", exampleEn: "Luc gets up right away." },
      { emoji: "🚿", fr: "se doucher", en: "to take a shower", tag: "Verbe Pronominal", exampleFr: "Tu te douches avant l'école.", exampleEn: "You take a shower before school." }
    ],
    conjugaison: [
      { emoji: "🚶", fr: "Aller (Je vais, Tu vas)", en: "To go", tag: "Verbe Irrégulier", exampleFr: "Nous allons à l'école ensemble.", exampleEn: "We go to school together." }
    ],
    nationalites: [
      { emoji: "🇫🇷", fr: "Français / Française", en: "French (Masc / Fem)", tag: "Nationalité", exampleFr: "Paul est français, Sophie est française.", exampleEn: "Paul is French, Sophie is French." }
    ],
    repas: [
      { emoji: "🥞", fr: "Le petit déjeuner", en: "Breakfast", tag: "Vocabulaire Repas", exampleFr: "Au petit déjeuner, je bois du lait.", exampleEn: "For breakfast, I drink milk." }
    ]
  },
  math: {
    pemdas: [
      { emoji: "⚡", fr: "PEMDAS Rule", en: "Order of Operations", tag: "Unit 3 • Operations", exampleFr: "P: Parentheses -> M/D: Multiply/Divide -> A/S: Add/Subtract", exampleEn: "Solve brackets first!" }
    ],
    tables: [
      { emoji: "✖️", fr: "13 Times Table", en: "13, 26, 39, 52, 65, 78, 91, 104, 117, 130", tag: "Unit 5 • Times Tables", exampleFr: "13 × 4 = 52 | 13 × 7 = 91", exampleEn: "13 is 10 + 3." }
    ],
    placevalue: [
      { emoji: "📊", fr: "4-Digit Place Value", en: "Thousands, Hundreds, Tens, Ones", tag: "1.3 • Place Value", exampleFr: "In 6,482: 6000 + 400 + 80 + 2", exampleEn: "Place of 4 is Hundreds." }
    ],
    time: [
      { emoji: "⏰", fr: "Quarter Past / Quarter To", en: ":15 (Quarter Past) & :45 (Quarter To)", tag: "2.1 • Clock Reading", exampleFr: "Quarter past 6 = 6:15", exampleEn: "Quarter = 15 minutes." }
    ]
  }
};

function updateFlashcardTabsForSubject() {
  const container = document.getElementById("flashcard-tabs-container");
  if (!container) return;

  const isAezza = AppState.currentUser === "aezza";
  container.innerHTML = "";

  const tabs = isAezza ? (
    AppState.currentSubject === "math" ? [
      { key: "pemdas", label: "⚡ PEMDAS & Even/Odd" },
      { key: "tables", label: "✖️ Tables 2-15 Trainer" },
      { key: "placevalue", label: "📊 Place Value & Negatives" },
      { key: "time", label: "⏰ Clocks & Conversions" }
    ] : [
      { key: "verbes", label: "⏰ Verbes Pronominaux" },
      { key: "conjugaison", label: "✏️ Conjugaison (Aller, Aimer...)" },
      { key: "nationalites", label: "🌎 Nationalités & Pays" },
      { key: "repas", label: "🍳 Les Repas & Boissons" }
    ]
  ) : [
    { key: "phonics-cards", label: "🔤 Phonics Aa-Oo" },
    { key: "rhymes-cards", label: "🎶 Sing-Along Rhymes" },
    { key: "shapes-cards", label: "🔺 Shapes & Numbers 1-10" },
    { key: "nature-cards", label: "🐬 Water Animals & Insects" }
  ];

  AppState.flashcardCategory = tabs[0].key;
  AppState.flashcardIndex = 0;

  tabs.forEach((tab, idx) => {
    const btn = document.createElement("button");
    btn.className = `fc-tab ${idx === 0 ? "active" : ""}`;
    btn.textContent = tab.label;
    btn.dataset.fccat = tab.key;
    btn.addEventListener("click", () => {
      sfx.pop();
      container.querySelectorAll(".fc-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      AppState.flashcardCategory = tab.key;
      AppState.flashcardIndex = 0;
      document.getElementById("flashcard-element").classList.remove("flipped");
      renderFlashcard();
    });
    container.appendChild(btn);
  });

  renderFlashcard();
}

function renderFlashcard() {
  const isAezza = AppState.currentUser === "aezza";
  let card = null;
  let totalCount = 1;

  if (isAezza) {
    const catList = STATIC_FLASHCARDS[AppState.currentSubject];
    if (!catList || !catList[AppState.flashcardCategory]) return;
    const list = catList[AppState.flashcardCategory];
    totalCount = list.length;
    card = list[AppState.flashcardIndex];
  } else {
    if (AppState.flashcardCategory === "phonics-cards") {
      const p = FAYRA_DB.phonics[AppState.flashcardIndex % FAYRA_DB.phonics.length];
      totalCount = FAYRA_DB.phonics.length;
      card = {
        emoji: p.emoji,
        fr: `Letter ${p.letter}`,
        en: `${p.word} (${p.phonicsHint})`,
        tag: "Phonics Aa - Oo",
        exampleFr: `${p.letter.charAt(0)} is for ${p.word}`,
        exampleEn: p.phonicsHint
      };
    } else if (AppState.flashcardCategory === "rhymes-cards") {
      const r = FAYRA_DB.rhymes[AppState.flashcardIndex % FAYRA_DB.rhymes.length];
      totalCount = FAYRA_DB.rhymes.length;
      card = {
        emoji: r.icon,
        fr: r.title,
        en: "Sing-Along Rhyme",
        tag: "Prep-I Rhymes",
        exampleFr: r.lyrics,
        exampleEn: "Sing aloud with Bunny Bella!"
      };
    } else if (AppState.flashcardCategory === "shapes-cards") {
      const s = FAYRA_DB.shapes[AppState.flashcardIndex % FAYRA_DB.shapes.length];
      totalCount = FAYRA_DB.shapes.length;
      card = {
        emoji: s.emoji,
        fr: s.name,
        en: s.desc,
        tag: "Math Magic • Shapes",
        exampleFr: `This is a ${s.name}`,
        exampleEn: s.desc
      };
    } else {
      const a = FAYRA_DB.waterAnimals[AppState.flashcardIndex % FAYRA_DB.waterAnimals.length];
      totalCount = FAYRA_DB.waterAnimals.length;
      card = {
        emoji: a.emoji,
        fr: a.name,
        en: "Water Animal",
        tag: "General Awareness",
        exampleFr: `${a.name} lives in the sea`,
        exampleEn: "Swims in water"
      };
    }
  }

  if (!card) return;

  document.getElementById("fc-counter").textContent = `${AppState.flashcardIndex + 1} / ${totalCount}`;
  document.getElementById("fc-emoji").textContent = card.emoji;
  document.getElementById("fc-french").textContent = card.fr;
  document.getElementById("fc-english").textContent = card.en;
  document.getElementById("fc-tag").textContent = card.tag;
  document.getElementById("fc-example-fr").textContent = `"${card.exampleFr}"`;
  document.getElementById("fc-example-en").textContent = `"${card.exampleEn}"`;
}

function initFlashcards() {
  const fcElement = document.getElementById("flashcard-element");

  const toggleFlip = (e) => {
    if (e.target.closest(".fc-speaker-btn")) return;
    sfx.pop();
    fcElement.classList.toggle("flipped");
  };

  fcElement.addEventListener("click", toggleFlip);
  document.getElementById("fc-flip-btn").addEventListener("click", toggleFlip);
  document.getElementById("fc-flip-back-btn").addEventListener("click", toggleFlip);

  document.getElementById("btn-fc-prev").addEventListener("click", () => {
    sfx.pop();
    AppState.flashcardIndex = Math.max(0, AppState.flashcardIndex - 1);
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("btn-fc-next").addEventListener("click", () => {
    sfx.pop();
    AppState.flashcardIndex++;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("fc-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const txt = document.getElementById("fc-french").textContent;
    voice.speak(txt, AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
  });

  document.getElementById("fc-example-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const txt = document.getElementById("fc-example-fr").textContent.replace(/"/g, "");
    voice.speak(txt, AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
  });

  updateFlashcardTabsForSubject();
}

// =============================================================================
// 10. MOCK EXAM & ASSESSMENT CONTROLLER
// =============================================================================

function updateMockExamIntroForSubject() {
  const isAezza = AppState.currentUser === "aezza";
  const title = document.getElementById("exam-title-text");
  const desc = document.getElementById("exam-desc-text");
  const badge = document.getElementById("exam-badge-label");

  if (isAezza) {
    const isMath = AppState.currentSubject === "math";
    if (title) title.textContent = isMath ? "Grand Mathematics Mock Exam 📝" : "Grand Examen Blanc de Français 📝";
    if (desc) desc.textContent = isMath
      ? "This 15-question simulated assessment covers Unit 3 (Operations, Estimation, PEMDAS), Unit 5 (Tables 2-15, Factors, Multiples), Place Value, Negative Numbers, and Time!"
      : "Cet examen simule ton contrôle de mi-trimestre ! Il couvre les 3 chapitres, les verbes pronominaux, la conjugaison, les nationalités, les prépositions et les articles partitifs.";
    if (badge) badge.textContent = isMath ? "🎯 Grade 3 Summative Assessment 1 Simulation" : "🎯 Évaluation Complète de Mi-Trimestre";
  } else {
    if (title) title.textContent = "Fayra's Prep-I Summative Assessment 🎈";
    if (desc) desc.textContent = "10 Fun Questions covering Phonics Aa-Oo, Sing-Along Rhymes, Shapes, Counting 1-10, Water Animals, and Safe vs Unsafe Touch!";
    if (badge) badge.textContent = "🎯 Little Wings Prep-I SA-1 (Baldwin International School)";
  }
}

function initMockExam() {
  document.getElementById("btn-start-mock-exam").addEventListener("click", () => {
    sfx.pop();
    startMockExam();
  });

  document.getElementById("btn-review-exam").addEventListener("click", () => {
    sfx.pop();
    startMockExam();
  });

  document.getElementById("btn-exam-to-home").addEventListener("click", () => {
    sfx.pop();
    document.getElementById("exam-intro-card").style.display = "flex";
    document.getElementById("exam-results-card").style.display = "none";
    showView("view-adventure");
  });
}

function startMockExam() {
  const isAezza = AppState.currentUser === "aezza";
  if (isAezza) {
    const isMath = AppState.currentSubject === "math";
    AppState.currentQuiz = isMath ? generateDynamicMathMockExam(15) : [
      generateFrenchCh1Question(), generateFrenchCh1Question(), generateFrenchCh1Question(), generateFrenchCh1Question(),
      generateFrenchCh2Question(), generateFrenchCh2Question(), generateFrenchCh2Question(), generateFrenchCh2Question(),
      generateFrenchCh3Question(), generateFrenchCh3Question(), generateFrenchCh3Question(), generateFrenchCh3Question(),
      generateFrenchCh4Question(), generateFrenchCh4Question(), generateFrenchCh4Question()
    ];
  } else {
    AppState.currentQuiz = [
      generateFayraPhonicsQuestion(), generateFayraPhonicsQuestion(), generateFayraPhonicsQuestion(),
      generateFayraMathQuestion(), generateFayraMathQuestion(), generateFayraMathQuestion(),
      generateFayraAwarenessQuestion(), generateFayraAwarenessQuestion(), generateFayraAwarenessQuestion(),
      generateFayraPhonicsQuestion()
    ];
  }

  AppState.currentQuizKey = isAezza ? "aezza-mock-exam" : "fayra-mock-exam";
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = true;

  document.getElementById("quiz-topic-title").textContent = isAezza ? "Summative Assessment 1 Exam 📝" : "Prep-I Mock Assessment 🎈";
  document.getElementById("exam-intro-card").style.display = "none";
  document.getElementById("exam-results-card").style.display = "none";

  showView("view-quiz");
  renderQuizQuestion();
}

function showExamResults() {
  showView("view-mock-exam");
  document.getElementById("exam-intro-card").style.display = "none";
  const resultsCard = document.getElementById("exam-results-card");
  resultsCard.style.display = "flex";

  const finalScore = AppState.quizScore;
  document.getElementById("exam-final-score").textContent = finalScore;

  const title = document.getElementById("exam-grade-title");
  const msg = document.getElementById("exam-grade-msg");

  sfx.fanfare();
  confetti.blast();
  addXP(100);

  const isAezza = AppState.currentUser === "aezza";
  if (finalScore >= (isAezza ? 13 : 8)) {
    title.textContent = `Outstanding! Star Performer ${isAezza ? "Aezza" : "Fayra"}! 🌟👑`;
    msg.textContent = "You are ready to get 100% on your school mid-term exam!";
  } else {
    title.textContent = "Great Job! Keep practicing! 💪";
    msg.textContent = "Review each topic in Adventure Mode to prepare for the test!";
  }

  const reviewBox = document.getElementById("exam-review-box");
  reviewBox.innerHTML = `<h3 style='margin-bottom:8px;'>Question Breakdown & Explanations:</h3>`;

  AppState.quizAnswersHistory.forEach((hist, i) => {
    const item = document.createElement("div");
    item.className = `review-item ${hist.isCorrect ? "pass" : "fail"}`;
    item.innerHTML = `
      <div class="review-q">Question ${i + 1}: ${hist.question}</div>
      <div class="review-ans">Your answer: <strong>${hist.chosen}</strong> ${hist.isCorrect ? "✅" : "❌"}</div>
      ${!hist.isCorrect ? `<div class="review-correct">✅ Correct answer: <strong>${hist.correctAnswer}</strong></div>` : ""}
      <div class="review-exp-row" style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:4px;">
        <div style="font-size:13px; color:#5e4f71; font-style:italic; flex:1;">💡 ${hist.explanation}</div>
        <button class="audio-btn-mini review-speak-btn" style="padding:4px 10px; font-size:11px;" title="Listen to explanation">
          🔊 Hear Explanation
        </button>
      </div>
    `;

    const speakBtn = item.querySelector(".review-speak-btn");
    if (speakBtn) {
      speakBtn.onclick = () => {
        sfx.pop();
        const curSpeed = document.getElementById("audio-speed-select").value;
        const msgText = `For question ${i + 1}: The correct answer is ${hist.correctAnswer}. ${hist.explanation}`;
        voice.speak(msgText, isAezza && AppState.currentSubject === "french" ? "fr-FR" : "en-US", curSpeed);
      };
    }

    reviewBox.appendChild(item);
  });
}

// =============================================================================
// 11. TROPHIES VIEW CONTROLLER (PER STUDENT)
// =============================================================================

function renderTrophiesView() {
  const container = document.getElementById("trophies-content-container");
  const headline = document.getElementById("trophies-headline");
  if (!container) return;

  const isAezza = AppState.currentUser === "aezza";
  if (headline) headline.textContent = isAezza ? "Aezza's Trophy Hall of Fame 🏆" : "Fayra's Star Trophy Room 🎈🏆";

  container.innerHTML = "";

  if (isAezza) {
    container.innerHTML = `
      <div class="trophy-section-heading">🇫🇷 French Quest Badges</div>
      <div class="trophies-grid">
        <div class="trophy-card unlocked"><div class="trophy-icon">🇫🇷</div><h3 class="trophy-name">Petit Parisien</h3><p class="trophy-desc">Chapter 1 (Luc's Routine).</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🌍</div><h3 class="trophy-name">Explorateur du Monde</h3><p class="trophy-desc">Chapter 2 (Places & Nationalities).</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🥐</div><h3 class="trophy-name">Chef Pâtissier</h3><p class="trophy-desc">Chapter 3 (Meals & Partitives).</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🎨</div><h3 class="trophy-name">Maître des Verbes</h3><p class="trophy-desc">Conjugation & Hobbies.</p><span class="trophy-status">Unlocked ✨</span></div>
      </div>

      <div class="trophy-section-heading" style="margin-top:24px;">🔢 Mathematics Quest Badges (Grade 3 SA-1)</div>
      <div class="trophies-grid">
        <div class="trophy-card unlocked"><div class="trophy-icon">➕</div><h3 class="trophy-name">Calculation Wizard</h3><p class="trophy-desc">Addition, Subtraction & Estimation.</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">⚡</div><h3 class="trophy-name">PEMDAS Guru</h3><p class="trophy-desc">Order of Operations master.</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">✖️</div><h3 class="trophy-name">Tables Ace (2-15)</h3><p class="trophy-desc">Times tables up to 15.</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">📊</div><h3 class="trophy-name">Place Value Master</h3><p class="trophy-desc">4-Digit numbers & Negatives.</p><span class="trophy-status">Unlocked ✨</span></div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="trophy-section-heading">🔤 English Phonics & Rhymes Badges</div>
      <div class="trophies-grid">
        <div class="trophy-card unlocked"><div class="trophy-icon">🔤</div><h3 class="trophy-name">Alphabet Star</h3><p class="trophy-desc">Mastered Letter Sounds Aa to Oo!</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🎶</div><h3 class="trophy-name">Rhyme Singer</h3><p class="trophy-desc">Sang all 4 preschool rhymes with Bunny Bella!</p><span class="trophy-status">Unlocked ✨</span></div>
      </div>

      <div class="trophy-section-heading" style="margin-top:24px;">🔢 Math Magic & Shapes Badges</div>
      <div class="trophies-grid">
        <div class="trophy-card unlocked"><div class="trophy-icon">🔢</div><h3 class="trophy-name">Counting Champion</h3><p class="trophy-desc">Counted objects 1 to 10 with ease!</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🔺</div><h3 class="trophy-name">Shape Explorer</h3><p class="trophy-desc">Identified Circle, Square, Triangle, Rectangle & Oval!</p><span class="trophy-status">Unlocked ✨</span></div>
      </div>

      <div class="trophy-section-heading" style="margin-top:24px;">🌍 General Awareness Badges</div>
      <div class="trophies-grid">
        <div class="trophy-card unlocked"><div class="trophy-icon">🐬</div><h3 class="trophy-name">Ocean & Insect Friend</h3><p class="trophy-desc">Knows water animals and tiny insects!</p><span class="trophy-status">Unlocked ✨</span></div>
        <div class="trophy-card unlocked"><div class="trophy-icon">🛑</div><h3 class="trophy-name">Safety Hero</h3><p class="trophy-desc">Knows safe toys vs dangerous hot things!</p><span class="trophy-status">Unlocked ✨</span></div>
      </div>
    `;
  }
}

// =============================================================================
// 12. INITIALIZATION & NAVIGATION
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  AuthController.init();
  initNavigation();
  initMascot();
  initQuizListeners();
  initUnscrambleGame();
  initMatchingGame();
  initFlashcards();
  initMockExam();
});

function initNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!AuthController.isLoggedIn) return;
      sfx.pop();
      const tabName = btn.dataset.tab;
      showView(`view-${tabName}`);
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function showView(viewId) {
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");
}

function initMascot() {
  const voiceBtn = document.getElementById("mascot-voice-btn");
  const mascotText = document.getElementById("mascot-text");
  const mascotBox = document.getElementById("mascot-click-target");

  const speakMascot = () => {
    sfx.correct();
    confetti.blast();
    const isAezza = AppState.currentUser === "aezza";
    let quote = "";

    if (isAezza) {
      const isMath = AppState.currentSubject === "math";
      quote = isMath
        ? pickRandom([
            "Remember: Parentheses come first in PEMDAS!",
            "Odd + Odd is always Even, and Odd × Odd is always Odd!",
            "Multiples of 12: 12, 24, 36, 48, 60, 72!",
            "Quarter past 4 means 4:15. You are doing amazing Aezza! 🌟"
          ])
        : pickRandom([
            "Bravo Aezza ! N'oublie pas : 'Je me lève', 'Tu te lèves' !",
            "Pour les repas : 'du pain', 'de la confiture', 'de l'eau' !",
            "Tu es prête pour avoir 20/20 à ton examen de français ! 🌟"
          ]);
    } else {
      quote = pickRandom([
        "A is for Apple 🍎! B is for Ball ⚽! You are so smart Fayra!",
        "Mary had a little lamb, its fleece was white as snow! 🐑",
        "A circle is round like a ball 🔴!",
        "Dolphin 🐬 and fish 🐟 love swimming in the blue sea!",
        "You are going to be the star of Prep-I Fayra! 🎈🌟"
      ]);
    }

    if (mascotText) mascotText.textContent = `"${quote}"`;
    const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
    voice.speak(quote, isAezza && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
  };

  if (voiceBtn && mascotText) {
    voiceBtn.addEventListener("click", () => {
      sfx.pop();
      const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
      voice.speak(mascotText.textContent.replace(/"/g, ""), AppState.currentUser === "aezza" && AppState.currentSubject === "french" ? "fr-FR" : "en-US", speed);
    });
  }

  if (mascotBox) mascotBox.addEventListener("click", speakMascot);
}

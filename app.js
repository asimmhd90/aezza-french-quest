/**
 * Aezza's Learning Quest - Unified Interactive Learning Engine
 * Subjects: 
 *   1. 🇫🇷 French Quest (La Vie de Luc, Le Monde Multiculturel, La Nourriture, Conjugaison & Loisirs)
 *   2. 🔢 Mathematics Quest (Grade 3 SA-1: Addition/Subtraction, Estimation, PEMDAS, Tables 2-15, Factors/Multiples, Place Value, Negative Numbers, Time)
 * Built with Google Stitch Design System ("L'Aventure Pétillante")
 */

// =============================================================================
// 1. FAMILY AUTHENTICATION CONTROLLER (PIN / PASSWORD)
// =============================================================================

const AuthController = {
  isLoggedIn: false,

  // Recognized Family Passcodes (case-insensitive)
  validPasscodes: [
    "1234",
    "aezza",
    "aezza2026",
    "french2026",
    "math2026",
    "papa",
    "asim",
    "secret",
    "quest",
    "aezzaquest",
    "2026"
  ],

  init() {
    this.checkAuth();
    this.bindEvents();
  },

  checkAuth() {
    try {
      const isAuth = localStorage.getItem("aezza_family_auth");
      if (isAuth === "true") {
        this.isLoggedIn = true;
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

  renderAuthenticatedUI() {
    const mainNav = document.getElementById("main-nav");
    const mascotBar = document.getElementById("mascot-bar");
    const authStats = document.getElementById("header-authenticated-stats");
    const profilePill = document.getElementById("github-profile-pill");
    const displayName = document.getElementById("display-user-name");
    const subjSwitcher = document.getElementById("subject-switcher-container");

    if (mainNav) mainNav.style.display = "flex";
    if (mascotBar) mascotBar.style.display = "flex";
    if (authStats) authStats.style.display = "flex";
    if (profilePill) profilePill.style.display = "flex";
    if (subjSwitcher) subjSwitcher.style.display = "flex";
    if (displayName) displayName.textContent = "Aezza 🌟";

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
    if (displayName) displayName.textContent = "Accès Protégé 🔒";

    showView("view-login");
  },

  bindEvents() {
    const loginForm = document.getElementById("family-login-form");
    const logoutBtn = document.getElementById("btn-logout");

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sfx.pop();
        this.handleLoginSubmit();
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sfx.pop();
        this.logout();
      });
    }
  },

  handleLoginSubmit() {
    const errBanner = document.getElementById("login-error-banner");
    const errText = document.getElementById("login-error-text");
    const passwordInput = document.getElementById("family-password");
    const entered = passwordInput ? passwordInput.value.trim().toLowerCase() : "";

    if (errBanner) errBanner.style.display = "none";

    const customPin = localStorage.getItem("aezza_custom_family_pin");
    const isCustomMatch = customPin && entered === customPin.toLowerCase();

    if (this.validPasscodes.includes(entered) || isCustomMatch) {
      localStorage.setItem("aezza_family_auth", "true");
      sfx.correct();
      confetti.blast();
      showToast("🎉", "Bienvenue Aezza ! L'aventure est déverrouillée 🚀");
      this.checkAuth();
    } else {
      sfx.incorrect();
      if (errText) errText.textContent = "Mot de passe incorrect. Réessayez avec votre code familial (ex: 1234 ou aezza2026).";
      if (errBanner) errBanner.style.display = "flex";
      if (passwordInput) {
        passwordInput.value = "";
        passwordInput.focus();
      }
    }
  },

  logout() {
    localStorage.removeItem("aezza_family_auth");
    showToast("🔒", "Application verrouillée.");
    this.checkAuth();
  }
};

// =============================================================================
// 2. GENERAL HELPERS
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

// =============================================================================
// 3. FRENCH GRAMMAR DATA & GENERATORS (FRENCH QUEST)
// =============================================================================

const FRENCH_DB = {
  subjects: {
    firstSing: { text: "Je", pron: "me", pronVowel: "m'", endingEr: "e", aller: "vais", aimer: "J'aime", prefNeg: "Je n'aime pas" },
    secondSing: { text: "Tu", pron: "te", pronVowel: "t'", endingEr: "es", aller: "vas", aimer: "Tu aimes", prefNeg: "Tu n'aimes pas" },
    thirdSingMasc: [
      { text: "Luc", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Luc aime", prefNeg: "Luc n'aime pas" },
      { text: "Paul", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Paul aime", prefNeg: "Paul n'aime pas" },
      { text: "Il", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Il aime", prefNeg: "Il n'aime pas" },
      { text: "Mon frère", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Mon frère aime", prefNeg: "Mon frère n'aime pas" }
    ],
    thirdSingFem: [
      { text: "Aezza", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Aezza aime", prefNeg: "Aezza n'aime pas" },
      { text: "Marie", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Marie aime", prefNeg: "Marie n'aime pas" },
      { text: "Elle", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Elle aime", prefNeg: "Elle n'aime pas" }
    ],
    firstPlur: { text: "Nous", pron: "nous", pronVowel: "nous", endingEr: "ons", aller: "allons", aimer: "Nous aimons", prefNeg: "Nous n'aimons pas" },
    secondPlur: { text: "Vous", pron: "vous", pronVowel: "vous", endingEr: "ez", aller: "allez", aimer: "Vous aimez", prefNeg: "Vous n'aimez pas" },
    thirdPlurMasc: [
      { text: "Ils", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Ils aiment", prefNeg: "Ils n'aiment pas" },
      { text: "Les enfants", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Les enfants aiment", prefNeg: "Les enfants n'aiment pas" }
    ],
    thirdPlurFem: [
      { text: "Elles", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Elles aiment", prefNeg: "Elles n'aiment pas" }
    ]
  },

  reflexiveVerbs: [
    { infinitive: "se réveiller", root: "réveill", meaning: "to wake up", startsVowel: false, times: ["à sept heures du matin", "à 6h30", "tôt le matin", "à huit heures"] },
    { infinitive: "se lever", root: "lèv", rootPlur: "lev", meaning: "to get out of bed", startsVowel: false, times: ["rapidement", "aussitôt", "à 7 heures", "avec le sourire"] },
    { infinitive: "se doucher", root: "douch", meaning: "to take a shower", startsVowel: false, times: ["dans la salle de bain", "avant l'école", "le matin"] },
    { infinitive: "se brosser les dents", root: "bross", suffix: "les dents", meaning: "to brush teeth", startsVowel: false, times: ["après le petit déjeuner", "avant d'aller au lit"] },
    { infinitive: "s'habiller", root: "habill", meaning: "to get dressed", startsVowel: true, times: ["pour aller à l'école", "dans sa chambre", "rapidement"] },
    { infinitive: "se coucher", root: "couch", meaning: "to go to bed", startsVowel: false, times: ["à vingt et une heures", "le soir à 20h30", "après le dîner"] }
  ],

  places: [
    { name: "France", type: "country-fem", prep: "en", mascNat: "français", femNat: "française", mascPlurNat: "français", femPlurNat: "françaises" },
    { name: "Inde", type: "country-vowel", prep: "en", mascNat: "indien", femNat: "indienne", mascPlurNat: "indiens", femPlurNat: "indiennes" },
    { name: "Italie", type: "country-vowel", prep: "en", mascNat: "italien", femNat: "italienne", mascPlurNat: "italiens", femPlurNat: "italiennes" },
    { name: "Espagne", type: "country-vowel", prep: "en", mascNat: "espagnol", femNat: "espagnole", mascPlurNat: "espagnols", femPlurNat: "espagnoles" },
    { name: "Canada", type: "country-masc", prep: "au", mascNat: "canadien", femNat: "canadienne", mascPlurNat: "canadiens", femPlurNat: "canadiennes" },
    { name: "Japon", type: "country-masc", prep: "au", mascNat: "japonais", femNat: "japonaise", mascPlurNat: "japonais", femPlurNat: "japonaises" },
    { name: "États-Unis", type: "country-plur", prep: "aux", mascNat: "américain", femNat: "américaine", mascPlurNat: "américains", femPlurNat: "américaines" },
    { name: "Paris", type: "city", prep: "à" },
    { name: "Lyon", type: "city", prep: "à" },
    { name: "Delhi", type: "city", prep: "à" },
    { name: "Rome", type: "city", prep: "à" }
  ],

  food: {
    masculine: [
      { name: "pain", en: "bread", emoji: "🥖" },
      { name: "croissant", en: "croissant", emoji: "🥐" },
      { name: "fromage", en: "cheese", emoji: "🧀" },
      { name: "beurre", en: "butter", emoji: "🧈" },
      { name: "poulet", en: "chicken", emoji: "🍗" },
      { name: "lait", en: "milk", emoji: "🥛" }
    ],
    feminine: [
      { name: "confiture", en: "jam", emoji: "🍓" },
      { name: "salade", en: "salad", emoji: "🥗" },
      { name: "soupe", en: "soup", emoji: "🍲" },
      { name: "viande", en: "meat", emoji: "🥩" },
      { name: "pizza", en: "pizza", emoji: "🍕" }
    ],
    vowel: [
      { name: "eau fraîche", en: "fresh water", emoji: "💧" },
      { name: "orangeade", en: "orange soda", emoji: "🥤" }
    ],
    plural: [
      { name: "fruits", en: "fruits", emoji: "🍎" },
      { name: "légumes", en: "vegetables", emoji: "🥦" },
      { name: "croissants chauds", en: "warm croissants", emoji: "🥐" }
    ]
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
  const qType = pickRandom(["pronoun", "conjugation", "negative"]);

  let root = verb.root;
  if (subj.text === "Nous" && verb.rootPlur) root = verb.rootPlur;
  if (subj.text === "Vous" && verb.rootPlur) root = verb.rootPlur;
  const conjVerb = root + subj.endingEr;
  const pron = verb.startsVowel ? subj.pronVowel : subj.pron;

  if (qType === "pronoun") {
    const isVowel = verb.startsVowel;
    const correctPron = isVowel ? subj.pronVowel : subj.pron;
    const sentence = `${subj.text} ______ ${conjVerb} ${verb.suffix || ""} ${time}.`;
    const fullAudio = `${subj.text} ${correctPron} ${conjVerb} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const distractors = ["me", "te", "se", "nous", "vous"].filter(p => p !== subj.pron).slice(0, 3);
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
  } else if (qType === "conjugation") {
    const sentence = `${subj.text} ${pron} ______ ${verb.suffix || ""} ${time}. (${verb.infinitive})`;
    const fullAudio = `${subj.text} ${pron} ${conjVerb} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const endings = ["e", "es", "ons", "ez", "ent"].filter(e => e !== subj.endingEr);
    const distractors = endings.slice(0, 3).map(e => verb.root + e);
    const options = shuffle([conjVerb, ...distractors]);
    return {
      category: "Conjugaison • Présent",
      fr: sentence,
      en: `${subj.text} (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(conjVerb),
      explanation: `Avec "${subj.text}", le verbe "${verb.infinitive}" se termine par -${subj.endingEr} -> "${conjVerb}".`,
      lang: "fr-FR"
    };
  } else {
    const sentence = `${subj.text} ne ______ pas ${verb.suffix || ""} ${time}.`;
    const correctAns = `${pron} ${conjVerb}`;
    const fullAudio = `${subj.text} ne ${pron} ${conjVerb} pas ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const options = shuffle([correctAns, `se ${verb.root}e`, `${pron} ${verb.infinitive}`, `me ${verb.root}ons`]);
    return {
      category: "Négation • Verbes Pronominaux",
      fr: sentence,
      en: `${subj.text} does not (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctAns),
      explanation: `Forme négative : "ne + [pronom réfléchi + verbe] + pas" -> "${correctAns}".`,
      lang: "fr-FR"
    };
  }
}

function generateFrenchCh2Question() {
  const qType = pickRandom(["prep", "nationality"]);
  const countries = FRENCH_DB.places.filter(p => p.type.startsWith("country"));
  const cities = FRENCH_DB.places.filter(p => p.type === "city");

  if (qType === "prep") {
    const isCity = Math.random() > 0.5;
    const place = isCity ? pickRandom(cities) : pickRandom(countries);
    const person = pickRandom(["Luc", "Aezza", "Paul", "Marie"]);
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
  } else {
    const country = pickRandom(countries.filter(c => c.mascNat && c.femNat));
    const isFem = Math.random() > 0.5;
    const person = isFem ? pickRandom(["Marie", "Aezza", "Elle"]) : pickRandom(["Luc", "Paul", "Il"]);
    const correctNat = isFem ? country.femNat : country.mascNat;
    const sentence = `${person} habite ${country.prep} ${country.name}, ${isFem ? "elle" : "il"} est ______ .`;
    const fullAudio = `${person} habite ${country.prep} ${country.name}, ${isFem ? "elle" : "il"} est ${correctNat}.`;
    const distractors = [isFem ? country.mascNat : country.femNat, country.mascPlurNat, country.name.toLowerCase()].filter(d => d !== correctNat);
    const options = shuffle([correctNat, ...distractors.slice(0, 3)]);
    return {
      category: "Accord des Nationalités",
      fr: sentence,
      en: `${person} lives in ${country.name}, ${isFem ? "she" : "he"} is ${correctNat}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctNat),
      explanation: `${person} est ${isFem ? "féminin -> " + country.femNat : "masculin -> " + country.mascNat}.`,
      lang: "fr-FR"
    };
  }
}

function generateFrenchCh3Question() {
  const itemType = pickRandom(["masculine", "feminine", "vowel", "plural"]);
  let item, correctArticle;
  if (itemType === "masculine") {
    item = pickRandom(FRENCH_DB.food.masculine);
    correctArticle = "du";
  } else if (itemType === "feminine") {
    item = pickRandom(FRENCH_DB.food.feminine);
    correctArticle = "de la";
  } else if (itemType === "vowel") {
    item = pickRandom(FRENCH_DB.food.vowel);
    correctArticle = "de l'";
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
  const qType = pickRandom(["aller", "aimer", "habiter"]);
  const subj = getRandomFrenchSubject();

  if (qType === "aller") {
    const place = pickRandom(["à l'école", "au parc", "à Paris", "au cinéma"]);
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
  } else {
    const hobby = pickRandom(["jouer au football", "écouter de la musique", "dessiner"]);
    const sentence = `Pendant mes loisirs, j'aime ______ .`;
    const fullAudio = `Pendant mes loisirs, j'aime ${hobby}.`;
    const options = shuffle([hobby, hobby.replace(/er\b/, "e"), hobby.replace(/er\b/, "ons"), "joue"]);
    return {
      category: "Mes Loisirs • Verbe à l'infinitif",
      fr: sentence,
      en: `During my free time, I like to (${hobby}).`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(hobby),
      explanation: `Après le verbe "aimer", le second verbe reste à l'infinitif : "${hobby}".`,
      lang: "fr-FR"
    };
  }
}

// =============================================================================
// 4. MATHEMATICS SYLLABUS DATA & PROCEDURAL GENERATORS (GRADE 3 SA-1)
// =============================================================================

// Unit 1: Addition, Subtraction, Estimation & PEMDAS & Even/Odd Generalizations
function generateMathUnit1Question() {
  const qType = pickRandom(["estimation-add", "estimation-sub", "even-odd-rule", "even-odd-identify", "pemdas-simple", "pemdas-parentheses"]);

  if (qType === "estimation-add") {
    const a = randInt(120, 580);
    const b = randInt(110, 390);
    const roundA = Math.round(a / 100) * 100;
    const roundB = Math.round(b / 100) * 100;
    const estSum = roundA + roundB;
    const sentence = `Estimate the sum of ${a} + ${b} by rounding each number to the nearest 100.`;
    const explanation = `${a} rounds to ${roundA}, and ${b} rounds to ${roundB}. So estimated sum is ${roundA} + ${roundB} = ${estSum}.`;
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
  } else if (qType === "estimation-sub") {
    const a = randInt(45, 95);
    const b = randInt(15, 40);
    const roundA = Math.round(a / 10) * 10;
    const roundB = Math.round(b / 10) * 10;
    const estDiff = roundA - roundB;
    const sentence = `Estimate the difference of ${a} - ${b} by rounding to the nearest 10.`;
    const explanation = `${a} rounds to ${roundA}, ${b} rounds to ${roundB}. ${roundA} - ${roundB} = ${estDiff}.`;
    const distractors = [estDiff + 10, estDiff - 10, estDiff + 20].filter(d => d !== estDiff);
    const options = shuffle([String(estDiff), ...distractors.map(String)]);
    return {
      category: "Unit 3 • Estimation & Rounding (Nearest 10)",
      fr: sentence,
      en: `Round each number to nearest 10: ${roundA} - ${roundB}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(estDiff)),
      explanation: explanation,
      lang: "en-US"
    };
  } else if (qType === "even-odd-rule") {
    const rules = [
      { text: "Odd + Odd is ALWAYS...", ans: "Even", exp: "Example: 3 + 5 = 8 (Even). Odd + Odd is always Even!" },
      { text: "Even + Even is ALWAYS...", ans: "Even", exp: "Example: 4 + 6 = 10 (Even). Even + Even is always Even!" },
      { text: "Odd + Even is ALWAYS...", ans: "Odd", exp: "Example: 7 + 4 = 11 (Odd). Odd + Even is always Odd!" },
      { text: "Odd × Odd is ALWAYS...", ans: "Odd", exp: "Example: 3 × 5 = 15 (Odd). Odd × Odd is always Odd!" },
      { text: "Even × Even is ALWAYS...", ans: "Even", exp: "Example: 4 × 6 = 24 (Even). Even × Even is always Even!" },
      { text: "Odd × Even is ALWAYS...", ans: "Even", exp: "Example: 3 × 4 = 12 (Even). Odd × Even is always Even!" }
    ];
    const picked = pickRandom(rules);
    const sentence = `Generalization Rule: ${picked.text}`;
    const options = shuffle(["Even", "Odd", "Sometimes Even, Sometimes Odd", "Zero"]);
    return {
      category: "Unit 3 • Even & Odd Number Generalizations",
      fr: sentence,
      en: picked.exp,
      audio: sentence,
      options: options,
      correct: options.indexOf(picked.ans),
      explanation: picked.exp,
      lang: "en-US"
    };
  } else if (qType === "even-odd-identify") {
    const isLookingForEven = Math.random() > 0.5;
    let targetNum, distractors;
    if (isLookingForEven) {
      targetNum = pickRandom([248, 512, 630, 894, 726, 402]);
      distractors = [247, 513, 631, 895, 729];
    } else {
      targetNum = pickRandom([315, 679, 441, 823, 907, 555]);
      distractors = [314, 678, 442, 824, 908];
    }
    const sentence = `Which of the following numbers is ${isLookingForEven ? "EVEN" : "ODD"}?`;
    const options = shuffle([String(targetNum), ...distractors.slice(0, 3).map(String)]);
    return {
      category: "Unit 3 • Even vs Odd Identification",
      fr: sentence,
      en: isLookingForEven ? "Even numbers end in 0, 2, 4, 6, 8." : "Odd numbers end in 1, 3, 5, 7, 9.",
      audio: sentence,
      options: options,
      correct: options.indexOf(String(targetNum)),
      explanation: `${targetNum} ends in ${String(targetNum).slice(-1)}, making it ${isLookingForEven ? "Even" : "Odd"}.`,
      lang: "en-US"
    };
  } else if (qType === "pemdas-simple") {
    // Multiplication before Addition: a + b * c
    const a = randInt(4, 15);
    const b = randInt(2, 6);
    const c = randInt(3, 7);
    const ans = a + b * c;
    const wrongLeftToRight = (a + b) * c;
    const sentence = `Evaluate using PEMDAS: ${a} + ${b} × ${c} = ?`;
    const explanation = `Using PEMDAS (Order of Operations), perform multiplication first: ${b} × ${c} = ${b * c}. Then add: ${a} + ${b * c} = ${ans}.`;
    const distractors = [wrongLeftToRight, ans + 2, ans - 4].filter(d => d !== ans);
    const options = shuffle([String(ans), ...distractors.slice(0, 3).map(String)]);
    return {
      category: "Unit 3 • Order of Operations (PEMDAS)",
      fr: sentence,
      en: `Multiplication comes before addition!`,
      audio: `Evaluate using PEMDAS: ${a} plus ${b} times ${c}`,
      options: options,
      correct: options.indexOf(String(ans)),
      explanation: explanation,
      lang: "en-US"
    };
  } else {
    // Parentheses first: (a + b) * c
    const a = randInt(2, 8);
    const b = randInt(2, 6);
    const c = randInt(2, 5);
    const ans = (a + b) * c;
    const sentence = `Evaluate using PEMDAS: (${a} + ${b}) × ${c} = ?`;
    const explanation = `Parentheses are solved first: (${a} + ${b}) = ${a + b}. Then multiply by ${c}: ${a + b} × ${c} = ${ans}.`;
    const distractors = [a + b * c, ans + 4, ans - 3].filter(d => d !== ans);
    const options = shuffle([String(ans), ...distractors.slice(0, 3).map(String)]);
    return {
      category: "Unit 3 • Order of Operations with Parentheses",
      fr: sentence,
      en: `Solve the brackets first!`,
      audio: `Evaluate using PEMDAS: Open bracket ${a} plus ${b} close bracket times ${c}`,
      options: options,
      correct: options.indexOf(String(ans)),
      explanation: explanation,
      lang: "en-US"
    };
  }
}

// Unit 2: Multiplication, Multiples & Factors (Tables 2-15)
function generateMathUnit2Question() {
  const qType = pickRandom(["tables-drill", "multiple-check", "common-multiple", "factor-check", "word-problem-mult"]);

  if (qType === "tables-drill") {
    const a = randInt(6, 15);
    const b = randInt(3, 12);
    const product = a * b;
    const sentence = `What is ${a} × ${b} = ?`;
    const explanation = `${a} multiplied by ${b} is equal to ${product}.`;
    const distractors = [product + a, product - b, product + 10, product - a].filter(d => d !== product);
    const options = shuffle([String(product), ...distractors.slice(0, 3).map(String)]);
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
  } else if (qType === "multiple-check") {
    const base = randInt(4, 14);
    const multIndex = randInt(3, 9);
    const targetMultiple = base * multIndex;
    const sentence = `Which of the following is a MULTIPLE of ${base}?`;
    const nonMultiples = [targetMultiple + 1, targetMultiple - 2, targetMultiple + 3, targetMultiple - 1].filter(n => n % base !== 0);
    const options = shuffle([String(targetMultiple), ...nonMultiples.slice(0, 3).map(String)]);
    return {
      category: "Unit 5 • Multiples",
      fr: sentence,
      en: `Multiples of ${base} are in the ${base} times table: ${base}, ${base*2}, ${base*3}...`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(targetMultiple)),
      explanation: `${targetMultiple} is a multiple of ${base} because ${base} × ${multIndex} = ${targetMultiple}.`,
      lang: "en-US"
    };
  } else if (qType === "common-multiple") {
    const pairs = [
      { a: 3, b: 4, lcm: 12, common: 24 },
      { a: 4, b: 6, lcm: 12, common: 24 },
      { a: 3, b: 5, lcm: 15, common: 30 },
      { a: 6, b: 8, lcm: 24, common: 48 },
      { a: 2, b: 7, lcm: 14, common: 28 }
    ];
    const p = pickRandom(pairs);
    const sentence = `Which number is a COMMON MULTIPLE of both ${p.a} and ${p.b}?`;
    const distractors = [p.common + 2, p.common - 3, p.common + 5].filter(d => d % p.a !== 0 || d % p.b !== 0);
    const options = shuffle([String(p.common), ...distractors.slice(0, 3).map(String)]);
    return {
      category: "Unit 5 • Common Multiples",
      fr: sentence,
      en: `A common multiple is divisible by both ${p.a} and ${p.b}.`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(p.common)),
      explanation: `${p.common} is a multiple of both ${p.a} (${p.a} × ${p.common/p.a}) and ${p.b} (${p.b} × ${p.common/p.b}).`,
      lang: "en-US"
    };
  } else if (qType === "factor-check") {
    const factorPairs = [
      { num: 24, factors: [1, 2, 3, 4, 6, 8, 12, 24], nonFactor: 5 },
      { num: 36, factors: [1, 2, 3, 4, 6, 9, 12, 18, 36], nonFactor: 7 },
      { num: 20, factors: [1, 2, 4, 5, 10, 20], nonFactor: 3 },
      { num: 30, factors: [1, 2, 3, 5, 6, 10, 15, 30], nonFactor: 4 },
      { num: 45, factors: [1, 3, 5, 9, 15, 45], nonFactor: 6 }
    ];
    const picked = pickRandom(factorPairs);
    const sentence = `Which number is NOT a factor of ${picked.num}?`;
    const someFactors = shuffle(picked.factors.filter(f => f !== 1 && f !== picked.num)).slice(0, 3);
    const options = shuffle([String(picked.nonFactor), ...someFactors.map(String)]);
    return {
      category: "Unit 5 • Factors and Divisibility",
      fr: sentence,
      en: `Factors divide into ${picked.num} with no remainder.`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(picked.nonFactor)),
      explanation: `${picked.nonFactor} does not divide evenly into ${picked.num}. The factors of ${picked.num} are ${picked.factors.join(", ")}.`,
      lang: "en-US"
    };
  } else {
    // Word problem
    const bags = randInt(4, 12);
    const itemsPerBag = randInt(6, 15);
    const total = bags * itemsPerBag;
    const sentence = `Aezza has ${bags} boxes of crayons. Each box contains ${itemsPerBag} crayons. How many crayons does she have in total?`;
    const explanation = `Total crayons = ${bags} boxes × ${itemsPerBag} crayons = ${total} crayons.`;
    const distractors = [total + itemsPerBag, total - bags, total + 10].filter(d => d !== total);
    const options = shuffle([`${total} crayons`, ...distractors.slice(0, 3).map(d => `${d} crayons`)]);
    return {
      category: "Unit 5 • Multiplication Word Problems",
      fr: sentence,
      en: `Multiply the number of boxes by crayons per box: ${bags} × ${itemsPerBag}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(`${total} crayons`),
      explanation: explanation,
      lang: "en-US"
    };
  }
}

// Unit 3: Previous Concepts (1.3 Place Value & 1.2 Negative Numbers)
function generateMathUnit3Question() {
  const qType = pickRandom(["place-val-digit", "expanded-form", "100-more-less", "negative-compare", "temp-drop", "number-line-neg"]);

  if (qType === "place-val-digit") {
    const thousands = randInt(2, 9);
    const hundreds = randInt(1, 9);
    const tens = randInt(1, 9);
    const ones = randInt(1, 9);
    const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
    const targetPlace = pickRandom(["thousands", "hundreds", "tens", "ones"]);

    let digit, valString, exp;
    if (targetPlace === "thousands") {
      digit = thousands;
      valString = `${thousands * 1000} (${thousands} Thousands)`;
      exp = `The digit ${digit} is in the thousands place, so its place value is ${thousands * 1000}.`;
    } else if (targetPlace === "hundreds") {
      digit = hundreds;
      valString = `${hundreds * 100} (${hundreds} Hundreds)`;
      exp = `The digit ${digit} is in the hundreds place, so its place value is ${hundreds * 100}.`;
    } else if (targetPlace === "tens") {
      digit = tens;
      valString = `${tens * 10} (${tens} Tens)`;
      exp = `The digit ${digit} is in the tens place, so its place value is ${tens * 10}.`;
    } else {
      digit = ones;
      valString = `${ones} (${ones} Ones)`;
      exp = `The digit ${digit} is in the ones place, so its place value is ${ones}.`;
    }

    const sentence = `In the 4-digit number ${num.toLocaleString()}, what is the PLACE VALUE of the digit ${digit}?`;
    const distractors = [
      `${digit * 1000} (${digit} Thousands)`,
      `${digit * 100} (${digit} Hundreds)`,
      `${digit * 10} (${digit} Tens)`,
      `${digit} (${digit} Ones)`
    ].filter(d => d !== valString);

    const options = shuffle([valString, ...distractors.slice(0, 3)]);
    return {
      category: "1.3 • Place Value in 4-Digit Numbers",
      fr: sentence,
      en: `Thousands | Hundreds | Tens | Ones`,
      audio: sentence,
      options: options,
      correct: options.indexOf(valString),
      explanation: exp,
      lang: "en-US"
    };
  } else if (qType === "expanded-form") {
    const th = randInt(3, 8) * 1000;
    const h = randInt(1, 9) * 100;
    const t = randInt(1, 9) * 10;
    const o = randInt(1, 9);
    const total = th + h + t + o;
    const correctExpanded = `${th} + ${h} + ${t} + ${o}`;
    const sentence = `What is the EXPANDED FORM of ${total.toLocaleString()}?`;
    const distractors = [
      `${th} + ${h * 10} + ${t} + ${o}`,
      `${th} + ${h} + ${o}`,
      `${th / 10} + ${h} + ${t} + ${o}`
    ];
    const options = shuffle([correctExpanded, ...distractors]);
    return {
      category: "1.3 • Expanded Form of Numbers",
      fr: sentence,
      en: `Break down by place value: Thousands + Hundreds + Tens + Ones`,
      audio: sentence,
      options: options,
      correct: options.indexOf(correctExpanded),
      explanation: `${total} = ${th} + ${h} + ${t} + ${o}.`,
      lang: "en-US"
    };
  } else if (qType === "100-more-less") {
    const num = randInt(2500, 7800);
    const isMore = Math.random() > 0.5;
    const step = pickRandom([10, 100, 1000]);
    const ans = isMore ? num + step : num - step;
    const sentence = `What number is ${step} ${isMore ? "MORE" : "LESS"} than ${num.toLocaleString()}?`;
    const distractors = [
      isMore ? num - step : num + step,
      ans + 10,
      ans - 100
    ].filter(d => d !== ans);
    const options = shuffle([ans.toLocaleString(), ...distractors.map(d => d.toLocaleString())]);
    return {
      category: "1.3 • 10, 100, 1000 More or Less",
      fr: sentence,
      en: `${num} ${isMore ? "+" : "-"} ${step} = ${ans}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(ans.toLocaleString()),
      explanation: `${num} ${isMore ? "+" : "-"} ${step} = ${ans.toLocaleString()}.`,
      lang: "en-US"
    };
  } else if (qType === "negative-compare") {
    const a = randInt(-9, -2);
    const b = randInt(-10, -1);
    while (a === b) { a = randInt(-9, -2); }
    const isAGreater = a > b;
    const correctStatement = isAGreater ? `${a} > ${b}` : `${a} < ${b}`;
    const falseStatement = isAGreater ? `${a} < ${b}` : `${a} > ${b}`;
    const sentence = `Which comparison with negative numbers is TRUE?`;
    const options = shuffle([
      correctStatement,
      falseStatement,
      `${a} = ${b}`,
      `-${Math.abs(a)} > ${Math.abs(b)}`
    ]);
    return {
      category: "1.2 • Comparing Negative Numbers",
      fr: sentence,
      en: `On a number line, numbers further to the right are greater.`,
      audio: sentence,
      options: options,
      correct: options.indexOf(correctStatement),
      explanation: `On the number line, ${Math.max(a, b)} is further to the right than ${Math.min(a, b)}, so ${correctStatement} is correct.`,
      lang: "en-US"
    };
  } else if (qType === "temp-drop") {
    const startTemp = randInt(2, 6);
    const drop = randInt(5, 9);
    const finalTemp = startTemp - drop;
    const sentence = `The temperature in the morning was ${startTemp}°C. By night, it DROPPED by ${drop}°C. What is the night temperature?`;
    const explanation = `Starting at ${startTemp}°C and dropping ${drop}°C: ${startTemp} - ${drop} = ${finalTemp}°C.`;
    const distractors = [finalTemp + 2, finalTemp - 2, startTemp + drop].filter(d => d !== finalTemp);
    const options = shuffle([`${finalTemp}°C`, ...distractors.map(d => `${d}°C`)]);
    return {
      category: "1.2 • Negative Numbers in Temperature",
      fr: sentence,
      en: `Start at ${startTemp} and subtract ${drop}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(`${finalTemp}°C`),
      explanation: explanation,
      lang: "en-US"
    };
  } else {
    // Number line
    const start = randInt(-6, -1);
    const forward = randInt(3, 8);
    const result = start + forward;
    const sentence = `On a number line, you start at ${start} and move ${forward} steps to the RIGHT (+). Where do you land?`;
    const explanation = `${start} + ${forward} = ${result}.`;
    const distractors = [result - 2, start - forward, result + 3].filter(d => d !== result);
    const options = shuffle([String(result), ...distractors.map(String)]);
    return {
      category: "1.2 • Number Line & Integers",
      fr: sentence,
      en: `Moving right means adding: ${start} + ${forward}`,
      audio: sentence,
      options: options,
      correct: options.indexOf(String(result)),
      explanation: explanation,
      lang: "en-US"
    };
  }
}

// Unit 4: Previous Concepts (2.1 Time)
function generateMathUnit4Question() {
  const qType = pickRandom(["clock-read", "elapsed-time", "units-conversion", "digital-to-12hr"]);

  if (qType === "clock-read") {
    const times = [
      { clock: "Minute hand on 3, Hour hand just past 4", digital: "4:15", text: "Quarter past 4" },
      { clock: "Minute hand on 6, Hour hand halfway between 8 and 9", digital: "8:30", text: "Half past 8" },
      { clock: "Minute hand on 9, Hour hand pointing close to 7", digital: "6:45", text: "Quarter to 7" },
      { clock: "Minute hand on 12, Hour hand pointing straight at 5", digital: "5:00", text: "5 o'clock" },
      { clock: "Minute hand on 4 (20 mins), Hour hand past 2", digital: "2:20", text: "20 minutes past 2" }
    ];
    const picked = pickRandom(times);
    const sentence = `An analog clock shows: "${picked.clock}". What time is it?`;
    const distractors = times.filter(t => t.digital !== picked.digital).map(t => `${t.digital} (${t.text})`);
    const correctOption = `${picked.digital} (${picked.text})`;
    const options = shuffle([correctOption, ...distractors.slice(0, 3)]);
    return {
      category: "2.1 • Reading Analog Clocks",
      fr: sentence,
      en: `Minute hand: 3 = 15 mins, 6 = 30 mins, 9 = 45 mins`,
      audio: sentence,
      options: options,
      correct: options.indexOf(correctOption),
      explanation: `When the ${picked.clock}, the time is ${picked.digital} or "${picked.text}".`,
      lang: "en-US"
    };
  } else if (qType === "elapsed-time") {
    const startHour = randInt(2, 5);
    const startMin = pickRandom([0, 15, 30]);
    const duration = pickRandom([30, 45, 60, 75]);
    const totalMin = startHour * 60 + startMin + duration;
    const endHour = Math.floor(totalMin / 60);
    const endMin = totalMin % 60;
    const fmt = (h, m) => `${h}:${m === 0 ? "00" : m < 10 ? "0" + m : m} PM`;

    const sentence = `Aezza starts her homework at ${fmt(startHour, startMin)} and finishes at ${fmt(endHour, endMin)}. How many minutes did she spend?`;
    const explanation = `From ${fmt(startHour, startMin)} to ${fmt(endHour, endMin)} is ${duration} minutes.`;
    const distractors = [duration + 15, duration - 15, duration + 30].filter(d => d !== duration);
    const options = shuffle([`${duration} minutes`, ...distractors.slice(0, 3).map(d => `${d} minutes`)]);
    return {
      category: "2.1 • Elapsed Time & Duration",
      fr: sentence,
      en: `Calculate the time difference between start and finish.`,
      audio: sentence,
      options: options,
      correct: options.indexOf(`${duration} minutes`),
      explanation: explanation,
      lang: "en-US"
    };
  } else if (qType === "units-conversion") {
    const conv = pickRandom([
      { q: "How many minutes are in 2 hours?", ans: "120 minutes", exp: "1 hour = 60 minutes. 2 hours = 2 × 60 = 120 minutes." },
      { q: "How many hours are in 3 days?", ans: "72 hours", exp: "1 day = 24 hours. 3 days = 3 × 24 = 72 hours." },
      { q: "How many seconds are in 5 minutes?", ans: "300 seconds", exp: "1 minute = 60 seconds. 5 minutes = 5 × 60 = 300 seconds." },
      { q: "How many minutes are in 1 hour and 45 minutes?", ans: "105 minutes", exp: "60 + 45 = 105 minutes." }
    ]);
    const distractors = ["60 minutes", "100 minutes", "180 minutes", "48 hours", "360 seconds"].filter(d => d !== conv.ans);
    const options = shuffle([conv.ans, ...distractors.slice(0, 3)]);
    return {
      category: "2.1 • Units of Time Conversion",
      fr: conv.q,
      en: conv.exp,
      audio: conv.q,
      options: options,
      correct: options.indexOf(conv.ans),
      explanation: conv.exp,
      lang: "en-US"
    };
  } else {
    // 24hr to 12hr
    const hour24 = randInt(13, 21);
    const min = pickRandom(["00", "15", "30", "45"]);
    const hour12 = hour24 - 12;
    const sentence = `A digital clock shows ${hour24}:${min}. What is this time in 12-hour AM/PM format?`;
    const correctAns = `${hour12}:${min} PM`;
    const distractors = [`${hour12}:${min} AM`, `${hour24 - 10}:${min} PM`, `${hour12 + 1}:${min} PM`];
    const options = shuffle([correctAns, ...distractors]);
    return {
      category: "2.1 • 12-Hour vs 24-Hour Time",
      fr: sentence,
      en: `For 24-hour time after 12:00, subtract 12 to find PM time.`,
      audio: sentence,
      options: options,
      correct: options.indexOf(correctAns),
      explanation: `${hour24}:${min} in 24-hour time is ${hour12}:${min} PM in 12-hour time (${hour24} - 12 = ${hour12}).`,
      lang: "en-US"
    };
  }
}

// Math Quiz generator
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

// Math Mock Exam (15 questions covering all 4 units)
function generateDynamicMathMockExam(count = 15) {
  const generators = [
    generateMathUnit1Question,
    generateMathUnit1Question,
    generateMathUnit1Question,
    generateMathUnit1Question,
    generateMathUnit2Question,
    generateMathUnit2Question,
    generateMathUnit2Question,
    generateMathUnit2Question,
    generateMathUnit3Question,
    generateMathUnit3Question,
    generateMathUnit3Question,
    generateMathUnit3Question,
    generateMathUnit4Question,
    generateMathUnit4Question,
    generateMathUnit4Question
  ];
  return shuffle(generators).slice(0, count).map(fn => fn());
}

// =============================================================================
// 5. DYNAMIC UNSCRAMBLE / EQUATION BUILDER
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
    },
    () => {
      const th = randInt(3, 7) * 1000;
      const h = randInt(2, 8) * 100;
      const t = randInt(2, 9) * 10;
      const o = randInt(1, 9);
      const sum = th + h + t + o;
      return {
        targetTokens: [String(th), "+", String(h), "+", String(t), "+", String(o), "=", String(sum)],
        en: `Expanded form of ${sum}`,
        audio: `${th} plus ${h} plus ${t} plus ${o} equals ${sum}`
      };
    },
    () => {
      const a = randInt(3, 8);
      const b = randInt(2, 5);
      const c = randInt(4, 9);
      const res = a + b * c;
      return {
        targetTokens: [String(a), "+", String(b), "×", String(c), "=", String(res)],
        en: `Order of Operations: ${a} + ${b} × ${c} = ${res}`,
        audio: `${a} plus ${b} times ${c} equals ${res}`
      };
    },
    () => {
      const hours = randInt(2, 6);
      const mins = hours * 60;
      return {
        targetTokens: [String(hours), "hours", "=", String(mins), "minutes"],
        en: `Time conversion: ${hours} hours = ${mins} minutes`,
        audio: `${hours} hours equals ${mins} minutes`
      };
    },
    () => {
      return {
        targetTokens: ["Odd", "+", "Odd", "=", "Even"],
        en: "Even/Odd Rule: Odd + Odd = Even",
        audio: "Odd plus Odd equals Even"
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
    () => {
      const subj = pickRandom(["Luc", "Paul", "Mon frère"]);
      const time = pickRandom(["sept", "huit", "six"]);
      return {
        targetTokens: [subj, "se", "réveille", "à", time, "heures", "."],
        en: `${subj} wakes up at ${time} o'clock.`,
        audio: `${subj} se réveille à ${time} heures.`
      };
    },
    () => {
      const subj = pickRandom(["Aezza", "Marie", "Sophie"]);
      return {
        targetTokens: [subj, "se", "brosse", "les", "dents", "le", "matin", "."],
        en: `${subj} brushes her teeth in the morning.`,
        audio: `${subj} se brosse les dents le matin.`
      };
    },
    () => {
      const food = pickRandom(["du croissant", "du chocolat", "de la confiture", "des fruits"]);
      return {
        targetTokens: ["J'", "aime", "manger", ...food.split(" "), "."],
        en: `I like eating ${food}.`,
        audio: `J'aime manger ${food}.`
      };
    },
    () => {
      const country = pickRandom(FRENCH_DB.places.filter(p => p.type.startsWith("country")));
      return {
        targetTokens: ["Elle", "habite", country.prep, country.name, "."],
        en: `She lives in ${country.name}.`,
        audio: `Elle habite ${country.prep} ${country.name}.`
      };
    },
    () => {
      return {
        targetTokens: ["Je", "ne", "regarde", "pas", "la", "télévision", "."],
        en: "I do not watch television.",
        audio: "Je ne regarde pas la télévision."
      };
    },
    () => {
      return {
        targetTokens: ["Au", "petit", "déjeuner", ",", "je", "bois", "du", "lait", "."],
        en: "For breakfast, I drink milk.",
        audio: "Au petit déjeuner, je bois du lait."
      };
    }
  ];

  return shuffle(templates).slice(0, count).map(fn => {
    const p = fn();
    p.scrambledTokens = shuffle([...p.targetTokens]);
    return p;
  });
}

// =============================================================================
// 6. DYNAMIC MATCHING PAIRS GENERATOR
// =============================================================================

function generateDynamicMatchingPairs(subject, category, count = 5) {
  if (subject === "math") {
    if (category === "tables") {
      const pairs = [
        { left: "13 × 4", right: "52" },
        { left: "14 × 5", right: "70" },
        { left: "15 × 6", right: "90" },
        { left: "12 × 8", right: "96" },
        { left: "13 × 7", right: "91" },
        { left: "14 × 6", right: "84" },
        { left: "15 × 8", right: "120" },
        { left: "12 × 9", right: "108" },
        { left: "11 × 11", right: "121" }
      ];
      return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
    } else if (category === "factors") {
      const pairs = [
        { left: "Multiples of 6", right: "6, 12, 18, 24" },
        { left: "Multiples of 8", right: "8, 16, 24, 32" },
        { left: "Factors of 12", right: "1, 2, 3, 4, 6, 12" },
        { left: "Factors of 20", right: "1, 2, 4, 5, 10, 20" },
        { left: "Multiples of 9", right: "9, 18, 27, 36" },
        { left: "Factors of 18", right: "1, 2, 3, 6, 9, 18" }
      ];
      return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
    } else if (category === "placevalue") {
      const pairs = [
        { left: "4,520", right: "4000 + 500 + 20" },
        { left: "7,085", right: "7000 + 80 + 5" },
        { left: "3,604", right: "3000 + 600 + 4" },
        { left: "9,250", right: "9000 + 200 + 50" },
        { left: "6,412", right: "6000 + 400 + 10 + 2" }
      ];
      return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
    } else {
      // Even & Odd rules
      const pairs = [
        { left: "Odd + Odd", right: "Even" },
        { left: "Even + Even", right: "Even" },
        { left: "Odd + Even", right: "Odd" },
        { left: "Odd × Odd", right: "Odd" },
        { left: "Even × Even", right: "Even" }
      ];
      return shuffle(pairs).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
    }
  } else {
    // French Matching
    if (category === "nationalities") {
      const pool = shuffle(FRENCH_DB.places.filter(c => c.mascNat && c.femNat)).slice(0, count);
      return pool.map((c, idx) => ({
        left: `${c.mascNat.charAt(0).toUpperCase() + c.mascNat.slice(1)} (Masc)`,
        right: `${c.femNat.charAt(0).toUpperCase() + c.femNat.slice(1)} (Fém)`,
        id: idx + 1
      }));
    } else if (category === "prepositions") {
      const pool = shuffle(FRENCH_DB.places).slice(0, count);
      return pool.map((p, idx) => ({
        left: `${p.name} (${p.type === "city" ? "Ville" : "Pays"})`,
        right: `${p.prep} ${p.name}`,
        id: idx + 1
      }));
    } else {
      const masc = shuffle(FRENCH_DB.food.masculine).slice(0, 2).map(f => ({ left: `${f.emoji} ${f.name}`, right: `du ${f.name}` }));
      const fem = shuffle(FRENCH_DB.food.feminine).slice(0, 2).map(f => ({ left: `${f.emoji} ${f.name}`, right: `de la ${f.name}` }));
      const plur = shuffle(FRENCH_DB.food.plural).slice(0, 1).map(f => ({ left: `${f.emoji} ${f.name}`, right: `des ${f.name}` }));
      return shuffle([...masc, ...fem, ...plur]).slice(0, count).map((p, idx) => ({ ...p, id: idx + 1 }));
    }
  }
}

// =============================================================================
// 7. FLASHCARDS DATA (FRENCH & MATH)
// =============================================================================

const STATIC_FLASHCARDS = {
  french: {
    verbes: [
      { emoji: "⏰", fr: "se réveiller", en: "to wake up", tag: "Verbe Pronominal", exampleFr: "Je me réveille à sept heures.", exampleEn: "I wake up at seven o'clock." },
      { emoji: "🛏️", fr: "se lever", en: "to get out of bed", tag: "Verbe Pronominal", exampleFr: "Luc se lève aussitôt.", exampleEn: "Luc gets up right away." },
      { emoji: "🚿", fr: "se doucher", en: "to take a shower", tag: "Verbe Pronominal", exampleFr: "Tu te douches avant l'école.", exampleEn: "You take a shower before school." },
      { emoji: "🪥", fr: "se brosser les dents", en: "to brush teeth", tag: "Verbe Pronominal", exampleFr: "Nous nous brossons les dents.", exampleEn: "We brush our teeth." },
      { emoji: "👗", fr: "s'habiller", en: "to get dressed", tag: "Verbe Pronominal", exampleFr: "Aezza s'habille avec sa jolie robe.", exampleEn: "Aezza gets dressed with her pretty dress." },
      { emoji: "🌙", fr: "se coucher", en: "to go to bed", tag: "Verbe Pronominal", exampleFr: "Je me couche à vingt heures trente.", exampleEn: "I go to bed at 8:30 PM." }
    ],
    conjugaison: [
      { emoji: "🚶", fr: "Aller (Je vais, Tu vas, Il va)", en: "To go", tag: "Verbe Irrégulier", exampleFr: "Nous allons à l'école ensemble.", exampleEn: "We go to school together." },
      { emoji: "❤️", fr: "Aimer (J'aime, Tu aimes)", en: "To like / To love", tag: "Verbe en -ER", exampleFr: "J'aime écouter de la musique.", exampleEn: "I like listening to music." },
      { emoji: "🗣️", fr: "Parler (Je parle, Tu parles)", en: "To speak", tag: "Verbe en -ER", exampleFr: "Elle parle français couramment.", exampleEn: "She speaks French fluently." },
      { emoji: "🏡", fr: "Habiter (J'habite, Nous habitons)", en: "To live / reside", tag: "Verbe en -ER", exampleFr: "J'habite dans une belle maison.", exampleEn: "I live in a beautiful house." }
    ],
    nationalites: [
      { emoji: "🇫🇷", fr: "Français / Française", en: "French (Masc / Fem)", tag: "Nationalité", exampleFr: "Paul est français, Sophie est française.", exampleEn: "Paul is French, Sophie is French." },
      { emoji: "🇮🇳", fr: "Indien / Indienne", en: "Indian (Masc / Fem)", tag: "Nationalité", exampleFr: "Rohan est indien, Aezza est indienne.", exampleEn: "Rohan is Indian, Aezza is Indian." },
      { emoji: "🇨🇦", fr: "au Canada / en France", en: "in Canada (Masc) / in France (Fem)", tag: "Prépositions", exampleFr: "J'habite au Canada et elle habite en France.", exampleEn: "I live in Canada and she lives in France." }
    ],
    repas: [
      { emoji: "🥞", fr: "Le petit déjeuner", en: "Breakfast", tag: "Vocabulaire Repas", exampleFr: "Au petit déjeuner, je bois du lait.", exampleEn: "For breakfast, I drink milk." },
      { emoji: "🥗", fr: "Le déjeuner", en: "Lunch", tag: "Vocabulaire Repas", exampleFr: "À midi, nous prenons le déjeuner.", exampleEn: "At noon, we have lunch." },
      { emoji: "🥐", fr: "du pain / de la confiture", en: "some bread / some jam", tag: "Articles Partitifs", exampleFr: "Je mange du pain avec de la confiture.", exampleEn: "I eat bread with jam." }
    ]
  },

  math: {
    pemdas: [
      { emoji: "⚡", fr: "PEMDAS Rule", en: "Order of Operations", tag: "Unit 3 • Operations", exampleFr: "P: Parentheses -> M/D: Multiply/Divide -> A/S: Add/Subtract", exampleEn: "Always solve brackets first, then multiply/divide left to right!" },
      { emoji: "➕", fr: "Even & Odd Addition", en: "Odd + Odd = Even | Odd + Even = Odd", tag: "Unit 3 • Number Rules", exampleFr: "7 + 5 = 12 (Even) | 7 + 4 = 11 (Odd)", exampleEn: "Adding two odds always pairs up to an even number!" },
      { emoji: "🎯", fr: "Estimation to 100", en: "Rounding Strategy", tag: "Unit 3 • Estimation", exampleFr: "348 rounds up to 300? No, 348 -> 300, 362 -> 400", exampleEn: "Look at the tens digit: 5 or more rounds up!" }
    ],
    tables: [
      { emoji: "✖️", fr: "13 Times Table", en: "13, 26, 39, 52, 65, 78, 91, 104, 117, 130", tag: "Unit 5 • Times Tables", exampleFr: "13 × 4 = 52 | 13 × 7 = 91", exampleEn: "13 is 10 + 3. (10 × 7) + (3 × 7) = 70 + 21 = 91" },
      { emoji: "✖️", fr: "14 Times Table", en: "14, 28, 42, 56, 70, 84, 98, 112, 126, 140", tag: "Unit 5 • Times Tables", exampleFr: "14 × 5 = 70 | 14 × 6 = 84", exampleEn: "Double the 7 times table! (7 × 6 = 42 -> 14 × 6 = 84)" },
      { emoji: "✖️", fr: "15 Times Table", en: "15, 30, 45, 60, 75, 90, 105, 120, 135, 150", tag: "Unit 5 • Times Tables", exampleFr: "15 × 6 = 90 | 15 × 8 = 120", exampleEn: "15 ends in 5, 0, 5, 0 alternately!" }
    ],
    placevalue: [
      { emoji: "📊", fr: "4-Digit Place Value", en: "Thousands, Hundreds, Tens, Ones", tag: "1.3 • Place Value", exampleFr: "In 6,482: 6000 + 400 + 80 + 2", exampleEn: "Place of 4 is Hundreds -> value is 400." },
      { emoji: "❄️", fr: "Negative Numbers", en: "Values below Zero", tag: "1.2 • Negative Numbers", exampleFr: "-2 is GREATER than -8 (-2 > -8)", exampleEn: "Numbers further right on the number line are larger." },
      { emoji: "🌡️", fr: "Temperature Drop", en: "3°C drop by 7°C = -4°C", tag: "1.2 • Thermometer", exampleFr: "3 - 7 = -4 degrees Celsius", exampleEn: "Pass through 0: 3 down to 0, then 4 more down." }
    ],
    time: [
      { emoji: "⏰", fr: "Quarter Past / Quarter To", en: ":15 (Quarter Past) & :45 (Quarter To)", tag: "2.1 • Clock Reading", exampleFr: "Quarter past 6 = 6:15 | Quarter to 7 = 6:45", exampleEn: "Quarter = 15 minutes (1/4 of an hour)." },
      { emoji: "⏳", fr: "Units of Time", en: "60 mins = 1 hr | 24 hrs = 1 day", tag: "2.1 • Conversions", exampleFr: "2 hours = 120 minutes | 3 days = 72 hours", exampleEn: "Multiply hours by 60 to get total minutes." }
    ]
  }
};

// =============================================================================
// 8. AUDIO & SOUND EFFECTS
// =============================================================================

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
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + startTime);
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
      utter.pitch = 1.05;

      if (lang.startsWith("fr")) {
        utter.lang = "fr-FR";
        if (this.frenchVoice) utter.voice = this.frenchVoice;
      } else {
        utter.lang = "en-US";
        if (this.englishVoice) utter.voice = this.englishVoice;
      }

      AppState.audioListenCount++;
      checkAudioBadge();
      this.synth.speak(utter);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  }
}

const voice = new VoiceReciter();

// =============================================================================
// 9. CONFETTI & TOAST
// =============================================================================

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
    const colors = ["#ff529a", "#2eb872", "#0284c7", "#f59e0b", "#8b5cf6", "#ec4899", "#3b82f6"];
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
// 10. APP STATE & PERSISTENCE
// =============================================================================

const AppState = {
  currentSubject: "french", // "french" or "math"
  xp: 350,
  stars: 120,
  streak: 5,
  audioListenCount: 0,
  completedChapters: { ch1: false, ch2: false, ch3: false, ch4: false, "math-u1": false, "math-u2": false, "math-u3": false, "math-u4": false },
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

function loadSavedState() {
  try {
    const raw = localStorage.getItem("aezza_learning_quest_state");
    if (raw) {
      const saved = JSON.parse(raw);
      AppState.xp = saved.xp || 350;
      AppState.stars = saved.stars || 120;
      AppState.streak = saved.streak || 5;
      AppState.completedChapters = saved.completedChapters || AppState.completedChapters;
      AppState.audioListenCount = saved.audioListenCount || 0;
      AppState.unscrambleSolved = saved.unscrambleSolved || 0;
      AppState.currentSubject = saved.currentSubject || "french";
    }
  } catch (e) {
    console.warn("State load error:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem("aezza_learning_quest_state", JSON.stringify({
      xp: AppState.xp,
      stars: AppState.stars,
      streak: AppState.streak,
      completedChapters: AppState.completedChapters,
      audioListenCount: AppState.audioListenCount,
      unscrambleSolved: AppState.unscrambleSolved,
      currentSubject: AppState.currentSubject
    }));
  } catch (e) {
    console.warn("State save error:", e);
  }
}

function addXP(amount) {
  AppState.xp += amount;
  AppState.stars += Math.floor(amount / 10);
  updateGamificationDisplay();
  saveState();
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

function checkAudioBadge() {
  if (AppState.audioListenCount >= 5) {
    unlockTrophy("trophy-voice", "🎙️ Audio Explorer Unlocked!");
  }
}

function unlockTrophy(trophyId, msg) {
  const el = document.getElementById(trophyId);
  if (el && !el.classList.contains("unlocked")) {
    el.classList.add("unlocked");
    const status = el.querySelector(".trophy-status");
    if (status) {
      status.className = "trophy-status";
      status.textContent = "Unlocked ✨";
    }
    showToast("🏆", msg || "New Trophy Unlocked!");
    sfx.fanfare();
    confetti.blast();
  }
}

function checkBadges() {
  if (AppState.completedChapters.ch1) unlockTrophy("trophy-ch1");
  if (AppState.completedChapters.ch2) unlockTrophy("trophy-ch2");
  if (AppState.completedChapters.ch3) unlockTrophy("trophy-ch3");
  if (AppState.completedChapters.ch4) unlockTrophy("trophy-ch4");
  if (AppState.completedChapters["math-u1"]) unlockTrophy("trophy-math-add");
  if (AppState.completedChapters["math-u2"]) unlockTrophy("trophy-math-tables");
  if (AppState.completedChapters["math-u3"]) unlockTrophy("trophy-math-placeval");
  if (AppState.completedChapters["math-u4"]) unlockTrophy("trophy-math-time");
  if (AppState.unscrambleSolved >= 6) unlockTrophy("trophy-unscramble");
  if (AppState.audioListenCount >= 5) unlockTrophy("trophy-voice");
}

// =============================================================================
// 11. SUBJECT SWITCHER CONTROLLER (FRENCH ↔ MATH)
// =============================================================================

function initSubjectSwitcher() {
  const btnFrench = document.getElementById("btn-subject-french");
  const btnMath = document.getElementById("btn-subject-math");

  btnFrench.addEventListener("click", () => {
    sfx.pop();
    switchSubject("french");
  });

  btnMath.addEventListener("click", () => {
    sfx.pop();
    switchSubject("math");
  });

  switchSubject(AppState.currentSubject || "french", true);
}

function switchSubject(subject, skipStateSave = false) {
  AppState.currentSubject = subject;
  if (!skipStateSave) saveState();

  const isMath = subject === "math";
  document.body.classList.toggle("theme-math", isMath);

  const btnFrench = document.getElementById("btn-subject-french");
  const btnMath = document.getElementById("btn-subject-math");
  if (btnFrench && btnMath) {
    btnFrench.classList.toggle("active", !isMath);
    btnMath.classList.toggle("active", isMath);
  }

  // Update Mascot
  const mascotAvatar = document.getElementById("avatar-accessory");
  const mascotText = document.getElementById("mascot-text");
  if (mascotAvatar) mascotAvatar.textContent = isMath ? "🎓" : "🥖";

  if (mascotText) {
    mascotText.textContent = isMath
      ? `"Hello Aezza! I'm Professor Coco. Ready to master Grade 3 Math? Choose a unit to practice!"`
      : `"Bonjour Aezza ! Je m'appelle Coco le renard. Prête à réussir ton examen de français ? Choisis un chapitre !"`;
  }

  // Update Dynamic UI Views
  renderAdventureGrid();
  updateUnscrambleForSubject();
  updateMatchingTabsForSubject();
  updateFlashcardTabsForSubject();
  updateMockExamIntroForSubject();
}

// Render Adventure Chapter/Unit Grid
function renderAdventureGrid() {
  const container = document.getElementById("chapter-grid-container");
  const headline = document.getElementById("adventure-headline");
  const subheadline = document.getElementById("adventure-subheadline");
  if (!container) return;

  const isMath = AppState.currentSubject === "math";

  if (headline) headline.textContent = isMath ? "Choose Your Math Quest 🚀" : "Choisis ton Aventure 🚀";
  if (subheadline) subheadline.textContent = isMath
    ? "Master every unit of your Grade 3 Summative Assessment 1 Mathematics syllabus!"
    : "Entraîne-toi sur chaque chapitre du programme pour maîtriser ton contrôle de français !";

  container.innerHTML = "";

  const chapters = isMath ? [
    {
      key: "math-u1",
      badge: "Unit 3 • Grade 3",
      cardClass: "card-blue",
      icon: "➕ ⚡",
      title: "Addition, Subtraction & PEMDAS",
      subtitle: "Estimation, Even/Odd Generalizations & Order of Operations",
      tags: ["Estimation", "Nearest 10/100", "Even & Odd", "PEMDAS Rules"],
      progId: "prog-math-u1",
      badgeId: "badge-math-u1"
    },
    {
      key: "math-u2",
      badge: "Unit 5 • Grade 3",
      cardClass: "card-mint",
      icon: "✖️ 🔢",
      title: "Multiplication, Multiples & Factors",
      subtitle: "Tables (2-15), Common Multiples & Factor Pairs",
      tags: ["Tables 2-15", "Multiples", "Factors", "Word Problems"],
      progId: "prog-math-u2",
      badgeId: "badge-math-u2"
    },
    {
      key: "math-u3",
      badge: "Concept 1.2 & 1.3",
      cardClass: "card-purple",
      icon: "📊 ❄️",
      title: "Place Value & Negative Numbers",
      subtitle: "4-Digit Numbers, Expanded Form & Temperature Below Zero",
      tags: ["Thousands", "Expanded Form", "-5 < -2", "Temperature Drops"],
      progId: "prog-math-u3",
      badgeId: "badge-math-u3"
    },
    {
      key: "math-u4",
      badge: "Concept 2.1",
      cardClass: "card-yellow",
      icon: "⏰ ⏳",
      title: "Time Mastery & Clocks",
      subtitle: "Analog Clocks, Quarter Past/To, Elapsed Time & 24hr Time",
      tags: ["Analog Clocks", "Elapsed Time", "Hours to Mins", "12hr / 24hr"],
      progId: "prog-math-u4",
      badgeId: "badge-math-u4"
    }
  ] : [
    {
      key: "ch1",
      badge: "Chapitre 1",
      cardClass: "card-pink",
      icon: "⏰ 🏠",
      title: "La Vie Quotidienne de Luc",
      subtitle: "Verbes Pronominaux & Routine du Matin",
      tags: ["se réveiller", "se lever", "se doucher", "s'habiller"],
      progId: "prog-ch1",
      badgeId: "badge-ch1"
    },
    {
      key: "ch2",
      badge: "Chapitre 2",
      cardClass: "card-mint",
      icon: "🌍 ✈️",
      title: "Le Monde Multiculturel",
      subtitle: "Nationalités & Prépositions (à, en, au, aux)",
      tags: ["français/e", "en France", "au Canada", "aux États-Unis"],
      progId: "prog-ch2",
      badgeId: "badge-ch2"
    },
    {
      key: "ch3",
      badge: "Chapitre 3",
      cardClass: "card-blue",
      icon: "🥐 🍎",
      title: "La Bonne Nourriture",
      subtitle: "Les Repas & Articles Partitifs (du, de la, de l', des)",
      tags: ["petit déjeuner", "du pain", "de la confiture", "de l'eau"],
      progId: "prog-ch3",
      badgeId: "badge-ch3"
    },
    {
      key: "ch4",
      badge: "Grammaire & Loisirs",
      cardClass: "card-yellow",
      icon: "🎨 ⚽",
      title: "Conjugaison & Mes Loisirs",
      subtitle: "Aimer, Aller, Parler, Regarder, Habiter & J'aime...",
      tags: ["Je vais", "J'aime", "Je n'aime pas", "Habiter"],
      progId: "prog-ch4",
      badgeId: "badge-ch4"
    }
  ];

  chapters.forEach(ch => {
    const isDone = AppState.completedChapters[ch.key];
    const card = document.createElement("div");
    card.className = `chapter-card ${ch.cardClass}`;
    card.innerHTML = `
      <div class="card-badge ${isDone ? "completed" : ""}" id="${ch.badgeId}">${isDone ? "⭐ Completed!" : ch.badge}</div>
      <div class="card-icon-hero">${ch.icon}</div>
      <h3 class="card-title">${ch.title}</h3>
      <p class="card-subtitle">${ch.subtitle}</p>
      <div class="tags-row">
        ${ch.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="progress-container">
        <div class="progress-bar" id="${ch.progId}" style="width: ${isDone ? "100%" : "20%"}"></div>
      </div>
      <div class="card-action-row">
        <button class="btn-primary start-chapter-btn" data-chapter="${ch.key}">Start Unit 🚀</button>
      </div>
    `;

    card.querySelector(".start-chapter-btn").addEventListener("click", () => {
      sfx.pop();
      startQuizSession(ch.key, ch.title);
    });

    container.appendChild(card);
  });
}

function updateMockExamIntroForSubject() {
  const isMath = AppState.currentSubject === "math";
  const title = document.getElementById("exam-title-text");
  const desc = document.getElementById("exam-desc-text");
  const badge = document.getElementById("exam-badge-label");

  if (title) title.textContent = isMath ? "Grand Mathematics Mock Exam 📝" : "Grand Examen Blanc de Français 📝";
  if (desc) desc.textContent = isMath
    ? "This 15-question simulated assessment covers Unit 3 (Operations, Estimation, PEMDAS), Unit 5 (Tables 2-15, Factors, Multiples), Place Value, Negative Numbers, and Time!"
    : "Cet examen simule ton contrôle de mi-trimestre ! Il couvre les 3 chapitres, les verbes pronominaux, la conjugaison, les nationalités, les prépositions et les articles partitifs.";
  if (badge) badge.textContent = isMath ? "🎯 Grade 3 Summative Assessment 1 Simulation" : "🎯 Évaluation Complète de Mi-Trimestre";
}

// =============================================================================
// 12. QUIZ CONTROLLER (DYNAMIC)
// =============================================================================

function startQuizSession(chapterKey, title) {
  const isMath = AppState.currentSubject === "math";
  if (isMath) {
    AppState.currentQuiz = generateDynamicMathQuiz(chapterKey, 6);
  } else {
    AppState.currentQuiz = [
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question(),
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question(),
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question(),
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question(),
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question(),
      chapterKey === "ch1" ? generateFrenchCh1Question() :
      chapterKey === "ch2" ? generateFrenchCh2Question() :
      chapterKey === "ch3" ? generateFrenchCh3Question() :
      generateFrenchCh4Question()
    ];
  }

  AppState.currentQuizKey = chapterKey;
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = false;

  document.getElementById("quiz-topic-title").textContent = title || "Quiz";
  showView("view-quiz");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qList = AppState.currentQuiz;
  const idx = AppState.quizIndex;
  const q = qList[idx];

  document.getElementById("quiz-current-num").textContent = idx + 1;
  document.getElementById("quiz-total-num").textContent = qList.length;
  const pct = ((idx + 1) / qList.length) * 100;
  document.getElementById("quiz-progress-fill").style.width = `${pct}%`;

  const feedback = document.getElementById("quiz-feedback-banner");
  feedback.classList.remove("show", "correct", "incorrect");

  document.getElementById("question-category").textContent = q.category || "General";
  document.getElementById("question-french-text").textContent = q.fr;
  document.getElementById("question-english-hint").textContent = q.en ? `"${q.en}"` : "";

  const frenchAudioBtn = document.getElementById("btn-speak-french");
  const englishAudioBtn = document.getElementById("btn-speak-english");

  frenchAudioBtn.onclick = () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(q.audio || q.fr, q.lang || "fr-FR", speed);
  };

  englishAudioBtn.onclick = () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(q.en, "en-US", speed);
  };

  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";

  const letters = ["A", "B", "C", "D"];
  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.innerHTML = `
      <span class="option-letter">${letters[optIdx]}</span>
      <span class="option-text">${optText}</span>
    `;

    btn.addEventListener("click", () => handleQuizAnswer(optIdx, btn, q));
    container.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIdx, btnElement, question) {
  const allBtns = document.querySelectorAll(".quiz-option-btn");
  allBtns.forEach(b => (b.disabled = true));

  const isCorrect = selectedIdx === question.correct;
  AppState.quizAnswersHistory.push({
    question: question.fr,
    chosen: question.options[selectedIdx],
    correctAnswer: question.options[question.correct],
    explanation: question.explanation,
    isCorrect: isCorrect
  });

  const feedback = document.getElementById("quiz-feedback-banner");
  const fbTitle = document.getElementById("feedback-title");
  const fbExp = document.getElementById("feedback-explanation");
  const fbIcon = document.getElementById("feedback-icon");
  const fbCorrectRow = document.getElementById("feedback-correct-answer-row");
  const fbCorrectText = document.getElementById("feedback-correct-text");
  const fbMascotAvatar = document.getElementById("feedback-mascot-avatar");
  const speakExpBtn = document.getElementById("btn-speak-explanation");

  const isMath = AppState.currentSubject === "math";
  if (fbMascotAvatar) fbMascotAvatar.textContent = isMath ? "🦊" : "🦊";

  const explanationText = question.explanation;
  const speed = document.getElementById("audio-speed-select").value;

  if (isCorrect) {
    btnElement.classList.add("correct");
    sfx.correct();
    confetti.blast();
    AppState.quizScore++;
    addXP(20);

    if (fbIcon) fbIcon.textContent = "🎉";
    if (fbTitle) {
      fbTitle.textContent = isMath ? "Brilliant Aezza! That's 100% Correct!" : "Bravo Aezza ! C'est parfait !";
      fbTitle.style.color = "#15803d";
    }
    if (fbCorrectRow) fbCorrectRow.style.display = "none";
    feedback.className = "feedback-banner show correct";
    voice.speak(question.audio || question.fr, isMath ? "en-US" : "fr-FR", speed);
  } else {
    btnElement.classList.add("incorrect");
    allBtns[question.correct].classList.add("correct");
    sfx.incorrect();

    if (fbIcon) fbIcon.textContent = "💡";
    if (fbTitle) {
      fbTitle.textContent = isMath ? "💡 Professor Coco Explains:" : "💡 Coco t'explique la règle :";
      fbTitle.style.color = "#c2410c";
    }
    if (fbCorrectRow && fbCorrectText) {
      fbCorrectRow.style.display = "flex";
      fbCorrectText.textContent = question.options[question.correct];
    }
    feedback.className = "feedback-banner show incorrect";

    // Coco reads the explanation directly out loud to teach Aezza!
    const spokenExplanation = isMath
      ? `The correct answer is ${question.options[question.correct]}. Here is why: ${explanationText}`
      : `La bonne réponse est ${question.options[question.correct]}. Voici pourquoi : ${explanationText}`;
    voice.speak(spokenExplanation, isMath ? "en-US" : "fr-FR", speed);
  }

  if (fbExp) fbExp.textContent = explanationText;

  if (speakExpBtn) {
    speakExpBtn.onclick = () => {
      sfx.pop();
      const curSpeed = document.getElementById("audio-speed-select").value;
      const spokenExplanation = isMath
        ? `The correct answer is ${question.options[question.correct]}. Here is why: ${explanationText}`
        : `La bonne réponse est ${question.options[question.correct]}. Voici pourquoi : ${explanationText}`;
      voice.speak(spokenExplanation, isMath ? "en-US" : "fr-FR", curSpeed);
    };
  }
}

function initQuizListeners() {
  document.getElementById("btn-next-question").addEventListener("click", () => {
    sfx.pop();
    AppState.quizIndex++;
    if (AppState.quizIndex < AppState.currentQuiz.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  });

  document.getElementById("quiz-back-btn").addEventListener("click", () => {
    sfx.pop();
    if (AppState.isMockExam) {
      showView("view-mock-exam");
    } else {
      showView("view-adventure");
    }
  });
}

function finishQuiz() {
  if (AppState.isMockExam) {
    showExamResults();
  } else {
    sfx.fanfare();
    confetti.blast();
    const chKey = AppState.currentQuizKey;
    if (chKey) {
      AppState.completedChapters[chKey] = true;
      renderAdventureGrid();
      saveState();
      checkBadges();
    }
    showToast("🎉", `Session Finished! Score: ${AppState.quizScore} / ${AppState.currentQuiz.length}`);
    addXP(50);
    showView("view-adventure");
  }
}

// =============================================================================
// 13. UNSCRAMBLE / EQUATION BUILDER GAME
// =============================================================================

function updateUnscrambleForSubject() {
  const isMath = AppState.currentSubject === "math";
  const title = document.getElementById("unscramble-title");
  const desc = document.getElementById("unscramble-desc");
  const badge = document.getElementById("unscramble-badge-pill");
  const label = document.getElementById("unscramble-hint-label");

  if (title) title.textContent = isMath ? "Equation & Math Builder 🧩" : "Remets les Mots dans l'Ordre ! 🧩";
  if (desc) desc.textContent = isMath
    ? "Click the numbers, operators, and brackets in the correct mathematical order!"
    : "Clique sur les étiquettes pour construire la phrase française dans le bon ordre grammatical.";
  if (badge) badge.textContent = isMath ? "⚡ Mental Math & PEMDAS" : "🧩 Exercice Spécial Examen";
  if (label) label.textContent = isMath ? "🎯 Target mathematical equation:" : "🎯 Signification en anglais :";

  AppState.unscramblePuzzles = isMath
    ? generateDynamicMathUnscramblePuzzles(6)
    : generateDynamicFrenchUnscramblePuzzles(6);
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
      AppState.unscramblePuzzles = AppState.currentSubject === "math"
        ? generateDynamicMathUnscramblePuzzles(6)
        : generateDynamicFrenchUnscramblePuzzles(6);
      AppState.unscrambleIndex = 0;
      showToast("✨", "New dynamic set generated!");
    }
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-unscramble-speak").addEventListener("click", () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const puzzle = AppState.unscramblePuzzles[AppState.unscrambleIndex];
    voice.speak(puzzle.audio, AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);
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
    dropZone.innerHTML = `<span class="placeholder-text" id="drop-placeholder">Click tiles below to build...</span>`;
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
        voice.speak(tok.text, AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);
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
    saveState();
    if (AppState.unscrambleSolved >= 6) {
      unlockTrophy("trophy-unscramble", "🧩 Puzzle Genius Unlocked!");
    }

    fbIcon.textContent = "🎉";
    fbTitle.textContent = "Perfect! That's 100% correct!";
    fbText.textContent = `Model: "${puzzle.audio}"`;
    feedback.className = "feedback-banner show correct";

    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(puzzle.audio, AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);
  } else {
    sfx.incorrect();
    fbIcon.textContent = "🤔";
    fbTitle.textContent = "Almost! Check the order carefully.";
    fbText.textContent = "Tip: Listen to the audio hint above!";
    feedback.className = "feedback-banner show incorrect";
  }
}

// =============================================================================
// 14. MATCHING PAIRS GAME
// =============================================================================

function updateMatchingTabsForSubject() {
  const container = document.getElementById("matching-category-tabs-container");
  if (!container) return;

  const isMath = AppState.currentSubject === "math";
  const tabs = isMath ? [
    { key: "tables", label: "✖️ Tables (2-15)" },
    { key: "factors", label: "🔍 Factors & Multiples" },
    { key: "placevalue", label: "📊 Expanded Form" },
    { key: "evenodd", label: "⚡ Even & Odd Rules" }
  ] : [
    { key: "nationalities", label: "👥 Nationalités (Masc ↔ Fem)" },
    { key: "prepositions", label: "🌍 Pays & Prépositions" },
    { key: "partitives", label: "🥐 Nourriture & Partitifs" }
  ];

  AppState.matchingCategory = tabs[0].key;
  container.innerHTML = "";

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

function initMatchingGame() {
  document.getElementById("btn-matching-replay-cat").addEventListener("click", () => {
    sfx.pop();
    setupMatchingBoard();
  });

  document.getElementById("btn-match-next-cat").addEventListener("click", () => {
    sfx.pop();
    const isMath = AppState.currentSubject === "math";
    const cats = isMath ? ["tables", "factors", "placevalue", "evenodd"] : ["nationalities", "prepositions", "partitives"];
    const curIdx = cats.indexOf(AppState.matchingCategory);
    const nextCat = cats[(curIdx + 1) % cats.length];
    AppState.matchingCategory = nextCat;

    const allBtns = document.querySelectorAll(".match-cat-btn");
    allBtns.forEach(b => b.classList.toggle("active", b.dataset.matchCat === nextCat));
    setupMatchingBoard();
  });

  updateMatchingTabsForSubject();
}

function setupMatchingBoard() {
  const pairs = generateDynamicMatchingPairs(AppState.currentSubject, AppState.matchingCategory, 5);
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
  voice.speak(tileData.text.split("(")[0], AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);

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
          unlockTrophy(AppState.currentSubject === "math" ? "trophy-math-factors" : "trophy-matching");
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

// =============================================================================
// 15. FLASHCARDS CONTROLLER
// =============================================================================

function updateFlashcardTabsForSubject() {
  const container = document.getElementById("flashcard-tabs-container");
  if (!container) return;

  const isMath = AppState.currentSubject === "math";
  const tabs = isMath ? [
    { key: "pemdas", label: "⚡ PEMDAS & Even/Odd" },
    { key: "tables", label: "✖️ Tables 2-15 Trainer" },
    { key: "placevalue", label: "📊 Place Value & Negatives" },
    { key: "time", label: "⏰ Clocks & Conversions" }
  ] : [
    { key: "verbes", label: "⏰ Verbes Pronominaux" },
    { key: "conjugaison", label: "✏️ Conjugaison (Aller, Aimer...)" },
    { key: "nationalites", label: "🌎 Nationalités & Pays" },
    { key: "repas", label: "🍳 Les Repas & Boissons" }
  ];

  AppState.flashcardCategory = tabs[0].key;
  AppState.flashcardIndex = 0;
  container.innerHTML = "";

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
    const list = STATIC_FLASHCARDS[AppState.currentSubject][AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex - 1 + list.length) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("btn-fc-next").addEventListener("click", () => {
    sfx.pop();
    const list = STATIC_FLASHCARDS[AppState.currentSubject][AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex + 1) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("fc-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = STATIC_FLASHCARDS[AppState.currentSubject][AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.fr, AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);
  });

  document.getElementById("fc-example-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = STATIC_FLASHCARDS[AppState.currentSubject][AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.exampleFr, AppState.currentSubject === "math" ? "en-US" : "fr-FR", speed);
  });

  updateFlashcardTabsForSubject();
}

function renderFlashcard() {
  const catList = STATIC_FLASHCARDS[AppState.currentSubject];
  if (!catList || !catList[AppState.flashcardCategory]) return;
  const list = catList[AppState.flashcardCategory];
  const card = list[AppState.flashcardIndex];

  document.getElementById("fc-counter").textContent = `${AppState.flashcardIndex + 1} / ${list.length}`;
  document.getElementById("fc-emoji").textContent = card.emoji;
  document.getElementById("fc-french").textContent = card.fr;
  document.getElementById("fc-english").textContent = card.en;
  document.getElementById("fc-tag").textContent = card.tag;
  document.getElementById("fc-example-fr").textContent = `"${card.exampleFr}"`;
  document.getElementById("fc-example-en").textContent = `"${card.exampleEn}"`;
}

// =============================================================================
// 16. MOCK EXAM CONTROLLER (FRENCH & MATH)
// =============================================================================

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
  const isMath = AppState.currentSubject === "math";
  AppState.currentQuiz = isMath ? generateDynamicMathMockExam(15) : [
    generateFrenchCh1Question(), generateFrenchCh1Question(), generateFrenchCh1Question(), generateFrenchCh1Question(),
    generateFrenchCh2Question(), generateFrenchCh2Question(), generateFrenchCh2Question(), generateFrenchCh2Question(),
    generateFrenchCh3Question(), generateFrenchCh3Question(), generateFrenchCh3Question(), generateFrenchCh3Question(),
    generateFrenchCh4Question(), generateFrenchCh4Question(), generateFrenchCh4Question()
  ];

  AppState.currentQuizKey = isMath ? "math-exam" : "mock-exam";
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = true;

  document.getElementById("quiz-topic-title").textContent = isMath ? "Grand Mathematics Mock Exam 📝" : "Grand Examen Blanc de Français 📝";
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

  if (finalScore >= 13) {
    title.textContent = "Outstanding! 20/20 for Aezza! 🌟👑";
    msg.textContent = "You have mastered all syllabus topics for your Summative Assessment!";
    unlockTrophy(AppState.currentSubject === "math" ? "trophy-math-exam" : "trophy-exam");
  } else if (finalScore >= 10) {
    title.textContent = "Great Job Aezza! ✨";
    msg.textContent = "You scored well! Review the mistakes below to reach 100% on the real test.";
  } else {
    title.textContent = "Keep practicing! 💪";
    msg.textContent = "Review each unit in Adventure Mode to prepare for the test!";
  }

  const reviewBox = document.getElementById("exam-review-box");
  const isMath = AppState.currentSubject === "math";
  reviewBox.innerHTML = `<h3 style='margin-bottom:8px;'>${isMath ? "Question Breakdown & Explanations:" : "Détail de tes réponses & Explications :"}</h3>`;

  AppState.quizAnswersHistory.forEach((hist, i) => {
    const item = document.createElement("div");
    item.className = `review-item ${hist.isCorrect ? "pass" : "fail"}`;
    item.innerHTML = `
      <div class="review-q">Question ${i + 1}: ${hist.question}</div>
      <div class="review-ans">Your answer: <strong>${hist.chosen}</strong> ${hist.isCorrect ? "✅" : "❌"}</div>
      ${!hist.isCorrect ? `<div class="review-correct">✅ Correct answer: <strong>${hist.correctAnswer}</strong></div>` : ""}
      <div class="review-exp-row" style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:4px;">
        <div style="font-size:13px; color:#5e4f71; font-style:italic; flex:1;">💡 ${hist.explanation}</div>
        <button class="audio-btn-mini review-speak-btn" style="padding:4px 10px; font-size:11px;" title="Listen to Coco explain">
          🔊 Hear Coco
        </button>
      </div>
    `;

    const speakBtn = item.querySelector(".review-speak-btn");
    if (speakBtn) {
      speakBtn.onclick = () => {
        sfx.pop();
        const curSpeed = document.getElementById("audio-speed-select").value;
        const msg = isMath
          ? `For question ${i + 1}: The correct answer is ${hist.correctAnswer}. ${hist.explanation}`
          : `Pour la question ${i + 1} : La bonne réponse est ${hist.correctAnswer}. ${hist.explanation}`;
        voice.speak(msg, isMath ? "en-US" : "fr-FR", curSpeed);
      };
    }

    reviewBox.appendChild(item);
  });
}

// =============================================================================
// 17. INITIALIZATION & NAVIGATION
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  AuthController.init();
  initNavigation();
  initSubjectSwitcher();
  initMascot();
  initQuizListeners();
  initUnscrambleGame();
  initMatchingGame();
  initFlashcards();
  initMockExam();
  updateGamificationDisplay();
  checkBadges();
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
  const avatar = document.getElementById("avatar-badge");

  const speakMascot = () => {
    sfx.correct();
    confetti.blast();
    const isMath = AppState.currentSubject === "math";
    const quote = isMath
      ? pickRandom([
          "Remember: Parentheses come first in PEMDAS!",
          "Odd + Odd is always Even, and Odd × Odd is always Odd!",
          "Multiples of 12: 12, 24, 36, 48, 60, 72!",
          "Quarter past 4 means 4:15. You are doing amazing Aezza!",
          "You are going to get 100% in your Grade 3 Math Exam! 🌟"
        ])
      : pickRandom([
          "Bravo Aezza ! N'oublie pas : 'Je me lève', 'Tu te lèves' !",
          "Pour les repas : 'du pain', 'de la confiture', 'de l'eau' !",
          "À Paris, en France, au Canada, aux États-Unis !",
          "Tu es prête pour avoir 20/20 à ton examen de français ! 🌟"
        ]);

    if (mascotText) mascotText.textContent = `"${quote}"`;
    const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
    voice.speak(quote, isMath ? "en-US" : "fr-FR", speed);
  };

  if (voiceBtn && mascotText) {
    voiceBtn.addEventListener("click", () => {
      sfx.pop();
      const isMath = AppState.currentSubject === "math";
      const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
      voice.speak(mascotText.textContent.replace(/"/g, ""), isMath ? "en-US" : "fr-FR", speed);
    });
  }

  if (mascotBox) mascotBox.addEventListener("click", speakMascot);
  if (avatar) avatar.addEventListener("click", speakMascot);
}

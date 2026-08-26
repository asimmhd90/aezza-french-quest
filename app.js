/**
 * Aezza's French Quest - Interactive Web Quiz Engine
 * Built with Google Stitch Design System ("L'Aventure Pétillante")
 * Features: Dynamic Procedural Question Generation, Web Speech API Audio Reciter,
 *           Web Audio FX, Confetti, Toast Notifications, LocalStorage Persistence
 */

// =============================================================================
// 1. DYNAMIC VOCABULARY & GRAMMAR KNOWLEDGE BASE
// =============================================================================

const GRAMMAR_DB = {
  // Names & Subjects
  subjects: {
    firstSing: { text: "Je", pron: "me", pronVowel: "m'", endingEr: "e", aller: "vais", aimer: "J'aime", prefNeg: "Je n'aime pas", isFem: false, isPlur: false },
    secondSing: { text: "Tu", pron: "te", pronVowel: "t'", endingEr: "es", aller: "vas", aimer: "Tu aimes", prefNeg: "Tu n'aimes pas", isFem: false, isPlur: false },
    thirdSingMasc: [
      { text: "Luc", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Luc aime", prefNeg: "Luc n'aime pas", isFem: false, isPlur: false },
      { text: "Paul", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Paul aime", prefNeg: "Paul n'aime pas", isFem: false, isPlur: false },
      { text: "Marc", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Marc aime", prefNeg: "Marc n'aime pas", isFem: false, isPlur: false },
      { text: "Il", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Il aime", prefNeg: "Il n'aime pas", isFem: false, isPlur: false },
      { text: "Mon frère", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Mon frère aime", prefNeg: "Mon frère n'aime pas", isFem: false, isPlur: false }
    ],
    thirdSingFem: [
      { text: "Aezza", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Aezza aime", prefNeg: "Aezza n'aime pas", isFem: true, isPlur: false },
      { text: "Marie", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Marie aime", prefNeg: "Marie n'aime pas", isFem: true, isPlur: false },
      { text: "Sophie", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Sophie aime", prefNeg: "Sophie n'aime pas", isFem: true, isPlur: false },
      { text: "Elle", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Elle aime", prefNeg: "Elle n'aime pas", isFem: true, isPlur: false },
      { text: "Ma sœur", pron: "se", pronVowel: "s'", endingEr: "e", aller: "va", aimer: "Ma sœur aime", prefNeg: "Ma sœur n'aime pas", isFem: true, isPlur: false }
    ],
    firstPlur: { text: "Nous", pron: "nous", pronVowel: "nous", endingEr: "ons", aller: "allons", aimer: "Nous aimons", prefNeg: "Nous n'aimons pas", isFem: false, isPlur: true },
    secondPlur: { text: "Vous", pron: "vous", pronVowel: "vous", endingEr: "ez", aller: "allez", aimer: "Vous aimez", prefNeg: "Vous n'aimez pas", isFem: false, isPlur: true },
    thirdPlurMasc: [
      { text: "Ils", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Ils aiment", prefNeg: "Ils n'aiment pas", isFem: false, isPlur: true },
      { text: "Les enfants", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Les enfants aiment", prefNeg: "Les enfants n'aiment pas", isFem: false, isPlur: true },
      { text: "Mes parents", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Mes parents aiment", prefNeg: "Mes parents n'aiment pas", isFem: false, isPlur: true },
      { text: "Luc et Paul", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Luc et Paul aiment", prefNeg: "Luc et Paul n'aiment pas", isFem: false, isPlur: true }
    ],
    thirdPlurFem: [
      { text: "Elles", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Elles aiment", prefNeg: "Elles n'aiment pas", isFem: true, isPlur: true },
      { text: "Aezza et Marie", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Aezza et Marie aiment", prefNeg: "Aezza et Marie n'aiment pas", isFem: true, isPlur: true },
      { text: "Les filles", pron: "se", pronVowel: "s'", endingEr: "ent", aller: "vont", aimer: "Les filles aiment", prefNeg: "Les filles n'aiment pas", isFem: true, isPlur: true }
    ]
  },

  // Reflexive Verbs (Verbes Pronominaux)
  reflexiveVerbs: [
    {
      infinitive: "se réveiller",
      root: "réveill",
      meaning: "to wake up",
      startsVowel: false,
      times: ["à sept heures du matin", "à 6h30", "tôt le matin", "à huit heures"]
    },
    {
      infinitive: "se lever",
      root: "lèv",
      rootPlur: "lev",
      meaning: "to get out of bed",
      startsVowel: false,
      times: ["rapidement", "aussitôt", "à 7 heures", "avec le sourire"]
    },
    {
      infinitive: "se doucher",
      root: "douch",
      meaning: "to take a shower",
      startsVowel: false,
      times: ["dans la salle de bain", "avant l'école", "le matin", "après le sport"]
    },
    {
      infinitive: "se brosser les dents",
      root: "bross",
      suffix: "les dents",
      meaning: "to brush teeth",
      startsVowel: false,
      times: ["après le petit déjeuner", "avant d'aller au lit", "dans la salle de bain"]
    },
    {
      infinitive: "s'habiller",
      root: "habill",
      meaning: "to get dressed",
      startsVowel: true,
      times: ["pour aller à l'école", "dans sa chambre", "rapidement", "avec de jolis vêtements"]
    },
    {
      infinitive: "se coucher",
      root: "couch",
      meaning: "to go to bed",
      startsVowel: false,
      times: ["à vingt et une heures", "le soir à 20h30", "de bonne heure", "après le dîner"]
    },
    {
      infinitive: "se reposer",
      root: "repos",
      meaning: "to rest",
      startsVowel: false,
      times: ["dans le salon", "après l'école", "le week-end", "l'après-midi"]
    },
    {
      infinitive: "se dépêcher",
      root: "dépêch",
      meaning: "to hurry",
      startsVowel: false,
      times: ["pour ne pas être en retard", "le matin", "pour prendre le bus"]
    }
  ],

  // Core ER verbs & Irregular Aller
  regularErVerbs: [
    { infinitive: "aimer", root: "aim", meaning: "to like/love", startsVowel: true },
    { infinitive: "parler", root: "parl", meaning: "to speak", startsVowel: false },
    { infinitive: "regarder", root: "regard", meaning: "to watch", startsVowel: false },
    { infinitive: "habiter", root: "habit", meaning: "to live in", startsVowel: true }
  ],

  // Countries & Prepositions (à, en, au, aux) & Nationalities
  places: [
    // Feminine / Vowel countries -> EN
    { name: "France", type: "country-fem", prep: "en", mascNat: "français", femNat: "française", mascPlurNat: "français", femPlurNat: "françaises" },
    { name: "Inde", type: "country-vowel", prep: "en", mascNat: "indien", femNat: "indienne", mascPlurNat: "indiens", femPlurNat: "indiennes" },
    { name: "Italie", type: "country-vowel", prep: "en", mascNat: "italien", femNat: "italienne", mascPlurNat: "italiens", femPlurNat: "italiennes" },
    { name: "Espagne", type: "country-vowel", prep: "en", mascNat: "espagnol", femNat: "espagnole", mascPlurNat: "espagnols", femPlurNat: "espagnoles" },
    { name: "Angleterre", type: "country-vowel", prep: "en", mascNat: "anglais", femNat: "anglaise", mascPlurNat: "anglais", femPlurNat: "anglaises" },
    { name: "Allemagne", type: "country-vowel", prep: "en", mascNat: "allemand", femNat: "allemande", mascPlurNat: "allemands", femPlurNat: "allemandes" },
    { name: "Australie", type: "country-vowel", prep: "en", mascNat: "australien", femNat: "australienne", mascPlurNat: "australiens", femPlurNat: "australiennes" },
    { name: "Chine", type: "country-fem", prep: "en", mascNat: "chinois", femNat: "chinoise", mascPlurNat: "chinois", femPlurNat: "chinoises" },
    { name: "Suisse", type: "country-fem", prep: "en", mascNat: "suisse", femNat: "suisse", mascPlurNat: "suisses", femPlurNat: "suisses" },
    { name: "Belgique", type: "country-fem", prep: "en", mascNat: "belge", femNat: "belge", mascPlurNat: "belges", femPlurNat: "belges" },

    // Masculine countries -> AU
    { name: "Canada", type: "country-masc", prep: "au", mascNat: "canadien", femNat: "canadienne", mascPlurNat: "canadiens", femPlurNat: "canadiennes" },
    { name: "Japon", type: "country-masc", prep: "au", mascNat: "japonais", femNat: "japonaise", mascPlurNat: "japonais", femPlurNat: "japonaises" },
    { name: "Mexique", type: "country-masc", prep: "au", mascNat: "mexicain", femNat: "mexicaine", mascPlurNat: "mexicains", femPlurNat: "mexicaines" },
    { name: "Portugal", type: "country-masc", prep: "au", mascNat: "portugais", femNat: "portugaise", mascPlurNat: "portugais", femPlurNat: "portugaises" },
    { name: "Brésil", type: "country-masc", prep: "au", mascNat: "brésilien", femNat: "brésilienne", mascPlurNat: "brésiliens", femPlurNat: "brésiliennes" },
    { name: "Maroc", type: "country-masc", prep: "au", mascNat: "marocain", femNat: "marocaine", mascPlurNat: "marocains", femPlurNat: "marocaines" },
    { name: "Danemark", type: "country-masc", prep: "au", mascNat: "danois", femNat: "danoise", mascPlurNat: "danois", femPlurNat: "danoises" },

    // Plural countries -> AUX
    { name: "États-Unis", type: "country-plur", prep: "aux", mascNat: "américain", femNat: "américaine", mascPlurNat: "américains", femPlurNat: "américaines" },
    { name: "Pays-Bas", type: "country-plur", prep: "aux", mascNat: "néerlandais", femNat: "néerlandaise", mascPlurNat: "néerlandais", femPlurNat: "néerlandaises" },
    { name: "Émirats Arabes Unis", type: "country-plur", prep: "aux", mascNat: "émirien", femNat: "émirienne", mascPlurNat: "émiriens", femPlurNat: "émiriennes" },

    // Cities -> À
    { name: "Paris", type: "city", prep: "à" },
    { name: "Lyon", type: "city", prep: "à" },
    { name: "Marseille", type: "city", prep: "à" },
    { name: "Nice", type: "city", prep: "à" },
    { name: "Bordeaux", type: "city", prep: "à" },
    { name: "Londres", type: "city", prep: "à" },
    { name: "Delhi", type: "city", prep: "à" },
    { name: "Mumbai", type: "city", prep: "à" },
    { name: "Rome", type: "city", prep: "à" },
    { name: "Madrid", type: "city", prep: "à" },
    { name: "Tokyo", type: "city", prep: "à" },
    { name: "Montréal", type: "city", prep: "à" },
    { name: "Genève", type: "city", prep: "à" }
  ],

  // Food & Meals (Articles Partitifs & Vocabulaire)
  food: {
    masculine: [
      { name: "pain", en: "bread", emoji: "🥖" },
      { name: "croissant", en: "croissant", emoji: "🥐" },
      { name: "fromage", en: "cheese", emoji: "🧀" },
      { name: "beurre", en: "butter", emoji: "🧈" },
      { name: "poulet", en: "chicken", emoji: "🍗" },
      { name: "poisson", en: "fish", emoji: "🐟" },
      { name: "chocolat", en: "chocolate", emoji: "🍫" },
      { name: "riz", en: "rice", emoji: "🍚" },
      { name: "gâteau", en: "cake", emoji: "🍰" },
      { name: "lait", en: "milk", emoji: "🥛" },
      { name: "jus d'orange", en: "orange juice", emoji: "🧃" },
      { name: "café", en: "coffee", emoji: "☕" },
      { name: "thé", en: "tea", emoji: "🍵" }
    ],
    feminine: [
      { name: "confiture", en: "jam", emoji: "🍓" },
      { name: "salade", en: "salad", emoji: "🥗" },
      { name: "soupe", en: "soup", emoji: "🍲" },
      { name: "viande", en: "meat", emoji: "🥩" },
      { name: "glace", en: "ice cream", emoji: "🍨" },
      { name: "pizza", en: "pizza", emoji: "🍕" },
      { name: "tarte", en: "pie", emoji: "🥧" },
      { name: "brioche", en: "brioche", emoji: "🍞" }
    ],
    vowel: [
      { name: "eau fraîche", en: "fresh water", emoji: "💧" },
      { name: "orangeade", en: "orange soda", emoji: "🥤" },
      { name: "huile d'olive", en: "olive oil", emoji: "🫒" },
      { name: "ananas", en: "pineapple", emoji: "🍍" }
    ],
    plural: [
      { name: "fruits", en: "fruits", emoji: "🍎" },
      { name: "légumes", en: "vegetables", emoji: "🥦" },
      { name: "croissants chauds", en: "warm croissants", emoji: "🥐" },
      { name: "biscuits", en: "cookies", emoji: "🍪" },
      { name: "céréales", en: "cereal", emoji: "🥣" },
      { name: "frites", en: "fries", emoji: "🍟" },
      { name: "pommes", en: "apples", emoji: "🍏" },
      { name: "bananes", en: "bananas", emoji: "🍌" },
      { name: "œufs", en: "eggs", emoji: "🥚" }
    ]
  },

  meals: [
    { fr: "le petit déjeuner", en: "breakfast", time: "le matin", typical: "du croissant et du lait" },
    { fr: "le déjeuner", en: "lunch", time: "à midi", typical: "du poulet et de la salade" },
    { fr: "le goûter", en: "afternoon snack", time: "à quatre heures de l'après-midi", typical: "des biscuits et du jus de fruit" },
    { fr: "le dîner", en: "dinner", time: "le soir en famille", typical: "de la soupe et des légumes" }
  ],

  hobbies: [
    { verb: "jouer au football", en: "playing soccer", emoji: "⚽" },
    { verb: "jouer au tennis", en: "playing tennis", emoji: "🎾" },
    { verb: "jouer aux jeux vidéo", en: "playing video games", emoji: "🎮" },
    { verb: "écouter de la musique", en: "listening to music", emoji: "🎵" },
    { verb: "regarder des dessins animés", en: "watching cartoons", emoji: "📺" },
    { verb: "lire des livres", en: "reading books", emoji: "📚" },
    { verb: "dessiner de jolis dessins", en: "drawing pretty pictures", emoji: "🎨" },
    { verb: "nager dans la piscine", en: "swimming in the pool", emoji: "🏊‍♀️" },
    { verb: "faire du vélo", en: "riding a bicycle", emoji: "🚲" },
    { verb: "danser", en: "dancing", emoji: "💃" }
  ]
};

// =============================================================================
// 2. PROCEDURAL QUESTION GENERATORS
// =============================================================================

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function getRandomSubject() {
  const groups = ["firstSing", "secondSing", "thirdSingMasc", "thirdSingFem", "firstPlur", "secondPlur", "thirdPlurMasc", "thirdPlurFem"];
  const groupKey = pickRandom(groups);
  const val = GRAMMAR_DB.subjects[groupKey];
  return Array.isArray(val) ? pickRandom(val) : val;
}

// Generator: Chapter 1 (Verbes Pronominaux & Daily Routine)
function generateChapter1Question() {
  const subj = getRandomSubject();
  const verb = pickRandom(GRAMMAR_DB.reflexiveVerbs);
  const time = pickRandom(verb.times);
  const qType = pickRandom(["pronoun", "conjugation", "full", "negative"]);

  // Calculate correct conjugated verb stem & ending
  let root = verb.root;
  if (subj.text === "Nous" && verb.rootPlur) root = verb.rootPlur;
  if (subj.text === "Vous" && verb.rootPlur) root = verb.rootPlur;

  const conjVerb = root + subj.endingEr;
  const pron = verb.startsVowel ? subj.pronVowel : subj.pron;
  const fullReflexive = `${pron} ${conjVerb}`.replace(/\s+/g, " ");

  if (qType === "pronoun") {
    const isVowel = verb.startsVowel;
    const correctPron = isVowel ? subj.pronVowel : subj.pron;
    const sentence = `${subj.text} ______ ${conjVerb} ${verb.suffix || ""} ${time}.`;
    const fullAudio = `${subj.text} ${correctPron} ${conjVerb} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const distractors = ["me", "te", "se", "nous", "vous"].filter(p => p !== subj.pron).slice(0, 3);
    const options = shuffle([correctPron, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctPron),
      explanation: `Pour le sujet "${subj.text}", le pronom réfléchi est "${correctPron}".`
    };
  } else if (qType === "conjugation") {
    const sentence = `${subj.text} ${pron} ______ ${verb.suffix || ""} ${time}. (${verb.infinitive})`;
    const fullAudio = `${subj.text} ${pron} ${conjVerb} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const endings = ["e", "es", "ons", "ez", "ent"].filter(e => e !== subj.endingEr);
    const distractors = endings.slice(0, 3).map(e => (verb.rootPlur && (e === "ons" || e === "ez") ? verb.rootPlur : verb.root) + e);
    const options = shuffle([conjVerb, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(conjVerb),
      explanation: `Avec "${subj.text}", le verbe "${verb.infinitive}" se conjugue "${conjVerb}" (terminaison -${subj.endingEr}).`
    };
  } else if (qType === "negative") {
    const isVowelPron = pron.endsWith("'");
    const negPrefix = isVowelPron ? "ne " : "ne ";
    const sentence = `${subj.text} ${negPrefix}______ pas ${verb.suffix || ""} ${time}.`;
    const correctAns = `${pron} ${conjVerb}`;
    const fullAudio = `${subj.text} ne ${pron} ${conjVerb} pas ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");

    const wrongPron = subj.pron === "se" ? "me" : subj.pron === "nous" ? "vous" : "se";
    const distractors = [
      `${wrongPron} ${conjVerb}`,
      `${pron} ${verb.infinitive}`,
      `${pron} ${verb.root}ez`
    ];
    const options = shuffle([correctAns, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} does not (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctAns),
      explanation: `À la forme négative des verbes pronominaux, on dit : "ne + [pronom réfléchi + verbe] + pas".`
    };
  } else {
    // Full reflexive form selection
    const sentence = `${subj.text} ______ ${verb.suffix || ""} ${time}. (${verb.infinitive})`;
    const fullAudio = `${subj.text} ${fullReflexive} ${verb.suffix || ""} ${time}.`.replace(/\s+/g, " ");
    const distractors = [
      `se ${verb.root}e`,
      `me ${verb.root}e`,
      `nous ${verb.root}ons`,
      `te ${verb.root}es`
    ].filter(d => d !== fullReflexive).slice(0, 3);
    const options = shuffle([fullReflexive, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} (${verb.meaning}) ${time}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(fullReflexive),
      explanation: `La forme correcte pour "${subj.text}" est "${fullReflexive}".`
    };
  }
}

// Generator: Chapter 2 (Nationalités & Prépositions)
function generateChapter2Question() {
  const qType = pickRandom(["prep-city-country", "nationality-gender", "nationality-plural", "prep-plural-country"]);
  const countries = GRAMMAR_DB.places.filter(p => p.type.startsWith("country"));
  const cities = GRAMMAR_DB.places.filter(p => p.type === "city");

  if (qType === "prep-city-country") {
    const isCity = Math.random() > 0.5;
    const place = isCity ? pickRandom(cities) : pickRandom(countries);
    const subj = pickRandom([
      { name: "Luc", verb: "habite" },
      { name: "Aezza", verb: "voyage" },
      { name: "Paul", verb: "va" },
      { name: "Nous", verb: "allons" },
      { name: "Marie", verb: "habite" }
    ]);

    const sentence = `${subj.name} ${subj.verb} ______ ${place.name}.`;
    const fullAudio = `${subj.name} ${subj.verb} ${place.prep} ${place.name}.`;
    const distractors = ["à", "en", "au", "aux"].filter(p => p !== place.prep);
    const options = shuffle([place.prep, ...distractors]);

    let reason = "";
    if (place.type === "city") reason = `Pour toutes les villes (${place.name}), on utilise la préposition "à".`;
    else if (place.type === "country-fem") reason = `"${place.name}" est un pays féminin -> on utilise "en".`;
    else if (place.type === "country-vowel") reason = `"${place.name}" commence par une voyelle -> on utilise "en".`;
    else if (place.type === "country-masc") reason = `"${place.name}" est un pays masculin -> on utilise "au".`;
    else reason = `"${place.name}" est un nom de pays au pluriel -> on utilise "aux".`;

    return {
      fr: sentence,
      en: `${subj.name} ${subj.verb === "habite" ? "lives in" : subj.verb === "voyage" ? "travels to" : "goes to"} ${place.name}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(place.prep),
      explanation: reason
    };
  } else if (qType === "nationality-gender") {
    const country = pickRandom(countries.filter(c => c.mascNat && c.femNat));
    const isFem = Math.random() > 0.5;
    const person = isFem ? pickRandom(["Marie", "Aezza", "Sophie", "Elle", "Ma cousine"]) : pickRandom(["Luc", "Paul", "Marc", "Il", "Mon cousin"]);
    const correctNat = isFem ? country.femNat : country.mascNat;
    const sentence = `${person} habite ${country.prep} ${country.name}, ${isFem ? "elle" : "il"} est ______ .`;
    const fullAudio = `${person} habite ${country.prep} ${country.name}, ${isFem ? "elle" : "il"} est ${correctNat}.`;

    const distractors = [
      isFem ? country.mascNat : country.femNat,
      country.mascPlurNat,
      country.femPlurNat
    ].filter(n => n !== correctNat);

    // Make sure we have 4 options
    while (distractors.length < 3) {
      distractors.push(country.name.toLowerCase());
    }
    const options = shuffle([correctNat, ...distractors.slice(0, 3)]);

    return {
      fr: sentence,
      en: `${person} lives in ${country.name}, ${isFem ? "she" : "he"} is ${correctNat}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctNat),
      explanation: `${person} est ${isFem ? "féminin singulier -> on accorde avec '-e' (ou double consonne) : " + country.femNat : "masculin singulier -> " + country.mascNat}.`
    };
  } else if (qType === "nationality-plural") {
    const country = pickRandom(countries.filter(c => c.mascPlurNat && c.femPlurNat));
    const isFem = Math.random() > 0.5;
    const subject = isFem ? "Elles" : "Ils";
    const correctNat = isFem ? country.femPlurNat : country.mascPlurNat;
    const sentence = `${subject} sont nés ${country.prep} ${country.name}, ils sont ______ .`;
    const fullAudio = `${subject} sont nés ${country.prep} ${country.name}, ils sont ${correctNat}.`;

    const distractors = [
      isFem ? country.femNat : country.mascNat,
      isFem ? country.mascPlurNat : country.femNat,
      country.name.toLowerCase()
    ].filter(n => n !== correctNat);

    const options = shuffle([correctNat, ...distractors.slice(0, 3)]);

    return {
      fr: sentence,
      en: `${subject} were born in ${country.name}, they are ${correctNat}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(correctNat),
      explanation: `Au pluriel, la nationalité prend un '-s' : "${correctNat}".`
    };
  } else {
    // Plural country preposition
    const plurCountry = pickRandom(countries.filter(c => c.type === "country-plur"));
    const sentence = `Mes grands-parents habitent ______ ${plurCountry.name}.`;
    const fullAudio = `Mes grands-parents habitent ${plurCountry.prep} ${plurCountry.name}.`;
    const distractors = ["au", "en", "à"];
    const options = shuffle([plurCountry.prep, ...distractors]);

    return {
      fr: sentence,
      en: `My grandparents live in ${plurCountry.name}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(plurCountry.prep),
      explanation: `"${plurCountry.name}" est un nom de pays pluriel, on utilise toujours "aux".`
    };
  }
}

// Generator: Chapter 3 (La Bonne Nourriture & Articles Partitifs: du, de la, de l', des)
function generateChapter3Question() {
  const qType = pickRandom(["partitive-masc", "partitive-fem", "partitive-vowel", "partitive-plur", "meal-vocab", "negative-partitive"]);
  const subj = pickRandom(["Je mange", "Aezza prend", "Luc boit", "Nous voulons", "Tu manges", "Il prend"]);

  if (qType === "partitive-masc") {
    const item = pickRandom(GRAMMAR_DB.food.masculine);
    const sentence = `Au petit déjeuner, ${subj.toLowerCase()} ______ ${item.name}.`;
    const fullAudio = `Au petit déjeuner, ${subj.toLowerCase()} du ${item.name}.`;
    const options = shuffle(["du", "de la", "de l'", "des"]);

    return {
      fr: sentence,
      en: `For breakfast, ${subj} some ${item.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf("du"),
      explanation: `"${item.name}" est masculin singulier -> on utilise l'article partitif "du".`
    };
  } else if (qType === "partitive-fem") {
    const item = pickRandom(GRAMMAR_DB.food.feminine);
    const sentence = `À midi, ${subj.toLowerCase()} ______ ${item.name}.`;
    const fullAudio = `À midi, ${subj.toLowerCase()} de la ${item.name}.`;
    const options = shuffle(["de la", "du", "de l'", "des"]);

    return {
      fr: sentence,
      en: `At noon, ${subj} some ${item.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf("de la"),
      explanation: `"${item.name}" est féminin singulier -> on utilise l'article partitif "de la".`
    };
  } else if (qType === "partitive-vowel") {
    const item = pickRandom(GRAMMAR_DB.food.vowel);
    const sentence = `Quand j'ai soif, je bois ______ ${item.name}.`;
    const fullAudio = `Quand j'ai soif, je bois de l' ${item.name}.`;
    const options = shuffle(["de l'", "du", "de la", "des"]);

    return {
      fr: sentence,
      en: `When I am thirsty, I drink some ${item.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf("de l'"),
      explanation: `"${item.name}" commence par une voyelle -> on utilise l'article partitif "de l'".`
    };
  } else if (qType === "partitive-plur") {
    const item = pickRandom(GRAMMAR_DB.food.plural);
    const sentence = `Pour le dîner, nous préparons ______ ${item.name}.`;
    const fullAudio = `Pour le dîner, nous préparons des ${item.name}.`;
    const options = shuffle(["des", "du", "de la", "de l'"]);

    return {
      fr: sentence,
      en: `For dinner, we prepare some ${item.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf("des"),
      explanation: `"${item.name}" est au pluriel -> on utilise l'article partitif "des".`
    };
  } else if (qType === "negative-partitive") {
    const item = pickRandom([...GRAMMAR_DB.food.masculine, ...GRAMMAR_DB.food.feminine]);
    const sentence = `Luc n'aime pas cela, il ne mange pas ______ ${item.name}.`;
    const fullAudio = `Luc n'aime pas cela, il ne mange pas de ${item.name}.`;
    const options = shuffle(["de", "du", "de la", "des"]);

    return {
      fr: sentence,
      en: `Luc does not like that, he does not eat any ${item.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf("de"),
      explanation: `À la forme négative ("ne... pas"), les articles partitifs (du, de la, des) se transforment en "de" (ou "d'").`
    };
  } else {
    // Meal vocabulary
    const meal = pickRandom(GRAMMAR_DB.meals);
    const sentence = `Le repas que l'on prend ${meal.time} s'appelle ______ .`;
    const fullAudio = `Le repas que l'on prend ${meal.time} s'appelle ${meal.fr}.`;
    const distractors = GRAMMAR_DB.meals.filter(m => m.fr !== meal.fr).map(m => m.fr);
    const options = shuffle([meal.fr, ...distractors]);

    return {
      fr: sentence,
      en: `The meal eaten ${meal.time} is called ${meal.en}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(meal.fr),
      explanation: `Le repas pris ${meal.time} est bien "${meal.fr}".`
    };
  }
}

// Generator: Chapter 4 (Conjugaison Aller, Aimer, Parler, Regarder, Habiter & Mes Loisirs)
function generateChapter4Question() {
  const qType = pickRandom(["aller", "er-verbs", "habiter-vowel", "hobbies-like", "hobbies-dislike"]);
  const subj = getRandomSubject();

  if (qType === "aller") {
    const place = pickRandom(["au parc", "à l'école", "à la piscine", "à Paris", "au supermarché", "au cinéma"]);
    const sentence = `${subj.text} ______ ${place} en bus. (aller)`;
    const fullAudio = `${subj.text} ${subj.aller} ${place} en bus.`;
    const forms = ["vais", "vas", "va", "allons", "allez", "vont"];
    const distractors = forms.filter(f => f !== subj.aller).slice(0, 3);
    const options = shuffle([subj.aller, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} go(es) to the ${place} by bus.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(subj.aller),
      explanation: `Le verbe "aller" avec le sujet "${subj.text}" donne "${subj.aller}".`
    };
  } else if (qType === "er-verbs") {
    const verb = pickRandom(GRAMMAR_DB.regularErVerbs.filter(v => v.infinitive !== "habiter"));
    let obj = "français et anglais";
    if (verb.infinitive === "regarder") obj = "un beau dessin animé";
    if (verb.infinitive === "aimer") obj = "écouter de la musique";

    const conj = verb.root + subj.endingEr;
    const subjText = (verb.startsVowel && subj.text === "Je") ? "J'" : subj.text;
    const sentence = `${subjText} ______ ${obj}. (${verb.infinitive})`;
    const fullAudio = `${subjText} ${conj} ${obj}.`.replace(/'\s+/g, "'");

    const endings = ["e", "es", "ons", "ez", "ent"].filter(e => e !== subj.endingEr);
    const distractors = endings.slice(0, 3).map(e => verb.root + e);
    const options = shuffle([conj, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} (${verb.meaning}) ${obj}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(conj),
      explanation: `Pour les verbes en -er avec "${subj.text}", la terminaison est "-${subj.endingEr}" -> "${conj}".`
    };
  } else if (qType === "habiter-vowel") {
    const place = pickRandom(["à Paris", "dans une grande maison", "en France", "au Canada"]);
    const conj = "habit" + subj.endingEr;
    const subjText = subj.text === "Je" ? "J'" : subj.text;
    const sentence = `${subjText} ______ ${place}. (habiter)`;
    const fullAudio = `${subjText} ${conj} ${place}.`.replace(/'\s+/g, "'");

    const endings = ["e", "es", "ons", "ez", "ent"].filter(e => e !== subj.endingEr);
    const distractors = endings.slice(0, 3).map(e => "habit" + e);
    const options = shuffle([conj, ...distractors]);

    return {
      fr: sentence,
      en: `${subj.text} live(s) ${place}.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(conj),
      explanation: `Avec "${subj.text}", le verbe "habiter" se conjugue "${conj}".`
    };
  } else if (qType === "hobbies-like") {
    const hobby = pickRandom(GRAMMAR_DB.hobbies);
    const sentence = `Pendant mon temps libre, j'aime ______ .`;
    const fullAudio = `Pendant mon temps libre, j'aime ${hobby.verb}.`;

    const distractors = [
      hobby.verb.replace(/er\b/, "e"),
      hobby.verb.replace(/er\b/, "ons"),
      hobby.verb.replace(/er\b/, "ent")
    ].filter(d => d !== hobby.verb);

    while (distractors.length < 3) {
      distractors.push("joue");
    }
    const options = shuffle([hobby.verb, ...distractors.slice(0, 3)]);

    return {
      fr: sentence,
      en: `During my free time, I like (${hobby.en}).`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(hobby.verb),
      explanation: `Après le verbe "aimer", le second verbe reste toujours à l'infinitif : "${hobby.verb}".`
    };
  } else {
    // Negative hobbies
    const hobby = pickRandom(GRAMMAR_DB.hobbies);
    const sentence = `Aezza n'aime pas ______ le matin.`;
    const fullAudio = `Aezza n'aime pas ${hobby.verb} le matin.`;
    const distractors = [
      hobby.verb.replace(/er\b/, "e"),
      hobby.verb.replace(/er\b/, "es"),
      hobby.verb.replace(/er\b/, "ons")
    ].filter(d => d !== hobby.verb);

    while (distractors.length < 3) {
      distractors.push("fait");
    }
    const options = shuffle([hobby.verb, ...distractors.slice(0, 3)]);

    return {
      fr: sentence,
      en: `Aezza does not like (${hobby.en}) in the morning.`,
      audio: fullAudio,
      options: options,
      correct: options.indexOf(hobby.verb),
      explanation: `Après "ne pas aimer", le verbe d'action reste à l'infinitif : "${hobby.verb}".`
    };
  }
}

// Generate dynamic question by Chapter Key
function getDynamicChapterQuestion(chapterKey) {
  switch (chapterKey) {
    case "ch1": return generateChapter1Question();
    case "ch2": return generateChapter2Question();
    case "ch3": return generateChapter3Question();
    case "ch4": return generateChapter4Question();
    default: return generateChapter1Question();
  }
}

// Generate a full set of dynamic questions
function generateDynamicQuiz(chapterKey, count = 6) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(getDynamicChapterQuestion(chapterKey));
  }
  return questions;
}

// Generate Dynamic Mock Exam (15 questions balanced across all 4 chapters)
function generateDynamicMockExam(count = 15) {
  const questions = [];
  const generators = [
    generateChapter1Question,
    generateChapter1Question,
    generateChapter1Question,
    generateChapter1Question,
    generateChapter2Question,
    generateChapter2Question,
    generateChapter2Question,
    generateChapter2Question,
    generateChapter3Question,
    generateChapter3Question,
    generateChapter3Question,
    generateChapter3Question,
    generateChapter4Question,
    generateChapter4Question,
    generateChapter4Question
  ];

  shuffle(generators).slice(0, count).forEach(gen => {
    questions.push(gen());
  });

  return questions;
}

// =============================================================================
// 3. DYNAMIC WORD UNSCRAMBLE GENERATOR
// =============================================================================

function generateDynamicUnscramblePuzzles(count = 6) {
  const templates = [
    () => {
      const subj = pickRandom(["Luc", "Paul", "Marc", "Mon frère"]);
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
      const country = pickRandom(GRAMMAR_DB.places.filter(p => p.type.startsWith("country")));
      const subj = pickRandom(["Elle", "Sophie", "Marie"]);
      return {
        targetTokens: [subj, "habite", country.prep, country.name, "."],
        en: `${subj} lives in ${country.name}.`,
        audio: `${subj} habite ${country.prep} ${country.name}.`
      };
    },
    () => {
      const city = pickRandom(["Paris", "Lyon", "Marseille", "Rome", "Londres"]);
      return {
        targetTokens: ["Nous", "allons", "à", city, "en", "vacances", "."],
        en: `We are going to ${city} on vacation.`,
        audio: `Nous allons à ${city} en vacances.`
      };
    },
    () => {
      const drink = pickRandom(["de l' eau", "du jus", "du lait"]);
      return {
        targetTokens: ["Il", "boit", ...drink.split(" "), "fraîche", "."],
        en: `He drinks cold ${drink}.`,
        audio: `Il boit ${drink} fraîche.`
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
      const meal = pickRandom(["Au petit déjeuner", "Pour le dîner", "À midi"]);
      const food = pickRandom(["du pain", "de la salade", "des fruits"]);
      return {
        targetTokens: [...meal.split(" "), ",", "nous", "mangeons", ...food.split(" "), "."],
        en: `${meal}, we eat ${food}.`,
        audio: `${meal}, nous mangeons ${food}.`
      };
    },
    () => {
      const country = pickRandom(GRAMMAR_DB.places.filter(p => p.type === "country-masc"));
      return {
        targetTokens: ["Luc", "et", "Paul", "habitent", "au", country.name, "."],
        en: `Luc and Paul live in ${country.name}.`,
        audio: `Luc et Paul habitent au ${country.name}.`
      };
    }
  ];

  const picked = shuffle(templates).slice(0, count);
  return picked.map(tmplFn => {
    const p = tmplFn();
    p.scrambledTokens = shuffle([...p.targetTokens]);
    return p;
  });
}

// =============================================================================
// 4. DYNAMIC MATCHING PAIRS GENERATOR
// =============================================================================

function generateDynamicMatchingPairs(category, count = 5) {
  if (category === "nationalities") {
    const countries = shuffle(GRAMMAR_DB.places.filter(c => c.mascNat && c.femNat)).slice(0, count);
    return countries.map((c, idx) => ({
      left: `${c.mascNat.charAt(0).toUpperCase() + c.mascNat.slice(1)} (Masc)`,
      right: `${c.femNat.charAt(0).toUpperCase() + c.femNat.slice(1)} (Fém)`,
      id: idx + 1
    }));
  } else if (category === "prepositions") {
    const pool = shuffle(GRAMMAR_DB.places).slice(0, count);
    return pool.map((p, idx) => ({
      left: `${p.name} (${p.type === "city" ? "Ville" : p.type === "country-fem" ? "Pays Fém" : p.type === "country-masc" ? "Pays Masc" : "Pluriel"})`,
      right: `${p.prep} ${p.name}`,
      id: idx + 1
    }));
  } else {
    // Partitives
    const masc = shuffle(GRAMMAR_DB.food.masculine).slice(0, 2).map(f => ({ left: `${f.emoji} ${f.name} (M)`, right: `du ${f.name}` }));
    const fem = shuffle(GRAMMAR_DB.food.feminine).slice(0, 1).map(f => ({ left: `${f.emoji} ${f.name} (F)`, right: `de la ${f.name}` }));
    const vow = shuffle(GRAMMAR_DB.food.vowel).slice(0, 1).map(f => ({ left: `${f.emoji} ${f.name} (Voyelle)`, right: `de l'${f.name}` }));
    const plur = shuffle(GRAMMAR_DB.food.plural).slice(0, 1).map(f => ({ left: `${f.emoji} ${f.name} (Plur)`, right: `des ${f.name}` }));

    const combined = shuffle([...masc, ...fem, ...vow, ...plur]).slice(0, count);
    return combined.map((p, idx) => ({ ...p, id: idx + 1 }));
  }
}

// =============================================================================
// 5. AUDIO RECITER & SYNTHESIZED SOUND EFFECTS
// =============================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
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
    this.playBeep(523.25, "triangle", 0.15, 0);      // C5
    this.playBeep(659.25, "triangle", 0.15, 0.08);   // E5
    this.playBeep(783.99, "triangle", 0.18, 0.16);   // G5
    this.playBeep(1046.50, "sine", 0.35, 0.24);      // C6
  }

  incorrect() {
    this.playBeep(330, "sine", 0.18, 0);
    this.playBeep(260, "sine", 0.28, 0.12);
  }

  pop() {
    this.playBeep(600, "sine", 0.08, 0);
  }

  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
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
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();

      if (!this.frenchVoice) this.initVoices();

      const cleanText = text.replace(/_+/g, "").replace(/\s+/g, " ").trim();
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.rate = parseFloat(rate) || 0.9;
      utter.pitch = 1.08;

      if (lang.startsWith("fr")) {
        utter.lang = "fr-FR";
        if (this.frenchVoice) utter.voice = this.frenchVoice;
        AppState.audioListenCount++;
        checkAudioBadge();
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

// =============================================================================
// 6. CONFETTI & TOAST NOTIFICATIONS
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
    const colors = ["#ff529a", "#2eb872", "#0284c7", "#f59e0b", "#a855f7", "#ec4899", "#3b82f6"];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 + 50,
        r: Math.random() * 8 + 4,
        d: Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18 - 6,
        gravity: 0.35
      });
    }

    if (!this.animationId) {
      this.animate();
    }
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
// 7. MAIN APP STATE & LOCAL STORAGE PERSISTENCE
// =============================================================================

const AppState = {
  xp: 350,
  stars: 120,
  streak: 5,
  audioListenCount: 0,
  completedChapters: { ch1: false, ch2: false, ch3: false, ch4: false },
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
    const raw = localStorage.getItem("aezza_french_quest_state");
    if (raw) {
      const saved = JSON.parse(raw);
      AppState.xp = saved.xp || 350;
      AppState.stars = saved.stars || 120;
      AppState.streak = saved.streak || 5;
      AppState.completedChapters = saved.completedChapters || { ch1: false, ch2: false, ch3: false, ch4: false };
      AppState.audioListenCount = saved.audioListenCount || 0;
      AppState.unscrambleSolved = saved.unscrambleSolved || 0;
    }
  } catch (e) {
    console.warn("Storage read error:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem("aezza_french_quest_state", JSON.stringify({
      xp: AppState.xp,
      stars: AppState.stars,
      streak: AppState.streak,
      completedChapters: AppState.completedChapters,
      audioListenCount: AppState.audioListenCount,
      unscrambleSolved: AppState.unscrambleSolved
    }));
  } catch (e) {
    console.warn("Storage write error:", e);
  }
}

const MASCOT_QUOTES = [
  "Bravo Aezza ! Chaque quiz te donne de nouvelles questions magiques !",
  "N'oublie pas : 'Je me lève', 'Tu te lèves', 'Nous nous levons' !",
  "Pour les repas : 'du pain', 'de la confiture', 'de l'eau' et 'des croissants' !",
  "À Paris, en France, au Canada, aux États-Unis ! Bravo pour tes prépositions !",
  "Tu es prête pour avoir 20/20 à ton examen de mi-trimestre ! 🌟"
];

document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initNavigation();
  initMascot();
  initAdventureCards();
  initQuizListeners();
  initUnscrambleGame();
  initMatchingGame();
  initFlashcards();
  initMockExam();
  updateGamificationDisplay();
  updateChapterCardBadges();
  checkBadges();
});

function addXP(amount) {
  AppState.xp += amount;
  AppState.stars += Math.floor(amount / 10);
  updateGamificationDisplay();
  saveState();
  showToast("⚡", `+${amount} XP gagnés !`);
}

function updateGamificationDisplay() {
  const elXp = document.getElementById("stat-xp");
  const elStars = document.getElementById("stat-stars");
  const elStreak = document.getElementById("stat-streak");
  if (elXp) elXp.textContent = AppState.xp;
  if (elStars) elStars.textContent = AppState.stars;
  if (elStreak) elStreak.textContent = AppState.streak;
}

function updateChapterCardBadges() {
  ["ch1", "ch2", "ch3", "ch4"].forEach(key => {
    const isDone = AppState.completedChapters[key];
    const badge = document.getElementById(`badge-status-${key}`);
    const bar = document.getElementById(`prog-${key}`);
    if (badge && bar) {
      if (isDone) {
        badge.textContent = "⭐ Complété !";
        badge.className = "card-badge completed";
        bar.style.width = "100%";
      } else {
        bar.style.width = "20%";
      }
    }
  });
}

function checkAudioBadge() {
  if (AppState.audioListenCount >= 5) {
    unlockTrophy("trophy-voice", "🎙️ Oreille Musicale débloqué !");
  }
}

function unlockTrophy(trophyId, msg) {
  const el = document.getElementById(trophyId);
  if (el && !el.classList.contains("unlocked")) {
    el.classList.add("unlocked");
    const status = el.querySelector(".trophy-status");
    if (status) {
      status.className = "trophy-status";
      status.textContent = "Débloqué ✨";
    }
    showToast("🏆", msg || "Nouveau Trophée Débloqué !");
    sfx.fanfare();
    confetti.blast();
  }
}

function checkBadges() {
  if (AppState.completedChapters.ch1) unlockTrophy("trophy-ch1");
  if (AppState.completedChapters.ch2) unlockTrophy("trophy-ch2");
  if (AppState.completedChapters.ch3) unlockTrophy("trophy-ch3");
  if (AppState.completedChapters.ch4) unlockTrophy("trophy-ch4");
  if (AppState.unscrambleSolved >= 6) unlockTrophy("trophy-unscramble");
  if (AppState.audioListenCount >= 5) unlockTrophy("trophy-voice");
}

function initNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
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
  if (target) {
    target.classList.add("active");
  }
}

function initMascot() {
  const voiceBtn = document.getElementById("mascot-voice-btn");
  const mascotText = document.getElementById("mascot-text");
  const mascotBox = document.getElementById("mascot-click-target");
  const avatar = document.getElementById("avatar-badge");

  const speakMascot = () => {
    sfx.correct();
    confetti.blast();
    const quote = pickRandom(MASCOT_QUOTES);
    if (mascotText) mascotText.textContent = `"${quote}"`;
    const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
    voice.speak(quote, "fr-FR", speed);
  };

  if (voiceBtn && mascotText) {
    voiceBtn.addEventListener("click", () => {
      sfx.pop();
      const speed = document.getElementById("audio-speed-select") ? document.getElementById("audio-speed-select").value : 0.9;
      voice.speak(mascotText.textContent.replace(/"/g, ""), "fr-FR", speed);
    });
  }

  if (mascotBox) mascotBox.addEventListener("click", speakMascot);
  if (avatar) avatar.addEventListener("click", speakMascot);
}

// =============================================================================
// 8. CHAPTER QUIZ CONTROLLER (DYNAMIC)
// =============================================================================

function initAdventureCards() {
  const startBtns = document.querySelectorAll(".start-chapter-btn");
  startBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sfx.pop();
      const chKey = btn.dataset.chapter;
      startChapterQuiz(chKey);
    });
  });
}

function startChapterQuiz(chKey) {
  const chapterTitles = {
    ch1: "La Vie Quotidienne de Luc",
    ch2: "Le Monde Multiculturel & Nationalités",
    ch3: "La Bonne Nourriture & Les Repas",
    ch4: "Conjugaison & Mes Loisirs"
  };

  // Generate 6 fresh dynamic questions for this chapter
  AppState.currentQuiz = generateDynamicQuiz(chKey, 6);
  AppState.currentQuizKey = chKey;
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = false;

  document.getElementById("quiz-topic-title").textContent = chapterTitles[chKey] || "Quiz";
  showView("view-quiz");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qList = AppState.currentQuiz;
  const idx = AppState.quizIndex;
  const q = qList[idx];

  // Update progress
  document.getElementById("quiz-current-num").textContent = idx + 1;
  document.getElementById("quiz-total-num").textContent = qList.length;
  const pct = ((idx + 1) / qList.length) * 100;
  document.getElementById("quiz-progress-fill").style.width = `${pct}%`;

  // Hide feedback banner
  const feedback = document.getElementById("quiz-feedback-banner");
  feedback.classList.remove("show", "correct", "incorrect");

  // Populate Question Content
  document.getElementById("question-french-text").textContent = q.fr;
  document.getElementById("question-english-hint").textContent = `"${q.en}"`;

  // Audio Buttons
  const frenchAudioBtn = document.getElementById("btn-speak-french");
  const englishAudioBtn = document.getElementById("btn-speak-english");

  frenchAudioBtn.onclick = () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(q.audio || q.fr, "fr-FR", speed);
  };

  englishAudioBtn.onclick = () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(q.en, "en-US", speed);
  };

  // Populate Options
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

  if (isCorrect) {
    btnElement.classList.add("correct");
    sfx.correct();
    confetti.blast();
    AppState.quizScore++;
    addXP(20);

    fbIcon.textContent = "🎉";
    fbTitle.textContent = "Bravo Aezza ! C'est parfait !";
    fbTitle.style.color = "#15803d";
    feedback.className = "feedback-banner show correct";
  } else {
    btnElement.classList.add("incorrect");
    allBtns[question.correct].classList.add("correct");
    sfx.incorrect();

    fbIcon.textContent = "💡";
    fbTitle.textContent = "Presque ! Voici la bonne réponse :";
    fbTitle.style.color = "#c2410c";
    feedback.className = "feedback-banner show incorrect";
  }

  fbExp.textContent = question.explanation;

  const speed = document.getElementById("audio-speed-select").value;
  voice.speak(question.audio || question.fr, "fr-FR", speed);
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
      updateChapterCardBadges();
      saveState();
      checkBadges();
    }
    showToast("🎉", `Session terminée ! Score : ${AppState.quizScore} / ${AppState.currentQuiz.length}`);
    addXP(50);
    showView("view-adventure");
  }
}

// =============================================================================
// 9. DYNAMIC WORD UNSCRAMBLE GAME
// =============================================================================

function initUnscrambleGame() {
  AppState.unscramblePuzzles = generateDynamicUnscramblePuzzles(6);
  AppState.unscrambleIndex = 0;
  AppState.assembledTokens = [];

  document.getElementById("unscramble-total").textContent = AppState.unscramblePuzzles.length;
  renderUnscramblePuzzle();

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
      // Regenerate fresh new puzzles!
      AppState.unscramblePuzzles = generateDynamicUnscramblePuzzles(6);
      AppState.unscrambleIndex = 0;
      showToast("✨", "Nouvelle série de phrases générée !");
    }
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-unscramble-speak").addEventListener("click", () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const puzzle = AppState.unscramblePuzzles[AppState.unscrambleIndex];
    voice.speak(puzzle.audio, "fr-FR", speed);
  });
}

function renderUnscramblePuzzle() {
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
    dropZone.innerHTML = `<span class="placeholder-text" id="drop-placeholder">Clique sur les étiquettes ci-dessous pour former la phrase...</span>`;
  } else {
    AppState.assembledTokens.forEach((tok, pos) => {
      const chip = document.createElement("div");
      chip.className = "word-chip in-drop-zone";
      chip.textContent = tok.text;
      chip.title = "Clique pour retirer";
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
        voice.speak(tok.text, "fr-FR", speed);
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
      unlockTrophy("trophy-unscramble", "🧩 Génie des Phrases débloqué !");
    }

    fbIcon.textContent = "🎉";
    fbTitle.textContent = "C'est exactement ça ! Bravo !";
    fbText.textContent = `Phrase modèle : "${puzzle.audio}"`;
    feedback.className = "feedback-banner show correct";

    const speed = document.getElementById("audio-speed-select").value;
    voice.speak(puzzle.audio, "fr-FR", speed);
  } else {
    sfx.incorrect();
    fbIcon.textContent = "🤔";
    fbTitle.textContent = "Oups ! Regarde bien l'ordre des mots.";
    fbText.textContent = "Astuce : Écoute la phrase modèle avec le bouton audio en haut !";
    feedback.className = "feedback-banner show incorrect";
  }
}

// =============================================================================
// 10. DYNAMIC MATCHING PAIRS GAME
// =============================================================================

function initMatchingGame() {
  const catBtns = document.querySelectorAll(".match-cat-btn");
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sfx.pop();
      catBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.matchingCategory = btn.dataset.matchCat;
      setupMatchingBoard();
    });
  });

  document.getElementById("btn-matching-replay-cat").addEventListener("click", () => {
    sfx.pop();
    setupMatchingBoard();
  });

  document.getElementById("btn-match-next-cat").addEventListener("click", () => {
    sfx.pop();
    const cats = ["nationalities", "prepositions", "partitives"];
    const curIdx = cats.indexOf(AppState.matchingCategory);
    const nextCat = cats[(curIdx + 1) % cats.length];
    AppState.matchingCategory = nextCat;

    catBtns.forEach(b => {
      b.classList.toggle("active", b.dataset.matchCat === nextCat);
    });
    setupMatchingBoard();
  });

  setupMatchingBoard();
}

function setupMatchingBoard() {
  const pairs = generateDynamicMatchingPairs(AppState.matchingCategory, 5);
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
  voice.speak(tileData.text.split("(")[0], "fr-FR", speed);

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
          unlockTrophy("trophy-matching", "🎯 Roi de la Mémoire débloqué !");
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
// 11. FLASHCARDS CONTROLLER
// =============================================================================

const STATIC_FLASHCARDS = {
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
    { emoji: "📺", fr: "Regarder (Je regarde)", en: "To watch / To look at", tag: "Verbe en -ER", exampleFr: "Ils regardent un dessin animé.", exampleEn: "They are watching a cartoon." },
    { emoji: "🏡", fr: "Habiter (J'habite, Nous habitons)", en: "To live / reside", tag: "Verbe en -ER", exampleFr: "J'habite dans une belle maison.", exampleEn: "I live in a beautiful house." }
  ],
  nationalites: [
    { emoji: "🇫🇷", fr: "Français / Française", en: "French (Masc / Fem)", tag: "Nationalité", exampleFr: "Paul est français, Sophie est française.", exampleEn: "Paul is French, Sophie is French." },
    { emoji: "🇮🇳", fr: "Indien / Indienne", en: "Indian (Masc / Fem)", tag: "Nationalité", exampleFr: "Rohan est indien, Aezza est indienne.", exampleEn: "Rohan is Indian, Aezza is Indian." },
    { emoji: "🇮🇹", fr: "Italien / Italienne", en: "Italian (Masc / Fem)", tag: "Nationalité", exampleFr: "Marco est italien, Giulia est italienne.", exampleEn: "Marco is Italian, Giulia is Italian." },
    { emoji: "🇨🇦", fr: "au Canada / en France", en: "in Canada (Masc) / in France (Fem)", tag: "Prépositions de Pays", exampleFr: "J'habite au Canada et elle habite en France.", exampleEn: "I live in Canada and she lives in France." },
    { emoji: "🗽", fr: "aux États-Unis", en: "in the United States (Plural)", tag: "Préposition Plurielle", exampleFr: "Mes cousins habitent aux États-Unis.", exampleEn: "My cousins live in the United States." }
  ],
  repas: [
    { emoji: "🥞", fr: "Le petit déjeuner", en: "Breakfast (Morning meal)", tag: "Vocabulaire Repas", exampleFr: "Au petit déjeuner, je bois du lait.", exampleEn: "For breakfast, I drink milk." },
    { emoji: "🥗", fr: "Le déjeuner", en: "Lunch (Noon meal)", tag: "Vocabulaire Repas", exampleFr: "À midi, nous prenons le déjeuner.", exampleEn: "At noon, we have lunch." },
    { emoji: "🍲", fr: "Le dîner", en: "Dinner (Evening meal)", tag: "Vocabulaire Repas", exampleFr: "Le soir, la famille se réunit pour le dîner.", exampleEn: "In the evening, the family gathers for dinner." },
    { emoji: "🥐", fr: "du pain / de la confiture", en: "some bread (M) / some jam (F)", tag: "Articles Partitifs", exampleFr: "Je mange du pain avec de la confiture.", exampleEn: "I eat bread with jam." },
    { emoji: "💧", fr: "de l'eau / des fruits", en: "some water (Vowel) / some fruit (Plural)", tag: "Articles Partitifs", exampleFr: "Il boit de l'eau et mange des fruits.", exampleEn: "He drinks water and eats fruits." }
  ],
  loisirs: [
    { emoji: "⚽", fr: "J'aime jouer au football", en: "I like playing soccer", tag: "Mes Loisirs", exampleFr: "Pendant le week-end, j'aime jouer au football.", exampleEn: "During the weekend, I like playing soccer." },
    { emoji: "🎨", fr: "J'aime dessiner et peindre", en: "I like drawing and painting", tag: "Mes Loisirs", exampleFr: "Aezza aime dessiner de jolis tableaux.", exampleEn: "Aezza likes drawing pretty pictures." },
    { emoji: "📚", fr: "J'aime lire des histoires", en: "I like reading stories", tag: "Mes Loisirs", exampleFr: "Tous les soirs, j'aime lire un livre.", exampleEn: "Every evening, I like reading a book." },
    { emoji: "🚫", fr: "Je n'aime pas...", en: "I do not like...", tag: "Négation", exampleFr: "Je n'aime pas me lever trop tôt.", exampleEn: "I don't like getting up too early." }
  ]
};

function initFlashcards() {
  const tabs = document.querySelectorAll(".fc-tab");
  const fcElement = document.getElementById("flashcard-element");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      sfx.pop();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      AppState.flashcardCategory = tab.dataset.fccat;
      AppState.flashcardIndex = 0;
      fcElement.classList.remove("flipped");
      renderFlashcard();
    });
  });

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
    const list = STATIC_FLASHCARDS[AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex - 1 + list.length) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("btn-fc-next").addEventListener("click", () => {
    sfx.pop();
    const list = STATIC_FLASHCARDS[AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex + 1) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("fc-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = STATIC_FLASHCARDS[AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.fr, "fr-FR", speed);
  });

  document.getElementById("fc-example-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = STATIC_FLASHCARDS[AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.exampleFr, "fr-FR", speed);
  });

  renderFlashcard();
}

function renderFlashcard() {
  const list = STATIC_FLASHCARDS[AppState.flashcardCategory];
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
// 12. DYNAMIC MOCK EXAM (EXAMEN BLANC)
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
  // Generate 15 brand-new dynamic questions balanced across all 4 chapters
  AppState.currentQuiz = generateDynamicMockExam(15);
  AppState.currentQuizKey = "mock-exam";
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = true;

  document.getElementById("quiz-topic-title").textContent = "Grand Examen Blanc de Français 📝";
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
    title.textContent = "Exceptionnel ! 20/20 pour Aezza ! 🌟👑";
    msg.textContent = "Tu maîtrises parfaitement tout ton programme de français pour l'examen !";
    unlockTrophy("trophy-exam", "👑 Reine du Français débloqué !");
  } else if (finalScore >= 10) {
    title.textContent = "Très Bien Aezza ! 🥐✨";
    msg.textContent = "Tu as une super note ! Révise les petites erreurs ci-dessous pour obtenir 100%.";
  } else {
    title.textContent = "Bel effort ! Continue de t'entraîner ! 💪";
    msg.textContent = "Passe en revue chaque chapitre et tu seras au top pour le contrôle !";
  }

  const reviewBox = document.getElementById("exam-review-box");
  reviewBox.innerHTML = "<h3 style='margin-bottom:8px;'>Détail de tes réponses :</h3>";

  AppState.quizAnswersHistory.forEach((hist, i) => {
    const item = document.createElement("div");
    item.className = `review-item ${hist.isCorrect ? "pass" : "fail"}`;
    item.innerHTML = `
      <div class="review-q">Question ${i + 1} : ${hist.question}</div>
      <div class="review-ans">Ta réponse : <strong>${hist.chosen}</strong> ${hist.isCorrect ? "✅" : "❌"}</div>
      ${!hist.isCorrect ? `<div class="review-correct">Bonne réponse : ${hist.correctAnswer}</div>` : ""}
      <div style="font-size:12px; color:#5e4f71; font-style:italic;">${hist.explanation}</div>
    `;
    reviewBox.appendChild(item);
  });
}

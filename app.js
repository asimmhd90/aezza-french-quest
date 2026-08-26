/**
 * Aezza's French Quest - Interactive Web Quiz Engine
 * Built with Google Stitch Design System ("L'Aventure Pétillante")
 * Features: Web Speech API Audio Reciter, Web Audio FX, Gamification, Confetti, Toast Notifications
 */

// =============================================================================
// 1. DATA REPOSITORY (COMPREHENSIVE SYLLABUS)
// =============================================================================

const SYLLABUS_DATA = {
  chapters: {
    ch1: {
      title: "La Vie Quotidienne de Luc",
      category: "Chapitre 1 • Verbes Pronominaux & Routine",
      questions: [
        {
          fr: "Luc ______ à 7h du matin.",
          en: "Luc wakes up at 7:00 in the morning.",
          audio: "Luc se réveille à sept heures du matin.",
          options: ["se réveille", "me réveille", "te réveilles", "se réveillent"],
          correct: 0,
          explanation: "Pour 'Luc' (il), le pronom est 'se' et la terminaison est '-e' : se réveille."
        },
        {
          fr: "Le matin, je ______ rapidement du lit.",
          en: "In the morning, I get up quickly from bed.",
          audio: "Le matin, je me lève rapidement du lit.",
          options: ["te lèves", "me lève", "se lève", "nous levons"],
          correct: 1,
          explanation: "Pour 'Je', le pronom réfléchi est 'me' : je me lève."
        },
        {
          fr: "Après le petit déjeuner, nous ______ les dents.",
          en: "After breakfast, we brush our teeth.",
          audio: "Après le petit déjeuner, nous nous brossons les dents.",
          options: ["se brossent", "vous brossez", "nous brossons", "me brosse"],
          correct: 2,
          explanation: "Pour 'Nous', le pronom réfléchi se double : nous nous brossons."
        },
        {
          fr: "Tu ______ à quelle heure pour l'école ?",
          en: "What time do you get dressed for school?",
          audio: "Tu t'habilles à quelle heure pour l'école ?",
          options: ["t'habilles", "s'habille", "m'habille", "vous habillez"],
          correct: 0,
          explanation: "Pour 'Tu' devant une voyelle ou 'h' muet, on utilise 't'' : tu t'habilles."
        },
        {
          fr: "Le soir, les enfants ______ à 21h.",
          en: "In the evening, the children go to bed at 9:00 PM.",
          audio: "Le soir, les enfants se couchent à vingt et une heures.",
          options: ["se couche", "se couchent", "nous couchons", "te couches"],
          correct: 1,
          explanation: "'Les enfants' = ils (pluriel), donc on utilise 'se couchent' (-ent)."
        },
        {
          fr: "Avant d'aller à l'école, Luc ______ dans la salle de bain.",
          en: "Before going to school, Luc takes a shower in the bathroom.",
          audio: "Avant d'aller à l'école, Luc se douche dans la salle de bain.",
          options: ["se douche", "te douches", "me douche", "se douchent"],
          correct: 0,
          explanation: "Pour 'Luc' (il), on utilise 'se douche'."
        }
      ]
    },
    ch2: {
      title: "Le Monde Multiculturel & Nationalités",
      category: "Chapitre 2 • Nationalités & Prépositions",
      questions: [
        {
          fr: "Paul habite en France, il est ______.",
          en: "Paul lives in France, he is French.",
          audio: "Paul habite en France, il est français.",
          options: ["française", "français", "françaises", "france"],
          correct: 1,
          explanation: "Paul est un garçon (masculin singulier) -> 'français'."
        },
        {
          fr: "Aezza habite en Inde, elle est ______.",
          en: "Aezza lives in India, she is Indian.",
          audio: "Aezza habite en Inde, elle est indienne.",
          options: ["indien", "indiens", "indienne", "indiennes"],
          correct: 2,
          explanation: "Pour le féminin de 'indien', on double le 'n' et ajoute un 'e' : indienne."
        },
        {
          fr: "Marie voyage ______ Paris pour les vacances.",
          en: "Marie is traveling to Paris for the holidays.",
          audio: "Marie voyage à Paris pour les vacances.",
          options: ["en", "au", "à", "aux"],
          correct: 2,
          explanation: "Pour toutes les villes (Paris, Londres, Delhi), on utilise la préposition 'à'."
        },
        {
          fr: "Luc habite ______ Canada.",
          en: "Luc lives in Canada.",
          audio: "Luc habite au Canada.",
          options: ["en", "au", "à", "aux"],
          correct: 1,
          explanation: "Le Canada est un pays masculin commençant par une consonne -> 'au Canada'."
        },
        {
          fr: "Mon oncle et ma tante habitent ______ États-Unis.",
          en: "My uncle and aunt live in the United States.",
          audio: "Mon oncle et ma tante habitent aux États-Unis.",
          options: ["en", "au", "à", "aux"],
          correct: 3,
          explanation: "Les États-Unis est un pays au pluriel -> 'aux États-Unis'."
        },
        {
          fr: "Sophie habite ______ Italie.",
          en: "Sophie lives in Italy.",
          audio: "Sophie habite en Italie.",
          options: ["en", "au", "à", "aux"],
          correct: 0,
          explanation: "L'Italie est un pays féminin commençant par une voyelle -> 'en Italie'."
        },
        {
          fr: "Marco et Lucas sont nés en Italie, ils sont ______.",
          en: "Marco and Lucas were born in Italy, they are Italian.",
          audio: "Marco et Lucas sont nés en Italie, ils sont italiens.",
          options: ["italien", "italienne", "italiens", "italiennes"],
          correct: 2,
          explanation: "Pluriel masculin : italien + s = italiens."
        }
      ]
    },
    ch3: {
      title: "La Bonne Nourriture & Les Repas",
      category: "Chapitre 3 • Repas & Articles Partitifs",
      questions: [
        {
          fr: "Au petit déjeuner, je mange ______ croissant chaud.",
          en: "For breakfast, I eat a hot croissant.",
          audio: "Au petit déjeuner, je mange du croissant chaud.",
          options: ["de la", "du", "de l'", "des"],
          correct: 1,
          explanation: "'Croissant' est masculin singulier -> on utilise l'article partitif 'du'."
        },
        {
          fr: "Aezza adore mettre ______ confiture sur ses tartines.",
          en: "Aezza loves putting jam on her toasts.",
          audio: "Aezza adore mettre de la confiture sur ses tartines.",
          options: ["du", "de la", "de l'", "des"],
          correct: 1,
          explanation: "'Confiture' est féminin singulier -> on utilise 'de la'."
        },
        {
          fr: "Quand j'ai soif, je bois ______ eau fraîche.",
          en: "When I am thirsty, I drink fresh water.",
          audio: "Quand j'ai soif, je bois de l'eau fraîche.",
          options: ["du", "de la", "de l'", "des"],
          correct: 2,
          explanation: "'Eau' commence par une voyelle -> on utilise 'de l''. "
        },
        {
          fr: "Pour le dîner, nous mangeons ______ légumes et du poulet.",
          en: "For dinner, we eat vegetables and chicken.",
          audio: "Pour le dîner, nous mangeons des légumes et du poulet.",
          options: ["du", "de la", "de l'", "des"],
          correct: 3,
          explanation: "'Légumes' est au pluriel -> on utilise 'des'."
        },
        {
          fr: "Le premier repas du matin s'appelle ______.",
          en: "The first meal of the morning is called breakfast.",
          audio: "Le premier repas du matin s'appelle le petit déjeuner.",
          options: ["le dîner", "le déjeuner", "le petit déjeuner", "le goûter"],
          correct: 2,
          explanation: "Le matin, c'est 'le petit déjeuner' !"
        },
        {
          fr: "Luc prend son ______ à midi à la cantine.",
          en: "Luc has his lunch at noon in the cafeteria.",
          audio: "Luc prend son déjeuner à midi à la cantine.",
          options: ["petit déjeuner", "déjeuner", "dîner", "goûter"],
          correct: 1,
          explanation: "Le repas du midi s'appelle 'le déjeuner'."
        }
      ]
    },
    ch4: {
      title: "Conjugaison & Mes Loisirs",
      category: "Grammaire • Verbes & Loisirs",
      questions: [
        {
          fr: "Nous ______ au parc le dimanche. (aller)",
          en: "We go to the park on Sunday.",
          audio: "Nous allons au parc le dimanche.",
          options: ["allons", "vais", "va", "vont"],
          correct: 0,
          explanation: "Le verbe 'aller' avec 'Nous' : Nous allons."
        },
        {
          fr: "Je ______ regarder des dessins animés. (aimer)",
          en: "I like watching cartoons.",
          audio: "J'aime regarder des dessins animés.",
          options: ["aimes", "aime", "aimons", "aiment"],
          correct: 1,
          explanation: "Avec 'Je' : J'aime."
        },
        {
          fr: "Ils ______ à l'école en bus. (aller)",
          en: "They go to school by bus.",
          audio: "Ils vont à l'école en bus.",
          options: ["allons", "allez", "vont", "vas"],
          correct: 2,
          explanation: "Avec 'Ils' (pluriel) : Ils vont."
        },
        {
          fr: "Complète : 'Je n'aime pas ______ les devoirs le soir.'",
          en: "Complete: 'I do not like doing homework in the evening.'",
          audio: "Je n'aime pas faire les devoirs le soir.",
          options: ["faire", "fais", "fait", "faisons"],
          correct: 0,
          explanation: "Après 'aimer / ne pas aimer', le second verbe reste à l'infinitif : faire."
        },
        {
          fr: "Tu ______ français et anglais ? (parler)",
          en: "Do you speak French and English?",
          audio: "Tu parles français et anglais ?",
          options: ["parle", "parles", "parlons", "parlent"],
          correct: 1,
          explanation: "Pour les verbes en -er avec 'Tu', on ajoute '-es' : Tu parles."
        },
        {
          fr: "J'______ dans une jolie maison à Paris. (habiter)",
          en: "I live in a pretty house in Paris.",
          audio: "J'habite dans une jolie maison à Paris.",
          options: ["habites", "habite", "habitons", "habitent"],
          correct: 1,
          explanation: "Avec 'Je / J'', le verbe 'habiter' se termine par '-e' : J'habite."
        }
      ]
    }
  },

  // Word Unscramble Puzzles
  unscramble: [
    {
      targetTokens: ["Luc", "se", "réveille", "à", "sept", "heures", "."],
      scrambledTokens: ["heures", "se", "sept", "Luc", "réveille", ".", "à"],
      en: "Luc wakes up at seven o'clock.",
      audio: "Luc se réveille à sept heures."
    },
    {
      targetTokens: ["J'", "aime", "manger", "du", "croissant", "."],
      scrambledTokens: ["du", "aime", "croissant", "J'", ".", "manger"],
      en: "I like eating croissant.",
      audio: "J'aime manger du croissant."
    },
    {
      targetTokens: ["Elle", "habite", "en", "France", "."],
      scrambledTokens: ["France", "habite", "en", ".", "Elle"],
      en: "She lives in France.",
      audio: "Elle habite en France."
    },
    {
      targetTokens: ["Nous", "allons", "à", "Paris", "."],
      scrambledTokens: ["Paris", "allons", "Nous", ".", "à"],
      en: "We are going to Paris.",
      audio: "Nous allons à Paris."
    },
    {
      targetTokens: ["Il", "boit", "de", "l'", "eau", "fraîche", "."],
      scrambledTokens: ["l'", "boit", "fraîche", "eau", "Il", "de", "."],
      en: "He drinks fresh water.",
      audio: "Il boit de l'eau fraîche."
    },
    {
      targetTokens: ["Je", "ne", "regarde", "pas", "la", "télévision", "."],
      scrambledTokens: ["pas", "regarde", "Je", "la", "télévision", "ne", "."],
      en: "I do not watch television.",
      audio: "Je ne regarde pas la télévision."
    }
  ],

  // Matching Pairs
  matching: {
    nationalities: [
      { left: "Français (M)", right: "Française (F)", id: 1 },
      { left: "Indien (M)", right: "Indienne (F)", id: 2 },
      { left: "Italien (M)", right: "Italienne (F)", id: 3 },
      { left: "Canadien (M)", right: "Canadienne (F)", id: 4 },
      { left: "Espagnol (M)", right: "Espagnole (F)", id: 5 }
    ],
    prepositions: [
      { left: "Paris (Ville)", right: "à Paris", id: 1 },
      { left: "France (Féminin)", right: "en France", id: 2 },
      { left: "Canada (Masculin)", right: "au Canada", id: 3 },
      { left: "États-Unis (Pluriel)", right: "aux États-Unis", id: 4 },
      { left: "Inde (Commence voyelle)", right: "en Inde", id: 5 }
    ],
    partitives: [
      { left: "🥖 Pain (M)", right: "du pain", id: 1 },
      { left: "🍓 Confiture (F)", right: "de la confiture", id: 2 },
      { left: "💧 Eau (Voyelle)", right: "de l'eau", id: 3 },
      { left: "🥐 Croissants (Plur)", right: "des croissants", id: 4 },
      { left: "🧀 Fromage (M)", right: "du fromage", id: 5 }
    ]
  },

  // Flashcards Library
  flashcards: {
    verbes: [
      {
        emoji: "⏰",
        fr: "se réveiller",
        en: "to wake up",
        tag: "Verbe Pronominal",
        exampleFr: "Je me réveille à sept heures.",
        exampleEn: "I wake up at seven o'clock."
      },
      {
        emoji: "🛏️",
        fr: "se lever",
        en: "to get out of bed",
        tag: "Verbe Pronominal",
        exampleFr: "Luc se lève aussitôt.",
        exampleEn: "Luc gets up right away."
      },
      {
        emoji: "🚿",
        fr: "se doucher",
        en: "to take a shower",
        tag: "Verbe Pronominal",
        exampleFr: "Tu te douches avant l'école.",
        exampleEn: "You take a shower before school."
      },
      {
        emoji: "🪥",
        fr: "se brosser les dents",
        en: "to brush teeth",
        tag: "Verbe Pronominal",
        exampleFr: "Nous nous brossons les dents.",
        exampleEn: "We brush our teeth."
      },
      {
        emoji: "👗",
        fr: "s'habiller",
        en: "to get dressed",
        tag: "Verbe Pronominal",
        exampleFr: "Aezza s'habille avec sa jolie robe.",
        exampleEn: "Aezza gets dressed with her pretty dress."
      },
      {
        emoji: "🌙",
        fr: "se coucher",
        en: "to go to bed",
        tag: "Verbe Pronominal",
        exampleFr: "Je me couche à vingt heures trente.",
        exampleEn: "I go to bed at 8:30 PM."
      }
    ],
    conjugaison: [
      {
        emoji: "🚶",
        fr: "Aller (Je vais, Tu vas, Il va)",
        en: "To go",
        tag: "Verbe Irrégulier",
        exampleFr: "Nous allons à l'école ensemble.",
        exampleEn: "We go to school together."
      },
      {
        emoji: "❤️",
        fr: "Aimer (J'aime, Tu aimes)",
        en: "To like / To love",
        tag: "Verbe en -ER",
        exampleFr: "J'aime écouter de la musique.",
        exampleEn: "I like listening to music."
      },
      {
        emoji: "🗣️",
        fr: "Parler (Je parle, Tu parles)",
        en: "To speak",
        tag: "Verbe en -ER",
        exampleFr: "Elle parle français couramment.",
        exampleEn: "She speaks French fluently."
      },
      {
        emoji: "📺",
        fr: "Regarder (Je regarde)",
        en: "To watch / To look at",
        tag: "Verbe en -ER",
        exampleFr: "Ils regardent un dessin animé.",
        exampleEn: "They are watching a cartoon."
      },
      {
        emoji: "🏡",
        fr: "Habiter (J'habite, Nous habitons)",
        en: "To live / reside",
        tag: "Verbe en -ER",
        exampleFr: "J'habite dans une belle maison.",
        exampleEn: "I live in a beautiful house."
      }
    ],
    nationalites: [
      {
        emoji: "🇫🇷",
        fr: "Français / Française",
        en: "French (Masc / Fem)",
        tag: "Nationalité",
        exampleFr: "Paul est français, Sophie est française.",
        exampleEn: "Paul is French, Sophie is French."
      },
      {
        emoji: "🇮🇳",
        fr: "Indien / Indienne",
        en: "Indian (Masc / Fem)",
        tag: "Nationalité",
        exampleFr: "Rohan est indien, Aezza est indienne.",
        exampleEn: "Rohan is Indian, Aezza is Indian."
      },
      {
        emoji: "🇮🇹",
        fr: "Italien / Italienne",
        en: "Italian (Masc / Fem)",
        tag: "Nationalité",
        exampleFr: "Marco est italien, Giulia est italienne.",
        exampleEn: "Marco is Italian, Giulia is Italian."
      },
      {
        emoji: "🇨🇦",
        fr: "au Canada / en France",
        en: "in Canada (Masc) / in France (Fem)",
        tag: "Prépositions de Pays",
        exampleFr: "J'habite au Canada et elle habite en France.",
        exampleEn: "I live in Canada and she lives in France."
      },
      {
        emoji: "🗽",
        fr: "aux États-Unis",
        en: "in the United States (Plural)",
        tag: "Préposition Plurielle",
        exampleFr: "Mes cousins habitent aux États-Unis.",
        exampleEn: "My cousins live in the United States."
      }
    ],
    repas: [
      {
        emoji: "🥞",
        fr: "Le petit déjeuner",
        en: "Breakfast (Morning meal)",
        tag: "Vocabulaire Repas",
        exampleFr: "Au petit déjeuner, je bois du lait.",
        exampleEn: "For breakfast, I drink milk."
      },
      {
        emoji: "🥗",
        fr: "Le déjeuner",
        en: "Lunch (Noon meal)",
        tag: "Vocabulaire Repas",
        exampleFr: "À midi, nous prenons le déjeuner.",
        exampleEn: "At noon, we have lunch."
      },
      {
        emoji: "🍲",
        fr: "Le dîner",
        en: "Dinner (Evening meal)",
        tag: "Vocabulaire Repas",
        exampleFr: "Le soir, la famille se réunit pour le dîner.",
        exampleEn: "In the evening, the family gathers for dinner."
      },
      {
        emoji: "🥐",
        fr: "du pain / de la confiture",
        en: "some bread (M) / some jam (F)",
        tag: "Articles Partitifs",
        exampleFr: "Je mange du pain avec de la confiture.",
        exampleEn: "I eat bread with jam."
      },
      {
        emoji: "💧",
        fr: "de l'eau / des fruits",
        en: "some water (Vowel) / some fruit (Plural)",
        tag: "Articles Partitifs",
        exampleFr: "Il boit de l'eau et mange des fruits.",
        exampleEn: "He drinks water and eats fruits."
      }
    ],
    loisirs: [
      {
        emoji: "⚽",
        fr: "J'aime jouer au football",
        en: "I like playing soccer",
        tag: "Mes Loisirs",
        exampleFr: "Pendant le week-end, j'aime jouer au football.",
        exampleEn: "During the weekend, I like playing soccer."
      },
      {
        emoji: "🎨",
        fr: "J'aime dessiner et peindre",
        en: "I like drawing and painting",
        tag: "Mes Loisirs",
        exampleFr: "Aezza aime dessiner de jolis tableaux.",
        exampleEn: "Aezza likes drawing pretty pictures."
      },
      {
        emoji: "📚",
        fr: "J'aime lire des histoires",
        en: "I like reading stories",
        tag: "Mes Loisirs",
        exampleFr: "Tous les soirs, j'aime lire un livre.",
        exampleEn: "Every evening, I like reading a book."
      },
      {
        emoji: "🚫",
        fr: "Je n'aime pas...",
        en: "I do not like...",
        tag: "Négation",
        exampleFr: "Je n'aime pas me lever trop tôt.",
        exampleEn: "I don't like getting up too early."
      }
    ]
  }
};

// =============================================================================
// 2. AUDIO RECITER & SYNTHESIZED SOUND EFFECTS
// =============================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
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

      // Ensure voices are found
      if (!this.frenchVoice) this.initVoices();

      const utter = new SpeechSynthesisUtterance(text);
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
// 3. CONFETTI GENERATOR (STANDALONE HTML5 CANVAS)
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

// Toast Notifications
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
// 4. MAIN APP STATE & LOCAL STORAGE PERSISTENCE
// =============================================================================

const AppState = {
  xp: 350,
  stars: 120,
  streak: 5,
  audioListenCount: 0,
  completedChapters: { ch1: false, ch2: false, ch3: false, ch4: false },
  unscrambleSolved: 0,
  currentQuiz: null,
  currentQuizKey: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswersHistory: [],
  isMockExam: false,
  unscrambleIndex: 0,
  assembledTokens: [],
  matchingCategory: "nationalities",
  matchingSelected: [],
  matchedPairsCount: 0,
  isMatchingBusy: false,
  flashcardCategory: "verbes",
  flashcardIndex: 0
};

// Load saved state
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

// Mascot Quotes
const MASCOT_QUOTES = [
  "Bravo Aezza ! Tu fais des progrès fantastiques !",
  "N'oublie pas : pour les verbes pronominaux, 'Je' prend 'me' et 'Nous' prend 'nous' !",
  "Pour les repas : 'du' pour le masculin, 'de la' pour le féminin, et 'de l'' devant une voyelle !",
  "À Paris, en France, au Canada, aux États-Unis ! Tu connais tes prépositions sur le bout des doigts !",
  "Tu es prête pour avoir 20/20 à ton examen de mi-trimestre ! 🌟"
];

// App Init
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
        bar.style.width = "15%";
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

// Navigation
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

// Mascot Interactivity
function initMascot() {
  const voiceBtn = document.getElementById("mascot-voice-btn");
  const mascotText = document.getElementById("mascot-text");
  const mascotBox = document.getElementById("mascot-click-target");
  const avatar = document.getElementById("avatar-badge");

  const speakMascot = () => {
    sfx.correct();
    confetti.blast();
    const quote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
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
// 5. CHAPTER QUIZ CONTROLLER
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
  const chapter = SYLLABUS_DATA.chapters[chKey];
  if (!chapter) return;

  AppState.currentQuiz = [...chapter.questions];
  AppState.currentQuizKey = chKey;
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswersHistory = [];
  AppState.isMockExam = false;

  document.getElementById("quiz-topic-title").textContent = chapter.title;
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

  // Audio Buttons (Dynamically reads speed on click)
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
  // Disable all options
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
    showToast("🎉", `Chapitre terminé avec ${AppState.quizScore} / ${AppState.currentQuiz.length} !`);
    addXP(50);
    showView("view-adventure");
  }
}

// =============================================================================
// 6. WORD UNSCRAMBLE GAME (REMETTEZ LES MOTS DANS L'ORDRE)
// =============================================================================

function initUnscrambleGame() {
  document.getElementById("unscramble-total").textContent = SYLLABUS_DATA.unscramble.length;
  renderUnscramblePuzzle();

  document.getElementById("btn-reset-words").addEventListener("click", () => {
    sfx.pop();
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-check-unscramble").addEventListener("click", checkUnscrambleAnswer);

  document.getElementById("btn-next-unscramble").addEventListener("click", () => {
    sfx.pop();
    AppState.unscrambleIndex = (AppState.unscrambleIndex + 1) % SYLLABUS_DATA.unscramble.length;
    AppState.assembledTokens = [];
    renderUnscramblePuzzle();
  });

  document.getElementById("btn-unscramble-speak").addEventListener("click", () => {
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const puzzle = SYLLABUS_DATA.unscramble[AppState.unscrambleIndex];
    voice.speak(puzzle.audio, "fr-FR", speed);
  });
}

function renderUnscramblePuzzle() {
  const puzzle = SYLLABUS_DATA.unscramble[AppState.unscrambleIndex];
  document.getElementById("unscramble-lvl").textContent = AppState.unscrambleIndex + 1;
  document.getElementById("unscramble-english-hint").textContent = `"${puzzle.en}"`;

  const feedback = document.getElementById("unscramble-feedback");
  feedback.classList.remove("show", "correct", "incorrect");

  const dropZone = document.getElementById("word-drop-zone");
  const bankZone = document.getElementById("word-bank-zone");

  dropZone.innerHTML = "";
  bankZone.innerHTML = "";

  // Prepare full token objects
  const allTokens = puzzle.scrambledTokens.map((text, idx) => ({ id: `token_${idx}`, text }));

  // Render Drop Zone
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

  // Render Word Bank (only unpicked tokens)
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
  const puzzle = SYLLABUS_DATA.unscramble[AppState.unscrambleIndex];
  const targetStr = puzzle.targetTokens.join(" ").replace(/\s+\./g, ".").trim();
  const userStr = AppState.assembledTokens.map(t => t.text).join(" ").replace(/\s+\./g, ".").trim();

  const feedback = document.getElementById("unscramble-feedback");
  const fbTitle = document.getElementById("unscramble-feedback-title");
  const fbText = document.getElementById("unscramble-feedback-text");
  const fbIcon = document.getElementById("unscramble-feedback-icon");

  if (userStr.toLowerCase() === targetStr.toLowerCase()) {
    sfx.correct();
    confetti.blast();
    addXP(30);

    AppState.unscrambleSolved = Math.max(AppState.unscrambleSolved, AppState.unscrambleIndex + 1);
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
// 7. MATCHING PAIRS GAME
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
  const pairs = SYLLABUS_DATA.matching[AppState.matchingCategory];
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

  tiles.sort(() => Math.random() - 0.5);

  tiles.forEach(tileData => {
    const tile = document.createElement("div");
    tile.className = "match-tile";
    tile.textContent = tileData.text;
    tile.dataset.id = tileData.id;

    tile.addEventListener("click", () => handleTileClick(tile, tileData));
    grid.appendChild(tile);
  });
}

function handleTileClick(tileElement, tileData) {
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
      // Success match
      setTimeout(() => {
        sfx.correct();
        first.element.classList.remove("selected");
        second.element.classList.remove("selected");
        first.element.classList.add("matched");
        second.element.classList.add("matched");
        AppState.matchedPairsCount++;
        document.getElementById("match-found-count").textContent = AppState.matchedPairsCount;
        addXP(15);

        const total = SYLLABUS_DATA.matching[AppState.matchingCategory].length;
        if (AppState.matchedPairsCount === total) {
          confetti.blast();
          sfx.fanfare();
          unlockTrophy("trophy-matching", "🎯 Roi de la Mémoire débloqué !");
          document.getElementById("matching-complete-box").style.display = "flex";
        }
        AppState.matchingSelected = [];
        AppState.isMatchingBusy = false;
      }, 300);
    } else {
      // Error mismatch
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
// 8. FLASHCARDS CONTROLLER
// =============================================================================

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
    const list = SYLLABUS_DATA.flashcards[AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex - 1 + list.length) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("btn-fc-next").addEventListener("click", () => {
    sfx.pop();
    const list = SYLLABUS_DATA.flashcards[AppState.flashcardCategory];
    AppState.flashcardIndex = (AppState.flashcardIndex + 1) % list.length;
    fcElement.classList.remove("flipped");
    renderFlashcard();
  });

  document.getElementById("fc-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = SYLLABUS_DATA.flashcards[AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.fr, "fr-FR", speed);
  });

  document.getElementById("fc-example-speaker-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    sfx.pop();
    const speed = document.getElementById("audio-speed-select").value;
    const card = SYLLABUS_DATA.flashcards[AppState.flashcardCategory][AppState.flashcardIndex];
    voice.speak(card.exampleFr, "fr-FR", speed);
  });

  renderFlashcard();
}

function renderFlashcard() {
  const list = SYLLABUS_DATA.flashcards[AppState.flashcardCategory];
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
// 9. GRAND MOCK EXAM (EXAMEN BLANC)
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
  const allQ = [];
  Object.values(SYLLABUS_DATA.chapters).forEach(ch => {
    allQ.push(...ch.questions);
  });

  allQ.sort(() => Math.random() - 0.5);
  AppState.currentQuiz = allQ.slice(0, 15);
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
  const total = AppState.currentQuiz.length;
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

  // Populate Review
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

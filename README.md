# Aezza's French Quest 🇫🇷 - L'Aventure de Français

An interactive, gamified French learning and quiz web application tailored for young learners (Grade 3-6 / Mid-term exam prep). Built following the **Google Stitch** design system (*"L'Aventure Pétillante"*) with vibrant candy-pastel colors, tactile 3D buttons, mascot guidance, and native browser voice recitation.

---

## 🌟 Key Features

- 🦊 **Mascot Guide (Coco le Renard)**: A friendly Parisian fox with a red beret who encourages the user, speaks French phrases, and provides study tips.
- 🔊 **Voice Reciter (Audio Pronunciation)**: Powered by Web Speech API (`SpeechSynthesis`) with `fr-FR` native pronunciation, English translations, and speed controls (0.75x slow, 0.9x normal, 1.0x fast).
- 🗺️ **Adventure Mode (Chapter Quizzes)**: Covers all syllabus topics with instant feedback, explanations, and XP rewards:
  - **Chapitre 1**: *La Vie Quotidienne de Luc* (Verbes Pronominaux & Daily Routine)
  - **Chapitre 2**: *Le Monde Multiculturel* (Nationalities & Prepositions: *à, en, au, aux*)
  - **Chapitre 3**: *La Bonne Nourriture* (Meals: *petit déjeuner, déjeuner, dîner* & Partitive Articles: *du, de la, de l', des*)
  - **Grammaire & Loisirs**: Conjugation of *Aimer, Aller, Parler, Regarder, Habiter* and expressing *Mes Loisirs* (*J'aime / Je n'aime pas*).
- 🧩 **Remets les Mots dans l'Ordre (Sentence Unscrambler)**: Interactive word chips puzzle to reconstruct French sentences with audio model recitation.
- 🎯 **Paires Magiques (Matching Pairs Game)**: Drag/tap tile-matching for Nationalities (Masc ↔ Fem), Countries ↔ Prepositions, and Food ↔ Partitives.
- 🎴 **Cartes Mémo Magiques (3D Flashcards)**: Category-based flashcard review with dual audio playback (French vocab + full example sentence).
- 📝 **Grand Examen Blanc (Mock Exam)**: 15-question comprehensive simulated exam with instant scoring, celebratory confetti, and complete answer review.
- 🏆 **Gamification & Trophies**: Streak tracker (🔥), Stars (⭐), XP (⚡), and 8 unlockable badges with `localStorage` persistence.

---

## 🚀 How to Run Locally

No build steps or dependencies required! It runs on pure HTML5, CSS3, and modern JavaScript.

### Option 1: Direct File Open
Open `index.html` directly in any modern browser (Google Chrome, Microsoft Edge, Safari, Firefox).

### Option 2: Local HTTP Server
Using Python:
```bash
python -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080).

---

## 📂 Project Structure

```
aezza-french-quest/
├── index.html       # Main HTML application shell
├── styles.css       # Google Stitch ("L'Aventure Pétillante") design system
├── app.js           # Game engine, syllabus data, audio recitation, sound FX, confetti
└── README.md        # Project documentation
```

---

## 🎨 Design System

- **Primary Colors**: Candy Pink (`#ff529a`), Mint Green (`#2eb872`), Sky Blue (`#0284c7`), Soleil Yellow (`#f59e0b`), Deep Grape (`#1f005f`)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Headlines & Badges) & [Quicksand](https://fonts.google.com/specimen/Quicksand) (Body & Reading text)

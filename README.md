# 漢字カード — Kanji Flashcard App

A Japanese kanji flashcard web app built with Next.js. Study 400+ kanji organized by JLPT difficulty level with interactive flip cards showing readings and example compounds.

## Features

- **JLPT levels N5–N1** — browse kanji by difficulty, from beginner (N5) to advanced (N1)
- **Flip cards** — click any card to reveal on/kun readings, example compounds, JLPT level, and school grade
- **School grade info** — each card shows the Japanese school grade (1–6, or Secondary) alongside the JLPT level
- **Fully static** — all 400+ kanji pages are pre-rendered at build time, no server required
- **Dark mode** — respects system color scheme

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # development server with hot reload
npm run build    # production build (statically pre-renders all pages)
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project Structure

```
app/
  page.tsx              # home — JLPT level selection cards
  level/[level]/
    page.tsx            # kanji grid for a specific level (n5–n1, all)
  kanji/[id]/
    page.tsx            # individual flashcard page
  components/
    FlashCard.tsx       # interactive 3D flip card (client component)
    KanjiGrid.tsx       # responsive kanji grid
  data/
    kanji.ts            # all kanji data + TypeScript types
  globals.css           # Tailwind v4 theme tokens
```

## Adding Kanji

All kanji live in `app/data/kanji.ts` as a typed array. To add entries, append to the end of `kanjiList` — the array index is the URL id, so inserting in the middle would break existing links.

```ts
{
  character: "新",
  meaning: "new",
  jlpt: "N5",           // "N5" | "N4" | "N3" | "N2" | "N1" | null
  grade: 2,             // 1–6 = elementary, 8 = secondary, null = unassigned
  on: ["シン"],
  kun: ["あたら.しい", "あら-"],
  compounds: [
    { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
  ],
}
```

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router, fully static output
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) — configured via CSS (`@theme inline {}` in `globals.css`, no `tailwind.config.*`)
- TypeScript 5

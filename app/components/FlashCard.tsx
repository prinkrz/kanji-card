"use client";

import { useRef, useState } from "react";
import type { Kanji } from "@/app/data/kanji";

// Gradient used on the card front + back header
const LEVEL_GRADIENT: Record<string, string> = {
  N5: "from-emerald-400 to-teal-500",
  N4: "from-blue-400 to-indigo-500",
  N3: "from-amber-400 to-orange-400",
  N2: "from-orange-400 to-rose-500",
  N1: "from-rose-500 to-red-600",
};

const DEFAULT_GRADIENT = "from-violet-500 to-purple-600";

// MD3 Assist Chip colours keyed by JLPT level
const LEVEL_BADGE: Record<string, string> = {
  N5: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700",
  N4: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700",
  N3: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700",
  N2: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700",
  N1: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-200 dark:border-rose-700",
};

function gradeLabel(grade: number | null): string | null {
  if (grade === null) return null;
  if (grade <= 6) return `Grade ${grade}`;
  if (grade === 8) return "Secondary";
  return null;
}

interface Props {
  kanji: Kanji;
  prevId: number | null;
  nextId: number | null;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

const SWIPE_THRESHOLD = 50;

export default function FlashCard({ kanji, prevId, nextId, onNavigatePrev, onNavigateNext }: Props) {
  const [flipped, setFlipped] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const gradient = kanji.jlpt ? (LEVEL_GRADIENT[kanji.jlpt] ?? DEFAULT_GRADIENT) : DEFAULT_GRADIENT;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx > SWIPE_THRESHOLD && absDx > absDy) {
      if (dx < 0 && nextId !== null) onNavigateNext?.();
      else if (dx > 0 && prevId !== null) onNavigatePrev?.();
      return;
    }

    if (absDx < 10 && absDy < 10) {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  }

  return (
    <div
      className="cursor-pointer w-full select-none touch-pan-y"
      style={{ perspective: "1200px", minHeight: "460px" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "460px",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-md-xl bg-gradient-to-br ${gradient} shadow-md-elev-3`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* faint decorative ring */}
          <div className="absolute inset-0 rounded-md-xl ring-1 ring-white/20" />

          <span className="text-[8rem] sm:text-[10rem] leading-none font-serif text-white drop-shadow-lg">
            {kanji.character}
          </span>

          <div className="mt-6 flex flex-col items-center gap-1">
            <p className="text-white/70 text-md-body-sm">tap to reveal</p>
            {(prevId !== null || nextId !== null) && (
              <p className="text-white/40 text-md-label-sm">swipe ← → to navigate</p>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 flex flex-col rounded-md-xl shadow-md-elev-3 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Coloured header strip */}
          <div className={`bg-gradient-to-br ${gradient} px-6 py-5 shrink-0`}>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-serif text-white drop-shadow">
                {kanji.character}
              </span>
              <p className="text-white/80 text-md-body-md leading-snug">{kanji.meaning}</p>
            </div>
          </div>

          {/* MD3 surface-container-low content area */}
          <div className="flex-1 overflow-y-auto bg-md-surface-container-low px-6 py-5 flex flex-col gap-4">
            {/* Readings */}
            <div className="space-y-1.5">
              {kanji.on.length > 0 && (
                <p className="text-md-body-md">
                  <span className="font-semibold text-md-on-surface-variant mr-2">音</span>
                  <span className="font-mono text-md-on-surface">
                    {kanji.on.join("、 ")}
                  </span>
                </p>
              )}
              {kanji.kun.length > 0 && (
                <p className="text-md-body-md">
                  <span className="font-semibold text-md-on-surface-variant mr-2">訓</span>
                  <span className="font-mono text-md-on-surface">
                    {kanji.kun.join("、 ")}
                  </span>
                </p>
              )}
            </div>

            {/* MD3 Assist Chips */}
            <div className="flex gap-2 flex-wrap">
              {kanji.jlpt && (
                <span className={`inline-flex items-center rounded-md-full border px-3 py-0.5 text-md-label-md font-medium ${LEVEL_BADGE[kanji.jlpt] ?? ""}`}>
                  JLPT {kanji.jlpt}
                </span>
              )}
              {kanji.grade !== null && (
                <span className="inline-flex items-center rounded-md-full border border-md-outline-variant px-3 py-0.5 text-md-label-md font-medium bg-md-surface-variant text-md-on-surface-variant">
                  {gradeLabel(kanji.grade)}
                </span>
              )}
            </div>

            {/* Compounds */}
            {kanji.compounds.length > 0 && (
              <>
                <hr className="border-md-outline-variant" />
                <ul className="space-y-2.5">
                  {kanji.compounds.map((c) => (
                    <li key={c.word} className="flex items-baseline gap-2 text-md-body-md">
                      <span className="font-serif text-base shrink-0 text-md-on-surface">
                        {c.word}
                      </span>
                      <span className="font-mono shrink-0 text-md-on-surface-variant">{c.reading}</span>
                      <span className="text-md-on-surface">{c.meaning}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

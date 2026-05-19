"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Kanji } from "@/app/data/kanji";

const LEVEL_COLORS: Record<string, string> = {
  N5: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  N4: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  N3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  N2: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  N1: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
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
}

const SWIPE_THRESHOLD = 50;

export default function FlashCard({ kanji, prevId, nextId }: Props) {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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
      // Horizontal swipe → navigate
      if (dx < 0 && nextId !== null) {
        router.push(`/kanji/${nextId}`);
      } else if (dx > 0 && prevId !== null) {
        router.push(`/kanji/${prevId}`);
      }
      return;
    }

    if (absDx < 10 && absDy < 10) {
      // Tap (no movement) → flip; suppress the subsequent click event
      e.preventDefault();
      setFlipped((f) => !f);
    }
    // Vertical swipe → do nothing (allow natural scroll)
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
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-[8rem] sm:text-[10rem] leading-none font-serif">
            {kanji.character}
          </span>
          <div className="mt-6 flex flex-col items-center gap-1">
            <p className="text-zinc-400 text-sm">tap to reveal</p>
            {(prevId !== null || nextId !== null) && (
              <p className="text-zinc-300 dark:text-zinc-600 text-xs">
                swipe ← → to navigate
              </p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-6 shadow-md overflow-y-auto dark:border-zinc-700 dark:bg-zinc-900"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header row */}
          <div className="flex items-baseline gap-4">
            <span className="text-4xl sm:text-5xl font-serif shrink-0">{kanji.character}</span>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-snug">
              {kanji.meaning}
            </p>
          </div>

          {/* Readings */}
          <div className="space-y-1">
            {kanji.on.length > 0 && (
              <p className="text-sm">
                <span className="font-medium text-zinc-500 dark:text-zinc-400 mr-2">音</span>
                <span className="font-mono tracking-wide">{kanji.on.join("、 ")}</span>
              </p>
            )}
            {kanji.kun.length > 0 && (
              <p className="text-sm">
                <span className="font-medium text-zinc-500 dark:text-zinc-400 mr-2">訓</span>
                <span className="font-mono tracking-wide">{kanji.kun.join("、 ")}</span>
              </p>
            )}
          </div>

          {/* JLPT + grade badges */}
          <div className="flex gap-2 flex-wrap">
            {kanji.jlpt && (
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_COLORS[kanji.jlpt] ?? ""}`}
              >
                JLPT {kanji.jlpt}
              </span>
            )}
            {kanji.grade !== null && (
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {gradeLabel(kanji.grade)}
              </span>
            )}
          </div>

          {/* Compounds */}
          {kanji.compounds.length > 0 && (
            <>
              <hr className="border-zinc-100 dark:border-zinc-800" />
              <ul className="space-y-2.5">
                {kanji.compounds.map((c) => (
                  <li key={c.word} className="flex items-baseline gap-2 text-sm">
                    <span className="font-serif text-base shrink-0">{c.word}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 font-mono shrink-0">
                      {c.reading}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-300">{c.meaning}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

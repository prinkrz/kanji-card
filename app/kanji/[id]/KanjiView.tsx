"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "@/app/components/Link";
import FlashCard from "@/app/components/FlashCard";
import type { Kanji } from "@/app/data/kanji";
import kanjiLevels from "@/app/data/kanjiLevels.json";

type KanjiWithIndex = Kanji & { index: number };

// Module-level cache: one Promise per level, shared across all renders and
// React Strict Mode's double-effect invocations.
const levelCache = new Map<string, Promise<KanjiWithIndex[]>>();

function fetchLevel(level: string): Promise<KanjiWithIndex[]> {
  if (!levelCache.has(level)) {
    levelCache.set(
      level,
      fetch(`/api/kanji/${level}`).then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<KanjiWithIndex[]>;
      })
    );
  }
  return levelCache.get(level)!;
}

function levelForIndex(index: number): string {
  const jlpt = (kanjiLevels as Array<string | null>)[index];
  return jlpt ? jlpt.toLowerCase() : "all";
}

interface Props {
  initialId: number;
  totalCount: number;
}

export default function KanjiView({ initialId, totalCount }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialId);
  const [kanji, setKanji] = useState<Kanji | null>(null);
  const [error, setError] = useState(false);

  const loadKanji = useCallback((index: number) => {
    setKanji(null);
    setError(false);
    const level = levelForIndex(index);
    fetchLevel(level)
      .then((entries) => {
        const found = entries.find((e) => e.index === index);
        if (!found) { setError(true); return; }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _i, ...kanjiData } = found;
        setKanji(kanjiData);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const level = levelForIndex(currentIndex);
    fetchLevel(level)
      .then((entries) => {
        if (cancelled) return;
        const found = entries.find((e) => e.index === currentIndex);
        if (!found) { setError(true); return; }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _i, ...kanjiData } = found;
        setKanji(kanjiData);
      })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [currentIndex]);

  const navigate = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= totalCount) return;
    setKanji(null);
    setCurrentIndex(newIndex);
    window.history.pushState(null, "", `/kanji/${newIndex}`);
  }, [totalCount]);

  useEffect(() => {
    function onPopState() {
      const match = window.location.pathname.match(/\/kanji\/(\d+)/);
      if (match) {
        const idx = Number(match[1]);
        setCurrentIndex(idx);
      }
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Suppress unused loadKanji warning — kept for potential external use
  void loadKanji;

  const prevId = currentIndex > 0 ? currentIndex - 1 : null;
  const nextId = currentIndex < totalCount - 1 ? currentIndex + 1 : null;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 text-md-on-surface-variant">
        <p className="text-md-body-md">Failed to load kanji data.</p>
        <Link href="/" className="text-md-label-lg text-md-primary underline">
          ← back to levels
        </Link>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div
        className="w-full rounded-md-xl bg-md-surface-container-high animate-pulse"
        style={{ minHeight: "460px" }}
      />
    );
  }

  return (
    <>
      <div className="flex-1">
        <FlashCard
          kanji={kanji}
          prevId={prevId}
          nextId={nextId}
          onNavigatePrev={prevId !== null ? () => navigate(prevId) : undefined}
          onNavigateNext={nextId !== null ? () => navigate(nextId) : undefined}
        />
      </div>

      <nav className="mt-6 grid grid-cols-2 gap-3">
        {prevId !== null ? (
          <button
            onClick={() => navigate(prevId)}
            className="md3-state-layer flex items-center justify-center rounded-md-sm border border-md-outline bg-md-surface-container text-md-on-surface py-4 text-md-label-lg font-medium shadow-md-elev-0 hover:shadow-md-elev-1 transition-all duration-200 active:shadow-md-elev-0"
          >
            ←
          </button>
        ) : (
          <div className="rounded-md-sm border border-md-outline-variant/30 py-4 opacity-30" />
        )}

        {nextId !== null ? (
          <button
            onClick={() => navigate(nextId)}
            className="md3-state-layer flex items-center justify-center rounded-md-sm border border-md-outline bg-md-surface-container text-md-on-surface py-4 text-md-label-lg font-medium shadow-md-elev-0 hover:shadow-md-elev-1 transition-all duration-200 active:shadow-md-elev-0"
          >
            →
          </button>
        ) : (
          <div className="rounded-md-sm border border-md-outline-variant/30 py-4 opacity-30" />
        )}
      </nav>
    </>
  );
}

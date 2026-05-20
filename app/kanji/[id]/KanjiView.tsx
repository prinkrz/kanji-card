"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@/app/components/Link";
import FlashCard from "@/app/components/FlashCard";
import type { Kanji } from "@/app/data/kanji";
import kanjiLevels from "@/app/data/kanjiLevels.json";

type KanjiWithIndex = Kanji & { index: number };
type NavDirection = "left" | "right";

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
  const [exitCard, setExitCard] = useState<{ kanji: Kanji; direction: NavDirection } | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [error, setError] = useState(false);

  const kanjiRef = useRef<Kanji | null>(null);
  const navDirection = useRef<NavDirection | null>(null);

  useEffect(() => { kanjiRef.current = kanji; }, [kanji]);

  useEffect(() => {
    let cancelled = false;
    setKanji(null);
    setError(false);
    fetchLevel(levelForIndex(currentIndex))
      .then((entries) => {
        if (cancelled) return;
        const found = entries.find((e) => e.index === currentIndex);
        if (!found) { setError(true); return; }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index: _i, ...kanjiData } = found;
        setKanji(kanjiData);
        setCardKey((k) => k + 1);
      })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [currentIndex]);

  const navigate = useCallback((newIndex: number, direction: NavDirection) => {
    if (newIndex < 0 || newIndex >= totalCount) return;
    navDirection.current = direction;
    if (kanjiRef.current) {
      setExitCard({ kanji: kanjiRef.current, direction });
    }
    setCurrentIndex(newIndex);
    window.history.pushState(null, "", `/kanji/${newIndex}`);
  }, [totalCount]);

  useEffect(() => {
    function onPopState() {
      const match = window.location.pathname.match(/\/kanji\/(\d+)/);
      if (match) {
        const idx = Number(match[1]);
        navigate(idx, idx > currentIndex ? "right" : "left");
      }
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [currentIndex, navigate]);

  const prevId = currentIndex > 0 ? currentIndex - 1 : null;
  const nextId = currentIndex < totalCount - 1 ? currentIndex + 1 : null;

  const enterClass =
    navDirection.current === "right" ? "animate-card-enter-from-right"
    : navDirection.current === "left"  ? "animate-card-enter-from-left"
    : "";

  if (error) {
    return (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Typography color="text.secondary">Failed to load kanji data.</Typography>
        <Button component={Link} href="/" variant="text" color="primary">
          ← back to levels
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ flex: 1, position: "relative", overflow: "hidden", minHeight: "460px" }}>
        {/* Ghost card — exit animation */}
        {exitCard && (
          <div
            className={`${
              exitCard.direction === "right"
                ? "animate-card-exit-left"
                : "animate-card-exit-right"
            }`}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            onAnimationEnd={() => setExitCard(null)}
          >
            <FlashCard kanji={exitCard.kanji} prevId={null} nextId={null} />
          </div>
        )}

        {/* Incoming card */}
        {kanji ? (
          <div key={cardKey} className={enterClass}>
            <FlashCard
              kanji={kanji}
              prevId={prevId}
              nextId={nextId}
              onNavigatePrev={prevId !== null ? () => navigate(prevId, "left") : undefined}
              onNavigateNext={nextId !== null ? () => navigate(nextId, "right") : undefined}
            />
          </div>
        ) : (
          !exitCard && (
            <Skeleton variant="rounded" height={460} sx={{ borderRadius: "28px" }} />
          )
        )}
      </Box>

      {/* Navigation buttons */}
      <Box sx={{ mt: 3, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        {prevId !== null ? (
          <Button
            variant="outlined"
            onClick={() => navigate(prevId, "left")}
            startIcon={<ArrowBackIcon />}
            sx={{ py: 1.5 }}
          >
            Prev
          </Button>
        ) : (
          <Box sx={{ border: "1px solid", borderColor: "divider", opacity: 0.3, borderRadius: 1, py: 1.5 }} />
        )}

        {nextId !== null ? (
          <Button
            variant="outlined"
            onClick={() => navigate(nextId, "right")}
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.5 }}
          >
            Next
          </Button>
        ) : (
          <Box sx={{ border: "1px solid", borderColor: "divider", opacity: 0.3, borderRadius: 1, py: 1.5 }} />
        )}
      </Box>
    </>
  );
}

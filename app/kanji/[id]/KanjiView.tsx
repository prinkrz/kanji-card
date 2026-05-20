"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
    window.history.pushState(null, "", `/kanji/${newIndex + 1}`);
  }, [totalCount]);

  useEffect(() => {
    function onPopState() {
      const match = window.location.pathname.match(/\/kanji\/(\d+)/);
      if (match) {
        const idx = Number(match[1]) - 1;
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
        <IconButton href="/" color="primary" aria-label="back to levels"><ArrowBackIcon /></IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, gap: 1 }}>

      {/* ── Compact header ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 0.5 }}>
        <Tooltip title="Back to levels">
          <IconButton href="/" size="small" color="primary" aria-label="back to levels">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
          {currentIndex + 1} <Box component="span" sx={{ opacity: 0.5 }}>/</Box> {totalCount}
        </Typography>
      </Box>

      {/* ── Card area — fills most of the space ── */}
      <Box sx={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
        {exitCard && (
          <div
            className={exitCard.direction === "right" ? "animate-card-exit-left" : "animate-card-exit-right"}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            onAnimationEnd={() => setExitCard(null)}
          >
            <FlashCard kanji={exitCard.kanji} prevId={null} nextId={null} />
          </div>
        )}

        {kanji ? (
          <div key={cardKey} className={enterClass} style={{ height: "100%" }}>
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
            <Skeleton variant="rounded" height="100%" sx={{ borderRadius: "28px", minHeight: 280 }} />
          )
        )}
      </Box>

      {/* ── Navigation ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, py: 0.5 }}>
        <IconButton
          onClick={() => prevId !== null && navigate(prevId, "left")}
          disabled={prevId === null}
          color="primary"
          aria-label="previous kanji"
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
          swipe or tap to flip
        </Typography>

        <IconButton
          onClick={() => nextId !== null && navigate(nextId, "right")}
          disabled={nextId === null}
          color="primary"
          aria-label="next kanji"
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

    </Box>
  );
}

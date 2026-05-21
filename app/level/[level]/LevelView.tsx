"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useTheme, alpha } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import FlashCard from "@/app/components/FlashCard";
import type { Kanji } from "@/app/data/kanji";

type NavDirection = "left" | "right";
type MuiColor = "success" | "info" | "warning" | "secondary" | "error" | "primary";

const LEVEL_COLOR: Record<string, MuiColor> = {
  N5: "success", N4: "info", N3: "warning", N2: "secondary", N1: "error",
};

interface Props {
  kanji: Kanji[];
}

export default function LevelView({ kanji }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [exitCard, setExitCard] = useState<{ kanji: Kanji; direction: NavDirection } | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const currentKanjiRef = useRef<Kanji | null>(null);
  const navDirection = useRef<NavDirection | null>(null);

  const colorKey: MuiColor = (kanji[0]?.jlpt ? (LEVEL_COLOR[kanji[0].jlpt!] ?? "primary") : "primary") as MuiColor;
  const palette = theme.palette[colorKey];

  const openCard = (index: number) => {
    navDirection.current = null;
    currentKanjiRef.current = kanji[index];
    setSelectedIndex(index);
    setCardKey((k) => k + 1);
    setExitCard(null);
  };

  const closeCard = () => {
    setSelectedIndex(null);
    setExitCard(null);
    navDirection.current = null;
  };

  const navigate = useCallback((newIndex: number, direction: NavDirection) => {
    if (newIndex < 0 || newIndex >= kanji.length) return;
    navDirection.current = direction;
    if (currentKanjiRef.current) {
      setExitCard({ kanji: currentKanjiRef.current, direction });
    }
    currentKanjiRef.current = kanji[newIndex];
    setSelectedIndex(newIndex);
    setCardKey((k) => k + 1);
  }, [kanji]);

  // ── Grid view ──────────────────────────────────────────────────────────────
  return (
    <Box sx={{ position: "relative", flex: 1 }}>

      {/* Kanji grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 1,
        }}
      >
        {kanji.map((k, i) => (
          <ButtonBase
            key={k.character}
            onClick={() => openCard(i)}
            sx={{
              aspectRatio: "1/1",
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(palette.main, 0.25),
              bgcolor: alpha(palette.main, 0.06),
              color: palette.dark ?? palette.main,
              fontSize: "1.5rem",
              fontFamily: "serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 150ms, box-shadow 150ms, background-color 150ms",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: `0 2px 12px ${alpha(palette.main, 0.25)}`,
                bgcolor: alpha(palette.main, 0.14),
              },
              "&:active": { transform: "scale(0.95)" },
            }}
          >
            {k.character}
          </ButtonBase>
        ))}
      </Box>

      {/* Flashcard overlay */}
      {selectedIndex !== null && (() => {
        const current = kanji[selectedIndex];
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : null;
        const nextIndex = selectedIndex < kanji.length - 1 ? selectedIndex + 1 : null;
        const enterClass =
          navDirection.current === "right" ? "animate-card-enter-from-right"
          : navDirection.current === "left"  ? "animate-card-enter-from-left"
          : "";

        return (
          <Box
            sx={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1300,
              bgcolor: "background.default",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Overlay header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                py: 1,
                flexShrink: 0,
              }}
            >
              <Tooltip title="Back to list">
                <IconButton onClick={closeCard} size="small" color="primary" aria-label="back to list">
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                {selectedIndex + 1}{" "}
                <Box component="span" sx={{ opacity: 0.5 }}>/</Box>{" "}
                {kanji.length}
              </Typography>
              <Tooltip title="Close">
                <IconButton onClick={closeCard} size="small" aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Card */}
            <Box sx={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", px: 2, py: 2 }}>
              {exitCard && (
                <div
                  className={exitCard.direction === "right" ? "animate-card-exit-left" : "animate-card-exit-right"}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none", padding: "16px" }}
                  onAnimationEnd={() => setExitCard(null)}
                >
                  <FlashCard kanji={exitCard.kanji} prevId={null} nextId={null} />
                </div>
              )}
              <div key={cardKey} className={enterClass} style={{ height: "100%" }}>
                <FlashCard
                  kanji={current}
                  prevId={prevIndex}
                  nextId={nextIndex}
                  onNavigatePrev={prevIndex !== null ? () => navigate(prevIndex, "left") : undefined}
                  onNavigateNext={nextIndex !== null ? () => navigate(nextIndex, "right") : undefined}
                />
              </div>
            </Box>

            {/* Navigation */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, flexShrink: 0 }}>
              <IconButton
                onClick={() => prevIndex !== null && navigate(prevIndex, "left")}
                disabled={prevIndex === null}
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
                onClick={() => nextIndex !== null && navigate(nextIndex, "right")}
                disabled={nextIndex === null}
                color="primary"
                aria-label="next kanji"
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      })()}

    </Box>
  );
}

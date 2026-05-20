"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useTheme, alpha } from "@mui/material/styles";
import type { Kanji } from "@/app/data/kanji";

type MuiColor = "success" | "info" | "warning" | "secondary" | "error" | "primary";

const LEVEL_COLOR: Record<string, MuiColor> = {
  N5: "success",
  N4: "info",
  N3: "warning",
  N2: "secondary",
  N1: "error",
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
  const theme = useTheme();

  const colorKey: MuiColor = kanji.jlpt ? (LEVEL_COLOR[kanji.jlpt] ?? "primary") : "primary";
  const palette = theme.palette[colorKey];

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
      style={{ perspective: "1200px", height: "100%", minHeight: "280px", cursor: "pointer", userSelect: "none" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "280px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 500ms",
        }}
      >
        {/* ── FRONT ── */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "28px",
            bgcolor: alpha(palette.main, 0.08),
            border: "1px solid",
            borderColor: alpha(palette.main, 0.2),
            boxShadow: `0 2px 16px ${alpha(palette.main, 0.12)}`,
            overflow: "hidden",
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* faint ring */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "28px",
              border: `1px solid ${alpha(palette.main, 0.15)}`,
              pointerEvents: "none",
            }}
          />

          <Typography
            component="span"
            sx={{
              fontSize: { xs: "8rem", sm: "10rem" },
              lineHeight: 1,
              fontFamily: "serif",
              color: palette.dark ?? palette.main,
            }}
          >
            {kanji.character}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              tap to reveal
            </Typography>
            {(prevId !== null || nextId !== null) && (
              <Typography variant="caption" color="text.disabled">
                swipe ← → to navigate
              </Typography>
            )}
          </Box>
        </Box>

        {/* ── BACK ── */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            borderRadius: "28px",
            boxShadow: 6,
            overflow: "hidden",
          }}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Coloured header strip */}
          <Box
            sx={{
              bgcolor: alpha(palette.main, 0.1),
              borderBottom: "1px solid",
              borderColor: alpha(palette.main, 0.15),
              px: 3,
              py: 2.5,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
              <Typography
                component="span"
                sx={{ fontSize: { xs: "2.25rem", sm: "3rem" }, fontFamily: "serif", lineHeight: 1, color: palette.dark ?? palette.main }}
              >
                {kanji.character}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {kanji.meaning}
              </Typography>
            </Box>
          </Box>

          {/* Content area */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              bgcolor: "background.paper",
              color: "text.primary",
              px: 3,
              py: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Readings */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {kanji.on.length > 0 && (
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: 600, color: "text.secondary", mr: 1 }}>音</Box>
                  <Box component="span" sx={{ fontFamily: "monospace" }}>{kanji.on.join("、 ")}</Box>
                </Typography>
              )}
              {kanji.kun.length > 0 && (
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: 600, color: "text.secondary", mr: 1 }}>訓</Box>
                  <Box component="span" sx={{ fontFamily: "monospace" }}>{kanji.kun.join("、 ")}</Box>
                </Typography>
              )}
            </Box>

            {/* Badges */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {kanji.jlpt && (
                <Chip
                  label={`JLPT ${kanji.jlpt}`}
                  color={colorKey}
                  size="small"
                  sx={{ fontFamily: theme.typography.fontFamily }}
                />
              )}
              {kanji.grade !== null && gradeLabel(kanji.grade) && (
                <Chip
                  label={gradeLabel(kanji.grade)!}
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>

            {/* Compounds */}
            {kanji.compounds.length > 0 && (
              <>
                <Divider />
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1.25 }}>
                  {kanji.compounds.map((c) => (
                    <Box
                      key={c.word}
                      component="li"
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
                      <Typography
                        component="span"
                        sx={{ fontFamily: "serif", fontSize: "1rem", flexShrink: 0, color: "text.primary" }}
                      >
                        {c.word}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ fontFamily: "monospace", flexShrink: 0, color: "text.secondary" }}
                      >
                        {c.reading}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary">
                        {c.meaning}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

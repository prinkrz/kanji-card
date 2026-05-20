"use client";

import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import Link from "@/app/components/Link";
import { kanjiList, type Kanji } from "@/app/data/kanji";

export type KanjiEntry = { kanji: Kanji; index: number };

interface Props {
  entries?: KanjiEntry[];
}

type MuiColor = "success" | "info" | "warning" | "secondary" | "error" | "primary";

const LEVEL_COLOR: Record<string, MuiColor> = {
  N5: "success",
  N4: "info",
  N3: "warning",
  N2: "secondary",
  N1: "error",
};

function KanjiTile({ kanji, index }: KanjiEntry) {
  const theme = useTheme();
  const color: MuiColor = kanji.jlpt ? (LEVEL_COLOR[kanji.jlpt] ?? "primary") : "primary";
  const palette = theme.palette[color];

  return (
    <ButtonBase
      component={Link}
      href={`/kanji/${index + 1}`}
      title={kanji.meaning}
      sx={{
        aspectRatio: "1 / 1",
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(palette.main, 0.4),
        bgcolor: alpha(palette.main, 0.08),
        color: palette.dark ?? palette.main,
        fontSize: "1.5rem",
        fontFamily: "serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 150ms, box-shadow 150ms",
        "&:hover": { transform: "scale(1.1)", boxShadow: 2, bgcolor: alpha(palette.main, 0.15) },
        "&:active": { transform: "scale(0.95)" },
      }}
    >
      {kanji.character}
    </ButtonBase>
  );
}

export default function KanjiGrid({ entries }: Props) {
  const items = entries ?? kanjiList.map((kanji, index) => ({ kanji, index }));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(5, 1fr)",
          sm: "repeat(8, 1fr)",
          md: "repeat(10, 1fr)",
        },
        gap: 1,
      }}
    >
      {items.map(({ kanji, index }) => (
        <KanjiTile key={index} kanji={kanji} index={index} />
      ))}
    </Box>
  );
}

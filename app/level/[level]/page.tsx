import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { kanjiList } from "@/app/data/kanji";
import KanjiGrid from "@/app/components/KanjiGrid";

const VALID_LEVELS = ["n5", "n4", "n3", "n2", "n1", "all"] as const;
type Level = (typeof VALID_LEVELS)[number];

type MuiColor = "success" | "info" | "warning" | "secondary" | "error" | "primary" | "default";

const LEVEL_META: Record<Level, { label: string; description: string; color: MuiColor }> = {
  n5:  { label: "N5",  description: "Beginner",           color: "success" },
  n4:  { label: "N4",  description: "Elementary",          color: "info" },
  n3:  { label: "N3",  description: "Intermediate",        color: "warning" },
  n2:  { label: "N2",  description: "Upper Intermediate",  color: "secondary" },
  n1:  { label: "N1",  description: "Advanced",            color: "error" },
  all: { label: "All", description: "All Levels",          color: "primary" },
};

export async function generateStaticParams() {
  return VALID_LEVELS.map((level) => ({ level }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!VALID_LEVELS.includes(level as Level)) return {};
  const meta = LEVEL_META[level as Level];
  return {
    title: `JLPT ${meta.label} Kanji — ${meta.description}`,
    description: `Study all JLPT ${meta.label} kanji with interactive flashcards.`,
  };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;

  if (!VALID_LEVELS.includes(level as Level)) notFound();

  const lv = level as Level;
  const meta = LEVEL_META[lv];

  const entries =
    lv === "all"
      ? kanjiList.map((kanji, index) => ({ kanji, index }))
      : kanjiList
          .map((kanji, index) => ({ kanji, index }))
          .filter(({ kanji }) => kanji.jlpt === lv.toUpperCase());

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Button
              href="/"
              color="primary"
              variant="text"
              startIcon={<ArrowBackIcon />}
              size="small"
            >
              levels
            </Button>
            <Chip label={meta.label} color={meta.color} size="small" />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            {meta.description}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
          {entries.length} kanji
        </Typography>
      </Box>

      <KanjiGrid entries={entries} />
    </Container>
  );
}

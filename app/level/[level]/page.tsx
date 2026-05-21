import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { kanjiList } from "@/app/data/kanji";
import LevelView from "./LevelView";

const LEVELS = ["n5", "n4", "n3", "n2", "n1"] as const;
type Level = (typeof LEVELS)[number];

type MuiColor = "success" | "info" | "warning" | "secondary" | "error";

const LEVEL_META: Record<Level, { label: string; description: string; color: MuiColor }> = {
  n5: { label: "N5", description: "Beginner",          color: "success" },
  n4: { label: "N4", description: "Elementary",        color: "info" },
  n3: { label: "N3", description: "Intermediate",      color: "warning" },
  n2: { label: "N2", description: "Upper Intermediate", color: "secondary" },
  n1: { label: "N1", description: "Advanced",          color: "error" },
};

export function generateStaticParams() {
  return LEVELS.map((level) => ({ level }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!LEVELS.includes(level as Level)) return {};
  const meta = LEVEL_META[level as Level];
  return {
    title: `JLPT ${meta.label} Kanji — ${meta.description}`,
    description: `Study all JLPT ${meta.label} kanji with interactive flashcards.`,
  };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!LEVELS.includes(level as Level)) notFound();

  const lv = level as Level;
  const meta = LEVEL_META[lv];
  const entries = kanjiList.filter((k) => k.jlpt === lv.toUpperCase());

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Chip label={meta.label} color={meta.color} size="small" />
        <Typography variant="h6" fontWeight="bold">{meta.description}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
          {entries.length} kanji
        </Typography>
      </Box>
      <LevelView kanji={entries} />
    </Container>
  );
}

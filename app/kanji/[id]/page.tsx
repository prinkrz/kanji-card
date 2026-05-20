import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { kanjiList } from "@/app/data/kanji";
import KanjiView from "./KanjiView";

export async function generateStaticParams() {
  return kanjiList.map((_, index) => ({ id: String(index) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kanji = kanjiList[Number(id)];
  if (!kanji) return {};
  return {
    title: `${kanji.character} — ${kanji.meaning}`,
    description: `Study the kanji ${kanji.character}: ${kanji.meaning}. On readings: ${kanji.on.join(", ")}. Kun readings: ${kanji.kun.join(", ")}.`,
  };
}

export default async function KanjiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = Number(id);
  const kanji = kanjiList[index];

  if (!kanji) notFound();

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", flex: 1, pt: 3, pb: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Button
          href="/"
          variant="text"
          color="primary"
          startIcon={<ArrowBackIcon />}
          size="small"
        >
          levels
        </Button>
        <Typography variant="caption" color="text.secondary">
          {index + 1} / {kanjiList.length}
        </Typography>
      </Box>

      <KanjiView initialId={index} totalCount={kanjiList.length} />
    </Container>
  );
}

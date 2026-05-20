import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import { kanjiList } from "@/app/data/kanji";
import KanjiView from "./KanjiView";

export async function generateStaticParams() {
  return kanjiList.map((_, index) => ({ id: String(index + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kanji = kanjiList[Number(id) - 1];
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
  const index = Number(id) - 1;
  const kanji = kanjiList[index];

  if (!kanji) notFound();

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, py: 1.5 }}
    >
      <KanjiView initialId={index} totalCount={kanjiList.length} />
    </Container>
  );
}

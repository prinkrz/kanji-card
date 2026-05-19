import { notFound } from "next/navigation";
import Link from "@/app/components/Link";
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
    <main className="flex flex-col flex-1 mx-auto w-full max-w-lg px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="md3-state-layer rounded-md-xs px-2 py-1 text-md-label-lg text-md-primary"
        >
          ← levels
        </Link>
        <span className="text-md-label-sm text-md-on-surface-variant">
          {index + 1} / {kanjiList.length}
        </span>
      </div>

      <KanjiView initialId={index} totalCount={kanjiList.length} />
    </main>
  );
}

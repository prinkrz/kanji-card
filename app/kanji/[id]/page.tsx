import { notFound } from "next/navigation";
import Link from "next/link";
import { kanjiList } from "@/app/data/kanji";
import FlashCard from "@/app/components/FlashCard";

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

  const prev = index > 0 ? index - 1 : null;
  const next = index < kanjiList.length - 1 ? index + 1 : null;

  return (
    <main className="flex flex-col min-h-dvh mx-auto w-full max-w-lg px-4 pt-6 pb-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="flex items-center gap-1 py-1 hover:text-zinc-900 dark:hover:text-zinc-100">
          ← levels
        </Link>
        <span className="text-xs text-zinc-400 dark:text-zinc-600">
          {index + 1} / {kanjiList.length}
        </span>
      </div>

      {/* Card */}
      <div className="flex-1">
        <FlashCard kanji={kanji} prevId={prev} nextId={next} />
      </div>

      {/* Bottom navigation — large touch targets */}
      <nav className="mt-6 grid grid-cols-2 gap-3">
        {prev !== null ? (
          <Link
            href={`/kanji/${prev}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-700 transition-colors active:bg-zinc-100 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:active:bg-zinc-800"
          >
            ← {kanjiList[prev].character}
          </Link>
        ) : (
          <div className="rounded-xl border border-zinc-100 py-4 dark:border-zinc-800 opacity-30" />
        )}

        {next !== null ? (
          <Link
            href={`/kanji/${next}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-700 transition-colors active:bg-zinc-100 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:active:bg-zinc-800"
          >
            {kanjiList[next].character} →
          </Link>
        ) : (
          <div className="rounded-xl border border-zinc-100 py-4 dark:border-zinc-800 opacity-30" />
        )}
      </nav>
    </main>
  );
}

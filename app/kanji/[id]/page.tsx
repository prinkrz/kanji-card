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
    <main className="mx-auto w-full max-w-lg px-6 py-12">
      {/* Nav */}
      <div className="mb-8 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← all kanji
        </Link>
        <div className="flex gap-4">
          {prev !== null ? (
            <Link
              href={`/kanji/${prev}`}
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← prev
            </Link>
          ) : (
            <span className="opacity-30">← prev</span>
          )}
          {next !== null ? (
            <Link
              href={`/kanji/${next}`}
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              next →
            </Link>
          ) : (
            <span className="opacity-30">next →</span>
          )}
        </div>
      </div>

      <FlashCard kanji={kanji} />
    </main>
  );
}

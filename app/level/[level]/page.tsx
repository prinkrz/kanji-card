import { notFound } from "next/navigation";
import Link from "next/link";
import { kanjiList } from "@/app/data/kanji";
import KanjiGrid from "@/app/components/KanjiGrid";

const VALID_LEVELS = ["n5", "n4", "n3", "n2", "n1", "all"] as const;
type Level = (typeof VALID_LEVELS)[number];

const LEVEL_META: Record<Level, { label: string; description: string; badge: string }> = {
  n5: { label: "N5", description: "Beginner", badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  n4: { label: "N4", description: "Elementary", badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  n3: { label: "N3", description: "Intermediate", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  n2: { label: "N2", description: "Upper Intermediate", badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  n1: { label: "N1", description: "Advanced", badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  all: { label: "All", description: "All Levels", badge: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
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
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              ← levels
            </Link>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.badge}`}>
              {meta.label}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {meta.description}
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm shrink-0">
          {entries.length} kanji
        </p>
      </div>

      <KanjiGrid entries={entries} />
    </main>
  );
}

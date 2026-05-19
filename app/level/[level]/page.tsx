import { notFound } from "next/navigation";
import Link from "next/link";
import { kanjiList } from "@/app/data/kanji";
import KanjiGrid from "@/app/components/KanjiGrid";

const VALID_LEVELS = ["n5", "n4", "n3", "n2", "n1", "all"] as const;
type Level = (typeof VALID_LEVELS)[number];

const LEVEL_META: Record<Level, { label: string; description: string; badge: string }> = {
  n5:  { label: "N5",  description: "Beginner",          badge: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700" },
  n4:  { label: "N4",  description: "Elementary",         badge: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700" },
  n3:  { label: "N3",  description: "Intermediate",       badge: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700" },
  n2:  { label: "N2",  description: "Upper Intermediate", badge: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700" },
  n1:  { label: "N1",  description: "Advanced",           badge: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-200 dark:border-rose-700" },
  all: { label: "All", description: "All Levels",         badge: "bg-md-primary-container text-md-on-primary-container border-md-outline-variant" },
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
            <Link
              href="/"
              className="md3-state-layer rounded-md-xs px-2 py-1 text-md-label-lg text-md-primary"
            >
              ← levels
            </Link>
            <span className={`inline-flex items-center rounded-md-full border px-3 py-1 text-md-label-md font-medium ${meta.badge}`}>
              {meta.label}
            </span>
          </div>
          <h1 className="text-md-headline-sm font-bold text-md-on-surface">
            {meta.description}
          </h1>
        </div>
        <p className="text-md-body-md text-md-on-surface-variant shrink-0">
          {entries.length} kanji
        </p>
      </div>

      <KanjiGrid entries={entries} />
    </main>
  );
}

import Link from "next/link";
import { kanjiList } from "@/app/data/kanji";

const LEVELS = [
  { id: "n5", label: "N5", description: "Beginner", color: "border-green-400 dark:border-green-600", badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { id: "n4", label: "N4", description: "Elementary", color: "border-blue-400 dark:border-blue-600", badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { id: "n3", label: "N3", description: "Intermediate", color: "border-yellow-400 dark:border-yellow-600", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  { id: "n2", label: "N2", description: "Upper Intermediate", color: "border-orange-400 dark:border-orange-600", badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  { id: "n1", label: "N1", description: "Advanced", color: "border-red-400 dark:border-red-600", badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
] as const;

export default function Home() {
  const counts = Object.fromEntries(
    LEVELS.map(({ id }) => [
      id,
      kanjiList.filter((k) => k.jlpt === id.toUpperCase()).length,
    ])
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          漢字カード
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          {kanjiList.length} kanji across all JLPT levels — choose a level to study
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEVELS.map(({ id, label, description, color, badge }) => (
          <Link
            key={id}
            href={`/level/${id}`}
            className={`group flex flex-col gap-3 rounded-2xl border-2 ${color} bg-white p-6 transition-shadow hover:shadow-lg dark:bg-zinc-900`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${badge}`}>
                {label}
              </span>
              <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 transition-colors">
                →
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{description}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {counts[id] ?? 0} kanji
              </p>
            </div>
          </Link>
        ))}

        {/* All kanji card */}
        <Link
          href="/level/all"
          className="group flex flex-col gap-3 rounded-2xl border-2 border-zinc-300 dark:border-zinc-600 bg-white p-6 transition-shadow hover:shadow-lg dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full px-3 py-1 text-sm font-bold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              All
            </span>
            <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 transition-colors">
              →
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">All Levels</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {kanjiList.length} kanji
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}

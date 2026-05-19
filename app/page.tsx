import Link from "@/app/components/Link";
import { kanjiList } from "@/app/data/kanji";

const LEVELS = [
  {
    id: "n5",
    label: "N5",
    description: "Beginner",
    gradient: "from-emerald-400 to-teal-500",
    shadow: "hover:shadow-emerald-200 dark:hover:shadow-emerald-900",
    decor: "易",
  },
  {
    id: "n4",
    label: "N4",
    description: "Elementary",
    gradient: "from-blue-400 to-indigo-500",
    shadow: "hover:shadow-blue-200 dark:hover:shadow-blue-900",
    decor: "初",
  },
  {
    id: "n3",
    label: "N3",
    description: "Intermediate",
    gradient: "from-amber-400 to-orange-400",
    shadow: "hover:shadow-amber-200 dark:hover:shadow-amber-900",
    decor: "中",
  },
  {
    id: "n2",
    label: "N2",
    description: "Upper Intermediate",
    gradient: "from-orange-400 to-rose-500",
    shadow: "hover:shadow-orange-200 dark:hover:shadow-orange-900",
    decor: "上",
  },
  {
    id: "n1",
    label: "N1",
    description: "Advanced",
    gradient: "from-rose-500 to-red-600",
    shadow: "hover:shadow-rose-200 dark:hover:shadow-rose-900",
    decor: "難",
  },
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
        <h1 className="text-md-headline-lg font-bold text-md-on-surface">
          漢字カード
        </h1>
        <p className="mt-2 text-md-body-lg text-md-on-surface-variant">
          {kanjiList.length} kanji across all JLPT levels — choose a level to study
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEVELS.map(({ id, label, description, gradient, shadow, decor }) => (
          <Link
            key={id}
            href={`/level/${id}`}
            className={`md3-state-layer group relative overflow-hidden flex flex-col gap-2 rounded-md-xl bg-gradient-to-br ${gradient} p-6 text-white shadow-md-elev-2 ${shadow} hover:shadow-md-elev-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md-elev-1`}
          >
            {/* Decorative background character */}
            <span className="pointer-events-none absolute -right-3 -bottom-5 select-none font-serif text-[7rem] leading-none text-white/10">
              {decor}
            </span>

            <div className="flex items-center justify-between">
              <span className="rounded-md-full bg-white/20 px-3 py-1 text-md-label-lg font-bold backdrop-blur-sm">
                {label}
              </span>
              <span className="text-white/50 text-xl transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="mt-1">
              <p className="text-md-title-md">{description}</p>
              <p className="mt-0.5 text-md-body-sm text-white/70">{counts[id] ?? 0} kanji</p>
            </div>
          </Link>
        ))}

        {/* All kanji card */}
        <Link
          href="/level/all"
          className="md3-state-layer group relative overflow-hidden flex flex-col gap-2 rounded-md-xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white shadow-md-elev-2 hover:shadow-violet-200 dark:hover:shadow-violet-900 hover:shadow-md-elev-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md-elev-1"
        >
          <span className="pointer-events-none absolute -right-3 -bottom-5 select-none font-serif text-[7rem] leading-none text-white/10">
            全
          </span>
          <div className="flex items-center justify-between">
            <span className="rounded-md-full bg-white/20 px-3 py-1 text-md-label-lg font-bold backdrop-blur-sm">
              All
            </span>
            <span className="text-white/50 text-xl transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
          <div className="mt-1">
            <p className="text-md-title-md">All Levels</p>
            <p className="mt-0.5 text-md-body-sm text-white/70">{kanjiList.length} kanji</p>
          </div>
        </Link>
      </div>
    </main>
  );
}

import Link from "@/app/components/Link";
import { kanjiList, type Kanji } from "@/app/data/kanji";

export type KanjiEntry = { kanji: Kanji; index: number };

interface Props {
  entries?: KanjiEntry[];
}

const LEVEL_CLASSES: Record<string, string> = {
  N5: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100",
  N4: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100",
  N3: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
  N2: "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-100",
  N1: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100",
};

const DEFAULT_CLASSES =
  "border-md-outline-variant bg-md-surface-container text-md-on-surface";

export default function KanjiGrid({ entries }: Props) {
  const items = entries ?? kanjiList.map((kanji, index) => ({ kanji, index }));

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {items.map(({ kanji, index }) => {
        const colorClasses = kanji.jlpt ? (LEVEL_CLASSES[kanji.jlpt] ?? DEFAULT_CLASSES) : DEFAULT_CLASSES;
        return (
          <Link
            key={index}
            href={`/kanji/${index}`}
            title={kanji.meaning}
            className={`md3-state-layer aspect-square flex items-center justify-center rounded-md-md border text-2xl font-serif transition-all duration-150 hover:scale-110 hover:shadow-md-elev-1 active:scale-95 ${colorClasses}`}
          >
            {kanji.character}
          </Link>
        );
      })}
    </div>
  );
}

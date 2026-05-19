import Link from "next/link";
import { kanjiList, type Kanji } from "@/app/data/kanji";

export type KanjiEntry = { kanji: Kanji; index: number };

interface Props {
  entries?: KanjiEntry[];
}

export default function KanjiGrid({ entries }: Props) {
  const items = entries ?? kanjiList.map((kanji, index) => ({ kanji, index }));

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {items.map(({ kanji, index }) => (
        <Link
          key={index}
          href={`/kanji/${index}`}
          className="aspect-square flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-2xl font-serif transition-colors hover:border-zinc-400 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
          title={kanji.meaning}
        >
          {kanji.character}
        </Link>
      ))}
    </div>
  );
}

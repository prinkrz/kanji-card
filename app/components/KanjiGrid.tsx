import Link from "next/link";
import { kanjiList, type Kanji } from "@/app/data/kanji";

export type KanjiEntry = { kanji: Kanji; index: number };

interface Props {
  entries?: KanjiEntry[];
}

export default function KanjiGrid({ entries }: Props) {
  const items = entries ?? kanjiList.map((kanji, index) => ({ kanji, index }));

  return (
    <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
      {items.map(({ kanji, index }) => (
        <Link
          key={index}
          href={`/kanji/${index}`}
          className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 text-2xl font-serif transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
          title={kanji.meaning}
        >
          {kanji.character}
        </Link>
      ))}
    </div>
  );
}

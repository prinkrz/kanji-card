export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">漢字カード</span>
          {" "}— Japanese kanji flashcards
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Readings and compounds based on JLPT N5–N1 curriculum
        </p>
      </div>
    </footer>
  );
}

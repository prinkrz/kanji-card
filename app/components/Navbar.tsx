import Link from "next/link";

const LEVELS = [
  { id: "n5", label: "N5" },
  { id: "n4", label: "N4" },
  { id: "n3", label: "N3" },
  { id: "n2", label: "N2" },
  { id: "n1", label: "N1" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity"
        >
          漢字<span className="text-zinc-400 dark:text-zinc-500 font-normal ml-0.5 text-base">カード</span>
        </Link>

        {/* Level links — hidden on very small screens, shown from sm up */}
        <nav className="hidden sm:flex items-center gap-1">
          {LEVELS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/level/${id}`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/level/all"
            className="ml-1 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            All
          </Link>
        </nav>

        {/* Mobile: show level links as compact chips */}
        <nav className="flex sm:hidden items-center gap-1">
          {LEVELS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/level/${id}`}
              className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

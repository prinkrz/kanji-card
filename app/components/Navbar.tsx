import Link from "@/app/components/Link";
import Logo from "./Logo";

const LEVELS = [
  { id: "n5", label: "N5" },
  { id: "n4", label: "N4" },
  { id: "n3", label: "N3" },
  { id: "n2", label: "N2" },
  { id: "n1", label: "N1" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-md-outline-variant bg-md-surface-container/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="md3-state-layer rounded-md-sm flex items-center gap-2.5 px-2 py-1 transition-opacity"
        >
          <Logo size={30} />
          <span className="text-md-title-lg text-md-on-surface">
            漢字<span className="text-md-on-surface-variant font-normal ml-0.5 text-base">カード</span>
          </span>
        </Link>

        {/* Level links — desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {LEVELS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/level/${id}`}
              className="md3-state-layer rounded-md-sm px-3 py-1.5 text-md-label-lg text-md-on-surface-variant transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/level/all"
            className="md3-state-layer ml-1 rounded-md-sm px-3 py-1.5 text-md-label-lg text-md-on-surface-variant transition-colors"
          >
            All
          </Link>
        </nav>

        {/* Level chips — mobile */}
        <nav className="flex sm:hidden items-center gap-1">
          {LEVELS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/level/${id}`}
              className="md3-state-layer rounded-md-xs px-2 py-1 text-md-label-sm text-md-on-surface-variant"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-md-outline-variant bg-md-surface-container-low">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-md-body-md text-md-on-surface-variant">
          <span className="text-md-title-sm text-md-on-surface">漢字カード</span>
          {" "}— Japanese kanji flashcards
        </p>
        <p className="text-md-body-sm text-md-on-surface-variant/60">
          Readings and compounds based on JLPT N5–N1 curriculum
        </p>
      </div>
    </footer>
  );
}

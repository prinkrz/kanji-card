import { NextResponse } from "next/server";
import { kanjiList } from "@/app/data/kanji";

const VALID_LEVELS = new Set(["n5", "n4", "n3", "n2", "n1", "all"]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level } = await params;

  if (!VALID_LEVELS.has(level)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 404 });
  }

  const entries = kanjiList.flatMap((kanji, index) => {
    if (level !== "all" && kanji.jlpt !== level.toUpperCase()) return [];
    return [{ ...kanji, index }];
  });

  return NextResponse.json(entries, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}

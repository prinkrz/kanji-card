import kanjiData from "./kanji.json";

export type Compound = {
  word: string;
  reading: string;
  meaning: string;
};

export type Kanji = {
  character: string;
  meaning: string;
  jlpt: "N5" | "N4" | "N3" | "N2" | "N1" | null;
  grade: number | null;
  on: string[];
  kun: string[];
  compounds: Compound[];
};

// The JSON file contains the 2,000 highest-frequency KANJIDIC2 kanji.
export const kanjiList = kanjiData as Kanji[];

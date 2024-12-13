/** @format */

import { WordI } from "@/lib/types";

function Word({
  word,
  selectWord,
}: {
  word: WordI;
  selectWord: (word: WordI) => void;
}) {
  return (
    <div
      className="bg-secondary cursor-crosshair hover:bg-accent hover:text-background transition-all rounded-lg px-4 py-1 text-lg font-title"
      onClick={() => selectWord(word)}
    >
      {word.word}
    </div>
  );
}

export function Collection({
  words,
  selectWord,
}: {
  words: WordI[];
  selectWord: (word: WordI) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {words.map((word, index) => (
        <Word word={word} key={index} selectWord={selectWord} />
      ))}
    </div>
  );
}

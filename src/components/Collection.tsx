/** @format */

import { WordI } from "@/lib/types";

interface CollectionI {
  words: WordI[];
  selectWord: (word: WordI) => void;
  // view: "lexico" | "chrono";
}

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
  // view
}: CollectionI) {

  const lexicallyCategorizedWords = words.reduce((categories, word) => {
    const firstLetter = word.word[0].toUpperCase();
    if (!categories[firstLetter]) {
      categories[firstLetter] = [];
    }
    categories[firstLetter].push(word);
    return categories;
  }, {} as Record<string, WordI[]>);
  const letters = Object.keys(lexicallyCategorizedWords).sort();


  return (
    <div className="flex flex-col gap-6 overflow-scroll">
      {
        letters.map((letter) => (
          <div key={letter} className="flex flex-col gap-2">
            <div className="w-[1000px] border-b-[0.5px] border-secondary">
              <h2 className="text-md text-secondary font-title">{letter}</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {lexicallyCategorizedWords[letter].map((word, index) => (
                <Word word={word} key={index} selectWord={selectWord} />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}

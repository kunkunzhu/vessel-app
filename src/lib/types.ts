/** @format */

export interface DefinitionsI {
  type: string;
  meanings: string[];
}

export interface WordI {
  word: string;
  phonetic?: string;
  definitions: DefinitionsI[];
}

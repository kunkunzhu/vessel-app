/** @format */

import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import firebase_app from "./config";
import { WordI } from "@/lib/types";

const db = getFirestore(firebase_app);

export const addWordForUser = async (userId: string, wordData: WordI) => {
  try {
    const wordsCollection = collection(db, "users", userId, "words");
    const wordDoc = doc(wordsCollection, wordData.word.toLocaleLowerCase());

    await setDoc(wordDoc, {
      ...wordData,
      timestamp: new Date().toISOString(),
    });
    console.log("successfully added word: ", wordData.word);
  } catch (error) {
    console.log("error adding word: ", error);
  }
};

export const fetchUserWords = async ({ userId, searchQuery }: { userId: string, searchQuery: string }) => {
  try {
    const wordsCollection = searchQuery ? query(
      collection(db, "users", userId, "words"),
      where('word', '>=', searchQuery),
      where('word', '<=', searchQuery + '\uf8ff')
    ) : collection(db, "users", userId, "words")

    const snapshot = await getDocs(wordsCollection);

    const words: WordI[] = snapshot.docs.map((doc) => ({
      word: doc.id,
      phonetic: doc.data().phonetic,
      definitions: doc.data().definitions,
    }));

    return words;
  } catch (error) {
    console.error("error fetching word: ", error);
    return [];
  }
};

export const deleteWordForUser = async (userId: string, wordData: WordI) => {
  try {
    const wordDoc = doc(
      db,
      "users",
      userId,
      "words",
      wordData.word.toLowerCase()
    );
    await deleteDoc(wordDoc);

    console.log("successfully deleted the word:", wordData.word);
  } catch (error) {
    console.error("error deleting word: ", error);
  }
};

/** @format */

import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

interface AddDataResult {
  result: void | null;
  error: unknown | null;
}

export default async function addData(
  collection: string,
  id: string,
  data: Record<string, any>
): Promise<AddDataResult> {
  let result: void | null = null;
  let error: unknown | null = null;

  try {
    result = await setDoc(doc(db, collection, id), data, { merge: true });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

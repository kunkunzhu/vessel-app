/** @format */

import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export default async function logOut(): Promise<{
  success: boolean;
  error: unknown | null;
}> {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}

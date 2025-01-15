/** @format */

"use client";

import { Collection } from "@/components/Collection";
import { Button } from "@/components/form/Button";
import { WordModal } from "@/components/modal/WordModal";
import { NavHeader } from "@/components/NavHeader";
import { Search } from "@/components/Search";
import { Viewmenu } from "@/components/Viewmenu";
import { useAuthContext } from "@/context/AuthContext";
import { fetchUserWords } from "@/firebase/firestore";
import { WordI } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// interface AddModalI {
//   open: boolean;
//   closeModal: () => void;
// }

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  // const [modal, setModal] = useState<boolean>(false);
  const [word, setWord] = useState<WordI | null>(null);
  const [words, setWords] = useState<WordI[]>([]);

  useEffect(() => {
    const setupUser = async () => {
      if (!user) {
        router.push("/auth/signin");
      } else {
        const userWords = await fetchUserWords(user.uid);
        setWords(userWords);
      }
    };

    setupUser();
  }, [user]);

  const selectWord = (word: WordI) => {
    setWord(word);
  };

  return (
    <div className="px-20 flex flex-col gap-6">
      {
        word && <WordModal open={!!word} onClose={() => setWord(null)} w={word} />
      }
      <NavHeader />
      <div className="flex items-center gap-20 pt-8">
        <Viewmenu />
        <Search />
      </div>
      <div className="flex justify-start mt-10">
        <div className="w-[200px]">
          <Button
            text="add word"
            // onClick={() => setModal(true)}
            onClick={() => console.log("TO DO: implement this!")}
            classname="h-fit py-2 bg-white text-primary border border-primary hover:bg-accent hover:text-background hover:border-white transition-all"
          />
        </div>
        <div className="px-14">
          <Collection words={words} selectWord={selectWord} />
        </div>
      </div>
    </div>
  );
}

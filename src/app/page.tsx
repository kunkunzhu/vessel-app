/** @format */

"use client";

import { Collection } from "@/components/Collection";
import { Button } from "@/components/form/Button";
import { WordModal } from "@/components/modal/WordModal";
import { NavHeader } from "@/components/NavHeader";
import { Search } from "@/components/Search";
// import { Viewmenu } from "@/components/Viewmenu";
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
  // const [view, setView] = useState<"lexico" | "chrono">("lexico");
  const { user } = useAuthContext();
  const router = useRouter();

  const [word, setWord] = useState<WordI | null>(null);
  const [words, setWords] = useState<WordI[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const setupUser = async () => {
      if (!user) {
        router.push("/auth/signin");
      } else {
        const handler = setTimeout(async () => {
          const userId = user.uid;
          const userWords = await fetchUserWords({ userId, searchQuery });
          setWords(userWords);
        }, 500);

        return () => clearTimeout(handler);
      }
    };

    setupUser();
  }, [searchQuery, user, router]);

  const selectWord = (word: WordI) => {
    setWord(word);
  };

  return (
    <div className="px-20 flex flex-col gap-6 cursor-crosshair">
      {
        word && <WordModal open={!!word} onClose={() => setWord(null)} w={word} />
      }
      <NavHeader />
      <div className="flex items-center gap-20 pt-8">
        {/* <Viewmenu view={view} setView={setView} /> */}
        <Button
          text="add word"
          // onClick={() => setModal(true)}
          onClick={() => console.log("TO DO: implement this!")}
          classname="h-fit py-2 bg-white text-primary border border-primary hover:bg-accent hover:text-background hover:border-white transition-all"
        />
        <Search setQuery={setSearchQuery} />
      </div>
      <div className="flex justify-start mt-10">

        <div className="ml-[100px] pl-20 pr-40">
          <Collection
            words={words}
            selectWord={selectWord}
          // view={view} 
          />
        </div>
      </div>
    </div>
  );
}

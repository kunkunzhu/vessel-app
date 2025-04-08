/** @format */

"use client";

import { Collection } from "@/components/Collection";
import { AddingInput } from "@/components/form/AddingInput";
import { Button } from "@/components/form/Button";
import { NewWordCard, WordModal } from "@/components/modalcard/WordModalCard";
import { NavHeader } from "@/components/NavHeader";
import { Search } from "@/components/Search";
import { useAuthContext } from "@/context/AuthContext";
import { addWordForUser, deleteWordForUser, fetchUserWords } from "@/firebase/firestore";
import { WordI } from "@/lib/types";
import { fetchWord } from "@/services/dict";
import { useMotionValue, motion, useMotionTemplate, useSpring, useTransform, animate } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// interface AddModalI {
//   open: boolean;
//   closeModal: () => void;
// }

export default function Home() {

  // PAGE CONTENT LOGIC:

  const { user } = useAuthContext();
  const router = useRouter();

  const [word, setWord] = useState<WordI | null>(null);
  const [words, setWords] = useState<WordI[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [newWord, setNewWord] = useState<string>("");
  const [newWordModal, setNewWordModal] = useState<WordI | null>(null);
  const [addingMessage, setAddingMessage] = useState<string | null>(null);
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

  useEffect(() => {
    const lookUpWord = async () => {
      if (words.find((w) => w.word === newWord)) {
        setAddingMessage("This word already exists in your collection! ᵕ̈");
      } else {
        const res = await fetchWord({ word: newWord });
        if (res.success && res.word) {
          setNewWordModal(res.word);
        } else if (res.error) {
          setAddingMessage(res.error);
        }
      }

    };

    lookUpWord();
  }, [newWord]);

  const selectWord = (word: WordI) => {
    setWord(word);
  };

  const deleteWord = async (word: WordI) => {
    if (user) {
      const userId = user.uid;
      deleteWordForUser({ userId, wordData: word });
      const userWords = await fetchUserWords({ userId, searchQuery });
      setWords(userWords);
    }
  }

  const addNewWord = async ({ word }: { word: WordI }) => {
    if (user) {
      const userId = user.uid;
      await addWordForUser(userId, word);
      setAddingMessage(`The word "${newWord}" added successfully! ᵕ̈`);
      setNewWordModal(null)
    }
  };

  // BACKGROUND GLOW EFFECT LOGIC:

  const colourProgress = useMotionValue(0);
  const colours = ["rgba(215, 203, 252, 0.3)", "rgba(218, 246, 255, 0.5)", "rgba(255, 217, 197, 0.5)", "rgba(255, 255, 192, 0.5)", "rgba(215, 203, 252, 0.3)"];
  const glowColour = useTransform(colourProgress, [0, 0.5, 1, 1.5, 2], colours);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowSize = useMotionValue(400);
  const divRef = useRef<HTMLDivElement>(null);

  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 10 });
  const smoothGlowSize = useSpring(glowSize, { stiffness: 50, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const { left, top, width, height } = divRef.current.getBoundingClientRect();

      const x = e.clientX - left;
      const y = e.clientY - top;

      mouseX.set(Math.max(0, Math.min(x, width)));
      mouseY.set(Math.max(0, Math.min(y, height)));
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    let pulse = true;

    const interval = setInterval(() => {
      glowSize.set(pulse ? 400 : 700);
      pulse = !pulse;
    }, 2000);

    return () => clearInterval(interval);
  }, [glowSize]);

  useEffect(() => {
    const loop = () => {
      animate(colourProgress, 1, { duration: 10, repeat: Infinity, ease: "linear" })
    };
    loop();
  }, [colourProgress])


  // PAGE RENDER: 

  return (
    <div ref={divRef} className="group relative cursor-crosshair">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${smoothGlowSize}px circle at ${smoothMouseX}px ${smoothMouseY}px,
          ${glowColour},
          transparent 100%
        )
      `,
        }}
      />

      <div className="z-10 px-20 flex flex-col gap-6 ">
        {
          word && <WordModal open={!!word} onClose={() => setWord(null)} w={word} deleteWord={deleteWord} className="w-[480px] min-h-[240px]" />
        }
        <NavHeader />
        <div className={`flex items-center ${word && "hidden"} gap-20 pt-8 h-[10vh]`}>
          {
            adding ? <AddingInput
              setWord={setNewWord}
              clearError={() => setAddingMessage(null)}
              cancel={() => {
                setAddingMessage(null)
                setAdding(false)
              }} /> : (
              <Button
                text="add word"
                onClick={() => setAdding(true)}
                className="h-fit py-2 bg-yellow text-primary border border-primary hover:bg-accent hover:text-background hover:border-white"
              />
            )
          }

          {
            !adding && <Search setQuery={setSearchQuery} />
          }

        </div>
        <div className={`flex ${word && "blur-3xl"} justify-start overflow-auto h-[80vh] no-scrollbar ${!adding && "fade-scroll"}`}>
          {adding ?
            <div className="flex mt-10 mb-10">
              {
                addingMessage && <div className="ml-10 text-xs text-accent">{addingMessage}</div>
              }
              {
                newWordModal &&
                <NewWordCard
                  w={newWordModal}
                  addWord={addNewWord}
                  className="max-w-[70vw] h-fit max-h-[55vh] overflow-scroll no-scrollbar border-secondary"
                />
              }
            </div>

            : (

              <div className="ml-[100px] pl-20 pr-40 ">
                <Collection
                  words={words}
                  selectWord={selectWord}
                />
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
}

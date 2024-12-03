/** @format */

"use client";

import { Collection } from "@/components/Collection";
import { Button } from "@/components/form/Button";
import { NavHeader } from "@/components/NavHeader";
import { Search } from "@/components/Search";
import { Viewmenu } from "@/components/Viewmenu";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sampleWords = [
  "paradigm",
  "parochial",
  "paternalistic",
  "patronizing",
  "physicomorphs",
  "physiurgic",
  "pleasantries",
  "pliability",
  "pretentious",
  "paradigm",
  "parochial",
  "paternalistic",
  "patronizing",
  "physicomorphs",
  "physiurgic",
  "pleasantries",
  "pliability",
  "pretentious",
];

interface AddModalI {
  open: boolean;
  closeModal: () => void;
}

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user]);

  return (
    <div className="px-20 flex flex-col gap-6">
      <NavHeader />
      <div className="flex items-center gap-20 pt-8">
        <Viewmenu />
        <Search />
      </div>
      <div className="flex justify-start mt-10">
        <div className="w-[200px]">
          <Button
            text="add word"
            onClick={() => setModal(true)}
            classname="h-fit py-2 bg-white text-primary border border-primary hover:bg-accent hover:text-background hover:border-white transition-all"
          />
        </div>
        <div className="px-14">
          <Collection words={sampleWords} />
        </div>
      </div>
    </div>
  );
}

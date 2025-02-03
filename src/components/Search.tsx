/** @format */
"use client";

import { IoIosSearch } from "react-icons/io";
import { Input } from "./form/Input";

interface SearchI {
  setQuery: (query: string) => void
}

export function Search({ setQuery }: SearchI) {

  return (
    <Input
      icon={<IoIosSearch className="4xl text-secondary" />}
      placeholder="Search..."
      setInput={(e) => setQuery(e.target.value)}
      className="w-[720px] h-[40px]"
    />
  );
}

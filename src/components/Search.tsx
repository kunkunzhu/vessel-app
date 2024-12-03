/** @format */
"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./form/Input";

export function Search() {
  const [query, setQuery] = useState<string>("Search...");

  console.log(query);

  return (
    <Input
      icon={<IoIosSearch className="4xl text-secondary" />}
      placeholder="Search..."
      setInput={(e) => setQuery(e.target.value)}
      classname="w-[800px] h-[40px]"
    />
  );
}

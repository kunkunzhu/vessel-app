/** @format */

import { Collection } from "@/components/Collection";
import { NavHeader } from "@/components/NavHeader";
import { Search } from "@/components/Search";
import { Viewmenu } from "@/components/Viewmenu";

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
];

export default function Home() {
  return (
    <>
      <NavHeader />
      <div className="flex items-center gap-20 pl-40 pt-8">
        <Viewmenu />
        <Search />
      </div>
      <div className="px-40 mt-20 ">
        <Collection words={sampleWords} />
      </div>
    </>
  );
}

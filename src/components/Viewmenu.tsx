/** @format */
"use client";

import { FaSortAlphaDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

interface ViewMenuI {
  view: "lexico" | "chrono";
  setView: (view: "lexico" | "chrono") => void;
}

export function Viewmenu({ view, setView }: ViewMenuI) {

  return (
    <div className="flex gap-2 rounded-lg">
      <div
        className={`p-1 cursor-crosshair rounded-lg ${view == "lexico" && " border border-accent bg-white"
          }`}
        onClick={() => setView("lexico")}
      >
        <FaSortAlphaDown
          className={`size-8 ${view == "lexico" ? "text-accent" : "text-secondary"
            }`}
        />
      </div>
      <div
        className={`p-1 cursor-crosshair rounded-lg ${view == "chrono" && "border border-accent bg-white"
          }`}
        onClick={() => setView("chrono")}
      >
        <MdDateRange
          className={`size-8 ${view == "chrono" ? "text-accent" : "text-secondary"
            }`}
        />
      </div>
    </div>
  );
}

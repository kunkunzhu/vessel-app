/** @format */

import { ChangeEvent, ReactNode } from "react";

interface InputI {
  icon?: ReactNode;
  placeholder: string;
  setInput: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string
}

export function Input({ icon, placeholder, setInput, className = "", type = "text" }: InputI) {
  return (
    <div
      className={`flex items-center gap-2 border border-secondary  bg-white rounded-lg p-2 pl-4 ${className}`}
    >
      {icon && icon}
      <input
        type={type}
        className="italic font-title outline-none text-accent w-full"
        placeholder={placeholder}
        onChange={setInput}
      />
    </div>
  );
}

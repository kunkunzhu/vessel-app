/** @format */
"use client";

import { MdCancel } from "react-icons/md";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState } from "react";

interface AddingInputI {
    setWord: (query: string) => void
    cancel: () => void
    clearError: () => void
}

export function AddingInput({ setWord, cancel, clearError }: AddingInputI) {

    const [query, setQuery] = useState<string>("");

    return (
        <div className="flex gap-4">
            <Input
                icon={<MdCancel className="4xl text-secondary" onClick={cancel} />}
                placeholder="Type the word..."
                setInput={(e) => {
                    clearError()
                    setQuery(e.target.value)
                }}
                className="w-[320px] h-[40px]"
            />
            <Button
                text="Look Up"
                onClick={() => setWord(query)}
                className="bg-yellow text-primary border border-primary hover:bg-accent hover:text-background hover:border-white"
            />
        </div>
    );
}

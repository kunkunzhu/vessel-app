import { DefinitionsI, WordI } from "@/lib/types";
import { FaTrash } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { Card, Modal } from "./ModalCard";
import { IoMdAdd } from "react-icons/io";

export interface WordCardI {
    w: WordI,
    className?: string
}

interface WordModalI extends WordCardI {
    open: boolean,
    onClose: () => void,
    deleteWord: (word: WordI) => void
}

interface NewWordCardI extends WordCardI {
    addWord: ({ word }: { word: WordI; }) => Promise<void>
}

const Circle = () => {
    return (
        <div className="size-2 rounded-full bg-secondary drop-shadow-bullet"></div>
    );
}

const Bullet = ({ text, italic }: { text: string; italic?: boolean }) => {
    return (
        <div className={`flex gap-2 text-sm ${italic && "italic"}`}>
            <span className="flex items-start pt-2">
                <Circle />
            </span>
            {text}
        </div>
    );
}

const renderDefinition = ({
    def,
    last = false,
    index,
}: {
    def: DefinitionsI;
    last?: boolean;
    index: number
}) => {

    const meanings = def.meanings;


    return (
        <div
            key={index}
            className={`flex flex-col gap-1 ${!last && "pb-2 border-b border-secondary"
                }`}
        >
            <div className="text-accent italic pt-2 text-xs">{def.type}</div>
            {meanings.map((meaning, index) => (
                <Bullet text={meaning} key={index} />
            ))}
        </div>
    );
};

const playSound = ({ phonetic }: { phonetic: string }) => {
    const audio = new Audio(phonetic);
    audio.play().catch((error) => {
        console.error("Failed to play the sound:", error);
    });
};

const renderTitle = ({ word, phonetic }: { word: string, phonetic?: string }) => {
    return (
        <div className="flex gap-4 mx-2 items-center justify-between text-3xl font-title italic pb-2 border-b border-secondary">
            <div className="flex gap-4 items-center">
                <div className="capitalize">{word}</div>
                {phonetic && (
                    <AiFillSound
                        onClick={() => playSound({ phonetic })}
                        className="text-secondary opacity-50 cursor-crosshair text-sm hover:opacity-100 transition-all"
                    />
                )}
            </div>
        </div>
    )

}

const renderContent = ({ definitions }: { definitions: DefinitionsI[] }) => {
    return (
        <div className="flex flex-col mx-2 gap-4s">
            {
                definitions.map((def: DefinitionsI, index: number) => {
                    const last = index == definitions.length - 1;
                    return renderDefinition({ def, last, index });
                })
            }
        </div >
    )
}


export const WordModal = ({ open, onClose, w, deleteWord, className = "" }: WordModalI) => {
    const { word, phonetic, definitions } = w;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={renderTitle({ word, phonetic })}
            content={renderContent({ definitions })}
            footer={
                <div className="flex justify-end">
                    <FaTrash
                        onClick={() => {
                            deleteWord(w)
                            onClose()
                        }}
                        className="size-3 text-secondary" />
                </div>
            }
            className={`gap-4 px-4 pt-4 pb-8 drop-shadow-card ${className}`}
        />
    );
}

export const NewWordCard = ({ w, addWord, className = "" }: NewWordCardI) => {
    const { word, phonetic, definitions } = w;



    const title = (
        <div className="flex flex-row w-full justify-between">
            {renderTitle({ word, phonetic })}
            <div className="rounded-full hover:bg-accent cursor-crosshair border border-primary hover:border-accent 
            hover:text-background items-center flex p-1 size-8 transition-all bg-yellow text-primary">
                <IoMdAdd onClick={() => {
                    addWord({ word: w })
                }}
                    className="mx-auto" />
            </div>

        </div>
    )


    return (
        <Card
            title={title}
            content={renderContent({ definitions })}
            className={`bg-white gap-4 px-4 pt-4 pb-8 drop-shadow-card flex flex-col rounded-lg border-accent border ${className}`}
        />
    );
}
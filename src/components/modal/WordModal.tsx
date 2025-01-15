import { DefinitionsI, WordI } from "@/lib/types";
import { AiFillSound } from "react-icons/ai";
import { Modal } from "./Modal";

interface WordModalI {
    open: boolean,
    onClose: () => void,
    w: WordI
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


export const WordModal = ({ open, onClose, w }: WordModalI) => {

    const { word, phonetic, definitions } = w;

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

    const renderTitle = ({ word }: { word: string }) => {
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

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={renderTitle({ word })}
            content={renderContent({ definitions })}
            classname="w-[480px] min-h-[240px] gap-4 px-4 pt-4 pb-8 "
        />
    );
}
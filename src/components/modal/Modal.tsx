import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalI {
    open: boolean,
    onClose: () => void,
    content: ReactNode
    title: ReactNode
    classname?: string
}

export const Modal = ({ open, onClose, content, title, classname = "" }: ModalI) => {

    return (
        <dialog
            open={open}
            className={`backdrop-blur bg-white/50 z-50 fixed inset-0 flex flex-col rounded-lg border-accent border ${classname}`}
        >
            <div className="flex justify-end">
                <IoMdClose onClick={onClose} className="size-4 text-accent" />
            </div>
            <div >
                <div>
                    {title}
                </div>
                <div>
                    {content}
                </div>
            </div>
        </dialog>
    );
};

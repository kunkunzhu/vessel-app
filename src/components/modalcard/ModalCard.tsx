import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface CardI {
    content: ReactNode
    title: ReactNode
    footer?: ReactNode
    className?: string
}

interface ModalI extends CardI {
    open: boolean,
    onClose: () => void,
}

export const Card = ({ content, title, footer, className = "" }: CardI) => {

    return (
        <div className={className}>
            <div>
                <div >
                    {title}
                </div>
                <div>
                    {content}
                </div>
            </div>
            {footer}
        </div>
    );
};

export const Modal = ({ open, onClose, content, title, footer, className = "" }: ModalI) => {

    return (
        <dialog
            open={open}
            className={`backdrop-blur bg-white z-50 fixed inset-0 flex flex-col rounded-lg border-accent border ${className}`}
        >
            <div className="flex justify-end">
                <IoMdClose onClick={onClose} className="size-4 text-accent" />
            </div>
            <Card content={content} title={title} footer={footer} />
        </dialog>
    );
};


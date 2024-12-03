/** @format */

interface ButtonI {
  text: string;
  type: string;
  onClick: (params?: any) => any;
  classname?: string;
}

export function Button({ text, type, onClick, classname = "" }: ButtonI) {
  return (
    <button
      className={`bg-accent text-background w-fit px-8 py-2 rounded-lg hover:drop-shadow-bullet capitalize ${classname}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

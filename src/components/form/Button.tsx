/** @format */

interface ButtonI {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick: (params?: any) => any;
  classname?: string;
}

export function Button({
  text,
  type = undefined,
  onClick,
  classname = "",
}: ButtonI) {
  return (
    <button
      className={`bg-accent cursor-crosshair text-background w-fit px-6 py-1 rounded-lg hover:drop-shadow-bullet font-title capitalize ${classname}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

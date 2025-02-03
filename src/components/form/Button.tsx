/** @format */

interface ButtonI {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick: (params?: any) => any;
  className?: string;
}

export function Button({
  text,
  type = undefined,
  onClick,
  className = "",
}: ButtonI) {
  return (
    <button
      className={`bg-accent cursor-crosshair text-background w-fit px-6 py-1 transition-all rounded-lg hover:drop-shadow-bullet font-title capitalize ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

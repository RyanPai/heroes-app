import { cn } from "~/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isIcon?: boolean;
  color?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const {
    children,
    isIcon,
    color,
    className,
    type,
    ...rest
  } = props;
  return (
    <button
      type={type ?? "button"}
      className={cn("rounded px-4 py-2 w-full cursor-pointer", {
        "w-10 h-10": isIcon,
        "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400":
          color === "primary",
        "bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-gray-400":
          color === "secondary",
      }, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

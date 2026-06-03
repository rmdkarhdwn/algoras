import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-background hover:opacity-90",
  secondary: "border border-border bg-surface text-foreground hover:border-accent",
  ghost: "bg-transparent text-foreground hover:bg-white/5",
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}

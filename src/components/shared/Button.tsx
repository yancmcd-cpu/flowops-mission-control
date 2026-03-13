import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
};

export function Button({ className, variant = "secondary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none",
        variant === "primary"
          ? "border-[#7a84ff]/40 bg-[linear-gradient(135deg,#8390ff,#5b6cff)] text-white shadow-[0_12px_34px_rgba(90,108,255,0.34)] hover:brightness-110"
          : variant === "quiet"
            ? "border-white/8 bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:text-primary"
            : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] text-primary hover:border-[#7a84ff]/30 hover:bg-[linear-gradient(180deg,rgba(122,132,255,0.12),rgba(255,255,255,0.03))]",
        className,
      )}
      {...props}
    />
  );
}

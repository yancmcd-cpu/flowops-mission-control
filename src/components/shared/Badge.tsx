import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeTone = "cyan" | "blue" | "muted" | "warning" | "danger";

const toneMap: Record<BadgeTone, string> = {
  cyan: "border-l-cyan bg-[linear-gradient(180deg,rgba(65,214,255,0.18),rgba(65,214,255,0.10))] text-cyan shadow-[0_0_18px_rgba(65,214,255,0.12)] ring-1 ring-cyan/22",
  blue: "border-l-[#7a84ff] bg-[linear-gradient(180deg,rgba(122,132,255,0.18),rgba(122,132,255,0.10))] text-[#d7dcff] shadow-[0_0_18px_rgba(122,132,255,0.12)] ring-1 ring-[#7a84ff]/22",
  muted: "border-l-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] text-secondary shadow-[0_0_14px_rgba(152,166,194,0.06)] ring-1 ring-white/8",
  warning: "border-l-amber-400 bg-[linear-gradient(180deg,rgba(255,191,95,0.18),rgba(255,191,95,0.10))] text-amber-200 shadow-[0_0_18px_rgba(255,191,95,0.10)] ring-1 ring-amber-400/22",
  danger: "border-l-rose-400 bg-[linear-gradient(180deg,rgba(255,107,122,0.18),rgba(255,107,122,0.10))] text-rose-100 shadow-[0_0_18px_rgba(255,107,122,0.12)] ring-1 ring-rose-400/20",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-transparent px-2.5 py-1.5 text-[10px] font-semibold uppercase leading-none tracking-[0.16em] border-l-[3px] backdrop-blur-sm",
        toneMap[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

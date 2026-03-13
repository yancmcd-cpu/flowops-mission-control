import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(18,24,38,0.98),rgba(10,14,24,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.46),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/18 before:to-transparent after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(111,124,255,0.09),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(65,214,255,0.06),transparent_24%)] after:pointer-events-none",
        className,
      )}
    >
      {children}
    </section>
  );
}

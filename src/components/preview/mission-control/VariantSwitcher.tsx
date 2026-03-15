import { cn } from "@/lib/utils";
import Link from "next/link";

const variants = [
  { href: "/preview/mission-control", label: "Core" },
  { href: "/preview/mission-control/variant-a", label: "Studio" },
  { href: "/preview/mission-control/variant-b", label: "Control" },
  { href: "/preview/mission-control/variant-c", label: "Signal" },
];

export function VariantSwitcher({ current }: { current: string }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Link
          key={variant.href}
          href={variant.href}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
            current === variant.href
              ? "bg-[linear-gradient(135deg,#7a84ff,#5b6cff)] text-white shadow-[0_10px_24px_rgba(90,108,255,0.24)]"
              : "bg-white/[0.04] text-secondary ring-1 ring-white/8 hover:bg-white/[0.06] hover:text-primary",
          )}
        >
          {variant.label}
        </Link>
      ))}
    </div>
  );
}

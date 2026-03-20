"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type DetailModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function DetailModal({ open, onClose, title, subtitle, children, className }: DetailModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button type="button" className="absolute inset-0 bg-[rgba(5,8,14,0.74)] backdrop-blur-md" onClick={onClose} aria-label="Close modal" />
      <div
        className={cn(
          "relative z-10 w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,27,42,0.94),rgba(11,15,24,0.96))] shadow-[0_32px_90px_rgba(0,0,0,0.46)]",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-primary">{title}</h2>
            {subtitle ? <p className="mt-2 text-sm text-secondary">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-secondary ring-1 ring-white/8 transition hover:bg-white/[0.06] hover:text-primary"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

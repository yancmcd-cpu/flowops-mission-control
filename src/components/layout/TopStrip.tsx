"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { BellDot, CalendarRange, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const searchableRoutes = ["/tasks", "/projects", "/pipeline", "/workflows"];
const dateOptions = ["Today", "This Week", "This Month", "Custom"] as const;

export function TopStrip() {
  const {
    data: { headerState },
  } = useMissionControlData();
  const pathname = usePathname();
  const current = navigation.find((item) => item.href === pathname) ?? navigation[0];
  const [scrolled, setScrolled] = useState(false);
  const [dateFilter, setDateFilter] = useState<(typeof dateOptions)[number]>("This Month");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSearch = searchableRoutes.includes(pathname);
  const searchLabel =
    pathname === "/tasks"
      ? "Search tasks"
      : pathname === "/projects"
        ? "Search projects"
        : pathname === "/pipeline"
          ? "Search pipeline"
          : pathname === "/workflows"
            ? "Search workflows"
            : "";

  return (
    <header className="sticky top-0 z-20">
      <div className="mx-auto max-w-cockpit px-4 pt-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "transition-all duration-200",
            scrolled
              ? "rounded-[28px] bg-[linear-gradient(180deg,rgba(9,12,19,0.92),rgba(7,10,15,0.86))] px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-2xl ring-1 ring-white/6"
              : "bg-transparent px-0 py-0",
          )}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="hidden items-center gap-2 lg:flex">
              <span
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-primary transition-colors",
                  scrolled ? "bg-white/[0.04]" : "bg-white/[0.03]",
                )}
              >
                {current.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="flex flex-wrap items-center gap-1.5 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.022))] p-1 ring-1 ring-white/8">
                {dateOptions.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDateFilter(option)}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-2xl px-3.5 text-xs font-medium transition",
                      dateFilter === option
                        ? "bg-[linear-gradient(135deg,rgba(132,145,255,0.92),rgba(83,192,255,0.82))] text-white shadow-[0_12px_28px_rgba(83,192,255,0.18)]"
                        : "text-secondary hover:bg-white/[0.04] hover:text-primary",
                    )}
                  >
                    {index === 0 ? <CalendarRange className="h-3.5 w-3.5" /> : null}
                    {option}
                  </button>
                ))}
              </div>
              <span className="rounded-full bg-[linear-gradient(90deg,rgba(255,107,122,0.16),rgba(255,255,255,0.02))] px-3 py-2 text-xs font-medium text-rose-200 shadow-[0_0_18px_rgba(255,107,122,0.08)]">
                {headerState.overdueCount ?? 0} overdue
              </span>
              <span className="rounded-full bg-[linear-gradient(90deg,rgba(255,186,74,0.14),rgba(255,255,255,0.02))] px-3 py-2 text-xs font-medium text-amber-200">
                {headerState.reviewCount ?? 0} review
              </span>
              {showSearch ? (
                <div
                  className={cn(
                    "flex min-w-[220px] items-center gap-2 rounded-2xl px-4 py-3 text-sm text-secondary shadow-[0_14px_32px_rgba(0,0,0,0.14)] transition-all",
                    scrolled
                      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.024))] backdrop-blur-xl"
                      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] backdrop-blur-xl",
                  )}
                >
                  <Search className="h-4 w-4" />
                  <span>{searchLabel}</span>
                </div>
              ) : null}
              <button
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl text-secondary shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:text-primary",
                  scrolled
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]",
                )}
              >
                <BellDot className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

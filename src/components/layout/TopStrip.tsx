"use client";

import { headerState } from "@/lib/mock-data";
import { navigation } from "@/lib/navigation";
import { BellDot, ChevronRight, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const telemetry = [
  { label: "Active Project", value: headerState.activeProject, tint: "from-[#7a84ff]/14 to-transparent" },
  { label: "Workflow", value: headerState.activeWorkflow, tint: "from-cyan/12 to-transparent" },
  { label: "Next Actions", value: String(headerState.nextActionCount), tint: "from-cyan/12 to-transparent" },
  { label: "Pending Approvals", value: String(headerState.pendingApprovals), tone: "text-amber-300", tint: "from-amber-400/12 to-transparent" },
  { label: "Blockers", value: String(headerState.blockers), tone: headerState.blockers > 0 ? "text-rose-300" : "text-cyan", tint: "from-rose-400/10 to-transparent" },
];

export function TopStrip() {
  const pathname = usePathname();
  const current = navigation.find((item) => item.href === pathname) ?? navigation[0];

  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[linear-gradient(180deg,rgba(7,10,17,0.92),rgba(7,10,17,0.78))] backdrop-blur-2xl">
      <div className="mx-auto max-w-cockpit px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative rounded-[30px] bg-[linear-gradient(180deg,rgba(20,26,40,0.97),rgba(10,14,22,0.98))] px-5 py-5 shadow-[0_22px_72px_rgba(0,0,0,0.36)] ring-1 ring-white/8 before:pointer-events-none before:absolute before:inset-x-12 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <span>Mission Control</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-primary">{current.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-[-0.04em] text-primary">{current.label}</h1>
                <span className="rounded-full bg-[linear-gradient(90deg,rgba(122,132,255,0.14),rgba(162,115,255,0.08))] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#cfd5ff] ring-1 ring-[#7a84ff]/18">
                  Interface Layer
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex min-w-[248px] items-center gap-2 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] px-4 py-3 text-sm text-secondary ring-1 ring-white/8 transition hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]">
                <Search className="h-4 w-4" />
                <span>Search state, tasks, or reviews</span>
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] text-secondary ring-1 ring-white/8 transition hover:-translate-y-0.5 hover:text-primary hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)]">
                <BellDot className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden rounded-[24px] bg-white/8 lg:grid-cols-5">
            {telemetry.map((item) => (
              <div
                key={item.label}
                className={`bg-[linear-gradient(180deg,rgba(11,15,24,0.98),rgba(7,10,16,0.96))] bg-gradient-to-br px-3.5 py-3 transition ${item.tint} ${item.label === "Blockers" && headerState.blockers > 0 ? "danger-pulse shadow-[inset_0_0_0_1px_rgba(255,107,122,0.18),0_0_28px_rgba(255,107,122,0.10)]" : ""}`}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">{item.label}</p>
                <p className={`mt-2 text-[1.15rem] font-semibold tracking-[-0.04em] text-primary ${item.tone ?? ""}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

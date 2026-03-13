"use client";

import { Badge } from "@/components/shared/Badge";
import { tasks } from "@/lib/mock-data";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryNav = navigation.slice(0, 7);
const utilityNav = navigation.slice(7);

function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <Image alt="FlowOps" src="/flowops-logo.png" width={40} height={40} className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(122,132,255,0.16)]" priority />
    </div>
  );
}

type NavSectionProps = {
  title: string;
  items: ReadonlyArray<(typeof navigation)[number]>;
  pathname: string;
  onNavigate?: () => void;
  inboxCount: number;
};

function NavSection({ title, items, pathname, onNavigate, inboxCount }: NavSectionProps) {
  return (
    <div>
      <p className="px-3 pb-3 text-[11px] uppercase tracking-[0.24em] text-secondary">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group relative flex items-center justify-between rounded-2xl px-3 py-3.5 text-sm transition duration-150",
                  active
                    ? "bg-[linear-gradient(90deg,rgba(122,132,255,0.20),rgba(65,214,255,0.08),rgba(255,255,255,0.02))] text-primary shadow-[0_16px_30px_rgba(90,108,255,0.14),0_0_18px_rgba(65,214,255,0.08)] ring-1 ring-[#7a84ff]/24 before:absolute before:bottom-3 before:left-1 before:top-3 before:w-px before:rounded-full before:bg-gradient-to-b before:from-[#aab4ff] before:to-cyan"
                    : "text-secondary hover:bg-white/[0.03] hover:text-primary",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-1 ring-white/8 transition duration-150",
                      active ? "text-[#dbe0ff] shadow-[0_0_18px_rgba(122,132,255,0.12)] ring-[#7a84ff]/26" : "group-hover:ring-white/12",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
                {item.label === "Action Queue" ? <Badge tone="cyan">{inboxCount}</Badge> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type SidebarContentProps = {
  onNavigate?: () => void;
};

function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const inboxCount = tasks.filter((task) => task.status === "Inbox").length;

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-base font-bold tracking-[-0.03em] text-primary">FlowOps</p>
            <p className="text-sm text-secondary">Mission Control</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-2 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/6">
          <NavSection title="Operations" items={primaryNav} pathname={pathname} onNavigate={onNavigate} inboxCount={inboxCount} />
          <div className="my-5 border-t border-white/8" />
          <NavSection title="Monitoring" items={utilityNav} pathname={pathname} onNavigate={onNavigate} inboxCount={inboxCount} />
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(122,132,255,0.12),rgba(255,255,255,0.02))] p-4 shadow-[0_12px_30px_rgba(90,108,255,0.10)] ring-1 ring-[#7a84ff]/16">
          <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">Interface Layer</p>
          <p className="mt-3 text-sm leading-6 text-secondary">
            Reflective state only. Controlled write-backs never replace workflow authority.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 border-r border-white/8 bg-[linear-gradient(180deg,rgba(11,14,22,0.99),rgba(7,10,15,0.98))] shadow-[inset_-1px_0_0_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,0.18)] lg:block">
        <SidebarContent />
      </aside>
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-base font-bold text-primary">FlowOps</p>
            <p className="text-sm text-secondary">Mission Control</p>
          </div>
        </div>
        <button
          aria-label="Open navigation"
          className="rounded-2xl bg-white/[0.03] p-3 text-secondary ring-1 ring-white/8"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 bg-overlay lg:hidden">
          <div className="h-full w-[84%] max-w-sm bg-navy">
            <div className="flex items-center justify-end px-4 py-4">
              <button
                aria-label="Close navigation"
                className="rounded-2xl bg-white/[0.03] p-3 text-secondary ring-1 ring-white/8"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}

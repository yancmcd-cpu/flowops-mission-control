"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { getPreviewNavigation, type PreviewVariant } from "@/lib/preview-navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useState } from "react";

function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <Image alt="FlowOps" src="/flowops-logo.png" width={40} height={40} className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(122,132,255,0.16)]" priority />
    </div>
  );
}

type NavSectionProps = {
  title?: string;
  items: readonly { href: string; label: string; icon: ComponentType<{ className?: string }> }[];
  pathname: string;
  onNavigate?: () => void;
  inboxCount: number;
};

function NavSection({ title, items, pathname, onNavigate, inboxCount }: NavSectionProps) {
  return (
    <div>
      {title ? <p className="px-3 pb-3 text-[11px] uppercase tracking-[0.24em] text-secondary">{title}</p> : null}
      <ul className="space-y-1.5">
        {items.map((item) => {
          const active = pathname === item.href || (item.href === "/preview/mission-control" && pathname.startsWith("/preview/mission-control/variant-"));
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group relative flex items-center justify-between rounded-2xl px-3 py-3.5 text-sm transition duration-150",
                  active
                    ? "bg-[linear-gradient(90deg,rgba(122,132,255,0.20),rgba(65,214,255,0.08),rgba(255,255,255,0.02))] text-primary shadow-[0_16px_30px_rgba(90,108,255,0.14),0_0_18px_rgba(65,214,255,0.08)] before:absolute before:bottom-3 before:left-1 before:top-3 before:w-px before:rounded-full before:bg-gradient-to-b before:from-[#aab4ff] before:to-cyan"
                    : "text-secondary hover:bg-white/[0.03] hover:text-primary",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] transition duration-150",
                      active ? "text-[#dbe0ff] shadow-[0_0_18px_rgba(122,132,255,0.12)]" : "",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
                {item.label === "Tasks" ? <Badge tone="cyan">{inboxCount}</Badge> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type SidebarContentProps = {
  variant: PreviewVariant;
  onNavigate?: () => void;
};

function SidebarContent({ variant, onNavigate }: SidebarContentProps) {
  const {
    data: { tasks },
  } = useMissionControlData();
  const pathname = usePathname();
  const openQueueCount = tasks.filter((task) => !["Complete", "Completed", "Archived"].includes(task.status)).length;
  const previewNavigationRaw = getPreviewNavigation(variant);
  const previewNavigation =
    ["/", "/tasks", "/projects", "/pipeline", "/workflows"].includes(pathname) && variant === "c"
      ? {
          ...previewNavigationRaw,
          primary: previewNavigationRaw.primary.map((item, index) => {
            if (index === 0) return { ...item, href: "/" };
            if (item.label === "Tasks") return { ...item, href: "/tasks" };
            if (item.label === "Projects") return { ...item, href: "/projects" };
            if (item.label === "Pipeline") return { ...item, href: "/pipeline" };
            if (item.label === "Workflow") return { ...item, href: "/workflows" };
            return item;
          }),
        }
      : previewNavigationRaw;

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
        <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-2 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <NavSection items={previewNavigation.primary} pathname={pathname} onNavigate={onNavigate} inboxCount={openQueueCount} />
        </div>
      </div>
    </div>
  );
}

export function PreviewSidebar({ variant }: { variant: PreviewVariant }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-[calc(100vh-2rem)] w-72 shrink-0 self-start overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,rgba(11,14,22,0.98),rgba(7,10,15,0.97))] shadow-[0_28px_80px_rgba(0,0,0,0.34)] lg:block">
        <SidebarContent variant={variant} />
      </aside>
      <div className="mx-3 mt-3 flex items-center justify-between rounded-[26px] bg-[linear-gradient(180deg,rgba(11,14,22,0.98),rgba(7,10,15,0.97))] px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.24)] lg:hidden">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-base font-bold text-primary">FlowOps</p>
            <p className="text-sm text-secondary">Mission Control</p>
          </div>
        </div>
        <button
          aria-label="Open preview navigation"
          className="rounded-2xl bg-white/[0.03] p-3 text-secondary ring-1 ring-white/8"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 bg-overlay lg:hidden">
          <div className="h-full w-[84%] max-w-sm rounded-r-[28px] bg-[linear-gradient(180deg,rgba(11,14,22,0.99),rgba(7,10,15,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
            <div className="flex items-center justify-end px-4 py-4">
              <button
                aria-label="Close preview navigation"
                className="rounded-2xl bg-white/[0.03] p-3 text-secondary ring-1 ring-white/8"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent variant={variant} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}

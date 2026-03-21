"use client";

import { getPreviewShellClasses } from "@/lib/preview-shell";
import { getPreviewVariant } from "@/lib/preview-navigation";
import { PreviewSidebar } from "@/components/layout/PreviewSidebar";
import { PreviewTopStrip } from "@/components/layout/PreviewTopStrip";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopStrip } from "@/components/layout/TopStrip";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isPreview = pathname.startsWith("/preview/mission-control");

  if (isPreview) {
    const previewVariant = getPreviewVariant(pathname);
    const shell = getPreviewShellClasses(previewVariant);

    return (
      <div className={shell.app}>
        <div className={shell.gap}>
          <PreviewSidebar variant={previewVariant} />
          <div className={shell.frame}>
            <PreviewTopStrip variant={previewVariant} />
            <main className="flex-1">
              <div className="mx-auto max-w-cockpit px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(122,132,255,0.12),transparent_24%),radial-gradient(circle_at_78%_16%,rgba(65,214,255,0.08),transparent_22%),linear-gradient(180deg,#07090f,#0a0d15_45%,#06080d)] text-primary">
      <div className="flex min-h-screen gap-3 px-3 py-3 lg:gap-4 lg:px-4 lg:py-4">
        <Sidebar />
        <div className="flex min-h-[calc(100vh-1.5rem)] min-w-0 flex-1 flex-col rounded-[34px] bg-[linear-gradient(180deg,rgba(11,14,21,0.86),rgba(8,10,16,0.8))] shadow-[0_24px_80px_rgba(0,0,0,0.30)] backdrop-blur-sm">
          <TopStrip />
          <main className="flex-1">
            <div className="mx-auto max-w-cockpit px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

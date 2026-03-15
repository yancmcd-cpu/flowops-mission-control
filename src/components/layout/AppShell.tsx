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
    <div className="min-h-screen bg-navy text-primary">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopStrip />
          <main className="flex-1">
            <div className="mx-auto max-w-cockpit px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

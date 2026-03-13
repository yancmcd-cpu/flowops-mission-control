import { Sidebar } from "@/components/layout/Sidebar";
import { TopStrip } from "@/components/layout/TopStrip";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
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

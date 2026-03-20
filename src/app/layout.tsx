import { AppShell } from "@/components/layout/AppShell";
import { MissionControlDataProvider } from "@/components/providers/MissionControlDataProvider";
import "@/app/globals.css";
import { getMissionControlData } from "@/lib/mission-control-state";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FlowOps Mission Control",
  description: "Operational dashboard interface for FlowOps OS.",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const initialData = await getMissionControlData();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy text-primary antialiased`}>
        <MissionControlDataProvider initialData={initialData}>
          <AppShell>{children}</AppShell>
        </MissionControlDataProvider>
      </body>
    </html>
  );
}

import { AppShell } from "@/components/layout/AppShell";
import "@/app/globals.css";
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy text-primary antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mayank Singh",
  description:
    "Work with Mayank Singh — Full-Stack Engineer available for freelance projects, contract work, and technical collaborations.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

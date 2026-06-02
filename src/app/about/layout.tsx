import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mayank Singh — Full-Stack Engineer. I design systems, write clean code, and ship products that work at scale.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

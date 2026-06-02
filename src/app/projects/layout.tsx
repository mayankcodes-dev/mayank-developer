import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Mayank Singh — full-stack web apps, SaaS products, and tools built with Next.js, TypeScript, and the MERN stack.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

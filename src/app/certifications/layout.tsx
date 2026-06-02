import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Mayank Singh's certifications in frontend, backend, TypeScript, and cloud engineering — earned through real learning, not shortcuts.",
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

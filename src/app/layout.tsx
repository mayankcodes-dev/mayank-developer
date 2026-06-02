import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import PageLoader from "@/components/shared/page-loader";
import CustomCursor from "@/components/shared/cursor";
import ScrollProgress from "@/components/shared/scroll-progress";
import "./globals.css";

/* Self-hosted via next/font — no external CSS imports needed */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mayank Singh",
    template: "%s | Mayank Singh",
  },
  description:
    "Mayank Singh — Full-Stack Engineer from Lucknow. I build fast, polished web products with Next.js, TypeScript, and the MERN stack. Freelance & contract work welcome.",
  keywords: [
    "full-stack engineer",
    "Next.js developer",
    "TypeScript",
    "MERN stack",
    "software engineer",
    "web development",
    "React developer",
    "freelance developer",
    "Lucknow developer",
    "problem solver",
  ],
  authors: [{ name: "Mayank" }],
  creator: "Mayank",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mayank — Developer Portfolio",
    title: "Mayank Singh",
    description:
      "Building polished web products with Next.js, TypeScript, and thoughtful engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Singh",
    description:
      "Building polished web products with Next.js, TypeScript, and thoughtful engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external image/data CDNs for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://api.microlink.io" />
        <link rel="dns-prefetch" href="https://cdn.worldvectorlogo.com" />
        <link rel="dns-prefetch" href="https://leetcard.jacoblin.cool" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        <ThemeProvider defaultTheme="light" enableSystem={false} disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  );
}
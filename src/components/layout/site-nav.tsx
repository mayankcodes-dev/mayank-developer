"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * SiteNav — the persistent navigation used on all sub-pages.
 * Unlike the homepage Navbar (which scroll-anchors to sections),
 * this component uses real next/link hrefs for full page navigation.
 */
export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-bold transition-transform group-hover:scale-105">
            M
          </span>
          <span className="text-sm font-semibold tracking-wide text-foreground/90">
            Mayank Developer
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 rounded-full border border-border/60 bg-muted/50 p-1 md:flex">
          {siteLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-background text-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Hire me
            <span className="grid size-6 place-items-center rounded-full bg-primary-foreground/15">
              <svg width="10" height="9" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile: Theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md px-6 py-5 md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1">
            {siteLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex w-fit items-center gap-2.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Hire me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

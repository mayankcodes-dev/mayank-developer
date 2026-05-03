"use client";

/**
 * Navbar — Unified multi-page navigation
 * 6 pages: Home · About Me · Projects · Certificates · Blog · Contact
 * ChaiCode style: full-width · glassmorphic · orange accent · active underline
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "/"               },
  { label: "About Me",     href: "/about"          },
  { label: "Projects",     href: "/projects"       },
  { label: "Certificates", href: "/certifications" },
  { label: "Blog",         href: "/blog"           },
  { label: "Contact",      href: "/contact"        },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,  setScrolled] = useState(false);
  const [menuOpen,  setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-sm shadow-black/10 backdrop-blur-xl"
            : "bg-transparent",
        ].join(" ")}
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="btn-chai grid size-8 place-items-center bg-primary text-sm font-black text-primary-foreground shadow-md shadow-primary/30">
              M
            </span>
            <span className="hidden font-bold tracking-wide text-foreground sm:block">
              Mayank<span className="text-primary">.</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={[
                  "relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Right: theme + CTA ── */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-chai btn-magnetic bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25"
            >
              Hire me →
            </Link>
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-xl border border-border/60 bg-card text-foreground"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed inset-x-4 top-[68px] z-40 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    isActive(href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-chai btn-magnetic mt-1 block bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground"
              >
                Hire me →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer — compensates for fixed navbar */}
      <div className="h-16" aria-hidden />
    </>
  );
}
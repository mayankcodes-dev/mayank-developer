"use client";

/**
 * Navbar — Homepage only (GSAP scroll anchors)
 * ChaiCode exact style: full-width · glassmorphic top bar · orange accent
 * NOT a floating pill — full width with bottom border on scroll
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const NAV_LINKS = [
  { label: "Home",    target: "hero"     },
  { label: "Work",    target: "projects"  },
  { label: "Skills",  target: "skills"   },
  { label: "Contact", target: "contact"  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("hero");
  const navRef = useRef<HTMLElement>(null);

  /* Scroll to track navbar opacity + border */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section highlighting */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.target));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* GSAP entrance */
  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
  }, []);

  const scrollTo = (target: string) => {
    setMenuOpen(false);
    gsap.to(window, { duration: 1.05, ease: "power2.inOut", scrollTo: { y: `#${target}`, offsetY: 72 } });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-sm shadow-black/10 backdrop-blur-xl"
            : "bg-transparent",
        ].join(" ")}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 focus:outline-none"
            aria-label="Go to top"
          >
            <span className="btn-chai grid size-8 place-items-center bg-primary text-sm font-black text-primary-foreground shadow-md shadow-primary/30">
              M
            </span>
            <span className="hidden font-bold tracking-wide text-foreground sm:block">
              Mayank<span className="text-primary">.</span>
            </span>
          </button>

          {/* ── Desktop nav links ── */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => scrollTo(target)}
                className={[
                  "relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                  active === target
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
                {active === target && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
                  />
                )}
              </button>
            ))}
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </div>

          {/* ── Right: theme + CTA ── */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="btn-chai btn-magnetic bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25"
            >
              Hire me →
            </motion.button>
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
        </div>
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
              {NAV_LINKS.map(({ label, target }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(target)}
                  className={[
                    "rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                    active === target
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
              <Link href="/about" onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground">
                About
              </Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground">
                Blog
              </Link>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-chai btn-magnetic mt-1 bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Hire me →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer — compensates for fixed navbar */}
      <div className="h-16" aria-hidden />
    </>
  );
}
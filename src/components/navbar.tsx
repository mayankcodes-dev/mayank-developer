"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About",        href: "/about"          },
  { label: "Projects",     href: "/projects"       },
  { label: "Certificates", href: "/certifications" },
  { label: "Blog",         href: "/blog"           },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const visible = pathname !== "/" || scrolled;

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -16 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16, pointerEvents: "none" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-[60px] flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-neutral-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.05)]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
            <div className="relative size-8 overflow-hidden rounded-lg flex-shrink-0 border border-neutral-200 shadow-sm">
              <Image
                src="/favicon-original.png"
                alt="Mayank logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[#0a0a0a] group-hover:opacity-70 transition-opacity">
              Mayank
            </span>
          </Link>

          {/* ── Desktop nav links — centered ── */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(href)
                    ? "text-[#0a0a0a]"
                    : "text-neutral-500 hover:text-[#0a0a0a]"
                }`}
              >
                {label}
                {isActive(href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-neutral-100"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── CTA right ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm font-medium text-neutral-500 hover:text-[#0a0a0a] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm text-[13px] px-4"
            >
              Resume ↗
            </Link>
          </div>

          {/* ── Mobile menu button ── */}
          <button
            className="md:hidden grid size-8 place-items-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="size-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="size-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mx-4 mt-1 rounded-xl bg-white border border-neutral-200 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col p-2 gap-0.5">
                {[{ label: "Home", href: "/" }, ...NAV_LINKS, { label: "Contact", href: "/contact" }].map(
                  ({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(href)
                          ? "bg-neutral-50 text-[#0a0a0a]"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-[#0a0a0a]"
                      }`}
                    >
                      {label}
                    </Link>
                  )
                )}
                <div className="px-2 pt-1 pb-1 border-t border-neutral-100 mt-1">
                  <a
                    href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm w-full justify-center text-[13px]"
                  >
                    Resume ↗
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for pages that are NOT the homepage (hero already handles its own spacing) */}
      {pathname !== "/" && <div className="h-[60px]" />}
    </>
  );
}
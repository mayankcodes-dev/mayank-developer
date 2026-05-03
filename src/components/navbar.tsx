"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "/"               },
  { label: "About",        href: "/about"          },
  { label: "Projects",     href: "/projects"       },
  { label: "Certificates", href: "/certifications" },
  { label: "Blog",         href: "/blog"           },
  { label: "Contact",      href: "/contact"        },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show navbar when scrolled past 80% of the viewport height (Hero section)
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] md:w-auto ${
          pathname !== "/" || scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div
          className="flex items-center justify-between md:justify-center rounded-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200 px-4 md:px-6 py-2"
        >
          {/* ── Logo for mobile only ── */}
          <Link
            href="/"
            className="md:hidden flex items-center gap-2 group"
            aria-label="Mayank — Home"
          >
            <div className="w-8 h-8 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center font-bold text-sm font-mono tracking-tighter">
              M
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={[
                  "relative px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-300",
                  isActive(href)
                    ? "text-[#0a0a0a] bg-neutral-100/50"
                    : "text-neutral-500 hover:text-[#0a0a0a] hover:bg-neutral-50",
                ].join(" ")}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-neutral-200 pointer-events-none"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-white text-[#0a0a0a] hover:bg-neutral-50 transition-colors"
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed inset-x-4 top-[84px] z-40 rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/5 md:hidden overflow-hidden"
          >
            <div className="p-2 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-colors",
                    isActive(href)
                      ? "bg-neutral-50 text-[#0a0a0a]"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-[#0a0a0a]",
                  ].join(" ")}
                >
                  {isActive(href) && (
                    <span className="mr-3 size-1.5 rounded-full bg-[#0a0a0a] flex-shrink-0" />
                  )}
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-24" aria-hidden />
    </>
  );
}
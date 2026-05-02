"use client";

/**
 * Standalone /projects page
 * ChaiCode aesthetic: pure black · orange accent · dot-grid · card hover glow
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Code2, Layers } from "lucide-react";

/* Github brand icon (not in this lucide version) */
const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

const TECH_COLORS: Record<string, string> = {
  "Next.js":      "bg-white/10 text-white",
  "Next.js 15":   "bg-white/10 text-white",
  "Next.js 16":   "bg-white/10 text-white",
  "React":        "bg-sky-500/10 text-sky-400",
  "TypeScript":   "bg-blue-500/10 text-blue-400",
  "Node.js":      "bg-green-500/10 text-green-400",
  "Express":      "bg-green-500/10 text-green-300",
  "MongoDB":      "bg-green-600/10 text-green-500",
  "PostgreSQL":   "bg-blue-600/10 text-blue-300",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-400",
  "Tailwind CSS v4": "bg-cyan-500/10 text-cyan-400",
  "GSAP":         "bg-emerald-500/10 text-emerald-400",
  "Python":       "bg-yellow-500/10 text-yellow-400",
  "FastAPI":      "bg-teal-500/10 text-teal-400",
  "JWT":          "bg-purple-500/10 text-purple-400",
  "Razorpay":     "bg-indigo-500/10 text-indigo-400",
  "Vercel":       "bg-white/10 text-white/70",
  "Resend":       "bg-rose-500/10 text-rose-400",
};

const TAG_DEFAULT = "bg-orange-500/10 text-orange-400";

const FILTERS = ["All", "Full-Stack", "Frontend", "Backend"];

const PROJECT_CATEGORY: Record<string, string> = {
  paypilot:  "Full-Stack",
  agenthub:  "Frontend",
  portfolio: "Full-Stack",
  yelp:      "Full-Stack",
  quickstay: "Full-Stack",
};

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => PROJECT_CATEGORY[p.id] === filter);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-border/60 pb-14 pt-8 md:pt-14">
          {/* Orange + blue ambient glow (ChaiCode style) */}
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 md:px-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp(0)}>
                <Link
                  href="/"
                  className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" /> Back to Home
                </Link>
              </motion.div>

              <motion.div variants={fadeUp(0.05)} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Layers className="size-3" />
                  Projects
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp(0.08)}
                className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl"
              >
                Things I&apos;ve{" "}
                <span className="text-primary">built</span>
              </motion.h1>

              <motion.p
                variants={fadeUp(0.12)}
                className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              >
                A collection of projects I&apos;ve shipped — from full-stack SaaS
                platforms to developer tools. Each one taught me something new.
              </motion.p>

              {/* Filter tabs */}
              <motion.div variants={fadeUp(0.16)} className="mt-8 flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <motion.button
                    key={f}
                    id={`project-filter-${f.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setFilter(f)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={[
                      "btn-chai px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                      filter === f
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "border border-border/60 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    ].join(" ")}
                  >
                    {f}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Project Grid ── */}
        <section className="mx-auto max-w-6xl px-6 py-14 md:px-10">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.12)]"
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground shadow-lg">
                      Featured
                    </div>
                  )}

                  {/* Cover image / gradient */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-card via-card to-primary/5">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : null}
                    {/* Fallback code icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                      <Code2 className="size-20 text-primary" />
                    </div>
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div>
                      <h2 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TECH_COLORS[tech] ?? TAG_DEFAULT}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex items-center gap-3 pt-1">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          className="btn-chai flex items-center gap-2 border border-border/60 bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground/80 transition-all hover:border-primary/50 hover:text-primary"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <GithubIcon className="size-4" />
                          Code
                        </motion.a>
                      )}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          className="btn-chai btn-magnetic flex items-center gap-2 bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink className="size-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Code2 className="mb-4 size-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">No projects in this category yet.</p>
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center md:px-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold"
            >
              Got a project idea?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-muted-foreground"
            >
              Let&apos;s build something great together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-7 flex justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="btn-chai btn-magnetic inline-flex items-center gap-2 bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30"
                >
                  Let&apos;s Talk →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://github.com/coderMayank69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-chai inline-flex items-center gap-2 border border-border/60 px-6 py-3 font-semibold text-foreground/80 hover:border-primary/50 hover:text-primary"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

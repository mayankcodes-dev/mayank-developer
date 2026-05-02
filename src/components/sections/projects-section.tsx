"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink, Pin } from "lucide-react";
import { projects } from "@/data/projects";

const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const TABS = ["All", "Freelance", "Personal"] as const;
type Tab = typeof TABS[number];

const GRADIENTS = [
  "from-orange-500/15 to-transparent",
  "from-sky-500/15 to-transparent",
  "from-violet-500/15 to-transparent",
  "from-green-500/15 to-transparent",
  "from-pink-500/15 to-transparent",
];

export default function ProjectsSection() {
  const [tab, setTab] = useState<Tab>("All");

  const filtered = projects.filter(p =>
    tab === "All" ? true : p.type === tab.toLowerCase()
  );

  // Pinned first
  const sorted = [...filtered].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Portfolio</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">What I&apos;ve built</h2>
        </div>
        <Link href="/projects" className="btn-chai hidden items-center gap-2 border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground md:inline-flex">
          All projects <ArrowRight className="size-4" />
        </Link>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2">
        {TABS.map(t => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={[
              "btn-chai px-4 py-1.5 text-sm font-semibold transition-all",
              tab === t
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
          >
            {t}
            {t !== "All" && (
              <span className="ml-1.5 rounded-full bg-current/20 px-1.5 py-0.5 text-xs">
                {projects.filter(p => p.type === t.toLowerCase()).length}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -7 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_36px_rgba(249,115,22,0.12)]"
            >
              {/* Badges */}
              <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
                {project.isPinned && (
                  <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                    <Pin className="size-2.5" /> Pinned
                  </span>
                )}
                <span className={[
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  project.type === "freelance"
                    ? "bg-violet-500/20 text-violet-400"
                    : "bg-sky-500/20 text-sky-400",
                ].join(" ")}>
                  {project.type === "freelance" ? "💼 Freelance" : "🚀 Personal"}
                </span>
              </div>

              {/* Cover */}
              <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}>
                <Code2 className="size-14 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">{project.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map(t => (
                    <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{t}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-full bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className="mt-auto flex gap-2.5 pt-1">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="btn-chai flex items-center gap-1.5 border border-border/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary">
                      <GithubIcon className="size-3.5" /> Code
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="btn-chai btn-magnetic flex items-center gap-1.5 bg-primary px-3 py-1.5 text-xs font-bold text-white">
                      <ExternalLink className="size-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 text-center md:hidden">
        <Link href="/projects" className="btn-chai inline-flex items-center gap-2 border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground">
          View all <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

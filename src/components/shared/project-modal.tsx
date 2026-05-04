"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const badgeClass =
    project?.type === "freelance"
      ? "badge-yellow"
      : project?.type === "group"
      ? "text-blue-700 bg-blue-50 border border-blue-200 text-[10px] rounded-full px-2 py-0.5"
      : "badge-green";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-t-2xl md:rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]"
          >
            {/* Image section */}
            <div className="relative h-52 md:h-60 w-full flex-shrink-0 bg-neutral-50 overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (project.link && !img.dataset.fallback) {
                      img.dataset.fallback = "1";
                      img.src = `https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`;
                    } else {
                      img.style.display = "none";
                    }
                  }}
                />
              ) : project.link ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=8000`}
                  alt={project.title}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Code2 className="size-16 text-neutral-200" />
                </div>
              )}
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Content — scrollable */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge text-[10px] capitalize ${badgeClass}`}>{project.type}</span>
                    {project.period && (
                      <span className="font-mono text-[10px] text-neutral-400">{project.period}</span>
                    )}
                  </div>
                  <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-[#0a0a0a]">
                    {project.title}
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 grid size-8 place-items-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 hover:text-[#0a0a0a] hover:border-neutral-400 transition-colors"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm md:text-base text-neutral-500 leading-relaxed">
                {project.longDescription || project.description}
              </p>

              {/* Tech stack */}
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-md text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-outline btn-sm"
                  >
                    <Github className="size-3.5" />
                    Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Code2 } from "lucide-react";

/* ── Colour palette per tech ─────────────────────────────────────────────── */
const TECH_COLOURS: Record<string, string> = {
  "Next.js":      "#000000",
  "React":        "#61dafb",
  "Vite":         "#646cff",
  "TypeScript":   "#3178c6",
  "JavaScript":   "#f7df1e",
  "Node.js":      "#3c873a",
  "Express":      "#404040",
  "MongoDB":      "#47a248",
  "Tailwind CSS": "#38bdf8",
  "Tailwind":     "#38bdf8",
  "HTML5":        "#e34f26",
  "HTML":         "#e34f26",
  "CSS3":         "#264de4",
  "CSS":          "#264de4",
  "Bootstrap":    "#7952b3",
  "Docker":       "#0db7ed",
  "Firebase":     "#ffca28",
  "Stripe":       "#635bff",
  "Clerk":        "#6c47ff",
  "Cloudinary":   "#3448c5",
  "Razorpay":     "#072654",
};

function getTechColour(tech: string): string {
  return TECH_COLOURS[tech] ?? "#6b7280";
}

/* ── Micro-link URL builder (adds cache-bust on retry) ───────────────────── */
function microlinkUrl(url: string, attempt: number): string {
  const base = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=10000`;
  return attempt > 0 ? `${base}&_cb=${attempt}` : base;
}

/* ── Gradient placeholder when everything fails ──────────────────────────── */
function TechPlaceholder({ title, technologies }: { title: string; technologies: string[] }) {
  const topTechs = technologies.slice(0, 3);
  const colours  = topTechs.map(getTechColour);
  const gradient =
    colours.length >= 2
      ? `linear-gradient(135deg, ${colours[0]}22 0%, ${colours[1]}22 50%, ${colours[2] ?? colours[0]}22 100%)`
      : `linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)`;

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 select-none"
      style={{ background: gradient }}
    >
      <Code2 className="size-8 text-neutral-300" />
      <span className="text-[11px] font-medium text-neutral-400 max-w-[80%] text-center line-clamp-1">
        {title}
      </span>
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[160px]">
        {topTechs.map((t) => (
          <span
            key={t}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
            style={{
              color:            getTechColour(t),
              borderColor:      `${getTechColour(t)}44`,
              backgroundColor:  `${getTechColour(t)}11`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
interface ProjectCoverProps {
  /** Static image path (public/images/…) — shown directly, no microlink */
  image:        string;
  /** Live URL to screenshot via microlink */
  link?:        string;
  title:        string;
  technologies: string[];
  /** Extra className for the outer wrapper */
  className?:   string;
}

type Stage = "skeleton" | "loading" | "loaded" | "placeholder";

const MAX_RETRIES = 3;

export default function ProjectCover({
  image,
  link,
  title,
  technologies,
  className = "",
}: ProjectCoverProps) {
  const [stage,   setStage]   = useState<Stage>(image ? "loading" : link ? "skeleton" : "placeholder");
  const [attempt, setAttempt] = useState(0);
  const retryTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted   = useRef(true);

  /* 
   * When there is no static image but there IS a link → wait 1.5 s before
   * firing the first microlink request.  This prevents all N cards from
   * hammering microlink simultaneously on page load (rate-limit avoidance).
   * Each card staggers based on its position (handled via CSS animation-delay
   * on the skeleton shimmer; the actual fetch delay is done via useEffect).
   */
  useEffect(() => {
    isMounted.current = true;
    if (!image && link) {
      const t = setTimeout(() => {
        if (isMounted.current) setStage("loading");
      }, 800);
      return () => { clearTimeout(t); isMounted.current = false; };
    }
    return () => { isMounted.current = false; };
  }, [image, link]);

  /* Cleanup any lingering retry timers */
  useEffect(() => {
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, []);

  function handleError() {
    if (!isMounted.current) return;
    if (attempt < MAX_RETRIES - 1) {
      const nextAttempt = attempt + 1;
      // Exponential back-off: 4s, 10s, 20s
      const delay = [4000, 10000, 20000][attempt] ?? 20000;
      retryTimer.current = setTimeout(() => {
        if (isMounted.current) {
          setAttempt(nextAttempt);
          setStage("loading");
        }
      }, delay);
      setStage("skeleton"); // show shimmer while waiting to retry
    } else {
      setStage("placeholder");
    }
  }

  /* ── Static image (provided directly from projects.ts) ── */
  if (image) {
    return (
      <div className={`relative h-44 overflow-hidden bg-neutral-50 border-b border-neutral-100 ${className}`}>
        {stage !== "loaded" && (
          <div className="absolute inset-0 bg-neutral-100 overflow-hidden">
            <div className="shimmer absolute inset-0" />
          </div>
        )}
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover object-top transition-opacity duration-300 ${stage === "loaded" ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={()  => { if (isMounted.current) setStage("loaded"); }}
          onError={()  => { if (isMounted.current) setStage("placeholder"); }}
        />
        {stage === "placeholder" && (
          <div className="absolute inset-0">
            <TechPlaceholder title={title} technologies={technologies} />
          </div>
        )}
      </div>
    );
  }

  /* ── No static image: microlink screenshot ── */
  return (
    <div className={`relative h-44 overflow-hidden bg-neutral-50 border-b border-neutral-100 ${className}`}>
      {/* Shimmer skeleton */}
      {(stage === "skeleton" || stage === "loading") && (
        <div className="absolute inset-0 bg-neutral-100 overflow-hidden">
          <div className="shimmer absolute inset-0" />
          {/* subtle label so the user knows it's loading */}
          <span className="absolute bottom-2 right-2.5 text-[9px] font-mono text-neutral-300 select-none">
            loading preview…
          </span>
        </div>
      )}

      {/* Microlink screenshot */}
      {stage === "loading" && link && (
        <img
          key={attempt}                          /* re-mount on retry */
          src={microlinkUrl(link, attempt)}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0"
          loading="lazy"
          onLoad={(e) => {
            if (!isMounted.current) return;
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transition = "opacity 0.3s";
            setStage("loaded");
          }}
          onError={handleError}
        />
      )}

      {/* Successfully loaded microlink image stays visible */}
      {stage === "loaded" && link && (
        <img
          src={microlinkUrl(link, attempt)}
          alt={title}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      )}

      {/* Final fallback: tech-stack gradient card */}
      {stage === "placeholder" && (
        <TechPlaceholder title={title} technologies={technologies} />
      )}
    </div>
  );
}

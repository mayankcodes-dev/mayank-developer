"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Badge {
  id:          number;
  displayName: string;
  icon:        string;
  creationDate?: string;
}

interface LeetCodeStats {
  leetcode:      number;
  totalProblems: number;
  easy:          number;
  medium:        number;
  hard:          number;
  easyTotal:     number;
  mediumTotal:   number;
  hardTotal:     number;
  badgesCount:   number;
  badges:        Badge[];
  mostRecentBadge: Badge | null;
}

/* ── Circular progress gauge ─────────────────────────────────────────────── */
function CircularGauge({
  solved,
  total,
  easy,
  medium,
  hard,
}: {
  solved: number;
  total:  number;
  easy:   number;
  medium: number;
  hard:   number;
}) {
  const R  = 52;
  const cx = 64;
  const cy = 64;
  const circumference = 2 * Math.PI * R;

  const easyFrac   = easy   / total;
  const medFrac    = medium / total;
  const hardFrac   = hard   / total;

  // Clockwise segments: easy (green) → medium (yellow) → hard (red)
  // Start at top (−90 deg = −circumference/4 offset)
  const easyDash   = circumference * easyFrac;
  const medDash    = circumference * medFrac;
  const hardDash   = circumference * hardFrac;

  const easyOffset   = -(circumference / 4);
  const medOffset    = easyOffset   - easyDash;
  const hardOffset   = medOffset    - medDash;

  const animRef = useRef<SVGTextElement>(null);
  useEffect(() => {
    if (!animRef.current) return;
    let start = 0;
    const duration = 900;
    const startTime = performance.now();
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (animRef.current) animRef.current.textContent = String(Math.round(solved * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [solved]);

  return (
    <svg viewBox="0 0 128 128" className="w-36 h-36 flex-shrink-0" aria-hidden>
      {/* Track */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2d2d2d" strokeWidth={10} />

      {/* Easy segment – LeetCode green */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke="#00b8a3"
        strokeWidth={10}
        strokeDasharray={`${easyDash} ${circumference}`}
        strokeDashoffset={easyOffset}
        strokeLinecap="butt"
      />
      {/* Medium segment – LeetCode yellow */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke="#ffc01e"
        strokeWidth={10}
        strokeDasharray={`${medDash} ${circumference}`}
        strokeDashoffset={medOffset}
        strokeLinecap="butt"
      />
      {/* Hard segment – LeetCode red */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke="#ef4743"
        strokeWidth={10}
        strokeDasharray={`${hardDash} ${circumference}`}
        strokeDashoffset={hardOffset}
        strokeLinecap="butt"
      />

      {/* Centre text */}
      <text
        ref={animRef}
        x={cx} y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="18"
        fontWeight="700"
        fontFamily="monospace"
      >
        {solved}
      </text>
      <text
        x={cx} y={cy + 13}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="8"
        fontFamily="sans-serif"
      >
        Solved
      </text>
    </svg>
  );
}

/* ── Difficulty row ──────────────────────────────────────────────────────── */
function DiffRow({
  label,
  solved,
  total,
  color,
}: {
  label:  string;
  solved: number;
  total:  number;
  color:  string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2"
         style={{ backgroundColor: `${color}15` }}>
      <span className="text-xs font-semibold w-12" style={{ color }}>{label}</span>
      <span className="text-xs font-mono text-neutral-300">
        <span className="font-bold text-white">{solved}</span>/{total}
      </span>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function LeetCodeStatsCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [activeBadgeIdx, setActiveBadgeIdx] = useState(0);

  useEffect(() => {
    const CACHE_KEY  = "lc-stats-card-v1";
    const CACHE_TIME = "lc-stats-card-time-v1";
    const ONE_HOUR   = 60 * 60 * 1000;

    async function load() {
      // Try cache
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const time   = localStorage.getItem(CACHE_TIME);
        if (cached && time && Date.now() - Number(time) < ONE_HOUR) {
          setStats(JSON.parse(cached));
          return;
        }
      } catch { /* ignore */ }

      try {
        const res  = await fetch("/api/stats?username=mayankcodes-dev");
        if (!res.ok) throw new Error("stats api failed");
        const data = await res.json();
        if (data.status !== "ok") throw new Error("bad status");
        setStats(data as LeetCodeStats);
        try {
          localStorage.setItem(CACHE_KEY,  JSON.stringify(data));
          localStorage.setItem(CACHE_TIME, String(Date.now()));
        } catch { /* ignore */ }
      } catch {
        // Hardcoded fallback so the UI always shows something
        setStats({
          leetcode:        125,
          totalProblems:   3949,
          easy:            57,
          medium:          57,
          hard:            11,
          easyTotal:       947,
          mediumTotal:     2063,
          hardTotal:       939,
          badgesCount:     2,
          badges:          [],
          mostRecentBadge: { id: 1, displayName: "50 Days Badge 2026", icon: "" },
        });
      }
    }

    load();
  }, []);

  if (!stats) {
    return (
      <div className="h-28 w-full animate-pulse rounded-xl bg-neutral-800" />
    );
  }

  const displayBadges = stats.badges.slice(0, 4);

  return (
    <div
      className="rounded-xl border border-neutral-700 overflow-hidden"
      style={{ background: "#1a1a1a" }}
    >
      {/* ── Row 1: gauge + difficulty + badges ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-0 divide-y sm:divide-y-0 sm:divide-x divide-neutral-700/60">

        {/* Left: gauge + difficulty */}
        <div className="flex items-center gap-5 px-6 py-5 flex-1 min-w-0">
          <CircularGauge
            solved={stats.leetcode ?? 125}
            total={stats.totalProblems ?? 3949}
            easy={stats.easy ?? 57}
            medium={stats.medium ?? 57}
            hard={stats.hard ?? 11}
          />

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* total */}
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              Total Problems
            </p>
            <p className="text-lg font-bold text-white leading-none">
              {stats.leetcode ?? "—"}
              <span className="text-neutral-500 text-sm font-normal">/{stats.totalProblems ?? "3949"}</span>
            </p>

            <div className="flex flex-col gap-1.5 mt-1">
              <DiffRow label="Easy"   solved={stats.easy   ?? 57} total={stats.easyTotal   ?? 947}  color="#00b8a3" />
              <DiffRow label="Med."   solved={stats.medium ?? 57} total={stats.mediumTotal  ?? 2063} color="#ffc01e" />
              <DiffRow label="Hard"   solved={stats.hard   ?? 11} total={stats.hardTotal    ?? 939}  color="#ef4743" />
            </div>
          </div>
        </div>

        {/* Right: badges */}
        <div className="px-6 py-5 flex flex-col gap-3 sm:w-64 xl:w-72">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Badges</p>
              <p className="text-lg font-bold text-white">{stats.badgesCount ?? 2}</p>
            </div>
            <a
              href="https://leetcode.com/u/mayankcodes-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid place-items-center size-7 rounded-lg border border-neutral-600 text-neutral-400 hover:text-white hover:border-neutral-400 transition-colors"
              aria-label="LeetCode profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </a>
          </div>

          {/* Badge icons grid */}
          {displayBadges.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {displayBadges.map((badge, i) => (
                <button
                  key={badge.id}
                  onClick={() => setActiveBadgeIdx(i)}
                  title={badge.displayName}
                  className={`relative size-14 rounded-xl border-2 transition-colors overflow-hidden flex items-center justify-center ${
                    activeBadgeIdx === i
                      ? "border-[#FFA116]"
                      : "border-neutral-700 hover:border-neutral-500"
                  }`}
                  style={{ background: "#222" }}
                >
                  {badge.icon ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={badge.icon}
                      alt={badge.displayName}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-2xl">🏅</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            /* Fallback badge display when API didn't return badge icons */
            <div className="flex gap-3">
              {Array.from({ length: Math.min(stats.badgesCount || 2, 4) }).map((_, i) => (
                <div
                  key={i}
                  className="size-14 rounded-xl border-2 border-neutral-700 flex items-center justify-center"
                  style={{ background: "#222" }}
                >
                  <span className="text-2xl">🏅</span>
                </div>
              ))}
            </div>
          )}

          {/* Most-recent / active badge name */}
          <div className="mt-auto">
            <p className="text-[10px] text-neutral-500 mb-1">Most Recent Badge</p>
            <p className="text-xs font-semibold text-neutral-200 truncate">
              {displayBadges[activeBadgeIdx]?.displayName
                ?? stats.mostRecentBadge?.displayName
                ?? "50 Days Badge 2026"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

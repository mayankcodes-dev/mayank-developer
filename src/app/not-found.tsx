"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Terminal, AlertTriangle, ArrowLeft } from "lucide-react";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";

function TypingLine({ text, delay = 0, speed = 40, onDone, error = false }: {
  text: string; delay?: number; speed?: number; onDone?: () => void; error?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) { onDone?.(); return; }
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed + Math.random() * 30
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  return (
    <span className={error ? "text-red-500 font-medium" : ""}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse text-red-500">█</span>
      )}
    </span>
  );
}

const TERMINAL_LINES = [
  { text: "> Attempting to resolve path...", delay: 200 },
  { text: "> Route matching failed. No module found.", delay: 1000 },
  { text: "> ERROR 404: The requested resource is missing.", delay: 1800, error: true },
  { text: "> System recommendation: Return to root.", delay: 2800 },
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-white text-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />

        <div className="relative z-10 w-full max-w-2xl pt-16">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6 rounded-full bg-red-50 p-4 border border-red-100 shadow-sm relative">
               <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20" />
               <AlertTriangle className="size-10 text-red-500 relative z-10" />
            </div>
            
            <h1 
              className="text-6xl md:text-8xl font-black tracking-tighter text-[#0a0a0a] mb-4"
              style={{ textShadow: "4px 0px 0px rgba(239, 68, 68, 0.1), -2px 0px 0px rgba(0,0,0,0.05)" }}
            >
              404
            </h1>
            <p className="font-mono text-sm md:text-base text-red-500 uppercase tracking-widest font-semibold mb-8 border border-red-200 bg-red-50 px-4 py-1.5 rounded">
              Route_Compromised :: Access_Denied
            </p>
          </div>

          {/* Light Terminal */}
          <div className="rounded-xl border border-neutral-200 bg-[#fafafa] shadow-sm overflow-hidden mb-8">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 bg-white">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Terminal className="size-3" /> system_diagnostics.sh
              </span>
            </div>
            <div className="p-5 font-mono text-sm min-h-[160px] space-y-2 text-neutral-600">
              {TERMINAL_LINES.slice(0, visibleLines + 1).map((line, i) => (
                <p key={i}>
                  <TypingLine
                    text={line.text}
                    delay={i === 0 ? line.delay : 0}
                    error={line.error}
                    onDone={() => {
                      if (i === visibleLines && i < TERMINAL_LINES.length - 1) {
                        setTimeout(() => setVisibleLines((v) => v + 1), 150);
                      }
                    }}
                  />
                </p>
              ))}
              {visibleLines >= TERMINAL_LINES.length - 1 && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <span className="animate-pulse text-red-500">_</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              <ArrowLeft className="size-4 mr-1.5" /> Return Home
            </Link>
            <Link href="/projects" className="btn btn-outline font-mono text-sm">
              ls /projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

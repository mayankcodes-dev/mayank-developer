"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    document.body.style.cursor = "none";

    let hasMoved = false;

    // Dot tracks the mouse with zero latency via direct style update
    // Ring tracks with a CSS transition (no rAF loop needed → zero jank)
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      dot.style.transform  = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${x}px,${y}px,0)`;

      if (!hasMoved) {
        hasMoved = true;
        dot.style.display  = "block";
        ring.style.display = "block";
      }
    };

    const TARGETS = "a, button, [role='button'], input, textarea, select, label";

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;
      const tag     = el.tagName.toLowerCase();
      const isBtn   = tag === "button" || el.closest("button") !== null;
      const isInput = ["input", "textarea", "select"].includes(tag);

      const innerRing = ring.firstElementChild as HTMLElement;
      const innerDot  = dot.firstElementChild  as HTMLElement;

      if (innerRing) {
        if (isBtn) {
          innerRing.style.setProperty("--width",        "48px");
          innerRing.style.setProperty("--height",       "30px");
          innerRing.style.setProperty("--radius",       "8px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color",     "rgba(10,10,10,0.06)");
        } else if (isInput) {
          innerRing.style.setProperty("--width",        "16px");
          innerRing.style.setProperty("--height",       "2px");
          innerRing.style.setProperty("--radius",       "2px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color",     "rgba(10,10,10,0.3)");
        } else {
          innerRing.style.setProperty("--width",        "40px");
          innerRing.style.setProperty("--height",       "40px");
          innerRing.style.setProperty("--radius",       "9999px");
          innerRing.style.setProperty("--border-color", "#0a0a0a");
          innerRing.style.setProperty("--bg-color",     "rgba(10,10,10,0.04)");
        }
      }
      if (innerDot) innerDot.style.setProperty("--scale", "0.5");
      el.style.cursor = "none";
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(TARGETS) as HTMLElement;
      if (!el) return;
      const innerRing = ring.firstElementChild as HTMLElement;
      const innerDot  = dot.firstElementChild  as HTMLElement;
      if (innerRing) {
        innerRing.style.setProperty("--width",        "32px");
        innerRing.style.setProperty("--height",       "32px");
        innerRing.style.setProperty("--radius",       "50%");
        innerRing.style.setProperty("--border-color", "rgba(10,10,10,0.4)");
        innerRing.style.setProperty("--bg-color",     "transparent");
      }
      if (innerDot) innerDot.style.setProperty("--scale", "1");
    };

    const onDown = () => { (dot.firstElementChild as HTMLElement)?.style.setProperty("--scale", "0.6"); };
    const onUp   = () => { (dot.firstElementChild as HTMLElement)?.style.setProperty("--scale", "1"); };

    window.addEventListener("mousemove",  onMove,      { passive: true });
    document.body.addEventListener("mouseover",  onMouseOver);
    document.body.addEventListener("mouseout",   onMouseOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.body.removeEventListener("mouseover",  onMouseOver);
      document.body.removeEventListener("mouseout",   onMouseOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot — no transition, follows mouse at native speed */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          display: "none",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#0a0a0a",
            transform: "translate(-50%, -50%) scale(var(--scale, 1))",
            transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>

      {/* Ring — CSS transition handles smoothing (no rAF loop) */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
          display: "none",
          // Smooth lag on the ring via CSS transition on the wrapper
          transition: "transform 0.10s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <div
          style={{
            width: "var(--width, 32px)",
            height: "var(--height, 32px)",
            borderRadius: "var(--radius, 50%)",
            border: "1.5px solid var(--border-color, rgba(10,10,10,0.4))",
            backgroundColor: "var(--bg-color, transparent)",
            transform: "translate(-50%, -50%)",
            transition:
              "width 0.2s cubic-bezier(0.25,1,0.5,1), height 0.2s cubic-bezier(0.25,1,0.5,1), border-radius 0.2s cubic-bezier(0.25,1,0.5,1), border-color 0.2s cubic-bezier(0.25,1,0.5,1), background-color 0.2s cubic-bezier(0.25,1,0.5,1)",
            boxSizing: "border-box",
          }}
        />
      </div>
    </>
  );
}

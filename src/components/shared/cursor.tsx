"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    // Force visible
    dot.style.display  = "block";
    ring.style.display = "block";
    document.body.style.cursor = "none";

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx - 5, y: my - 5 });
    };

    const tick = gsap.ticker.add(() => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      gsap.set(ring, { x: rx - 18, y: ry - 18 });
    });

    // States
    const onEnter = (e: Event) => {
      const el  = e.target as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const isBtn = tag === "button" || el.closest("button") !== null;
      const isInput = ["input","textarea","select"].includes(tag);

      if (isBtn) {
        gsap.to(ring, { width: 52, height: 34, borderRadius: 8, borderColor: "#f97316", backgroundColor: "rgba(249,115,22,0.12)", duration: 0.25, ease: "power2.out" });
      } else if (isInput) {
        gsap.to(ring, { width: 18, height: 3,  borderRadius: 2, borderColor: "#f97316", backgroundColor: "rgba(249,115,22,0.5)",  duration: 0.2,  ease: "power2.out" });
      } else {
        gsap.to(ring, { width: 44, height: 44, borderRadius: 9999, borderColor: "#f97316", backgroundColor: "rgba(249,115,22,0.07)", duration: 0.25, ease: "power2.out" });
      }
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
      (el as HTMLElement).style.cursor = "none";
    };

    const onLeave = () => {
      gsap.to(ring, { width: 36, height: 36, borderRadius: 9999, borderColor: "rgba(249,115,22,0.75)", backgroundColor: "transparent", duration: 0.35, ease: "elastic.out(1,0.6)" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
    };

    const onDown = () => gsap.to([dot, ring], { scale: 0.75, duration: 0.1 });
    const onUp   = () => gsap.to([dot, ring], { scale: 1,    duration: 0.4, ease: "elastic.out(1,0.5)" });

    const TARGETS = "a, button, [role='button'], input, textarea, select, label";
    const bind = () => document.querySelectorAll<HTMLElement>(TARGETS).forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.style.cursor = "none";
    });
    bind();

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.body.style.cursor = "";
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position:"fixed", top:0, left:0, zIndex:9999,
          width:10, height:10, borderRadius:"50%",
          background:"#f97316",
          pointerEvents:"none", willChange:"transform",
          boxShadow:"0 0 6px 2px rgba(249,115,22,0.5)",
          display:"none",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position:"fixed", top:0, left:0, zIndex:9998,
          width:36, height:36, borderRadius:"50%",
          border:"1.5px solid rgba(249,115,22,0.75)",
          background:"transparent",
          pointerEvents:"none", willChange:"transform",
          display:"none",
        }}
      />
    </>
  );
}

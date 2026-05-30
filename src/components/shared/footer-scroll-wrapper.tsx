"use client";

import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  footer: ReactNode;
  className?: string;
}

/**
 * Wraps <main> content + <Footer> on sub-pages.
 * The white content wrapper scales 1→0.82 and gets rounded bottom corners
 * as the footer scrolls into view — using CSS scroll-driven animation
 * instead of GSAP scrub for zero jank and native GPU compositing.
 */
export default function FooterScrollWrapper({ children, footer, className = "" }: Props) {
  return (
    <div className="w-full bg-black overflow-x-hidden">
      {/* White content — scales via CSS scroll-driven animation */}
      <div
        className={`relative w-full bg-white text-[#0a0a0a] overflow-hidden footer-scale-wrapper ${className}`}
        style={{ transformOrigin: "bottom center" }}
      >
        {children}
      </div>

      {/* Footer sits outside the scaling wrapper */}
      <div className="footer-trigger">
        {footer}
      </div>

      <style>{`
        @supports (animation-timeline: scroll()) {
          .footer-scale-wrapper {
            animation: footer-shrink linear both;
            animation-timeline: scroll(root);
            animation-range: calc(100vh * 0) calc(100% - 0px);
          }

          @keyframes footer-shrink {
            0%   { scale: 1;    border-radius: 0; }
            85%  { scale: 1;    border-radius: 0; }
            100% { scale: 0.82; border-radius: 0 0 60px 60px; }
          }
        }

        /* Fallback for browsers without scroll-driven animations (Firefox < 110, Safari < 18) */
        @supports not (animation-timeline: scroll()) {
          .footer-scale-wrapper {
            scale: 1;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  footer: ReactNode;
  className?: string;
}

/**
 * Wraps <main> content + <Footer> so that they layout naturally.
 * Removed the GSAP scaling animation to eliminate visual scroll gaps and ensure fixed positioning works perfectly.
 */
export default function FooterScrollWrapper({ children, footer, className = "" }: Props) {
  return (
    <div className="w-full bg-black overflow-x-hidden">
      {/* White content */}
      <div className={`relative w-full bg-white text-[#0a0a0a] overflow-hidden ${className}`}>
        {children}
      </div>

      {/* Footer */}
      <div>
        {footer}
      </div>
    </div>
  );
}

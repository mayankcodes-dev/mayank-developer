import Link from "next/link";

interface LogoProps {
  /** px size of the square mark. Defaults to 32. */
  size?: number;
  /** Show "Mayank Singh" text beside the mark. Defaults to false. */
  showName?: boolean;
  className?: string;
}

/**
 * Site logo — identical mark to the favicon (black rounded square + white M).
 * Use this everywhere instead of ad-hoc divs so the brand stays consistent.
 */
export function LogoMark({ size = 32 }: { size?: number }) {
  const r = Math.round(size * 0.25); // border-radius proportional to size
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx={r} fill="#0a0a0a" />
      <text
        x="16"
        y="22"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="800"
        textAnchor="middle"
        fill="white"
      >
        M
      </text>
    </svg>
  );
}

export default function Logo({ size = 32, showName = false, className = "" }: LogoProps) {
  return (
    <Link href="/" aria-label="Home" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="transition-transform duration-200 group-hover:scale-105">
        <LogoMark size={size} />
      </span>
      {showName && (
        <span className="flex flex-col leading-none">
          <span className="font-semibold text-[#0a0a0a] text-[15px]">Mayank Singh</span>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
            Full-Stack Developer
          </span>
        </span>
      )}
    </Link>
  );
}

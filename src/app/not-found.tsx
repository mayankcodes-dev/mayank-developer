import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[oklch(0.03_0_0)] px-6 text-white">
      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 3%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.55 0.22 264 / 20%) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 90%, oklch(0.93 0.22 122 / 8%) 0%, transparent 60%)",
        }}
      />

      {/* Terminal card */}
      <div className="w-full max-w-lg">
        {/* Window chrome */}
        <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-white/30 font-mono tracking-wider">
            mayank@portfolio ~ zsh
          </span>
        </div>

        {/* Terminal body */}
        <div className="rounded-b-xl border border-white/10 bg-black/60 px-6 py-6 backdrop-blur-sm">
          <div className="space-y-1.5 font-mono text-sm">
            <p className="text-white/40">$ navigate /page</p>
            <p className="text-red-400">
              Error: ENOENT — path not found
            </p>
            <p className="text-white/30">
              exit code <span className="text-[oklch(0.93_0.22_122)]">404</span>
            </p>
          </div>

          <div className="my-5 h-px bg-white/10" />

          {/* Big 404 */}
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.35em] text-white/30 uppercase mb-3">
              status · 404
            </p>
            <h1
              className={`${playfair.className} text-7xl font-bold leading-none text-[oklch(0.93_0.22_122)] md:text-9xl`}
            >
              404
            </h1>
            <p className={`${playfair.className} mt-4 text-2xl font-semibold text-white/90`}>
              Page not found
            </p>
            <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-xs mx-auto">
              This route doesn&apos;t exist — maybe it was deleted, moved, or
              never shipped.
            </p>
          </div>

          <div className="my-5 h-px bg-white/10" />

          {/* Suggestions */}
          <div className="space-y-1.5 font-mono text-xs text-white/30 mb-6">
            <p className="flex items-center gap-2">
              <Terminal className="size-3 shrink-0" />
              Try one of these routes:
            </p>
            {[
              { label: "/ — home", href: "/" },
              { label: "/blog — articles", href: "/blog" },
              { label: "/projects — work", href: "/projects" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="ml-5 block text-[oklch(0.93_0.22_122)/70] hover:text-[oklch(0.93_0.22_122)] transition-colors"
              >
                → {r.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="block">
            <Button
              className="w-full gap-2 bg-[oklch(0.93_0.22_122)] text-black font-semibold hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
          </Link>
        </div>

        {/* Glow under card */}
        <div
          className="pointer-events-none mx-auto mt-2 h-8 w-2/3 blur-2xl rounded-full opacity-30"
          style={{ background: "oklch(0.93 0.22 122 / 40%)" }}
        />
      </div>
    </main>
  );
}

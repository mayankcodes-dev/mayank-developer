"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Download, Award, Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import { certificates } from "@/data/certificates";

gsap.registerPlugin(ScrollToPlugin);

/* ─── Terminal code snippet ─── */
const CODE_LINES = [
  { text: "const mayank = {",              col: "text-foreground/80" },
  { text: "  role:    'MERN Developer',",  col: "text-emerald-400" },
  { text: "  seeking: 'Internship',",      col: "text-sky-400" },
  { text: "  stack:   ['React', 'Node',",  col: "text-primary" },
  { text: "             'MongoDB'],",      col: "text-primary" },
  { text: "  location: 'Lucknow, IN',",    col: "text-amber-400" },
  { text: "};",                            col: "text-foreground/80" },
  { text: "",                              col: "" },
  { text: "mayank.build('your idea') 🚀",  col: "text-primary font-semibold" },
];

const SOCIALS = [
  { href: "https://github.com/coderMayank69",            label: "GitHub",   path: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
  { href: "https://www.linkedin.com/in/codermayank69/", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://leetcode.com/u/coderMayank69/",      label: "LeetCode", path: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" },
  { href: "https://codermayank69.hashnode.dev/",         label: "Hashnode", path: "M13.205.043a13.01 13.01 0 0 0-9.23 3.816A13.038 13.038 0 0 0 .043 13.1c.066 7.18 5.984 12.998 13.162 12.998 7.117 0 13.018-5.836 13.018-13.021 0-7.228-5.877-13.077-13.018-13.034zm1.245 16.918a3.437 3.437 0 0 1-4.864 0 3.44 3.44 0 0 1 0-4.865 3.438 3.438 0 0 1 4.864 0 3.44 3.44 0 0 1 0 4.865z" },
  { href: "mailto:codermayank69@gmail.com",             label: "Email",    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" },
];

const STATS = [
  { value: "5+",  label: "Projects shipped" },
  { value: "10+", label: "Certificates" },
  { value: "6+",  label: "Months experience" },
  { value: "∞",   label: "Lines of code" },
];

const TECH_STACK = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "GSAP"];

const GRADIENT_MAP = [
  "from-orange-500/20 via-transparent to-transparent",
  "from-sky-500/20 via-transparent to-transparent",
  "from-violet-500/20 via-transparent to-transparent",
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const rootRef     = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const socialRef   = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from([subRef.current, titleRef.current, descRef.current, ctaRef.current, socialRef.current], {
          y: 40, opacity: 0, duration: 0.9, stagger: 0.1,
        })
        .from(terminalRef.current, {
          x: 60, opacity: 0, scale: 0.94, duration: 1.1,
        }, "-=0.7");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    gsap.to(window, { duration: 1.05, ease: "power2.inOut", scrollTo: { y: `#${id}`, offsetY: 80 } });

  return (
    <div ref={rootRef} className="w-full bg-background text-foreground">
      <Navbar />

      {/* ════ HERO — Editorial photo split ════ */}
      <main id="hero" className="relative w-full overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-none grid-cols-1 lg:grid-cols-2">

          {/* LEFT — Full-height photo */}
          <div ref={terminalRef} className="relative hidden lg:block">
            <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
              <Image
                src="/hero.webp"
                alt="Mayank — Software Engineer"
                fill
                priority
                className="object-cover object-top"
                sizes="50vw"
              />
              {/* Fade into background on right edge */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-background" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
              {/* Floating status badge */}
              <div className="absolute bottom-10 left-8 flex items-center gap-2 rounded-full border border-primary/30 bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur-md">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                Open to Internships &amp; Freelance
              </div>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:py-28">

            {/* Mobile badge */}
            <div ref={subRef} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary lg:hidden">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              Open to Internships &amp; Freelance
            </div>

            {/* Giant editorial name */}
            <h1 ref={titleRef} className="font-extrabold leading-[0.9] tracking-tighter text-foreground" style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)" }}>
              MAYANK
              <br />
              <span className="text-primary">SINGH</span>
            </h1>

            <p className="mt-5 text-base font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Software Engineer &nbsp;·&nbsp; MERN Stack
            </p>

            {/* Mobile photo */}
            <div className="my-8 block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:hidden">
              <Image src="/hero.webp" alt="Mayank" width={600} height={450} className="h-full w-full object-cover object-top" priority />
            </div>

            <p ref={descRef} className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              I build <strong className="font-semibold text-foreground">production-grade web apps</strong> with
              React, Node.js &amp; MongoDB. Based in Lucknow, India.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <button onClick={() => scrollTo("projects")} className="btn-chai btn-magnetic inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25">
                  View my work <ArrowRight className="size-4" />
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href="https://drive.google.com/file/d/1HH8bHTrCKS_YGufdW8zs5rgTZcf6xIp8/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-chai inline-flex items-center gap-2 border border-border bg-card px-7 py-3.5 font-semibold text-foreground/80 hover:border-primary/50 hover:text-primary">
                  <Download className="size-4" /> Resume
                </a>
              </motion.div>
            </div>

            <div ref={socialRef} className="mt-8 flex flex-wrap items-center gap-2">
              {SOCIALS.map(({ href, label, path }) => (
                <motion.a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }} className="grid size-10 place-items-center rounded-xl border border-border/60 bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden><path d={path} /></svg>
                </motion.a>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 border-l-2 border-primary/30 pl-3">
                  <span className="text-2xl font-extrabold text-primary">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>





      {/* ════════ SKILLS ════════ */}
      <SkillsSection />



      {/* ════════ PROJECTS ════════ */}
      <ProjectsSection />


      {/* ════════════════════════════════════════════════
          CERTIFICATIONS STRIP
      ════════════════════════════════════════════════ */}
      <Section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div variants={fadeUp(0)} className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Certifications</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Proof of learning
              </h2>
            </div>
            <Link
              href="/certifications"
              className="btn-chai hidden items-center gap-2 border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-foreground/80 hover:border-primary/50 hover:text-primary md:inline-flex"
            >
              All {certificates.length} certs
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.slice(0, 3).map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp(i * 0.1)}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
              >
                <div className="grid size-10 flex-shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Award className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground transition-colors group-hover:text-primary text-sm">
                    {cert.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════
          CONTACT CTA — ChaiCode style dark block
      ════════════════════════════════════════════════ */}
      <Section id="contact" className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10">
          <motion.p variants={fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Let&apos;s Connect
          </motion.p>
          <motion.h2 variants={fadeUp(0.08)} className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Ready to build something?
          </motion.h2>
          <motion.p variants={fadeUp(0.14)} className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            I&apos;m actively looking for internships and freelance projects.
            If you have an idea, let&apos;s make it happen.
          </motion.p>
          <motion.div variants={fadeUp(0.2)} className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="btn-chai btn-magnetic inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-bold text-primary-foreground text-lg shadow-xl shadow-primary/30"
              >
                <Mail className="size-5" />
                Get in touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://github.com/coderMayank69"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chai inline-flex items-center gap-2 border border-border/70 bg-card px-7 py-3.5 font-semibold text-foreground/80 text-lg hover:border-primary/50 hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
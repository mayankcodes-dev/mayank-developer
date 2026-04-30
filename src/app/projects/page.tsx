import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SiteNav from "@/components/layout/site-nav";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of Mayank's projects — full-stack web apps, AI tools, and SaaS products built with Next.js, TypeScript, and modern tooling.",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-24">
          <Badge variant="outline" className="mb-5">My work</Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Things I've built
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            From AI-powered SaaS platforms to developer tools — here's a curated selection
            of projects I've shipped, each with real users and real code.
          </p>
        </section>

        {/* Featured projects */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <p className="mb-10 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Featured work
            </p>
            <div className="space-y-14">
              {featured.map((project, idx) => (
                <article
                  key={project.id}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${idx % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  {/* Image placeholder / real image */}
                  <div className="aspect-video overflow-hidden rounded-2xl border border-border/60 bg-muted">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      {project.link && (
                        <Button asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Live demo <ArrowUpRight className="size-4" />
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-4" /> GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Other projects */}
        {others.length > 0 && (
          <section className="border-t border-border/60">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Other projects
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((project) => (
                  <article
                    key={project.id}
                    className="rounded-2xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          Live <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="size-3.5" /> GitHub
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Have a project in mind?</h2>
            <p className="mt-3 text-muted-foreground">
              I'm available for freelance projects and contract work.
            </p>
            <Button className="mt-7" size="lg" asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </section>

      </main>
    </>
  );
}

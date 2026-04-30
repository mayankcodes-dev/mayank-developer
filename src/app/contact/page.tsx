"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ExternalLink, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SiteNav from "@/components/layout/site-nav";

type FormState = "idle" | "sending" | "success" | "error";

const socials = [
  {
    label: "Email",
    value: "codermayank69@gmail.com",
    href: "mailto:codermayank69@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/coderMayank69",
    href: "https://github.com/coderMayank69",
    icon: ExternalLink,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/codermayank69",
    href: "https://linkedin.com/in/codermayank69",
    icon: ExternalLink,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-10 pt-16 md:pt-24">
          <Badge variant="outline" className="mb-5">Contact</Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Let's build something great.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Have a project in mind, want to hire me, or just want to say hi?
            Fill out the form and I'll get back to you within 24 hours.
          </p>
        </section>

        {/* Form + socials */}
        <section className="border-t border-border/60">
          <div className="mx-auto grid max-w-4xl gap-12 px-6 py-14 lg:grid-cols-[1fr_280px]">

            {/* Contact form */}
            <div>
              {formState === "success" ? (
                <div className="flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card p-8">
                  <CheckCircle className="size-10 text-primary" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">Message sent!</p>
                    <p className="mt-1 text-muted-foreground">
                      Thanks for reaching out. I'll reply to{" "}
                      <span className="font-medium text-foreground">{formData.email || "your email"}</span>{" "}
                      within 24 hours.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setFormState("idle")}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Riya Sharma"
                        required
                        disabled={formState === "sending"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="riya@startup.com"
                        required
                        disabled={formState === "sending"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Mayank, I have a project I'd like to discuss..."
                      rows={6}
                      required
                      disabled={formState === "sending"}
                      className="resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      <AlertCircle className="size-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={formState === "sending"}
                    className="gap-2"
                  >
                    {formState === "sending" ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar socials */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Other ways to reach me
                </p>
                <div className="mt-5 space-y-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border/60 bg-muted/50 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                        <s.icon className="size-4" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{s.label}</p>
                        <p className="text-xs">{s.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Response time</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  I typically reply within <strong className="text-foreground">24 hours</strong>.
                  For urgent freelance inquiries, email is fastest.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Currently open to</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {["Freelance projects", "Contract work", "Collaborations"].map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}

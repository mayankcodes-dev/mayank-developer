export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "paypilot",
    title: "PayPilot — Invoice Copilot",
    description: "Autonomous invoice management platform with AI-powered payment tracking and Razorpay integration.",
    longDescription:
      "PayPilot is a full-stack invoice copilot built to automate the invoicing workflow for freelancers and small businesses. It features real-time payment status tracking via Razorpay webhooks, a MongoDB-backed invoice ledger, JWT-authenticated API, and a clean Next.js 15 dashboard. Built end-to-end in a CodeBlitz sprint.",
    image: "/images/paypilot.webp",
    technologies: ["Next.js 15", "TypeScript", "MongoDB", "Razorpay", "Node.js", "Express", "JWT"],
    link: "https://v0-invoice-copilot-zeta.vercel.app",
    github: "https://github.com/coderMayank69",
    featured: true,
  },
  {
    id: "agenthub",
    title: "AgentHub AI — Voice Infrastructure",
    description: "High-conversion landing page for an autonomous voice AI agent platform targeting enterprise clients.",
    longDescription:
      "AgentHub AI is a production-ready landing page for an autonomous voice infrastructure product. Built with Next.js 15 and TypeScript with a FastAPI lead-management backend, it features a dark glassmorphism design, animated hero, feature showcase, and a working contact/waitlist API. Deployed on Vercel with full mobile responsiveness.",
    image: "/images/agenthub.webp",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "Vercel"],
    github: "https://github.com/coderMayank69",
    featured: true,
  },
  {
    id: "portfolio",
    title: "Developer Portfolio — This Site",
    description: "Personal portfolio built with Next.js 16, React 19, GSAP animations, and a dual-accent design system.",
    longDescription:
      "This very site. A premium, SEO-optimised developer portfolio built with Next.js 16 App Router, React 19, Tailwind CSS v4, and GSAP for timeline animations. Features a dual-theme system (warm Indigo light + Electric Lime dark), Hashnode blog integration via GraphQL, a terminal-style page loader, and a contact form powered by Resend.",
    image: "/images/portfolio.webp",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "Resend"],
    link: "https://mayank-developer.vercel.app",
    github: "https://github.com/coderMayank69/mayank-developer",
    featured: false,
  },
];

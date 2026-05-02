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
  isPinned: boolean;
  type: "personal" | "freelance";
}

export const projects: Project[] = [
  /* ── FREELANCE ── */
  {
    id: "paypilot",
    title: "PayPilot — Invoice Copilot",
    description: "Autonomous invoice management platform with AI-powered payment tracking and Razorpay integration.",
    longDescription: "PayPilot automates invoicing for freelancers. Razorpay webhooks, JWT auth, MongoDB ledger, Next.js 15 dashboard.",
    image: "/images/paypilot.webp",
    technologies: ["Next.js 15", "TypeScript", "MongoDB", "Razorpay", "Node.js", "Express", "JWT"],
    link: "https://v0-invoice-copilot-zeta.vercel.app",
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: true,
    type: "freelance",
  },
  {
    id: "agenthub",
    title: "AgentHub AI — Voice Infrastructure",
    description: "High-conversion landing page for an autonomous voice AI agent platform targeting enterprise clients.",
    longDescription: "Landing page for autonomous voice AI with Next.js 15, FastAPI lead backend, dark glassmorphism design.",
    image: "/images/agenthub.webp",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "Vercel"],
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: true,
    type: "freelance",
  },

  /* ── PERSONAL ── */
  {
    id: "yelp",
    title: "YelpCamp",
    description: "Full-stack campground review platform with authentication, RESTful APIs, image uploads, and Mapbox maps.",
    longDescription: "Built as part of The Web Developer Bootcamp. Passport.js auth, Cloudinary image uploads, Mapbox maps, full CRUD with EJS.",
    image: "/images/yelp.webp",
    technologies: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: true,
    type: "personal",
  },
  {
    id: "quickstay",
    title: "QuickStay",
    description: "Full-stack hotel booking system with JWT authentication, room search, and booking management.",
    longDescription: "Hotel booking app with React frontend, Node/Express backend, JWT auth, MongoDB, room filtering and availability.",
    image: "/images/quickstay.webp",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/coderMayank69",
    featured: true,
    isPinned: false,
    type: "personal",
  },
  {
    id: "portfolio",
    title: "Developer Portfolio",
    description: "This very site — Next.js 16, GSAP animations, ChaiCode-inspired design system, Hashnode blog integration.",
    longDescription: "Premium SEO-optimised portfolio with Next.js 16, React 19, Tailwind CSS v4, GSAP, Hashnode GraphQL, Resend contact.",
    image: "/images/portfolio.webp",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "Resend"],
    link: "https://mayank-developer.vercel.app",
    github: "https://github.com/coderMayank69/mayank-developer",
    featured: false,
    isPinned: false,
    type: "personal",
  },
];

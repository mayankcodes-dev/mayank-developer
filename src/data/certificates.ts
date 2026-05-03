export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string; // logo URL
  date: string;
  category: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

// Official issuer logos
const LOGOS = {
  linkedin:    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  mongodb:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  google:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  deeplearning:"https://avatars.githubusercontent.com/u/25246927?s=200&v=4",
  udemy:       "https://cdn.worldvectorlogo.com/logos/udemy-wordmark-1.svg",
};

export const certificates: Certificate[] = [
  {
    id: "nodejs-essential",
    title: "Node.js Essential Training",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "Backend",
    skills: ["Node.js"],
    credentialUrl: "https://www.linkedin.com/learning/",
  },
  {
    id: "github-copilot",
    title: "AI Pair Programming with GitHub Copilot",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "AI",
    skills: ["GitHub Copilot"],
    credentialUrl: "https://www.linkedin.com/learning/",
  },
  {
    id: "mongodb-schema",
    title: "MongoDB Schema Design Patterns & Anti-patterns",
    issuer: "MongoDB",
    issuerLogo: LOGOS.mongodb,
    date: "Apr 2026",
    category: "Database",
    credentialId: "2330876b-7781-4234-a8ea-7190a71e13af",
    skills: ["Data Modeling", "MongoDB"],
    credentialUrl: "https://learn.mongodb.com/c/2330876b-7781-4234-a8ea-7190a71e13af",
  },
  {
    id: "learning-docker",
    title: "Learning Docker",
    issuer: "LinkedIn Learning",
    issuerLogo: LOGOS.linkedin,
    date: "Apr 2026",
    category: "DevOps",
    credentialId: "5967bf9f12ce6087eb1b68bbe673c9275ed5948deb823f0f48d597ffcb9f3c03",
    skills: ["Docker"],
    credentialUrl: "https://www.linkedin.com/learning/",
  },
  {
    id: "prompts-google",
    title: "Start Writing Prompts like a Pro",
    issuer: "Google",
    issuerLogo: LOGOS.google,
    date: "Jan 2026",
    category: "AI",
    credentialId: "TW19XRAXTHCN",
    skills: ["Multimodal Prompting", "AI"],
    credentialUrl: "https://grow.google/certificates/",
  },
  {
    id: "ai-for-everyone",
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    issuerLogo: LOGOS.deeplearning,
    date: "Dec 2025",
    category: "AI",
    credentialId: "CG3UPVSTEL2M",
    skills: ["Artificial Intelligence"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/CG3UPVSTEL2M",
  },
  {
    id: "fullstack-udemy",
    title: "Full Stack Web Developer",
    issuer: "Udemy",
    issuerLogo: LOGOS.udemy,
    date: "Oct 2025",
    category: "Full Stack",
    skills: ["Bootstrap", "DOM", "React", "Node.js", "Express", "MongoDB", "JavaScript"],
    credentialUrl: "https://udemy.com",
  },
];

export const certCategories = [
  "All",
  "Full Stack",
  "Backend",
  "Database",
  "DevOps",
  "AI",
];

export interface Skill {
  name: string;
  level: number; // 1-5
  logo: string;  // devicon CDN URL
  color: string; // brand hex
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React",        level: 5, logo: `${DEVICON}/react/react-original.svg`,          color: "#61DAFB" },
      { name: "Next.js",      level: 5, logo: `${DEVICON}/nextjs/nextjs-original.svg`,        color: "#ffffff" },
      { name: "TypeScript",   level: 4, logo: `${DEVICON}/typescript/typescript-original.svg`, color: "#3178C6" },
      { name: "JavaScript",   level: 5, logo: `${DEVICON}/javascript/javascript-original.svg`, color: "#F7DF1E" },
      { name: "Tailwind CSS", level: 5, logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, color: "#06B6D4" },
      { name: "HTML5",        level: 5, logo: `${DEVICON}/html5/html5-original.svg`,           color: "#E34F26" },
      { name: "CSS3",         level: 5, logo: `${DEVICON}/css3/css3-original.svg`,             color: "#1572B6" },
      { name: "GSAP",         level: 4, logo: `${DEVICON}/gsap/gsap-original.svg`,             color: "#88CE02" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js",    level: 4, logo: `${DEVICON}/nodejs/nodejs-original.svg`,    color: "#339933" },
      { name: "Express.js", level: 4, logo: `${DEVICON}/express/express-original.svg`, color: "#ffffff" },
      { name: "Python",     level: 3, logo: `${DEVICON}/python/python-original.svg`,   color: "#3776AB" },
      { name: "FastAPI",    level: 3, logo: `${DEVICON}/fastapi/fastapi-original.svg`, color: "#009688" },
      { name: "REST API",   level: 5, logo: `${DEVICON}/nodejs/nodejs-original.svg`,   color: "#339933" },
      { name: "JWT",        level: 4, logo: `${DEVICON}/nodejs/nodejs-original.svg`,   color: "#f97316" },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MongoDB",     level: 4, logo: `${DEVICON}/mongodb/mongodb-original.svg`,      color: "#47A248" },
      { name: "PostgreSQL",  level: 3, logo: `${DEVICON}/postgresql/postgresql-original.svg`, color: "#4169E1" },
      { name: "Mongoose",    level: 4, logo: `${DEVICON}/mongodb/mongodb-original.svg`,      color: "#880000" },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "🛠️",
    skills: [
      { name: "Git",       level: 5, logo: `${DEVICON}/git/git-original.svg`,       color: "#F05032" },
      { name: "GitHub",    level: 5, logo: `${DEVICON}/github/github-original.svg`, color: "#ffffff" },
      { name: "VS Code",   level: 5, logo: `${DEVICON}/vscode/vscode-original.svg`, color: "#007ACC" },
      { name: "Vercel",    level: 4, logo: `${DEVICON}/vercel/vercel-original.svg`, color: "#ffffff" },
      { name: "Postman",   level: 4, logo: `${DEVICON}/postman/postman-original.svg`, color: "#FF6C37" },
      { name: "Linux",     level: 3, logo: `${DEVICON}/linux/linux-original.svg`,   color: "#FCC624" },
    ],
  },
];

export const LEVEL_LABELS = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];

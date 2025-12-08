import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "other";
  color: "pink" | "cyan" | "lime";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "web" | "mobile" | "ai" | "other";
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const skills: Skill[] = [
  { name: "React", level: 95, category: "frontend", color: "cyan" },
  { name: "TypeScript", level: 90, category: "frontend", color: "cyan" },
  { name: "Next.js", level: 88, category: "frontend", color: "pink" },
  { name: "Three.js", level: 75, category: "frontend", color: "lime" },
  { name: "Node.js", level: 85, category: "backend", color: "lime" },
  { name: "Python", level: 80, category: "backend", color: "cyan" },
  { name: "PostgreSQL", level: 78, category: "backend", color: "pink" },
  { name: "Docker", level: 72, category: "tools", color: "cyan" },
  { name: "AWS", level: 70, category: "tools", color: "lime" },
  { name: "Git", level: 92, category: "tools", color: "pink" },
  { name: "Figma", level: 68, category: "tools", color: "cyan" },
  { name: "GraphQL", level: 75, category: "backend", color: "lime" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp Innovation",
    role: "Senior Frontend Developer",
    duration: "2022 - Present",
    description: "Leading frontend architecture for enterprise SaaS platform. Built component library used across 5 product teams. Reduced bundle size by 40% through code splitting and lazy loading.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind"],
  },
  {
    id: "2",
    company: "StartupX Labs",
    role: "Full Stack Developer",
    duration: "2020 - 2022",
    description: "Developed real-time collaboration features for project management tool. Implemented WebSocket-based live updates and offline-first architecture.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "3",
    company: "Digital Agency Co",
    role: "Frontend Developer",
    duration: "2018 - 2020",
    description: "Created interactive web experiences for Fortune 500 clients. Specialized in animation and 3D web graphics using Three.js and WebGL.",
    technologies: ["JavaScript", "Three.js", "GSAP", "WebGL", "CSS"],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "M.S. Computer Science",
    duration: "2016 - 2018",
    description: "Specialized in Human-Computer Interaction and Computer Graphics. Thesis on real-time 3D rendering optimization.",
  },
  {
    id: "2",
    institution: "State University",
    degree: "B.S. Software Engineering",
    duration: "2012 - 2016",
    description: "Graduated with honors. Focus on web technologies and distributed systems.",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "NeonFlow Dashboard",
    description: "Real-time analytics dashboard with 3D data visualizations",
    longDescription: "A cutting-edge analytics platform featuring real-time data streaming, interactive 3D charts built with Three.js, and a dark-themed UI designed for data analysts who work in low-light environments.",
    technologies: ["React", "Three.js", "D3.js", "WebSocket", "Node.js"],
    category: "web",
    imageUrl: "/placeholder-project-1.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "SynthWave Audio",
    description: "Web-based synthesizer with visual audio feedback",
    longDescription: "A browser-based digital audio workstation with real-time waveform visualization, MIDI support, and a retrowave-inspired interface. Features include oscillators, filters, and effects chains.",
    technologies: ["TypeScript", "Web Audio API", "Canvas", "React"],
    category: "web",
    imageUrl: "/placeholder-project-2.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "CryptoTracker AI",
    description: "ML-powered cryptocurrency portfolio manager",
    longDescription: "An intelligent portfolio management tool that uses machine learning to analyze market trends and suggest optimal trading strategies. Features include price predictions, risk assessment, and automated alerts.",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    category: "ai",
    imageUrl: "/placeholder-project-3.png",
    githubUrl: "https://github.com",
    featured: true,
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
];

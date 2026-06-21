export interface SkillItem {
  name: string;
  level: number; // 0-100, used for the proficiency indicator
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: SkillItem[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  period: string;
  status: "active" | "complete";
  summary: string;
  highlights: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  category: "devops" | "security" | "cloud" | "ai";
  description: string;
  tools: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface TestimonialEntry {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export interface BlogPostEntry {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  tag: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

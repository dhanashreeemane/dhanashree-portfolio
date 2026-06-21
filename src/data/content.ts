import type {
  ExperienceEntry,
  ProjectEntry,
  CertificationEntry,
  EducationEntry,
  TestimonialEntry,
  BlogPostEntry,
  NavLink,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "Cybersecurity & DevOps Professional",
    org: "Infrastructure & Security Operations", // TODO: replace with employer name if applicable
    period: "Present",
    status: "active",
    summary:
      "Operating across the DevOps and security boundary — building automated delivery pipelines while keeping infrastructure observable and defensible.",
    highlights: [
      "Infrastructure Automation",
      "Cloud Security",
      "CI/CD Implementation",
      "Monitoring & Observability",
      "Incident Response",
      "Security Operations",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: "proj-devsecops-pipeline",
    title: "Enterprise DevSecOps CI/CD Pipeline",
    category: "devops",
    description:
      "Implemented an end-to-end automated CI/CD pipeline with code quality scanning, container security scanning, automated deployments, monitoring, and observability built in at every stage.",
    tools: [
      "GitHub",
      "Jenkins",
      "Maven",
      "SonarQube",
      "Trivy",
      "Docker",
      "Nexus",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
    featured: true,
  },
  {
    id: "proj-security-monitoring",
    title: "Enterprise Security Monitoring & Incident Response Framework",
    category: "security",
    description:
      "Built centralized security monitoring, log analysis, threat detection, alerting, and incident response automation across a Linux/AWS environment.",
    tools: ["Wazuh", "ELK Stack", "Linux", "AWS"],
    featured: true,
  },
  {
    id: "proj-face-recognition",
    title: "Partially Occluded Face Recognition System",
    category: "ai",
    description:
      "Developed an AI-based face recognition system capable of identifying partially covered faces using computer vision and deep learning.",
    tools: ["Python", "OpenCV", "MediaPipe", "Deep Learning", "Django"],
  },
  {
    id: "proj-cloud-iac",
    title: "AWS Cloud Infrastructure Automation",
    category: "cloud",
    description:
      "Automated provisioning and management of cloud infrastructure using Infrastructure as Code practices for repeatable, auditable environments.",
    tools: ["AWS", "Terraform", "Ansible", "Linux"],
  },
];

export const certifications: CertificationEntry[] = [
  { id: "cert-cdac", title: "C-DAC PG-DITISS", issuer: "C-DAC", year: "" }, // TODO: add year
  { id: "cert-aws", title: "AWS Cloud Training", issuer: "AWS", year: "" }, // TODO: add issuing body / year
  { id: "cert-linux", title: "Linux Administration", issuer: "", year: "" },
  { id: "cert-security", title: "Cybersecurity & Network Security", issuer: "", year: "" },
  { id: "cert-devops", title: "DevOps Tools & Automation", issuer: "", year: "" },
];

export const education: EducationEntry[] = [
  {
    id: "edu-cdac",
    degree: "PG-DITISS — Post Graduate Diploma in IT Infrastructure, Systems and Security",
    institution: "C-DAC", // TODO: add campus / city if needed
    period: "", // TODO: add years
  },
  {
    id: "edu-be",
    degree: "Bachelor of Engineering — Information Technology",
    institution: "", // TODO: add institution name
    period: "", // TODO: add years
  },
];

export const achievements: string[] = [
  "Built complete DevSecOps CI/CD pipelines",
  "Implemented enterprise security monitoring solutions",
  "Designed cloud-native infrastructure",
  "Automated deployments using Infrastructure as Code",
  "Hands-on experience in cybersecurity operations",
];

// TODO: replace with real testimonials, or remove the section if none yet
export const testimonials: TestimonialEntry[] = [
  {
    id: "t1",
    quote:
      "Add a short quote here from a manager, mentor, or collaborator about working with you.",
    name: "Reviewer Name",
    role: "Role, Organization",
  },
  {
    id: "t2",
    quote:
      "A second testimonial helps establish credibility — swap this placeholder for a real one.",
    name: "Reviewer Name",
    role: "Role, Organization",
  },
];

// TODO: connect to a real CMS/MDX source — these are placeholder entries
export const blogPosts: BlogPostEntry[] = [
  {
    id: "post-1",
    title: "Hardening a CI/CD Pipeline: From Commit to Container Scan",
    excerpt:
      "A walkthrough of the security gates I added to a Jenkins pipeline — SAST, SCA, and image scanning before anything ships.",
    date: "TODO: add date",
    readMins: 6,
    tag: "DevSecOps",
    href: "#", // TODO: link to real post
  },
  {
    id: "post-2",
    title: "Centralizing Logs with Wazuh + ELK for Faster Incident Response",
    excerpt:
      "How a centralized SIEM setup cut mean time to detection on a small infrastructure footprint.",
    date: "TODO: add date",
    readMins: 8,
    tag: "Security",
    href: "#",
  },
  {
    id: "post-3",
    title: "Terraform Modules I Reuse on Every AWS Project",
    excerpt:
      "The IaC building blocks — VPC, IAM boundary, and observability stack — that save the most setup time.",
    date: "TODO: add date",
    readMins: 5,
    tag: "Cloud",
    href: "#",
  },
];

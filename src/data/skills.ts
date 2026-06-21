import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "devops",
    title: "DevOps",
    description: "CI/CD pipelines, build automation, code quality gates.",
    items: [
      { name: "Jenkins", level: 90 },
      { name: "GitHub Actions", level: 88 },
      { name: "Git", level: 92 },
      { name: "Maven", level: 80 },
      { name: "Nexus", level: 78 },
      { name: "SonarQube", level: 82 },
      { name: "Trivy", level: 80 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    description: "AWS infrastructure design, identity, and networking.",
    items: [
      { name: "AWS EC2", level: 88 },
      { name: "AWS S3", level: 86 },
      { name: "IAM", level: 84 },
      { name: "VPC", level: 82 },
      { name: "Route 53", level: 78 },
      { name: "CloudWatch", level: 80 },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    description: "Packaging and running workloads at scale.",
    items: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 85 },
      { name: "Helm", level: 78 },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    description: "Declarative, repeatable infrastructure provisioning.",
    items: [
      { name: "Terraform", level: 86 },
      { name: "Ansible", level: 84 },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Administration across server environments.",
    items: [
      { name: "Linux", level: 92 },
      { name: "Windows Server", level: 75 },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    description: "Observability, metrics, and alerting.",
    items: [
      { name: "Prometheus", level: 84 },
      { name: "Grafana", level: 86 },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Threat detection, monitoring, and response.",
    items: [
      { name: "Wazuh", level: 85 },
      { name: "Splunk", level: 78 },
      { name: "SIEM", level: 82 },
      { name: "IDS/IPS", level: 80 },
      { name: "Incident Response", level: 84 },
      { name: "Vulnerability Assessment", level: 80 },
      { name: "Security Monitoring", level: 86 },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    description: "Core protocols and perimeter security.",
    items: [
      { name: "TCP/IP", level: 88 },
      { name: "DNS", level: 84 },
      { name: "DHCP", level: 82 },
      { name: "Routing", level: 80 },
      { name: "VLAN", level: 78 },
      { name: "VPN", level: 80 },
      { name: "Firewall", level: 82 },
    ],
  },
];

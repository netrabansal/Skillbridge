import { frameworks, type PhaseName, type QuizQuestion, type Skill, type SkillCategory } from "./skills";

export type { PhaseName, QuizQuestion, Skill, SkillCategory } from "./skills";

export type RoleCategory = "Web" | "Data & AI" | "Infrastructure" | "Security";

export type RoleIcon = "frontend" | "backend" | "fullstack" | "data" | "ai" | "devops" | "security" | "cloud";

export type RolePhase = { name: PhaseName; categories: SkillCategory[] };

export type Role = {
  slug: string;
  title: string;
  category: RoleCategory;
  icon: RoleIcon;
  /** One line for cards and search results. */
  summary: string;
  /** Short paragraph for the role detail page. */
  description: string;
  /** What someone in this role does day to day. */
  responsibilities: string[];
  /** Skill categories in the order they're usually learned (from ./skills). */
  categories: SkillCategory[];
  /** Optional knowledge check (from ./skills). */
  quiz: QuizQuestion[];
  /** The three skills shown on cards. */
  highlights: string[];
  /** Honest note on the usual starting point. */
  startingPoint: string;
  /** Rough hours of focused learning to reach entry level from scratch. Used for estimates only. */
  typicalHours: number;
  /** Extra search terms: alternate titles, tools and abbreviations. */
  aliases: string[];
};

const baseRoles: Omit<Role, "categories" | "quiz">[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "Web",
    icon: "frontend",
    summary: "Build the fast, accessible interfaces people see and use in the browser.",
    description:
      "Frontend developers turn designs into working interfaces. They care about how a product looks, feels and performs on every screen, and they work closely with designers and backend engineers.",
    responsibilities: [
      "Build responsive pages and reusable UI components",
      "Connect interfaces to APIs and manage application state",
      "Make products accessible, fast and consistent across devices",
      "Review code and write tests for user-facing features",
    ],
    highlights: ["JavaScript", "React", "Accessibility"],
    startingPoint: "Beginner-friendly",
    typicalHours: 500,
    aliases: ["front end", "front-end", "ui developer", "web developer", "react developer", "javascript developer", "vue", "angular", "html", "css"],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    category: "Web",
    icon: "backend",
    summary: "Design the APIs, databases and services that power applications behind the scenes.",
    description:
      "Backend developers build the logic, data storage and integrations that applications depend on. They focus on reliability, security and performance, so that every request is handled correctly at scale.",
    responsibilities: [
      "Design and build APIs used by web and mobile apps",
      "Model data and write efficient database queries",
      "Handle authentication, permissions and security",
      "Monitor, debug and scale services in production",
    ],
    highlights: ["APIs", "SQL", "Security"],
    startingPoint: "Beginner-friendly",
    typicalHours: 600,
    aliases: ["back end", "back-end", "api developer", "server", "node", "nodejs", "java developer", "python developer", "golang", "go developer", "django", "spring"],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Web",
    icon: "fullstack",
    summary: "Ship complete features end to end, from the interface down to the database.",
    description:
      "Full stack developers are comfortable on both sides of an application. They can take a feature from idea to production, which makes them especially valuable in startups and small product teams.",
    responsibilities: [
      "Build features across the interface, API and database",
      "Make pragmatic technical decisions across the stack",
      "Deploy and maintain applications in the cloud",
      "Collaborate with design and product on what to build",
    ],
    highlights: ["React", "Node.js", "Databases"],
    startingPoint: "Beginner-friendly",
    typicalHours: 800,
    aliases: ["full-stack", "fullstack", "mern", "software engineer", "software developer", "web developer", "next.js", "nextjs"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    icon: "data",
    summary: "Turn messy data into insights, predictions and better business decisions.",
    description:
      "Data scientists combine statistics, programming and business sense to answer questions with data. They clean and explore datasets, build models, and explain what the results mean to the people making decisions.",
    responsibilities: [
      "Clean, explore and visualize large datasets",
      "Design experiments and measure their impact",
      "Build and evaluate predictive models",
      "Communicate findings clearly to non-technical teams",
    ],
    highlights: ["Python", "Statistics", "Machine learning"],
    startingPoint: "Math background helps",
    typicalHours: 800,
    aliases: ["data science", "data analyst", "analytics", "statistics", "pandas", "jupyter", "r programming", "a/b testing"],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    category: "Data & AI",
    icon: "ai",
    summary: "Build, train and deploy machine learning and AI systems that run in real products.",
    description:
      "AI/ML engineers take models from experiment to production. They work with large datasets, modern deep learning frameworks and large language models, and make sure AI features are reliable, measurable and cost-effective.",
    responsibilities: [
      "Train, fine-tune and evaluate machine learning models",
      "Build applications on top of large language models",
      "Create data pipelines and deploy models to production",
      "Monitor model quality, cost and latency over time",
    ],
    highlights: ["PyTorch", "LLMs", "MLOps"],
    startingPoint: "Builds on programming & math",
    typicalHours: 1000,
    aliases: ["ai engineer", "ml engineer", "machine learning", "deep learning", "llm", "genai", "generative ai", "nlp", "computer vision", "tensorflow", "pytorch", "rag"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    icon: "devops",
    summary: "Automate how software is built, tested and shipped, and keep it running reliably.",
    description:
      "DevOps engineers build the pipelines and platforms that let teams ship quickly and safely. They automate infrastructure, improve reliability and give developers the tools to deploy with confidence.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Manage infrastructure as code",
      "Run containers and orchestrate them with Kubernetes",
      "Set up monitoring, alerting and incident response",
    ],
    highlights: ["CI/CD", "Docker", "Kubernetes"],
    startingPoint: "Builds on Linux & scripting",
    typicalHours: 700,
    aliases: ["sre", "site reliability", "platform engineer", "kubernetes", "k8s", "ci/cd", "docker", "terraform", "jenkins", "github actions"],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    icon: "security",
    summary: "Detect, investigate and respond to threats before they become breaches.",
    description:
      "Cybersecurity analysts protect an organization's systems and data. They monitor for suspicious activity, investigate incidents, and help teams fix vulnerabilities before attackers can exploit them.",
    responsibilities: [
      "Monitor security alerts and investigate suspicious activity",
      "Respond to and document security incidents",
      "Find and prioritize vulnerabilities across systems",
      "Help teams follow security policies and best practices",
    ],
    highlights: ["Networking", "SIEM", "Incident response"],
    startingPoint: "Beginner-friendly",
    typicalHours: 600,
    aliases: ["security", "cyber security", "infosec", "information security", "soc analyst", "security analyst", "blue team", "siem", "network security"],
  },
  {
    slug: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Infrastructure",
    icon: "cloud",
    summary: "Design and run secure, scalable infrastructure on AWS, Azure or Google Cloud.",
    description:
      "Cloud engineers design, build and operate the infrastructure applications run on. They balance scalability, security and cost, and increasingly manage everything as code.",
    responsibilities: [
      "Design and deploy cloud infrastructure",
      "Configure networking, identity and access",
      "Automate provisioning with infrastructure as code",
      "Optimize reliability, security and cloud costs",
    ],
    highlights: ["AWS / Azure / GCP", "Terraform", "Networking"],
    startingPoint: "Builds on IT basics",
    typicalHours: 550,
    aliases: ["aws", "azure", "gcp", "google cloud", "cloud architect", "solutions architect", "cloud computing", "infrastructure"],
  },
];

export const roles: Role[] = baseRoles.map((r) => ({ ...r, ...frameworks[r.slug] }));

export const roleCategories: RoleCategory[] = ["Web", "Data & AI", "Infrastructure", "Security"];

export function getRole(slug: string | undefined | null): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

export function roleSkills(role: Role): Skill[] {
  return role.categories.flatMap((c) => c.skills);
}

export function roleSkillCount(role: Role) {
  return roleSkills(role).length;
}

/** Groups a role's categories by learning phase, keeping their order. */
export function rolePhases(role: Role): RolePhase[] {
  const phases: RolePhase[] = [];
  for (const category of role.categories) {
    const last = phases.at(-1);
    if (last?.name === category.phase) last.categories.push(category);
    else phases.push({ name: category.phase, categories: [category] });
  }
  return phases;
}

export type RoleMatch = { role: Role; via?: string };

/**
 * Matches a free-text query against role titles, aliases and skills.
 * Title matches rank first; `via` explains non-obvious matches (e.g. "kubernetes" → DevOps Engineer).
 */
export function searchRoles(query: string): RoleMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return roles.map((role) => ({ role }));

  const scored: { match: RoleMatch; score: number }[] = [];
  for (const role of roles) {
    const title = role.title.toLowerCase();
    if (title.startsWith(q)) {
      scored.push({ match: { role }, score: 0 });
      continue;
    }
    if (title.includes(q)) {
      scored.push({ match: { role }, score: 1 });
      continue;
    }
    const alias = role.aliases.find((a) => a.includes(q) || (q.length > 3 && q.includes(a)));
    if (alias) {
      scored.push({ match: { role, via: alias }, score: 2 });
      continue;
    }
    const skill = roleSkills(role).find((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    if (skill) scored.push({ match: { role, via: skill.name }, score: 3 });
  }
  return scored.sort((a, b) => a.score - b.score).map((s) => s.match);
}

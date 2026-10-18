export type Profile = {
  isPlaceholder: boolean;
  name: string;
  role: string;
  headline: [string, string];
  introduction: string;
  about: string[];
  focusAreas: string[];
  principles: { title: string; description: string }[];
  skillGroups: { name: string; items: string[] }[];
  research?: {
    title: string;
    venue: string;
    authorship: string;
    citation: string;
  }[];
  location?: string;
  availability?: string;
  siteUrl?: string;
  seo: { title: string; description: string; allowIndexing: boolean };
};

export type Project = {
  id: string;
  isPlaceholder: boolean;
  name: string;
  category: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  details: string;
  cover?: { src: string; alt: string; kind?: "illustration" | "screenshot" };
  screenshots?: { src: string; alt: string }[];
  relatedDemos?: { label: string; href: string; source: string }[];
  github?: string;
  demo?: string;
  year?: string;
  size: "wide" | "standard";
  accent: "blue" | "violet" | "mint" | "silver";
  technologyIds: string[];
};

export type Experience = {
  id: string;
  isPlaceholder: boolean;
  type: "work" | "education" | "opensource" | "milestone";
  period: string;
  organization: string;
  role: string;
  description: string;
  contributions: string[];
  links?: { label: string; href: string }[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "external";
};

export type Socials = {
  email?: string;
  resume?: string;
  links: SocialLink[];
};

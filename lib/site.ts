import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { externalHref } from "@/lib/links";

// Hosting injects the actual public URL at build time; local and Sites builds
// continue to use the verified origin in the editable content file.
export const siteUrl =
  externalHref(process.env.PORTFOLIO_SITE_URL) ?? externalHref(profile.siteUrl);
export const isDraft =
  profile.isPlaceholder ||
  projects.some((p) => p.isPlaceholder) ||
  experience.some((e) => e.isPlaceholder);

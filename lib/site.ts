import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
export const isDraft =
  profile.isPlaceholder ||
  projects.some((p) => p.isPlaceholder) ||
  experience.some((e) => e.isPlaceholder);

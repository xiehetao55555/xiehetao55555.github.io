import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { externalHref } from "@/lib/links";
import { isDraft } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = externalHref(profile.siteUrl);
  return !isDraft && profile.seo.allowIndexing && url
    ? [{ url, changeFrequency: "monthly", priority: 1 }]
    : [];
}

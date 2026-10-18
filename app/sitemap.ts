import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { isDraft, siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl;
  return !isDraft && profile.seo.allowIndexing && url
    ? [{ url, changeFrequency: "monthly", priority: 1 }]
    : [];
}

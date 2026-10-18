import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { externalHref } from "@/lib/links";
import { isDraft } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const url = externalHref(profile.siteUrl);
  const indexable = !isDraft && profile.seo.allowIndexing && !!url;
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(indexable ? { sitemap: `${url!.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}

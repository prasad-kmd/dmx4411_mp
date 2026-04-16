import { MetadataRoute } from "next";
import { getContentByType } from "@/lib/content";

import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/pages",
    "/external-link",
    "/introduction",
    "/methodology",
    "/design",
    "/results",
    "/discussion",
    "/conclusion",
    "/references",
    "/appendix",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}

import type { MetadataRoute } from "next";
import { algorithms, dataStructures } from "@/lib/content";
import { absoluteUrl, siteConfig, withLocalePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = siteConfig.locales;
  const now = new Date();

  const staticRoutes = ["", "/algorithms", "/data-structures"].flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(withLocalePath(locale, path)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
  );

  const algorithmRoutes = algorithms.flatMap((algorithm) =>
    locales.map((locale) => ({
      url: absoluteUrl(withLocalePath(locale, `/algorithms/${algorithm.slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const dataStructureRoutes = dataStructures.flatMap((structure) =>
    locales.map((locale) => ({
      url: absoluteUrl(withLocalePath(locale, `/data-structures/${structure.slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...algorithmRoutes, ...dataStructureRoutes];
}

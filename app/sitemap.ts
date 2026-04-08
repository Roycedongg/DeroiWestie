import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getSiteUrl, LOCALES, LOCALE_SEGMENTS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const localeEntries = LOCALES.flatMap((locale) =>
    LOCALE_SEGMENTS.map((segment) => ({
      url: `${siteUrl}/${locale}${segment}`,
      lastModified: now,
      changeFrequency: (segment === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: segment === "" ? 1 : 0.8,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh${segment}`,
          en: `${siteUrl}/en${segment}`,
        },
      },
    }))
  );

  const serviceEntries = LOCALES.flatMap((locale) =>
    services.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh/services/${service.id}`,
          en: `${siteUrl}/en/services/${service.id}`,
        },
      },
    }))
  );

  return [...localeEntries, ...serviceEntries];
}

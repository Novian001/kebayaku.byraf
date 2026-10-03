import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/catalog`, lastModified: now, priority: 0.9 },
    ...products.map((p) => ({
      url: `${site.url}/catalog/${p.id}`,
      lastModified: now,
      priority: 0.7,
    })),
    { url: `${site.url}/contact`, lastModified: now, priority: 0.6 },
  ];
}

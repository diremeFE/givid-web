import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { getPublishedPosts, getProducts } from "@/lib/data";

const staticPaths = ["", "/nosotros", "/servicios", "/productos", "/blog", "/contacto"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: `${base}/${routing.defaultLocale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [locale, `${base}/${locale}${path}`]),
        ),
      },
    });
  }

  try {
    const [posts, products] = await Promise.all([
      getPublishedPosts(),
      getProducts(),
    ]);

    for (const post of posts) {
      entries.push({
        url: `${base}/${routing.defaultLocale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((locale) => [locale, `${base}/${locale}/blog/${post.slug}`]),
          ),
        },
      });
    }

    for (const product of products) {
      entries.push({
        url: `${base}/${routing.defaultLocale}/productos/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((locale) => [locale, `${base}/${locale}/productos/${product.slug}`]),
          ),
        },
      });
    }
  } catch {
    // Database unreachable at build time — fall back to static routes only.
  }

  return entries;
}

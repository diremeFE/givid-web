import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

/**
 * Builds self-referencing canonical + hreflang alternates for a page.
 * `path` is the locale-agnostic path (e.g. "/servicios", "" for the homepage) —
 * every locale in this app shares the same path segments (no per-locale slugs).
 */
export function pageAlternates(locale: string, path: string = "") {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.siteUrl}/${l}${path}`]),
  );
  return {
    canonical: `${siteConfig.siteUrl}/${locale}${path}`,
    languages: { ...languages, "x-default": `${siteConfig.siteUrl}/${routing.defaultLocale}${path}` },
  };
}

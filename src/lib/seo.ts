import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

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

/**
 * Keyword/location-rich <title> tags, distinct from the on-page H1 (which stays
 * brand-focused, e.g. "GIVID Distribution"). The default `%s | GIVID` template
 * appends the brand, so these strings carry the service + "Malabo" signal that
 * search engines use to match local intent — this is what Google shows in results,
 * not what visitors see on the page.
 */
const SEO_TITLES = {
  services: {
    es: "Servicios de limpieza, eventos y distribución mayorista en Malabo",
    en: "Cleaning, events and wholesale distribution services in Malabo",
    fr: "Services de nettoyage, événementiel et distribution en gros à Malabo",
    pt: "Serviços de limpeza, eventos e distribuição grossista em Malabo",
  },
  distribution: {
    es: "Distribución mayorista en Malabo: alimentación, agua y limpieza",
    en: "Wholesale distribution in Malabo: food, water and cleaning products",
    fr: "Distribution en gros à Malabo : alimentation, eau et entretien",
    pt: "Distribuição grossista em Malabo: alimentação, água e limpeza",
  },
  facilityServices: {
    es: "Limpieza y mantenimiento de edificios en Malabo",
    en: "Building cleaning and maintenance services in Malabo",
    fr: "Nettoyage et entretien de bâtiments à Malabo",
    pt: "Limpeza e manutenção de edifícios em Malabo",
  },
  events: {
    es: "Azafatas y alquiler de mobiliario para eventos en Malabo",
    en: "Hostesses and furniture rental for events in Malabo",
    fr: "Hôtesses et location de mobilier pour événements à Malabo",
    pt: "Hospedeiras e aluguer de mobiliário para eventos em Malabo",
  },
  products: {
    es: "Catálogo mayorista en Malabo: alimentación, agua y limpieza",
    en: "Wholesale catalog in Malabo: food, water and cleaning products",
    fr: "Catalogue de gros à Malabo : alimentation, eau et entretien",
    pt: "Catálogo grossista em Malabo: alimentação, água e limpeza",
  },
  about: {
    es: "Quiénes somos: empresa multiservicios en Malabo, Guinea Ecuatorial",
    en: "About us: a multi-service company in Malabo, Equatorial Guinea",
    fr: "À propos : entreprise multiservices à Malabo, Guinée Équatoriale",
    pt: "Sobre nós: empresa multisserviços em Malabo, Guiné Equatorial",
  },
  contact: {
    es: "Contacto en Malabo, Guinea Ecuatorial",
    en: "Contact us in Malabo, Equatorial Guinea",
    fr: "Contactez-nous à Malabo, Guinée Équatoriale",
    pt: "Contacto em Malabo, Guiné Equatorial",
  },
  blog: {
    es: "Noticias sobre limpieza, eventos y distribución en Malabo",
    en: "News on cleaning, events and distribution in Malabo",
    fr: "Actualités sur le nettoyage, l'événementiel et la distribution à Malabo",
    pt: "Notícias sobre limpeza, eventos e distribuição em Malabo",
  },
} satisfies Record<string, Record<Locale, string>>;

export function seoTitle(page: keyof typeof SEO_TITLES, locale: Locale) {
  return SEO_TITLES[page][locale];
}

const WHOLESALE_SUFFIX = {
  es: "al por mayor en Malabo",
  en: "wholesale in Malabo",
  fr: "en gros à Malabo",
  pt: "por atacado em Malabo",
} satisfies Record<Locale, string>;

export function productSeoTitle(productName: string, locale: Locale) {
  return `${productName} ${WHOLESALE_SUFFIX[locale]}`;
}

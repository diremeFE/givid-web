import { siteConfig } from "@/lib/site-config";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    alternateName: "Preser Gisvalida SL",
    description:
      "Empresa multiservicios en Malabo, Guinea Ecuatorial: limpieza y mantenimiento de edificios y espacios verdes, azafatas y equipamiento para eventos, y distribución mayorista de productos de primera necesidad.",
    url: siteConfig.siteUrl,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Timbabe, al lado del Hotel Timbabe",
      addressLocality: "Malabo",
      addressRegion: "Bioko Norte",
      addressCountry: "GQ",
    },
    areaServed: [
      { "@type": "Country", name: "Guinea Ecuatorial" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [] as string[],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

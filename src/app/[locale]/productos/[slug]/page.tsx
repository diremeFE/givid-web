import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, Mail, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { getProductBySlug, getProducts } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { pageAlternates, productSeoTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/productos/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const locale = (await getLocale()) as Locale;
  if (!product) return {};

  const name = localizedField(product, "name", locale);
  const title = productSeoTitle(name, locale);
  const description = localizedField(product, "description", locale) ?? undefined;

  return {
    title,
    description,
    alternates: pageAlternates(locale, `/productos/${slug}`),
    openGraph: {
      title,
      description,
      type: "website",
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/productos/[slug]">) {
  const { slug } = await params;
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const product = await getProductBySlug(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const name = localizedField(product, "name", locale);
  const description = localizedField(product, "description", locale);
  const categoryName = localizedField(product.category, "name", locale);

  const gallery = [
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...product.images.map((img) => img.url),
  ].filter((url, i, arr) => arr.indexOf(url) === i);

  const currency = new Intl.NumberFormat(
    locale === "es" ? "es-ES" : locale === "fr" ? "fr-FR" : locale === "pt" ? "pt-PT" : "en-US",
    { style: "currency", currency: "XAF", maximumFractionDigits: 0 },
  );

  const related = (await getProducts(product.category.slug))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description ?? undefined,
    image: gallery.length > 0 ? gallery : undefined,
    category: categoryName,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "XAF",
      availability: product.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteConfig.siteUrl}/${locale}/productos/${slug}`,
      seller: { "@type": "Organization", name: siteConfig.brandName },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tNav("home"), path: "" },
          { name: tNav("products"), path: "/productos" },
          { name, path: `/productos/${slug}` },
        ]}
      />
      <Link
        href="/productos"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("backToCatalog")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ProductGallery images={gallery} alt={name} />
        </Reveal>

        <Reveal delay={100}>
          <span className="inline-block rounded-full bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {categoryName}
          </span>
          <h1 className="mt-4 text-3xl font-black text-neutral-900 sm:text-4xl">{name}</h1>
          <p className="mt-1 text-sm text-neutral-500">{product.unit}</p>
          {description && (
            <p className="mt-4 leading-relaxed text-neutral-600">{description}</p>
          )}
          <p className="mt-6 text-3xl font-bold text-brand-dark">
            {currency.format(product.price)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hola, me interesa el producto: ${name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("orderButton")}
            </a>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(name)}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("emailButton")}
            </a>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent-light p-4 shadow-sm shadow-accent/5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-accent/20">
              <Info className="h-4 w-4 text-accent-dark" aria-hidden="true" />
            </span>
            <p className="text-sm text-accent-dark">{t("orderNotice")}</p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-neutral-900">{t("otherProductsTitle")}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard
                  product={p}
                  locale={locale}
                  currency={currency}
                  orderLabel={t("orderButton")}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import { getTranslations, getLocale } from "next-intl/server";
import { Info, ShoppingBasket } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("products");
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function ProductsPage({
  searchParams,
}: PageProps<"/[locale]/productos">) {
  const t = await getTranslations("products");
  const tHome = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const params = await searchParams;
  const activeCategory =
    typeof params.categoria === "string" ? params.categoria : undefined;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(activeCategory),
  ]);

  const currency = new Intl.NumberFormat(
    locale === "es" ? "es-ES" : locale === "fr" ? "fr-FR" : "en-US",
    { style: "currency", currency: "XAF", maximumFractionDigits: 0 },
  );

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={ShoppingBasket}
        image="/images/service-wholesale.webp"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="flex items-start gap-4 rounded-2xl border border-accent/25 bg-accent-light p-5 shadow-sm shadow-accent/5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-accent/20">
            <Info className="h-5 w-5 text-accent-dark" aria-hidden="true" />
          </span>
          <p className="mt-1.5 text-sm text-accent-dark">{t("orderNotice")}</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/productos"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              !activeCategory
                ? "bg-brand text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {t("categoryAll")}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={{ pathname: "/productos", query: { categoria: category.slug } }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category.slug
                  ? "bg-brand text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {localizedField(category, "name", locale)}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="mt-12 rounded-xl border border-dashed border-border p-8 text-center text-neutral-500">
            {t("noProducts")}
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 6) * 60}>
                <ProductCard
                  product={product}
                  locale={locale}
                  currency={currency}
                  orderLabel={t("orderButton")}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

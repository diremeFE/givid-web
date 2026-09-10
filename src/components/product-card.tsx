import { ImageOff, MessageCircle } from "lucide-react";
import type { Category, Product } from "@/generated/prisma/client";
import { Link } from "@/i18n/navigation";
import { localizedField } from "@/lib/localized";
import { whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

export function ProductCard({
  product,
  locale,
  currency,
  orderLabel,
}: {
  product: Product & { category: Category };
  locale: Locale;
  currency: Intl.NumberFormat;
  orderLabel: string;
}) {
  const name = localizedField(product, "name", locale);
  const description = localizedField(product, "description", locale);
  const categoryName = localizedField(product.category, "name", locale);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm shadow-black/3 transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/productos/${product.slug}`}
        className="flex h-full flex-col"
      >
        <div className="relative m-3 mb-0 h-40 overflow-hidden rounded-xl bg-brand-light">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand-dark/40">
              <ImageOff className="h-8 w-8" aria-hidden="true" />
            </div>
          )}

          <span className="absolute left-2 top-2 rounded-full bg-brand-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {categoryName}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs text-neutral-500">{product.unit}</p>
          <h3 className="mt-1 font-semibold text-neutral-900">{name}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{description}</p>
          )}
          <p className="mt-auto pt-3 text-lg font-bold text-brand-dark">
            {currency.format(product.price)}
          </p>
        </div>
      </Link>

      <a
        href={whatsappLink(`Hola, me interesa el producto: ${name}`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={orderLabel}
        title={orderLabel}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark shadow-md transition-colors hover:bg-brand-dark hover:text-white"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

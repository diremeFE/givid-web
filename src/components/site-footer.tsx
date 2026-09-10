import Image from "next/image";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-section-dark text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-lg bg-white px-3 py-2">
            <Image
              src="/logo.png"
              alt="GIVID — Preser Gisvalida SL"
              width={752}
              height={289}
              className="h-8 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm text-neutral-400">
            Preser Gisvalida SL — Distribución mayorista, mantenimiento y
            gestión de importación en Guinea Ecuatorial.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-100">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/nosotros" className="text-neutral-400 transition-colors hover:text-white">
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="text-neutral-400 transition-colors hover:text-white">
                {tNav("services")}
              </Link>
            </li>
            <li>
              <Link href="/productos" className="text-neutral-400 transition-colors hover:text-white">
                {tNav("products")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-neutral-400 transition-colors hover:text-white">
                {tNav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-100">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-neutral-400 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-brand-light" aria-hidden="true" />
                {siteConfig.whatsappNumberDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-neutral-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-light" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" aria-hidden="true" />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-neutral-500">
        © {year} Preser Gisvalida SL (GIVID). {t("rightsReserved")}
      </div>
    </footer>
  );
}

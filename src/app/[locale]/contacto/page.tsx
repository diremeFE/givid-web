import { getTranslations } from "next-intl/server";
import { MessageCircle, Mail, MapPin, Clock, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tHome = await getTranslations("home");

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={MessageCircle}
        image="/images/hero-warehouse.webp"
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal className="h-fit rounded-2xl border border-border bg-white p-6 shadow-sm shadow-black/2 sm:p-8">
            <h2 className="text-lg font-bold text-neutral-900">
              {t("formTitle")}
            </h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-lg font-bold text-neutral-900">
              {t("otherWaysTitle")}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <ContactRow
                icon={MessageCircle}
                label={t("whatsappLabel")}
                value={siteConfig.whatsappNumberDisplay}
                href={whatsappLink()}
                external
              />
              <ContactRow
                icon={Phone}
                label={t("phoneContactLabel")}
                value={siteConfig.phoneSecondaryDisplay}
                href={`tel:+${siteConfig.phoneSecondary}`}
              />
              <ContactRow
                icon={Mail}
                label={t("emailContactLabel")}
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactRow
                icon={MapPin}
                label={t("addressLabel")}
                value={siteConfig.address}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                external
              />
              <ContactRow
                icon={Clock}
                label={t("hoursLabel")}
                value={siteConfig.hours}
              />
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-light to-white ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </p>
        <p
          className={`mt-0.5 truncate font-semibold text-neutral-800 ${href ? "group-hover:text-brand-dark" : ""}`}
        >
          {value}
        </p>
      </div>
    </>
  );

  const rowClass =
    "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10";

  return (
    <li>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={rowClass}
        >
          {content}
        </a>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  );
}

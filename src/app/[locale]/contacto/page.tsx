import { getTranslations, getLocale } from "next-intl/server";
import { MessageCircle, Mail, MapPin, Clock, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { pageAlternates, seoTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  const locale = (await getLocale()) as Locale;
  return {
    title: seoTitle("contact", locale),
    description: t("pageSubtitle"),
    alternates: pageAlternates(locale, "/contacto"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="bg-brand-lighter px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <span data-hero className="absolute left-0 top-0 h-px w-full" aria-hidden="true" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-brand-dark/10 lg:grid-cols-2">
          {/* Left — form */}
          <Reveal className="p-8 sm:p-12 lg:p-14">
            <span className="block h-1 w-12 rounded-full bg-brand" />
            <h1 className="mt-4 text-3xl font-black text-neutral-900 sm:text-4xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">{t("pageSubtitle")}</p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Right — organic brand panel */}
          <Reveal
            delay={100}
            className="relative isolate flex min-h-144 items-center overflow-hidden bg-brand-darker p-6 sm:min-h-160 sm:p-10"
          >
            {/* Huge overflowing blob, top-right — bright */}
            <div
              className="absolute -right-32 -top-40 h-120 w-120 bg-[#34c77d]"
              style={{ borderRadius: "58% 42% 68% 32% / 45% 58% 42% 55%" }}
              aria-hidden="true"
            />
            {/* Second overflowing blob, bottom-left — deep */}
            <div
              className="absolute -bottom-32 -left-28 h-104 w-104 bg-[#0c5c37]"
              style={{ borderRadius: "45% 55% 38% 62% / 55% 40% 60% 45%" }}
              aria-hidden="true"
            />
            {/* Mid accent blob for layered depth */}
            <div
              className="absolute right-6 bottom-0 h-56 w-56 bg-brand opacity-80"
              style={{ borderRadius: "50% 50% 35% 65% / 60% 45% 55% 40%" }}
              aria-hidden="true"
            />
            <span className="absolute left-10 top-12 z-10 h-10 w-10 rounded-full bg-white/85" aria-hidden="true" />

            <div
              className="relative z-10 ml-auto w-full max-w-sm bg-white p-10 shadow-2xl shadow-black/30 sm:p-12"
              style={{ borderRadius: "2.5rem 2.5rem 3rem 2.5rem" }}
            >
              <div className="mx-auto max-w-60">
                <span className="block h-1 w-10 rounded-full bg-brand" />
                <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-900">
                  {siteConfig.brandName}
                </h2>

                <ul className="mt-6 space-y-4">
                  <ContactDetail icon={MapPin} value={siteConfig.address} />
                  <ContactDetail icon={Phone} value={siteConfig.whatsappNumberDisplay} />
                  <ContactDetail icon={Mail} value={siteConfig.email} />
                  <ContactDetail icon={Clock} value={siteConfig.hours} />
                </ul>

                <div className="mt-7 flex gap-3">
                  <SocialIconLink
                    href={whatsappLink()}
                    icon={MessageCircle}
                    label={t("whatsappLabel")}
                  />
                  <SocialIconLink
                    href={`tel:+${siteConfig.phoneSecondary}`}
                    icon={Phone}
                    label={t("phoneContactLabel")}
                  />
                  <SocialIconLink
                    href={`mailto:${siteConfig.email}`}
                    icon={Mail}
                    label={t("emailContactLabel")}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ContactDetail({ icon: Icon, value }: { icon: LucideIcon; value: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral-700">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
      <span>{value}</span>
    </li>
  );
}

function SocialIconLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand-dark shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-brand hover:text-white"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

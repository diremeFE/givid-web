import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Users, ArrowRight, ArrowLeft, ShieldCheck, Handshake, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FaqSection, faqSchema } from "@/components/faq-section";
import { pageAlternates, seoTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("services");
  const locale = (await getLocale()) as Locale;
  return {
    title: seoTitle("events", locale),
    description: t("events.description"),
    alternates: pageAlternates(locale, "/servicios/eventos"),
  };
}

export default async function EventosPage() {
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const tAbout = await getTranslations("about");
  const tDetail = await getTranslations("servicesDetail");
  const locale = (await getLocale()) as Locale;

  const bullets = [
    t("events.bullet1"),
    t("events.bullet2"),
    t("events.bullet3"),
    t("events.bullet4"),
  ];

  const steps = [
    { title: tDetail("events.process1Title"), text: tDetail("events.process1Text") },
    { title: tDetail("events.process2Title"), text: tDetail("events.process2Text") },
    { title: tDetail("events.process3Title"), text: tDetail("events.process3Text") },
  ];

  const values = [
    { icon: ShieldCheck, label: tAbout("value1"), text: tAbout("value1Text") },
    { icon: Handshake, label: tAbout("value2"), text: tAbout("value2Text") },
    { icon: Heart, label: tAbout("value3"), text: tAbout("value3Text") },
  ];

  const faqItems = [
    { question: tDetail("events.faqQ1"), answer: tDetail("events.faqA1") },
    { question: tDetail("events.faqQ2"), answer: tDetail("events.faqA2") },
    { question: tDetail("events.faqQ3"), answer: tDetail("events.faqA3") },
  ];

  return (
    <div>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tNav("home"), path: "" },
          { name: tNav("services"), path: "/servicios" },
          { name: t("events.title"), path: "/servicios/eventos" },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <PageHero
        eyebrow={t("events.tag")}
        title={t("events.title")}
        subtitle={t("events.description")}
        icon={Users}
        image="/images/service-events-v3.jpg"
        size="lg"
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tDetail("backToServices")}
        </Link>
      </div>

      {/* Full-bleed quote band */}
      <section className="relative mt-10 min-h-125 overflow-hidden">
        <Image
          src="/images/service-events-v3.jpg"
          alt="Montaje de mobiliario y protocolo para eventos GIVID"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" aria-hidden="true" />
        <Reveal className="relative mx-auto flex min-h-125 max-w-3xl flex-col justify-end px-4 pb-14 sm:px-6">
          <p className="text-2xl font-black leading-snug text-white sm:text-4xl">
            “{tDetail("events.quote")}”
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
            {tDetail("events.overviewExtra")}
          </p>
        </Reveal>
      </section>

      {/* Qué incluye — lista editorial */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="max-w-xl">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("includesTitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {bullets.map((bullet, i) => (
              <Reveal key={bullet} delay={i * 80} className="flex gap-5 border-t border-border pt-5">
                <span className="text-4xl font-black leading-none text-brand/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 font-semibold text-neutral-800">{bullet}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona — pasos alternos */}
      <section className="bg-brand-light py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("processTitle")}
            </h2>
          </Reveal>

          <div className="mt-14 space-y-12">
            {steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal
                  key={step.title}
                  delay={i * 100}
                  className={`relative max-w-md ${right ? "ml-auto text-right" : ""}`}
                >
                  <span
                    className={`pointer-events-none absolute -top-10 text-7xl font-black text-brand/10 ${
                      right ? "-right-2" : "-left-2"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative font-bold text-neutral-900">{step.title}</h3>
                  <p className="relative mt-2 text-sm text-neutral-600">{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("whyTitle")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, label, text }, i) => (
              <Reveal
                key={label}
                delay={i * 100}
                className="rounded-3xl border border-border bg-white p-7 text-center shadow-sm shadow-black/5"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light">
                  <Icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-neutral-900">{label}</h3>
                <p className="mt-2 text-sm text-neutral-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title={tDetail("events.faqTitle")} items={faqItems} />

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <Reveal className="bg-brand-mesh relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl shadow-brand-darker/20 sm:py-20">
          <div className="bg-noise absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl">
              {t("ctaText")}
            </h2>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-darker shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

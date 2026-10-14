import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Armchair, ArrowRight, ArrowLeft, ShieldCheck, Handshake, Heart, PackageCheck } from "lucide-react";
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

  const furniture = [
    {
      image: "/images/mobiliario-mesa-sillas-doradas.jpg",
      name: tDetail("events.furniture1Name"),
      prices: [
        { label: tDetail("events.furniture1ChairLabel"), amount: 5000 },
        { label: tDetail("events.furniture1TableLabel"), amount: 16000 },
      ],
      availability: tDetail("events.furniture1Availability"),
    },
    {
      image: "/images/mobiliario-mesa-presidencial.jpg",
      name: tDetail("events.furniture2Name"),
      prices: [
        { label: tDetail("events.furniture1ChairLabel"), amount: 6000 },
        { label: tDetail("events.furniture2TableLabel"), amount: 20000 },
      ],
      availability: tDetail("events.furniture2Availability"),
    },
    {
      image: "/images/mobiliario-sillas-salon.jpg",
      name: tDetail("events.furniture3Name"),
      prices: [{ label: tDetail("events.furniture1ChairLabel"), amount: 4000 }],
      availability: tDetail("events.furniture3Availability"),
    },
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
        icon={Armchair}
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
          alt="Montaje de mobiliario para eventos GIVID"
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

      {/* Mobiliario disponible */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("events.furnitureTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {tDetail("events.furnitureIntro")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {furniture.map((item, i) => (
              <Reveal
                key={item.name}
                direction="scale"
                delay={i * 100}
                className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-black/5"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900">{item.name}</h3>

                  {item.prices.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {item.prices.map((p) => (
                        <li key={p.label} className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">{p.label}</span>
                          <span className="font-bold text-brand-dark">
                            {new Intl.NumberFormat(locale, { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(p.amount)}
                            <span className="ml-1 font-normal text-neutral-500">{tDetail("events.perDay")}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm font-semibold text-brand-dark">
                      {tDetail("events.priceOnRequestFurniture")}
                    </p>
                  )}

                  {item.availability && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      <PackageCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                      {item.availability}
                    </p>
                  )}
                </div>
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
                  direction={right ? "right" : "left"}
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
                direction="scale"
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

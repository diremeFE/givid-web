import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Boxes, Wheat, Baby, Droplets, SprayCan, ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return { title: t("distribution.title"), description: t("distribution.description") };
}

export default async function DistribucionPage() {
  const t = await getTranslations("services");
  const tHome = await getTranslations("home");
  const tDetail = await getTranslations("servicesDetail");

  const stats = [
    { value: tDetail("distribution.statProducts"), label: tDetail("distribution.statProductsLabel") },
    { value: tDetail("distribution.statCategories"), label: tDetail("distribution.statCategoriesLabel") },
    { value: tDetail("distribution.statAvailability"), label: tDetail("distribution.statAvailabilityLabel") },
  ];

  const categories = [
    {
      icon: Wheat,
      title: tDetail("distribution.categoryFood"),
      items: [t("distribution.bullet1"), t("distribution.bullet2"), t("distribution.bullet3")],
    },
    {
      icon: Baby,
      title: tDetail("distribution.categoryChildcare"),
      items: [t("distribution.bullet4"), t("distribution.bullet5")],
    },
    {
      icon: Droplets,
      title: tDetail("distribution.categoryWater"),
      items: [t("distribution.bullet6")],
    },
  ];

  const homeItems = [
    t("distribution.bullet7"),
    t("distribution.bullet8"),
    t("distribution.bullet9"),
    t("distribution.bullet10"),
    t("distribution.bullet11"),
    t("distribution.bullet12"),
    t("distribution.bullet13"),
  ];

  const steps = [
    { title: tHome("process1Title"), text: tHome("process1Text") },
    { title: tHome("process2Title"), text: tHome("process2Text") },
    { title: tHome("process3Title"), text: tHome("process3Text") },
  ];

  return (
    <div>
      <PageHero
        eyebrow={t("distribution.tag")}
        title={t("distribution.title")}
        subtitle={t("distribution.description")}
        icon={Boxes}
        image="/images/service-distribution-v2.jpg"
        size="lg"
      />

      {/* Stat band */}
      <section className="bg-brand-darker py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {tDetail("backToServices")}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-white/85">
                {tDetail("distribution.overviewExtra")}
              </p>
            </Reveal>
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80} className="text-center lg:text-left">
                  <p className="text-3xl font-black text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/60">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye — bento */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("includesTitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {categories.map(({ icon: Icon, title, items }, i) => (
              <Reveal
                key={title}
                delay={i * 80}
                className="flex flex-col rounded-3xl border border-border bg-white p-7 shadow-sm shadow-black/3"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light">
                  <Icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-bold text-neutral-900">{title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={240}
            className="mt-5 flex flex-col gap-6 rounded-3xl bg-brand-dark p-8 text-white sm:flex-row sm:items-center sm:gap-10 sm:p-10"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <SprayCan className="h-7 w-7 text-white" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{tDetail("distribution.categoryHome")}</h3>
              <div className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-white/85 sm:grid-cols-2 lg:grid-cols-3">
                {homeItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-brand-mesh relative overflow-hidden py-20">
        <div className="bg-noise absolute inset-0 opacity-20" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Quote className="mx-auto h-10 w-10 text-white/30" aria-hidden="true" />
          <p className="mt-4 text-xl font-black leading-snug text-white sm:text-3xl">
            {tDetail("distribution.quote")}
          </p>
        </Reveal>
      </section>

      {/* Cómo funciona — timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("processTitle")}
            </h2>
          </Reveal>

          <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-6">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block"
              aria-hidden="true"
            />
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-black text-white ring-8 ring-background">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-brand-darker px-6 py-16 text-center shadow-xl shadow-brand-darker/20 sm:py-20">
          <div className="relative aspect-4/3 w-full max-w-xs overflow-hidden rounded-2xl shadow-lg shadow-black/30 sm:hidden">
            <Image src="/images/service-distribution-v2.jpg" alt="" fill sizes="320px" className="object-cover" />
          </div>
          <h2 className="relative max-w-2xl text-2xl font-black leading-tight text-white sm:text-4xl">
            {t("ctaText")}
          </h2>
          <Link
            href="/productos"
            className="relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-darker shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
          >
            {tHome("ctaCatalog")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

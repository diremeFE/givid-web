import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import {
  ShieldCheck,
  Handshake,
  Heart,
  Users,
  Check,
  ArrowRight,
  Award,
  Trophy,
  Lightbulb,
  Scale,
  Rocket,
  Boxes,
  ClipboardCheck,
  Headset,
  Globe2,
  Zap,
  Quote,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { pageAlternates, seoTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  return {
    title: seoTitle("about", locale),
    description: t("intro"),
    alternates: pageAlternates(locale, "/nosotros"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const tServices = await getTranslations("services");

  const values = [
    { icon: Handshake, label: t("value1"), text: t("value1Text") },
    { icon: Award, label: t("value2"), text: t("value2Text") },
    { icon: ShieldCheck, label: t("value3"), text: t("value3Text") },
    { icon: Trophy, label: t("value4"), text: t("value4Text") },
    { icon: Heart, label: t("value5"), text: t("value5Text") },
    { icon: Lightbulb, label: t("value6"), text: t("value6Text") },
    { icon: Scale, label: t("value7"), text: t("value7Text") },
    { icon: Rocket, label: t("value8"), text: t("value8Text") },
  ];

  const whyGivid = [
    { icon: Boxes, title: t("whyGivid1Title"), text: t("whyGivid1Text") },
    { icon: ClipboardCheck, title: t("whyGivid2Title"), text: t("whyGivid2Text") },
    { icon: Headset, title: t("whyGivid3Title"), text: t("whyGivid3Text") },
    { icon: ShieldCheck, title: t("whyGivid4Title"), text: t("whyGivid4Text") },
    { icon: Zap, title: t("whyGivid5Title"), text: t("whyGivid5Text") },
    { icon: Globe2, title: t("whyGivid6Title"), text: t("whyGivid6Text") },
  ];

  const facilitiesBullets = [
    tServices("facilityServices.bullet1"),
    tServices("facilityServices.bullet4"),
    tServices("facilityServices.bullet5"),
  ];

  const introStats = [
    { value: tServices("stat1Value"), label: tServices("stat1Label") },
    { value: tServices("stat2Value"), label: tServices("stat2Label") },
    { value: tServices("stat3Value"), label: tServices("stat3Label") },
    { value: tServices("stat4Value"), label: tServices("stat4Label") },
  ];

  return (
    <div>
      <PageHero
        title={t("pageTitle")}
        subtitle={t("intro")}
        icon={Users}
        image="/images/nosotros-hero-team.jpg"
        size="full"
      />

      {/* Quiénes somos */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
            {t("whoTitle")}
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-900 sm:text-4xl">
            {t("slogan")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{t("intro")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { src: "/images/about-team-v2.jpg", alt: "Equipo de GIVID" },
            { src: "/images/givid-box.jpg", alt: "Caja de producto con el logotipo GIVID" },
            { src: "/images/garden-maintenance.jpg", alt: "Mantenimiento de espacios verdes GIVID" },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 80} className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg shadow-black/10">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-neutral-700">
            {t.rich("whoTextRich", {
              b: (chunks) => <strong className="font-bold text-neutral-900">{chunks}</strong>,
            })}
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-transform hover:-translate-y-0.5"
          >
            {tHome("ctaBannerButton")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 sm:grid-cols-4">
          {introStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 60}
              className={`text-center ${i > 0 ? "sm:border-l sm:border-border" : ""}`}
            >
              <p className="text-3xl font-black text-brand-dark sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Por qué GIVID */}
      <section className="bg-brand-aurora py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
              {t("whyGividEyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
              {t("whyGividTitle")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {t("whyGividIntro")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyGivid.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 70}
                className="flex flex-col rounded-2xl border border-white bg-white p-6 shadow-lg shadow-brand-darker/10 ring-1 ring-black/4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                  <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420} className="mx-auto mt-14 max-w-2xl text-center">
            <Quote className="mx-auto h-8 w-8 text-brand/30" aria-hidden="true" />
            <p className="mt-3 text-lg font-bold leading-snug text-neutral-900 sm:text-xl">
              {t("whyGividQuote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <h2 className="max-w-md text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              {t("storyTitle")}
            </h2>
            <Link
              href="/contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-transform hover:-translate-y-0.5"
            >
              {t("storyButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={100} className="max-w-sm text-sm text-neutral-600 lg:pt-2">
            {t("storySubtitle")}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="relative min-h-100 overflow-hidden rounded-3xl">
            <Image
              src="/images/malabo-harbor.jpg"
              alt="Puerto de Malabo, Guinea Ecuatorial"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white">{t("historyTitle")}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">{t("historyText")}</p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-rows-2">
            <Reveal delay={100} className="flex flex-col justify-center rounded-3xl border border-brand/15 border-b-4 border-b-brand-dark bg-brand-light p-8 shadow-lg shadow-black/5">
              <h3 className="text-lg font-bold text-neutral-900">{t("missionTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{t("missionText")}</p>
            </Reveal>
            <Reveal delay={200} className="flex flex-col justify-center rounded-3xl bg-brand-dark p-8 text-white">
              <h3 className="text-lg font-bold">{t("visionTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{t("visionText")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Historia completa */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
              {t("historyTitle")}
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600">
              <p>{t("historyExtra1")}</p>
              <p>{t("historyExtra2")}</p>
              <p>{t("historyExtra3")}</p>
              <p>{t("historyExtra4")}</p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
              {t("fromGuineaTitle")}. {t("fromGuineaText")}
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={100} className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg shadow-black/10">
              <Image
                src="/images/hero-production.jpg"
                alt="Equipo de GIVID en producción"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={200} className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-lg shadow-black/10">
              <Image
                src="/images/servicios-hero.jpg"
                alt="Servicios de GIVID en Malabo"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={100} className="order-2 lg:order-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-brand-dark/10">
                <Image
                  src="/images/facility-glass.jpg"
                  alt="Limpieza de cristales corporativos por GIVID Facility Services"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                {tServices("facilityServices.tag")}
              </p>
              <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
                {tServices("facilityServices.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                {tServices("facilityServices.description")}
              </p>
              <ul className="mt-6 space-y-3">
                {facilitiesBullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-800">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-section-dark relative overflow-hidden py-20">
        <div className="bg-noise absolute inset-0 opacity-20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
              {t("valuesTitle")}
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {t("valuesSubtitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, label, text }, i) => (
              <Reveal
                key={label}
                delay={i * 50}
                className="border-t border-white/10 pt-5"
              >
                <Icon className="h-5 w-5 text-brand-light" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-3 font-bold text-white">{label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

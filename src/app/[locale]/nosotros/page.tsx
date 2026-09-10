import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ShieldCheck,
  Handshake,
  Heart,
  Sparkle,
  Users,
  Sparkles,
  UserRound,
  Boxes,
  Check,
  Target,
  Eye,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("pageTitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const tServices = await getTranslations("services");

  const values = [
    { icon: ShieldCheck, label: t("value1"), text: t("value1Text") },
    { icon: Handshake, label: t("value2"), text: t("value2Text") },
    { icon: Heart, label: t("value3"), text: t("value3Text") },
  ];

  const businessLines = [
    {
      icon: Sparkles,
      title: tServices("facilityServices.title"),
      text: tServices("facilityServices.tag"),
    },
    {
      icon: UserRound,
      title: tServices("events.title"),
      text: tServices("events.tag"),
    },
    {
      icon: Boxes,
      title: tServices("distribution.title"),
      text: tServices("distribution.tag"),
    },
  ];

  const facilitiesBullets = [
    tServices("facilityServices.bullet1"),
    tServices("facilityServices.bullet4"),
    tServices("facilityServices.bullet5"),
  ];

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("intro")}
        icon={Users}
        image="/images/about-team.webp"
      />

      {/* Quiénes somos */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
              <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
              {t("whoTitle")}
            </span>
            <h2 className="mt-4 max-w-md text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              {t("slogan")}
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm text-sm text-neutral-600 lg:pt-2 lg:text-right">
            {t("whoText")}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {businessLines.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className={`flex h-full flex-col rounded-3xl p-8 ${
                i === 0
                  ? "border border-border bg-white shadow-sm shadow-black/3"
                  : i === 1
                    ? "bg-brand-light"
                    : "bg-brand-darker text-white"
              }`}
            >
              <Icon
                className={`h-11 w-11 ${i === 1 ? "text-brand-dark" : i === 2 ? "text-brand-light" : "text-brand-dark"}`}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className={`mt-6 text-lg font-bold leading-snug ${i === 2 ? "" : "text-neutral-900"}`}>
                {title}
              </h3>
              <p className={`mt-3 text-sm ${i === 2 ? "text-white/70" : "text-neutral-600"}`}>
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Misión y visión */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
            {t("whoTitle")}
          </p>
          <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
            {t("missionTitle")} &amp; {t("visionTitle")}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <Reveal delay={0} className="rounded-3xl border border-border bg-white p-8 shadow-sm shadow-black/3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
              <Target className="h-6 w-6 text-brand-dark" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-neutral-900">{t("missionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{t("missionText")}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl bg-brand-darker p-8 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Eye className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{t("visionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{t("visionText")}</p>
          </Reveal>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={100} className="order-2 lg:order-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-brand-dark/10">
                <Image
                  src="/images/hero-warehouse.webp"
                  alt=""
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

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
            Galería
          </p>
          <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
            Nuestro día a día
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-40 grid-cols-2 gap-4 sm:auto-rows-45 sm:grid-cols-4">
          <Reveal className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl">
            <Image
              src="/images/about-team.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={100} className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/service-events.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={200} className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/service-maintenance.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={300} className="relative col-span-2 overflow-hidden rounded-3xl">
            <Image
              src="/images/ownbrand-arroz.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
              {t("valuesTitle")}
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {t("valuesSubtitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
            {values.map(({ icon: Icon, label, text }, i) => (
              <Reveal key={label} delay={i * 80} className="h-full">
                <div className="group relative flex h-full flex-col bg-neutral-950 p-7 transition-colors duration-300 hover:bg-white/5">
                  <span className="text-sm font-black text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-bold text-white">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

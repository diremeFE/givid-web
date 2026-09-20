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
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("pageTitle"), description: t("intro") };
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

  const whoChecklist = [
    tHome("introBullet1"),
    tHome("introBullet2"),
    tHome("introBullet3"),
    tHome("introBullet4"),
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
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-4/5 w-full">
              <div className="absolute inset-0 right-14 top-0 overflow-hidden rounded-3xl shadow-xl shadow-black/10">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Equipo de GIVID"
                  fill
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-3xl shadow-xl shadow-black/15 ring-4 ring-white">
                <Image
                  src="/images/placeholder.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-4 top-4 rounded-2xl bg-brand-dark px-5 py-4 text-white shadow-xl shadow-brand-dark/25 sm:-left-6">
                <p className="text-3xl font-black leading-none">{tHome("heroStatValue")}</p>
                <p className="mt-1 max-w-24 text-[11px] font-bold uppercase leading-tight tracking-wide text-white/80">
                  {tHome("heroStatLabel")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
              <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
              {t("whoTitle")}
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              {t("slogan")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{t("whoText")}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whoChecklist.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-transform hover:-translate-y-0.5"
            >
              {tHome("ctaBannerButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {businessLines.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className={`flex h-full flex-col rounded-3xl p-8 ${
                i === 0
                  ? "border border-border border-b-4 border-b-brand bg-white shadow-lg shadow-black/5"
                  : i === 1
                    ? "border border-brand/15 border-b-4 border-b-brand-dark bg-brand-light shadow-lg shadow-black/5"
                    : "bg-brand-darker text-white"
              }`}
            >
              {i === 2 ? (
                <Icon className="h-11 w-11 text-brand-light" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${i === 1 ? "bg-white" : "bg-brand-light"}`}>
                  <Icon className="h-7 w-7 text-brand-dark" strokeWidth={1.5} aria-hidden="true" />
                </span>
              )}
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
              src="/images/placeholder.jpg"
              alt=""
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

      {/* Facilities */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delay={100} className="order-2 lg:order-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-brand-dark/10">
                <Image
                  src="/images/placeholder.jpg"
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

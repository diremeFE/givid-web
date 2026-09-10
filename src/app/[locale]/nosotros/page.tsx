import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ShieldCheck,
  Handshake,
  Heart,
  Sparkle,
  Users,
  Rocket,
  Building2,
  TrendingUp,
  Award,
  Check,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

const HISTORY = [
  {
    year: "2018",
    icon: Rocket,
    title: "Lorem ipsum dolor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    year: "2020",
    icon: Building2,
    title: "Consectetur adipiscing",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    year: "2022",
    icon: TrendingUp,
    title: "Duis aute irure",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
  {
    year: "2024",
    icon: Award,
    title: "Excepteur sint",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.",
  },
];

const FACILITIES_BULLETS = [
  "Lorem ipsum dolor sit amet consectetur",
  "Adipiscing elit sed do eiusmod tempor",
  "Incididunt ut labore et dolore magna",
];

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: t("pageTitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");

  const values = [
    { icon: ShieldCheck, label: t("value1"), text: t("value1Text") },
    { icon: Handshake, label: t("value2"), text: t("value2Text") },
    { icon: Heart, label: t("value3"), text: t("value3Text") },
    { icon: Sparkle, label: t("value4"), text: t("value4Text") },
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

      {/* Approach (placeholder content) */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
              <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
              Nuestro enfoque
            </span>
            <h2 className="mt-4 max-w-md text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              Lorem ipsum dolor sit amet consectetur adipiscing
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm text-sm text-neutral-600 lg:pt-2 lg:text-right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal
            delay={0}
            className="flex h-full flex-col rounded-3xl border border-border bg-white p-8 shadow-sm shadow-black/3"
          >
            <Briefcase className="h-11 w-11 text-brand-dark" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-6 text-lg font-bold leading-snug text-neutral-900">
              Lorem ipsum dolor sit
              <br />
              amet consectetur
            </h3>
            <p className="mt-3 text-sm text-neutral-600">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.
            </p>
            <span className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-light px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand/15">
              Ver más
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Reveal>

          <Reveal
            delay={100}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-light p-8"
          >
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-brand/20 blur-xl"
              aria-hidden="true"
            />
            <TrendingUp className="relative h-11 w-11 text-brand-dark" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="relative mt-6 text-lg font-bold leading-snug text-neutral-900">
              Lorem ipsum dolor sit
              <br />
              amet consectetur
            </h3>
            <p className="relative mt-3 text-sm text-neutral-700">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.
            </p>
            <span className="relative mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-white/80">
              Ver más
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Reveal>

          <Reveal
            delay={200}
            className="flex h-full flex-col rounded-3xl bg-brand-darker p-8 text-white"
          >
            <Handshake className="h-11 w-11 text-brand-light" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-6 text-lg font-bold leading-snug">
              Lorem ipsum dolor sit
              <br />
              amet consectetur
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.
            </p>
            <span className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15">
              Ver más
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Reveal>
        </div>
      </section>

      {/* History (placeholder content) */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
            Trayectoria
          </p>
          <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
            Nuestra historia
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {HISTORY.map((item, i) => (
            <Reveal key={item.year} delay={i * 100} className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
                <item.icon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-black text-brand-dark">{item.year}</p>
              <h3 className="mt-1 font-bold text-neutral-900">{item.title}</h3>
              <p className="mx-auto mt-2 max-w-55 text-sm text-neutral-600">
                {item.text}
              </p>

              {i < HISTORY.length - 1 && (
                <div
                  className="absolute left-full top-8 hidden h-px w-10 -translate-y-1/2 border-t-2 border-dashed border-neutral-300 sm:block"
                  aria-hidden="true"
                />
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facilities (placeholder content) */}
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
                Instalaciones
              </p>
              <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
                Lorem ipsum dolor sit amet
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <ul className="mt-6 space-y-3">
                {FACILITIES_BULLETS.map((bullet) => (
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
              src="/images/service-wholesale.webp"
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
              src="/images/service-import.webp"
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

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
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

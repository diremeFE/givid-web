import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Boxes,
  Sparkles,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Handshake,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

const SERVICES = {
  distribucion: {
    key: "distribution",
    icon: Boxes,
    image: "/images/service-distribution-v2.jpg",
    bulletCount: 13,
    useHomeProcess: true,
  },
  "facility-services": {
    key: "facilityServices",
    icon: Sparkles,
    image: "/images/service-facility-v2.jpg",
    bulletCount: 6,
    useHomeProcess: false,
  },
  eventos: {
    key: "events",
    icon: Users,
    image: "/images/service-events-v3.jpg",
    bulletCount: 4,
    useHomeProcess: false,
  },
} satisfies Record<
  string,
  { key: string; icon: LucideIcon; image: string; bulletCount: number; useHomeProcess: boolean }
>;

type ServiceSlug = keyof typeof SERVICES;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const config = SERVICES[service as ServiceSlug];
  if (!config) return {};
  const t = await getTranslations("services");
  return {
    title: t(`${config.key}.title` as "distribution.title"),
    description: t(`${config.key}.description` as "distribution.description"),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const config = SERVICES[service as ServiceSlug];
  if (!config) notFound();

  const t = await getTranslations("services");
  const tDetail = await getTranslations("servicesDetail");
  const tHome = await getTranslations("home");
  const tAbout = await getTranslations("about");
  const Icon = config.icon;
  const key = config.key as
    | "distribution"
    | "facilityServices"
    | "events";

  const bullets = Array.from({ length: config.bulletCount }, (_, i) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t(`${key}.bullet${i + 1}` as any),
  );

  const steps = config.useHomeProcess
    ? [
        { title: tHome("process1Title"), text: tHome("process1Text") },
        { title: tHome("process2Title"), text: tHome("process2Text") },
        { title: tHome("process3Title"), text: tHome("process3Text") },
      ]
    : [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: tDetail(`${key}.process1Title` as any),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text: tDetail(`${key}.process1Text` as any),
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: tDetail(`${key}.process2Title` as any),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text: tDetail(`${key}.process2Text` as any),
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: tDetail(`${key}.process3Title` as any),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text: tDetail(`${key}.process3Text` as any),
        },
      ];

  const values = [
    { icon: ShieldCheck, label: tAbout("value1"), text: tAbout("value1Text") },
    { icon: Handshake, label: tAbout("value2"), text: tAbout("value2Text") },
    { icon: Heart, label: tAbout("value3"), text: tAbout("value3Text") },
  ];

  return (
    <div>
      <PageHero
        eyebrow={t(`${key}.tag` as "distribution.tag")}
        title={t(`${key}.title` as "distribution.title")}
        subtitle={t(`${key}.description` as "distribution.description")}
        icon={Icon}
        image={config.image}
        size="lg"
      />

      {/* Overview */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tDetail("backToServices")}
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl shadow-black/10">
            <Image
              src={config.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <span className="inline-flex items-center rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
              {t(`${key}.tag` as "distribution.tag")}
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              {t(`${key}.title` as "distribution.title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {t(`${key}.description` as "distribution.description")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {tDetail(`${key}.overviewExtra` as any)}
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-transform hover:-translate-y-0.5"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-brand-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("includesTitle")}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bullets.map((bullet, i) => (
              <Reveal
                key={bullet}
                delay={i * 40}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm shadow-black/3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-neutral-800">{bullet}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("processTitle")}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-lg font-black text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-brand-darker py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-white sm:text-3xl">{tDetail("whyTitle")}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: VIcon, label, text }, i) => (
              <Reveal
                key={label}
                delay={i * 100}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <VIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-white">{label}</h3>
                <p className="mt-2 text-sm text-white/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6">
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

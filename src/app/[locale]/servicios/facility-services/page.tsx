import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Sparkles, ArrowRight, ArrowLeft, Check, ShieldCheck, Handshake, Heart, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return { title: t("facilityServices.title"), description: t("facilityServices.description") };
}

export default async function FacilityServicesPage() {
  const t = await getTranslations("services");
  const tAbout = await getTranslations("about");
  const tDetail = await getTranslations("servicesDetail");

  const bullets = [
    t("facilityServices.bullet1"),
    t("facilityServices.bullet2"),
    t("facilityServices.bullet3"),
    t("facilityServices.bullet4"),
    t("facilityServices.bullet5"),
    t("facilityServices.bullet6"),
  ];

  const steps = [
    { title: tDetail("facilityServices.process1Title"), text: tDetail("facilityServices.process1Text") },
    { title: tDetail("facilityServices.process2Title"), text: tDetail("facilityServices.process2Text") },
    { title: tDetail("facilityServices.process3Title"), text: tDetail("facilityServices.process3Text") },
  ];

  const values = [
    { icon: ShieldCheck, label: tAbout("value1") },
    { icon: Handshake, label: tAbout("value2") },
    { icon: Heart, label: tAbout("value3") },
  ];

  return (
    <div>
      <PageHero
        eyebrow={t("facilityServices.tag")}
        title={t("facilityServices.title")}
        subtitle={t("facilityServices.description")}
        icon={Sparkles}
        image="/images/service-facility-v2.jpg"
        size="lg"
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tDetail("backToServices")}
        </Link>

        {/* Overview — photo collage */}
        <div className="mt-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-4/5 w-full">
              <div className="absolute inset-0 right-10 top-0 overflow-hidden rounded-3xl shadow-xl shadow-black/15">
                <Image
                  src="/images/service-facility-v2.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, 70vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-2xl shadow-xl shadow-black/20 ring-4 ring-white">
                <Image
                  src="/images/facility-glass.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="inline-flex items-center rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
              {t("facilityServices.tag")}
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
              {t("facilityServices.title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {t("facilityServices.description")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {tDetail("facilityServices.overviewExtra")}
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

      {/* Qué incluye — lista escalonada */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("includesTitle")}
            </h2>
          </Reveal>

          <div className="relative mt-14">
            <div
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-brand/20 sm:block"
              aria-hidden="true"
            />
            <div className="space-y-4">
              {bullets.map((bullet, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal
                    key={bullet}
                    delay={i * 60}
                    className={`flex sm:w-1/2 ${left ? "sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
                  >
                    <div
                      className={`flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-black/5 ${
                        left ? "" : "sm:flex-row-reverse sm:text-right"
                      }`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">{bullet}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona — tarjetas apiladas */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {tDetail("processTitle")}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-5">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 100}
                className="flex gap-6 rounded-2xl border-l-4 border-brand bg-white p-6 shadow-sm shadow-black/5"
              >
                <span className="shrink-0 text-3xl font-black text-brand/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-neutral-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-600">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + values */}
      <section className="bg-brand-darker py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Quote className="mx-auto h-10 w-10 text-white/30" aria-hidden="true" />
            <p className="mx-auto mt-4 max-w-2xl text-xl font-black leading-snug text-white sm:text-2xl">
              {tDetail("facilityServices.quote")}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/10 pt-10">
            {values.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-white/85">
                <Icon className="h-5 w-5 text-brand-light" aria-hidden="true" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
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

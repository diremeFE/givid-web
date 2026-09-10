import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import {
  Boxes,
  Sparkles,
  Ship,
  BadgePercent,
  MapPinned,
  ClipboardCheck,
  ArrowRight,
  Sparkle,
  MessageCircle,
  Mail,
  ArrowDown,
  ShoppingBasket,
  PackageCheck,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/i18n/routing";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tAbout = await getTranslations("about");
  const tServices = await getTranslations("services");
  const tProducts = await getTranslations("products");
  const locale = (await getLocale()) as Locale;
  const featured = await getFeaturedProducts(4);

  const currency = new Intl.NumberFormat(
    locale === "es" ? "es-ES" : locale === "fr" ? "fr-FR" : "en-US",
    { style: "currency", currency: "XAF", maximumFractionDigits: 0 },
  );

  return (
    <>
      {/* Hero */}
      <section data-hero className="relative overflow-hidden">
        <div className="relative flex min-h-140 flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:min-h-170 sm:px-6 sm:pt-32">
          <Image
            src="/images/hero-warehouse.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75" aria-hidden="true" />

          <Reveal className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25 backdrop-blur-sm">
              <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
              {t("heroBadge")}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl">
              {t("heroTitlePrefix")}{" "}
              <span className="relative text-accent-light">
                {t("heroTitleHighlight")}
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C40 2 160 2 198 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-darker shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                {t("ctaCatalog")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 py-1.5 pl-1.5 pr-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                {t("ctaContact")}
              </Link>
            </div>
          </Reveal>

          <div className="absolute bottom-6 left-6 hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/80 sm:flex">
            {t("heroScroll")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
          </div>

          <div className="absolute bottom-6 right-6 hidden gap-2 sm:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="overflow-hidden bg-accent py-3">
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-10 pr-10">
                {[
                  t("marquee1"),
                  t("marquee2"),
                  t("marquee3"),
                  t("marquee4"),
                  t("marquee5"),
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-10 text-sm font-bold uppercase tracking-wide text-white"
                  >
                    {item}
                    <Sparkle className="h-3.5 w-3.5 text-white/60" aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company intro */}
      <section className="bg-brand-lighter relative overflow-hidden py-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="dot-grid pointer-events-none absolute -left-2 top-16 h-64 w-20 text-brand-light sm:h-80 sm:w-28" aria-hidden="true" />
        <div className="dot-grid pointer-events-none absolute -right-2 bottom-0 h-40 w-24 text-brand-light sm:h-52 sm:w-32" aria-hidden="true" />

        {/* Centered heading */}
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <div
            className="mx-auto h-10 w-10 rounded-full bg-accent opacity-70 blur-xl"
            aria-hidden="true"
          />
          <p className="-mt-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-dark">
            {t("introEyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-neutral-900 sm:text-3xl">
            {t("introTitlePrefix")}{" "}
            <span className="relative inline-block whitespace-nowrap text-brand">
              {t("introTitleHighlight")}
              <svg
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent"
                aria-hidden="true"
              >
                <path
                  d="M2 9C40 2 160 2 198 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
        </Reveal>

        {/* Images + text grid */}
        <div className="relative mt-14 grid items-center gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          <Reveal className="relative mx-auto w-full max-w-sm px-6 py-6 lg:mx-0 lg:max-w-none">
            <div className="blob-shape relative aspect-square w-full overflow-hidden shadow-xl shadow-black/10 ring-4 ring-white">
              <Image
                src="/images/about-team.webp"
                alt="Equipo de GIVID"
                fill
                sizes="(min-width: 1024px) 35vw, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm leading-relaxed text-neutral-600">
              {tAbout("intro")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {t("introExtra")}
            </p>

            <div className="mt-8 space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                {t("introFocusTitle")}
              </p>
              {[
                { label: t("introFocus1Label"), value: t("introFocus1Value") },
                { label: t("introFocus2Label"), value: t("introFocus2Value") },
                { label: t("introFocus3Label"), value: t("introFocus3Value") },
              ].map((focus) => (
                <div key={focus.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-neutral-800">{focus.label}</span>
                    <span className="font-bold text-brand-dark">{focus.value}%</span>
                  </div>
                  <div className="relative mt-2 h-1.5 rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-brand-dark"
                      style={{ width: `${focus.value}%` }}
                    />
                    <span
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-brand-dark bg-white shadow"
                      style={{ left: `calc(${focus.value}% - 7px)` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/nosotros"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-transform hover:-translate-y-0.5"
            >
              {t("introCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-accent-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-dark">
                {tServices("pageTitle")}
              </span>
              <h2 className="mt-4 text-2xl font-black text-neutral-900 sm:text-3xl">
                {t("servicesTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-600 lg:pt-2 lg:text-right">
              {t("servicesSubtitle")} {tServices("homeShortDescription")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-12">
            <Reveal delay={0}>
              <ServiceCard
                icon={Boxes}
                image="/images/service-wholesale.webp"
                title={tServices("wholesale.title")}
                description={tServices("wholesale.description")}
                readMore={tServices("readMore")}
                href="/servicios"
              />
            </Reveal>
            <Reveal delay={100}>
              <ServiceCard
                icon={Sparkles}
                image="/images/service-maintenance.webp"
                title={tServices("maintenance.title")}
                description={tServices("maintenance.description")}
                readMore={tServices("readMore")}
                href="/servicios"
              />
            </Reveal>
            <Reveal delay={200}>
              <ServiceCard
                icon={Ship}
                image="/images/service-import.webp"
                title={tServices("import.title")}
                description={tServices("import.description")}
                readMore={tServices("readMore")}
                href="/servicios"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="relative mx-auto max-w-xl text-center">
          <div className="relative mx-auto mb-4 h-8 w-16 text-neutral-800" aria-hidden="true">
            <X className="absolute left-1 top-0 h-3 w-3 -rotate-12" />
            <X className="absolute left-5 top-2 h-4 w-4 rotate-6" />
            <X className="absolute left-10 top-0 h-3 w-3 rotate-12" />
            <X className="absolute left-3 top-5 h-2.5 w-2.5 rotate-45" />
            <X className="absolute left-8 top-5 h-2.5 w-2.5 -rotate-45" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
            {t("processTitle")}
          </h2>
          <p className="mt-3 text-neutral-600">{t("processSubtitle")}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-6">
          <ProcessStep
            index={1}
            icon={ShoppingBasket}
            title={t("process1Title")}
            text={t("process1Text")}
            startLabel={t("processStartLabel")}
            connector
          />
          <ProcessStep
            index={2}
            icon={MessageCircle}
            title={t("process2Title")}
            text={t("process2Text")}
            connector
          />
          <ProcessStep
            index={3}
            icon={PackageCheck}
            title={t("process3Title")}
            text={t("process3Text")}
          />
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-brand-gradient-soft py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                {t("featuredProductsTitle")}
              </h2>
              <p className="mt-2 max-w-2xl text-neutral-600">
                {t("featuredProductsSubtitle")}
              </p>
            </div>
            <Link
              href="/productos"
              className="hidden items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline sm:inline-flex"
            >
              {t("ctaCatalog")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          {featured.length === 0 ? (
            <p className="mt-8 rounded-xl border border-dashed border-border bg-white p-8 text-center text-neutral-500">
              {tProducts("noProducts")}
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, i) => (
                <Reveal key={product.id} delay={i * 80}>
                  <ProductCard
                    product={product}
                    locale={locale}
                    currency={currency}
                    orderLabel={tProducts("orderButton")}
                  />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {t("ctaCatalog")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-lighter py-20">
        <div className="mx-auto max-w-6xl overflow-visible px-4 sm:px-6">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">
              {t("whyUsTitle")}
            </h2>
            <p className="mt-3 text-sm text-neutral-600">{t("whyUsSubtitle")}</p>
            <Link
              href="/contacto"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-transform hover:-translate-y-0.5"
            >
              {t("ctaBannerButton")}
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 overflow-visible sm:grid-cols-3">
            <Reveal
              delay={100}
              className="relative z-10 flex flex-col items-center rounded-3xl bg-brand-darker p-6 text-center text-white shadow-xl shadow-brand-darker/30 sm:-my-3 sm:rotate-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <BadgePercent className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold">{t("whyUs1Title")}</h3>
              <p className="mt-2 text-sm text-white/75">{t("whyUs1Text")}</p>
            </Reveal>

            <Reveal
              delay={200}
              className="flex flex-col items-center rounded-3xl border border-border bg-white p-6 text-center shadow-sm shadow-black/3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                <MapPinned className="h-5 w-5 text-brand-dark" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900">{t("whyUs2Title")}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t("whyUs2Text")}</p>
            </Reveal>

            <Reveal
              delay={300}
              className="flex flex-col items-center rounded-3xl border border-border bg-white p-6 text-center shadow-sm shadow-black/3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                <ClipboardCheck className="h-5 w-5 text-brand-dark" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-neutral-900">{t("whyUs3Title")}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t("whyUs3Text")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
            {t("faqEyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-black text-neutral-900 sm:text-3xl">
            {t("faqTitle")}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {[
            { question: t("faq1Question"), answer: t("faq1Answer") },
            { question: t("faq2Question"), answer: t("faq2Answer") },
            { question: t("faq3Question"), answer: t("faq3Answer") },
            { question: t("faq4Question"), answer: t("faq4Answer") },
          ].map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details className="group rounded-2xl border border-border bg-white p-5 shadow-sm shadow-black/2 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-neutral-900">
                  {item.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-brand-dark transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <Reveal className="bg-brand-mesh relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl shadow-brand-darker/20 sm:py-20">
          <div className="bg-noise absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl">
              {t("ctaBannerTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              {t("ctaBannerText")}
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-darker shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              {t("ctaBannerButton")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ServiceCard({
  icon: Icon,
  image,
  title,
  description,
  readMore,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  title: string;
  description: string;
  readMore: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-brand/25 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/35"
    >
      <div className="relative h-44 overflow-hidden rounded-2xl m-3 mb-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute -bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark shadow-lg shadow-black/20 ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-7">
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
          {readMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function ProcessStep({
  index,
  icon: Icon,
  title,
  text,
  startLabel,
  connector = false,
}: {
  index: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  startLabel?: string;
  connector?: boolean;
}) {
  const isStart = Boolean(startLabel);

  return (
    <Reveal delay={(index - 1) * 100} className="relative text-center">
      <div className="mb-3 flex h-7 items-center justify-center">
        {isStart && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
            <ArrowDown className="h-3 w-3 -rotate-90" aria-hidden="true" />
            {startLabel}
          </span>
        )}
      </div>
      <div className={`relative mx-auto h-28 w-28 ${isStart ? "sm:h-32 sm:w-32" : ""}`}>
        {isStart && (
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" aria-hidden="true" />
        )}
        <span
          className={`absolute -left-1 -top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-md ring-1 ${
            isStart
              ? "bg-brand-dark text-white ring-brand-darker/30"
              : "bg-white text-neutral-800 ring-border"
          }`}
        >
          {index}
        </span>
        {isStart ? (
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-brand-dark shadow-xl shadow-brand-dark/30">
            <Icon className="h-9 w-9 text-white" aria-hidden="true" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-neutral-300 p-2.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-light">
              <Icon className="h-7 w-7 text-brand-dark" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
      <h3 className="mt-6 font-bold text-neutral-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-55 text-sm text-neutral-600">{text}</p>

      {connector && (
        <div
          className="absolute left-full top-24 hidden h-0.5 w-6 -translate-y-1/2 sm:block"
          aria-hidden="true"
        >
          <div className="h-full w-full border-t-2 border-dashed border-neutral-300" />
          {isStart && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-progress-line h-full w-full bg-brand-dark" />
            </div>
          )}
        </div>
      )}
    </Reveal>
  );
}


import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Boxes, Sparkles, Armchair, Package, ArrowRight, Check, PackageCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { pageAlternates, seoTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("services");
  const locale = (await getLocale()) as Locale;
  return {
    title: seoTitle("services", locale),
    description: t("pageSubtitle"),
    alternates: pageAlternates(locale, "/servicios"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tHome = await getTranslations("home");
  const tDetail = await getTranslations("servicesDetail");
  const locale = (await getLocale()) as Locale;

  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  });

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

  return (
    <div>
      <PageHero
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={Boxes}
        image="/images/servicios-hero.jpg"
        size="full"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <Reveal direction="left" className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/servicios-intro.jpg"
                alt="Equipo de GIVID cerrando un acuerdo comercial en almacén"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal direction="right" delay={100}>
              <span className="inline-flex items-center rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark">
                {t("aboutBadge")}
              </span>
              <h2 className="mt-4 text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
                {t("aboutTitle")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{t("aboutText1")}</p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{t("aboutText2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="distribucion" className="bg-brand-darker py-20 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Boxes}
            image="/images/givid-silkscreen.jpg"
            imageAlt="Serigrafía del logotipo GIVID sobre cajas de distribución"
            tag={t("distribution.tag")}
            title={t("distribution.title")}
            description={t("distribution.description")}
            bullets={[
              t("distribution.bullet1"),
              t("distribution.bullet2"),
              t("distribution.bullet3"),
              t("distribution.bullet4"),
              t("distribution.bullet5"),
              t("distribution.bullet6"),
              t("distribution.bullet7"),
              t("distribution.bullet8"),
              t("distribution.bullet9"),
              t("distribution.bullet10"),
              t("distribution.bullet11"),
              t("distribution.bullet12"),
              t("distribution.bullet13"),
            ]}
            highlighted
          />
        </div>
      </section>

      <section id="facility-services" className="bg-brand-light py-20 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Sparkles}
            image="/images/facility-services-team-entrance.jpg"
            imageAlt="Equipo de GIVID Facility Services en la entrada de un edificio corporativo"
            tag={t("facilityServices.tag")}
            title={t("facilityServices.title")}
            description={t("facilityServices.description")}
            bullets={[
              t("facilityServices.bullet1"),
              t("facilityServices.bullet2"),
              t("facilityServices.bullet3"),
              t("facilityServices.bullet4"),
              t("facilityServices.bullet5"),
              t("facilityServices.bullet6"),
              t("facilityServices.bullet7"),
              t("facilityServices.bullet8"),
            ]}
            reverse
          />
        </div>
      </section>

      <section id="events" className="py-20 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Armchair}
            image="/images/service-events-v3.jpg"
            imageAlt="Montaje de mobiliario para eventos"
            tag={t("events.tag")}
            title={t("events.title")}
            description={t("events.description")}
            bullets={[
              t("events.bullet1"),
              t("events.bullet2"),
              t("events.bullet3"),
            ]}
          />

          {/* Mobiliario de alquiler — seccion propia, a todo el ancho */}
          <Reveal className="mt-16 rounded-3xl bg-brand-lighter p-6 sm:p-10">
            <h3 className="text-xl font-black text-neutral-900 sm:text-2xl">
              {tDetail("events.furnitureTitle")}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
              {tDetail("events.furnitureIntro")}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {furniture.map((item, i) => (
                <Reveal
                  key={item.name}
                  direction="scale"
                  delay={i * 100}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm shadow-black/5"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-neutral-900">{item.name}</h4>

                    {item.prices.length > 0 ? (
                      <ul className="mt-2.5 space-y-1.5">
                        {item.prices.map((p) => (
                          <li key={p.label} className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500">{p.label}</span>
                            <span className="font-bold text-brand-dark">
                              {currency.format(p.amount)}
                              <span className="ml-1 font-normal text-neutral-400">{tDetail("events.perDay")}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2.5 text-sm font-semibold text-brand-dark">
                        {tDetail("events.priceOnRequestFurniture")}
                      </p>
                    )}

                    {item.availability && (
                      <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        <PackageCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                        {item.availability}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Package}
            image="/images/ownbrand-rice-production.jpg"
            imageAlt="Línea de envasado de arroz de marca propia GIVID"
            tag={t("ownBrand.tag")}
            title={t("ownBrand.title")}
            description={t("ownBrand.description")}
            bullets={[
              t("ownBrand.bullet1"),
              t("ownBrand.bullet2"),
              t("ownBrand.bullet3"),
              t("ownBrand.bullet4"),
            ]}
            reverse
          >
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { src: "/images/ownbrand-quality-control.jpg", alt: "Control de calidad de productos GIVID" },
                { src: "/images/ownbrand-warehouse-shelf.jpg", alt: "Almacén con productos de marca propia GIVID" },
                { src: "/images/ownbrand-labeling.jpg", alt: "Etiquetado de cajas con el logotipo GIVID" },
              ].map((img, i) => (
                <Reveal
                  key={img.alt}
                  direction="scale"
                  delay={200 + i * 80}
                  className="relative aspect-3/4 overflow-hidden rounded-xl border border-border"
                >
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 150px, 33vw" className="object-cover" />
                </Reveal>
              ))}
            </div>
          </ServiceBlock>

          <Reveal className="bg-brand-mesh relative mt-20 overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl shadow-brand-darker/20 sm:py-20">
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
        </div>
      </section>
    </div>
  );
}

function ServiceBlock({
  icon: Icon,
  image,
  imageAlt,
  tag,
  title,
  description,
  bullets,
  highlighted,
  reverse,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  imageAlt?: string;
  tag?: string;
  title: string;
  description: string;
  bullets: string[];
  highlighted?: boolean;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      <Reveal
        direction={reverse ? "right" : "left"}
        className={`relative aspect-4/3 overflow-hidden rounded-3xl ${reverse ? "lg:order-2" : ""}`}
      >
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>
      <Reveal direction={reverse ? "left" : "right"} delay={100} className={reverse ? "lg:order-1" : ""}>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            highlighted ? "bg-white/15" : "bg-brand-light"
          }`}
        >
          <Icon className={`h-6 w-6 ${highlighted ? "text-white" : "text-brand-dark"}`} aria-hidden="true" />
        </span>
        {tag && (
          <span
            className={`mt-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${
              highlighted ? "bg-white/15 text-white" : "bg-brand-light text-brand-dark"
            }`}
          >
            {tag}
          </span>
        )}
        <h2 className={`mt-4 text-2xl font-black leading-tight sm:text-3xl ${highlighted ? "text-white" : "text-neutral-900"}`}>
          {title}
        </h2>
        <p className={`mt-4 text-sm leading-relaxed ${highlighted ? "text-white/85" : "text-neutral-600"}`}>
          {description}
        </p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className={`flex items-start gap-2 text-sm ${
                highlighted ? "text-white/90" : "text-neutral-700"
              }`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                <Check className="h-3 w-3 text-white" aria-hidden="true" strokeWidth={3} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
        {children}
      </Reveal>
    </>
  );

  return <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">{content}</div>;
}

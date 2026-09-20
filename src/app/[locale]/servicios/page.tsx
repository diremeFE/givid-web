import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Boxes, Sparkles, Users, Package, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { CountUpStat } from "@/components/count-up-stat";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return { title: t("pageTitle") };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tHome = await getTranslations("home");

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={Boxes}
        image="/images/about-team.webp"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/placeholder.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={100}>
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

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: t("stat1Value"), label: t("stat1Label") },
              { value: t("stat2Value"), label: t("stat2Label") },
              { value: t("stat3Value"), label: t("stat3Label") },
              { value: t("stat4Value"), label: t("stat4Label") },
            ].map((stat, i) => (
              <CountUpStat key={stat.label} value={stat.value} label={stat.label} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Sparkles}
            image="/images/placeholder.jpg"
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
            ]}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Users}
            image="/images/placeholder.jpg"
            tag={t("events.tag")}
            title={t("events.title")}
            description={t("events.description")}
            bullets={[
              t("events.bullet1"),
              t("events.bullet2"),
              t("events.bullet3"),
              t("events.bullet4"),
            ]}
            reverse
          />
        </div>
      </section>

      <section className="bg-brand-darker py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Boxes}
            image="/images/placeholder.jpg"
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

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ServiceBlock
            icon={Package}
            image="/images/placeholder.jpg"
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
                { src: "/images/placeholder.jpg", alt: "GIVID Arroz" },
                { src: "/images/placeholder.jpg", alt: "GIVID Pants" },
                { src: "/images/placeholder.jpg", alt: "GIVID Toallitas" },
              ].map((img, i) => (
                <Reveal
                  key={img.alt}
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
      <Reveal className={`relative aspect-4/3 overflow-hidden rounded-3xl ${reverse ? "lg:order-2" : ""}`}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>
      <Reveal delay={100} className={reverse ? "lg:order-1" : ""}>
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

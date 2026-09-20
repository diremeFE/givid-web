import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Boxes, Sparkles, Users, Package, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
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

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
            <Reveal
              key={stat.label}
              delay={i * 60}
              className="rounded-2xl bg-neutral-100 p-6 text-center"
            >
              <p className="text-2xl font-black text-neutral-900 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 space-y-20">
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
            ]}
            highlighted
          />
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
              ].map((img) => (
                <div key={img.alt} className="relative aspect-3/4 overflow-hidden rounded-xl border border-border">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 150px, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </ServiceBlock>
        </div>

        <Reveal className="mt-16 rounded-2xl bg-accent p-8 text-center sm:p-10">
          <p className="text-lg font-semibold text-white">{t("ctaText")}</p>
          <Link
            href="/contacto"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent-dark shadow-md transition-transform hover:-translate-y-0.5"
          >
            {t("ctaButton")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
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
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted ? "text-white" : "text-brand"}`}
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>
        {children}
      </Reveal>
    </>
  );

  if (highlighted) {
    return (
      <div className="rounded-3xl bg-brand-gradient p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">{content}</div>
      </div>
    );
  }

  return <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">{content}</div>;
}

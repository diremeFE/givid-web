import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Boxes, Sparkles, Ship, ArrowRight, Check } from "lucide-react";
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
        <div className="space-y-8">
          <Reveal>
            <ServiceBlock
              icon={Boxes}
              image="/images/service-wholesale.webp"
              tag={t("wholesale.tag")}
              title={t("wholesale.title")}
              description={t("wholesale.description")}
              bullets={[
                t("wholesale.bullet1"),
                t("wholesale.bullet2"),
                t("wholesale.bullet3"),
                t("wholesale.bullet4"),
              ]}
              highlighted
            />
          </Reveal>
          <Reveal>
            <ServiceBlock
              icon={Sparkles}
              image="/images/service-maintenance.webp"
              title={t("maintenance.title")}
              description={t("maintenance.description")}
              bullets={[
                t("maintenance.bullet1"),
                t("maintenance.bullet2"),
                t("maintenance.bullet3"),
              ]}
            />
          </Reveal>
          <Reveal>
            <ServiceBlock
              icon={Ship}
              image="/images/service-import.webp"
              title={t("import.title")}
              description={t("import.description")}
              bullets={[
                t("import.bullet1"),
                t("import.bullet2"),
                t("import.bullet3"),
              ]}
            />
          </Reveal>
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
}: {
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  tag?: string;
  title: string;
  description: string;
  bullets: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg ${
        highlighted ? "border-brand/20" : "border-border"
      }`}
    >
      <div className="grid sm:grid-cols-[minmax(0,280px)_1fr]">
        <div className="relative h-44 sm:h-full">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 280px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div
          className={`flex flex-col gap-4 p-8 ${
            highlighted ? "bg-brand-gradient text-white" : "bg-white"
          }`}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              highlighted ? "bg-white/15" : "bg-brand-light"
            }`}
          >
            <Icon className={`h-6 w-6 ${highlighted ? "text-white" : "text-brand-dark"}`} />
          </span>
          <div>
            {tag && (
              <span
                className={`mb-2 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  highlighted ? "bg-white/20 text-white" : "bg-accent-light text-accent-dark"
                }`}
              >
                {tag}
              </span>
            )}
            <h2 className={`text-2xl font-bold ${highlighted ? "text-white" : "text-neutral-900"}`}>
              {title}
            </h2>
            <p className={`mt-3 max-w-3xl ${highlighted ? "text-white/85" : "text-neutral-600"}`}>
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
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      highlighted ? "text-white" : "text-brand"
                    }`}
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

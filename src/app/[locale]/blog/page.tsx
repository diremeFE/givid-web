import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Newspaper } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("blog");
  return { title: t("pageTitle") };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const tHome = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const posts = await getPublishedPosts();

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={Newspaper}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-neutral-500">
            {t("noPosts")}
          </p>
        ) : (
          <div className="space-y-5">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md"
                >
                  <h2 className="text-xl font-bold text-neutral-900">
                    {localizedField(post, "title", locale)}
                  </h2>
                  {localizedField(post, "excerpt", locale) && (
                    <p className="mt-2 text-neutral-600">
                      {localizedField(post, "excerpt", locale)}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

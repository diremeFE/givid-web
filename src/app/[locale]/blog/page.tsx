import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, Newspaper, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/generated/prisma/client";

export async function generateMetadata() {
  const t = await getTranslations("blog");
  const locale = (await getLocale()) as Locale;
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: pageAlternates(locale, "/blog"),
  };
}

function formatDate(date: Date | null, locale: Locale) {
  if (!date) return null;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function PostThumb({ post, alt, fill = true }: { post: BlogPost; alt: string; fill?: boolean }) {
  return post.coverImageUrl ? (
    <Image
      src={post.coverImageUrl}
      alt={alt}
      fill={fill}
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="bg-brand-gradient absolute inset-0 flex items-center justify-center">
      <Newspaper className="h-10 w-10 text-white/40" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const tHome = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHero
        eyebrow={tHome("heroTagline")}
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
        icon={Newspaper}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-neutral-500">
            {t("noPosts")}
          </p>
        ) : (
          <>
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg lg:grid-cols-2"
              >
                <div className="relative aspect-16/10 overflow-hidden lg:aspect-auto">
                  <PostThumb post={featured} alt={localizedField(featured, "title", locale)} />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  {formatDate(featured.publishedAt, locale) && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(featured.publishedAt, locale)}
                    </span>
                  )}
                  <h2 className="mt-4 text-2xl font-black leading-tight text-neutral-900 sm:text-3xl">
                    {localizedField(featured, "title", locale)}
                  </h2>
                  {localizedField(featured, "excerpt", locale) && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {localizedField(featured, "excerpt", locale)}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>

            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={i * 60}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm shadow-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="relative aspect-16/10 overflow-hidden">
                        <PostThumb post={post} alt={localizedField(post, "title", locale)} />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        {formatDate(post.publishedAt, locale) && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                            {formatDate(post.publishedAt, locale)}
                          </span>
                        )}
                        <h3 className="mt-2 text-lg font-bold leading-snug text-neutral-900">
                          {localizedField(post, "title", locale)}
                        </h3>
                        {localizedField(post, "excerpt", locale) && (
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                            {localizedField(post, "excerpt", locale)}
                          </p>
                        )}
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-dark">
                          {t("readMore")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

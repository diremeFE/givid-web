import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Newspaper } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getPostBySlug } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import { renderContent } from "@/lib/render-content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return {};

  const title = localizedField(post, "title", locale);
  const description = localizedField(post, "excerpt", locale);
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(post.publishedAt)
    : undefined;

  return (
    <div>
      <PageHero
        eyebrow={formattedDate}
        title={localizedField(post, "title", locale)}
        subtitle={localizedField(post, "excerpt", locale) || undefined}
        icon={Newspaper}
        image={post.coverImageUrl ?? undefined}
        size="lg"
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("backToBlog")}
          </Link>

          <div className="prose prose-neutral mt-6 max-w-none">
            {renderContent(localizedField(post, "content", locale))}
          </div>
        </Reveal>
      </article>
    </div>
  );
}

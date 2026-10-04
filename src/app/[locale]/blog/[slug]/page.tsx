import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Newspaper } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { getPostBySlug } from "@/lib/data";
import { localizedField } from "@/lib/localized";
import { renderContent, extractFaq } from "@/lib/render-content";
import { pageAlternates } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
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
    alternates: pageAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(post.publishedAt)
    : undefined;

  const postTitle = localizedField(post, "title", locale);
  const postContent = localizedField(post, "content", locale);
  const postUrl = `${siteConfig.siteUrl}/${locale}/blog/${slug}`;
  const faq = extractFaq(postContent);
  const faqSchema = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    headline: postTitle,
    description: localizedField(post, "excerpt", locale) ?? undefined,
    image: post.coverImageUrl ?? undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: siteConfig.brandName, url: siteConfig.siteUrl },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: { "@type": "ImageObject", url: `${siteConfig.siteUrl}/icon.png` },
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tNav("home"), path: "" },
          { name: tNav("blog"), path: "/blog" },
          { name: postTitle, path: `/blog/${slug}` },
        ]}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
            {renderContent(postContent)}
          </div>
        </Reveal>
      </article>
    </div>
  );
}

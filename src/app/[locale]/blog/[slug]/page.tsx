import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPostBySlug } from "@/lib/data";
import { localizedField } from "@/lib/localized";
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

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="mt-6 text-lg font-bold text-neutral-900">
            {block.slice(4)}
          </h3>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-8 text-xl font-black text-neutral-900 sm:text-2xl">
            {block.slice(3)}
          </h2>
        );
      }
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
        return (
          <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-600">
            {lines.map((item) => (
              <li key={item}>{item.slice(2)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="mt-3 leading-relaxed text-neutral-600">
          {block}
        </p>
      );
    });
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("backToBlog")}
      </Link>
      <h1 className="mt-4 text-3xl font-black text-neutral-900 sm:text-4xl">
        {localizedField(post, "title", locale)}
      </h1>
      {post.publishedAt && (
        <p className="mt-2 text-sm text-neutral-500">
          {new Intl.DateTimeFormat(locale).format(post.publishedAt)}
        </p>
      )}
      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt={localizedField(post, "title", locale)}
          className="mt-6 w-full rounded-lg object-cover"
        />
      )}
      <div className="prose prose-neutral mt-8 max-w-none">
        {renderContent(localizedField(post, "content", locale))}
      </div>
    </article>
  );
}

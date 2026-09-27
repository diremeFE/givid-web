import { renderContent } from "@/lib/render-content";

export function LegalPage({
  title,
  updatedAt,
  content,
}: {
  title: string;
  updatedAt: string;
  content: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-black text-neutral-900 sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{updatedAt}</p>
      <div className="prose prose-neutral mt-8 max-w-none">
        {renderContent(content)}
      </div>
    </article>
  );
}

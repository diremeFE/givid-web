import { FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { renderContent } from "@/lib/render-content";

export function LegalPage({
  eyebrow,
  title,
  updatedAt,
  content,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  content: string;
}) {
  return (
    <div>
      <PageHero eyebrow={eyebrow} title={title} icon={FileText} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-neutral-500">{updatedAt}</p>
        <div className="prose prose-neutral mt-4 max-w-none">
          {renderContent(content)}
        </div>
      </article>
    </div>
  );
}

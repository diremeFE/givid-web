import { Reveal } from "@/components/reveal";

export type FaqItem = { question: string; answer: string };

export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">{title}</h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {items.map((item, i) => (
            <Reveal
              key={item.question}
              delay={i * 60}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm shadow-black/3"
            >
              <h3 className="font-bold text-neutral-900">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

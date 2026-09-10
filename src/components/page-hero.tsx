import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  image,
  size = "md",
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  image?: string;
  size?: "md" | "lg";
  children?: React.ReactNode;
}) {
  return (
    <section
      data-hero
      className="relative flex min-h-105 items-center overflow-hidden sm:min-h-125"
    >
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="bg-brand-gradient absolute inset-0 opacity-90" />
        </>
      ) : (
        <div className="bg-brand-gradient absolute inset-0" />
      )}
      <div className="bg-noise absolute inset-0 opacity-30" />

      <Icon
        className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rotate-12 text-white/10 sm:h-64 sm:w-64"
        strokeWidth={1}
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto w-full max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white ring-1 ring-white/25">
          {eyebrow}
        </span>
        <h1
          className={`mx-auto mt-5 font-black tracking-tight text-white ${
            size === "lg" ? "max-w-3xl text-4xl sm:text-5xl" : "max-w-2xl text-3xl sm:text-4xl"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className={`mx-auto mt-4 max-w-2xl text-white/85 ${size === "lg" ? "text-lg" : ""}`}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}

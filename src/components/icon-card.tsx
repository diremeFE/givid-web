type IconCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
  as?: "div" | "li";
  heading?: "h2" | "h3";
  className?: string;
};

export function IconCard({
  icon: Icon,
  title,
  children,
  variant = "light",
  as = "div",
  heading = "h3",
  className = "",
}: IconCardProps) {
  const Tag = as;
  const Heading = heading;
  const isDark = variant === "dark";

  return (
    <Tag
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-white/10 bg-white/6 hover:border-white/20 hover:bg-white/9"
          : "border-border bg-white shadow-sm shadow-black/2 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
          isDark ? "bg-brand/20 opacity-0" : "bg-brand-light opacity-0"
        }`}
      />
      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${
          isDark
            ? "bg-white/10 ring-white/15"
            : "bg-linear-to-br from-brand-light to-white ring-brand/10"
        }`}
      >
        <Icon className={`h-5 w-5 ${isDark ? "text-brand-light" : "text-brand-dark"}`} />
      </span>
      <Heading className={`relative mt-4 font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>
        {title}
      </Heading>
      <div className={`relative mt-2 text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
        {children}
      </div>
    </Tag>
  );
}

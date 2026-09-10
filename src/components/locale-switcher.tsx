"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { FlagES, FlagFR, FlagGB } from "./flags";

const OPTIONS: Record<Locale, { label: string; short: string; Flag: React.ComponentType<{ className?: string }> }> = {
  es: { label: "Español", short: "ES", Flag: FlagES },
  en: { label: "English", short: "EN", Flag: FlagGB },
  fr: { label: "Français", short: "FR", Flag: FlagFR },
};

export function LocaleSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function selectLocale(loc: Locale) {
    setOpen(false);
    router.replace(
      // @ts-expect-error dynamic params passthrough
      { pathname, params },
      { locale: loc },
    );
  }

  const Current = OPTIONS[locale];
  const isDark = variant === "dark";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar idioma"
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          isDark
            ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
            : "border-border bg-white text-neutral-700 hover:bg-neutral-50"
        }`}
      >
        <Current.Flag className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" />
        {Current.short}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Idiomas disponibles"
          className={`absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border py-1 shadow-lg shadow-black/10 ${
            isDark
              ? "bg-brand-gradient border-white/15"
              : "border-border bg-white"
          }`}
        >
          {routing.locales.map((loc) => {
            const { label, Flag } = OPTIONS[loc];
            const active = loc === locale;
            return (
              <li key={loc} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLocale(loc)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                    isDark
                      ? active
                        ? "bg-white/15 font-semibold text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-brand-light font-semibold text-brand-dark"
                        : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <Flag className="h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-black/10" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

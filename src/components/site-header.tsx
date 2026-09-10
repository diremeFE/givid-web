"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useHeroCleared } from "@/lib/use-hero-cleared";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const solid = useHeroCleared(headerRef, pathname);

  const links = [
    { href: "/", label: t("home") },
    { href: "/nosotros", label: t("about") },
    { href: "/servicios", label: t("services") },
    { href: "/productos", label: t("products") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4 sm:py-5">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pl-2.5 pr-3 transition-all duration-300 sm:py-3 sm:pl-3 sm:pr-4 ${
          solid
            ? "bg-brand-gradient shadow-lg shadow-brand-darker/20"
            : "bg-black/25 shadow-lg shadow-black/10 ring-1 ring-white/15 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 pr-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/40">
            <Image src="/icon.png" alt="" width={64} height={64} className="h-full w-full object-cover" />
          </span>
          <span className="hidden text-xl font-black tracking-tight text-white sm:inline">
            GIVID
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher variant="dark" />
          <Link
            href="/contacto"
            className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-darker shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {t("contact")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="bg-brand-gradient mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl p-3 shadow-xl shadow-black/20 lg:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-white px-3 py-2.5 text-center text-sm font-semibold text-brand-darker"
          >
            {t("contact")}
          </Link>
          <div className="mt-2 flex justify-center border-t border-white/15 pt-3">
            <LocaleSwitcher variant="dark" />
          </div>
        </nav>
      )}
    </header>
  );
}

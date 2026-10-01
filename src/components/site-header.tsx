"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useHeroCleared } from "@/lib/use-hero-cleared";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const solid = useHeroCleared(headerRef, pathname);

  const serviceLinks = [
    { href: "/servicios#distribucion", label: tServices("distribution.title") },
    { href: "/servicios#facility-services", label: tServices("facilityServices.title") },
    { href: "/servicios#events", label: tServices("events.title") },
  ];

  const links = [
    { href: "/", label: t("home") },
    { href: "/nosotros", label: t("about") },
    { href: "/servicios", label: t("services"), submenu: serviceLinks },
    { href: "/productos", label: t("products") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-brand-gradient shadow-md shadow-black/10"
          : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
            <Image src="/icon.png" alt="" width={64} height={64} className="h-full w-full object-cover" />
          </span>
          <span className="hidden text-lg font-black tracking-tight text-white sm:inline">
            GIVID
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            if (link.submenu) {
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 py-1 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      active ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full bg-accent transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="bg-brand-gradient overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/30">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher variant="dark" />
          <Link
            href="/contacto"
            className="flex items-center gap-1.5 rounded-md bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-darker shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {t("contact")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="bg-brand-gradient flex flex-col gap-1 border-t border-white/10 px-4 py-4 shadow-xl shadow-black/20 lg:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            if (link.submenu) {
              return (
                <div key={link.href}>
                  <div
                    className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                      active ? "bg-white/10 text-white" : "text-white/80"
                    }`}
                  >
                    <Link href={link.href} onClick={() => setOpen(false)} className="flex-1">
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-label="Desplegar submenú de servicios"
                      aria-expanded={mobileServicesOpen}
                      className="p-1"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/15 pl-3">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md bg-white px-3 py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-brand-darker"
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

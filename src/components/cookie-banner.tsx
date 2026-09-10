"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/lib/use-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { consent, setConsent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || consent !== null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
          <Cookie className="h-5 w-5 text-brand-dark" aria-hidden="true" />
        </span>
        <h2 id="cookie-banner-title" className="mt-4 text-lg font-bold text-neutral-900">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{t("message")}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            {t("rejectButton")}
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
          >
            {t("acceptButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

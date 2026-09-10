"use client";

import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/lib/use-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { consent, setConsent } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="flex items-start gap-2.5 text-sm text-neutral-700">
          <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
          {t("message")}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            {t("rejectButton")}
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            {t("acceptButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

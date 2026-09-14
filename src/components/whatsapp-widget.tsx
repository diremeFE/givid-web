"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/site-config";

const STORAGE_KEY = "givid_whatsapp_widget_dismissed";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.37 4 14.98c0 2.16.58 4.26 1.68 6.11L3.9 28l7.08-1.76a12.9 12.9 0 0 0 5.03 1.01h.01c6.62 0 12.02-5.37 12.02-11.98C28.04 8.37 22.64 3 16.02 3Zm0 21.93h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.2 1.05 1.12-4.1-.24-.42a9.88 9.88 0 0 1-1.5-5.2c0-5.48 4.47-9.94 9.96-9.94 2.66 0 5.16 1.04 7.04 2.92a9.87 9.87 0 0 1 2.92 7.03c0 5.48-4.47 9.95-9.68 9.95Zm5.46-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5-.17 0-.37-.02-.57-.02s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const t = useTranslations("whatsappWidget");
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setMounted(true);
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end sm:bottom-6 sm:right-6 sm:items-start">
      {!dismissed && (
        <div className="relative mb-2 max-w-44 rounded-xl bg-white p-3 shadow-xl shadow-black/15 ring-1 ring-black/5 sm:mb-[-10px] sm:ml-2 sm:max-w-64 sm:rounded-2xl sm:p-4">
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("close")}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-500 shadow-md ring-1 ring-black/10 hover:text-neutral-800"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <a href={whatsappLink(t("message"))} target="_blank" rel="noopener noreferrer" className="block">
            <p className="text-xs font-bold text-neutral-900 sm:text-sm">{t("title")}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-neutral-600 sm:text-xs">{t("text")}</p>
          </a>
          <span
            className="absolute -bottom-1.5 right-6 h-4 w-4 rotate-45 rounded-[3px] bg-white sm:left-6 sm:right-auto"
            aria-hidden="true"
          />
        </div>
      )}

      <a
        href={whatsappLink(t("message"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("title")}
        className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14"
      >
        {!dismissed && (
          <span className="absolute inset-0 animate-ping rounded-2xl bg-[#25D366]/60" aria-hidden="true" />
        )}
        <WhatsAppIcon className="relative h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}

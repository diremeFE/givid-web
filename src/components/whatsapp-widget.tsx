"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
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
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || dismissed) return;
    const timer = setTimeout(() => setTyping(false), 1400);
    return () => clearTimeout(timer);
  }, [mounted, dismissed]);

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
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      {!dismissed && (
        <div className="relative mb-3 w-56 origin-bottom-right animate-[chat-pop_0.45s_cubic-bezier(0.16,1,0.3,1)] sm:w-72">
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("close")}
            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-500 shadow-md ring-1 ring-black/10 hover:text-neutral-800"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <a
            href={whatsappLink(t("message"))}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-2xl bg-[#e7f8ec] shadow-2xl shadow-black/25 ring-1 ring-black/5"
          >
            {/* Chat header, mimics a WhatsApp conversation */}
            <div className="flex items-center gap-2.5 bg-brand-darker px-3.5 py-2.5">
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/40">
                <Image src="/icon.png" alt="" width={32} height={32} className="h-full w-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#25D366] ring-2 ring-brand-darker" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">GIVID</p>
                <p className="text-[10px] text-white/70">{t("onlineLabel")}</p>
              </div>
            </div>

            {/* Message area */}
            <div className="px-3 pb-3 pt-3">
              <div className="relative inline-block max-w-full rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                {typing ? (
                  <span className="flex items-center gap-1 py-1" aria-label={t("typingLabel")}>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                  </span>
                ) : (
                  <>
                    <p className="text-[11px] font-bold leading-tight text-neutral-900">{t("title")}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">{t("text")}</p>
                    <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-neutral-400">
                      {t("timeLabel")}
                      <Check className="h-3 w-3 text-[#53bdeb]" strokeWidth={3} aria-hidden="true" />
                    </span>
                  </>
                )}
              </div>
            </div>
          </a>
        </div>
      )}

      <a
        href={whatsappLink(t("message"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("title")}
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-105"
      >
        {!dismissed && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" aria-hidden="true" />
        )}
        <WhatsAppIcon className="relative h-7 w-7" />
        {!dismissed && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            1
          </span>
        )}
      </a>
    </div>
  );
}

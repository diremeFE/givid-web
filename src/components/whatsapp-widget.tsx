import { getTranslations } from "next-intl/server";
import { whatsappLink } from "@/lib/site-config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.37 4 14.98c0 2.16.58 4.26 1.68 6.11L3.9 28l7.08-1.76a12.9 12.9 0 0 0 5.03 1.01h.01c6.62 0 12.02-5.37 12.02-11.98C28.04 8.37 22.64 3 16.02 3Zm0 21.93h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.2 1.05 1.12-4.1-.24-.42a9.88 9.88 0 0 1-1.5-5.2c0-5.48 4.47-9.94 9.96-9.94 2.66 0 5.16 1.04 7.04 2.92a9.87 9.87 0 0 1 2.92 7.03c0 5.48-4.47 9.95-9.68 9.95Zm5.46-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5-.17 0-.37-.02-.57-.02s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export async function WhatsAppWidget() {
  const t = await getTranslations("whatsappWidget");

  return (
    <a
      href={whatsappLink(t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-4 z-40 flex flex-col items-start sm:bottom-6 sm:right-6"
      aria-label={t("title")}
    >
      <div className="relative mb-[-10px] ml-2 max-w-56 rounded-2xl bg-white p-4 shadow-xl shadow-black/15 ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 sm:max-w-64">
        <p className="text-sm font-bold text-neutral-900">{t("title")}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{t("text")}</p>
        <span
          className="absolute -bottom-1.5 left-6 h-4 w-4 rotate-45 rounded-[3px] bg-white"
          aria-hidden="true"
        />
      </div>

      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-[#25D366]/60" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}

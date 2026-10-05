"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("request_failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1.5 w-full border-0 border-b-2 border-neutral-200 bg-transparent px-0 py-2 text-neutral-900 focus:border-brand focus:outline-none focus:ring-0";
  const labelClass = "text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t("nameLabel")} <span className="text-brand">*</span>
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phoneLabel")}
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t("emailLabel")} <span className="text-brand">*</span>
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          {t("serviceLabel")}
        </label>
        <select id="service" name="service" className={`${fieldClass} bg-white`}>
          <option value="facilityServices">{t("serviceFacilityServices")}</option>
          <option value="events">{t("serviceEvents")}</option>
          <option value="distribution">{t("serviceDistribution")}</option>
          <option value="other">{t("serviceOther")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("messageLabel")} <span className="text-brand">*</span>
        </label>
        <textarea id="message" name="message" rows={4} required className={fieldClass} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2.5 rounded-full bg-brand-dark px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-dark/20 transition-all hover:-translate-y-0.5 hover:bg-brand disabled:opacity-60"
      >
        {t("submitButton")}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
          <Send className="h-3 w-3" aria-hidden="true" />
        </span>
      </button>

      {status === "success" && (
        <p className="rounded-lg bg-brand-light p-3 text-sm text-brand-dark">
          {t("successMessage")}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {t("errorMessage")}
        </p>
      )}
    </form>
  );
}

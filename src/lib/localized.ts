import type { Locale } from "@/i18n/routing";

const SUFFIX: Record<Locale, string> = { es: "Es", en: "En", fr: "Fr" };

export function localizedField<T extends Record<string, unknown>>(
  entity: T,
  field: string,
  locale: Locale,
): string {
  const key = `${field}${SUFFIX[locale]}`;
  const value = entity[key];
  return typeof value === "string" ? value : "";
}

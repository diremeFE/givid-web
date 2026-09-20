export const siteConfig = {
  brandName: "GIVID",
  legalName: "Preser Gisvalida SL",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://givid-web.vercel.app",
  whatsappNumber: "240555779621",
  whatsappNumberDisplay: "+240 555 779 621",
  phoneSecondary: "240555801897",
  phoneSecondaryDisplay: "+240 555 801 897",
  email: "presergisvalida@yahoo.com",
  address: "C/ Timbabe, al lado del Hotel Timbabe, Malabo, Bioko Norte, Guinea Ecuatorial",
  hours: "Lunes a viernes, 8:00 - 17:00", // TODO: confirmar horario real con la clienta
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const siteConfig = {
  brandName: "GIVID",
  legalName: "Preser Gisvalida SL",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://givid-web.vercel.app",
  whatsappNumber: "240555246303",
  whatsappNumberDisplay: "+240 555 246 303",
  phoneSecondary: "240555246303",
  phoneSecondaryDisplay: "+240 555 246 303",
  email: "presergisvalida@yahoo.com",
  address: "C/ Timbabe, al lado del Hotel Timbabe, Malabo, Bioko Norte, Guinea Ecuatorial",
  executiveOfficeAddress: "Alcaide, Apartahotel Preguis, Malabo, Guinea Ecuatorial",
  hours: "Lunes a viernes, 8:00 - 17:00", // TODO: confirmar horario real con la clienta
  // TODO: rellenar con las URLs reales en cuanto las tengamos (refuerza el perfil de empresa en Google)
  googleBusinessProfileUrl: "",
  socialLinks: [] as string[],
  // TODO: coordenadas reales del local (Google Maps > clic derecho > "¿Qué hay aquí?")
  geo: undefined as { latitude: number; longitude: number } | undefined,
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

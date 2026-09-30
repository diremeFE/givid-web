import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata() {
  const t = await getTranslations("footer");
  return { title: t("cookiesPolicy") };
}

export default async function PoliticaCookiesPage() {
  const t = await getTranslations("footer");

  const content = `Esta política de cookies explica qué son las cookies, cuáles utiliza el sitio web de ${siteConfig.brandName} y cómo puedes gestionarlas.

## 1. Qué son las cookies

Las cookies son pequeños archivos de texto que un sitio web guarda en tu navegador. Sirven, entre otras cosas, para recordar tus preferencias, mejorar tu experiencia de navegación y, en algunos casos, obtener estadísticas de uso.

## 2. Cookies que utilizamos

- Cookie técnica de consentimiento: guarda tu elección sobre el aviso de cookies (aceptar o rechazar) para no volver a mostrártelo en cada visita. Es necesaria para el funcionamiento del sitio y no requiere consentimiento previo.
- Cookies analíticas (Google Analytics): actualmente no están activas en el sitio web. Si en el futuro se activan para conocer de forma anónima cómo se usa el sitio web (páginas visitadas, tiempo de permanencia, origen del tráfico), se solicitará tu consentimiento previo a través del aviso de cookies.

No utilizamos cookies de publicidad ni de seguimiento con fines comerciales de terceros.

## 3. Cómo gestionar o eliminar las cookies

Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo en cualquier momento desde la configuración de tu navegador:

- Google Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.
- Mozilla Firefox: Configuración > Privacidad y seguridad > Cookies y datos del sitio.
- Safari: Preferencias > Privacidad.
- Microsoft Edge: Configuración > Cookies y permisos del sitio.

Ten en cuenta que bloquear todas las cookies puede afectar al funcionamiento correcto de algunas partes del sitio web.

## 4. Cambio de tu elección

Si deseas cambiar tu decisión sobre las cookies después de haberla dado, puedes borrar los datos de navegación de este sitio web desde tu navegador; la próxima vez que nos visites volverá a mostrarse el aviso de cookies.

## 5. Más información

Si tienes cualquier duda sobre el uso de cookies en este sitio web, puedes escribirnos a ${siteConfig.email} o por WhatsApp al ${siteConfig.whatsappNumberDisplay}.`;

  return (
    <LegalPage
      eyebrow={t("legalTitle")}
      title={t("cookiesPolicy")}
      updatedAt="Última actualización: 27 de septiembre de 2026"
      content={content}
    />
  );
}

import { getTranslations, getLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata() {
  const t = await getTranslations("footer");
  const locale = (await getLocale()) as Locale;
  return {
    title: t("privacyPolicy"),
    alternates: pageAlternates(locale, "/politica-privacidad"),
    robots: { index: false, follow: true },
  };
}

export default async function PoliticaPrivacidadPage() {
  const t = await getTranslations("footer");

  const content = `En ${siteConfig.brandName} (${siteConfig.legalName}) nos comprometemos a proteger la privacidad de las personas que visitan este sitio web o se ponen en contacto con nosotros. Esta política explica qué datos recopilamos, con qué finalidad y qué derechos tienes sobre ellos.

## 1. Responsable del tratamiento

- Denominación social: ${siteConfig.legalName}
- Nombre comercial: ${siteConfig.brandName}
- NIF: 0069PG-19
- Dirección: ${siteConfig.address}
- Correo electrónico: ${siteConfig.email}

## 2. Qué datos recopilamos

- Datos que nos facilitas voluntariamente a través del formulario de contacto: nombre, correo electrónico, teléfono (opcional), servicio de interés y el mensaje que nos escribes.
- Datos que nos facilitas al contactarnos por WhatsApp, llamada o correo electrónico fuera del sitio web (tu número de teléfono, tu nombre y el contenido de la conversación).
- Datos técnicos de navegación mediante cookies propias (recordar tu elección sobre cookies) y, si se activan en el futuro, cookies analíticas de terceros como Google Analytics.

No recopilamos datos de pago ni de tarjetas bancarias, ya que el sitio web no realiza cobros ni ventas online.

## 3. Con qué finalidad tratamos tus datos

- Responder a tus consultas, presupuestos y pedidos enviados por el formulario de contacto, WhatsApp o correo electrónico.
- Gestionar la relación comercial con clientes, proveedores y distribuidores.
- Elaborar estadísticas anónimas de uso del sitio web, si se activan cookies analíticas.

## 4. Legitimación

La base legal para el tratamiento de tus datos es el consentimiento que nos das al rellenar el formulario de contacto o al escribirnos directamente, así como la ejecución de las gestiones necesarias para atender tu consulta o pedido.

## 5. Plazo de conservación

Conservamos tus datos mientras exista una relación comercial o de atención al cliente activa, y posteriormente durante el tiempo necesario para cumplir con obligaciones legales o resolver posibles responsabilidades.

## 6. A quién comunicamos tus datos

No vendemos ni cedemos tus datos a terceros con fines comerciales. Únicamente compartimos los datos estrictamente necesarios con proveedores tecnológicos que nos prestan servicio (alojamiento web y base de datos), y con WhatsApp / Meta cuando nos escribes por ese canal, sujeto a sus propias políticas de privacidad.

## 7. Transferencias internacionales

El sitio web se aloja en infraestructura de proveedores tecnológicos (Vercel y Neon) que pueden almacenar datos en servidores ubicados fuera de Guinea Ecuatorial. En estos casos, dichos proveedores aplican garantías adecuadas de protección de datos conforme a los estándares internacionales.

## 8. Tus derechos

Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad de tus datos, escribiéndonos a ${siteConfig.email} o a través de WhatsApp al ${siteConfig.whatsappNumberDisplay}, indicando el derecho que deseas ejercer y adjuntando un documento que acredite tu identidad.

## 9. Menores de edad

El sitio web no está dirigido a menores de edad. Si detectamos que se han recopilado datos de un menor sin el consentimiento de sus padres o tutores, procederemos a eliminarlos.

## 10. Cambios en esta política

Podemos actualizar esta política de privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. Te recomendamos revisarla periódicamente.`;

  return (
    <LegalPage
      eyebrow={t("legalTitle")}
      title={t("privacyPolicy")}
      updatedAt="Última actualización: 27 de septiembre de 2026"
      content={content}
    />
  );
}

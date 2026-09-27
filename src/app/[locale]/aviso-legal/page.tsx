import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata() {
  const t = await getTranslations("footer");
  return { title: t("legalNotice") };
}

export default async function AvisoLegalPage() {
  const t = await getTranslations("footer");

  const content = `Este aviso legal regula el acceso y uso del sitio web ${siteConfig.siteUrl} (en adelante, "el sitio web"), del que es titular ${siteConfig.legalName} (marca comercial "${siteConfig.brandName}").

## 1. Datos identificativos del titular

- Denominación social: ${siteConfig.legalName}
- Nombre comercial: ${siteConfig.brandName}
- NIF / RUC: [dato pendiente de facilitar por la clienta]
- Nº de inscripción en el Registro Mercantil de Guinea Ecuatorial: [dato pendiente de facilitar por la clienta]
- Domicilio social / dirección de la actividad: ${siteConfig.address}
- Correo electrónico de contacto: ${siteConfig.email}
- Teléfono / WhatsApp: ${siteConfig.whatsappNumberDisplay}

## 2. Objeto y ámbito de aplicación

El sitio web tiene carácter informativo: presenta los servicios de ${siteConfig.brandName} (limpieza y mantenimiento, azafatas y eventos, y distribución mayorista) y un catálogo orientativo de productos. El sitio web no dispone de venta ni contratación online: los pedidos y presupuestos se gestionan siempre de forma directa por WhatsApp, correo electrónico o en la tienda física, donde se confirman precio, disponibilidad y condiciones finales.

## 3. Condiciones de uso

El acceso al sitio web es gratuito y no exige registro previo. El usuario se compromete a hacer un uso lícito y correcto del sitio web, de sus contenidos y servicios, y a no utilizarlo con fines fraudulentos o lesivos para los derechos e intereses de terceros.

## 4. Catálogo y precios

Los productos, categorías y precios mostrados en el catálogo tienen carácter orientativo y pueden variar sin previo aviso en función de la disponibilidad, el tipo de cambio y las condiciones del proveedor. La navegación por el catálogo no constituye una compra ni genera ninguna obligación contractual: el pedido solo se considera confirmado cuando ${siteConfig.brandName} lo valida expresamente por WhatsApp, correo electrónico o en tienda.

## 5. Propiedad intelectual e industrial

Los textos, imágenes, marcas, logotipos y demás contenidos del sitio web son propiedad de ${siteConfig.legalName} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial aplicable. Queda prohibida su reproducción, distribución o transformación sin autorización previa y expresa.

## 6. Enlaces a terceros

El sitio web puede incluir enlaces a servicios de terceros (por ejemplo, WhatsApp o Google Maps) para facilitar el contacto y la localización de la tienda física. ${siteConfig.brandName} no se hace responsable del contenido ni de las políticas de privacidad de dichos sitios de terceros.

## 7. Exclusión de responsabilidad

${siteConfig.brandName} no garantiza la disponibilidad y continuidad permanente del sitio web, y no se responsabiliza de los daños derivados de la falta de disponibilidad, de errores en los contenidos o de un uso indebido del sitio web por parte del usuario.

## 8. Legislación aplicable

Las presentes condiciones se rigen por la legislación de la República de Guinea Ecuatorial. Para cualquier controversia derivada del uso del sitio web, las partes se someterán a los juzgados y tribunales competentes según la normativa aplicable.

## 9. Modificaciones

${siteConfig.brandName} se reserva el derecho a modificar el presente aviso legal para adaptarlo a novedades legislativas o cambios en la actividad de la empresa. Recomendamos revisar esta página periódicamente.`;

  return (
    <LegalPage
      title={t("legalNotice")}
      updatedAt="Última actualización: 27 de septiembre de 2026"
      content={content}
    />
  );
}

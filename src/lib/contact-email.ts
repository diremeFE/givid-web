import { siteConfig } from "@/lib/site-config";

type ContactNotification = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

const SERVICE_LABELS: Record<string, string> = {
  facilityServices: "GIVID Facility Services (limpieza y mantenimiento)",
  events: "GIVID Events (azafatas y mobiliario)",
  distribution: "GIVID Distribution (venta al por mayor)",
  other: "Otro / No especificado",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-top:1px solid #e3e8e5;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b7a72;">${label}</p>
        <p style="margin:4px 0 0;font-size:15px;color:#14201a;">${value}</p>
      </td>
    </tr>`;
}

export function contactNotificationHtml({ name, email, phone, service, message }: ContactNotification) {
  const serviceLabel = service ? (SERVICE_LABELS[service] ?? service) : null;

  return `
<!doctype html>
<html lang="es">
  <body style="margin:0;padding:32px 16px;background-color:#f4faf7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
      <tr>
        <td style="border-radius:16px 16px 0 0;background:linear-gradient(135deg,#0b3a22 0%,#1c7a4a 55%,#2f9463 100%);padding:28px 32px;">
          <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:-0.01em;color:#ffffff;">GIVID</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">Nuevo mensaje de contacto desde gisvalida.com</p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:8px 32px 32px;border-radius:0 0 16px 16px;box-shadow:0 1px 3px rgba(11,58,34,0.08);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Nombre", escapeHtml(name))}
            ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#10502f;text-decoration:none;">${escapeHtml(email)}</a>`)}
            ${phone ? row("Teléfono", escapeHtml(phone)) : ""}
            ${serviceLabel ? row("Servicio de interés", escapeHtml(serviceLabel)) : ""}
          </table>

          <p style="margin:20px 0 6px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b7a72;">Mensaje</p>
          <div style="margin-top:4px;padding:16px;background:#f4faf7;border-radius:12px;font-size:14px;line-height:1.6;color:#14201a;white-space:pre-wrap;">${escapeHtml(message)}</div>

          <a
            href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: tu mensaje a GIVID`)}"
            style="display:inline-block;margin-top:24px;padding:12px 24px;background:#10502f;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:999px;"
          >
            Responder a ${escapeHtml(name.split(" ")[0] ?? name)}
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 8px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#8a978f;">
            Enviado automáticamente desde el formulario de contacto de
            <a href="${siteConfig.siteUrl}" style="color:#10502f;">${siteConfig.siteUrl.replace("https://", "")}</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

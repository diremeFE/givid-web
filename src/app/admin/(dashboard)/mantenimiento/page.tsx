import { prisma } from "@/lib/prisma";
import { saveMaintenanceLog } from "./actions";

const CHECK_ITEMS = [
  { key: "contactFormOk", label: "Formulario de contacto funciona", auto: true },
  { key: "brokenLinksOk", label: "Sin enlaces rotos", auto: true },
  { key: "languagesOk", label: "Las 4 versiones de idioma están bien", auto: true },
  { key: "sslOk", label: "Certificado SSL válido", auto: true },
  { key: "speedOk", label: "Velocidad de carga revisada", auto: true },
  {
    key: "searchConsoleOk",
    label: "Search Console revisado (sin errores de indexación)",
    auto: false,
  },
  { key: "securityUpdatesOk", label: "Dependencias actualizadas (parches de seguridad)", auto: true },
  { key: "backupsOk", label: "Copias de seguridad recientes verificadas", auto: true },
] as const;

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonth(month: string) {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1, 1);
  return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

export default async function MantenimientoPage() {
  const month = currentMonth();
  const [current, history] = await Promise.all([
    prisma.maintenanceLog.findUnique({ where: { month } }),
    prisma.maintenanceLog.findMany({
      where: { month: { not: month } },
      orderBy: { month: "desc" },
      take: 12,
    }),
  ]);

  const checkedCount = CHECK_ITEMS.filter(
    (item) => current?.[item.key as keyof typeof current],
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Mantenimiento</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Checklist de la revisión mensual prometida en el contrato de mantenimiento. Las
        casillas marcadas como <span className="font-semibold text-brand-dark">automático</span>{" "}
        las rellena solas la comprobación mensual (día 1 de cada mes); la de Search Console es
        manual porque requiere revisar tu cuenta de Google. Puedes corregir cualquier casilla
        a mano si hace falta.
      </p>

      <div className="mt-6 max-w-2xl rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold capitalize text-neutral-900">
            {formatMonth(month)}
          </h2>
          <span className="text-sm text-neutral-500">
            {checkedCount}/{CHECK_ITEMS.length} completado
          </span>
        </div>

        <form action={saveMaintenanceLog.bind(null, month)} className="mt-5 space-y-4">
          <div className="space-y-3">
            {CHECK_ITEMS.map((item) => (
              <label key={item.key} className="flex items-center gap-3 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  name={item.key}
                  defaultChecked={Boolean(current?.[item.key as keyof typeof current])}
                  className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand"
                />
                {item.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                    item.auto ? "bg-brand-light text-brand-dark" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.auto ? "automático" : "manual"}
                </span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Notas (opcional)
            </label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={current?.notes ?? ""}
              placeholder="Incidencias encontradas, acciones realizadas, etc."
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Guardar revisión
          </button>

          {current?.completedAt && (
            <p className="text-xs text-neutral-400">
              Marcada como completa el{" "}
              {current.completedAt.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          )}
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Historial
        </h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="px-4 py-3">Mes</th>
                <th className="px-4 py-3">Completado</th>
                <th className="px-4 py-3">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {history.map((log) => {
                const done = CHECK_ITEMS.filter(
                  (item) => log[item.key as keyof typeof log],
                ).length;
                return (
                  <tr key={log.id}>
                    <td className="px-4 py-3 font-medium capitalize text-neutral-800">
                      {formatMonth(log.month)}
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {done}/{CHECK_ITEMS.length}
                      {log.completedAt ? " ✓" : ""}
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{log.notes || "—"}</td>
                  </tr>
                );
              })}
              {history.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-neutral-400">
                    Todavía no hay revisiones de meses anteriores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

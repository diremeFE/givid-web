import { prisma } from "@/lib/prisma";
import { markAsRead, deleteMessage } from "./actions";

const SERVICE_LABELS: Record<string, string> = {
  wholesale: "Comercialización al por mayor",
  maintenance: "Mantenimiento",
  import: "Gestión de importación",
  other: "Otro",
};

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">
        Mensajes de contacto
      </h1>

      <div className="mt-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg border p-5 ${
              message.read
                ? "border-neutral-200 bg-white"
                : "border-brand bg-brand-light"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-neutral-900">
                  {message.name}{" "}
                  <span className="font-normal text-neutral-500">
                    &lt;{message.email}&gt;
                  </span>
                </p>
                <p className="text-xs text-neutral-500">
                  {new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(message.createdAt)}
                  {message.phone && ` · ${message.phone}`}
                  {message.service &&
                    ` · ${SERVICE_LABELS[message.service] ?? message.service}`}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                {!message.read && (
                  <form action={markAsRead.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="font-medium text-brand-dark hover:underline"
                    >
                      Marcar como leído
                    </button>
                  </form>
                )}
                <form action={deleteMessage.bind(null, message.id)}>
                  <button
                    type="submit"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
              {message.message}
            </p>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="rounded border border-dashed border-neutral-300 p-8 text-center text-neutral-400">
            Todavía no hay mensajes.
          </p>
        )}
      </div>
    </div>
  );
}

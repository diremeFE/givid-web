import type { Category } from "@/generated/prisma/client";

export function CategoryForm({
  action,
  category,
}: {
  action: (formData: FormData) => void;
  category?: Category;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Nombre (Español)
        </label>
        <input
          name="nameEs"
          defaultValue={category?.nameEs}
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Nombre (Inglés)
        </label>
        <input
          name="nameEn"
          defaultValue={category?.nameEn}
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Nombre (Francés)
        </label>
        <input
          name="nameFr"
          defaultValue={category?.nameFr}
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Slug (opcional, se genera automáticamente)
        </label>
        <input
          name="slug"
          defaultValue={category?.slug}
          placeholder="alimentacion"
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>
      <button
        type="submit"
        className="rounded bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Guardar
      </button>
    </form>
  );
}

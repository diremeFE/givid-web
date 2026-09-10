import type { Category, Product } from "@/generated/prisma/client";

export function ProductForm({
  action,
  product,
  categories,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  categories: Category[];
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Nombre (ES)
          </label>
          <input
            name="nameEs"
            defaultValue={product?.nameEs}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Nombre (EN)
          </label>
          <input
            name="nameEn"
            defaultValue={product?.nameEn}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Nombre (FR)
          </label>
          <input
            name="nameFr"
            defaultValue={product?.nameFr}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Descripción (ES)
          </label>
          <textarea
            name="descriptionEs"
            defaultValue={product?.descriptionEs ?? ""}
            rows={2}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Descripción (EN)
          </label>
          <textarea
            name="descriptionEn"
            defaultValue={product?.descriptionEn ?? ""}
            rows={2}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Descripción (FR)
          </label>
          <textarea
            name="descriptionFr"
            defaultValue={product?.descriptionFr ?? ""}
            rows={2}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Precio (XAF)
          </label>
          <input
            type="number"
            name="price"
            step="1"
            min="0"
            defaultValue={product?.price}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Formato / unidad
          </label>
          <input
            name="unit"
            placeholder="saco 25kg, caja, unidad..."
            defaultValue={product?.unit}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Categoría
          </label>
          <select
            name="categoryId"
            defaultValue={product?.categoryId}
            required
            className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEs}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            URL de imagen (opcional)
          </label>
          <input
            name="imageUrl"
            defaultValue={product?.imageUrl ?? ""}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Slug (opcional, se genera automáticamente)
        </label>
        <input
          name="slug"
          defaultValue={product?.slug}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={product?.isActive ?? true}
          className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand"
        />
        Visible en el catálogo
      </label>

      <button
        type="submit"
        className="rounded bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Guardar
      </button>
    </form>
  );
}

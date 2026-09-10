import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "./actions";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { nameEs: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Categorías</h1>
        <Link
          href="/admin/categorias/nueva"
          className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Nueva categoría
        </Link>
      </div>

      {error === "has_products" && (
        <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">
          No se puede eliminar: hay productos asociados a esta categoría.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Nombre (ES)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Productos</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 font-medium text-neutral-800">
                  {category.nameEs}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {category.slug}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {category._count.products}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/categorias/${category.id}/editar`}
                      className="font-medium text-brand-dark hover:underline"
                    >
                      Editar
                    </Link>
                    <form action={deleteCategory.bind(null, category.id)}>
                      <button
                        type="submit"
                        className="font-medium text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no hay categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3 font-medium text-neutral-800">
                  {product.nameEs}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {product.category.nameEs}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {currency.format(product.price)} / {product.unit}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {product.isActive ? "Visible" : "Oculto"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/productos/${product.id}/editar`}
                      className="font-medium text-brand-dark hover:underline"
                    >
                      Editar
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
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
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no hay productos. Añade la primera categoría y
                  luego crea productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

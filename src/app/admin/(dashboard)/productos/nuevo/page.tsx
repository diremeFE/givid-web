import { prisma } from "@/lib/prisma";
import { ProductForm } from "../product-form";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { nameEs: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Nuevo producto</h1>
      {categories.length === 0 ? (
        <p className="mt-6 rounded bg-amber-50 p-4 text-sm text-amber-800">
          Antes de crear un producto, crea al menos una categoría.
        </p>
      ) : (
        <div className="mt-6">
          <ProductForm action={createProduct} categories={categories} />
        </div>
      )}
    </div>
  );
}

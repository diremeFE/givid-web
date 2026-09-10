import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../../product-form";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { nameEs: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Editar producto</h1>
      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          product={product}
          categories={categories}
        />
      </div>
    </div>
  );
}

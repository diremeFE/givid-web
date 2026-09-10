import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "../../category-form";
import { updateCategory } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">
        Editar categoría
      </h1>
      <div className="mt-6">
        <CategoryForm
          action={updateCategory.bind(null, category.id)}
          category={category}
        />
      </div>
    </div>
  );
}

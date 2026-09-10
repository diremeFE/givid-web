"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readCategoryForm(formData: FormData) {
  const nameEs = String(formData.get("nameEs") || "").trim();
  const nameEn = String(formData.get("nameEn") || "").trim();
  const nameFr = String(formData.get("nameFr") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugify(slugInput || nameEs);
  return { nameEs, nameEn, nameFr, slug };
}

export async function createCategory(formData: FormData) {
  const data = readCategoryForm(formData);
  await prisma.category.create({ data });
  revalidatePath("/admin/categorias");
  revalidatePath("/[locale]/productos", "page");
  redirect("/admin/categorias");
}

export async function updateCategory(id: string, formData: FormData) {
  const data = readCategoryForm(formData);
  await prisma.category.update({ where: { id }, data });
  revalidatePath("/admin/categorias");
  revalidatePath("/[locale]/productos", "page");
  redirect("/admin/categorias");
}

export async function deleteCategory(id: string) {
  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });
  if (productCount > 0) {
    redirect("/admin/categorias?error=has_products");
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

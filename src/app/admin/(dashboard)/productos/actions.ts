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

function readProductForm(formData: FormData) {
  const nameEs = String(formData.get("nameEs") || "").trim();
  const nameEn = String(formData.get("nameEn") || "").trim();
  const nameFr = String(formData.get("nameFr") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const descriptionEs = String(formData.get("descriptionEs") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionFr = String(formData.get("descriptionFr") || "").trim();
  const price = Number(formData.get("price") || 0);
  const unit = String(formData.get("unit") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const isActive = formData.get("isActive") === "on";

  return {
    nameEs,
    nameEn,
    nameFr,
    slug: slugify(slugInput || nameEs),
    descriptionEs: descriptionEs || null,
    descriptionEn: descriptionEn || null,
    descriptionFr: descriptionFr || null,
    price,
    unit,
    imageUrl: imageUrl || null,
    categoryId,
    isActive,
  };
}

export async function createProduct(formData: FormData) {
  const data = readProductForm(formData);
  await prisma.product.create({ data });
  revalidatePath("/admin/productos");
  revalidatePath("/[locale]/productos", "page");
  revalidatePath("/[locale]", "page");
  redirect("/admin/productos");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = readProductForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/productos");
  revalidatePath("/[locale]/productos", "page");
  revalidatePath("/[locale]", "page");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/productos");
  revalidatePath("/[locale]/productos", "page");
  redirect("/admin/productos");
}

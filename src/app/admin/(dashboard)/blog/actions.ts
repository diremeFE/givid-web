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

function readPostForm(formData: FormData) {
  const titleEs = String(formData.get("titleEs") || "").trim();
  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleFr = String(formData.get("titleFr") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerptEs = String(formData.get("excerptEs") || "").trim();
  const excerptEn = String(formData.get("excerptEn") || "").trim();
  const excerptFr = String(formData.get("excerptFr") || "").trim();
  const contentEs = String(formData.get("contentEs") || "").trim();
  const contentEn = String(formData.get("contentEn") || "").trim();
  const contentFr = String(formData.get("contentFr") || "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") || "").trim();
  const published = formData.get("published") === "on";

  return {
    titleEs,
    titleEn,
    titleFr,
    slug: slugify(slugInput || titleEs),
    excerptEs: excerptEs || null,
    excerptEn: excerptEn || null,
    excerptFr: excerptFr || null,
    contentEs,
    contentEn,
    contentFr,
    coverImageUrl: coverImageUrl || null,
    published,
    publishedAt: published ? new Date() : null,
  };
}

export async function createPost(formData: FormData) {
  const data = readPostForm(formData);
  await prisma.blogPost.create({ data });
  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const data = readPostForm(formData);
  const existing = await prisma.blogPost.findUnique({ where: { id } });

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      // keep original publish date if it was already published
      publishedAt:
        existing?.published && data.published
          ? existing.publishedAt
          : data.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  redirect("/admin/blog");
}

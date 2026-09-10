import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { nameEs: "asc" } });
}

export function getProducts(categorySlug?: string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    include: { category: true },
    orderBy: { nameEs: "asc" },
  });
}

export function getFeaturedProducts(limit = 4) {
  return prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

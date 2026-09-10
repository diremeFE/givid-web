import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [products, categories, posts, unreadMessages] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Productos", value: products },
    { label: "Categorías", value: categories },
    { label: "Artículos de blog", value: posts },
    { label: "Mensajes sin leer", value: unreadMessages },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Resumen</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-black text-brand-dark">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

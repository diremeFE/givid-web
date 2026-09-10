import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Noticias</h1>
        <Link
          href="/admin/blog/nuevo"
          className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Nuevo artículo
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 font-medium text-neutral-800">
                  {post.titleEs}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {post.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/blog/${post.id}/editar`}
                      className="font-medium text-brand-dark hover:underline"
                    >
                      Editar
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
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
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-neutral-400">
                  Todavía no hay artículos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../../post-form";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Editar artículo</h1>
      <div className="mt-6">
        <PostForm action={updatePost.bind(null, post.id)} post={post} />
      </div>
    </div>
  );
}

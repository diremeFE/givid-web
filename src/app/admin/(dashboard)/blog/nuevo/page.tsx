import { PostForm } from "../post-form";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Nuevo artículo</h1>
      <div className="mt-6">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}

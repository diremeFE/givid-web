import type { BlogPost } from "@/generated/prisma/client";

export function PostForm({
  action,
  post,
}: {
  action: (formData: FormData) => void;
  post?: BlogPost;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Título (ES)" name="titleEs" defaultValue={post?.titleEs} required />
        <Field label="Título (EN)" name="titleEn" defaultValue={post?.titleEn} required />
        <Field label="Título (FR)" name="titleFr" defaultValue={post?.titleFr} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <TextAreaField label="Extracto (ES)" name="excerptEs" defaultValue={post?.excerptEs ?? ""} rows={2} />
        <TextAreaField label="Extracto (EN)" name="excerptEn" defaultValue={post?.excerptEn ?? ""} rows={2} />
        <TextAreaField label="Extracto (FR)" name="excerptFr" defaultValue={post?.excerptFr ?? ""} rows={2} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <TextAreaField label="Contenido (ES)" name="contentEs" defaultValue={post?.contentEs} rows={8} required />
        <TextAreaField label="Contenido (EN)" name="contentEn" defaultValue={post?.contentEn} rows={8} required />
        <TextAreaField label="Contenido (FR)" name="contentFr" defaultValue={post?.contentFr} rows={8} required />
      </div>

      <Field
        label="URL de imagen de portada (opcional)"
        name="coverImageUrl"
        defaultValue={post?.coverImageUrl ?? ""}
      />

      <Field
        label="Slug (opcional, se genera automáticamente)"
        name="slug"
        defaultValue={post?.slug}
      />

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand"
        />
        Publicado
      </label>

      <button
        type="submit"
        className="rounded bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Guardar
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}

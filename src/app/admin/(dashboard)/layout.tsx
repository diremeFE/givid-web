import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Tags,
  Newspaper,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { logoutAction } from "../login/actions";

const links = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: Tags },
  { href: "/admin/blog", label: "Noticias", icon: Newspaper },
  { href: "/admin/mensajes", label: "Mensajes", icon: MessageSquare },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-border bg-white">
        <div className="border-b border-border px-4 py-4">
          <Image
            src="/logo.png"
            alt="GIVID — Preser Gisvalida SL"
            width={752}
            height={289}
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-brand-light hover:text-brand-dark"
            >
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="p-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Cerrar sesión
          </button>
        </form>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}

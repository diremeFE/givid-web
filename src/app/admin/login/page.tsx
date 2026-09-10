"use client";

import Image from "next/image";
import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-gradient px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-xl">
        <Image
          src="/logo.png"
          alt="GIVID — Preser Gisvalida SL"
          width={752}
          height={289}
          className="h-9 w-auto"
        />
        <h1 className="mt-6 text-lg font-bold text-neutral-900">
          Panel de administración
        </h1>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

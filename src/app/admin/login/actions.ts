"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Introduce tu correo y contraseña." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return { error: "Credenciales incorrectas." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Credenciales incorrectas." };
  }

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markAsRead(id: string) {
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/mensajes");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/mensajes");
}

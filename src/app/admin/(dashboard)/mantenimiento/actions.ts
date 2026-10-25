"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const CHECK_FIELDS = [
  "contactFormOk",
  "brokenLinksOk",
  "languagesOk",
  "sslOk",
  "speedOk",
  "searchConsoleOk",
  "securityUpdatesOk",
  "backupsOk",
] as const;

export async function saveMaintenanceLog(month: string, formData: FormData) {
  const data = Object.fromEntries(
    CHECK_FIELDS.map((field) => [field, formData.get(field) === "on"]),
  );
  const notes = String(formData.get("notes") || "").trim() || null;
  const allChecked = CHECK_FIELDS.every((field) => data[field]);

  await prisma.maintenanceLog.upsert({
    where: { month },
    create: {
      month,
      ...data,
      notes,
      completedAt: allChecked ? new Date() : null,
    },
    update: {
      ...data,
      notes,
      completedAt: allChecked ? new Date() : null,
    },
  });

  revalidatePath("/admin/mantenimiento");
}

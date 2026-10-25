import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const checkSchema = z.object({
  contactFormOk: z.boolean(),
  brokenLinksOk: z.boolean(),
  languagesOk: z.boolean(),
  sslOk: z.boolean(),
  speedOk: z.boolean(),
  securityUpdatesOk: z.boolean(),
  backupsOk: z.boolean(),
  notes: z.string().max(4000).optional(),
});

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function POST(request: Request) {
  const secret = process.env.MAINTENANCE_CHECK_SECRET;
  const auth = request.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = checkSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { notes, ...checks } = parsed.data;
  const month = currentMonth();

  const allAutomatedChecksOk = Object.values(checks).every(Boolean);

  const existing = await prisma.maintenanceLog.findUnique({ where: { month } });
  const searchConsoleOk = existing?.searchConsoleOk ?? false;
  const allChecked = allAutomatedChecksOk && searchConsoleOk;

  await prisma.maintenanceLog.upsert({
    where: { month },
    create: {
      month,
      ...checks,
      notes: notes || null,
      completedAt: allChecked ? new Date() : null,
    },
    update: {
      ...checks,
      notes: notes || null,
      completedAt: allChecked ? new Date() : null,
    },
  });

  return NextResponse.json({ ok: true, month });
}

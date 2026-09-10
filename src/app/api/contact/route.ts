import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_input" },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message } = parsed.data;

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
    },
  });

  return NextResponse.json({ ok: true });
}

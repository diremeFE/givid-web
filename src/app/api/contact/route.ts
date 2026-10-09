import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL ?? gmailUser;

const transporter =
  gmailUser && gmailAppPassword
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      })
    : null;

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

  if (transporter && notifyEmail) {
    await transporter
      .sendMail({
        from: `GIVID Web <${gmailUser}>`,
        to: notifyEmail,
        replyTo: email,
        subject: `Nuevo mensaje de contacto: ${name}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          phone ? `Teléfono: ${phone}` : null,
          service ? `Servicio: ${service}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      })
      .catch((error) => {
        console.error("Failed to send contact notification email", error);
      });
  }

  return NextResponse.json({ ok: true });
}

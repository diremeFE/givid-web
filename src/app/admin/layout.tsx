import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../[locale]/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panel de administración | GIVID",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}

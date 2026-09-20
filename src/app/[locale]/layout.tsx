import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { GoogleAnalytics } from "@/components/google-analytics";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.siteUrl}/${l}`]),
  );

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${siteConfig.brandName}`,
    },
    description: t("defaultDescription"),
    keywords: t("keywords"),
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages: { ...languages, "x-default": `${siteConfig.siteUrl}/${routing.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      locale,
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: siteConfig.brandName,
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [{ url: "/icon.png" }],
    },
    twitter: {
      card: "summary",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LocalBusinessSchema />
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppWidget />
          <CookieBanner />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

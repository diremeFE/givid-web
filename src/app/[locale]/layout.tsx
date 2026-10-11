import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
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

const fontMontserrat = Montserrat({
  variable: "--font-heading",
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
      className={`${fontMontserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Defines window.gtag as a queueing stub immediately on every page,
          regardless of cookie consent — this never sends anything on its own.
          It just means any gtag() call made before GoogleAnalytics loads the
          real script (e.g. right after a quick form submit) gets queued into
          dataLayer instead of silently being dropped because window.gtag
          didn't exist yet. GoogleAnalytics still only loads the actual
          googletagmanager.com script, and only calls gtag('config', ...),
          after the user accepts cookies — nothing is transmitted until then.
        */}
        <Script id="gtag-stub" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };`}
        </Script>
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

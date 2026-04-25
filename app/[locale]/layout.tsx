import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { Inter } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "4S Systems | ERP Solutions";
const description =
  "ERP solutions tailored to your business with real-time visibility and control.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://4ssystems.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    siteName: "4S Systems",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "4S Systems ERP Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="min-h-svh">
          <NextIntlClientProvider messages={messages}>
            <SiteChrome>{children}</SiteChrome>
            <SpeedInsights />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { Inter } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "4S Systems | ERP Solutions",
  description: "ERP solutions tailored to your business with real-time visibility and control.",
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
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-svh">
          <NextIntlClientProvider messages={messages}>
            <SiteChrome>{children}</SiteChrome>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}

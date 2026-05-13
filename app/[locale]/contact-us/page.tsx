import type { Metadata } from "next";
import ContactPage from "../../../components/main/Contact";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });

  return buildSeoMetadata({
    locale,
    path: "/contact-us",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactUsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage />;
}

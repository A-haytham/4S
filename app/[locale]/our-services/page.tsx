import type { Metadata } from "next";
import ServicesPage from "../../../components/main/our-services";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourservices.hero" });

  return buildSeoMetadata({
    locale,
    path: "/our-services",
    title: t("title"),
    description: t("description"),
  });
}

export default async function OurServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPage />;
}

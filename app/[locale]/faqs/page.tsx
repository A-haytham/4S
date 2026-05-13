import type { Metadata } from "next";
import FAQsPage from "../../../components/main/FAQs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqs.hero" });

  return buildSeoMetadata({
    locale,
    path: "/faqs",
    title: t("title"),
    description: t("description"),
  });
}

export default async function FAQsPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FAQsPage />;
}

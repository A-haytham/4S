import type { Metadata } from "next";
import SolutionsPage from "../../../components/main/Solutions";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.hero" });

  return buildSeoMetadata({
    locale,
    path: "/solutions",
    title: t("title"),
    description: t("description"),
  });
}

export default async function SolutionsRoutePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SolutionsPage />;
}

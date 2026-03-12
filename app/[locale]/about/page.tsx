import type { Metadata } from "next";
import AboutPage from "../../../components/main/About";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}

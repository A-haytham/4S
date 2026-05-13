import type { Metadata } from "next";
import Home from "../../components/main/Home";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return buildSeoMetadata({
    locale,
    path: "/",
    title: `${t("headline")} ${t("subHeadline")}`,
    description: t("description"),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-white text-slate-900">
      <Home />
    </main>
  );
}

import SolutionsPage from "../../../components/main/Solutions";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SolutionsRoutePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SolutionsPage />;
}

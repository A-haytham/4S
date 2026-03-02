import FAQsPage from "../../../components/main/FAQs";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FAQsPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FAQsPage />;
}

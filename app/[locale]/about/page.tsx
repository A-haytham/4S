import AboutPage from "../../../components/main/About";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}

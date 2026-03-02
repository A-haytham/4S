import ServicesPage from "../../../components/main/our-services";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OurServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPage />;
}

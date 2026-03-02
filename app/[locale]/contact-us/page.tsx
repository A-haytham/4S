import ContactPage from "../../../components/main/Contact";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactUsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage />;
}

import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";

export default function HeroSection() {
  const t = useTranslations("solutions.hero");

  return <PageHero title={t("title")} description={t("description")} />;
}

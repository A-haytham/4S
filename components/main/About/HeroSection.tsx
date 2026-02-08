import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";

export default function HeroSection() {
  const t = useTranslations("about");

  return <PageHero title={t("hero.title")} description={t("hero.description")} />;
}

import { useTranslations } from "next-intl";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

export default function SolutionsCtaSection() {
  const t = useTranslations("solutions.cta");
  const buttons: CtaButton[] = [
    {
      label: t("button"),
      href: "/contact-us",
      variant: "primary",
      withArrow: true,
    },
  ];

  return (
    <CtaSection
      title={t("title")}
      description={t("description")}
      buttons={buttons}
      variant="primary"
      size="lg"
    />
  );
}

import { useTranslations } from "next-intl";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

export default function AboutCtaSection() {
  const t = useTranslations("about");
  const buttons: CtaButton[] = [
    {
      label: t("cta.primary"),
      href: "/contact-us",
      variant: "primary",
      withArrow: true,
    },
    {
      label: t("cta.secondary"),
      variant: "secondary",
    },
  ];

  return (
    <CtaSection
      title={t("cta.title")}
      description={t("cta.description")}
      buttons={buttons}
      variant="primary"
      size="lg"
    />
  );
}

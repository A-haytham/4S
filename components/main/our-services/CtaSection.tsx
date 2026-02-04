import { useTranslations } from "next-intl";
import BaseCtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

export default function CtaSection() {
  const t = useTranslations("ourservices.cta");
  const buttons: CtaButton[] = [
    {
      label: t("button"),
      href: "/contact-us",
      variant: "primary",
      withArrow: true,
    },
  ];

  return (
    <BaseCtaSection
      title={t("title")}
      description={t("description")}
      buttons={buttons}
      variant="primary"
      size="lg"
    />
  );
}

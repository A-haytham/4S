import { useTranslations } from "next-intl";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

type CtaSectionProps = {
  title?: string;
  description?: string;
  buttons?: CtaButton[];
};

export default function HomeCtaSection({ title, description, buttons }: CtaSectionProps) {
  const t = useTranslations("home.cta");
  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");
  const resolvedButtons = buttons ?? (t.raw("buttons") as CtaButton[]);

  return (
    <CtaSection
      id="contact"
      variant="vivid"
      size="md"
      title={resolvedTitle}
      description={resolvedDescription}
      buttons={resolvedButtons}
    />
  );
}

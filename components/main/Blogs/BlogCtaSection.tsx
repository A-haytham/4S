"use client";

import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

type BlogCtaSectionProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
};

export default function BlogCtaSection({
  title,
  description,
  buttonLabel,
  buttonHref = "/contact-us",
}: BlogCtaSectionProps) {
  const buttons: CtaButton[] = [
    {
      label: buttonLabel,
      href: buttonHref,
      variant: "primary",
      withArrow: true,
    },
  ];

  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl mx-60 mb-10">
        <CtaSection
          title={title}
          description={description}
          buttons={buttons}
          variant="primary"
          size="lg"
        />
      </div>
    </Reveal>
  );
}

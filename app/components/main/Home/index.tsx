import CtaSection from "./CtaSection";
import Hero3D from "./Hero3D";
import HighlightsSection from "./HighlightsSection";
import IndustriesSection from "./IndustriesSection";
import ModulesSection from "./ModulesSection";
import ReasonsSection from "./ReasonsSection";
import StepsSection from "./StepsSection";
import StoriesSection from "./StoriesSection";
import TestimonialsSection from "./TestimonialsSection";

export default function Home() {
  const locale = "en";
  const t = {
    hero: {
      trustBadge: "Trusted by leading businesses across the Middle East",
      headline: "ERP Solutions That Fit Your Business",
      subHeadline: "Not the Other Way Around",
      description:
        "Implementation, customization, and support that give you real-time visibility and control over your entire operation.",
      ctaPrimary: "Request a Demo",
      ctaSecondary: "Explore Solutions",
    },
  };

  return (
    <main className="bg-white text-slate-900">
      <Hero3D locale={locale} t={t} />
      <HighlightsSection />
      <ReasonsSection />
      <ModulesSection />
      <IndustriesSection />
      <StepsSection />
      <StoriesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}

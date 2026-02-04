import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import IntegrationsSection from "./IntegrationsSection";
import ModulesSection from "./ModulesSection";
import OverviewSection from "./OverviewSection";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <OverviewSection />
      <ModulesSection />
      <IntegrationsSection />
      <CtaSection />
    </main>
  );
}

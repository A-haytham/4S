import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import IntegrationsSection from "./IntegrationsSection";
import ModulesSection from "./ModulesSection";
import OverviewSection from "./OverviewSection";
import Reveal from "@/components/ui/Reveal";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <OverviewSection />
      </Reveal>
      <Reveal>
        <ModulesSection />
      </Reveal>
      <Reveal>
        <IntegrationsSection />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
    </main>
  );
}

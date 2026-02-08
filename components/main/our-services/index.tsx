import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import ServicesListSection from "./ServicesListSection";
import SupportTiersSection from "./SupportTiersSection";
import Reveal from "@/components/ui/Reveal";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <ServicesListSection />
      </Reveal>
      <Reveal>
        <SupportTiersSection />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
    </main>
  );
}

import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import ServicesListSection from "./ServicesListSection";
import SupportTiersSection from "./SupportTiersSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ServicesListSection />
      <SupportTiersSection />
      <CtaSection />
    </main>
  );
}

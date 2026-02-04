import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import PartnersSection from "./PartnersSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";
import ValuesSection from "./ValuesSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StorySection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <PartnersSection />
      <CtaSection />
    </main>
  );
}

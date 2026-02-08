import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import PartnersSection from "./PartnersSection";
import StorySection from "./StorySection";
import TeamSection from "./TeamSection";
import ValuesSection from "./ValuesSection";
import Reveal from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <StorySection />
      </Reveal>
      <Reveal>
        <MissionSection />
      </Reveal>
      <Reveal>
        <ValuesSection />
      </Reveal>
      <Reveal>
        <TeamSection />
      </Reveal>
      <Reveal>
        <PartnersSection />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
    </main>
  );
}

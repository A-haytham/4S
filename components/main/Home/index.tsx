import CtaSection from "./CtaSection";
import ClientsSection from "./ClientsSection";
import FAQsSection from "./FAQsSection";
import Hero3D from "./Hero3D";
import HighlightsSection from "./HighlightsSection";
import ModulesSection from "./ModulesSection";
import ReasonsSection from "./ReasonsSection";
import StepsSection from "./StepsSection";
import StoriesSection from "./StoriesSection";
import TestimonialsSection from "./TestimonialsSection";
import TechStackSection from "./TechStackSection";
import VideoSection from "./VideoSection";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Reveal>
        <Hero3D />
      </Reveal>
      <Reveal>
        <HighlightsSection />
      </Reveal>
      <Reveal>
        <ReasonsSection />
      </Reveal>
      <Reveal>
        <ModulesSection />
      </Reveal>
      <Reveal>
        <VideoSection />
      </Reveal>
      <Reveal>
        <TechStackSection />
      </Reveal>
         <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <StepsSection />
      </Reveal>
      <Reveal>
        <StoriesSection />
      </Reveal>
      <Reveal>
        <ClientsSection />
      </Reveal>
      <Reveal>
        <FAQsSection />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
    </main>
  );
}

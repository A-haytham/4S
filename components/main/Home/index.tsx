import CtaSection from "./CtaSection";
import Hero3D from "./Hero3D";
import HighlightsSection from "./HighlightsSection";
import IndustriesSection from "./IndustriesSection";
import ModulesSection from "./ModulesSection";
import ReasonsSection from "./ReasonsSection";
import StepsSection from "./StepsSection";
import StoriesSection from "./StoriesSection";
import TestimonialsSection from "./TestimonialsSection";
import TechStackSection from "./TechStackSection";
import VideoSection from "./VideoSection";

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Hero3D />
      <HighlightsSection />
      <ReasonsSection />
      <ModulesSection />
      <VideoSection />
      <TechStackSection />
      <IndustriesSection />
      <StepsSection />
      <StoriesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}

import PageHero from "@/components/ui/PageHero";

type HeroSectionProps = {
  title: string;
  description: string;
};

export default function HeroSection({ title, description }: HeroSectionProps) {
  return <PageHero title={title} description={description} />;
}

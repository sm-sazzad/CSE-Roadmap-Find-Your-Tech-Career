import Hero from "@/components/Hero";
import FeaturedSectors from "@/components/FeaturedSectors";
import HowItWorks from "@/components/HowItWorks";
import WhyCodePath from "@/components/WhyCodePath";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main>
      <Reveal>
        <Hero />
      </Reveal>

      <FeaturedSectors />

      <HowItWorks />

      <WhyCodePath />
      <FinalCTA />
    </main>
  );
}

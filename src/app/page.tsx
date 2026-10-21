import Hero from "@/components/Hero";
import FeaturedSectors from "@/components/FeaturedSectors";
import HowItWorks from "@/components/HowItWorks";
import WhyCodePath from "@/components/WhyCodePath";
import FinalCTA from "@/components/FinalCTA";
import { getCatalog, getStats } from "@/lib/roadmap";

export default function Home() {
  const catalog = getCatalog();
  const stats = getStats();

  return (
    <main className="overflow-x-clip">
      <Hero stats={stats} catalog={catalog} />
      <FeaturedSectors catalog={catalog} />
      <HowItWorks />
      <WhyCodePath />
      <FinalCTA />
    </main>
  );
}

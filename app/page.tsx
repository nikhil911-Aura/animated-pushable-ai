import Navbar             from "@/components/Navbar";
import CinematicHeroSection from "@/components/CinematicHeroSection";
import TrustSection        from "@/components/TrustSection";
import AgentsSection       from "@/components/AgentsSection";
import HowItWorksSection   from "@/components/HowItWorksSection";
import DemoSection         from "@/components/DemoSection";
import IndustrySection     from "@/components/IndustrySection";
import PricingSection      from "@/components/PricingSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import WhyTrustSection     from "@/components/WhyTrustSection";
import FinalCTASection     from "@/components/FinalCTASection";
import FAQSection          from "@/components/FAQSection";
import Footer              from "@/components/Footer";
import { SignatureTile }   from "@/components/animation";

export default function Home() {
  return (
    <main className="bg-[#f3f0eb] min-h-screen overflow-x-hidden">
      <Navbar />
      <CinematicHeroSection />
      <TrustSection />
      <AgentsSection />
      <HowItWorksSection />
      <DemoSection />
      <IndustrySection />
      <SignatureTile />
      <PricingSection />
      <IntegrationsSection />
      <WhyTrustSection />
      <FinalCTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}

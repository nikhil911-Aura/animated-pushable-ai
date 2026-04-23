import Navbar            from "@/components/Navbar";
import HeroSection        from "@/components/HeroSection";
import TrustSection       from "@/components/TrustSection";
import AgentsSection      from "@/components/AgentsSection";
import HowItWorksSection  from "@/components/HowItWorksSection";
import DemoSection        from "@/components/DemoSection";
import IndustrySection    from "@/components/IndustrySection";
import PricingSection     from "@/components/PricingSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import WhyTrustSection    from "@/components/WhyTrustSection";
import FinalCTASection    from "@/components/FinalCTASection";
import FAQSection         from "@/components/FAQSection";
import Footer             from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#04060f] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AgentsSection />
      <HowItWorksSection />
      <DemoSection />
      <IndustrySection />
      <PricingSection />
      <IntegrationsSection />
      <WhyTrustSection />
      <FinalCTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}

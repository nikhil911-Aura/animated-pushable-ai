import dynamic from "next/dynamic";
import Navbar               from "@/components/Navbar";
import CinematicHeroSection from "@/components/CinematicHeroSection";
import TrustSection         from "@/components/TrustSection";

/* ── Below-fold sections lazy-loaded after hero paint ─────────────── */
const AgentsSection      = dynamic(() => import("@/components/AgentsSection"));
const HowItWorksSection  = dynamic(() => import("@/components/HowItWorksSection"));
const DemoSection        = dynamic(() => import("@/components/DemoSection"));
const IndustrySection    = dynamic(() => import("@/components/IndustrySection"));
const PricingSection     = dynamic(() => import("@/components/PricingSection"));
const IntegrationsSection= dynamic(() => import("@/components/IntegrationsSection"));
const WhyTrustSection    = dynamic(() => import("@/components/WhyTrustSection"));
const FinalCTASection    = dynamic(() => import("@/components/FinalCTASection"));
const FAQSection         = dynamic(() => import("@/components/FAQSection"));
const Footer             = dynamic(() => import("@/components/Footer"));
const SignatureTile      = dynamic(() => import("@/components/animation/SignatureTile"));

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

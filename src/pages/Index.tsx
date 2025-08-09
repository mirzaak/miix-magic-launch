import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Process from "@/components/landing/Process";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div>
      <Hero />
      <main>
        <FeatureGrid />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

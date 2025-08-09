import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section id="cta" className="container mx-auto py-16 md:py-24">
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 glass">
        <div className="absolute -inset-1 -z-10 rounded-3xl" style={{ boxShadow: "var(--shadow-glow)" }} />
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl md:text-3xl">Ready to automate with confidence?</h3>
            <p className="mt-2 text-muted-foreground">Book a free workflow audit. We'll identify quick wins and a roadmap tailored to your tools and goals.</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <Button variant="hero" size="lg" className="hover-scale">Book a free audit</Button>
            <Button variant="outline" size="lg" className="hover-scale">Email us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

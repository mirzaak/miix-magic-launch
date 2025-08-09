import { useRef } from "react";
import heroImage from "@/assets/hero-miix.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  return (
    <header className="relative overflow-hidden">
      <nav className="container mx-auto flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2">
          <div className="size-8 rounded-md" style={{ background: "var(--gradient-primary)" }} />
          <span className="font-display text-lg font-bold tracking-tight">MIIX Automations</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="story-link">Features</a>
          <a href="#process" className="story-link">Process</a>
          <a href="#cta" className="story-link">Contact</a>
          <Button variant="outline" className="hover-scale">Login</Button>
        </div>
      </nav>

      <section
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative container mx-auto grid gap-10 py-14 md:py-24 lg:grid-cols-2 lg:items-center bg-hero"
        aria-label="Hero section"
      >
        <div className="relative z-10 max-w-xl animate-enter">
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
            AI + No‑Code Workflows That Scale
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Automate the busywork.
            <span className="block text-gradient">Grow what matters.</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            We design, build and maintain high‑impact automations across your stack so your team can focus on value, not manual tasks.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="hero" size="lg" className="hover-scale">Book a free audit</Button>
            <Button variant="secondary" size="lg" className="hover-scale">See how it works</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Zapier • Make • Airtable • Notion • Slack • OpenAI</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-2xl shadow-2xl" style={{ boxShadow: "var(--shadow-glow)" }} />
          <img
            src={heroImage}
            alt="Abstract automation background with flowing gradient ribbons"
            loading="eager"
            className="w-full rounded-2xl object-cover shadow-xl"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay" style={{ background: "radial-gradient(30rem 16rem at var(--mx,60%) var(--my,40%), hsl(var(--primary)/0.25), transparent 50%)" }} />
        </div>
      </section>
    </header>
  );
};

export default Hero;

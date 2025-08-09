import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Workflow, Gauge, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Rapid Impact",
    desc: "Launch automations in days, not months. We ship quick wins first.",
  },
  {
    icon: Workflow,
    title: "Solid Architecture",
    desc: "Reliable flows with retries, alerts, and observability baked in.",
  },
  {
    icon: Bot,
    title: "AI Where It Fits",
    desc: "Add smart steps with LLMs for enrichment, routing and generation.",
  },
  {
    icon: Gauge,
    title: "Measured ROI",
    desc: "Dashboards that prove time saved and dollars returned.",
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="container mx-auto py-16 md:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl">Automation that just works</h2>
        <p className="mt-3 text-muted-foreground">From lead intake to ops to finance, we connect your tools and remove friction.</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="glass hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-md" style={{ background: "hsl(var(--primary)/0.1)" }}>
                  <Icon className="text-primary" />
                </span>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              </div>
              <CardDescription className="mt-2">{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Best‑practice patterns</li>
                <li>• Error handling + alerts</li>
                <li>• Documentation included</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;

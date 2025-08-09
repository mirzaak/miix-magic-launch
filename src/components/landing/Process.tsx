import { ArrowRight, CheckCircle2, ClipboardCheck, Rocket, Wrench } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Free audit",
    desc: "We map your processes and identify high‑ROI automation opportunities.",
  },
  {
    icon: Wrench,
    title: "Build",
    desc: "We implement and test robust workflows across your tool stack.",
  },
  {
    icon: CheckCircle2,
    title: "Launch",
    desc: "We ship, document and train your team to operate the flows.",
  },
  {
    icon: Rocket,
    title: "Scale",
    desc: "We monitor, iterate and expand automations as you grow.",
  },
];

const Process = () => {
  return (
    <section id="process" className="container mx-auto py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl">A simple, proven process</h2>
        <p className="mt-3 text-muted-foreground">Low lift for your team. High leverage for your ops.</p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="relative rounded-lg border p-6 glass hover-scale">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-md" style={{ background: "hsl(var(--primary)/0.1)" }}>
                <Icon className="text-primary" />
              </span>
              <h3 className="text-lg font-semibold">{i + 1}. {title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex items-center justify-center">
        <a href="#cta" className="story-link inline-flex items-center gap-2 text-sm">
          See a sample automation deck <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
};

export default Process;

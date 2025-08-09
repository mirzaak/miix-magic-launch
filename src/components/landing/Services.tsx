import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Workflow, Plug, Database, LineChart, Mail, Webhook, Brain, Zap } from "lucide-react";

const services = [
  {
    title: "Automation Strategy",
    description: "Map high-impact workflows, prioritize ROI, and design scalable automations.",
    Icon: Workflow,
  },
  {
    title: "CRM Integrations",
    description: "Connect HubSpot, Pipedrive, Close, or custom CRMs with your tools.",
    Icon: Plug,
  },
  {
    title: "Lead Enrichment",
    description: "Auto-enrich contacts from email, forms, and ads with firmographic data.",
    Icon: Database,
  },
  {
    title: "Outbound Automation",
    description: "Personalized email outreach with smart sequencing and reply routing.",
    Icon: Mail,
  },
  {
    title: "AI Assistants & Chatbots",
    description: "Deploy AI for triage, qualification, and customer support workflows.",
    Icon: Bot,
  },
  {
    title: "Analytics & Dashboards",
    description: "Real-time marketing performance dashboards across channels and CRMs.",
    Icon: LineChart,
  },
  {
    title: "Workflow Orchestration",
    description: "Design resilient pipelines with retries, alerts, and observability.",
    Icon: Webhook,
  },
  {
    title: "AI-Augmented Processes",
    description: "Use LLMs for scoring, summarization, routing, and insights at scale.",
    Icon: Brain,
  },
  {
    title: "Zapier/Make Buildouts",
    description: "Production-grade automations with governance and documentation.",
    Icon: Zap,
  },
];

const Services: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MIIX Automations Services',
    itemListElement: services.map((s, idx) => ({
      '@type': 'Service',
      position: idx + 1,
      name: s.title,
      description: s.description,
      provider: {
        '@type': 'Organization',
        name: 'MIIX Automations',
      },
    })),
  };

  return (
    <section id="services" aria-label="Automation services" className="container py-24">
      <header className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">Automation Services</h2>
        <p className="mt-3 text-muted-foreground">
          Modern, scalable automation services tailored for marketing and revenue teams.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, Icon }, i) => (
          <Card
            key={title}
            className="group border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon aria-hidden size={20} />
                  <span className="sr-only">{title} icon</span>
                </span>
                <CardTitle className="text-xl">{title}</CardTitle>
              </div>
              <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-px w-full bg-border/60" />
              <p className="mt-4 text-sm text-muted-foreground">
                Delivered with documentation, QA, and monitoring. Built with your stack and best practices.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
};

export default Services;

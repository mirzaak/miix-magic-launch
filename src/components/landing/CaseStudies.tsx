import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Study = {
  title: string;
  niche: string;
  summary: string;
  metrics: { label: string; value: string }[];
};

const studies: Study[] = [
  {
    title: "Cold Email CRM Automation",
    niche: "Outbound Marketing / Sales",
    summary:
      "Automated lead capture from replies, enriched contacts, and routed qualified leads into CRM with tags and owners.",
    metrics: [
      { label: "Reply triage time", value: "-85%" },
      { label: "Qualified leads", value: "+42%" },
      { label: "Manual tasks", value: "-70%" },
    ],
  },
  {
    title: "Lead Capture → CRM Pipeline",
    niche: "Performance Marketing",
    summary:
      "Unified form fills from ads and landing pages, validated entries, enriched firmographics, and synced to HubSpot.",
    metrics: [
      { label: "Data accuracy", value: "+31%" },
      { label: "Time-to-contact", value: "-60%" },
      { label: "CPL efficiency", value: "+18%" },
    ],
  },
  {
    title: "Marketing Analytics Automation",
    niche: "Growth Reporting",
    summary:
      "Automated channel ingestion, modeled attribution, and shipped a live dashboard for revenue and CAC tracking.",
    metrics: [
      { label: "Reporting time", value: "-90%" },
      { label: "Attribution coverage", value: "+50%" },
      { label: "Exec visibility", value: "Real-time" },
    ],
  },
];

const CaseStudies: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MIIX Automations Case Studies',
    itemListElement: studies.map((s, idx) => ({
      '@type': 'Article',
      position: idx + 1,
      headline: s.title,
      articleSection: 'Case Study',
      about: s.niche,
      description: s.summary,
      author: { '@type': 'Organization', name: 'MIIX Automations' },
      publisher: { '@type': 'Organization', name: 'MIIX Automations' },
    })),
  };

  return (
    <section id="case-studies" aria-label="Case studies" className="container py-24">
      <header className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">Case Studies</h2>
        <p className="mt-3 text-muted-foreground">
          A snapshot of recent marketing automation wins delivered end-to-end.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((s) => (
          <Card
            key={s.title}
            className="group h-full border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
          >
            <CardHeader>
              <CardTitle className="text-xl">{s.title}</CardTitle>
              <CardDescription>{s.niche}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.summary}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {s.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-md border border-border/60 bg-background/40 px-3 py-2 text-center"
                  >
                    <div className="text-sm font-semibold text-foreground">{m.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
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

export default CaseStudies;

import React, { useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricRefs = useRef<(HTMLDivElement | null)[][]>([]);
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(studies.length).fill(false));
  const [visibleMetrics, setVisibleMetrics] = useState<boolean[][]>(
    studies.map(study => new Array(study.metrics.length).fill(false))
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize metric refs
  useEffect(() => {
    metricRefs.current = studies.map(study => new Array(study.metrics.length).fill(null));
  }, []);

  // Header intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      {
        threshold: 0.4,
        rootMargin: "50px"
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Card intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              // Staggered card reveal
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });

                // Trigger metrics animation after card appears
                setTimeout(() => {
                  setVisibleMetrics(prev => {
                    const newVisible = prev.map((cardMetrics, cardIndex) => 
                      cardIndex === index 
                        ? cardMetrics.map(() => true)
                        : cardMetrics
                    );
                    return newVisible;
                  });
                }, 400);
              }, index * 200);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "20px"
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Scroll-based parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress through section
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (windowHeight + sectionHeight)
      ));
      setScrollProgress(progress);
      
      // Apply parallax effects to visible cards
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef && visibleCards[index]) {
          const cardRect = cardRef.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const screenCenter = windowHeight / 2;
          const distanceFromCenter = (cardCenter - screenCenter) / screenCenter;
          
          // Parallax movement based on distance from screen center
          const parallaxY = distanceFromCenter * 15;
          const scale = 1 - Math.abs(distanceFromCenter) * 0.02;
          const opacity = Math.max(0.7, 1 - Math.abs(distanceFromCenter) * 0.3);
          
          cardRef.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
          cardRef.style.opacity = opacity.toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCards]);

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
    <section 
      ref={sectionRef}
      id="case-studies" 
      aria-label="Case studies" 
      className="container py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/4 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollProgress * 60}px) rotate(${scrollProgress * 180}deg)`,
            opacity: 0.6 - scrollProgress * 0.3
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/6 w-48 h-48 bg-accent/6 rounded-full blur-2xl"
          style={{
            transform: `translateY(${-scrollProgress * 40}px) scale(${1 + scrollProgress * 0.5})`,
            opacity: 0.4 - scrollProgress * 0.2
          }}
        />
        <div 
          className="absolute top-3/4 right-1/6 w-32 h-32 bg-primary/8 rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollProgress * 80}px) rotate(${-scrollProgress * 90}deg)`,
            opacity: 0.8 - scrollProgress * 0.5
          }}
        />
      </div>

      <header 
        ref={headerRef}
        className={`mx-auto max-w-2xl text-center mb-12 transition-all duration-1000 ${
          isHeaderVisible ? 'animate-header-rise opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className={`font-display text-3xl sm:text-4xl tracking-tight text-foreground transition-all duration-1200 ${
          isHeaderVisible ? 'animate-title-glow' : ''
        }`}>
          <span className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent">
            Case Studies
          </span>
        </h2>
        <p className={`mt-3 text-muted-foreground transition-all duration-1000 delay-400 ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          A snapshot of recent marketing automation wins delivered end-to-end.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((s, cardIndex) => (
          <Card
            key={s.title}
            ref={el => cardRefs.current[cardIndex] = el}
            className={`group h-full border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-700 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 relative overflow-hidden ${
              visibleCards[cardIndex] 
                ? 'animate-card-emerge opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
            style={{
              animationDelay: `${cardIndex * 200}ms`,
              transitionDelay: `${cardIndex * 150}ms`
            }}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10" />
            
            {/* Success indicator */}
            <div className={`absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full transition-all duration-700 ${
              visibleCards[cardIndex] ? 'animate-success-pulse opacity-100' : 'opacity-0'
            }`}
            style={{ animationDelay: `${cardIndex * 200 + 800}ms` }} />

            <CardHeader className="relative z-10">
              <CardTitle className={`text-xl transition-all duration-700 group-hover:text-primary ${
                visibleCards[cardIndex] ? 'animate-title-slide-in' : ''
              }`}
              style={{ animationDelay: `${cardIndex * 200 + 300}ms` }}>
                {s.title}
              </CardTitle>
              <CardDescription className={`transition-all duration-700 ${
                visibleCards[cardIndex] ? 'animate-niche-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${cardIndex * 200 + 400}ms` }}>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  <span className="w-1 h-1 bg-current rounded-full" />
                  {s.niche}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className={`text-sm text-muted-foreground transition-all duration-700 ${
                visibleCards[cardIndex] ? 'animate-summary-appear opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${cardIndex * 200 + 500}ms` }}>
                {s.summary}
              </p>
              <div className={`mt-5 grid grid-cols-3 gap-3 transition-all duration-700 ${
                visibleCards[cardIndex] ? 'animate-metrics-container-appear' : ''
              }`}
              style={{ animationDelay: `${cardIndex * 200 + 600}ms` }}>
                {s.metrics.map((m, metricIndex) => (
                  <div
                    key={m.label}
                    ref={el => {
                      if (!metricRefs.current[cardIndex]) {
                        metricRefs.current[cardIndex] = [];
                      }
                      metricRefs.current[cardIndex][metricIndex] = el;
                    }}
                    className={`rounded-md border border-border/60 bg-background/40 px-3 py-2 text-center transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 ${
                      visibleMetrics[cardIndex]?.[metricIndex] 
                        ? 'animate-metric-pop opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      animationDelay: `${cardIndex * 200 + 700 + metricIndex * 100}ms`,
                      transitionDelay: `${metricIndex * 50}ms`
                    }}
                  >
                    <div className={`text-sm font-semibold text-foreground transition-all duration-300 ${
                      m.value.includes('+') ? 'text-green-600' : 
                      m.value.includes('-') ? 'text-blue-600' : 
                      'text-primary'
                    } ${visibleMetrics[cardIndex]?.[metricIndex] ? 'animate-value-highlight' : ''}`}
                    style={{ animationDelay: `${cardIndex * 200 + 800 + metricIndex * 100}ms` }}>
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx>{`
        @keyframes header-rise {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes title-glow {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes card-emerge {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes title-slide-in {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes niche-fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes summary-appear {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes metrics-container-appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes metric-pop {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.9);
          }
          50% {
            transform: translateY(-2px) scale(1.02);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes value-highlight {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes success-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        .animate-header-rise {
          animation: header-rise 1s ease-out;
        }

        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }

        .animate-card-emerge {
          animation: card-emerge 0.8s ease-out;
        }

        .animate-title-slide-in {
          animation: title-slide-in 0.6s ease-out;
        }

        .animate-niche-fade-in {
          animation: niche-fade-in 0.5s ease-out;
        }

        .animate-summary-appear {
          animation: summary-appear 0.7s ease-out;
        }

        .animate-metrics-container-appear {
          animation: metrics-container-appear 0.6s ease-out;
        }

        .animate-metric-pop {
          animation: metric-pop 0.6s ease-out;
        }

        .animate-value-highlight {
          animation: value-highlight 0.8s ease-in-out;
        }

        .animate-success-pulse {
          animation: success-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CaseStudies;
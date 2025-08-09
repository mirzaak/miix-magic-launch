import React, { useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false));
  const [scrollProgress, setScrollProgress] = useState(0);

  // Header intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      {
        threshold: 0.3,
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

  // Card intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              // Staggered reveal with slight delay
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 100);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "30px"
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

  // Scroll-based animations
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
          const row = Math.floor(index / 3);
          const col = index % 3;
          
          // Different parallax speeds based on position
          const parallaxSpeed = 0.3 + (row * 0.1) + (col * 0.05);
          const translateY = progress * 30 * parallaxSpeed;
          const scale = 1 - (progress * 0.05);
          const opacity = Math.max(0.6, 1 - progress * 0.4);
          
          cardRef.style.transform = `translateY(${translateY}px) scale(${scale})`;
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
    <section 
      ref={sectionRef}
      id="services" 
      aria-label="Automation services" 
      className="container py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollProgress * 50}px) rotate(${scrollProgress * 90}deg)`,
            opacity: 0.6 - scrollProgress * 0.3
          }}
        />
        <div 
          className="absolute bottom-1/3 right-0 w-64 h-64 bg-accent/8 rounded-full blur-2xl"
          style={{
            transform: `translateY(${-scrollProgress * 40}px) rotate(${-scrollProgress * 120}deg)`,
            opacity: 0.4 - scrollProgress * 0.2
          }}
        />
        <div 
          className="absolute top-2/3 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollProgress * 60}px) scale(${1 + scrollProgress * 0.3})`,
            opacity: 0.5 - scrollProgress * 0.4
          }}
        />
      </div>

      <header 
        ref={headerRef}
        className={`mx-auto max-w-2xl text-center mb-12 transition-all duration-1000 ${
          isHeaderVisible ? 'animate-header-appear opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className={`font-display text-3xl sm:text-4xl tracking-tight text-foreground transition-all duration-1200 ${
          isHeaderVisible ? 'animate-title-shimmer' : ''
        }`}>
          <span className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent">
            Automation Services
          </span>
        </h2>
        <p className={`mt-3 text-muted-foreground transition-all duration-1000 delay-300 ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Modern, scalable automation services tailored for marketing and revenue teams.
        </p>
      </header>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, Icon }, i) => (
          <Card
            key={title}
            ref={el => cardRefs.current[i] = el}
            className={`group border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-700 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 relative overflow-hidden ${
              visibleCards[i] 
                ? 'animate-card-slide-up opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              animationDelay: `${i * 100}ms`,
              transitionDelay: `${i * 80}ms`
            }}
          >
            {/* Card background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  visibleCards[i] ? 'animate-icon-bounce' : ''
                }`}
                style={{ animationDelay: `${i * 100 + 200}ms` }}>
                  <Icon 
                    aria-hidden 
                    size={20} 
                    className={`transition-all duration-500 group-hover:scale-110 ${
                      visibleCards[i] ? 'animate-icon-glow' : ''
                    }`}
                  />
                  <span className="sr-only">{title} icon</span>
                </span>
                <CardTitle className={`text-xl transition-all duration-500 group-hover:text-primary ${
                  visibleCards[i] ? 'animate-text-slide-in' : ''
                }`}
                style={{ animationDelay: `${i * 100 + 300}ms` }}>
                  {title}
                </CardTitle>
              </div>
              <CardDescription className={`mt-2 transition-all duration-700 ${
                visibleCards[i] ? 'animate-description-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 400}ms` }}>
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`h-px w-full bg-border/60 transition-all duration-500 ${
                visibleCards[i] ? 'animate-line-expand' : ''
              }`}
              style={{ animationDelay: `${i * 100 + 500}ms` }} />
              <p className={`mt-4 text-sm text-muted-foreground transition-all duration-700 ${
                visibleCards[i] ? 'animate-footer-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ animationDelay: `${i * 100 + 600}ms` }}>
                Delivered with documentation, QA, and monitoring. Built with your stack and best practices.
              </p>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx>{`
        @keyframes header-appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes title-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes card-slide-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes icon-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.05);
          }
        }

        @keyframes icon-glow {
          0%, 100% {
            filter: drop-shadow(0 0 0 transparent);
          }
          50% {
            filter: drop-shadow(0 0 6px hsl(var(--primary)/0.4));
          }
        }

        @keyframes text-slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes description-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes line-expand {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes footer-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-header-appear {
          animation: header-appear 1s ease-out;
        }

        .animate-title-shimmer {
          animation: title-shimmer 3s ease-in-out infinite;
        }

        .animate-card-slide-up {
          animation: card-slide-up 0.8s ease-out;
        }

        .animate-icon-bounce {
          animation: icon-bounce 0.6s ease-in-out;
        }

        .animate-icon-glow {
          animation: icon-glow 2s ease-in-out infinite;
        }

        .animate-text-slide-in {
          animation: text-slide-in 0.6s ease-out;
        }

        .animate-description-fade-in {
          animation: description-fade-in 0.7s ease-out;
        }

        .animate-line-expand {
          animation: line-expand 0.5s ease-out;
        }

        .animate-footer-fade-in {
          animation: footer-fade-in 0.7s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;
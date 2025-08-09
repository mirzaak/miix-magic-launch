import { useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px"
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      cardRefs.current.forEach(ref => {
        if (ref) cardObserver.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate if section is in viewport
      const sectionBottom = sectionTop + sectionHeight;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + windowHeight;
      
      if (viewportBottom > sectionTop && viewportTop < sectionBottom) {
        // Calculate scroll progress through the section
        const scrollProgress = Math.max(0, Math.min(1, 
          (viewportBottom - sectionTop) / (windowHeight + sectionHeight)
        ));
        
        // Apply parallax effects to cards
        cardRefs.current.forEach((cardRef, index) => {
          if (cardRef && visibleCards[index]) {
            const delay = index * 0.1;
            const adjustedProgress = Math.max(0, scrollProgress - delay);
            const translateY = adjustedProgress * 20;
            const scale = 1 - adjustedProgress * 0.02;
            const opacity = Math.max(0.7, 1 - adjustedProgress * 0.3);
            
            cardRef.style.transform = `translateY(${translateY}px) scale(${scale})`;
            cardRef.style.opacity = opacity.toString();
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCards]);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="container mx-auto py-16 md:py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all duration-[3000ms] ${
          isVisible ? 'animate-float opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl transition-all duration-[3000ms] delay-1000 ${
          isVisible ? 'animate-float-reverse opacity-100' : 'opacity-0'
        }`} />
      </div>

      <header className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
        isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h2 className="font-display text-3xl md:text-4xl">
          <span className="inline-block animate-text-shimmer bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent">
            Automation that just works
          </span>
        </h2>
        <p className={`mt-3 text-muted-foreground transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          From lead intake to ops to finance, we connect your tools and remove friction.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }, index) => (
          <Card 
            key={title} 
            ref={el => cardRefs.current[index] = el}
            className={`glass hover-scale relative group transition-all duration-700 ${
              visibleCards[index] 
                ? 'animate-card-appear opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ 
              animationDelay: `${index * 150}ms`,
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <span className={`inline-flex size-10 items-center justify-center rounded-md transition-all duration-500 group-hover:scale-110 ${
                  visibleCards[index] ? 'animate-icon-bounce' : ''
                }`} 
                style={{ 
                  background: "hsl(var(--primary)/0.1)",
                  animationDelay: `${index * 150 + 300}ms`
                }}>
                  <Icon className={`text-primary transition-all duration-500 group-hover:rotate-12 ${
                    visibleCards[index] ? 'animate-icon-glow' : ''
                  }`} />
                </span>
                <CardTitle className={`text-lg font-semibold transition-all duration-500 group-hover:text-primary ${
                  visibleCards[index] ? 'animate-text-appear' : ''
                }`}
                style={{ animationDelay: `${index * 150 + 200}ms` }}>
                  {title}
                </CardTitle>
              </div>
              <CardDescription className={`mt-2 transition-all duration-500 ${
                visibleCards[index] ? 'animate-text-appear opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150 + 400}ms` }}>
                {desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ul className={`text-sm text-muted-foreground space-y-2 transition-all duration-700 ${
                visibleCards[index] ? 'animate-list-appear opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150 + 600}ms` }}>
                <li className="animate-list-item" style={{ animationDelay: `${index * 150 + 700}ms` }}>
                  • Best‑practice patterns
                </li>
                <li className="animate-list-item" style={{ animationDelay: `${index * 150 + 800}ms` }}>
                  • Error handling + alerts
                </li>
                <li className="animate-list-item" style={{ animationDelay: `${index * 150 + 900}ms` }}>
                  • Documentation included
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes card-appear {
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes icon-glow {
          0%, 100% {
            filter: drop-shadow(0 0 0 transparent);
          }
          50% {
            filter: drop-shadow(0 0 8px hsl(var(--primary)/0.4));
          }
        }

        @keyframes text-appear {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes list-appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes list-item {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }

        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(-120deg);
          }
          66% {
            transform: translateY(-25px) rotate(-240deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-card-appear {
          animation: card-appear 0.8s ease-out;
        }

        .animate-icon-bounce {
          animation: icon-bounce 0.6s ease-in-out;
        }

        .animate-icon-glow {
          animation: icon-glow 2s ease-in-out infinite;
        }

        .animate-text-appear {
          animation: text-appear 0.6s ease-out;
        }

        .animate-list-appear {
          animation: list-appear 0.6s ease-out;
        }

        .animate-list-item {
          animation: list-item 0.4s ease-out both;
        }

        .animate-text-shimmer {
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeatureGrid;
import { useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressLineWidth, setProgressLineWidth] = useState(0);

  // Header intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      {
        threshold: 0.5,
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

  // Steps intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              // Staggered step reveal with progress line animation
              setTimeout(() => {
                setVisibleSteps(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
                
                // Update progress line width
                setProgressLineWidth((index + 1) / steps.length * 100);
              }, index * 300);
            }
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "30px"
      }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // CTA intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCtaVisible(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "50px"
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
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
      
      // Apply parallax effects to visible steps
      stepRefs.current.forEach((stepRef, index) => {
        if (stepRef && visibleSteps[index]) {
          const stepRect = stepRef.getBoundingClientRect();
          const stepCenter = stepRect.top + stepRect.height / 2;
          const screenCenter = windowHeight / 2;
          const distanceFromCenter = (stepCenter - screenCenter) / screenCenter;
          
          // Gentle parallax movement
          const parallaxY = distanceFromCenter * 10;
          const scale = 1 - Math.abs(distanceFromCenter) * 0.02;
          const opacity = Math.max(0.8, 1 - Math.abs(distanceFromCenter) * 0.2);
          
          stepRef.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
          stepRef.style.opacity = opacity.toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSteps]);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="container mx-auto py-16 md:py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/6 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollProgress * 40}px) rotate(${scrollProgress * 90}deg)`,
            opacity: 0.5 - scrollProgress * 0.2
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/8 rounded-full blur-2xl"
          style={{
            transform: `translateY(${-scrollProgress * 30}px) scale(${1 + scrollProgress * 0.3})`,
            opacity: 0.6 - scrollProgress * 0.3
          }}
        />
      </div>

      {/* Process flow line - desktop only */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-px">
        <div className="relative w-full h-px bg-border/30">
          <div 
            ref={progressLineRef}
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
            style={{ width: `${progressLineWidth}%` }}
          />
          {/* Animated dots along the line */}
          {steps.map((_, index) => (
            <div
              key={index}
              className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                visibleSteps[index] 
                  ? 'bg-primary scale-100 opacity-100' 
                  : 'bg-border scale-75 opacity-50'
              }`}
              style={{ 
                left: `${(index + 0.5) / steps.length * 100}%`,
                transitionDelay: `${index * 300}ms`
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={headerRef}
        className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
          isHeaderVisible ? 'animate-header-appear opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className={`font-display text-3xl md:text-4xl transition-all duration-1200 ${
          isHeaderVisible ? 'animate-title-shimmer' : ''
        }`}>
          <span className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent">
            A simple, proven process
          </span>
        </h2>
        <p className={`mt-3 text-muted-foreground transition-all duration-1000 delay-300 ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Low lift for your team. High leverage for your ops.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <li 
            key={title} 
            ref={el => stepRefs.current[i] = el}
            className={`relative rounded-lg border p-6 glass hover-scale transition-all duration-700 group ${
              visibleSteps[i] 
                ? 'animate-step-rise opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              animationDelay: `${i * 300}ms`,
              transitionDelay: `${i * 200}ms`
            }}
          >
            {/* Step number indicator */}
            <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center transition-all duration-500 ${
              visibleSteps[i] ? 'animate-number-bounce scale-100' : 'scale-0'
            }`}
            style={{ animationDelay: `${i * 300 + 400}ms` }}>
              {i + 1}
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex size-10 items-center justify-center rounded-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                visibleSteps[i] ? 'animate-icon-appear' : ''
              }`} 
              style={{ 
                background: "hsl(var(--primary)/0.1)",
                animationDelay: `${i * 300 + 200}ms`
              }}>
                <Icon className={`text-primary transition-all duration-500 group-hover:scale-110 ${
                  visibleSteps[i] ? 'animate-icon-pulse' : ''
                }`} />
              </span>
              <h3 className={`text-lg font-semibold transition-all duration-500 group-hover:text-primary ${
                visibleSteps[i] ? 'animate-title-slide-in' : ''
              }`}
              style={{ animationDelay: `${i * 300 + 300}ms` }}>
                {title}
              </h3>
            </div>
            <p className={`mt-3 text-sm text-muted-foreground transition-all duration-700 ${
              visibleSteps[i] ? 'animate-description-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ animationDelay: `${i * 300 + 500}ms` }}>
              {desc}
            </p>

            {/* Progress indicator for mobile */}
            <div className="lg:hidden mt-4 flex justify-center">
              <div className="flex gap-1">
                {steps.map((_, stepIndex) => (
                  <div
                    key={stepIndex}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      stepIndex <= i && visibleSteps[i] 
                        ? 'bg-primary' 
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Connecting arrow for larger screens */}
            {i < steps.length - 1 && (
              <div className={`hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-border transition-all duration-500 ${
                visibleSteps[i] && visibleSteps[i + 1] ? 'text-primary animate-arrow-flow' : ''
              }`}
              style={{ animationDelay: `${i * 300 + 600}ms` }}>
                <ArrowRight className="size-6" />
              </div>
            )}
          </li>
        ))}
      </ol>

      <div 
        ref={ctaRef}
        className={`mt-10 flex items-center justify-center transition-all duration-1000 ${
          isCtaVisible ? 'animate-cta-appear opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <a href="#cta" className="story-link inline-flex items-center gap-2 text-sm group hover:text-primary transition-colors duration-300">
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            See a sample automation deck
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

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

        @keyframes step-rise {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes number-bounce {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.1) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes icon-appear {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-90deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes icon-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 0 transparent);
          }
          50% {
            filter: drop-shadow(0 0 8px hsl(var(--primary)/0.4));
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

        @keyframes arrow-flow {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(4px);
            opacity: 1;
          }
        }

        @keyframes cta-appear {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        .animate-step-rise {
          animation: step-rise 0.8s ease-out;
        }

        .animate-number-bounce {
          animation: number-bounce 0.7s ease-out;
        }

        .animate-icon-appear {
          animation: icon-appear 0.6s ease-out;
        }

        .animate-icon-pulse {
          animation: icon-pulse 2s ease-in-out infinite;
        }

        .animate-title-slide-in {
          animation: title-slide-in 0.6s ease-out;
        }

        .animate-description-fade-in {
          animation: description-fade-in 0.7s ease-out;
        }

        .animate-arrow-flow {
          animation: arrow-flow 1.5s ease-in-out infinite;
        }

        .animate-cta-appear {
          animation: cta-appear 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Process;
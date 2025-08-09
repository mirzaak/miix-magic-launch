import { useRef, useEffect, useState } from "react";
import heroImage from "@/assets/hero-miix.jpg";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const element = heroRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, scrollY / (elementTop + elementHeight - window.innerHeight)));
        
        // Apply parallax effect to different elements
        const textElements = element.querySelectorAll('.scroll-text');
        const imageElement = element.querySelector('.scroll-image');
        const badgeElement = element.querySelector('.scroll-badge');
        
        textElements.forEach((el, index) => {
          const speed = 0.3 + (index * 0.1); // Different speeds for staggered effect
          const translateY = scrollProgress * 50 * speed;
          const opacity = Math.max(0, 1 - scrollProgress * 1.5);
          (el as HTMLElement).style.transform = `translateY(${translateY}px)`;
          (el as HTMLElement).style.opacity = opacity.toString();
        });
        
        if (imageElement) {
          const translateY = scrollProgress * 30;
          const scale = 1 + scrollProgress * 0.1;
          (imageElement as HTMLElement).style.transform = `translateY(${translateY}px) scale(${scale})`;
        }
        
        if (badgeElement) {
          const translateY = scrollProgress * 20;
          const opacity = Math.max(0, 1 - scrollProgress * 2);
          (badgeElement as HTMLElement).style.transform = `translateY(${translateY}px)`;
          (badgeElement as HTMLElement).style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative overflow-hidden">
      <nav className={`container mx-auto flex items-center justify-between py-6 transition-all duration-700 ${
        isVisible ? 'animate-fade-in-down' : 'opacity-0 -translate-y-4'
      }`}>
        <a href="#" className="flex items-center gap-2">
          <div className="size-8 rounded-md"/>
          <img
            src={logo}
            alt="MIIX Automations Logo"
            className="h-8 w-auto"
          />
          <span className="font-display text-lg font-bold tracking-tight">MIIX Automations</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="story-link">Features</a>
          <a href="#process" className="story-link">Process</a>
          <a href="#" className="story-link">Services</a>
          <a href="#" className="story-link">Case Studies</a>
          <a href="#cta" className="story-link">Contact</a>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative container mx-auto grid gap-10 py-14 md:py-24 lg:grid-cols-2 lg:items-center bg-hero"
        aria-label="Hero section"
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          className="relative z-10 max-w-xl"
        >
          <p className={`scroll-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-all duration-1000 delay-200 ${
            isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="size-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--primary))" }} />
            AI + No‑Code Workflows That Scale
          </p>
          
          <h1 className={`scroll-text mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-6xl transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            Automate the busywork.
            <span className="block text-gradient animate-gradient-x">Grow what matters.</span>
          </h1>
          
          <p className={`scroll-text mt-5 text-base text-muted-foreground sm:text-lg transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            We design, build and maintain high‑impact automations across your stack so your team can focus on value, not manual tasks.
          </p>
          
          <div className={`scroll-text mt-8 flex flex-wrap items-center gap-3 transition-all duration-1000 delay-700 ${
            isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button variant="hero" size="lg" className="hover-scale animate-bounce-subtle">Book a free audit</Button>
            <Button variant="secondary" size="lg" className="hover-scale">See how it works</Button>
          </div>
          
          <p className={`scroll-text mt-4 text-xs text-muted-foreground transition-all duration-1000 delay-900 ${
            isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Zapier • Make • Airtable • Notion • Slack • OpenAI
          </p>
        </div>

        <div className={`relative transition-all duration-1200 delay-400 ${
          isVisible ? 'animate-fade-in-left opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="absolute inset-0 -z-10 rounded-2xl shadow-2xl animate-pulse-glow" style={{ boxShadow: "var(--shadow-glow)" }} />
          <div className="scroll-image relative overflow-hidden rounded-2xl">
            <img
              src={heroImage}
              alt="Abstract automation background with flowing gradient ribbons"
              loading="eager"
              className="w-full rounded-2xl object-cover shadow-xl transition-transform duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay animate-gradient-shift" 
                 style={{ background: "radial-gradient(30rem 16rem at var(--mx,60%) var(--my,40%), hsl(var(--primary)/0.25), transparent 50%)" }} 
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes gradient-shift {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.7s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Hero;
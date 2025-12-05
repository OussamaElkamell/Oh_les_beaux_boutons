import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CreditCard, Scale, LayoutDashboard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: CreditCard,
    title: "Swipe des Technologies",
    description: "Parcours les outils numériques utilisés dans ton établissement et choisis ton camp.",
    bgClass: "bg-pastel-pink/50",
    iconClass: "text-destructive",
  },
  {
    icon: Scale,
    title: "Découvre Big Tech vs NIRD",
    description: "Compare les solutions propriétaires aux alternatives libres et responsables.",
    bgClass: "bg-pastel-yellow/50",
    iconClass: "text-accent-foreground",
  },
  {
    icon: LayoutDashboard,
    title: "Obtiens ton Profil NIRD",
    description: "Reçois un diagnostic complet avec des recommandations personnalisées.",
    bgClass: "bg-pastel-green/50",
    iconClass: "text-primary",
  },
];

export const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".how-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        const icon = card.querySelector(".step-icon");
        if (icon) {
          gsap.to(icon, {
            y: -6,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10">
        <h2 className="how-title font-heading text-3xl md:text-5xl text-center mb-16 text-foreground">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className="card-clean p-8 group cursor-pointer transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`step-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${step.bgClass}`}>
                  <IconComponent className={`w-8 h-8 ${step.iconClass}`} />
                </div>

                <h3 className="font-heading text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="font-body text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground font-body">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-foreground text-background">
                    {index + 1}
                  </span>
                  <span>Étape {index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
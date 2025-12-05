import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Check, DollarSign, Leaf, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const demoCards = [
  {
    name: "Google Classroom",
    type: "Big Tech",
    badge: "destructive",
    stats: [
      { icon: DollarSign, label: "Coût", value: "Gratuit*" },
      { icon: Leaf, label: "CO2", value: "12kg/an" },
      { icon: Database, label: "Données", value: "USA" },
    ],
  },
  {
    name: "Moodle",
    type: "NIRD",
    badge: "primary",
    stats: [
      { icon: DollarSign, label: "Coût", value: "Libre" },
      { icon: Leaf, label: "CO2", value: "3kg/an" },
      { icon: Database, label: "Données", value: "France" },
    ],
  },
  {
    name: "Microsoft Teams",
    type: "Big Tech",
    badge: "destructive",
    stats: [
      { icon: DollarSign, label: "Coût", value: "5€/mois" },
      { icon: Leaf, label: "CO2", value: "18kg/an" },
      { icon: Database, label: "Données", value: "Ireland" },
    ],
  },
];

export const SwipeDemoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phone entrance animation
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Auto-play swipe demo
      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play pause resume pause",
        },
      });

      timeline.call(() => setSwipeDirection("left"), [], "+=2");
      timeline.call(() => {
        setSwipeDirection(null);
        setCurrentCard((prev) => (prev + 1) % demoCards.length);
      }, [], "+=0.5");
      timeline.call(() => setSwipeDirection("right"), [], "+=2");
      timeline.call(() => {
        setSwipeDirection(null);
        setCurrentCard((prev) => (prev + 1) % demoCards.length);
      }, [], "+=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const card = demoCards[currentCard];

  return (
    <section
      ref={sectionRef}
      id="swipe-demo"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-hero">
              Swipe pour découvrir
            </h2>
            <p className="font-body text-lg text-foreground/70 max-w-lg">
              Chaque carte te présente une technologie utilisée dans les établissements scolaires. 
              Swipe à gauche pour rejeter, à droite pour adopter.
            </p>

            {/* Progress indicator */}
            <div className="flex items-center gap-4">
              <span className="font-heading font-bold text-foreground">
                Carte {currentCard + 1}/{demoCards.length}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-xs">
                <div 
                  className="h-full bg-gradient-to-r from-neon-pink to-primary rounded-full transition-all duration-500"
                  style={{ width: `${((currentCard + 1) / demoCards.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <button 
                className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center text-destructive hover:bg-destructive hover:text-foreground transition-all duration-300 hover:scale-110"
                onClick={() => setCurrentCard((prev) => (prev + 1) % demoCards.length)}
              >
                <X className="w-6 h-6" />
              </button>
              <button 
                className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                onClick={() => setCurrentCard((prev) => (prev + 1) % demoCards.length)}
              >
                <Check className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: iPhone Mockup */}
          <div ref={phoneRef} className="flex justify-center order-1 lg:order-2">
            <div className="iphone-frame w-[280px] md:w-[320px]">
              <div className="iphone-notch" />
              <div className="iphone-screen aspect-[9/19] relative p-4 pt-10">
                {/* Card */}
                <div 
                  className={`swipe-card h-full flex flex-col transition-all duration-500 ${
                    swipeDirection === "left" 
                      ? "-translate-x-[150%] -rotate-12 opacity-0" 
                      : swipeDirection === "right"
                      ? "translate-x-[150%] rotate-12 opacity-0"
                      : ""
                  }`}
                >
                  {/* Badge */}
                  <div className={`self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                    card.badge === "destructive" 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-primary/20 text-primary"
                  }`}>
                    {card.type}
                  </div>

                  {/* Card content */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                      <span className="text-3xl">
                        {card.badge === "destructive" ? "🏢" : "🌱"}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {card.name}
                    </h3>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mt-auto">
                    {card.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <stat.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="ml-auto font-semibold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-center gap-8 mt-6">
                    <button className="w-12 h-12 rounded-full bg-destructive/30 flex items-center justify-center text-destructive">
                      <X className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-primary">
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

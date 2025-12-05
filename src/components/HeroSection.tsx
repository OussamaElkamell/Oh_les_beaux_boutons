import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1.2, ease: "back.out(1.7)" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const element = document.querySelector("#how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Animated growing circles from center-bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/3 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full"
            style={{
              width: "30vw",
              height: "30vw",
              position:"absolute",
              bottom:"-50%",
              border: "2px solid rgba(0,0,0,0.35)",
              opacity: 0.2,
              mixBlendMode: "multiply",
            }}
            animate={{
              scale: [1, 2.8],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 15,
              delay: i * 3,
              repeat: Infinity,
              ease: [0.5, 1, 0.5, 1],
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 pt-20 lg:pt-0">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1
            ref={headlineRef}
            className="font-heading text-hero-mobile lg:text-hero-desktop text-foreground leading-tight"
          >
            Swipe & Libère ton Établissement
          </h1>

          <p
            ref={subtextRef}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          >
            Découvre en 5 minutes si ton école est Big Tech dépendante ou NIRD résistante
          </p>

          <button
            ref={ctaRef}
            onClick={() => navigate('/game')}
            className="btn-primary text-lg md:text-xl inline-flex items-center gap-2 py-3"
          >
            Commencer le Swipe
          </button>

          {/* Feature tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <span className="tag tag-success">Inclusion</span>
            <span className="tag tag-info">Responsabilité</span>
            <span className="tag tag-purple">Durabilité</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </button>
    </section>
  );
};
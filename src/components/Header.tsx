import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Concept", href: "#how-it-works" },
  { name: "Swipe", href: "#swipe-demo" },
  { name: "Profil", href: "#results" },
  { name: "NIRD Officiel", href: "https://nird.forge.apps.education.fr/", external: true },
];

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Shrink header on scroll
    ScrollTrigger.create({
      start: "top -50",
      end: 99999,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    // Track active section
    const sections = ["how-it-works", "swipe-demo", "pillars", "results"];
    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-card/90 backdrop-blur-md border-b border-border/50 shadow-soft" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto w-[70%] flex items-center justify-between px-4">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 font-heading text-xl md:text-2xl text-foreground"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-primary">NIRD</span>
          <span className="text-destructive">Swipe</span>
         
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={(e) => !link.external && handleNavClick(e, link.href)}
              className={`relative font-body text-sm font-medium transition-colors duration-300 
                ${activeSection === link.href.replace("#", "") 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-foreground"
                }
                after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full 
                after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform 
                after:duration-300 hover:after:scale-x-100
                ${activeSection === link.href.replace("#", "") ? "after:scale-x-100" : ""}
              `}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-foreground" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};
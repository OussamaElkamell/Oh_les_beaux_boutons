import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: "Inclusion", value: 65, color: "#60a5fa" },
  { label: "Responsabilité", value: 80, color: "#2CB585" },
  { label: "Durabilité", value: 70, color: "#fbbf24" },
];

const recommendations = [
  { text: "Passer 30% du parc sous Linux", result: "15k€/an économisés" },
  { text: "Nextcloud académique", result: "Données protégées" },
  { text: "Reconditionner 50 PC", result: "-2 tonnes CO2" },
];

export const ResultsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [metricValues, setMetricValues] = useState([0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".results-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Card animation
      gsap.fromTo(
        ".results-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Animate score counter
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          // Animate main score
          gsap.to({}, {
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              setScore(Math.round(72 * this.progress()));
            },
          });

          // Animate metric bars
          metrics.forEach((metric, i) => {
            gsap.to({}, {
              duration: 1.5,
              delay: 0.3 + i * 0.2,
              ease: "power2.out",
              onUpdate: function() {
                setMetricValues(prev => {
                  const newValues = [...prev];
                  newValues[i] = Math.round(metric.value * this.progress());
                  return newValues;
                });
              },
            });
          });
        },
        once: true,
      });

      // Recommendations stagger
      gsap.fromTo(
        ".recommendation-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".recommendations-list",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate gauge color based on score
  const getGaugeColor = (value: number) => {
    if (value < 40) return "#ef4444";
    if (value < 70) return "#fbbf24";
    return "#2CB585";
  };

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-deep-purple-light/20 to-background" />

      <div className="container relative z-10">
        <h2 className="results-title font-heading text-3xl md:text-5xl font-bold text-center mb-16 text-gradient-hero">
          Aperçu de ton Profil NIRD
        </h2>

        <div className="results-card glass-card p-8 lg:p-12 rounded-3xl max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Gauge */}
            <div className="flex flex-col items-center">
              {/* Circular Gauge */}
              <div ref={gaugeRef} className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={getGaugeColor(score)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
                    className="transition-all duration-100"
                    style={{
                      filter: `drop-shadow(0 0 10px ${getGaugeColor(score)})`,
                    }}
                  />
                </svg>
                
                {/* Score text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span 
                    className="font-heading text-5xl font-bold"
                    style={{ color: getGaugeColor(score) }}
                  >
                    {score}%
                  </span>
                  <span className="text-sm text-muted-foreground">Score NIRD</span>
                </div>
              </div>

              {/* Metric bars */}
              <div className="w-full space-y-4">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/80">{metric.label}</span>
                      <span className="font-semibold" style={{ color: metric.color }}>
                        {metricValues[i]}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${metricValues[i]}%`,
                          backgroundColor: metric.color,
                          boxShadow: `0 0 10px ${metric.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Recommendations */}
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                Plan d'action personnalisé
              </h3>

              <ul className="recommendations-list space-y-4">
                {recommendations.map((rec, i) => (
                  <li
                    key={i}
                    className="recommendation-item glass-card p-4 rounded-xl flex items-start gap-4 hover:translate-x-2 transition-transform duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{rec.text}</p>
                      <p className="text-sm text-primary mt-1">→ {rec.result}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground/80">
                  <span className="font-bold text-primary">Potentiel d'économie :</span> 15 000€/an 
                  et -2 tonnes de CO2 avec les solutions NIRD recommandées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

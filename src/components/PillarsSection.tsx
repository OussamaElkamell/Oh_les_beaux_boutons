import { useEffect, useRef, Suspense, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    emoji: "♿",
    title: "Inclusion",
    description: "Des outils accessibles à tous, sans barrière économique ni technique.",
    color: "#60a5fa", // blue
    glowColor: "blue",
  },
  {
    emoji: "🔒",
    title: "Responsabilité",
    description: "Protection des données personnelles et respect de la vie privée.",
    color: "#2CB585", // green
    glowColor: "green",
  },
  {
    emoji: "🌍",
    title: "Durabilité",
    description: "Réduction de l'empreinte carbone et prolongation de la vie des équipements.",
    color: "#fbbf24", // yellow
    glowColor: "yellow",
  },
];

// Morphing Blob Component
const MorphingBlob = ({ activeColor }: { activeColor: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      
      // Morph effect using scale
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.color, {
        r: new THREE.Color(activeColor).r,
        g: new THREE.Color(activeColor).g,
        b: new THREE.Color(activeColor).b,
        duration: 0.5,
      });
      gsap.to(materialRef.current.emissive, {
        r: new THREE.Color(activeColor).r * 0.3,
        g: new THREE.Color(activeColor).g * 0.3,
        b: new THREE.Color(activeColor).b * 0.3,
        duration: 0.5,
      });
    }
  }, [activeColor]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color={activeColor} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbiting particles */}
      {[...Array(30)].map((_, i) => (
        <OrbitingParticle key={i} index={i} color={activeColor} />
      ))}
    </>
  );
};

const OrbitingParticle = ({ index, color }: { index: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 2.5 + Math.random() * 1.5;
  const speed = 0.2 + Math.random() * 0.3;
  const offset = (index / 30) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * radius * 0.5;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export const PillarsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeColor, setActiveColor] = useState(pillars[1].color);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".pillars-title",
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

      // Cards scale-in animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={null}>
            <MorphingBlob activeColor={activeColor} />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10">
        <h2 className="pillars-title font-heading text-3xl md:text-5xl font-bold text-center mb-16 text-gradient-hero">
          Les 3 Piliers NIRD
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="pillar-card group cursor-pointer"
              onMouseEnter={() => setActiveColor(pillar.color)}
              style={{
                background: `white`,
              }}
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 60px ${pillar.color}40, inset 0 0 60px ${pillar.color}10`,
                }}
              />

              <div className="relative z-10">
                <div 
                  className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: `drop-shadow(0 0 20px ${pillar.color})` }}
                >
                  {pillar.emoji}
                </div>

                <h3 
                  className="font-heading text-2xl font-bold mb-4 transition-colors duration-300"
                  style={{ color: pillar.color }}
                >
                  {pillar.title}
                </h3>

                <p className="font-body text-foreground/70 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: pillar.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

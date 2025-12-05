import { useEffect, useRef, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Floating shapes component
const FloatingShapes = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2CB585" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#FF4F9A" />
      
      {/* Hearts */}
      {[...Array(5)].map((_, i) => (
        <FloatingHeart key={`heart-${i}`} index={i} />
      ))}
      
      {/* Shields */}
      {[...Array(4)].map((_, i) => (
        <FloatingShield key={`shield-${i}`} index={i} />
      ))}
      
      {/* Linux logos (pentagons) */}
      {[...Array(3)].map((_, i) => (
        <FloatingPentagon key={`pentagon-${i}`} index={i} />
      ))}
    </>
  );
};

const FloatingHeart = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Group>(null);
  const startPos = {
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 4,
    z: (Math.random() - 0.5) * 4,
  };

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + index * 2;
      ref.current.position.x = startPos.x + Math.sin(t * 0.5) * 0.5;
      ref.current.position.y = startPos.y + Math.sin(t * 0.7) * 0.3;
      ref.current.rotation.y = t * 0.3;
      ref.current.rotation.z = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={ref} position={[startPos.x, startPos.y, startPos.z]}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF4F9A" emissive="#FF4F9A" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const FloatingShield = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const startPos = {
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 5,
    z: (Math.random() - 0.5) * 3 - 2,
  };

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + index * 1.5;
      ref.current.position.x = startPos.x + Math.cos(t * 0.4) * 0.4;
      ref.current.position.y = startPos.y + Math.sin(t * 0.6) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[startPos.x, startPos.y, startPos.z]}>
      <octahedronGeometry args={[0.2]} />
      <meshStandardMaterial color="#2CB585" emissive="#2CB585" emissiveIntensity={0.3} wireframe />
    </mesh>
  );
};

const FloatingPentagon = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const startPos = {
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 4,
    z: (Math.random() - 0.5) * 4,
  };

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + index * 3;
      ref.current.position.x = startPos.x + Math.sin(t * 0.3) * 0.6;
      ref.current.position.y = startPos.y + Math.cos(t * 0.5) * 0.4;
      ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[startPos.x, startPos.y, startPos.z]}>
      <dodecahedronGeometry args={[0.15]} />
      <meshStandardMaterial color="#FF8A3C" emissive="#FF8A3C" emissiveIntensity={0.3} />
    </mesh>
  );
};

export const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLaunch = () => {
    navigate('/game');
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-cta opacity-80" />
      
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>
        </Canvas>
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-pink/20 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Prêt à swiper ton établissement vers la{" "}
            <span className="text-gradient-cta">liberté numérique</span> ?
          </h2>

          <p className="font-body text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
            En 5 minutes, découvre ton score NIRD et obtiens un plan d'action concret pour libérer ton école.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLaunch}
              className="btn-primary text-lg px-10 py-5 breathing"
            >
              Lancer NIRD swipe 💚
            </button>
            
            <a
              href="https://nird.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-10 py-5"
            >
              Découvrir NIRD
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-foreground/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              100% gratuit
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Aucune inscription
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Données non collectées
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

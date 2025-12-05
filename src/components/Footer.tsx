import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Project info */}
          <div className="text-center md:text-left">
            <p className="font-body text-sm text-muted-foreground">
              Projet{" "}
              <a 
                href="https://www.nuitdelinfo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Nuit de l'Info 2025
              </a>
              {" "}– Démarche{" "}
              <a 
                href="https://nird.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                NIRD
              </a>
            </p>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center gap-2 font-heading text-lg">
            <span className="text-primary">NIRD</span>
            <span className="text-destructive">swipe</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6 text-sm font-body">
            <a
              href="https://nird.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              NIRD Officiel
            </a>
            <a
              href="https://nird.fr/ressources"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Ressources
            </a>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground font-body">
            Fait avec 💚 pour l'indépendance numérique des établissements scolaires
          </p>
        </div>
      </div>
    </footer>
  );
};
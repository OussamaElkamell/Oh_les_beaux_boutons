import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  User, LogOut, Menu, X, Home, Gamepad2, Trophy, LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppHeaderProps {
  variant?: 'default' | 'transparent';
  showNav?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  variant = 'default',
  showNav = true 
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/game', label: 'Jouer', icon: Gamepad2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const headerClasses = variant === 'transparent' 
    ? 'bg-transparent backdrop-blur-sm'
    : 'bg-card/80 backdrop-blur-xl border-b border-border';

  return (
    <header className={`sticky top-0 z-50 ${headerClasses}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors"
          >
            NIRD
          </Link>

          {/* Desktop Navigation */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive(link.href) 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }
                  `}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {user.first_name?.[0] || user.username?.[0] || 'U'}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      {user.first_name || user.username}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Mon Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/game')} className="cursor-pointer">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Jouer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="hidden sm:flex"
                >
                  Se connecter
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <LogIn className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">S'inscrire</span>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && showNav && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive(link.href) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }
                    `}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive('/profile') 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }
                    `}
                  >
                    <Trophy className="w-5 h-5" />
                    Mon Profil
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

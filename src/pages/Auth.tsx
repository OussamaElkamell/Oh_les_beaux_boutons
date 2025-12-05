import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2, School, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

type AuthMode = 'login' | 'signup';

const SCHOOL_TYPES = [
  { value: 'college', label: 'Collège' },
  { value: 'lycee', label: 'Lycée' },
  { value: 'universite', label: 'Université' },
  { value: 'ecole_primaire', label: 'École primaire' },
  { value: 'autre', label: 'Autre' },
];

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    schoolName: '',
    schoolType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSchoolTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      schoolType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        // Validate passwords match
        if (formData.password !== formData.passwordConfirm) {
          throw new Error('Les mots de passe ne correspondent pas');
        }

        // Split name into first and last name
        const [first_name, ...lastNameParts] = (formData.name || '').split(' ');
        const last_name = lastNameParts.join(' ');

        // Generate username from email
        const username = formData.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

        await register({
          username,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.passwordConfirm,
          first_name: first_name || undefined,
          last_name: last_name || undefined,
          school_name: formData.schoolName || undefined,
          school_type: formData.schoolType || undefined,
        });
      }
      
      toast({
        title: mode === 'login' ? 'Connexion réussie!' : 'Compte créé!',
        description: 'Bienvenue sur NIRD swipe',
      });
      navigate('/game');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border/50 text-muted-foreground hover:text-foreground transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour</span>
          </motion.button>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Card */}
            <div className="bg-card rounded-3xl shadow-soft-lg border border-border/50 p-8">
              {/* Logo/Title */}
              <div className="text-center mb-8">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-3xl">🌿</span>
                </motion.div>
                <h1 className="font-heading text-2xl text-foreground mb-2">
                  {mode === 'login' ? 'Bon retour!' : 'Créer un compte'}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {mode === 'login' 
                    ? 'Connectez-vous pour sauvegarder vos progrès'
                    : 'Rejoignez le mouvement NIRD'
                  }
                </p>
              </div>

              {/* Mode tabs */}
              <div className="flex gap-2 p-1 bg-secondary rounded-full mb-6">
                {(['login', 'signup'] as AuthMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                      mode === m
                        ? 'bg-card text-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {m === 'login' ? 'Connexion' : 'Inscription'}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === 'signup' && (
                    <motion.div
                      key="signup-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Nom complet</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 rounded-xl border-border/50 bg-secondary/50"
                          />
                        </div>
                      </div>

                      {/* School Name */}
                      <div className="space-y-2">
                        <Label htmlFor="schoolName" className="text-foreground">Établissement (optionnel)</Label>
                        <div className="relative">
                          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="schoolName"
                            name="schoolName"
                            type="text"
                            placeholder="Nom de votre établissement"
                            value={formData.schoolName}
                            onChange={handleInputChange}
                            className="pl-10 rounded-xl border-border/50 bg-secondary/50"
                          />
                        </div>
                      </div>

                      {/* School Type */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Type d'établissement (optionnel)</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                          <Select value={formData.schoolType} onValueChange={handleSchoolTypeChange}>
                            <SelectTrigger className="pl-10 rounded-xl border-border/50 bg-secondary/50">
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                              {SCHOOL_TYPES.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.fr"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 rounded-xl border-border/50 bg-secondary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="pl-10 pr-10 rounded-xl border-border/50 bg-secondary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {mode === 'signup' && (
                    <motion.div
                      key="password-confirm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="passwordConfirm" className="text-foreground">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.passwordConfirm}
                          onChange={handleInputChange}
                          required={mode === 'signup'}
                          minLength={6}
                          className="pl-10 pr-10 rounded-xl border-border/50 bg-secondary/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 h-12"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    mode === 'login' ? 'Se connecter' : 'Créer mon compte'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Guest continue */}
              <Button
                variant="outline"
                onClick={handleGuestContinue}
                className="w-full rounded-xl border-border/50 h-12"
              >
                Continuer sans compte
              </Button>

              {/* Footer note */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Auth;

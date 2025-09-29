import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Heart, Shield, Users, MapPin } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-hero">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {t('common.arogypath')}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t('common.ruralHealthcare')}
              </p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <div className="min-h-screen flex">
        {/* Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 flex-col justify-center">
          <div className="max-w-lg">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
                {t('common.ruralHealthcare')}
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Connect with doctors, manage prescriptions, and access pharmacy services all in one platform
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-patient/10">
                  <Users className="h-6 w-6 text-patient" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Multi-Role Platform</h3>
                  <p className="text-muted-foreground">
                    Designed for patients, doctors, and pharmacists with role-specific features
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-doctor/10">
                  <Heart className="h-6 w-6 text-doctor" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Comprehensive Care</h3>
                  <p className="text-muted-foreground">
                    From video consultations to prescription management and medicine delivery
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Rural Focus</h3>
                  <p className="text-muted-foreground">
                    Multilingual support and offline capabilities for remote areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pharmacist/10">
                  <Shield className="h-6 w-6 text-pharmacist" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Secure & Reliable</h3>
                  <p className="text-muted-foreground">
                    HIPAA-compliant security with reliable offline support
                  </p>
                </div>
              </div>
            </div>

            {/* Languages supported */}
            <div className="mt-8 p-4 rounded-lg bg-card border border-border">
              <h4 className="font-semibold mb-2">Supported Languages</h4>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>🇺🇸 English</span>
                <span>🇮🇳 हिंदी</span>
                <span>🇮🇳 ਪੰਜਾਬੀ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Form Section */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <SignupForm onToggleMode={toggleMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Lock, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as UserRole | '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(formData.email, formData.password, formData.role as UserRole);
      toast({
        title: "Welcome!",
        description: "Login successful",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="healthcare-card w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          {t('auth.welcomeBack')}
        </CardTitle>
        <CardDescription className="text-base">
          {t('auth.login')} to your healthcare account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('auth.email')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="transition-smooth focus:shadow-soft"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {t('auth.password')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="transition-smooth focus:shadow-soft"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              {t('auth.selectRole')}
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
              <SelectTrigger className="transition-smooth focus:shadow-soft">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-patient"></div>
                    {t('auth.patient')}
                  </div>
                </SelectItem>
                <SelectItem value="doctor" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-doctor"></div>
                    {t('auth.doctor')}
                  </div>
                </SelectItem>
                <SelectItem value="pharmacist" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pharmacist"></div>
                    {t('auth.pharmacist')}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            variant="hero"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              t('auth.login')
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <button
              type="button"
              className="text-primary hover:underline transition-smooth"
              onClick={() => {/* TODO: Forgot password */}}
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          <Separator />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.dontHaveAccount')} </span>
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline font-medium transition-smooth"
            >
              {t('auth.signup')}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
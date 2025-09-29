import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Lock, User, Phone, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  onToggleMode: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const { t } = useTranslation();
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role as UserRole,
      });
      toast({
        title: "Success!",
        description: "Account created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Signup failed. Please try again.",
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
          {t('auth.createAccount')}
        </CardTitle>
        <CardDescription className="text-base">
          Join our healthcare platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('auth.fullName')}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="transition-smooth focus:shadow-soft"
              required
            />
          </div>

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
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('auth.phoneNumber')}
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 9876543210"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="transition-smooth focus:shadow-soft"
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

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {t('auth.password')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="transition-smooth focus:shadow-soft"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {t('auth.confirmPassword')}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="transition-smooth focus:shadow-soft"
              required
            />
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
              t('auth.signup')
            )}
          </Button>

          <Separator />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.alreadyHaveAccount')} </span>
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:underline font-medium transition-smooth"
            >
              {t('auth.login')}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
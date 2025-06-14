
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast'; // <-- FIXED IMPORT
import { resendConfirmationEmail } from './resendConfirmation';

interface AuthFormProps {
  isSignUp: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthForm = ({ isSignUp, loading, setLoading }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { toast } = useToast();

  // Track if user should see "resend confirmation"
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResend(false);
    console.log('Starting email auth:', { isSignUp, email });

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        // Check if email confirmation is required
        if (data.user && !data.session) {
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link. Please check your email and click the link to activate your account.",
          });
        } else if (data.session) {
          toast({
            title: "Account created!",
            description: "Welcome to CalendarHub!",
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      let errorMessage = error.message;

      if (error.message === 'Invalid login credentials') {
        if (isSignUp) {
          errorMessage = "There was an issue creating your account. Please try again.";
        } else {
          errorMessage = "Invalid email or password. If you just signed up, please check your email for a confirmation link first.";
        }
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please check your email and click the confirmation link before signing in.";
        setShowResend(true);
      } else if (error.message.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Try signing in instead.";
      }

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendLoading(true);
    try {
      await resendConfirmationEmail(email);
      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox (and spam folder) for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error resending email",
        description: error.message || "Failed to resend the email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailAuth} className="space-y-4">
      {isSignUp && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="fullName"
              placeholder="Enter your full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
              required={isSignUp}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
            minLength={6}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Sign in')}
      </Button>

      {!isSignUp && (
        <div className="text-center text-sm text-gray-600">
          <p>If you just signed up, please check your email for a confirmation link first.</p>
        </div>
      )}

      {showResend && !isSignUp && (
        <div className="flex flex-col items-center space-y-2 mt-2">
          <p className="text-xs text-gray-500">
            Didn't get the confirmation email? Check your spam/junk folder or resend it.
          </p>
          <Button
            type="button"
            size="sm"
            className="w-auto"
            onClick={handleResendConfirmation}
            disabled={resendLoading}
          >
            {resendLoading ? 'Resending...' : 'Resend confirmation email'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { resendConfirmationEmail } from './resendConfirmation';
import SocialAuthButton from './SocialAuthButton';
import FullNameField from './FullNameField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ResendConfirmationSection from './ResendConfirmationSection';

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
      } else if (error.message && error.message.includes('Email not confirmed')) {
        errorMessage = "Please check your email and click the confirmation link before signing in.";
        setShowResend(true);
      } else if (error.message && error.message.includes('User already registered')) {
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
      <SocialAuthButton loading={loading} setLoading={setLoading} />

      <div className="flex items-center mb-2">
        <div className="flex-grow border-t border-gray-200" />
        <span className="px-2 text-xs text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      {isSignUp && (
        <FullNameField
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required={isSignUp}
        />
      )}

      <EmailField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Sign in')}
      </Button>

      {!isSignUp && (
        <div className="text-center text-sm text-gray-600">
          <p>If you just signed up, please check your email for a confirmation link first.</p>
        </div>
      )}

      <ResendConfirmationSection
        show={showResend}
        isSignUp={isSignUp}
        resendLoading={resendLoading}
        onResend={handleResendConfirmation}
      />
    </form>
  );
};

export default AuthForm;

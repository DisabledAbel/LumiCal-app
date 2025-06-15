
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
// Add for Radix UI checkbox
import { Checkbox } from '@/components/ui/checkbox';

interface AuthFormProps {
  isSignUp: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthForm = ({ isSignUp, loading, setLoading }: AuthFormProps) => {
  // For debugging
  console.log('AuthForm rendered. isSignUp:', isSignUp, 'loading:', loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { toast } = useToast();

  // Track if user should see "resend confirmation"
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  // New: Stay logged in
  const [stayLoggedIn, setStayLoggedIn] = useState(true);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    setShowResend(false);
    console.log('Starting email auth:', { isSignUp, email, stayLoggedIn });

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName },
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
        // If user unchecked stayLoggedIn, create a one-off client with sessionStorage
        let signInSupabase = supabase;
        if (!stayLoggedIn) {
          // Dynamically import createClient so it doesn't break SSR/builds
          const { createClient } = await import('@supabase/supabase-js');
          signInSupabase = createClient(
            // @ts-ignore: The supabase client exposes these constants
            supabase._options.url,
            supabase._options.headers['apikey'] || supabase._options.headers['Authorization'],
            {
              auth: {
                storage: window.sessionStorage,
                persistSession: false,
                autoRefreshToken: true,
              },
            }
          );
        }
        const { data, error } = await signInSupabase.auth.signInWithPassword({
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

      setFormError(errorMessage);
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

  // If you're seeing a blank screen, this log should always appear unless the import/compilation failed.
  console.log('AuthForm about to return JSX. showResend:', showResend);

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

      {/* Only show stay logged in for sign in */}
      {!isSignUp && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="stayLoggedIn"
            checked={stayLoggedIn}
            onCheckedChange={(checked) => setStayLoggedIn(Boolean(checked))}
            disabled={loading}
          />
          <label
            htmlFor="stayLoggedIn"
            className="text-sm select-none text-gray-700 cursor-pointer"
          >
            Stay logged in
          </label>
        </div>
      )}

      {formError && (
        <div className="text-red-600 text-xs text-center">{formError}</div>
      )}

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


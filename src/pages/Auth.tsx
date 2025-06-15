
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/Auth/AuthLayout';
import AuthHeader from '@/components/Auth/AuthHeader';
import AuthCard from '@/components/Auth/AuthCard';
import AuthForm from '@/components/Auth/AuthForm';
import AuthToggle from '@/components/Auth/AuthToggle';
import { supabase } from '@/integrations/supabase/client';

const DEV_EMAIL = "devuser@example.com";
const DEV_PASSWORD = "devpassword";

// Helper function to determine if we're running in dev mode (localhost/127.0.0.1)
const isDevMode = () =>
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  console.log('Auth component rendered:', { user, authLoading, loading });

  // DEV MODE AUTO-LOGIN ================================
  useEffect(() => {
    // Only run in dev AND if not already authenticated AND not currently loading auth
    if (
      isDevMode() &&
      !user &&
      !authLoading
    ) {
      const tryDevLogin = async () => {
        setLoading(true);
        // Try to sign in with test credentials
        const { error } = await supabase.auth.signInWithPassword({
          email: DEV_EMAIL,
          password: DEV_PASSWORD,
        });

        if (error && error.message.includes("invalid login credentials")) {
          // If user doesn't exist, create the user
          await supabase.auth.signUp({
            email: DEV_EMAIL,
            password: DEV_PASSWORD,
            options: {
              emailRedirectTo: `${window.location.origin}/`,
              data: { full_name: "Dev User" },
            },
          });
          // After signup, try again to sign in
          await supabase.auth.signInWithPassword({
            email: DEV_EMAIL,
            password: DEV_PASSWORD,
          });
        }
        setLoading(false);
      };

      tryDevLogin();
    }
  }, [user, authLoading]);
  // ====================================================

  useEffect(() => {
    console.log('Auth useEffect - user changed:', user);
    if (user && !authLoading) {
      console.log('User authenticated, navigating to home');
      navigate('/');
    }
  }, [user, navigate, authLoading]);

  // Show loading spinner while auth is being checked or during auto-login
  if (authLoading || loading) {
    console.log('Auth loading, showing spinner');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering auth form');

  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard isSignUp={isSignUp}>
        <AuthForm
          isSignUp={isSignUp}
          loading={loading}
          setLoading={setLoading}
        />

        <AuthToggle
          isSignUp={isSignUp}
          onToggle={() => setIsSignUp(!isSignUp)}
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Auth;


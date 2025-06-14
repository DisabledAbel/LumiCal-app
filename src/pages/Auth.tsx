
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/Auth/AuthLayout';
import AuthHeader from '@/components/Auth/AuthHeader';
import AuthCard from '@/components/Auth/AuthCard';
import SocialAuthButton from '@/components/Auth/SocialAuthButton';
import AuthForm from '@/components/Auth/AuthForm';
import AuthToggle from '@/components/Auth/AuthToggle';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  console.log('Auth component rendered:', { user, authLoading, loading });

  useEffect(() => {
    console.log('Auth useEffect - user changed:', user);
    if (user && !authLoading) {
      console.log('User authenticated, navigating to home');
      navigate('/');
    }
  }, [user, navigate, authLoading]);

  // Show loading spinner while auth is being checked
  if (authLoading) {
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
        <SocialAuthButton loading={loading} setLoading={setLoading} />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

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

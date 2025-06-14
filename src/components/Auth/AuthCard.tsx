
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  isSignUp: boolean;
  children: React.ReactNode;
}

const AuthCard = ({ isSignUp, children }: AuthCardProps) => {
  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp 
            ? 'Sign up to get started with CalendarHub' 
            : 'Sign in to your account to continue'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default AuthCard;

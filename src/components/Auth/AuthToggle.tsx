
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const AuthToggle = ({ isSignUp, onToggle }: AuthToggleProps) => {
  return (
    <div className="text-center text-sm">
      <span className="text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
      </span>
      <Button
        variant="link"
        className="p-0 ml-1 h-auto font-semibold"
        onClick={onToggle}
      >
        {isSignUp ? 'Sign in' : 'Sign up'}
      </Button>
    </div>
  );
};

export default AuthToggle;

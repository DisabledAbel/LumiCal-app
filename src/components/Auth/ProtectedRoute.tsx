import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ALLOWED_IP = '69.129.103.132';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [ipBypassed, setIpBypassed] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch user's IP once, only on the client side
    const checkIpBypass = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === ALLOWED_IP) {
          setIpBypassed(true);
        } else {
          setIpBypassed(false);
        }
      } catch (e) {
        // On failure, require login for safety
        setIpBypassed(false);
      }
    };
    checkIpBypass();
  }, []);

  // Wait for both auth and IP logic to complete
  if (loading || ipBypassed === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Allow access from allowed IP without login
  if (ipBypassed) {
    return <>{children}</>;
  }

  // Otherwise, require authentication
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

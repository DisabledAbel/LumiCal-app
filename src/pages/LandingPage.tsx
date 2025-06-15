
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-950 dark:to-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-950 dark:to-slate-900 text-center p-4">
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm p-8 rounded-xl shadow-lg animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Arvo Calu
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl">
          Your new favorite application. Discover amazing features and get started today.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

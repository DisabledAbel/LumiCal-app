
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SocialAuthButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const SocialAuthButton = ({ loading, setLoading }: SocialAuthButtonProps) => {
  const { toast } = useToast();

  const handleGitHubLogin = async () => {
    setLoading(true);
    console.log("Attempting to login with GitHub via Supabase.");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin, // Ensure this matches your Supabase settings
        },
      });
      if (error) {
        toast({
          title: 'GitHub Login Error',
          description: error.message,
          variant: "destructive",
        });
        console.error("GitHub Login Error:", error.message);
      }
      // No need to handle success, Supabase will redirect
    } catch (error: any) {
      toast({
        title: 'GitHub Login Error',
        description: error.message ?? 'Unable to sign in with GitHub',
        variant: "destructive",
      });
      console.error("Exception during GitHub Login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2 mb-2"
      onClick={handleGitHubLogin}
      disabled={loading}
    >
      <Github className="w-5 h-5" />
      {loading ? "Redirecting..." : "Continue with GitHub"}
    </Button>
  );
};

export default SocialAuthButton;


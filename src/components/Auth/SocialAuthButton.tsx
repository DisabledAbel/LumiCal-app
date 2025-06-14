
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SocialAuthButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const SocialAuthButton = ({ loading, setLoading }: SocialAuthButtonProps) => {
  const { toast } = useToast();

  const handleGithubAuth = async () => {
    setLoading(true);
    console.log('Starting GitHub authentication...');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      console.log('GitHub auth response:', { data, error });

      if (error) {
        console.error('GitHub auth error:', error);
        throw error;
      }

      // Success - OAuth will handle the redirect
      console.log('GitHub OAuth initiated successfully');
    } catch (error: any) {
      console.error('GitHub authentication failed:', error);
      
      toast({
        title: "GitHub Authentication Error",
        description: error.message || "Failed to authenticate with GitHub. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGithubAuth}
      disabled={loading}
    >
      <Github className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  );
};

export default SocialAuthButton;

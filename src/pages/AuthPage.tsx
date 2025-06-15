
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
        }
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email for the confirmation link!');
    }
    setLoading(false);
  };
  
  if (authLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-950 dark:to-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-950 dark:to-slate-900 p-4">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="signin" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-black/30">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-white/30 dark:data-[state=active]:bg-black/30">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-sm border-0 shadow-lg text-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/10 dark:bg-black/20 border-gray-400/50 dark:border-gray-600/50 placeholder:text-gray-500 dark:placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signin">Password</Label>
                    <Input id="password-signin" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/10 dark:bg-black/20 border-gray-400/50 dark:border-gray-600/50 placeholder:text-gray-500 dark:placeholder:text-gray-400" />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-sm border-0 shadow-lg text-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">Create a new account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/10 dark:bg-black/20 border-gray-400/50 dark:border-gray-600/50 placeholder:text-gray-500 dark:placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/10 dark:bg-black/20 border-gray-400/50 dark:border-gray-600/50 placeholder:text-gray-500 dark:placeholder:text-gray-400" />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

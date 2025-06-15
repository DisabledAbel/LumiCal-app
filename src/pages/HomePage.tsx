
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main>
        <p>Your calendar will be displayed here soon!</p>
      </main>
    </div>
  );
}


import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-transparent absolute top-0 left-0 right-0 z-10">
        <Link to="/" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Arvo Calu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="#services" className="text-sm font-medium hover:underline underline-offset-4">
            Services
          </Link>
          <Button asChild variant="outline" className="hidden md:flex bg-white/20 hover:bg-white/30 text-white border-white/50 hover:text-white">
             <Link to="/auth">Sign In</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full pt-24 md:pt-32 lg:pt-48 pb-12 md:pb-24 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 dark:from-pink-900 dark:via-purple-950 dark:to-orange-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2 animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Welcome to Arvo Calu
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Your new favorite application. Discover amazing features and get started today.
                </p>
              </div>
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Button asChild size="lg">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm dark:bg-muted/50">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the powerful features that make our application the best choice for you.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Rocket className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Experience unparalleled speed and performance. Our app is optimized for fast load times and a smooth user experience.
                </p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Secure by Design</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is safe with us. We use state-of-the-art security measures to protect your information.
                </p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <Sparkles className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Modern & Intuitive</h3>
                <p className="text-sm text-muted-foreground">
                  A beautiful and easy-to-use interface that you'll love. Designed to be intuitive and accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted/20">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                See Our App in Action
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some screenshots of our application.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <img src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=600&fit=crop" alt="Service 1" width="400" height="600" className="rounded-xl object-cover aspect-[2/3]"/>
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop" alt="Service 2" width="400" height="600" className="rounded-xl object-cover aspect-[2/3]"/>
                <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop" alt="Service 3" width="400" height="600" className="rounded-xl object-cover aspect-[2/3]"/>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 Arvo Calu. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

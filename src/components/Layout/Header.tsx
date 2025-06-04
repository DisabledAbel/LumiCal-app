
import React from 'react';
import { Calendar, Settings, Users, Code, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">CalendarHub</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {['calendar', 'apps', 'developer', 'holidays'].map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(view)}
                  className={`capitalize ${
                    currentView === view 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

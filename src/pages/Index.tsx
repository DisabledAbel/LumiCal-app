
import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import CalendarView from '../components/Calendar/CalendarView';
import ThirdPartyApps from '../components/Apps/ThirdPartyApps';
import DeveloperPortal from '../components/Developer/DeveloperPortal';
import HolidayPage from '../components/Holidays/HolidayPage';
import InstallPrompt from '../components/PWA/InstallPrompt';
import { usePWA } from '../hooks/usePWA';

const Index = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { isInstallable } = usePWA();

  useEffect(() => {
    // Show install prompt after 3 seconds if installable
    const timer = setTimeout(() => {
      if (isInstallable) {
        setShowInstallPrompt(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInstallable]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'apps':
        return <ThirdPartyApps />;
      case 'developer':
        return <DeveloperPortal />;
      case 'holidays':
        return <HolidayPage />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-0">
        {renderCurrentView()}
      </main>
      
      {showInstallPrompt && isInstallable && (
        <InstallPrompt onClose={() => setShowInstallPrompt(false)} />
      )}
    </div>
  );
};

export default Index;

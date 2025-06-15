
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import CalendarView from '../components/Calendar/CalendarView';
import ThirdPartyApps from '../components/Apps/ThirdPartyApps';
import DeveloperPortal from '../components/Developer/DeveloperPortal';
import HolidayPage from '../components/Holidays/HolidayPage';
import BackgroundPicker from '../components/Settings/BackgroundPicker';

const Index = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

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
    <div
      className="min-h-screen"
      style={backgroundUrl 
        ? { backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s' }
        : { backgroundColor: "#f8fafc" }
      }
    >
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-0">
        <div className="max-w-7xl mx-auto px-2">
          {/* Simple access to settings for demo; you may want a dedicated page or modal later */}
          <BackgroundPicker onBackgroundChange={setBackgroundUrl} />
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default Index;


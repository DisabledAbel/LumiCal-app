
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import CalendarView from '../components/Calendar/CalendarView';
import ThirdPartyApps from '../components/Apps/ThirdPartyApps';
import DeveloperPortal from '../components/Developer/DeveloperPortal';
import HolidayPage from '../components/Holidays/HolidayPage';

const Index = () => {
  const [currentView, setCurrentView] = useState('calendar');

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
    </div>
  );
};

export default Index;

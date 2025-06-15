
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import CalendarView from '../components/Calendar/CalendarView';
import BackgroundPicker from '../components/Settings/BackgroundPicker';
import FriendsSidebar from '../components/Friends/FriendsSidebar';

const Index = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [showFriends, setShowFriends] = useState(false);

  const renderCurrentView = () => {
    // Only CalendarView for now
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
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
          <div className="flex gap-2 justify-end mb-2">
            <button
              onClick={() => setShowFriends(true)}
              className="text-blue-600 text-sm underline hover:opacity-80"
            >
              Friends
            </button>
          </div>
          <BackgroundPicker onBackgroundChange={setBackgroundUrl} />
          {renderCurrentView()}
        </div>
        <FriendsSidebar open={showFriends} onClose={() => setShowFriends(false)} />
      </main>
    </div>
  );
};

export default Index;

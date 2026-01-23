import React, { useState } from 'react';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import MyEvents from './pages/MyEvents'; 
import AfterHours from './pages/AfterHours';
import Profile from './pages/Profile';
import CreateEvent from './pages/CreateEvent'; 
import PremiumModal from './components/PremiumModal';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import { ToastContainer, useToast } from './components/Toast';
import { AppTab, Event, User } from './types';
import { MOCK_EVENTS, MOCK_USERS } from './constants';

const App: React.FC = () => {
  const { toasts, removeToast, success, error } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('feed');
  const [showPremium, setShowPremium] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Initialize with Mock Events, but allow adding new ones
  const [allEvents, setAllEvents] = useState<Event[]>(MOCK_EVENTS);
  
  // User State - Defaulting to non-premium to show the lock feature
  const [currentUser, setCurrentUser] = useState<User>({
     ...MOCK_USERS[1], // Pedro (Non-premium)
     isPremium: false 
  });

  const [confirmedEvents, setConfirmedEvents] = useState<string[]>(['e1']);

  const handleToggleEvent = (eventId: string) => {
    const isJoining = !confirmedEvents.includes(eventId);
    setConfirmedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
    
    // Show toast feedback
    if (isJoining) {
      success('Confirmado! 🎉', 'Você vai colar nesse rolê!');
    } else {
      error('Saiu da festa', 'Você não vai mais neste evento');
    }
  };

  const handleTabChange = (tab: AppTab) => {
    setSelectedEvent(null);
    setActiveTab(tab);
  };

  const handleCreateEvent = (newEvent: Event) => {
    setAllEvents([newEvent, ...allEvents]);
    setConfirmedEvents(prev => [...prev, newEvent.id]);
    success('Evento criado! ✨', 'Seu rolê está pronto para rolar');
    setActiveTab('feed');
  };

  // Authentication Flow
  if (!isLoggedIn) {
    return <Login onLogin={() => {
      setIsLoggedIn(true);
      success('Bem-vindo! 🚀', 'Bora curtir uns rolês?');
    }} />;
  }

  // Render Logic
  const renderPage = () => {
    switch (activeTab) {
      case 'feed': return (
        <Feed 
            events={allEvents}
            onEventClick={setSelectedEvent} 
            confirmedEventIds={confirmedEvents}
            onToggleEvent={handleToggleEvent}
        />
      );
      case 'my-events': return (
        <MyEvents 
            events={allEvents}
            onEventClick={setSelectedEvent} 
            confirmedEventIds={confirmedEvents}
        />
      ); 
      case 'create': return (
        <CreateEvent 
          onBack={() => setActiveTab('feed')} 
          onCreate={handleCreateEvent}
        />
      );
      case 'after': return <AfterHours onPremiumClick={() => setShowPremium(true)} />;
      case 'profile': return <Profile />;
      default: return (
        <Feed 
            events={allEvents}
            onEventClick={setSelectedEvent} 
            confirmedEventIds={confirmedEvents}
            onToggleEvent={handleToggleEvent}
        />
      );
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {renderPage()}
      </Layout>
      
      {/* Full Screen Overlays with Animation */}
      {/* Modals with Animation */}
      {showPremium && (
        <div className="animate-scale-in">
          <PremiumModal isOpen={showPremium} onClose={() => setShowPremium(false)} />
        </div>
      )}
      
      {selectedEvent && (
        <div className="animate-slide-in-right">
          <EventDetails 
              event={selectedEvent} 
              onBack={() => setSelectedEvent(null)}
              isJoined={confirmedEvents.includes(selectedEvent.id)}
              onToggleJoin={() => handleToggleEvent(selectedEvent.id)}
              currentUser={currentUser}
              onOpenPremium={() => setShowPremium(true)}
          />
        </div>
      )}

      {/* Toast Notifications Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
};

export default App;
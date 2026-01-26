import React, { useState, useEffect } from 'react';
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
import { supabase } from './lib/supabase';
import { SupabaseDBService, Event as DBEvent } from './lib/supabase-db';

const App: React.FC = () => {
  const { toasts, removeToast, success, error } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('feed');
  const [showPremium, setShowPremium] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Initialize with empty events, will load from database
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Carregar eventos do database quando logado
  useEffect(() => {
    if (isLoggedIn) {
      loadEvents();
    } else {
      setAllEvents([]);
    }
  }, [isLoggedIn]);

  const loadEvents = async () => {
    try {
      setLoadingEvents(true);
      const { events } = await SupabaseDBService.getEvents({ limit: 50 });
      
      // Converter para formato do frontend
      const convertedEvents: Event[] = events.map((dbEvent: DBEvent) => ({
        id: dbEvent.id,
        title: dbEvent.title,
        location: dbEvent.location,
        startTime: dbEvent.startTime,
        endTime: dbEvent.endTime,
        date: dbEvent.date as any, // Converter string para DateFilter
        dateLabel: dbEvent.dateLabel,
        image: dbEvent.image || 'https://picsum.photos/600/400?random=1',
        vibe: dbEvent.vibe as any,
        priceLevel: dbEvent.priceLevel as any,
        confirmedCount: dbEvent.confirmedCount,
        friendsGoing: [], // TODO: Carregar amigos que vão
        isAfterHours: dbEvent.isAfterHours,
        isOfficial: dbEvent.isOfficial,
        description: dbEvent.description,
      }));

      setAllEvents(convertedEvents);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
      error('Erro ao carregar eventos', 'Tente novamente mais tarde');
    } finally {
      setLoadingEvents(false);
    }
  };
  
  // User State - Defaulting to non-premium to show the lock feature
  const [currentUser, setCurrentUser] = useState<User>({
     ...MOCK_USERS[1], // Pedro (Non-premium)
     isPremium: false 
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url || '',
          isPremium: false
        });
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url || '',
          isPremium: false
        });
      } else {
        setIsLoggedIn(false);
        setCurrentUser({
          ...MOCK_USERS[1],
          isPremium: false 
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (user: any) => {
    setIsLoggedIn(true);
    
    // Criar/atualizar perfil no banco se não existir
    try {
      const { data: existingProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!existingProfile) {
        // Criar perfil novo
        await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            avatar: user.user_metadata?.avatar_url || 'https://picsum.photos/100/100?random=1',
            isPremium: false,
            vibes: []
          });
      }
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
    }
    
    setCurrentUser({
      id: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      avatar: user.user_metadata?.avatar_url || '',
      isPremium: false
    });
    // Ir para perfil após login
    setActiveTab('profile');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

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

  // Render Logic
  const renderPage = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {(() => {
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
            case 'after-hours': return (
              <AfterHours 
                  onOpenPremium={() => setShowPremium(true)}
              />
            );
            case 'profile': return (
              <Profile 
                  user={currentUser}
                  onOpenPremium={() => setShowPremium(true)}
                  onLogout={handleLogout}
              />
            );
            default: return null;
          }
        })()}
      </Layout>
    );
  };

  return (
    <>
      {renderPage()}
      
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
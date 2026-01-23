import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';
import { Event, DateFilter } from '../types';
import { filterEventsByDate } from '../constants';

interface FeedProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  confirmedEventIds: string[];
  onToggleEvent: (eventId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ events, onEventClick, confirmedEventIds, onToggleEvent }) => {
  const [activeDate, setActiveDate] = useState<DateFilter>('all');

  const filters: { id: DateFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'today', label: 'Hoje' },
    { id: 'tomorrow', label: 'Amanhã' },
    { id: 'weekend', label: 'Fim de Semana' },
    { id: 'week', label: 'Próx. Semana' },
  ];

  const filteredEvents = filterEventsByDate(events, activeDate);

  const trendingEvents = filteredEvents.slice(0, 4); 

  return (
    <div className="min-h-screen">
      
      {/* Dynamic Header */}
      <header className="px-4 md:px-8 py-4 md:py-6 bg-transparent flex items-center justify-between mb-4 md:mb-6">
        <div className="flex flex-col">
           <Logo size="medium" />
        </div>
      </header>

      <div className="pb-28">
        
        {/* Scrollable Date Filter Pills */}
        <div className="w-full overflow-x-auto no-scrollbar px-4 md:px-8 mb-6 md:mb-8">
           <div className="flex gap-3">
             {filters.map((filter) => (
               <button
                 key={filter.id}
                 onClick={() => setActiveDate(filter.id)}
                 className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                   activeDate === filter.id 
                     ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                     : 'bg-night-800 text-zinc-500 border-white/10 hover:border-white/30 hover:text-zinc-300'
                 }`}
               >
                 {filter.label}
               </button>
             ))}
           </div>
        </div>

        {/* Recommended Horizontal Scroll (Swipeable) */}
        <div className="mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between px-4 md:px-8 mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Em Alta</h2>
            <span className="text-xs font-mono text-violet-400 cursor-pointer">VER TODOS</span>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 px-4 md:px-8 snap-x snap-mandatory scroll-pl-6">
            {trendingEvents.map(event => (
              <div key={`rec-${event.id}`} className="snap-start shrink-0">
                 <EventCard 
                   event={event} 
                   compact 
                   onClick={() => onEventClick(event)} 
                   isJoined={confirmedEventIds.includes(event.id)}
                   onToggleJoin={onToggleEvent}
                 />
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Feed */}
        <div className="animate-slide-up px-4 md:px-8" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6 px-0 md:px-2">
            <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-bold text-white tracking-tight">Agenda Completa</h2>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * (index + 3)}s` }}>
                <EventCard 
                   event={event} 
                   onClick={() => onEventClick(event)} 
                   isJoined={confirmedEventIds.includes(event.id)}
                   onToggleJoin={onToggleEvent}
                />
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <EmptyState 
                type="no-events"
                title="Nenhum rolê encontrado nesta data"
                message="Tente mudar o filtro ou volte em breve para novos eventos!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
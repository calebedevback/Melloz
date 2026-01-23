import React from 'react';
import { Ticket, MapPin, ExternalLink } from 'lucide-react';
import { Event } from '../types';

interface MyEventsProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  confirmedEventIds: string[];
}

const MyEvents: React.FC<MyEventsProps> = ({ events, onEventClick, confirmedEventIds }) => {
  // Filter events passed from App to only show confirmed ones
  const myEvents = events.filter(event => confirmedEventIds.includes(event.id));

  const openMap = (e: React.MouseEvent, location: string) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const renderEventItem = (event: Event) => (
    <div 
        key={event.id}
        onClick={() => onEventClick(event)}
        className="bg-night-800/40 border border-white/5 rounded-2xl p-4 flex gap-4 mb-4 active:scale-[0.98] transition-transform cursor-pointer group hover:bg-night-800/60"
    >
        {/* Thumbnail Date/Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-2 left-0 right-0 text-center">
                 <p className="text-xs font-bold text-white leading-tight">
                    {event.startTime}
                 </p>
                 <p className="text-[10px] text-zinc-400 uppercase font-mono">
                    {event.vibe}
                 </p>
            </div>
        </div>

        {/* Info & Actions */}
        <div className="flex-1 flex flex-col justify-between py-1">
            <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-zinc-400 text-xs mb-2">
                    <MapPin size={12} className="mr-1 text-zinc-500" />
                    <span className="truncate max-w-[140px]">{event.location}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                 {/* Friends Bubbles */}
                 <div className="flex items-center">
                    <div className="flex -space-x-2">
                        {event.friendsGoing.slice(0,3).map((u, i) => (
                            <img key={i} src={u.avatar} className="w-6 h-6 rounded-full border border-night-800 object-cover" />
                        ))}
                    </div>
                    <span className="text-[10px] text-zinc-500 ml-2 font-medium">
                       +{event.friendsGoing.length > 0 ? event.confirmedCount : 'Você vai'}
                    </span>
                 </div>

                 {/* Map Button */}
                 <button 
                    onClick={(e) => openMap(e, event.location)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-wider hover:bg-violet-500 hover:text-white transition-all"
                >
                    <ExternalLink size={12} />
                    <span>Maps</span>
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-8 px-5 pb-32 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    Meus Rolês
                    <Ticket className="text-fuchsia-500 fill-fuchsia-500/20" size={24} />
                </h1>
                <p className="text-zinc-500 text-sm mt-1">Sua agenda confirmada.</p>
            </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
            {/* Today Section */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">Hoje</h2>
                </div>
                <div className="pl-3 border-l border-white/10 ml-[3px] space-y-4">
                     {myEvents.filter(e => e.date === 'today').length > 0 ? (
                        myEvents.filter(e => e.date === 'today').map(renderEventItem)
                     ) : (
                        <p className="text-zinc-600 text-sm py-2 italic pl-4">Nenhum rolê confirmado para hoje.</p>
                     )}
                </div>
            </div>

            {/* Tomorrow Section */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Amanhã</h2>
                </div>
                <div className="pl-3 border-l border-white/10 ml-[3px] space-y-4">
                     {myEvents.filter(e => e.date === 'tomorrow').length > 0 ? (
                        myEvents.filter(e => e.date === 'tomorrow').map(renderEventItem)
                     ) : (
                         <p className="text-zinc-600 text-sm py-2 italic pl-4">Nada marcado para amanhã.</p>
                     )}
                </div>
            </div>

             {/* Upcoming Section */}
             <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Próximos Dias</h2>
                </div>
                <div className="pl-3 border-l border-white/10 ml-[3px] space-y-4">
                    {myEvents.filter(e => e.date === 'weekend' || e.date === 'week').length > 0 ? (
                        myEvents.filter(e => e.date === 'weekend' || e.date === 'week').map(renderEventItem)
                    ) : (
                        <p className="text-zinc-600 text-sm py-2 italic pl-4">Sua agenda está livre.</p>
                    )}
                </div>
            </div>
        </div>
        
        {myEvents.length === 0 && (
             <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-white font-medium mb-2">Sem rolês marcados.</p>
                <p className="text-zinc-400 text-xs mb-4">Bora pro feed ver o que tá rolando?</p>
             </div>
        )}
    </div>
  );
};

export default MyEvents;
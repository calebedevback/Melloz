import React, { useState, useEffect } from 'react';
import { MapPin, Users, Zap, Check } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  compact?: boolean;
  onClick?: () => void;
  isJoined?: boolean;
  onToggleJoin?: (eventId: string) => void;
  isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  compact = false, 
  onClick, 
  isJoined = false, 
  onToggleJoin, 
  isPast = false 
}) => {
  // Internal count state for optimistic UI updates
  const [count, setCount] = useState(event.confirmedCount);
  
  // Effect to sync count if isJoined changes externally
  useEffect(() => {
     // Optional: logic to adjust count if needed when props change 
     // For now we trust the optimistic interaction or initial load
  }, [isJoined]);

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPast) return;
    
    // Optimistic update
    if (onToggleJoin) {
        setCount(c => isJoined ? c - 1 : c + 1);
        onToggleJoin(event.id);
    }
  };

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case 'Eletrônico': return 'from-violet-500/80 to-fuchsia-500/80';
      case 'After': return 'from-rose-500/80 to-orange-500/80';
      case 'Calmo': return 'from-emerald-500/80 to-teal-500/80';
      default: return 'from-blue-500/80 to-cyan-500/80';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative group overflow-hidden rounded-[2rem] border border-white/5 bg-night-900 transition-all active:scale-[0.98] cursor-pointer ${compact ? 'w-72 h-96 flex-shrink-0' : 'w-full h-[28rem] mb-8 md:mb-6'}`}
    >
      
      {/* Full Bleed Image */}
      <div className="absolute inset-0">
        <img 
          src={event.image} 
          alt={event.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent opacity-90" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        
        {/* Top Badges */}
        <div className="flex justify-between items-start">
           <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                {event.dateLabel || event.startTime}
            </span>
            {event.isAfterHours && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-rose-200 bg-rose-500/20 backdrop-blur-md border border-rose-500/20 animate-pulse-slow">
                AFTER
              </span>
            )}
           </div>

           <div className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-white bg-gradient-to-r ${getVibeColor(event.vibe)} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
             {event.vibe}
           </div>
        </div>

        {/* Bottom Info */}
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          
          <h3 className="text-3xl font-bold text-white leading-none mb-2 drop-shadow-lg font-sans">{event.title}</h3>
          
          <div className="flex items-center text-zinc-300 text-sm mb-6 font-medium">
            <MapPin size={16} className="mr-1.5 text-zinc-400" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            {/* Friends / Social */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {event.friendsGoing.slice(0, 3).map((friend) => (
                  <img 
                    key={friend.id} 
                    src={friend.avatar} 
                    alt={friend.name}
                    className="w-10 h-10 rounded-full border-2 border-night-950 object-cover"
                  />
                ))}
                 {event.friendsGoing.length === 0 && (
                   <div className="w-10 h-10 rounded-full border-2 border-night-950 bg-night-800 flex items-center justify-center">
                     <Users size={16} className="text-zinc-500"/>
                   </div>
                )}
              </div>
              <div className="ml-4 flex flex-col">
                <span className="text-white font-bold text-sm">+{count}</span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">Vão colar</span>
              </div>
            </div>

            {/* Interactive Join Button */}
            <button 
              onClick={handleJoin}
              disabled={isPast}
              className={`h-12 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 ${
                isJoined || isPast
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-white text-black hover:scale-105 active:scale-95'
              } ${isPast ? 'opacity-90 cursor-default' : ''}`}
            >
              {isPast ? (
                <>
                  <Check size={18} />
                  <span>FUI</span>
                </>
              ) : isJoined ? (
                <>
                  <Check size={18} />
                  <span>VOU</span>
                </>
              ) : (
                <>
                  <Zap size={18} className="fill-black" />
                  <span>EU VOU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
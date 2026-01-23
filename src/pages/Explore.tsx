import React, { useState } from 'react';
import { Search, Map as MapIcon, Zap, Music, Beer, Sparkles, X, Radar } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import EventCard from '../components/EventCard';
import { Event, VibeType } from '../types';

interface ExploreProps {
  onPremiumClick: () => void;
  onEventClick: (event: Event) => void;
}

const Explore: React.FC<ExploreProps> = ({ onPremiumClick, onEventClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { name: 'Eletrônico', icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { name: 'Barzinho', icon: Beer, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { name: 'Alternativo', icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Funk', icon: Music, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
  ];

  // Filtering Logic
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.vibe === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null); // Deselect
    } else {
      setSelectedCategory(catName);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen pt-8 px-5 pb-32">
      <h1 className="text-2xl font-bold text-white mb-6">Mapa & Radar</h1>

      {/* Glass Search Bar */}
      <div className="relative mb-6 group z-20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar rolê, local ou vibe..." 
          className="w-full pl-12 pr-12 py-4 bg-night-800/80 backdrop-blur-xl border border-white/10 rounded-2xl text-base text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-night-800 transition-all shadow-lg"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="mb-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, i) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button 
                key={i} 
                onClick={() => handleCategoryClick(cat.name)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                  isSelected 
                    ? `bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105` 
                    : `${cat.bg} ${cat.color} hover:bg-white/10`
                }`}
              >
                 <cat.icon size={16} />
                 <span className="text-sm font-bold">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LIVE RADAR VISUALIZATION (When not explicitly searching a list) */}
      {!searchQuery && !selectedCategory && (
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-night-900 group">
          {/* Animated Radar Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-violet-500/20 rounded-full animate-[spin_8s_linear_infinite]">
             <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-transparent to-violet-500/20 blur-xl"></div>
          </div>
          
          {/* Map Content */}
          <div className="relative p-6 h-64 flex flex-col items-center justify-center text-center z-10">
              <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                  <Radar size={32} className="text-violet-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Radar Ativo</h3>
              <p className="text-zinc-400 text-xs mb-4">5 eventos encontrados num raio de 2km</p>
              
              <button 
                onClick={onPremiumClick}
                className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-full transition-colors shadow-lg"
              >
                VER NO MAPA (PREMIUM)
              </button>
          </div>
        </div>
      )}

      {/* RESULTS LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-lg font-bold text-white">
             {selectedCategory ? `Vibe: ${selectedCategory}` : 'Próximos a você'}
           </h3>
           <span className="text-xs text-zinc-500 font-mono">
             {filteredEvents.length} RESULTADOS
           </span>
        </div>

        <div className="grid gap-6">
          {filteredEvents.map((event, index) => (
             <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
               <EventCard event={event} onClick={() => onEventClick(event)} />
             </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-night-800/30 rounded-3xl border border-white/5 border-dashed">
              <p className="text-zinc-500 mb-2">Nada encontrado com essa vibe...</p>
              <button onClick={clearSearch} className="text-violet-400 text-sm font-bold hover:underline">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Explore;
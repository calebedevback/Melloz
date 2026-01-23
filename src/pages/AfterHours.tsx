import React from 'react';
import { Moon, Lock } from 'lucide-react';
import { MOCK_EVENTS, filterEventsByTimeRange } from '../constants';
import EventCard from '../components/EventCard';

const AfterHours: React.FC<{ onPremiumClick: () => void }> = ({ onPremiumClick }) => {
  // Filter events between 00:00 and 05:00 (early morning after hours)
  const afterEvents = filterEventsByTimeRange(MOCK_EVENTS, 0, 5);

  // Simulating user is NOT premium for demo purposes
  const isPremium = false; 

  return (
    <div className="pt-6 pb-24 px-4 min-h-screen bg-gradient-to-b from-night-950 via-[#0a0514] to-night-950">
      <div className="flex items-center justify-center mb-8">
        <Moon className="text-fuchsia-500 fill-fuchsia-500 mr-2" size={24} />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-violet-500 tracking-widest uppercase">
          After Hours
        </h1>
      </div>

      <div className="text-center mb-8">
        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
          O rolê não acaba quando a luz acende. Encontre o que acontece entre 00:00 e 05:00.
        </p>
      </div>

      {isPremium ? (
        <div className="space-y-6">
          {afterEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Blurry List */}
          <div className="space-y-6 opacity-30 blur-sm pointer-events-none select-none">
             {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-night-800 border border-night-700" />
             ))}
          </div>

          {/* Locked State Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-night-900/90 border border-fuchsia-500/30 p-8 rounded-3xl text-center backdrop-blur-md max-w-xs shadow-2xl shadow-fuchsia-900/20">
              <div className="w-16 h-16 bg-fuchsia-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-fuchsia-500/30">
                <Lock className="text-fuchsia-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Área Secreta</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Descubra 3 afters confirmados rolando agora perto de você.
              </p>
              <button 
                onClick={onPremiumClick}
                className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-xl text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                ENTRAR NO MODO NOTURNO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AfterHours;
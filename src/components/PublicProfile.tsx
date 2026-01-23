import React from 'react';
import { X, MapPin, Hash, UserPlus, MessageCircle, Calendar, Sparkles, Shield } from 'lucide-react';
import { User, Event } from '../types';

interface PublicProfileProps {
  user: User & { nextEvent?: Event; status?: string; mutuals?: number };
  onClose: () => void;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-night-950 animate-fade-in overflow-y-auto no-scrollbar">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Header Actions */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Perfil Público
        </div>
        <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
        >
            <X size={20} />
        </button>
      </div>

      {/* Main Card Area */}
      <div className="relative pt-24 px-6 pb-8 flex-1 flex flex-col items-center">
         
         {/* Avatar & Status */}
         <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative w-32 h-32 p-1 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500">
                <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover border-4 border-night-950" 
                />
            </div>
            {user.isPremium && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-[10px] font-bold text-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Shield size={10} className="fill-black" /> Premium
                </div>
            )}
         </div>

         <h2 className="text-3xl font-bold text-white mb-1 text-center">{user.name}</h2>
         <p className="text-zinc-500 text-sm mb-6 flex items-center gap-2">
            @{user.name.toLowerCase().replace(' ', '')} 
            {user.status === 'online' && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
         </p>

         {/* Quick Stats */}
         <div className="grid grid-cols-3 gap-4 w-full mb-8">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center backdrop-blur-sm">
                <span className="block text-xl font-bold text-white">24</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Rolês</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center backdrop-blur-sm">
                <span className="block text-xl font-bold text-white">{user.mutuals || 12}</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Em Comum</span>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center backdrop-blur-sm">
                <span className="block text-xl font-bold text-emerald-400">98%</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Vibe Match</span>
            </div>
         </div>

         {/* Vibes */}
         <div className="w-full mb-8">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-1">Vibes Favoritas</h3>
            <div className="flex flex-wrap gap-2">
                {user.vibes.map((vibe) => (
                    <div key={vibe} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-night-800 border border-white/10 text-sm font-medium text-zinc-300">
                        <Hash size={12} className="text-violet-500" /> {vibe}
                    </div>
                ))}
            </div>
         </div>

         {/* Next Event - Highlight */}
         <div className="w-full mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-1">Agenda Hoje</h3>
             {user.nextEvent ? (
                 <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-night-900">
                    <div className="absolute inset-0">
                        <img src={user.nextEvent.image} className="w-full h-full object-cover opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/80 to-transparent"></div>
                    </div>
                    <div className="relative p-5 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-400 uppercase">Confirmado</span>
                            </div>
                            <h4 className="text-xl font-bold text-white leading-tight mb-1">{user.nextEvent.title}</h4>
                            <div className="flex items-center text-zinc-400 text-xs">
                                <MapPin size={12} className="mr-1" /> {user.nextEvent.location}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <Calendar size={18} className="text-white" />
                        </div>
                    </div>
                 </div>
             ) : (
                 <div className="p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
                    <p className="text-zinc-500 text-sm">Ainda não decidiu o rolê de hoje.</p>
                 </div>
             )}
         </div>

         {/* Action Buttons */}
         <div className="w-full flex gap-4 mt-auto">
            <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                <UserPlus size={20} />
                <span>Adicionar</span>
            </button>
            <button className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <MessageCircle size={20} />
                <span>Mensagem</span>
            </button>
         </div>

      </div>
    </div>
  );
};

export default PublicProfile;
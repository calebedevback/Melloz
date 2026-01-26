import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Share2, Calendar as CalendarIcon, DollarSign, Check, Zap, Lock, Send, MessageCircle } from 'lucide-react';
import { Event, User } from '../types';
import { SupabaseDBService } from '../lib/supabase-db';
import { supabase } from '../lib/supabase';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  isJoined: boolean;
  onToggleJoin: () => void;
  currentUser: User;
  onOpenPremium: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ 
  event, 
  onBack, 
  isJoined, 
  onToggleJoin, 
  currentUser,
  onOpenPremium
}) => {
  const [messages, setMessages] = useState<Array<{id: string; user: string; text: string}>>([
    { id: '1', user: 'Ana', text: 'Vocês vão de uber?' },
    { id: '2', user: 'Pedro', text: 'Sim, quem entra na corrida?' },
    { id: '3', user: 'Maria', text: 'Eu topo!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showListModal, setShowListModal] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleConfirmPresence = async () => {
    try {
      setConfirming(true);
      
      // Obter usuário atual do Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      if (isJoined) {
        // Sair do evento
        await SupabaseDBService.leaveEvent(event.id, user.id);
      } else {
        // Entrar no evento
        await SupabaseDBService.joinEvent(event.id, user.id);
      }
      
      // Atualizar estado local
      onToggleJoin();
    } catch (error) {
      console.error('Erro ao confirmar presença:', error);
    } finally {
      setConfirming(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[60] bg-night-950 overflow-y-auto animate-fade-in no-scrollbar">
      
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-night-950" />
        
        {/* Header Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white active:scale-95 transition-transform"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="relative -mt-16 px-6 pb-32">
        <div className="flex flex-col gap-1 mb-6">
           <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border backdrop-blur-md mb-2 ${
               event.vibe === 'After' ? 'border-rose-500/50 text-rose-300 bg-rose-500/20' : 'border-white/20 text-white bg-white/10'
           }`}>
               {event.vibe.toUpperCase()}
           </span>
           <h1 className="text-4xl font-bold text-white leading-tight">{event.title}</h1>
           <div className="flex items-center text-zinc-400 mt-2">
              <MapPin size={16} className="mr-2 text-violet-500" />
              <span className="font-medium">{event.location}</span>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <Clock size={16} />
                    <span className="text-xs uppercase font-bold">Horário</span>
                </div>
                <p className="text-white font-semibold">{event.startTime}</p>
            </div>
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <CalendarIcon size={16} />
                    <span className="text-xs uppercase font-bold">Data</span>
                </div>
                <p className="text-white font-semibold">{event.dateLabel || (event.date === 'today' ? 'Hoje' : 'Amanhã')}</p>
            </div>
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <DollarSign size={16} />
                    <span className="text-xs uppercase font-bold">Preço</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map(l => (
                        <span key={l} className={`text-sm font-bold ${l <= event.priceLevel ? 'text-white' : 'text-zinc-700'}`}>$</span>
                    ))}
                </div>
            </div>
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <Users size={16} />
                    <span className="text-xs uppercase font-bold">Público</span>
                </div>
                <p className="text-white font-semibold">{event.confirmedCount} Confirmados</p>
            </div>
        </div>

        {/* Description */}
        <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-2">Sobre o Rolê</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
                {event.description || "Prepare-se para uma experiência única. Música de alta qualidade, drinks exclusivos e a melhor vibe da cidade. Chegue cedo para aproveitar o pôr do sol."}
            </p>
        </div>

        {/* Who is going - NOW ALWAYS VISIBLE */}
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Users size={20} /> Quem vai ({event.confirmedCount})
               </h3>
            </div>
            
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5">
                 <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                        {/* Mostrando as pessoas do evento */}
                        {[1,2,3,4,5].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-night-800 bg-zinc-700 overflow-hidden">
                                {event.friendsGoing[i] ? (
                                   <img src={event.friendsGoing[i].avatar} className="w-full h-full object-cover" />
                                ) : (
                                   <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-600"></div>
                                )}
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-night-800 bg-violet-600 flex items-center justify-center text-xs text-white font-bold">
                            +{event.confirmedCount > 5 ? event.confirmedCount - 5 : 24}
                        </div>
                    </div>
                    <button className="text-violet-400 text-sm font-bold hover:text-violet-300 transition-colors">
                       Ver lista →
                    </button>
                    {showListModal && (
                      <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center">
                        <div className="bg-night-900 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                          <button onClick={() => setShowListModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                            <ArrowLeft size={24} />
                          </button>
                          <h2 className="text-xl font-bold text-white mb-4">Lista de Confirmados</h2>
                          <div className="space-y-3 max-h-80 overflow-y-auto">
                            {event.friendsGoing && event.friendsGoing.length > 0 ? (
                              event.friendsGoing.map((friend: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3">
                                  <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover border-2 border-violet-500" />
                                  <span className="text-white font-semibold">{friend.name}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-zinc-400">Nenhum participante confirmado ainda.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                 </div>
            </div>
        </div>

        {/* Chat do Evento */}
        <div className="mb-32">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={20} /> Chat do Rolê
            </h3>
            
            {/* Messages */}
            <div className="bg-night-800/50 p-4 rounded-2xl border border-white/5 mb-3 max-h-48 overflow-y-auto space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{msg.user}</p>
                      <p className="text-zinc-400 text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Input */}
            {isJoined && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escreva algo..."
                  className="flex-1 bg-night-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:border-violet-500 outline-none transition-colors"
                />
                <button 
                  onClick={() => {
                    if (inputMessage.trim()) {
                      setMessages([...messages, { id: Date.now().toString(), user: 'Você', text: inputMessage }]);
                      setInputMessage('');
                    }
                  }}
                  className="bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-xl transition-colors active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
        </div>

        {/* Floating Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-night-950 via-night-950 to-transparent">
            <button 
                onClick={handleConfirmPresence}
                disabled={confirming}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                    isJoined 
                    ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]'
                } ${confirming ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {confirming ? (
                    <span className="animate-pulse">Processando...</span>
                ) : isJoined ? (
                    <>
                        <Check size={24} className="fill-white" />
                        <span>PRESença CONFIRMADA</span>
                    </>
                ) : (
                    <>
                        <Zap size={24} className="fill-white" />
                        <span>CONFIRMAR PRESENÇA</span>
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
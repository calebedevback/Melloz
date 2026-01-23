import React, { useState } from 'react';
import { ArrowLeft, Search, UserPlus, MapPin, Check, X, User as UserIcon, Sparkles, Filter } from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS } from '../constants';
import { User, Event } from '../types';
import PublicProfile from '../components/PublicProfile';

interface SocialHubProps {
  onBack: () => void;
}

type SocialTab = 'friends' | 'add' | 'invites';

// Extended User type for social context
type SocialUser = User & { 
    status: 'online' | 'offline'; 
    nextEvent?: Event;
    mutuals?: number;
};

interface FriendRequest {
  id: string;
  userId: string;
  type: 'sent' | 'received';
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const SocialHub: React.FC<SocialHubProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<SocialTab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<SocialUser | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    { id: 'req1', userId: 'new1', type: 'received', time: '2h atrás', status: 'pending' },
    { id: 'req2', userId: 'new2', type: 'received', time: '5h atrás', status: 'pending' },
  ]);
  const [friends, setFriends] = useState<string[]>(['1', '2', '4']);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const handleBackClick = () => {
    if (selectedUser) {
      setSelectedUser(null);
    } else {
      onBack();
    }
  };

  const handleUserClick = (user: SocialUser) => {
    setSelectedUser(user);
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      setFriendRequests(friendRequests.map(r => 
        r.id === requestId ? { ...r, status: 'accepted' } : r
      ));
      setFriends([...friends, request.userId]);
      setTimeout(() => {
        setFriendRequests(friendRequests.filter(r => r.id !== requestId));
      }, 800);
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(friendRequests.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' } : r
    ));
    setTimeout(() => {
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    }, 500);
  };

  const handleSendFriendRequest = (userId: string) => {
    if (!friends.includes(userId)) {
      const newRequest: FriendRequest = {
        id: `req-${Date.now()}`,
        userId,
        type: 'sent',
        time: 'agora',
        status: 'pending'
      };
      setFriendRequests([...friendRequests, newRequest]);
    }
  };

  const handleBlockUser = (userId: string) => {
    setBlockedUsers([...blockedUsers, userId]);
  };

  // Mock Data moved here for better state management
  const friendsList: SocialUser[] = [
    { ...MOCK_USERS[0], status: 'online', nextEvent: MOCK_EVENTS[0] }, // Ana
    { ...MOCK_USERS[2], status: 'offline', nextEvent: MOCK_EVENTS[2] }, // Julia
    { ...MOCK_USERS[4], status: 'online', nextEvent: MOCK_EVENTS[3] }, // Mari
  ];

  const suggestions: SocialUser[] = [
    { id: 'new1', name: 'Diego M.', avatar: 'https://picsum.photos/100/100?random=20', vibes: ['Eletrônico'], vibe: 'Eletrônico', mutuals: 12, isPremium: false, status: 'online' },
    { id: 'new2', name: 'Carla F.', avatar: 'https://picsum.photos/100/100?random=21', vibes: ['Barzinho'], vibe: 'Barzinho', mutuals: 5, isPremium: true, status: 'offline' },
    { id: 'new3', name: 'Bruno K.', avatar: 'https://picsum.photos/100/100?random=22', vibes: ['After'], vibe: 'After', mutuals: 8, isPremium: false, status: 'online' },
  ] as any;

  const allUsers = [...MOCK_USERS, ...suggestions];

  const renderFriends = () => (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      
      {/* Online Now Indicator Bar */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mb-2">
         {friendsList.filter(f => f.status === 'online').map((friend) => (
             <button 
               key={friend.id} 
               onClick={() => handleUserClick(friend)} 
               className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
             >
                 <div className="relative">
                    <img src={friend.avatar} className="w-14 h-14 rounded-full border-2 border-emerald-500 p-0.5 object-cover group-active:scale-95 transition-transform" />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-night-950 rounded-full"></div>
                 </div>
                 <span className="text-xs text-zinc-300 font-medium">{friend.name.split(' ')[0]}</span>
             </button>
         ))}
      </div>

      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-2">Todos os Amigos ({friendsList.length})</h3>

      {friendsList.map((friend) => (
        <button 
            key={friend.id} 
            onClick={() => handleUserClick(friend)}
            className="group relative w-full bg-night-800/40 hover:bg-night-800/60 border border-white/5 hover:border-white/10 p-4 rounded-3xl flex items-center gap-4 transition-all active:scale-[0.98] text-left"
        >
          {/* Avatar */}
          <div className="relative">
             <img src={friend.avatar} alt={friend.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
             {/* Vibe Match Indicator */}
             <div className="absolute -top-2 -right-2 bg-night-950 border border-white/10 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-md">
                 <Sparkles size={8} className="text-fuchsia-500" />
                 <span className="text-[9px] font-bold text-white">98%</span>
             </div>
          </div>
          
          <div className="flex-1 min-w-0">
             <h3 className="text-white font-bold text-lg leading-tight truncate">{friend.name}</h3>
             
             {friend.nextEvent ? (
                <div className="flex items-center mt-1">
                    <div className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-md flex items-center gap-1.5">
                        <MapPin size={10} className="text-violet-400" />
                        <span className="text-[10px] font-bold text-violet-300 truncate max-w-[120px]">{friend.nextEvent.title}</span>
                    </div>
                </div>
             ) : (
                <p className="text-xs text-zinc-500 mt-1">Nenhum rolê definido</p>
             )}
          </div>

          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
             <UserIcon size={16} />
          </div>
        </button>
      ))}
    </div>
  );

  const renderAdd = () => (
    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
       <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-violet-500/5 rounded-2xl blur-lg group-focus-within:bg-violet-500/10 transition-colors"></div>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-violet-400 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nome ou @username..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="relative w-full bg-night-800/80 backdrop-blur-xl border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-all shadow-inner"
        />
       </div>

       <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-sm font-bold text-white">Sugestões</h3>
          <button className="text-xs text-violet-400 font-bold flex items-center gap-1">
              <Filter size={12} /> Filtros
          </button>
       </div>

       <div className="space-y-4">
          {suggestions.map((user) => {
             const isFriend = friends.includes(user.id);
             const requestPending = friendRequests.some(r => r.userId === user.id && r.status === 'pending');
             const isBlocked = blockedUsers.includes(user.id);
             
             if (isBlocked) return null;
             
             return (
             <div key={user.id} onClick={() => handleUserClick(user)} className="bg-gradient-to-r from-night-800/50 to-night-800/20 border border-white/5 rounded-3xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                   <div className="relative">
                       <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                       <div className="absolute -bottom-1 -right-1 bg-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded-md border border-zinc-700 font-bold">
                           +{user.mutuals}
                       </div>
                   </div>
                   <div>
                      <p className="text-white font-bold">{user.name}</p>
                      <p className="text-zinc-500 text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> {user.vibes[0]}
                      </p>
                   </div>
                </div>
                <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (!isFriend && !requestPending) {
                        handleSendFriendRequest(user.id);
                      }
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${
                      isFriend 
                        ? 'bg-emerald-500 text-white' 
                        : requestPending 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-white text-black'
                    }`}
                >
                   {isFriend ? <Check size={18} /> : requestPending ? <Check size={18} /> : <UserPlus size={18} />}
                </button>
             </div>
             );
          })}
       </div>
    </div>
  );

  const renderInvites = () => {
    const pendingRequests = friendRequests.filter(r => r.status === 'pending');
    
    return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
       {pendingRequests.length === 0 && (
           <div className="flex flex-col items-center justify-center py-12 opacity-50">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                   <Check size={24} />
               </div>
               <p className="text-zinc-500">Tudo limpo por aqui.</p>
           </div>
       )}
       
       {pendingRequests.map((request) => {
          const user = allUsers.find(u => u.id === request.userId);
          if (!user) return null;
          
          return (
          <div key={request.id} className={`bg-night-800/80 border border-white/10 p-5 rounded-3xl shadow-lg relative overflow-hidden transition-all ${
            request.status === 'rejected' ? 'opacity-30' : ''
          }`}>
             {/* Gradient Accent */}
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-violet-500"></div>
             
             <div className="flex items-start gap-4 mb-4">
                 <div onClick={() => handleUserClick(user as any)} className="cursor-pointer">
                    <img src={user.avatar} className="w-12 h-12 rounded-full border border-white/10" />
                 </div>
                 <div className="flex-1">
                    <p className="text-white text-sm leading-snug">
                       <span className="font-bold text-base block mb-0.5">{user.name}</span> 
                       quer se conectar com você{request.type === 'sent' ? ' (solicitação enviada)' : ''}.
                    </p>
                    <p className="text-zinc-500 text-xs mt-1 font-mono">{request.time}</p>
                 </div>
             </div>
             <div className="flex gap-3 pl-16">
                {request.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 py-2.5 bg-white text-black rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-lg"
                    >
                       <Check size={14} /> ACEITAR
                    </button>
                    <button 
                      onClick={() => handleRejectRequest(request.id)}
                      className="px-4 py-2.5 bg-white/5 text-zinc-400 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-colors"
                    >
                       <X size={14} />
                    </button>
                  </>
                )}
                {request.status === 'rejected' && (
                  <span className="text-xs text-zinc-500 pl-4">Rejeitado</span>
                )}
             </div>
          </div>
          );
       })}
    </div>
    );
  };

  return (
    <>
    <div className="fixed inset-0 z-50 bg-night-950 animate-fade-in flex flex-col">
       {/* Header */}
       <div className="px-5 pt-8 pb-4 border-b border-white/5 bg-night-950/95 backdrop-blur-md">
           <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBackClick} 
                className="w-10 h-10 rounded-full bg-night-800 flex items-center justify-center text-white border border-white/10 active:scale-95 transition-transform"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">Social Hub</h1>
           </div>

           {/* Stylish Tabs */}
           <div className="flex p-1 bg-night-900 rounded-2xl border border-white/5 relative">
              {/* Tab Background Animation could go here */}
              <button 
                onClick={() => setActiveTab('friends')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'friends' ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-white'}`}
              >
                 Amigos
              </button>
              <button 
                onClick={() => setActiveTab('add')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'add' ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-white'}`}
              >
                 Adicionar
              </button>
              <button 
                onClick={() => setActiveTab('invites')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'invites' ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-white'}`}
              >
                 Convites
                 {invites.length > 0 && activeTab !== 'invites' && (
                    <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"></span>
                 )}
              </button>
           </div>
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-32">
          {activeTab === 'friends' && renderFriends()}
          {activeTab === 'add' && renderAdd()}
          {activeTab === 'invites' && renderInvites()}
       </div>
    </div>

    {/* Profile Modal Overlay */}
    {selectedUser && (
        <PublicProfile 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)} 
        />
    )}
    </>
  );
};

export default SocialHub;
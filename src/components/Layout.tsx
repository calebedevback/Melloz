import React from 'react';
import { Home, Ticket, Plus, Moon, User } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'my-events', icon: Ticket, label: 'Confirmados' },
    { id: 'create', icon: Plus, label: '', isAction: true },
    { id: 'after', icon: Moon, label: 'After' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen text-zinc-100 font-sans w-full bg-transparent flex flex-col relative">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth w-full">
        <div className="w-full md:max-w-6xl md:mx-auto px-0 md:px-4 py-6">
          {children}
        </div>
      </main>

      {/* Floating Glass Dock Navigation - Bottom Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass-panel rounded-3xl h-16 px-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            if (tab.isAction) {
              return (
                <button 
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as AppTab)}
                  className="relative -top-6 group mx-2"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform duration-300 border border-white/20">
                    <Plus size={26} className="text-white" strokeWidth={3} />
                  </div>
                </button>
              );
            }

            return (
              <button 
                key={tab.id}
                onClick={() => onTabChange(tab.id as AppTab)}
                className="relative flex flex-col items-center justify-center h-full group px-3"
              >
                {isActive && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 rounded-2xl blur-md" />
                )}
                <div className={`transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  <Icon 
                    size={24} 
                    fill={isActive && (tab.id === 'after' || tab.id === 'my-events') ? "currentColor" : "none"} 
                    className={`
                        ${isActive && tab.id === 'after' ? 'text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]' : ''}
                        ${isActive && tab.id === 'my-events' ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : ''}
                    `}
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                </div>
                {isActive && (
                  <div className="absolute bottom-2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
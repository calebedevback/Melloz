import React from 'react';
import { Calendar, Users, Heart, Search, Ticket } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-events' | 'no-friends' | 'no-confirmed' | 'no-search' | 'error';
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  title, 
  message,
  action 
}) => {
  const configs = {
    'no-events': {
      icon: Calendar,
      defaultTitle: 'Nenhum rolê encontrado',
      defaultMessage: 'Volte em breve para descobrir novos eventos!',
      color: 'text-violet-400',
    },
    'no-friends': {
      icon: Users,
      defaultTitle: 'Nenhum amigo ainda',
      defaultMessage: 'Adicione seus amigos para ver com quem você vai curtir!',
      color: 'text-fuchsia-400',
    },
    'no-confirmed': {
      icon: Ticket,
      defaultTitle: 'Nenhum evento confirmado',
      defaultMessage: 'Clique em "EU VOU" para confirmar sua presença em um rolê!',
      color: 'text-emerald-400',
    },
    'no-search': {
      icon: Search,
      defaultTitle: 'Nenhum resultado encontrado',
      defaultMessage: 'Tente ajustar suas buscas ou filtros',
      color: 'text-blue-400',
    },
    'error': {
      icon: Heart,
      defaultTitle: 'Oops! Algo deu errado',
      defaultMessage: 'Tente recarregar a página ou volte mais tarde',
      color: 'text-rose-400',
    },
  };

  const config = configs[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
      {/* Gradient Background Circle */}
      <div className="absolute w-32 h-32 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl -z-10 mb-8" />
      
      {/* Icon */}
      <div className={`w-20 h-20 ${config.color} bg-night-800/50 rounded-full flex items-center justify-center mb-6 border border-white/10 backdrop-blur`}>
        <Icon size={40} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">{displayTitle}</h3>

      {/* Message */}
      <p className="text-zinc-400 text-sm mb-6 max-w-sm">{displayMessage}</p>

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full text-sm hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

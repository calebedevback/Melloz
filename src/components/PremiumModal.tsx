import React from 'react';
import { X, Crown, Map, Users, Zap } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-night-900 border border-zinc-800 rounded-3xl w-full max-w-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500" />
        
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Crown size={32} className="text-fuchsia-400" />
          </div>

          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
            NOITE Premium
          </h2>
          <p className="text-zinc-400 text-sm mb-8">
            Desbloqueie a experiência completa da vida noturna.
          </p>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <Map className="text-violet-400" size={20} />
              <div>
                <p className="text-sm font-semibold text-white">Mapa Social</p>
                <p className="text-xs text-zinc-500">Veja onde está o movimento agora.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <Users className="text-fuchsia-400" size={20} />
              <div>
                <p className="text-sm font-semibold text-white">Match de Rolê</p>
                <p className="text-xs text-zinc-500">Encontre sua turma antes de sair.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <Zap className="text-orange-400" size={20} />
              <div>
                <p className="text-sm font-semibold text-white">After Hours</p>
                <p className="text-xs text-zinc-500">Acesso a eventos secretos e afters.</p>
              </div>
            </div>
          </div>

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm hover:opacity-90 transition-opacity">
            TESTAR 7 DIAS GRÁTIS
          </button>
          <p className="text-xs text-zinc-600 mt-4">Depois R$9,90/mês. Cancele quando quiser.</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
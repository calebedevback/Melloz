import React, { useState } from 'react';
import Logo from '../components/Logo';
import SupabaseAuth from '../components/SupabaseAuth';
import { Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-night-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-sm z-10 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-12 flex flex-col items-center animate-float">
          <Logo size="large" />
          <p className="text-zinc-500 mt-4 text-sm tracking-widest uppercase font-mono">
            Social Nightlife
          </p>
        </div>

        {/* Supabase Auth */}
        <div className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <SupabaseAuth onLogin={onLogin} />
        </div>

        {/* Social Proof / Vibe Badge */}
        <div className="mt-12 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 animate-fade-in" style={{ animationDelay: '0.6s' }}>
           <Sparkles size={14} className="text-yellow-400" />
           <span className="text-xs text-zinc-400">+2.5k pessoas online agora</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
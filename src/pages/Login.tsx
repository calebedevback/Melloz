import React, { useState } from 'react';
import Logo from '../components/Logo';
import { ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
        });
        if (error) throw error;
        setError('Conta criada! Verifique seu email.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) onLogin(user);
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };

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
          <Logo size="large" useCustomImage={true} />
          <p className="text-zinc-500 mt-4 text-sm tracking-widest uppercase font-mono">
            Social Nightlife
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAuth} className="w-full space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm animate-pulse">
              {error}
            </div>
          )}
          
          {isSignUp && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-zinc-500 group-focus-within:text-violet-400 transition-colors">👤</span>
              </div>
              <input 
                type="text" 
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                required={isSignUp}
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={18} className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
            </div>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
              required 
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
            </div>
            <input 
              type="password" 
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all"
              required
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Esqueceu a senha?</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="animate-pulse">{isSignUp ? 'Criando...' : 'Entrando...'}</span>
            ) : (
              <>
                <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-zinc-500 text-sm">
            {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white font-bold hover:underline"
            >
              {isSignUp ? 'Entre' : 'Cadastre-se'}
            </button>
          </p>
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
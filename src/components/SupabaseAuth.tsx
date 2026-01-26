import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

interface SupabaseAuthProps {
  onLogin: (user: any) => void;
}

const SupabaseAuth: React.FC<SupabaseAuthProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Verificar se já está logado
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      onLogin(user);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
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

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Erro no login com Google');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Login com Google */}
      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
      >
        <Chrome size={20} />
        {loading ? 'Conectando...' : 'Entrar com Google'}
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-zinc-500 text-sm">ou</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      {/* Formulário Email/Senha */}
      <form onSubmit={handleEmailAuth} className="space-y-4">
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
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {showPassword ? (
              <EyeOff size={18} className="text-zinc-500 hover:text-white transition-colors" />
            ) : (
              <Eye size={18} className="text-zinc-500 hover:text-white transition-colors" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98] transition-all"
        >
          {loading ? 'Processando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          {isSignUp ? 'Já tem conta? Entre' : 'Não tem conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
};

export default SupabaseAuth;

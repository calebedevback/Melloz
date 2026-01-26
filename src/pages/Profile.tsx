import React, { useState } from 'react';
import { 
  Camera, Mail, MapPin, Edit2, Save, X, LogOut, Shield, Bell, Lock, 
  Heart, Music, Zap, Smartphone, Users, Hash, MoreHorizontal, QrCode, ArrowLeft, Calendar, History, Moon, Settings, Upload
} from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User, VibeType } from '../types';
import { supabase } from '../lib/supabase';

type ProfileView = 'main' | 'edit' | 'settings';

const Profile: React.FC = () => {
  const [activeView, setActiveView] = useState<ProfileView>('main');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    avatar: '',
    isPremium: false,
    vibes: []
  });
  
  // Carregar usuário real do Supabase
  React.useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        // Buscar perfil completo do banco
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            avatar: profile.avatar || authUser.user_metadata?.avatar_url || 'https://picsum.photos/100/100?random=1',
            isPremium: profile.isPremium || false,
            vibes: profile.vibes || []
          });
          setEditForm({
            name: profile.name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            bio: 'Amante de música e noites inesquecíveis 🎵',
            location: 'São Paulo, SP',
            avatar: profile.avatar || authUser.user_metadata?.avatar_url || 'https://picsum.photos/100/100?random=1',
            vibes: profile.vibes || [],
            email: profile.email || authUser.email || '',
            phone: '+55 11 99999-8888',
          });
        } else {
          // Se não tiver perfil, usar dados do auth
          setUser({
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
            avatar: authUser.user_metadata?.avatar_url || 'https://picsum.photos/100/100?random=1',
            isPremium: false,
            vibes: []
          });
        }
      }
      setLoading(false);
    };
    
    loadUserProfile();
  }, []);

  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: 'Amante de música e noites inesquecíveis 🎵',
    location: 'São Paulo, SP',
    avatar: user.avatar,
    vibes: user.vibes,
    email: user.email || '',
    phone: '+55 11 99999-8888',
  });

  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar);

  const [settings, setSettings] = useState({
    notifications: true,
    publicProfile: true,
    allowMessages: true,
    showLocation: true,
    darkMode: true,
  });

  const [saving, setSaving] = useState(false);

  const vibeOptions: VibeType[] = ['Eletrônico', 'After', 'Calmo'];

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        // Atualizar no banco
        const { error } = await supabase
          .from('users')
          .update({
            name: editForm.name,
            avatar: editForm.avatar,
            vibes: editForm.vibes
          })
          .eq('id', authUser.id);

        if (error) {
          console.error('Erro ao salvar:', error);
          alert('Erro ao salvar perfil');
          return;
        }

        // Atualizar estado local
        setUser({ 
          ...user, 
          name: editForm.name,
          avatar: editForm.avatar,
          vibes: editForm.vibes 
        });
        setActiveView('main');
        alert('Perfil salvo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // O App.tsx vai detectar a mudança de autenticação automaticamente
  };

  const toggleVibe = (vibe: VibeType) => {
    if (editForm.vibes.includes(vibe)) {
      setEditForm({ ...editForm, vibes: editForm.vibes.filter(v => v !== vibe) });
    } else {
      if (editForm.vibes.length < 3) {
        setEditForm({ ...editForm, vibes: [...editForm.vibes, vibe] });
      }
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Upload para o Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-avatar.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(fileName, file);

        if (error) throw error;

        // Obter URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        // Atualizar perfil do usuário no banco
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          await supabase
            .from('users')
            .update({ avatar: publicUrl })
            .eq('id', authUser.id);

          // Atualizar estado local
          setUser({ ...user, avatar: publicUrl });
          setAvatarPreview(publicUrl);
          setEditForm({ ...editForm, avatar: publicUrl });
        }
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== EDIT VIEW =====
  if (activeView === 'edit') {
    return (
      <div className="pb-28 px-4 md:px-8 animate-fade-in">
        <div className="mt-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Editar Perfil</h1>
            <button onClick={() => setActiveView('main')} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6 bg-night-800/30 border border-white/5 rounded-2xl p-6 md:p-8">
            
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Foto de Perfil</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                  <img 
                    src={editForm.avatar || 'https://picsum.photos/100/100?random=1'} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors active:scale-95">
                    <Upload size={16} />
                    <span>Alterar Foto</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarUpload} 
                      className="hidden" 
                    />
                  </label>
                  <p className="text-xs text-zinc-500 mt-1">
                    JPG, PNG, GIF ou WebP (máx. 1MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Nome</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Telefone</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Localização</label>
              <div className="flex gap-2">
                <MapPin className="text-zinc-500 mt-3" size={20} />
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="flex-1 bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">Bio</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-20"
              />
            </div>

            {/* Vibes Selection */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">Seus Vibes (máx. 3)</label>
              <div className="grid grid-cols-3 gap-3">
                {vibeOptions.map(vibe => (
                  <button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      editForm.vibes.includes(vibe)
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border border-violet-500'
                        : 'bg-night-800 border border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Salvar Mudanças</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== SETTINGS VIEW =====
  if (activeView === 'settings') {
    return (
      <div className="pb-28 px-4 md:px-8 animate-fade-in">
        <div className="mt-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Configurações</h1>
            <button onClick={() => setActiveView('main')} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Settings Items */}
          <div className="space-y-4">
            {[
              { key: 'notifications', label: 'Notificações', icon: Bell },
              { key: 'publicProfile', label: 'Perfil Público', icon: Users },
              { key: 'allowMessages', label: 'Permitir Mensagens', icon: Mail },
              { key: 'showLocation', label: 'Mostrar Localização', icon: MapPin },
              { key: 'darkMode', label: 'Modo Escuro', icon: Lock },
            ].map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between bg-night-800/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-violet-400" size={20} />
                  <span className="text-white font-medium">{label}</span>
                </div>
                <button
                  onClick={() => toggleSetting(key as keyof typeof settings)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings[key as keyof typeof settings] ? 'bg-violet-600' : 'bg-night-700'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>

          {/* Security Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-4">Segurança</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-night-800/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="text-amber-400" size={20} />
                  <span className="text-white font-medium">Alterar Senha</span>
                </div>
                <X className="text-zinc-600" size={18} />
              </button>
              <button className="w-full flex items-center justify-between bg-night-800/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="text-emerald-400" size={20} />
                  <span className="text-white font-medium">Autenticação 2FA</span>
                </div>
                <X className="text-zinc-600" size={18} />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold py-3 rounded-lg hover:bg-rose-500/30 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN VIEW =====
  if (activeView === 'main') {
    return (
      <div className="pb-28 px-4 md:px-8 animate-fade-in">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-lg">Carregando perfil...</div>
          </div>
        ) : (
          <>
            <div className="mt-6 mb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">Perfil</h1>
                <button onClick={() => setActiveView('edit')} className="text-zinc-400 hover:text-white">
                  <Edit2 size={24} />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <label className="absolute bottom-2 right-2 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full transition-colors active:scale-95 cursor-pointer">
                    <Camera size={16} />
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>

                <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-zinc-400 text-sm mb-4">{user.email}</p>
                
                <div className="flex gap-2 justify-center flex-wrap mb-8">
                  {user.vibes.map(vibe => (
                    <span key={vibe} className="px-3 py-1 bg-night-800 border border-white/10 rounded-full text-xs font-semibold text-violet-400">
                      {vibe}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button 
                  onClick={() => setActiveView('edit')}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform active:scale-95"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
                <button 
                  onClick={() => setActiveView('settings')}
                  className="flex-1 flex items-center justify-center gap-2 bg-night-800 border border-white/10 text-white font-bold py-3 rounded-lg hover:border-white/30 transition-colors"
                >
                  <Shield size={18} />
                  Config
                </button>
              </div>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold py-2.5 rounded-lg hover:bg-rose-500/30 transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Profile;
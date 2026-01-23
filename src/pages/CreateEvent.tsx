import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, AlignLeft, Sparkles, Upload, X, Calendar } from 'lucide-react';
import { VibeType, Event, DateFilter } from '../types';
import { MOCK_USERS } from '../constants';

interface CreateEventProps {
  onBack: () => void;
  onCreate: (newEvent: Event) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onBack, onCreate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    time: '',
    date: 'today' as DateFilter,
    description: '',
    vibe: 'Agitado' as VibeType,
    image: ''
  });
  const [preview, setPreview] = useState<string>('');

  const vibes: VibeType[] = ['Agitado', 'Calmo', 'Barzinho', 'Eletrônico', 'Underground', 'After'];

  const dateOptions: { id: DateFilter; label: string; dateLabel: string }[] = [
    { id: 'today', label: 'Hoje', dateLabel: 'Hoje' },
    { id: 'tomorrow', label: 'Amanhã', dateLabel: 'Amanhã' },
    { id: 'weekend', label: 'Fim de Semana', dateLabel: 'Sábado' },
    { id: 'week', label: 'Próx. Semana', dateLabel: 'Próx. Sábado' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({...formData, image: result});
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({...formData, image: ''});
    setPreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new event object
    const newEvent: Event = {
      id: `new-${Date.now()}`,
      title: formData.title,
      location: formData.location,
      startTime: formData.time,
      date: formData.date,
      dateLabel: dateOptions.find(d => d.id === formData.date)?.dateLabel || 'Hoje',
      // Use uploaded image or random one
      image: formData.image || `https://picsum.photos/600/400?random=${Date.now()}`, 
      vibe: formData.vibe,
      priceLevel: 1,
      confirmedCount: 1,
      friendsGoing: [], // Starts empty
      isAfterHours: formData.vibe === 'After',
      isOfficial: false,
      description: formData.description || "Rolê espontâneo criado pela comunidade.",
    };

    onCreate(newEvent);
  };

  return (
    <div className="min-h-screen pt-8 px-5 pb-32 animate-fade-in bg-night-950">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-night-800 flex items-center justify-center text-white border border-white/10"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">Criar Rolê</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-400">O que vai rolar?</label>
          <input 
            type="text" 
            placeholder="Ex: Esquenta no Apê, Barzinho..."
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-night-800 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none text-lg font-medium placeholder-zinc-600 transition-colors"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
            <Upload size={14} /> Foto do Rolê
          </label>
          
          {preview ? (
            <div className="relative rounded-xl overflow-hidden border border-violet-500/30">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
              <label className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-2 rounded-lg text-sm font-bold text-center cursor-pointer hover:shadow-lg transition-shadow">
                Trocar Foto
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
              <Upload size={32} className="text-zinc-500 mb-2" />
              <span className="text-zinc-400 text-sm font-medium">Clique para adicionar foto</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Location & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <MapPin size={14} /> Onde?
            </label>
            <input 
              type="text" 
              placeholder="Local"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full bg-night-800 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <Clock size={14} /> Que horas?
            </label>
            <input 
              type="time" 
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full bg-night-800 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Date Selector */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
            <Calendar size={14} /> Que dia?
          </label>
          <div className="flex flex-wrap gap-2">
            {dateOptions.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => setFormData({...formData, date: d.id})}
                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all duration-300 ${
                  formData.date === d.id
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                    : 'bg-night-800 text-zinc-500 border-night-700 hover:border-zinc-500'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe Selector */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
            <Sparkles size={14} /> Qual a vibe?
          </label>
          <div className="flex flex-wrap gap-2">
            {vibes.map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setFormData({...formData, vibe: v})}
                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all duration-300 ${
                  formData.vibe === v
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                    : 'bg-night-800 text-zinc-500 border-night-700 hover:border-zinc-500'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
           <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
              <AlignLeft size={14} /> Detalhes (Opcional)
            </label>
            <textarea 
              rows={3}
              placeholder="Infos extras, ponto de encontro, obs..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-night-800 border border-white/10 rounded-xl p-4 text-white focus:border-violet-500 outline-none resize-none transition-colors"
            />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] active:scale-[0.98] transition-all"
          >
            PUBLICAR ROLÊ
          </button>
          <p className="text-center text-zinc-600 text-xs mt-3">
            Seu rolê ficará visível para a comunidade hoje.
          </p>
        </div>

      </form>
    </div>
  );
};

export default CreateEvent;
import { Event, User, VibeType } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Ana Silva', avatar: 'https://picsum.photos/100/100?random=1', isPremium: true, vibes: ['Eletrônico', 'Underground'] },
  { id: '2', name: 'Pedro', avatar: 'https://picsum.photos/100/100?random=2', isPremium: false, vibes: ['Barzinho', 'Calmo'] },
  { id: '3', name: 'Julia', avatar: 'https://picsum.photos/100/100?random=3', isPremium: true, vibes: ['Agitado'] },
  { id: '4', name: 'Lucas', avatar: 'https://picsum.photos/100/100?random=4', isPremium: false, vibes: ['After'] },
  { id: '5', name: 'Mari', avatar: 'https://picsum.photos/100/100?random=5', isPremium: true, vibes: ['Underground'] },
];

export const VIBE_COLORS: Record<VibeType, string> = {
  'Calmo': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Agitado': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Eletrônico': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Barzinho': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Underground': 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
  'After': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Sunset Rooftop',
    location: 'Sky Bar, Pinheiros',
    startTime: '18:00',
    date: 'today',
    image: 'https://picsum.photos/600/400?random=10',
    vibe: 'Agitado',
    priceLevel: 3,
    confirmedCount: 142,
    friendsGoing: [MOCK_USERS[0], MOCK_USERS[1]],
    isAfterHours: false,
    isOfficial: true,
    description: 'O pôr do sol mais bonito de SP com drinks autorais e house music fino. Chegue cedo para garantir mesa.',
  },
  {
    id: 'e2',
    title: 'Jazz & Wine',
    location: 'Porão do Jazz',
    startTime: '20:30',
    date: 'today',
    image: 'https://picsum.photos/600/400?random=11',
    vibe: 'Calmo',
    priceLevel: 2,
    confirmedCount: 38,
    friendsGoing: [MOCK_USERS[2]],
    isAfterHours: false,
    isOfficial: true,
    description: 'Noite de jazz clássico e carta de vinhos selecionada. Ambiente intimista perfeito para conversas.',
  },
  {
    id: 'e3',
    title: 'Techno Bunker',
    location: 'Galpão 9',
    startTime: '23:00',
    date: 'weekend',
    dateLabel: 'Sábado',
    image: 'https://picsum.photos/600/400?random=12',
    vibe: 'Eletrônico',
    priceLevel: 2,
    confirmedCount: 312,
    friendsGoing: [MOCK_USERS[0], MOCK_USERS[3], MOCK_USERS[4]],
    isAfterHours: false,
    isOfficial: true,
    description: 'Line-up pesado com atrações internacionais. Sistema de som Funktion-One. Proibido flash na pista.',
  },
  {
    id: 'e4',
    title: 'Secret After',
    location: 'Avenida Paulista',
    startTime: '04:00',
    date: 'today',
    image: 'https://picsum.photos/600/400?random=13',
    vibe: 'After',
    priceLevel: 1,
    confirmedCount: 56,
    friendsGoing: [MOCK_USERS[4]],
    isAfterHours: true,
    isOfficial: false,
    description: 'Local exato liberado apenas para confirmados 1h antes. Traga seus óculos escuros.',
  },
  {
    id: 'e5',
    title: 'Esquenta Universitário',
    location: 'Bar do Zé',
    startTime: '19:00',
    date: 'tomorrow',
    image: 'https://picsum.photos/600/400?random=14',
    vibe: 'Barzinho',
    priceLevel: 1,
    confirmedCount: 89,
    friendsGoing: [],
    isAfterHours: false,
    isOfficial: false,
    description: 'Litrinho barato e mesa de bilhar. O ponto de encontro antes da balada.',
  },
  {
    id: 'e6',
    title: 'Festival Indie',
    location: 'Parque Ibirapuera',
    startTime: '14:00',
    date: 'week',
    dateLabel: 'Próx. Sábado',
    image: 'https://picsum.photos/600/400?random=15',
    vibe: 'Alternativo' as VibeType,
    priceLevel: 2,
    confirmedCount: 420,
    friendsGoing: [MOCK_USERS[1], MOCK_USERS[2]],
    isAfterHours: false,
    isOfficial: true,
    description: 'Música ao ar livre, food trucks e feirinha de arte. Traga sua canga.',
  },
];

// Past events for history
export const MOCK_HISTORY: Event[] = [
    {
        id: 'h1',
        title: 'Noite de Jazz',
        location: 'Blue Note',
        startTime: '20:00',
        date: 'today', // Irrelevant for history but needed for type
        dateLabel: '12 Out',
        image: 'https://picsum.photos/600/400?random=20',
        vibe: 'Calmo',
        priceLevel: 3,
        confirmedCount: 80,
        friendsGoing: [],
        isAfterHours: false,
        isOfficial: true,
    },
    {
        id: 'h2',
        title: 'Rave na Fábrica',
        location: 'Mooca',
        startTime: '23:00',
        date: 'today',
        dateLabel: '05 Set',
        image: 'https://picsum.photos/600/400?random=21',
        vibe: 'Underground',
        priceLevel: 2,
        confirmedCount: 1200,
        friendsGoing: [],
        isAfterHours: false,
        isOfficial: true,
    }
];

// Helper to filter events by date category
export const filterEventsByDate = (events: Event[], filter: DateFilter): Event[] => {
  if (filter === 'all') return events;
  return events.filter(event => event.date === filter);
};

// Helper to filter events by time range (HH:mm format)
export const filterEventsByTimeRange = (
  events: Event[], 
  startHour: number, 
  endHour: number
): Event[] => {
  return events.filter(event => {
    const [hours, minutes] = event.startTime.split(':').map(Number);
    const eventTime = hours + minutes / 60;
    const start = startHour;
    const end = endHour;
    
    // Handle overnight ranges (e.g., 02:00 to 06:00)
    if (start > end) {
      return eventTime >= start || eventTime < end;
    }
    return eventTime >= start && eventTime < end;
  });
};
export type VibeType = 'Calmo' | 'Agitado' | 'Eletrônico' | 'Barzinho' | 'Underground' | 'After';

export type DateFilter = 'all' | 'today' | 'tomorrow' | 'weekend' | 'week';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isPremium: boolean;
  vibes: VibeType[];
}

export interface Event {
  id: string;
  title: string;
  location: string;
  startTime: string; // HH:mm
  endTime?: string;
  date: DateFilter;
  dateLabel?: string; // e.g. "Sexta, 14 Out"
  image: string;
  vibe: VibeType;
  priceLevel: 1 | 2 | 3 | 4; // $ to $$$$
  confirmedCount: number;
  friendsGoing: User[];
  isAfterHours: boolean;
  isOfficial: boolean; // Official venue vs spontaneous
  description?: string;
}

export interface NavItem {
  id: string;
  icon: any;
  label: string;
  path: string;
}

export type AppTab = 'feed' | 'my-events' | 'create' | 'after' | 'profile';
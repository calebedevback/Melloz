// Usando Prisma ORM com Supabase PostgreSQL
// Os tipos são gerados automaticamente pelo Prisma
// Schema definido em: prisma/schema.prisma

export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  startTime: string; // HH:mm
  endTime?: string;
  date: 'today' | 'tomorrow' | 'weekend' | 'week' | 'custom';
  dateLabel?: string;
  image?: string;
  vibe: string;
  priceLevel: 1 | 2 | 3 | 4;
  confirmedCount: number;
  isAfterHours: boolean;
  isOfficial: boolean;
  createdBy: string;
  maxAttendees?: number;
  friendsGoing: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventResponse extends IEvent {
  creator?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isPremium: boolean;
  };
  attendees?: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isPremium: boolean;
  }>;
}


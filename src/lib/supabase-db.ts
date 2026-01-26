import { supabase } from './supabase';

// Tipos para os eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  startTime: string;
  endTime?: string;
  date: string;
  dateLabel?: string;
  image?: string;
  vibe: string;
  priceLevel: number;
  confirmedCount: number;
  isAfterHours: boolean;
  isOfficial: boolean;
  maxAttendees?: number;
  createdBy: string;
  creator?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isPremium: boolean;
  };
  attendees?: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
      isPremium: boolean;
    };
  }>;
  friendsGoing: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  vibes: string[];
  createdAt: string;
  updatedAt: string;
}

// Serviços do Supabase
export class SupabaseDBService {
  // Eventos
  static async getEvents(filters?: {
    date?: string;
    vibe?: string;
    location?: string;
    limit?: number;
    page?: number;
  }) {
    let query = supabase
      .from('events')
      .select(`
        *,
        creator:users(id, name, email, avatar, isPremium),
        attendees:event_attendees(
          user:users(id, name, email, avatar, isPremium)
        )
      `, { count: 'exact' });

    // Aplicar filtros
    if (filters?.date) query = query.eq('date', filters.date);
    if (filters?.vibe) query = query.eq('vibe', filters.vibe);
    if (filters?.location) query = query.ilike('location', `%${filters.location}%`);

    // Paginação
    const limit = filters?.limit || 10;
    const page = filters?.page || 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to).order('createdAt', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      events: data || [],
      total: count || 0,
      page,
      limit,
      pages: Math.ceil((count || 0) / limit),
    };
  }

  static async createEvent(eventData: Partial<Event>, userId: string) {
    // Primeiro criar o evento
    const { data: event, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        createdBy: userId,
        confirmedCount: 1,
      })
      .select()
      .single();

    if (error) throw error;

    // Depois adicionar o criador como attendee
    await supabase
      .from('event_attendees')
      .insert({
        eventId: event.id,
        userId: userId,
      });

    return event;
  }

  static async joinEvent(eventId: string, userId: string) {
    // Verificar se já não está confirmado
    const { data: existing } = await supabase
      .from('event_attendees')
      .select('*')
      .eq('eventId', eventId)
      .eq('userId', userId)
      .single();

    if (!existing) {
      // Adicionar attendee
      await supabase
        .from('event_attendees')
        .insert({
          eventId,
          userId,
        });

      // Incrementar contador
      await supabase.rpc('increment_confirmed_count', { event_id: eventId });
    }

    // Retornar evento atualizado
    return this.getEventById(eventId);
  }

  static async leaveEvent(eventId: string, userId: string) {
    // Remover attendee
    await supabase
      .from('event_attendees')
      .delete()
      .eq('eventId', eventId)
      .eq('userId', userId);

    // Decrementar contador
    await supabase.rpc('decrement_confirmed_count', { event_id: eventId });

    return this.getEventById(eventId);
  }

  static async getEventById(eventId: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        creator:users(id, name, email, avatar, isPremium),
        attendees:event_attendees(
          user:users(id, name, email, avatar, isPremium)
        )
      `)
      .eq('id', eventId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserEvents(userId: string) {
    const { data, error } = await supabase
      .from('event_attendees')
      .select(`
        event:events(
          *,
          creator:users(id, name, email, avatar, isPremium),
          attendees:event_attendees(
            user:users(id, name, email, avatar, isPremium)
          )
        )
      `)
      .eq('userId', userId);

    if (error) throw error;
    return data?.map(item => item.event) || [];
  }

  // Perfil
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createUserProfile(userProfile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('users')
      .insert(userProfile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

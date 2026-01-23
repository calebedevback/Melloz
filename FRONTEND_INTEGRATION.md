// 📚 EXEMPLO DE INTEGRAÇÃO FRONTEND-BACKEND
// Arquivo: src/services/api.ts (criar no projeto React)

import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token em todas as requisições
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          this.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    // Carregar token do localStorage na inicialização
    this.loadToken();
  }

  // ===== AUTENTICAÇÃO =====

  async register(email: string, password: string, name: string) {
    try {
      const response = await this.api.post('/auth/register', {
        email,
        password,
        name,
      });
      this.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao registrar');
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await this.api.post('/auth/login', {
        email,
        password,
      });
      this.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Email ou senha inválidos');
    }
  }

  async getMe() {
    try {
      const response = await this.api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao obter perfil');
    }
  }

  async updateProfile(data: { name?: string; avatar?: string; vibes?: string[] }) {
    try {
      const response = await this.api.put('/auth/profile', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar perfil');
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('melloz_token');
  }

  // ===== EVENTOS =====

  async getEvents(filters?: {
    date?: string;
    vibe?: string;
    location?: string;
    limit?: number;
    page?: number;
  }) {
    try {
      const response = await this.api.get('/events', { params: filters });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar eventos');
    }
  }

  async getEventById(id: string) {
    try {
      const response = await this.api.get(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Evento não encontrado');
    }
  }

  async getTrendingEvents(limit: number = 4) {
    try {
      const response = await this.api.get('/events/trending', { params: { limit } });
      return response.data.events;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar eventos em alta');
    }
  }

  async createEvent(eventData: {
    title: string;
    description: string;
    location: string;
    startTime: string;
    date: string;
    image: string;
    vibe: string;
    priceLevel: number;
    isAfterHours: boolean;
    isOfficial: boolean;
  }) {
    try {
      const response = await this.api.post('/events', eventData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao criar evento');
    }
  }

  async updateEvent(id: string, data: Partial<any>) {
    try {
      const response = await this.api.put(`/events/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar evento');
    }
  }

  async deleteEvent(id: string) {
    try {
      const response = await this.api.delete(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao deletar evento');
    }
  }

  async joinEvent(id: string) {
    try {
      const response = await this.api.post(`/events/${id}/join`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao confirmar presença');
    }
  }

  async leaveEvent(id: string) {
    try {
      const response = await this.api.post(`/events/${id}/leave`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao cancelar presença');
    }
  }

  // ===== GERENCIAMENTO DE TOKEN =====

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('melloz_token', token);
  }

  private loadToken() {
    this.token = localStorage.getItem('melloz_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export default new ApiService();

// ===== EXEMPLO DE USO NO REACT =====

/*
// Em um componente React:

import apiService from '@/services/api';
import { useEffect, useState } from 'react';

function Feed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvents({ date: 'today', limit: 10 });
        setEvents(data.events);
      } catch (error) {
        console.error(error);
        // Mostrar erro para usuário
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleJoinEvent = async (eventId: string) => {
    try {
      const updatedEvent = await apiService.joinEvent(eventId);
      setEvents(events.map(e => e._id === eventId ? updatedEvent : e));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <button onClick={() => handleJoinEvent(event._id)}>Confirmar</button>
        </div>
      ))}
    </div>
  );
}

// Login:
async function handleLogin(email: string, password: string) {
  try {
    const result = await apiService.login(email, password);
    console.log('Usuário logado:', result.user);
    // Redirecionar para feed
    navigate('/feed');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}

// Criar evento:
async function handleCreateEvent(formData: any) {
  try {
    const newEvent = await apiService.createEvent(formData);
    console.log('Evento criado:', newEvent);
    // Atualizar lista de eventos
  } catch (error) {
    console.error('Erro ao criar evento:', error);
  }
}
*/

// ===== VARIÁVEIS DE AMBIENTE (.env) =====

/*
VITE_API_URL=http://localhost:5000/api
*/

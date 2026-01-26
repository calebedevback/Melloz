export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    profile: `${API_BASE_URL}/api/auth/profile`,
  },
  events: {
    list: `${API_BASE_URL}/api/events`,
    create: `${API_BASE_URL}/api/events`,
    update: (id: string) => `${API_BASE_URL}/api/events/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/events/${id}`,
  }
};

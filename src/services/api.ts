import { Dog, SearchParams, SearchResponse } from '@/types/api'

const API_BASE = 'https://frontend-take-home-service.fetch.com'

async function authInterceptor(response: Response): Promise<Response> {
  if (response.status === 401) {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  }
  return response;
}

export const api = {
  async login(credentials: { name: string; email: string }): Promise<boolean> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });
    return response.ok;
  },

  async logout(): Promise<boolean> {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return response.ok;
  },

  async searchDogs(params: SearchParams): Promise<SearchResponse> {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    const response = await fetch(`${API_BASE}/dogs/search?${query}`, {
      credentials: 'include'
    })
    return response.json()
  },

  async getDogs(ids: string[]): Promise<Dog[]> {
    const response = await fetch(`${API_BASE}/dogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
      credentials: 'include'
    })
    return response.json()
  },

  async getBreeds(): Promise<Dog[]> {
    const response = await fetch(`${API_BASE}/dogs/breeds`, {
      credentials: 'include'
    });

    return await response.json();
  },

  getMatch: async (dogIds: string[]) => {
    const response = await fetch(`${API_BASE}/dogs/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds),
      credentials: 'include'
    });
    return await response.json();
  }
}
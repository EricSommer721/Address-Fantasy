import axios from 'axios';
import type { Card, CardPack, User, Event } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// 卡片相关 API
export const cardApi = {
  getAll: () => api.get<Card[]>('/cards'),
  getById: (id: string) => api.get<Card>(`/cards/${id}`),
  create: (card: Omit<Card, 'id'>) => api.post<Card>('/cards', card),
  update: (id: string, card: Partial<Card>) => api.put<Card>(`/cards/${id}`, card),
  delete: (id: string) => api.delete(`/cards/${id}`),
};

// 卡包相关 API
export const cardPackApi = {
  getAll: () => api.get<CardPack[]>('/card-packs'),
  getById: (id: string) => api.get<CardPack>(`/card-packs/${id}`),
  create: (cardPack: Omit<CardPack, 'id'>) => api.post<CardPack>('/card-packs', cardPack),
  update: (id: string, cardPack: Partial<CardPack>) => api.put<CardPack>(`/card-packs/${id}`, cardPack),
  delete: (id: string) => api.delete(`/card-packs/${id}`),
};

// 用户相关 API
export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  getByWallet: (walletAddress: string) => api.get<User>(`/users/wallet/${walletAddress}`),
  update: (id: string, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
};

// 活动相关 API
export const eventApi = {
  getAll: () => api.get<Event[]>('/events'),
  getById: (id: string) => api.get<Event>(`/events/${id}`),
  create: (event: Omit<Event, 'id'>) => api.post<Event>('/events', event),
  update: (id: string, event: Partial<Event>) => api.put<Event>(`/events/${id}`, event),
  delete: (id: string) => api.delete(`/events/${id}`),
  getParticipants: (id: string) => api.get<string[]>(`/events/${id}/participants`),
  addParticipant: (id: string, walletAddress: string) =>
    api.post(`/events/${id}/participants`, { walletAddress }),
  removeParticipant: (id: string, walletAddress: string) =>
    api.delete(`/events/${id}/participants/${walletAddress}`),
}; 
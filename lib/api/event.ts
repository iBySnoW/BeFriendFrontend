import { apiRequest } from './client';

export const eventApi = {
  getEventById: async (eventId: number) => {
    return apiRequest(`/events/${eventId}`);
  },
  getEventsByUserId: async (userId: number) => {
    return apiRequest(`/users/${userId}/events`, { method: 'GET' });
  },

  getEventsByGroupId: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}/events`, { method: 'GET' });
  },

  createEvent: async (event: any) => {
    return apiRequest(`/events`, { method: 'POST', body: JSON.stringify(event) });
  },

  // Ajoute d'autres méthodes selon les besoins
};
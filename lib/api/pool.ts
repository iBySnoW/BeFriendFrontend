import { apiRequest } from './client';

export const poolApi = {
  createPool: async (data: any) => {
    return apiRequest('/pools', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getPoolById: async (poolId: number) => {
    return apiRequest(`/pools/${poolId}`);
  },
  getContributionsByPoolId: async (poolId: number) => {
    return apiRequest(`/pools/${poolId}/contributions`, { method: 'GET' });
  },
  addContribution: async (poolId: number, data: any) => {
    return apiRequest(`/pools/${poolId}/contributions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getPoolTotalAmount: async (poolId: number) => {
    return apiRequest(`/pools/${poolId}/total`, { method: 'GET' });
  },

  getPoolsByEventId: async (eventId: number) => {
    return apiRequest(`/events/${eventId}/pools`, { method: 'GET' });
  },

  getPoolDetails: async (poolId: number) => {
    return apiRequest(`/pools/${poolId}`, { method: 'GET' });
  },
}; 
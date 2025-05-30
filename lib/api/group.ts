import { apiRequest } from './client';


export const groupApi = {
  createGroup: async (data: any) => {
    return apiRequest('/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deleteGroup: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}`, {
      method: 'DELETE',
    });
  },

  getGroupById: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}`);
  },
  getGroupsByUserId: async (userId: number) => {
    return apiRequest(`/users/${userId}/groups`);
  },

  getMembersByGroupId: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}/members`);
  },

  getBalancesByGroupId: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}/balances`);
  },

  getInvitationsByGroupId: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}/invitations`);
  },

  inviteToGroup: async (groupId: number, data: { phone?: string }) => {
    return apiRequest(`/groups/${groupId}/invitations`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
}; 
import { apiRequest } from './client';

export const expenseApi = {
  createExpense: async (data: any) => {
    return apiRequest('/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getExpenseById: async (expenseId: number) => {
    return apiRequest(`/expenses/${expenseId}`);
  },
  getExpensesByEventId: async (eventId: number) => {
    return apiRequest(`/events/${eventId}/expenses`, { method: 'GET' });
  },
  getBalancesByGroupId: async (groupId: number) => {
    return apiRequest(`/groups/${groupId}/balances`, { method: 'GET' });
  },
}; 
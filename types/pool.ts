import { User } from './auth';
import { Group } from './group';
import { Event } from './event';

export type PoolStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PoolVisibility = 'PUBLIC' | 'PRIVATE' | 'GROUP_MEMBERS';

export interface Pool {
  id: number;
  title: string;
  description?: string;
  target_amount?: number;
  current_amount: number;
  currency: string;
  event_id?: number;
  group_id?: number;
  created_by: number;
  end_date?: Date;
  status: PoolStatus;
  visibility: PoolVisibility;
  created_at: Date;
  updated_at: Date;
  creator?: User;
  event?: Event;
  group?: Group;
  contributions: Contribution[];
}

export interface Contribution {
  id: number;
  pool_id: number;
  user_id: number;
  amount: number;
  message?: string;
  created_at: Date;
  pool?: Pool;
  user: User;
}

export interface CreatePoolDto {
  title: string;
  description?: string;
  target_amount?: number;
  currency?: string;
  event_id?: number;
  group_id?: number;
  end_date?: Date;
  visibility?: PoolVisibility;
}

export interface UpdatePoolDto {
  title?: string;
  description?: string;
  target_amount?: number;
  currency?: string;
  end_date?: Date;
  status?: PoolStatus;
  visibility?: PoolVisibility;
}
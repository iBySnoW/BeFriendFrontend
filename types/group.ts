import { User } from './auth';

export type GroupVisibility = 'PUBLIC' | 'PRIVATE' | 'GROUP_MEMBERS';

export interface Group {
  id: number;
  name: string;
  description?: string;
  avatar_url?: string;
  created_by: number;
  visibility: GroupVisibility;
  created_at: Date;
  updated_at: Date;
  members: GroupMember[];
  creator?: User;
}

export interface GroupMember {
  id: number;
  group_id: number;
  user_id: number;
  role: 'admin' | 'member';
  joined_at: Date;
  user: User;
  group?: Group;
}

export interface CreateGroupDto {
  name: string;
  description?: string;
  avatar_url?: string;
  visibility?: GroupVisibility;
}

export interface UpdateGroupDto {
  name?: string;
  description?: string;
  avatar_url?: string;
  visibility?: GroupVisibility;
}
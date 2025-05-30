import { User } from './auth';
import { Group } from './group';

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
export type EventVisibility = 'PUBLIC' | 'PRIVATE' | 'GROUP_MEMBERS';

export interface Event {
  id: number;
  title: string;
  description?: string;
  location?: string;
  start_date: Date;
  end_date?: Date;
  group_id: number;
  created_by: number;
  image_url?: string;
  status: EventStatus;
  visibility: EventVisibility;
  max_participants?: number;
  registration_deadline?: Date;
  created_at: Date;
  updated_at: Date;
  group?: Group;
  creator?: User;
  participants: EventParticipant[];
}

export interface EventParticipant {
  id: number;
  event_id: number;
  user_id: number;
  status: 'pending' | 'accepted' | 'declined';
  joined_at: Date;
  event?: Event;
  user: User;
}

export interface CreateEventDto {
  title: string;
  description?: string;
  location?: string;
  start_date: Date;
  end_date?: Date;
  group_id: number;
  image_url?: string;
  visibility?: EventVisibility;
  max_participants?: number;
  registration_deadline?: Date;
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  image_url?: string;
  status?: EventStatus;
  visibility?: EventVisibility;
  max_participants?: number;
  registration_deadline?: Date;
}
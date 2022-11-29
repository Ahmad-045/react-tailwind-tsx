import { keyValueString } from '../data/generic-types';

export type DataType = {
  id: number;
  email: string;
};

export type UserType = {
  id: number;
  contact: string | null;
  created_at: string;
  email: string;
  updated_at: string;
  username: string | null;
};

export interface LeadType {
  id: number;
  client_address: string;
  client_contact: string;
  client_email: string;
  client_name: string;
  created_at: string;
  phasesCount: number;
  platform_used: string;
  project_name: string;
  sale: string | null;
  text_type: string;
  user: UserType;
}

export type GlobalResponseType = {
  data: LeadType[];
  status: number;
};

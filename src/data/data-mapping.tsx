import { keyValueString, optionsForSelect } from './generic-types';

export const RolesLabel = {
  admin: 'admin',
  manager: 'Manager',
  engineer: 'Engineer',
  bd: 'Business Developer',
};

export const AVAL_ROLES = [
  { value: 'manager', label: 'Manager' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'bd', label: 'Business Developer' },
];

export const STATUS_LIST: optionsForSelect[] = [
  { value: '0', label: 'not_completed' },
  { value: '1', label: 'completed' },
];

export const LEAD_DETAILS_MAPPING: keyValueString = {
  id: 'ID',
  project_name: 'Project Name',
  client_name: 'Client Name',
  client_address: 'Client Address',
  client_email: 'Client Email',
  client_contact: 'Client Contact',
  platform_used: 'Platform Used',
  test_type: 'Test Type',
  created_at: 'Created ',
  phasesCount: 'Phase Count',
  sale: 'Sale ',
};

export const USER_DETAILS_MAPPING: keyValueString = {
  id: 'ID',
  email: 'Email',
  username: 'Username',
  contact: 'Contact',
};

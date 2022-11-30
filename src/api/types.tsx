export type DataType = {
  id: number;
  email: string;
};

export type UserType = {
  id: number;
  contact: string | null;
  email: string;
  username: string | null;
  created_at?: string;
  updated_at?: string;
};

export type LeadType = {
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
};

export type PhaseType = {
  id: number;
  phase_name: string;
  created_at: string;
  start_date: string;
  end_date: string;
  status: string;
  manager: UserType;
};

export type GlobalResponseType = {
  data: LeadType[];
  status: number;
};

export type defaultPhaseFormType = {
  phase_name: string;
  start_date: Date;
  end_date: Date;
  manager_id: string | number;
  lead_id: number;
};

export type defaultLeadFormType = {
  project_name: string;
  client_name: string;
  client_address: string;
  client_email: string;
  client_contact: string;
  platform_used: string;
  test_type: number;
  user_id: number;
};

export type MakeItSaleType = {
  lead_id: number;
  conversion_date: Date;
};

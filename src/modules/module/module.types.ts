export interface ModuleAttributes {
  id: number;
  name: string;
  label: string;
  code: string;
  description: string;
  status: number;
  intake: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubmoduleAttributes {
  id: number;
  domain_id: number;
  name: string;
  label: string;
  code: string;
  description?: string | null;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

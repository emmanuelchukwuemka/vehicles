export interface CreateStoreInput {
  vendor_id: number;
  subdomain_id: number;
  name: string;
  slogan: string;
  city_id: number;
  address: string;
  floor_space: string;
  logo: string;
  net_worth: number;
  staff_count: number;
  banner: string;
  picture: string;
  capabilities?: number[];
  scope: string;
}

export interface StoreAttributes {
  id: number;
  vendor_id: number;
  subdomain_id: number;
  name: string;
  slogan?: string;
  city_id: number;
  banner: string;
  picture: string;
  logo?: string;
  net_worth: number;
  staff_count?: number;
  address: string;
  floor_space: number;
  code: string;
  is_verified?: number;
  verified_date?: Date | null;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

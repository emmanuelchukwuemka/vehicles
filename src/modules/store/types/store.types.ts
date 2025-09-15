export interface StoreAttributes {
  id: number;
  vendor_id: number;
  subdomain_id: number;
  name: string;
  slogan: string;
  city_id: number;
  address: string;
  code: string;
  status: number;
  is_verified: number;
  metadata: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
}

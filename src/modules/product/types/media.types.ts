export interface MediaAttributes {
  id: number;
  product_id: number;
  variation_id?: number | null;
  url: string;
  type: string;
  metadata?: any | null;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

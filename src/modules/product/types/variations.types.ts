export interface VariationAttributes {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  stock: number;
  status: number;
  metadata?: any | null;
  created_at?: Date;
  updated_at?: Date;
}

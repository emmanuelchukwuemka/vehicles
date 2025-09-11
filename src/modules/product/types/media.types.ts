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

export interface ProductUnitAttributes {
  id: number;
  product_id: number;
  name: string; // e.g. "Large Pizza", "Bedroom", "Color: Blue"
  value: string;
  price: number; // override base price if any
  stock: number; // available stock
  metadata?: object | null; // flexible JSON
  status?: number; // 1 = Active, 0 = Inactive
  created_at?: Date;
  updated_at?: Date;
}

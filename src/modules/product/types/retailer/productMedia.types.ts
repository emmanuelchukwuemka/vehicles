export interface ProductMediaAttributes {
  id: number;
  product_id: number;
  unit_id?: number | null;
  url: string;
  type: string;
  description?: string | null;
  metadata?: object | null;
  status?: number;
}

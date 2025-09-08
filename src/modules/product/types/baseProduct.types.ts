export interface ProductAttributes {
  id: number;
  store_id: number;
  product_code: string;
  subcategory_id?: number | null;
  collection_id?: number | null;
  subdomain_id?: number | null;
  name: string;
  description: string;
  base_price: number;
  currency_id: number;
  metadata?: any | null;
  variations?: {
    price: number;
    stock: number;
    attributes: Record<string, string | number>;
    medias?: { url: string; type: string; description?: string }[];
  }[];
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

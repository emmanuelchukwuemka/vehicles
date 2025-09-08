export interface CollectionAttributes {
  id: number;
  store_id: number;
  name: string;
  label: string;
  description: string;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

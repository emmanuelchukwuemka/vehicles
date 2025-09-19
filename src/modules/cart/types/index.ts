export interface CartAttributes {
  id: number;
  user_id: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CartItemAttributes {
  id: number;

  cart_id: number; // FK → carts
  subdomain_id: number; // FK → subdomains (retail, logistics, etc.)
  product_id: number; // FK → products (works for all subdomains)
  unit_id?: number; // FK → product_units (only for retail, optional)

  quantity: number; // qty for retail OR number of shipments
  price: number; // unit price or calculated charge
  currency_id: number; // FK → currencies

  metadata?: Record<string, any>; // extra JSON (variations, logistics options, etc.)

  created_at?: Date;
  updated_at?: Date;
}

export interface ProductAttributes {
  id: number;
  store_id: number;
  subcategory_id: number;
  collection_id: number;
  product_code: string;
  name: string;
  description: string | null;
  customizable: number;
  price: number;
  discount: number;
  weight: number;
  stock: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface VariationAttributeAttributes {
  id: number;
  variation_id: number;
  layout_id: number;
  title: string;
  description: string;
  label: string;
  value: string;
  price: number;
  stock?: number | null;
  weight: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface SampleInput {
  ppu: number;
  min_qty: number;
}

export interface MoqInput {
  min_qty: number;
  ppu: number;
}

export interface SpecificationInput {
  name: string;
  value: string;
}

export interface CreateProductInput {
  store_id: number;
  subcategory_id: number;
  collection_id: number;
  name: string;
  desc: string;
  customizable?: number;
  price: number;
  discount?: number;
  weight: number;
  stock: number;
  sample?: SampleInput;
  moq: MoqInput[];
  specifications: SpecificationInput[];
}

export interface AttributeInput {
  layout_id: number;
  label: string;
  value: string;
  price: number;
  stock: number;
  weight: number;
  image?: string;
}

export interface MediaInput {
  url: string;
  type: string;
}

export interface VariationInput {
  price: number;
  stock: number;
  weight: number;
  attributes: AttributeInput[];
  media?: MediaInput[];
}

export interface CreateVariationRequest {
  product_id: number;
  product_code: string;
  variation: VariationInput;
}

export type AddAttributesInput = {
  product_id: number;
  variation_id: number;
  sku: string;
  attributes: Record<
    string,
    {
      layout_id: number;
      title: string;
      description: string;
      items: {
        value: string;
        price: number;
        stock?: number | null;
        weight: number;
        images?: string[];
      }[];
    }
  >;
};

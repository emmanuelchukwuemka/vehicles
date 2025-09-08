import { z } from "zod";

export const productSchema = z.object({
  store_id: z.number().min(1, "Store ID is required"),
  subcategory_id: z.number().min(1, "Subcategory ID is required"),
  collection_id: z.number().int().min(1, "Collection is required"),

  name: z
    .string()
    .min(2, "Product name is required")
    .max(255, "Product name is too long"),

  desc: z
    .string()
    .min(5, "Product description is required")
    .max(2000, "Description is too long"),

  customizable: z.number().int().optional().default(0),

  price: z.number().min(0, "Price must be a non-negative number"),
  discount: z.number().min(0).optional().default(0),
  weight: z.number().min(0, "Weight must be a non-negative number"),
  stock: z.number().int().min(0, "Stock must be zero or a positive integer"),

  sample: z
    .object({
      ppu: z.number().min(0, "Sample price must be a non-negative number"),
      min_qty: z.number().int().min(1, "Sample minimum quantity must be >= 1"),
    })
    .optional(),

  moq: z.array(
    z.object({
      min_qty: z.number().int().min(1, "MOQ minimum quantity must be >= 1"),
      ppu: z.number().min(0, "MOQ price must be a non-negative number"),
    })
  ),

  specifications: z.array(
    z.object({
      name: z.string().min(1, "Specification name is required"),
      value: z.string().min(1, "Specification value is required"),
    })
  ),
});

// Variation Attribute
export const variationAttributeSchema = z.object({
  attribute_id: z.number().int().positive("Invalid attribute ID"),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  price: z.number().nonnegative("Price cannot be negative").default(0),
  stock: z.number().int().nullable().optional(),
  weight: z.number().nonnegative("Weight cannot be negative").default(0),
  image: z.url("Invalid image URL").nullable().optional(),
});

// Variation Media
export const variationMediaSchema = z.object({
  url: z.url("Invalid media URL"),
  type: z.enum(["image", "video"]),
});

// Variation
export const variationSchema = z.object({
  product_id: z.number(),
  product_code: z.string().min(1, "Product code is required"),
  variation: z.object({
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    weight: z.number().positive(),
    attributes: z.record(
      z.string(),
      z.object({
        layout_id: z.number(),
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        items: z.array(
          z.object({
            value: z.string(),
            price: z.number().nonnegative(),
            stock: z.number().nullable().optional(),
            weight: z.number().nonnegative(),
            images: z.array(z.url("Invalid image URL")).optional(),
          })
        ),
      })
    ),
    media: z
      .array(
        z.object({
          url: z.url("Invalid media URL"),
          type: z.string(),
        })
      )
      .optional(),
  }),
});

// Wrapper
export const createVariationSchema = z.object({
  product_id: z.number().int().positive("Invalid product ID"),
  product_code: z.string(),
  variation: variationSchema.shape.variation,
});

// Types
export type VariationInput = z.infer<typeof variationSchema>;
export type CreateVariationInput = z.infer<typeof createVariationSchema>;
export type ProductInput = z.infer<typeof productSchema>;

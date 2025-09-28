import { Subdomain } from "../../domains/model/subdomain.models";
import { Product, ProductMedia, ProductUnit } from "../models/associations";

export class ProductService {
  static async getSingleProduct(
    id: number,
    options?: {
      domain?: string;
      includeUnits?: boolean;
      includeMedia?: boolean;
      includeMetadata?: boolean;
      includeSpecifications?: boolean;
      includeProductMediaMetadata?: boolean;
      includeUnitMediaMetadata?: boolean;
    }
  ) {
    const {
      domain,
      includeUnits = true,
      includeMedia = true,
      includeMetadata = true,
      includeSpecifications = true,
      includeProductMediaMetadata = true,
      includeUnitMediaMetadata = true,
    } = options || {};

    try {
      // 🔹 Step 1: Resolve subdomain if provided
      let subdomainId: number | undefined;
      if (domain) {
        const subdomain = await Subdomain.findOne({ where: { name: domain } });
        if (!subdomain) {
          return { success: false, message: "Subdomain not found", data: null };
        }
        subdomainId = subdomain.id;
      }

      // 🔹 Step 2: Fetch product
      let product = await Product.findOne({
        where: { id, ...(subdomainId ? { subdomain_id: subdomainId } : {}) },
        attributes: {
          exclude: ["created_at", "updated_at", "createdAt", "updatedAt"],
        },
        include: [
          ...(includeUnits
            ? [
                {
                  model: ProductUnit,
                  as: "units",
                  attributes: {
                    exclude: [
                      "created_at",
                      "updated_at",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                  include: includeMedia
                    ? [{ model: ProductMedia, as: "unitMedia" }]
                    : [],
                },
              ]
            : []),
          ...(includeMedia
            ? [
                {
                  model: ProductMedia,
                  as: "productMedia",
                  attributes: {
                    exclude: [
                      "created_at",
                      "updated_at",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                  where: { unit_id: null },
                  required: false,
                },
              ]
            : []),
        ],
      });

      if (!product) {
        return { success: false, message: "Product not found" };
      }

      // 🔹 Step 3: Clean product based on flags
      const plain: any = product.get({ plain: true });

      if (!includeMetadata) {
        delete plain.metadata;
      } else if (!includeSpecifications && plain.metadata?.specifications) {
        delete plain.metadata.specifications;
      }

      if (plain.productMedia && Array.isArray(plain.productMedia)) {
        plain.productMedia = plain.productMedia.map((m: any) => {
          if (!includeProductMediaMetadata) {
            const { metadata, ...rest } = m;
            return rest;
          }
          return m;
        });
      }

      if (includeUnits && plain.units) {
        plain.units = plain.units.map((u: any) => {
          if (u.unitMedia && Array.isArray(u.unitMedia)) {
            u.unitMedia = u.unitMedia.map((m: any) => {
              if (!includeUnitMediaMetadata) {
                const { metadata, ...rest } = m;
                return rest;
              }
              return m;
            });
          }
          return u;
        });
      }

      return {
        success: true,
        message: "Product fetched successfully",
        data: plain,
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { success: false, message: "Failed to fetch product", error };
    }
  }
}

export class ProductUnitService {
  static async getSingleUnit(
    unitId: number,
    options?: {
      includeMedia?: boolean;
      includeMetadata?: boolean;
    }
  ) {
    try {
      const unit = await ProductUnit.findByPk(unitId, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
        },
        include: [
          ...(options?.includeMedia
            ? [
                {
                  model: ProductMedia,
                  as: "unitMedia",
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "created_at",
                      "updated_at",
                    ],
                  },
                },
              ]
            : []),
        ],
      });

      if (!unit) {
        return { success: false, message: "Unit not found" };
      }

      const plain = unit.get({ plain: true });

      if (!options?.includeMetadata) {
        delete plain.metadata;
      }

      return {
        success: true,
        message: "Unit fetched successfully",
        data: plain,
      };
    } catch (error: any) {
      console.error("Error in getSingleUnit:", error);
      return { success: false, message: "Failed to fetch unit", error };
    }
  }
}

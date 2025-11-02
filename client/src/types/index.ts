// Re-export types from shared schema
export type { Product, Category, InsertProduct, InsertCategory } from "@shared/schema";

// Additional frontend-specific types
export interface ProductWithCategory extends Product {
  categoryName?: string;
}

export interface ImageUploadResponse {
  imageUrls: string[];
  thumbnailUrls: string[];
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  images?: string[];
  isActive: boolean;
}
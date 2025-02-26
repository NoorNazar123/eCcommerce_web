// Define the product type (optional for TypeScript)
export type Product = {
  id: string | number; // Allow both string and number for id
  name: string;
  description: string;
  price: string | number; // Allow both string and number for price
  stock: number;
  sku: string;
  images: string[]; // Array of image URLs
  categoryId: string;
  isActive?: boolean;
  gender: string;
};

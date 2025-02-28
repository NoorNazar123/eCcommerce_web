// src/lib/ApiClient.ts
import axios, { AxiosInstance } from 'axios';
import { Product, ProductFormData } from '@/types/product.type';
import { handleApiError } from '@/utils/errorHandler';
import { BACKEND_URI } from '@/constants/constants';

const BASE_URL = BACKEND_URI || 'http://localhost:8080';

// Create an Axios instance for making requests
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class ApiClient {
  // Function for handling API calls
  private async fetch<T>(endpoint: string, options = {}): Promise<T> {
    try {
      const response = await axiosClient(endpoint, options);
      return response.data.data; // Returning data from the response
    } catch (error) {
      handleApiError(error); // Handle errors using a custom utility
      throw error; // Throw the error to be handled in the component
    }
  }

  // Get all products
  async getProducts(): Promise<Product[]> {
    return this.fetch<Product[]>('products');
  }

  // Get a single product by ID
  async getProduct(id: string): Promise<Product> {
    return this.fetch<Product>(`products/${id}`);
  }

  // Create a new product
  async createProduct(productData: ProductFormData): Promise<Product> {
    return this.fetch<Product>('products', {
      method: 'POST',
      data: productData,
    });
  }

  // Update a product by ID
  async updateProduct(
    id: string,
    productData: Partial<ProductFormData>,
  ): Promise<Product> {
    return this.fetch<Product>(`products/${id}`, {
      method: 'PATCH',
      data: productData,
    });
  }

  // Delete a product by ID
  async deleteProduct(id: string): Promise<void> {
    return this.fetch<void>(`products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

// import { Product } from '@/types/product.type';

// export type ProductFormData = Omit<Product, '_id'>;

// type FetchOptions = {
//   method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
//   body?: any;
//   headers?: Record<string, string>;
// };

// class ApiClient {
//   private baseUrl: string;

//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;
//   }

//   private async fetch<T>(
//     endpoint: string,
//     options: FetchOptions = {},
//   ): Promise<T> {
//     const { method = 'GET', body, headers = {} } = options;

//     const defaultHeaders = {
//       'Content-Type': 'application/json',
//       ...headers,
//     };

//     try {
//       const response = await fetch(`${this.baseUrl}/${endpoint}`, {
//         method,
//         headers: defaultHeaders,
//         body: body ? JSON.stringify(body) : undefined,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
//       }

//       return response.json(); // Return the parsed JSON
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }

//   // Get all products
//   async getProducts(): Promise<Product[]> {
//     try {
//       const response = await this.fetch<{ data: Product[] }>('products');
//       return response.data; // Return the `data` field, which is an array of Product objects
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//       throw err;
//     }
//   }

//   // Get a single product by ID
//   async getProduct(id: string): Promise<Product> {
//     try {
//       const product = await this.fetch<Product>(`products/${id}`);
//       return product;
//     } catch (err) {
//       console.error(`Failed to fetch product with ID ${id}:`, err);
//       throw err;
//     }
//   }

//   // Create a new product
//   async createProduct(productFormData: ProductFormData): Promise<Product> {
//     try {
//       const newProduct = await this.fetch<Product>('products', {
//         method: 'POST',
//         body: productFormData,
//       });
//       return newProduct;
//     } catch (err) {
//       console.error('Failed to create product:', err);
//       throw err;
//     }
//   }

//   // Update a product by ID
//   async updateProduct(
//     id: string,
//     updatedData: Partial<ProductFormData>,
//   ): Promise<Product> {
//     try {
//       const updatedProduct = await this.fetch<Product>(`products/${id}`, {
//         method: 'PATCH',
//         body: updatedData,
//       });
//       return updatedProduct;
//     } catch (err) {
//       console.error(`Failed to update product with ID ${id}:`, err);
//       throw err;
//     }
//   }

//   // Delete a product by ID
//   async deleteProduct(id: string): Promise<string> {
//     try {
//       const response = await this.fetch<{ message: string }>(`products/${id}`, {
//         method: 'DELETE',
//       });
//       return response.message; // Return a message indicating success or failure
//     } catch (err) {
//       console.error(`Failed to delete product with ID ${id}:`, err);
//       throw err;
//     }
//   }
// }

// // Example usage:
// export const apiClient = new ApiClient('http://localhost:8080');

// import { Products } from '@/types/type';

// export type ProductFormData = Omit<Products, '_id'>;

// type FetchOptions = {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   body?: any;
//   headers?: Record<string, string>;
// };

// class ApiClient {
//   private async fetch<T>(
//     endpoint: string,
//     options: FetchOptions = {},
//   ): Promise<T> {
//     const { method = 'GET', body, headers = {} } = options;

//     const defaultHeaders = {
//       'Content-Type': 'application/json',
//       ...headers,
//     };

//     const response = await fetch(`/api${endpoint}`, {
//       method,
//       headers: defaultHeaders,
//       body: body ? JSON.stringify(body) : undefined,
//     });

//     if (!response.ok) {
//       throw new Error(await response.text());
//     }

//     return response.json();
//   }

//   async getVideos() {
//     return this.fetch<Products[]>('/videos');
//   }

//   async getVideo(id: string) {
//     return this.fetch<Products>(`/videos/${id}`);
//   }

//   async createVideo(productFormData: ProductFormData) {
//     return this.fetch<Products>('/videos', {
//       method: 'POST',
//       body: productFormData,
//     });
//   }
// }

// export const apiClient = new ApiClient();

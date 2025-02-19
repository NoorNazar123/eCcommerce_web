import { Products } from '@/types/type';

export type ProductFormData = Omit<Products, '_id'>;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch<Products[]>('/videos');
  }

  async getVideo(id: string) {
    return this.fetch<Products>(`/videos/${id}`);
  }

  async createVideo(productFormData: ProductFormData) {
    return this.fetch<Products>('/videos', {
      method: 'POST',
      body: productFormData,
    });
  }
}

export const apiClient = new ApiClient();

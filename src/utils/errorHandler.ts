import axios from 'axios';

// src/utils/errorHandler.ts
export function handleApiError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data?.message || error.message);
  } else {
    console.error('An unknown error occurred:', error);
  }
}

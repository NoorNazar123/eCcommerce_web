// src/types/api.types.ts
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  timestamp: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export type Session = {
  user: {
    id: string;
    username: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

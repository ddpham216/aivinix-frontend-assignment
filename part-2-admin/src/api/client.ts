import axios, { type AxiosError, type AxiosResponse } from 'axios';
import type { ApiError, ApiValidationError } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Missing required environment variable: VITE_API_BASE_URL. Please configure it in your .env file.');
}

const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for normalized error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiValidationError>) => {
    const formattedError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred.',
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(formattedError);
  }
);

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { productKeys } from './productKeys';
import type { Product } from '../types';
import type { ApiResponse } from '@/types/api';

export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get<ApiResponse<Product> | Product>(`/products/${id}`);
  if ('data' in response.data && response.data.data && typeof response.data.data === 'object') {
    return response.data.data as Product;
  }
  return response.data as Product;
};

export const useProduct = (id?: number) => {
  return useQuery({
    queryKey: productKeys.detail(id!),
    queryFn: () => getProduct(id!),
    enabled: typeof id === 'number' && !isNaN(id) && id > 0,
  });
};

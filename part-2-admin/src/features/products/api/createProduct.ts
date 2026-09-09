import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { productKeys } from './productKeys';
import type { Product, ProductPayload } from '../types';
import type { ApiResponse } from '@/types/api';

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
  const response = await apiClient.post<ApiResponse<Product> | Product>('/products', payload);
  if ('data' in response.data && response.data.data && typeof response.data.data === 'object') {
    return response.data.data as Product;
  }
  return response.data as Product;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { productKeys } from './productKeys';
import type { Product, ProductPayload } from '../types';
import type { ApiResponse } from '@/types/api';

interface UpdateProductParams {
  id: number;
  payload: ProductPayload;
}

export const updateProduct = async ({ id, payload }: UpdateProductParams): Promise<Product> => {
  const response = await apiClient.put<ApiResponse<Product> | Product>(`/products/${id}`, payload);
  if ('data' in response.data && response.data.data && typeof response.data.data === 'object') {
    return response.data.data as Product;
  }
  return response.data as Product;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });
};

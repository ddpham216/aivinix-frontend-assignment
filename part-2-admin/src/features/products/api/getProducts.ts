import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { productKeys } from './productKeys';
import type { Product, ProductFilterParams } from '../types';
import type { PaginatedResponse } from '@/types/api';

export const getProducts = async (
  params?: ProductFilterParams
): Promise<PaginatedResponse<Product>> => {
  // Strip empty strings and undefined params before sending request
  const cleanParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== '' && v !== undefined)
      )
    : undefined;

  const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
    params: cleanParams,
  });
  return response.data;
};

export const useProducts = (params?: ProductFilterParams) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
};

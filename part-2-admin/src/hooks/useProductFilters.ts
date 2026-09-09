import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProductFilterParams, ProductStatus } from '@/features/products/types';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilterParams = useMemo(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = (searchParams.get('status') as ProductStatus) || '';
    const sortBy =
      (searchParams.get('sortBy') as ProductFilterParams['sortBy']) || 'name';
    const sortOrder =
      (searchParams.get('sortOrder') as ProductFilterParams['sortOrder']) ||
      'asc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    return {
      search,
      category,
      status,
      sortBy,
      sortOrder,
      page: isNaN(page) || page < 1 ? 1 : page,
      pageSize: isNaN(pageSize) || pageSize < 1 ? 10 : pageSize,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<ProductFilterParams>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          Object.entries(newFilters).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });

          // Reset to page 1 if searching or filtering unless page is explicitly specified
          if (
            (newFilters.search !== undefined ||
              newFilters.category !== undefined ||
              newFilters.status !== undefined) &&
            newFilters.page === undefined
          ) {
            next.set('page', '1');
          }

          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(
      {
        page: '1',
        pageSize: '10',
        sortBy: 'name',
        sortOrder: 'asc',
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return {
    filters,
    setFilters,
    resetFilters,
  };
}

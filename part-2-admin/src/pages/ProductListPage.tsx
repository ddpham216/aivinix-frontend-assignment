import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertCircle, RefreshCw } from 'lucide-react';
import type { ProductFilterParams, Product } from '@/features/products/types';
import { useProducts, useDeleteProduct } from '@/features/products/api';
import { ProductTable } from '@/features/products/components/ProductTable';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { InfoModal } from '@/components/InfoModal';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useFavoriteStore } from '@/stores/useFavoriteStore';

const BASE_CATEGORIES = [
  'Accessories',
  'Audio',
  'Computers',
  'Displays',
  'Networking',
  'Office',
  'Office Supplies',
  'Storage',
];

export const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { filters, setFilters } = useProductFilters();
  const { favorites, toggleFavorite } = useFavoriteStore();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Fetch real data from hosted API via TanStack Query
  const { data, isLoading, isError, error, refetch, isFetching } = useProducts(filters);
  const deleteProductMutation = useDeleteProduct();

  const products = data?.data || [];
  const meta = data?.meta || { page: 1, pageSize: 10, total: 0, totalPages: 1 };

  const favoriteIds = useMemo(() => favorites.map((f) => f.id), [favorites]);

  // Accumulate categories from base taxonomy + dynamically discovered categories from API
  const categories = useMemo(() => {
    const fromLoadedData = products.map((p) => p.category?.trim()).filter(Boolean);
    const combined = Array.from(new Set([...BASE_CATEGORIES, ...fromLoadedData]));
    return combined.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const handleFilterChange = React.useCallback(
    (newFilters: Partial<ProductFilterParams>) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const handleToggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const handleToggleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleFavorite = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      toggleFavorite(product);
    }
  };

  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    deleteProductMutation.mutate(productToDelete.id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((id) => id !== productToDelete.id));
        setProductToDelete(null);
      },
      onError: (err: any) => {
        setDeleteErrorMessage(err.message || 'Failed to delete product. Please try again.');
        setProductToDelete(null);
      },
    });
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Section Title & Action Button (Fixed) */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Products
            </h1>
            {isFetching && !isLoading && (
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your catalog, stock availability, and product statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/products/new')}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-blue-200 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>New Product</span>
        </button>
      </div>

      {/* Product Table Card (Takes remaining vertical space) */}
      <div className="flex-1 min-h-0 flex flex-col">
        {isError ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white border border-red-100 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              Failed to load products
            </h3>
            <p className="text-sm text-slate-500 max-w-md mb-4">
              {error instanceof Error ? error.message : 'Unable to connect to the backend API.'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        ) : (
          <ProductTable
            products={products}
            total={meta.total}
            totalPages={meta.totalPages}
            filters={filters}
            categories={categories}
            selectedIds={selectedIds}
            favoriteIds={favoriteIds}
            onFilterChange={handleFilterChange}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleFavorite={handleToggleFavorite}
            onViewProduct={(p) => navigate(`/products/${p.id}`)}
            onEditProduct={(p) => navigate(`/products/${p.id}/edit`)}
            onDeleteProduct={(p) => setProductToDelete(p)}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!productToDelete}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        cancelText="Cancel"
        isLoading={deleteProductMutation.isPending}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />

      {/* Delete Error Modal */}
      <InfoModal
        isOpen={Boolean(deleteErrorMessage)}
        type="info"
        title="Action Failed"
        subtitle="Could not delete product"
        onClose={() => setDeleteErrorMessage(null)}
      >
        <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
          {deleteErrorMessage}
        </p>
      </InfoModal>
    </div>
  );
};

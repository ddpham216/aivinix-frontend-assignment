import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { Product, ProductFilterParams } from '../types';
import { ProductTableRow } from './ProductTableRow';
import { ProductFilters } from './ProductFilters';
import { ProductPagination } from './ProductPagination';

interface ProductTableProps {
  products: Product[];
  total: number;
  totalPages: number;
  filters: ProductFilterParams;
  categories: string[];
  selectedIds: number[];
  favoriteIds: number[];
  onFilterChange: (newFilters: Partial<ProductFilterParams>) => void;
  onToggleSelectAll: () => void;
  onToggleSelectRow: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onViewProduct?: (product: Product) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  total,
  totalPages,
  filters,
  categories,
  selectedIds,
  favoriteIds,
  onFilterChange,
  onToggleSelectAll,
  onToggleSelectRow,
  onToggleFavorite,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const isAllSelected = products.length > 0 && products.every((p) => selectedIds.includes(p.id));

  const handleSort = (field: 'name' | 'price' | 'stock' | 'createdAt') => {
    if (filters.sortBy === field) {
      onFilterChange({
        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onFilterChange({
        sortBy: field,
        sortOrder: 'asc',
      });
    }
  };

  const renderSortIcon = (field: string) => {
    if (filters.sortBy !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 opacity-40 ml-1 inline" />;
    }
    return filters.sortOrder === 'desc' ? (
      <ArrowDown className="w-3.5 h-3.5 text-blue-600 ml-1 inline" />
    ) : (
      <ArrowUp className="w-3.5 h-3.5 text-blue-600 ml-1 inline" />
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white border border-slate-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Table Action Toolbar (Fixed on top of card) */}
      <div className="shrink-0">
        <ProductFilters
          search={filters.search || ''}
          category={filters.category || ''}
          status={filters.status || ''}
          categories={categories}
          onSearchChange={(search) => onFilterChange({ search, page: 1 })}
          onCategoryChange={(category) => onFilterChange({ category, page: 1 })}
          onStatusChange={(status) => onFilterChange({ status, page: 1 })}
        />
      </div>

      {/* Main Table - Scrollable content area with sticky header */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 shadow-xs">
            <tr className="text-[11px] font-bold tracking-wider text-slate-500 uppercase select-none">
              <th className="w-12 px-5 py-3.5 bg-slate-50" scope="col">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th
                className="px-4 py-3.5 bg-slate-50 cursor-pointer hover:text-slate-800"
                scope="col"
                onClick={() => handleSort('name')}
              >
                <span>NAME</span>
                {renderSortIcon('name')}
              </th>
              <th className="px-4 py-3.5 bg-slate-50" scope="col">
                CATEGORY
              </th>
              <th
                className="px-4 py-3.5 bg-slate-50 cursor-pointer hover:text-slate-800"
                scope="col"
                onClick={() => handleSort('price')}
              >
                <span>PRICE</span>
                {renderSortIcon('price')}
              </th>
              <th
                className="px-4 py-3.5 bg-slate-50 cursor-pointer hover:text-slate-800"
                scope="col"
                onClick={() => handleSort('stock')}
              >
                <span>STOCK</span>
                {renderSortIcon('stock')}
              </th>
              <th className="px-4 py-3.5 bg-slate-50" scope="col">
                STATUS
              </th>
              <th className="px-6 py-3.5 bg-slate-50 text-center" scope="col">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  No products found matching your search criteria.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.includes(product.id)}
                  isFavorite={favoriteIds.includes(product.id)}
                  onSelect={onToggleSelectRow}
                  onView={onViewProduct}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                  onToggleFavorite={onToggleFavorite}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar (Fixed on bottom of card) */}
      <div className="shrink-0">
        <ProductPagination
          page={filters.page || 1}
          pageSize={filters.pageSize || 10}
          total={total}
          totalPages={totalPages}
          onPageChange={(newPage) => onFilterChange({ page: newPage })}
        />
      </div>
    </div>
  );
};

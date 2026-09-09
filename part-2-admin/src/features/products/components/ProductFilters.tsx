import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { ProductStatus } from '../types';
import { Select } from '@/components/ui/Select';

interface ProductFiltersProps {
  search: string;
  category: string;
  status: ProductStatus | '';
  categories: string[];
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: ProductStatus | '') => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  category,
  status,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const isUserInputRef = useRef(false);

  const onSearchChangeRef = useRef(onSearchChange);
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  // Sync external search change (e.g. from URL, Header search, or reset) to local state
  useEffect(() => {
    setLocalSearch(search);
    isUserInputRef.current = false;
  }, [search]);

  // Debounce user typing without racing against external/clear updates
  useEffect(() => {
    if (!isUserInputRef.current) return;

    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChangeRef.current(localSearch);
      }
      isUserInputRef.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserInputRef.current = true;
    setLocalSearch(e.target.value);
  };

  const handleClearSearch = () => {
    isUserInputRef.current = false;
    setLocalSearch('');
    onSearchChangeRef.current('');
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Search by Product Name */}
      <div className="relative w-full sm:w-80">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={localSearch}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        />
        {localSearch && (
          <button
            type="button"
            title="Clear search"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Filters: Category & Status Select Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Category Select */}
        <Select
          options={categoryOptions}
          value={category}
          onChange={onCategoryChange}
          placeholder="All Categories"
          className="min-w-[155px]"
        />

        {/* Status Select */}
        <Select
          options={statusOptions}
          value={status}
          onChange={(val) => onStatusChange(val as ProductStatus | '')}
          placeholder="All Statuses"
          className="min-w-[140px]"
        />
      </div>
    </div>
  );
};

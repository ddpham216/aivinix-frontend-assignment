import React from 'react';
import { Monitor, Eye, Pencil, Trash2, Star } from 'lucide-react';
import type { Product } from '../types';
import { Badge } from '@/components/ui/Badge';

interface ProductTableRowProps {
  product: Product;
  isSelected?: boolean;
  isFavorite?: boolean;
  onSelect?: (id: number) => void;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onToggleFavorite?: (id: number) => void;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  isSelected = false,
  isFavorite = false,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      {/* Selection Checkbox */}
      <td className="w-12 px-5 py-3.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect?.(product.id)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>

      {/* Product Name with Thumbnail Icon */}
      <td className="px-4 py-3.5 max-w-[160px] sm:max-w-[260px] md:max-w-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center p-1 text-slate-100 shrink-0">
            <Monitor className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <span
            className="font-medium text-slate-800 tracking-tight truncate block"
            title={product.name}
          >
            {product.name}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5 text-slate-600 text-sm whitespace-nowrap">
        {product.category}
      </td>

      {/* Price */}
      <td className="px-4 py-3.5 font-medium text-slate-800 text-sm whitespace-nowrap">
        ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </td>

      {/* Stock */}
      <td className="px-4 py-3.5 text-slate-600 text-sm whitespace-nowrap">
        {product.stock}
      </td>

      {/* Status */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <Badge status={product.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-3">
        <div className="flex items-center justify-center gap-1.5">
          {/* Favorite Toggle */}
          <button
            type="button"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => onToggleFavorite?.(product.id)}
            className={`p-1.5 rounded-lg transition-all duration-150 cursor-pointer active:scale-90 ${
              isFavorite
                ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
                : 'text-slate-300 hover:text-amber-500 hover:bg-amber-50/70'
            }`}
          >
            <Star
              className="w-4 h-4"
              fill={isFavorite ? 'currentColor' : 'none'}
              strokeWidth={1.8}
            />
          </button>

          {/* View Button */}
          <button
            type="button"
            title="View Details"
            onClick={() => onView?.(product)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 cursor-pointer active:scale-90"
          >
            <Eye className="w-4 h-4" strokeWidth={1.8} />
          </button>

          {/* Edit Button */}
          <button
            type="button"
            title="Edit Product"
            onClick={() => onEdit?.(product)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 cursor-pointer active:scale-90"
          >
            <Pencil className="w-4 h-4" strokeWidth={1.8} />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            title="Delete Product"
            onClick={() => onDelete?.(product)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 cursor-pointer active:scale-90"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </td>
    </tr>
  );
};

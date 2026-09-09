import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  Tag,
  Loader2,
  AlertCircle,
  Star,
  Clock,
} from 'lucide-react';
import { useProduct, useDeleteProduct } from '@/features/products/api';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { InfoModal } from '@/components/InfoModal';
import { useFavoriteStore } from '@/stores/useFavoriteStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const deleteProductMutation = useDeleteProduct();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isFavorite, toggleFavorite, addRecentlyViewed, recentlyViewed } =
    useFavoriteStore();

  // Track product into recently viewed on load
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);

  const handleDelete = () => {
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        navigate('/products');
      },
      onError: (err: any) => {
        setDeleteErrorMessage(err.message || 'Failed to delete product. Please try again.');
        setShowDeleteModal(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-sm text-slate-500 font-medium">
          Loading product details...
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mb-4">
          {error instanceof Error ? error.message : 'Could not retrieve product information.'}
        </p>
        <Link
          to="/products"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(product.id);
  const otherRecentlyViewed = recentlyViewed
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <Badge status={product.status} />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Product ID: #{product.id} • Created at:{' '}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => toggleFavorite(product)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border cursor-pointer ${
              isFav
                ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Star
              className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`}
            />
            <span>{isFav ? 'Favorited' : 'Bookmark'}</span>
          </button>

          <Link
            to={`/products/${product.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors shadow-xs"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Product Content Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        {/* Main Details (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Overview & Specifications
            </h2>
            <div className="prose prose-sm text-slate-600 leading-relaxed">
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p className="text-slate-400 italic">No description provided for this product.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info (Right 1 col) */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Inventory & Pricing
            </h3>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span>Price</span>
              </span>
              <span className="font-bold text-slate-900 text-base">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                <span>In Stock</span>
              </span>
              <span className="font-semibold text-slate-800">
                {product.stock} units
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span>Category</span>
              </span>
              <span className="font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg text-xs">
                {product.category}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Created</span>
              </span>
              <span className="text-slate-600 text-xs font-medium">
                {new Date(product.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed Products Section */}
      {otherRecentlyViewed.length > 0 && (
        <div className="mt-4 pt-6 border-t border-slate-200/80 pb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900">
                Recently Viewed Products
              </h3>
            </div>
            <Link
              to="/favorites"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              View all history →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherRecentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group p-4 bg-white hover:bg-slate-50/80 border border-slate-200/80 rounded-xl shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <Badge status={item.status} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-slate-400">Stock: {item.stock}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        cancelText="Cancel"
        isLoading={deleteProductMutation.isPending}
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
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

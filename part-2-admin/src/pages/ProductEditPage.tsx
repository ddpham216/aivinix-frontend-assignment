import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useProduct, useUpdateProduct } from '@/features/products/api';
import { ProductForm } from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schemas/productSchema';

export const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (formData: ProductFormData) => {
    setServerError(null);
    updateProductMutation.mutate(
      {
        id: productId,
        payload: {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          stock: formData.stock,
          status: formData.status,
          description: formData.description || '',
        },
      },
      {
        onSuccess: () => {
          navigate('/products');
        },
        onError: (err: any) => {
          setServerError(
            err.message || 'Failed to update product. Please check your data and try again.'
          );
        },
      }
    );
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

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page Header with Top Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Product: <span className="text-blue-600">#{product.id}</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update product information, inventory stock, and availability status.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            disabled={updateProductMutation.isPending}
            onClick={() => navigate('/products')}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-product-form"
            disabled={updateProductMutation.isPending}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {updateProductMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Form Container (Full Height) */}
      <div className="flex-1 min-h-0 flex flex-col">
        <ProductForm
          id="edit-product-form"
          mode="edit"
          hideBottomActions={true}
          initialValues={{
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            status: product.status,
            description: product.description || '',
          }}
          isSubmitting={updateProductMutation.isPending}
          serverError={serverError}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/products')}
        />
      </div>
    </div>
  );
};

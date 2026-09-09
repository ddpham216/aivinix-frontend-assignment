import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCreateProduct } from '@/features/products/api';
import { ProductForm } from '@/features/products/components/ProductForm';
import type { ProductFormData } from '@/features/products/schemas/productSchema';

export const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (data: ProductFormData) => {
    setServerError(null);
    createProductMutation.mutate(
      {
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        status: data.status,
        description: data.description || '',
      },
      {
        onSuccess: () => {
          navigate('/products');
        },
        onError: (err: any) => {
          setServerError(
            err.message || 'Failed to create product. Please check your data and try again.'
          );
        },
      }
    );
  };

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
            Create New Product
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            disabled={createProductMutation.isPending}
            onClick={() => navigate('/products')}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-product-form"
            disabled={createProductMutation.isPending}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {createProductMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            <span>Create Product</span>
          </button>
        </div>
      </div>

      {/* Form Container (Full Height) */}
      <div className="flex-1 min-h-0 flex flex-col">
        <ProductForm
          id="create-product-form"
          mode="create"
          hideBottomActions={true}
          isSubmitting={createProductMutation.isPending}
          serverError={serverError}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/products')}
        />
      </div>
    </div>
  );
};

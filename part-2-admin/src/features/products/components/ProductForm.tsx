import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { productSchema, type ProductFormData } from '../schemas/productSchema';
import { Select } from '@/components/ui/Select';

const CATEGORY_OPTIONS = [
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Audio', label: 'Audio' },
  { value: 'Computers', label: 'Computers' },
  { value: 'Displays', label: 'Displays' },
  { value: 'Networking', label: 'Networking' },
  { value: 'Office', label: 'Office' },
  { value: 'Office Supplies', label: 'Office Supplies' },
  { value: 'Storage', label: 'Storage' },
];

interface ProductFormProps {
  mode: 'create' | 'edit';
  id?: string;
  initialValues?: Partial<ProductFormData>;
  isSubmitting?: boolean;
  serverError?: string | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  hideBottomActions?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  id = 'product-form',
  initialValues,
  isSubmitting = false,
  serverError = null,
  onSubmit,
  onCancel,
  hideBottomActions = false,
}) => {
  const [formData, setFormData] = useState<Partial<ProductFormData>>({
    name: '',
    category: '',
    price: undefined,
    stock: undefined,
    status: 'active',
    description: '',
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [initialValues]);

  const handleChange = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // If user has already attempted to submit, validate reactively so errors disappear as soon as corrected
    if (hasSubmitted) {
      const result = productSchema.safeParse(updatedData);
      if (result.success) {
        setErrors({});
      } else {
        const issue = result.error.issues.find((i) => i.path[0] === field);
        setErrors((prev) => {
          const next = { ...prev };
          if (!issue) {
            delete next[field];
          } else {
            next[field] = issue.message;
          }
          return next;
        });
      }
    }
  };

  const handleBlur = (_field: keyof ProductFormData) => {
    // Intentionally no error validation on blur per UX requirements
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  const descriptionLength = formData.description?.length || 0;

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="flex-1 min-h-0 flex flex-col w-full"
      autoComplete="off"
      noValidate
    >
      {/* Server Error Alert */}
      {serverError && (
        <div className="flex items-start gap-3 p-4 mb-4 bg-red-50/80 border border-red-200 rounded-xl text-red-700 text-sm shrink-0">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <span className="font-semibold">Operation Failed: </span>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {/* Main Form Fields Card (Full Height Flex Container) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex-1 min-h-0 flex flex-col justify-between space-y-4">
        {/* Product Name & Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start shrink-0">
          {/* Product Name */}
          <div className="md:col-span-8 lg:col-span-9">
            <label
              htmlFor="product-name"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="product-name"
                name="name"
                type="text"
                autoComplete="off"
                disabled={isSubmitting}
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Wireless Ergonomic Keyboard"
                className={`w-full bg-slate-50/80 border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition-all ${errors.name
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
              />
            </div>
            <div className="min-h-[20px] mt-1.5">
              {errors.name && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Status Segmented Control (Compact) */}
          <div className="md:col-span-4 lg:col-span-3">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="inline-flex w-full p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl h-[42px] items-center">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleChange('status', 'active')}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${formData.status === 'active'
                    ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200/60'
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Active</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleChange('status', 'inactive')}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${formData.status === 'inactive'
                    ? 'bg-white text-slate-700 shadow-xs border border-slate-300/80'
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                <span>Inactive</span>
              </button>
            </div>
            <div className="min-h-[20px] mt-1.5" aria-hidden="true" />
          </div>
        </div>

        {/* Category, Price, Stock Row (3 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0">
          {/* Category with Select */}
          <div>
            <label
              htmlFor="product-category"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              id="product-category"
              options={CATEGORY_OPTIONS}
              value={formData.category || ''}
              onChange={(val) => handleChange('category', val)}
              onBlur={() => handleBlur('category')}
              placeholder="Select category..."
              disabled={isSubmitting}
              hasError={Boolean(errors.category)}
              className="w-full"
              triggerClassName="px-4 py-2.5 rounded-xl text-sm"
            />
            <div className="min-h-[20px] mt-1.5">
              {errors.category && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="product-price"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Price ($ USD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-semibold text-sm">
                $
              </span>
              <input
                id="product-price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                autoComplete="off"
                disabled={isSubmitting}
                value={formData.price !== undefined ? formData.price : ''}
                onChange={(e) => handleChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
                placeholder="0.00"
                className={`w-full bg-slate-50/80 border rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition-all ${errors.price
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
              />
            </div>
            <div className="min-h-[20px] mt-1.5">
              {errors.price && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.price}</span>
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="product-stock"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Package className="w-4 h-4" />
              </span>
              <input
                id="product-stock"
                name="stock"
                type="number"
                step="1"
                min="0"
                autoComplete="off"
                disabled={isSubmitting}
                value={formData.stock !== undefined ? formData.stock : ''}
                onChange={(e) => handleChange('stock', e.target.value)}
                onBlur={() => handleBlur('stock')}
                placeholder="0"
                className={`w-full bg-slate-50/80 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition-all ${errors.stock
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                    : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
              />
            </div>
            <div className="min-h-[20px] mt-1.5">
              {errors.stock && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.stock}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description (Expands to Fill Remaining Height) */}
        <div className="flex-1 flex flex-col min-h-[140px]">
          <div className="flex items-center justify-between mb-1.5 shrink-0">
            <label
              htmlFor="product-description"
              className="block text-sm font-semibold text-slate-800"
            >
              Description <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <span
              className={`text-xs ${descriptionLength > 500 ? 'text-red-500 font-bold' : 'text-slate-400'
                }`}
            >
              {descriptionLength}/500
            </span>
          </div>
          <textarea
            id="product-description"
            disabled={isSubmitting}
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            placeholder="Detailed specifications, features, or notes about this product..."
            className={`w-full flex-1 min-h-[100px] bg-slate-50/80 border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition-all resize-none ${errors.description
                ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
          />
          <div className="min-h-[20px] mt-1.5 shrink-0">
            {errors.description && (
              <p className="text-xs text-red-500 font-medium flex items-center gap-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Optional Bottom Action Buttons */}
      {!hideBottomActions && (
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{mode === 'create' ? 'Create Product' : 'Save Changes'}</span>
          </button>
        </div>
      )}
    </form>
  );
};

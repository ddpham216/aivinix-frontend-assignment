import React, { useEffect } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: 'bg-red-50 text-red-500 border border-red-100',
      btn: 'bg-red-600 hover:bg-red-700 text-white shadow-xs focus:ring-red-500',
    },
    warning: {
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs focus:ring-amber-500',
    },
    primary: {
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs focus:ring-blue-500',
    },
  }[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
        onClick={!isLoading ? onCancel : undefined}
      />

      {/* Dialog Modal Card - Compact & Refined */}
      <div
        className="relative bg-white rounded-xl shadow-xl border border-slate-200/80 w-full max-w-[390px] p-5 overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-3.5">
          {/* Sleek Compact Icon Badge */}
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${variantStyles.iconBg}`}
          >
            <AlertTriangle className="w-4 h-4" strokeWidth={2} />
          </div>

          {/* Dialog Text */}
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${variantStyles.btn}`}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

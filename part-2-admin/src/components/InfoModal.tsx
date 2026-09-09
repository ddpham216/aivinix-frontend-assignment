import React, { useEffect } from 'react';
import { X, CheckCircle2, Info, Bell, Settings, User } from 'lucide-react';

export type InfoModalType = 'info' | 'success' | 'notifications' | 'settings' | 'profile';

interface InfoModalProps {
  isOpen: boolean;
  type?: InfoModalType;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  type = 'info',
  title,
  subtitle,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'notifications':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'settings':
        return <Settings className="w-5 h-5 text-slate-700" />;
      case 'profile':
        return <User className="w-5 h-5 text-indigo-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'notifications':
        return 'bg-blue-50 border-blue-100';
      case 'settings':
        return 'bg-slate-100 border-slate-200';
      case 'profile':
        return 'bg-indigo-50 border-indigo-100';
      case 'success':
        return 'bg-emerald-50 border-emerald-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[420px] p-6 overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${getIconBg()}`}
            >
              {getIcon()}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-4 text-sm text-slate-600 overflow-y-auto min-h-0">
          {children}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

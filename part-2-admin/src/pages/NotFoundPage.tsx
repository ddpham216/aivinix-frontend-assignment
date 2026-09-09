import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 ring-8 ring-blue-50/50">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>
    </div>
  );
};

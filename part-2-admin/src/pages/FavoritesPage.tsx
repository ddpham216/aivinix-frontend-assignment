import React, { useState } from 'react';
import {
  Star,
  Clock,
  Trash2,
  ExternalLink,
  Package,
  DollarSign,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { Badge } from '@/components/ui/Badge';

export const FavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'recently-viewed'>(
    'favorites'
  );

  const {
    favorites,
    recentlyViewed,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearRecentlyViewed,
  } = useFavoriteStore();

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-600" />
            <span>Saved & Activity</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your bookmarked favorite products and browse recent inspection history.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                activeTab === 'favorites'
                  ? 'text-amber-500 fill-amber-500'
                  : 'text-slate-400'
              }`}
            />
            <span>Favorites</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'favorites'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {favorites.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recently-viewed')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'recently-viewed'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock
              className={`w-3.5 h-3.5 ${
                activeTab === 'recently-viewed'
                  ? 'text-blue-600'
                  : 'text-slate-400'
              }`}
            />
            <span>Recently Viewed</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'recently-viewed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {recentlyViewed.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Favorites Content */}
      {activeTab === 'favorites' && (
        <div className="flex-1 pb-10">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4 ring-8 ring-amber-50/60">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No favorites bookmarked yet
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
                Click the star icon next to any product in your inventory or detail view to quickly bookmark it here.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-colors"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top: Category & Star */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Badge status={product.status} />
                        <button
                          type="button"
                          onClick={() => removeFavorite(product.id)}
                          title="Remove from favorites"
                          className="p-1.5 text-amber-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Star className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {product.description || 'No description available for this product.'}
                    </p>
                  </div>

                  {/* Card Bottom Info & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-sm flex items-center">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400 -mr-0.5" />
                        {product.price.toFixed(2)}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        <span>{product.stock} in stock</span>
                      </span>
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Recently Viewed Content */}
      {activeTab === 'recently-viewed' && (
        <div className="flex-1 pb-10">
          {recentlyViewed.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 ring-8 ring-blue-50/60">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No recent activity recorded
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
                When you inspect product details, they will automatically be recorded here for instant navigation.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-colors"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-500">
                  Showing {recentlyViewed.length} recently viewed items (persisted locally).
                </p>
                <button
                  type="button"
                  onClick={clearRecentlyViewed}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyViewed.map((product) => {
                  const isFav = isFavorite(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Top: Category & Favorite */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Badge status={product.status} />
                            <button
                              type="button"
                              onClick={() => toggleFavorite(product)}
                              title={isFav ? 'Remove favorite' : 'Add favorite'}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isFav
                                  ? 'text-amber-500 hover:bg-amber-50'
                                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                              }`}
                            >
                              <Star
                                className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : ''}`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                          {product.description || 'No description provided.'}
                        </p>
                      </div>

                      {/* Card Bottom Info & Action */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 text-sm flex items-center">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400 -mr-0.5" />
                            {product.price.toFixed(2)}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Package className="w-3.5 h-3.5 text-slate-400" />
                            <span>{product.stock} in stock</span>
                          </span>
                        </div>

                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Settings,
  Bell,
  Star,
  Menu,
  CheckCircle,
  Database,
  Shield,
  Clock,
  Sparkles,
  Server,
} from 'lucide-react';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { InfoModal } from '@/components/InfoModal';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  React.useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  const [activeModal, setActiveModal] = useState<
    'notifications' | 'settings' | 'profile' | null
  >(null);

  const { favorites } = useFavoriteStore();
  const { toggleMobile, toggleCollapse } = useSidebarStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <>
      <header
        className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between flex-shrink-0 z-10"
        data-purpose="top-navigation"
      >
        {/* Left: Mobile & Desktop Menu Toggle & Global Product Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMobile}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="hidden md:flex p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Toggle Sidebar (Expand/Collapse)"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Header Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-3 sm:px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right-side Utilities: Favorites badge, Settings, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-4">
          {/* Favorites Quick Link */}
          <Link
            to="/favorites"
            title="View Favorites"
            className="relative text-slate-400 hover:text-amber-500 p-2 rounded-xl hover:bg-amber-50/70 transition-all duration-150 flex items-center justify-center cursor-pointer active:scale-95"
          >
            <Star className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center h-4 min-w-[16px] px-1 bg-amber-500 text-white text-[10px] font-bold rounded-full leading-none ring-2 ring-white shadow-xs pointer-events-none">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Notifications Icon Button */}
          <button
            type="button"
            title="Notifications"
            onClick={() => setActiveModal('notifications')}
            className="relative text-slate-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50/70 transition-all duration-150 cursor-pointer active:scale-95 hidden sm:flex items-center justify-center"
          >
            <Bell className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          {/* Settings Icon Button */}
          <button
            type="button"
            title="System Settings"
            onClick={() => setActiveModal('settings')}
            className="text-slate-400 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-all duration-150 cursor-pointer active:scale-95 hidden sm:flex items-center justify-center"
          >
            <Settings className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs border border-slate-300 shadow-xs cursor-pointer select-none hover:ring-2 hover:ring-blue-400/50 hover:bg-slate-300 transition-all active:scale-95 ml-1"
            title="Admin Account (Logged in)"
            onClick={() => setActiveModal('profile')}
          >
            A
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      <InfoModal
        isOpen={activeModal === 'notifications'}
        type="notifications"
        title="Activity Notifications"
        subtitle="Recent system updates and alerts"
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-3">
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-800">
                API Connection Healthy
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Backend REST API responded with HTTP 200 OK.
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">
                2 minutes ago
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3">
            <Database className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-800">
                Catalog Synchronized
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Product inventory cache successfully updated.
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block">
                10 minutes ago
              </span>
            </div>
          </div>
        </div>
      </InfoModal>

      {/* System Settings Modal */}
      <InfoModal
        isOpen={activeModal === 'settings'}
        type="settings"
        title="System Settings"
        subtitle="Configuration and environment status"
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-700">Application Version</span>
            </div>
            <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">Environment</span>
            </div>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Production Ready
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-700">Design Theme</span>
            </div>
            <span className="text-slate-600 font-medium">Alexandria Editorial</span>
          </div>
        </div>
      </InfoModal>

      {/* Profile Modal */}
      <InfoModal
        isOpen={activeModal === 'profile'}
        type="profile"
        title="Administrator Profile"
        subtitle="Current active session details"
        onClose={() => setActiveModal(null)}
      >
        <div className="flex flex-col items-center text-center p-3">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl mb-3 shadow-xs">
            A
          </div>
          <h4 className="text-base font-bold text-slate-900">Administrator</h4>
          <p className="text-xs text-slate-500 mt-0.5">admin@apex.io</p>
          <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-semibold">
            <Shield className="w-3 h-3 text-blue-600" />
            Super Admin
          </span>

          <div className="mt-4 w-full pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Session active since login</span>
          </div>
        </div>
      </InfoModal>
    </>
  );
};

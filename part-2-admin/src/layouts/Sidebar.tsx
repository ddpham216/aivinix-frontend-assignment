import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  Star,
  Settings,
  X,
} from 'lucide-react';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { InfoModal } from '@/components/InfoModal';

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapse, isMobileOpen, closeMobile } =
    useSidebarStore();
  const { favorites } = useFavoriteStore();
  const [showSystemInfo, setShowSystemInfo] = useState(false);

  const navItems = [
    { label: 'Products', href: '/products', icon: Package },
    {
      label: 'Favorites',
      href: '/favorites',
      icon: Star,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  const renderContent = (isMobile: boolean = false) => {
    const collapsed = !isMobile && isCollapsed;

    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Brand / Logo & Collapse Action */}
          <div
            className={`h-16 flex items-center border-b border-slate-100 transition-all ${
              collapsed ? 'justify-center px-2' : 'justify-between px-5'
            }`}
          >
            {collapsed ? (
              <button
                type="button"
                onClick={toggleCollapse}
                title="Expand Sidebar"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-200 transition-transform active:scale-95 cursor-pointer"
              >
                A
              </button>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-200 shrink-0">
                    A
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-800 truncate">
                    Apex
                  </span>
                </div>

                {/* Close button on mobile only */}
                {isMobile && (
                  <button
                    type="button"
                    onClick={closeMobile}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Navigation Links */}
          <nav className={`p-3 space-y-1 ${collapsed ? 'px-2' : ''}`}>
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  title={collapsed ? item.label : undefined}
                  onClick={() => {
                    if (isMobile) closeMobile();
                  }}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl text-sm font-medium transition-all group relative ${
                      collapsed
                        ? 'justify-center p-2.5'
                        : 'justify-between px-3.5 py-2.5'
                    } ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex items-center ${
                          collapsed ? 'justify-center' : 'gap-3'
                        }`}
                      >
                        <div className="relative shrink-0">
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? 'text-blue-600' : 'text-slate-400'
                            } group-hover:text-blue-600 transition-colors`}
                            strokeWidth={isActive ? 2 : 1.8}
                          />
                          {collapsed && item.badge !== undefined && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
                          )}
                        </div>

                        {!collapsed && <span>{item.label}</span>}
                      </div>

                      {!collapsed && item.badge !== undefined && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            isActive
                              ? 'bg-blue-200/70 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Settings / Info Link */}
        <div className={`p-3 border-t border-slate-100 ${collapsed ? 'px-2' : ''}`}>
          <button
            type="button"
            title={collapsed ? 'Apex Product Admin v1.0.0' : undefined}
            onClick={() => setShowSystemInfo(true)}
            className={`w-full flex items-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer ${
              collapsed
                ? 'justify-center p-2.5'
                : 'gap-3 px-3.5 py-2.5'
            }`}
          >
            <Settings className="w-5 h-5 text-slate-400 shrink-0" strokeWidth={1.8} />
            {!collapsed && <span className="truncate">System Info</span>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Persistent Collapsible Sidebar */}
      <aside
        className={`hidden md:flex bg-white border-r border-slate-200 flex-col flex-shrink-0 select-none h-screen z-20 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        data-purpose="sidebar-navigation"
      >
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white z-50 md:hidden flex flex-col transition-all duration-300 ease-in-out select-none ${
          isMobileOpen
            ? 'translate-x-0 shadow-2xl opacity-100 visible'
            : '-translate-x-full shadow-none opacity-0 invisible pointer-events-none'
        }`}
      >
        {renderContent(true)}
      </aside>

      {/* System Info Dialog */}
      <InfoModal
        isOpen={showSystemInfo}
        type="settings"
        title="Apex Product Admin"
        subtitle="Application runtime specifications"
        onClose={() => setShowSystemInfo(false)}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="font-semibold text-slate-700">App Version</span>
            <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              v1.0.0
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="font-semibold text-slate-700">Core Framework</span>
            <span className="text-slate-600 font-medium">React 19 + TypeScript</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="font-semibold text-slate-700">Styling System</span>
            <span className="text-slate-600 font-medium">Tailwind CSS v4</span>
          </div>
        </div>
      </InfoModal>
    </>
  );
};

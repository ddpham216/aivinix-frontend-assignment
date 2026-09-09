import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen h-[100dvh] w-screen bg-[#f4f6fa] text-slate-700 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area: Header + Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        {/* Fixed Viewport Content (No Page Scroll) */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

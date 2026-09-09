import React from 'react';

interface BadgeProps {
  status: 'active' | 'inactive';
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const isActive = status === 'active';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-700'
          : 'bg-slate-200 text-slate-700'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

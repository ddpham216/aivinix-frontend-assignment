import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  triggerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  disabled = false,
  hasError = false,
  className = '',
  triggerClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          onBlur?.();
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onBlur?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onBlur]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    onBlur?.();
  };

  const getTriggerClass = () => {
    if (disabled) {
      return 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75';
    }
    if (hasError) {
      return isOpen
        ? 'bg-white border-red-500 ring-2 ring-red-400/20 text-slate-800'
        : 'bg-slate-50/80 border-red-400 text-slate-800 hover:border-red-500';
    }
    if (isOpen) {
      return 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-slate-900 shadow-xs';
    }
    return 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300';
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2 text-sm font-medium rounded-xl border transition-all duration-150 cursor-pointer select-none ${getTriggerClass()} ${triggerClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate ${!selectedOption ? 'text-slate-400 font-normal' : 'text-slate-800 font-medium'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 mt-1.5 w-full max-h-60 overflow-y-auto bg-white border border-slate-200/90 rounded-xl shadow-xl shadow-slate-900/10 py-1.5 z-50 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-150">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left transition-colors cursor-pointer rounded-lg mx-1 my-0.5 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-normal'
                }`}
                style={{ width: 'calc(100% - 8px)' }}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

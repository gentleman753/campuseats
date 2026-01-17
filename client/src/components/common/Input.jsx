import React from 'react';
import { cn } from '../../utils/cn';

const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  name,
  className,
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 mb-1.5 ml-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name || id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={cn(
            'block w-full px-4 py-3 rounded-xl border-slate-200 bg-white text-slate-900 placeholder-slate-400',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            'transition-all duration-200 ease-in-out',
            'shadow-sm hover:border-slate-300',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
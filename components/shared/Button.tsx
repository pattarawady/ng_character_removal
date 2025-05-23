
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  icon,
  className = "",
  type = 'button'
}) => {
  const baseClasses = "px-5 py-2.5 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition duration-150 ease-in-out flex items-center justify-center space-x-2 text-sm";
  
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500";
      break;
    case 'secondary':
      variantClasses = "bg-slate-600 text-slate-100 hover:bg-slate-500 focus:ring-slate-400";
      break;
    case 'danger':
      variantClasses = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
  }

  const disabledClasses = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      <span>{label}</span>
    </button>
  );
};

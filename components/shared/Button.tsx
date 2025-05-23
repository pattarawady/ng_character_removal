
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
  const baseClasses = "px-5 py-2.5 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg-light transition duration-150 ease-in-out flex items-center justify-center space-x-2 text-sm";
  
  let variantClasses = '';
  let spinnerColorClass = 'text-brand-text-on-accent';

  switch (variant) {
    case 'primary':
      variantClasses = "bg-brand-red text-brand-text-on-accent hover:bg-brand-red-darker focus:ring-brand-red";
      spinnerColorClass = 'text-brand-text-on-accent';
      break;
    case 'secondary':
      variantClasses = "bg-brand-bg-input-light text-brand-text-dark hover:bg-gray-200 border border-brand-border-light-theme focus:ring-brand-text-medium-dark"; // Using Tailwind gray-200 for hover example
      spinnerColorClass = 'text-brand-text-dark';
      break;
    case 'danger': 
      variantClasses = "bg-red-600 text-brand-text-on-accent hover:bg-red-700 focus:ring-red-500";
      spinnerColorClass = 'text-brand-text-on-accent';
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
        <svg className={`animate-spin h-5 w-5 ${spinnerColorClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      <span>{label}</span>
    </button>
  );
};
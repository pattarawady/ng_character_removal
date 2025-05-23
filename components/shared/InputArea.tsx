
import React from 'react';

interface InputAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: string | null;
  labelClassName?: string;
  inputClassName?: string;
}

export const InputArea: React.FC<InputAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  rows = 3,
  disabled = false,
  error,
  labelClassName = "block text-sm font-medium text-brand-text-medium-dark mb-1", 
  inputClassName = ""
}) => {
  const baseInputClasses = "w-full p-3 bg-brand-bg-input-light text-brand-text-dark border border-brand-border-light-theme rounded-lg shadow-sm focus:ring-2 focus:ring-brand-red focus:border-brand-red transition duration-150 ease-in-out placeholder-brand-text-medium-dark focus:ring-offset-1 focus:ring-offset-brand-bg-light";
  const errorClasses = error ? "border-error-border ring-1 ring-error-border" : "border-brand-border-light-theme";

  return (
    <div className="mb-5">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`${baseInputClasses} ${errorClasses} ${inputClassName} min-h-[100px]`}
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseInputClasses} ${errorClasses} ${inputClassName}`}
        />
      )}
      {error && <p className="mt-1 text-xs text-error-text">{error}</p>}
    </div>
  );
};
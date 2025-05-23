
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
  labelClassName = "block text-sm font-medium text-slate-300 mb-1",
  inputClassName = ""
}) => {
  const baseInputClasses = "w-full p-3 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out placeholder-slate-500";
  const errorClasses = error ? "border-red-500 ring-red-500" : "border-slate-600";

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
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

import React, { useState } from 'react';
import { ClipboardIcon } from '../icons/ClipboardIcon';
import { CheckIcon } from '../icons/CheckIcon';

interface OutputDisplayProps {
  id?: string;
  label: string;
  text: string;
  placeholder?: string;
  labelContainerClassName?: string;
  labelClassName?: string;
  charCountClassName?: string;
  outputClassName?: string;
  isHtml?: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  id,
  label,
  text,
  placeholder,
  labelContainerClassName = "flex justify-between items-baseline mb-1",
  labelClassName = "text-sm font-medium text-slate-300",
  charCountClassName = "text-xs text-slate-400 tabular-nums",
  outputClassName = "",
  isHtml = false,
}) => {
  const actualId = id || `output-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  let charCount = 0;
  let textContentToCopy = '';

  if (text) {
    if (isHtml) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      const content = tempDiv.textContent || '';
      charCount = content.length;
      textContentToCopy = content;
    } else {
      charCount = text.length;
      textContentToCopy = text;
    }
  }

  const handleCopy = async () => {
    if (!textContentToCopy) return;

    try {
      await navigator.clipboard.writeText(textContentToCopy);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, handle copy failure (e.g., setCopyState('failed'))
    }
  };

  return (
    <div className="mb-5">
      <div className={labelContainerClassName}>
        <h3 id={`${actualId}-label`} className={labelClassName}>
          {label}
        </h3>
        <div className="flex items-center space-x-2">
          {charCount > 0 && (
            <span className={charCountClassName}>
              {charCount} 文字
            </span>
          )}
          {textContentToCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded transition-colors duration-150"
              aria-label={copyState === 'copied' ? "コピーしました" : "クリップボードにコピー"}
              title={copyState === 'copied' ? "コピーしました！" : "クリップボードにコピー"}
            >
              {copyState === 'copied' ? (
                <CheckIcon className="w-4 h-4 text-green-400" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
      {isHtml ? (
        <div
          id={actualId}
          aria-labelledby={`${actualId}-label`}
          className={`w-full p-3 bg-slate-850 border border-slate-700 rounded-lg shadow-inner min-h-[100px] whitespace-pre-wrap break-words text-slate-200 ${outputClassName}`}
          aria-live="polite"
          role="region"
          dangerouslySetInnerHTML={{ __html: text || `<span class="text-slate-500">${placeholder || "結果がここに表示されます。"}</span>` }}
        />
      ) : (
        <div
          id={actualId}
          aria-labelledby={`${actualId}-label`}
          className={`w-full p-3 bg-slate-850 border border-slate-700 rounded-lg shadow-inner min-h-[100px] whitespace-pre-wrap break-words text-slate-200 ${outputClassName}`}
          aria-live="polite"
          role="region"
        >
          {text ? text : <span className="text-slate-500">{placeholder || "結果がここに表示されます。"}</span>}
        </div>
      )}
    </div>
  );
};
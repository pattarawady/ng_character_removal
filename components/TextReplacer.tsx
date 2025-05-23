
import React, { useState, useCallback, useMemo } from 'react';
import { InputArea } from './shared/InputArea';
import { Button } from './shared/Button';
import { OutputDisplay } from './shared/OutputDisplay';
import { XCircleIcon } from './icons/XCircleIcon';

const ReplaceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const TextReplacer: React.FC = () => {
  const [planName, setPlanName] = useState<string>('');
  const [planPRText, setPlanPRText] = useState<string>('');
  const [wordToReplace, setWordToReplace] = useState<string>('');
  const [replacementWord, setReplacementWord] = useState<string>('');

  const [processedPlanName, setProcessedPlanName] = useState<string>('');
  const [processedPlanPRText, setProcessedPlanPRText] = useState<string>('');

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [wordToReplaceError, setWordToReplaceError] = useState<string | null>(null);

  const handleReplaceText = useCallback(() => {
    setGeneralError(null);
    setWordToReplaceError(null); 
    setProcessedPlanName('');
    setProcessedPlanPRText('');

    let hasError = false;
    if (!planName.trim() && !planPRText.trim()) {
      setGeneralError("処理対象のテキスト（プラン名またはプランPR文）を入力してください。");
      hasError = true;
    }
    if (!wordToReplace.trim()) {
      setWordToReplaceError("「置換対象ワード」を入力してください。");
      hasError = true;
    }

    if (hasError) return;

    const regex = new RegExp(escapeRegExp(wordToReplace), 'g');

    setProcessedPlanName(
      planName.trim() ? planName.replace(regex, replacementWord) : ''
    );
    setProcessedPlanPRText(
      planPRText.trim() ? planPRText.replace(regex, replacementWord) : ''
    );
  }, [planName, planPRText, wordToReplace, replacementWord]);

  const handleClearAll = useCallback(() => {
    setPlanName('');
    setPlanPRText('');
    setWordToReplace('');
    setReplacementWord('');
    setProcessedPlanName('');
    setProcessedPlanPRText('');
    setGeneralError(null);
    setWordToReplaceError(null);
  }, []);

  const canProcess = useMemo(() => {
    return planName.trim() !== '' || planPRText.trim() !== '';
  }, [planName, planPRText]);

  return (
    <div className="w-full p-4 md:p-6 my-0 bg-brand-bg-content-light shadow-xl rounded-b-xl rounded-tr-xl ring-1 ring-brand-border-light-theme">
      <header className="text-left mb-6 pt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-brand-text-dark">
          特定文字リプレイサー
        </h2>
        <p className="text-sm text-brand-text-medium-dark mt-1">
          プラン名およびプランPR文内の特定の文字列を、指定した文字列に一括で置換します。
        </p>
      </header>

      {generalError && (
        <div className="mb-4 p-3 bg-error-bg text-error-text border border-error-border rounded-md text-sm" role="alert">
          {generalError}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
        <div className="space-y-5">
          <InputArea
            id="replacer-planName"
            label="プラン名"
            value={planName}
            onChange={setPlanName}
            placeholder="例: 素晴らしいリゾート体験プラン"
          />
          <InputArea
            id="replacer-planPRText"
            label="プランPR文"
            value={planPRText}
            onChange={setPlanPRText}
            placeholder="例: このプランで最高の休日をお楽しみください。"
            isTextArea={true}
            rows={5}
          />
        </div>

        <div className="space-y-5">
          <InputArea
            id="replacer-wordToReplace"
            label="置換対象ワード"
            value={wordToReplace}
            onChange={(value) => {
              setWordToReplace(value);
              if (value.trim() || !wordToReplaceError?.includes("「置換対象ワード」を入力してください。")) { 
                setWordToReplaceError(null);
              }
            }}
            placeholder="例: 休日"
            error={wordToReplaceError} 
          />
          <InputArea
            id="replacer-replacementWord"
            label="置換後ワード"
            value={replacementWord}
            onChange={setReplacementWord}
            placeholder="例: バカンス (空欄の場合、対象ワードは削除)"
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6">
        <Button
          onClick={handleReplaceText}
          label="置換実行"
          variant="primary"
          icon={<ReplaceIcon />}
          disabled={!canProcess || !!wordToReplaceError}
          className="flex-1"
        />
        <Button
          onClick={handleClearAll}
          label="すべてクリア"
          variant="secondary"
          icon={<XCircleIcon />}
          className="flex-1"
        />
      </div>

      <div className="space-y-5">
          <OutputDisplay
            id="replacer-processed-plan-name"
            label="変換後のプラン名"
            text={processedPlanName}
            placeholder="置換後のプラン名がここに表示されます。"
          />
          <OutputDisplay
            id="replacer-processed-plan-pr"
            label="変換後のプランPR文"
            text={processedPlanPRText}
            placeholder="置換後のプランPR文がここに表示されます。"
          />
      </div>
    </div>
  );
};

export default TextReplacer;
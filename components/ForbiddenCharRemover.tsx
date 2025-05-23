
import React, { useState, useCallback, useMemo } from 'react';
import { InputArea } from './shared/InputArea';
import { Button } from './shared/Button';
import { OutputDisplay } from './shared/OutputDisplay';
import { XCircleIcon } from './icons/XCircleIcon';
import { TrashIcon } from './icons/TrashIcon';

const COMMON_FORBIDDEN_CHARS = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼∮∟⊿ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ￤‘#|^`“”’~<>〈〉≦≧⇔‘’℃☆★◎◇◆△▲▽▼♯♭♪￥¥";
const PLAN_NAME_SPECIFIC_FORBIDDEN_CHARS = "■□●○";

const ForbiddenCharRemover: React.FC = () => {
  const [planName, setPlanName] = useState<string>('');
  const [planPRText, setPlanPRText] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const [userForbiddenChars, setUserForbiddenChars] = useState<string>('');

  const [processedPlanName, setProcessedPlanName] = useState<string>('');
  const [processedPlanPRText, setProcessedPlanPRText] = useState<string>('');
  const [processedOriginalText, setProcessedOriginalText] = useState<string>('');

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [userForbiddenCharsError, setUserForbiddenCharsError] = useState<string | null>(null);

  const getUniqueChars = (str: string): string => {
    return Array.from(new Set(str.split(''))).join('');
  };

  const performCharRemoval = useCallback((text: string, charsToRemove: string): string => {
    if (!text.trim()) return '';
    if (!charsToRemove.trim()) return text;
    try {
      const uniqueChars = getUniqueChars(charsToRemove);
      const escapedForbiddenChars = uniqueChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '\\-');
      if (!escapedForbiddenChars) return text;
      const regex = new RegExp(`[${escapedForbiddenChars}]`, 'g');
      return text.replace(regex, '');
    } catch (e) {
      console.error("Regex error during character removal:", e);
      return text; 
    }
  }, []);

  const handleRemoveChars = useCallback(() => {
    setGeneralError(null);
    setUserForbiddenCharsError(null);
    setProcessedPlanName('');
    setProcessedPlanPRText('');
    setProcessedOriginalText('');

    let hasError = false;
    if (!planName.trim() && !planPRText.trim() && !originalText.trim()) {
      setGeneralError("処理対象のテキストをいずれか入力してください。");
      hasError = true;
    }

    if (userForbiddenChars.trim()) {
      try {
        const escapedUserChars = userForbiddenChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '\\-');
        if (escapedUserChars) {
             new RegExp(`[${escapedUserChars}]`, 'g');
        }
      } catch (e) {
        console.error("User-defined forbidden chars regex error:", e);
        setUserForbiddenCharsError("追加禁止文字の指定に無効なパターンが含まれています。特殊文字（例: -）を使用する場合はご注意ください。");
        hasError = true;
      }
    }

    if (hasError) return;

    const combinedUserChars = getUniqueChars(userForbiddenChars);

    setProcessedPlanName(
      planName.trim() ? performCharRemoval(planName, getUniqueChars(COMMON_FORBIDDEN_CHARS + PLAN_NAME_SPECIFIC_FORBIDDEN_CHARS + combinedUserChars)) : ''
    );
    setProcessedPlanPRText(
      planPRText.trim() ? performCharRemoval(planPRText, getUniqueChars(COMMON_FORBIDDEN_CHARS + combinedUserChars)) : ''
    );
    setProcessedOriginalText(
      originalText.trim() ? performCharRemoval(originalText, combinedUserChars) : ''
    );

  }, [planName, planPRText, originalText, userForbiddenChars, performCharRemoval]);

  const handleClearAll = useCallback(() => {
    setPlanName('');
    setPlanPRText('');
    setOriginalText('');
    setUserForbiddenChars('');
    setProcessedPlanName('');
    setProcessedPlanPRText('');
    setProcessedOriginalText('');
    setGeneralError(null);
    setUserForbiddenCharsError(null);
  }, []);

  const canProcess = useMemo(() => {
    return planName.trim() !== '' || planPRText.trim() !== '' || originalText.trim() !== '';
  }, [planName, planPRText, originalText]);

  const CharDisplay: React.FC<{ title: string; chars: string; className?: string }> = ({ title, chars, className }) => (
    <div className={`mb-3 ${className}`}>
      <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
      <div className="p-2 bg-slate-700 rounded text-xs text-slate-300 break-words max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
        {chars.split('').map((char, index) => <span key={index} className="mr-1 hover:bg-slate-500 px-0.5 rounded">{char}</span>)}
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 md:p-6 my-0 bg-slate-800 shadow-xl rounded-b-xl rounded-tr-xl ring-1 ring-slate-700">
       <header className="text-left mb-6 pt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-200">
          一休基準 禁止文字リムーバー
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          プラン名・プランPR文・自由入力テキストから、定義済みおよびユーザー指定の禁止文字を効率的に削除します。
        </p>
      </header>

      {generalError && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-300 border border-red-500/50 rounded-md text-sm" role="alert">
          {generalError}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
        {/* Inputs Column */}
        <div className="space-y-5">
          <InputArea
            id="remover-planName"
            label="プラン名"
            value={planName}
            onChange={setPlanName}
            placeholder="例: 素敵な温泉旅行プラン"
          />
          <InputArea
            id="remover-planPRText"
            label="プランPR文"
            value={planPRText}
            onChange={setPlanPRText}
            placeholder="例: 海の見える露天風呂と新鮮な海の幸を堪能！"
            isTextArea={true}
            rows={5}
          />
          <InputArea
            id="remover-originalText"
            label="自由入力テキスト（任意）"
            value={originalText}
            onChange={setOriginalText}
            placeholder="ここに追加で処理したいテキストを入力..."
            isTextArea={true}
            rows={5}
          />
        </div>

        {/* Forbidden Chars & Info Column */}
        <div className="space-y-1">
          <InputArea
            id="remover-userForbiddenChars"
            label="追加で禁止する文字（全テキスト共通）"
            value={userForbiddenChars}
            onChange={setUserForbiddenChars}
            placeholder="例: 、。？！（）「」"
            error={userForbiddenCharsError}
          />
           <div className="p-4 bg-slate-850 rounded-lg mt-5">
              <h3 className="text-md font-semibold text-slate-200 mb-3">定義済み禁止文字</h3>
              <CharDisplay title="共通の禁止文字（プラン名・PR文から自動削除）:" chars={COMMON_FORBIDDEN_CHARS} />
              <CharDisplay title="プラン名での追加禁止文字（プラン名から自動削除）:" chars={PLAN_NAME_SPECIFIC_FORBIDDEN_CHARS} />
           </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6">
        <Button
          onClick={handleRemoveChars}
          label="禁止文字を削除"
          variant="primary"
          icon={<TrashIcon />}
          disabled={!canProcess || !!userForbiddenCharsError}
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
            id="remover-processed-plan-name"
            label="処理後のプラン名"
            text={processedPlanName}
            placeholder="プラン名の結果がここに表示されます。"
          />
          <OutputDisplay
            id="remover-processed-plan-pr"
            label="処理後のプランPR文"
            text={processedPlanPRText}
            placeholder="プランPR文の結果がここに表示されます。"
          />
          <OutputDisplay
            id="remover-processed-original-text"
            label="処理後の自由入力テキスト"
            text={processedOriginalText}
            placeholder="自由入力テキストの結果がここに表示されます。"
          />
      </div>
    </div>
  );
};

export default ForbiddenCharRemover;

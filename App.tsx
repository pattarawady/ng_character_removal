
import React, { useState, useMemo } from 'react';
import ForbiddenCharRemover from './components/ForbiddenCharRemover';
import DPForbiddenCharHighlighter from './components/DPForbiddenCharHighlighter';
import TextReplacer from './components/TextReplacer'; 

type TabId = 'remover' | 'highlighter' | 'replacer'; 

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('remover');

  const TABS: { id: TabId; label: string; component: React.ReactNode }[] = useMemo(() => [
    { id: 'remover', label: '一休禁止文字リムーバー', component: <ForbiddenCharRemover /> },
    { id: 'highlighter', label: 'DP禁止文字ハイライト', component: <DPForbiddenCharHighlighter /> },
    { id: 'replacer', label: '特定文字リプレイサー', component: <TextReplacer /> }, 
  ], []);

  return (
    <div className="min-h-screen bg-brand-bg-light flex flex-col items-center justify-start py-4 md:py-6">
      <header className="w-full max-w-5xl px-4 md:px-8 mt-4 mb-8">
        <div className="bg-brand-red p-4 md:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-text-on-accent text-center">
            【宿力】テキスト調整アプリ
          </h1>
        </div>
        <p className="text-md text-brand-text-medium-dark mt-3 text-center">
          禁止文字の削除（一休基準）、ハイライト（DP基準）、特定文字の置換をサポートします。
        </p>
      </header>

      <div className="w-full max-w-5xl px-2 md:px-0">
        <div className="mb-0 flex"> 
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
          <div className="flex-grow border-b border-brand-border-light-theme"></div>
        </div>

        {TABS.map(tab => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={`tab-content ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {activeTab === tab.id && tab.component}
          </div>
        ))}
      </div>
      <footer className="text-center mt-12 mb-6 text-sm text-brand-text-medium-dark">
        <p>&copy; {new Date().getFullYear()} 【宿力】テキスト調整アプリ</p>
      </footer>
    </div>
  );
};

export default App;
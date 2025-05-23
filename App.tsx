
import React, { useState, useMemo } from 'react';
import ForbiddenCharRemover from './components/ForbiddenCharRemover';
import DPForbiddenCharHighlighter from './components/DPForbiddenCharHighlighter'; // New component

type TabId = 'remover' | 'highlighter';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('remover');

  const TABS: { id: TabId; label: string; component: React.ReactNode }[] = useMemo(() => [
    { id: 'remover', label: '一休禁止文字リムーバー', component: <ForbiddenCharRemover /> },
    { id: 'highlighter', label: 'DP禁止文字ハイライト', component: <DPForbiddenCharHighlighter /> },
  ], []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start py-2 md:py-4">
      <header className="w-full max-w-5xl px-4 md:px-8 mt-4 mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          【一休】禁止文字チェッカー
        </h1>
        <p className="text-md text-slate-400 mt-2">
          禁止文字の削除（一休基準）とハイライト（DP基準）をサポートします。
        </p>
      </header>

      <div className="w-full max-w-5xl px-2 md:px-0">
        <div className="mb-0 flex border-b border-slate-700">
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
      <footer className="text-center mt-12 mb-6 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} 【一休】禁止文字チェッカー</p>
      </footer>
    </div>
  );
};

export default App;

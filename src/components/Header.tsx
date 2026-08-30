import React from 'react';
import { Layers, Eye, Code2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'builder' | 'preview' | 'export';
  setActiveTab: (tab: 'builder' | 'preview' | 'export') => void;
  onOpenTemplates: () => void;
  theme: 'dark' | 'bright';
  toggleTheme: () => void;
}

export function Header({ activeTab, setActiveTab, onOpenTemplates, theme, toggleTheme }: HeaderProps) {
  const isDark = theme === 'dark';

  return (
    <header className={`${isDark ? 'bg-zinc-900/95 border-zinc-800 text-zinc-100' : 'bg-white/95 border-zinc-200 text-zinc-900'} backdrop-blur-md border-b sticky top-0 z-30 transition-colors`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap">
        

        {/* Navigation Tabs */}
        <div className={`flex items-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'} p-0.5 rounded-md border shrink-0`}>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'builder'
                ? isDark ? 'bg-zinc-800 text-white shadow-xs font-semibold' : 'bg-white text-zinc-900 shadow-xs font-semibold'
                : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'preview'
                ? isDark ? 'bg-zinc-800 text-white shadow-xs font-semibold' : 'bg-white text-zinc-900 shadow-xs font-semibold'
                : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'export'
                ? isDark ? 'bg-zinc-800 text-white shadow-xs font-semibold' : 'bg-white text-zinc-900 shadow-xs font-semibold'
                : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Code
          </button>
        </div>

        {/* Templates button & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenTemplates}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium ${isDark ? 'text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border-zinc-700' : 'text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border-zinc-200'} border rounded-md transition-colors`}
          >
            Templates
          </button>
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Bright Theme" : "Switch to Dark Theme"}
            className={`p-1.5 text-xs font-medium ${isDark ? 'text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border-zinc-700' : 'text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border-zinc-200'} border rounded-md transition-colors flex items-center justify-center`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}



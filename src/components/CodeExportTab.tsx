import React, { useState } from 'react';
import { FormConfig } from '../types';
import { generateHtmlCode, generateReactCode } from '../utils/codeGenerators';
import { Copy, Check, Download } from 'lucide-react';

interface CodeExportTabProps {
  config: FormConfig;
  theme?: 'dark' | 'bright';
}

export function CodeExportTab({ config, theme = 'dark' }: CodeExportTabProps) {
  const [format, setFormat] = useState<'html' | 'react'>('html');
  const [copied, setCopied] = useState(false);

  const codeString = format === 'html' ? generateHtmlCode(config) : generateReactCode(config);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = format === 'html' ? 'generated-form.html' : 'GeneratedForm.jsx';
    const blob = new Blob([codeString], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-950 shadow-sm';
  const subTextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const headingClass = isDark ? 'text-zinc-100' : 'text-zinc-900';
  const innerBgClass = isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cardClass} p-6 rounded-lg border shadow-xl`}>
        <div>
          
          <h2 className={`text-xl font-semibold ${headingClass}`}>Code Snippet Export</h2>
          <p className={`text-xs ${subTextClass} mt-0.5`}>
            Ready to use in any project without external npm package installations.
          </p>
        </div>

        {/* Format Selector */}
        <div className={`flex items-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-300'} p-0.5 rounded border`}>
          <button
            onClick={() => setFormat('html')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              format === 'html'
                ? isDark
                  ? 'bg-zinc-800 text-white shadow-xs font-semibold'
                  : 'bg-white text-black shadow-xs font-semibold'
                : subTextClass + ' hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            HTML + Tailwind
          </button>
          <button
            onClick={() => setFormat('react')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              format === 'react'
                ? isDark
                  ? 'bg-zinc-800 text-white shadow-xs font-semibold'
                  : 'bg-white text-black shadow-xs font-semibold'
                : subTextClass + ' hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            React JSX
          </button>
        </div>
      </div>

      {/* Code Display Box */}
      <div className={`${cardClass} rounded-lg shadow-xl overflow-hidden border`}>
        <div className={`flex items-center justify-between px-4 py-3 ${innerBgClass} border-b`}>
          <div className={`flex items-center gap-2 text-xs font-mono ${subTextClass}`}>
            <span>{format === 'html' ? 'generated-form.html' : 'GeneratedForm.jsx'}</span>
  
            
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-3 py-1.5 ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border-zinc-300'} text-xs font-medium rounded transition-colors border`}
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded transition-all ${
                copied
                  ? isDark
                    ? 'bg-zinc-200 text-black font-semibold'
                    : 'bg-black text-white font-semibold'
                  : isDark
                  ? 'bg-white hover:bg-zinc-200 text-black font-semibold'
                  : 'bg-black hover:bg-zinc-800 text-white font-semibold'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="p-4 overflow-x-auto max-h-[500px]">
          <pre className={`text-xs font-mono ${isDark ? 'text-zinc-300' : 'text-zinc-800'} leading-relaxed`}>
            <code>{codeString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}


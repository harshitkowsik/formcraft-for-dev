import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { FORM_TEMPLATES } from '../data/templates';
import { FormTemplate } from '../types';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: FormTemplate) => void;
  theme?: 'dark' | 'bright';
}

export function TemplatesModal({ isOpen, onClose, onSelectTemplate, theme = 'dark' }: TemplatesModalProps) {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'} rounded-lg shadow-2xl max-w-xl w-full p-6 border overflow-hidden relative`}>
        <div className={`flex items-center justify-between mb-5 pb-3 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Form Templates</h3>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Select a pre-configured template to load instantly.</p>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 ${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'} rounded transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
          {FORM_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                onSelectTemplate(tmpl);
                onClose();
              }}
              className={`group p-4 rounded border ${isDark ? 'border-zinc-800 bg-zinc-950 hover:border-white hover:bg-zinc-900' : 'border-zinc-200 bg-zinc-50 hover:border-black hover:bg-white'} cursor-pointer transition-all flex flex-col justify-between`}
            >
              <div>
                <h4 className={`font-semibold text-xs ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{tmpl.name}</h4>
                <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-1 line-clamp-2`}>{tmpl.description}</p>
              </div>
              <div className={`mt-3 flex items-center justify-between pt-2 border-t ${isDark ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-600'} text-[11px] font-medium`}>
                <span className="font-mono text-[10px]">{tmpl.config.fields.length} fields</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Load <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { FormConfig, FormField, FieldType, LabelStyle } from '../types';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface BuilderTabProps {
  config: FormConfig;
  setConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onOpenTemplates: () => void;
  onSwitchToPreview: () => void;
  theme?: 'dark' | 'bright';
}

export function BuilderTab({ config, setConfig, onOpenTemplates, onSwitchToPreview, theme = 'dark' }: BuilderTabProps) {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('text');
  const isDark = theme === 'dark';

  const updateConfig = (key: keyof FormConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFieldEnabled = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    }));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  };

  const deleteField = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
  };

  const addCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    const id = 'custom_' + Date.now();
    const formattedName = newFieldName.toLowerCase().replace(/\s+/g, '_');

    const newField: FormField = {
      id,
      type: newFieldType,
      label: newFieldName,
      name: formattedName,
      placeholder: `Enter ${newFieldName.toLowerCase()}...`,
      required: true,
      customError: `${newFieldName} is required.`,
      enabled: true,
      options: newFieldType === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
    };

    setConfig((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setNewFieldName('');
  };

  const cardClass = isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-950 shadow-sm';
  const inputClass = isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-950';
  const subTextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const headingClass = isDark ? 'text-zinc-100' : 'text-zinc-900';
  const itemBgClass = isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200';
  const innerInputClass = isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-950';

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 space-y-8 ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
      {/* Hero Section */}
      <div className={`${cardClass} rounded-xl p-6 sm:p-8 border shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
        <div className="space-y-2 max-w-4xl">

          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${headingClass}`}>
            Build & Export Forms That Route Directly to Gmail
          </h1>
          <p className={`text-xs sm:text-sm ${subTextClass} leading-relaxed`}>
            Create customizable dynamic forms in seconds with direct Gmail redirection built-in. Every submission automatically formats the data and opens Gmail pre-filled with your recipient address and message body—no backend or server database required.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Settings & Recipient Email */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className={`${cardClass} rounded-lg p-5 border shadow-xl space-y-3`}>
            <h3 className={`font-semibold text-sm ${headingClass}`}>FormCraft Generator</h3>
            <p className={`text-xs ${subTextClass} leading-relaxed`}>
              Configure fields, style, and recipient email. Export zero-dependency HTML or React code.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenTemplates}
                className={`px-3 py-1.5 ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'} text-xs font-medium rounded transition-colors border`}
              >
                Templates
              </button>
              <button
                onClick={onSwitchToPreview}
                className={`px-3 py-1.5 ${isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'} text-xs font-semibold rounded transition-colors`}
              >
                Live Preview →
              </button>
            </div>
          </div>

          {/* Recipient Email & Mail Format Settings */}
          <div className={`${cardClass} rounded-lg p-5 border shadow-xl space-y-4`}>
            <h4 className={`font-medium text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-wider pb-2 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              Response Destination
            </h4>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>
                Recipient Email <span className={subTextClass}>*</span>
              </label>
              <input
                type="email"
                value={config.recipientEmail}
                onChange={(e) => updateConfig('recipientEmail', e.target.value)}
                placeholder="you@domain.com"
                className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
              />
              <p className={`text-[11px] ${subTextClass} mt-1`}>
                Submissions open Gmail pre-filled with this recipient.
              </p>
            </div>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Subject Prefix</label>
              <input
                type="text"
                value={config.emailSubjectPrefix}
                onChange={(e) => updateConfig('emailSubjectPrefix', e.target.value)}
                placeholder="New Form Submission"
                className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
              />
            </div>
          </div>

          {/* Styling & Layout Customization */}
          <div className={`${cardClass} rounded-lg p-5 border shadow-xl space-y-4`}>
            <h4 className={`font-medium text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-wider pb-2 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              Style & Layout
            </h4>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Label Style</label>
              <select
                value={config.labelStyle}
                onChange={(e) => updateConfig('labelStyle', e.target.value as LabelStyle)}
                className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
              >
                <option value="floating">Floating Labels</option>
                <option value="placeholder">Placeholder Hints</option>
                <option value="classic">Classic Top Labels</option>
                <option value="minimalist">Minimalist</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Border Radius</label>
              <select
                value={config.borderRadius}
                onChange={(e) => updateConfig('borderRadius', e.target.value)}
                className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
              >
                <option value="rounded-none">Square (0px)</option>
                <option value="rounded-lg">Standard (8px)</option>
                <option value="rounded-xl">Smooth (12px)</option>
                <option value="rounded-2xl">Rounded (16px)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Submit Button Text</label>
              <input
                type="text"
                value={config.submitButtonText}
                onChange={(e) => updateConfig('submitButtonText', e.target.value)}
                className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className={`text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Show Reset Button</span>
              <input
                type="checkbox"
                checked={config.showResetButton}
                onChange={(e) => updateConfig('showResetButton', e.target.checked)}
                className={`w-4 h-4 rounded ${isDark ? 'text-zinc-500 border-zinc-700 bg-zinc-950' : 'text-zinc-700 border-zinc-300 bg-zinc-100'} focus:ring-zinc-500`}
              />
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Form Fields Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Title & Description Config */}
          <div className={`${cardClass} rounded-lg p-5 border shadow-xl space-y-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Form Title</label>
                <input
                  type="text"
                  value={config.formTitle}
                  onChange={(e) => updateConfig('formTitle', e.target.value)}
                  className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mb-1`}>Form Subtitle / Description</label>
                <input
                  type="text"
                  value={config.formDescription}
                  onChange={(e) => updateConfig('formDescription', e.target.value)}
                  className={`w-full px-3 py-2 text-xs ${inputClass} rounded focus:outline-none`}
                />
              </div>
            </div>
          </div>

          {/* Fields List */}
          <div className={`${cardClass} rounded-lg p-5 border shadow-xl space-y-4`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div>
                <h4 className={`font-semibold text-sm ${headingClass}`}>Fields ({config.fields.filter((f) => f.enabled).length} Active)</h4>
                <p className={`text-xs ${subTextClass}`}>Toggle, order, and configure validation rules.</p>
              </div>

            </div>

            <div className="space-y-3">
              {config.fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-3.5 rounded border transition-all ${field.enabled
                      ? itemBgClass
                      : isDark
                        ? 'bg-zinc-950/40 border-zinc-900 opacity-50'
                        : 'bg-zinc-100/50 border-zinc-200 opacity-50'
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <button type="button" className={`${subTextClass} cursor-grab`}>
                      </button>
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={() => toggleFieldEnabled(field.id)}
                        className={`w-4 h-4 rounded ${isDark ? 'text-zinc-500 border-zinc-700 bg-zinc-900' : 'text-zinc-700 border-zinc-300 bg-white'} focus:ring-zinc-500 cursor-pointer`}
                      />
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] text-zinc-500 font-mono uppercase mb-0.5">Label</label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            disabled={!field.enabled}
                            className={`w-full px-2.5 py-1 text-xs ${innerInputClass} rounded focus:outline-none`}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500 font-mono uppercase mb-0.5">Placeholder</label>
                          <input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            disabled={!field.enabled}
                            className={`w-full px-2.5 py-1 text-xs ${innerInputClass} rounded focus:outline-none`}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500 font-mono uppercase mb-0.5">Type</label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                            disabled={!field.enabled}
                            className={`w-full px-2.5 py-1 text-xs ${innerInputClass} rounded focus:outline-none`}
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="password">Password</option>
                            <option value="textarea">Textarea</option>
                            <option value="select">Dropdown</option>
                            <option value="url">URL</option>
                            <option value="number">Number</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteField(field.id)}
                      className={`p-1.5 ${subTextClass} hover:text-zinc-900 dark:hover:text-zinc-100 rounded transition-colors`}
                      title="Delete field"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {field.enabled && (
                    <div className={`mt-2.5 pt-2.5 border-t ${isDark ? 'border-zinc-900 text-zinc-300' : 'border-zinc-200 text-zinc-700'} space-y-2.5 text-xs`}>
                      <div className="flex flex-wrap items-center gap-4">
                        <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className={`w-3 h-3 rounded ${isDark ? 'text-zinc-500 border-zinc-700 bg-zinc-900' : 'text-zinc-700 border-zinc-300 bg-white'} focus:ring-zinc-500`}
                          />
                          Required
                        </label>

                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-zinc-500 text-[11px]">Error Message:</span>
                          <input
                            type="text"
                            value={field.customError || ''}
                            onChange={(e) => updateField(field.id, { customError: e.target.value })}
                            placeholder="Required field error"
                            className={`flex-1 px-2 py-0.5 text-xs ${innerInputClass} rounded focus:outline-none`}
                          />
                        </div>
                      </div>

                      {field.type === 'select' && (
                        <div className="pt-1.5 border-t border-zinc-800/40 space-y-1.5">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Dropdown Options (comma separated)</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={(field.options || []).join(', ')}
                              onBlur={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                              placeholder="Option 1, Option 2, Option 3"
                              className={`w-full px-2.5 py-1 text-xs ${innerInputClass} rounded focus:outline-none`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Custom Field Form */}
            <form onSubmit={addCustomField} className={`pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'} flex flex-wrap items-center gap-2`}>
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="New field label..."
                className={`flex-1 px-3 py-1.5 text-xs ${inputClass} rounded focus:outline-none`}
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                className={`px-3 py-1.5 text-xs ${inputClass} rounded focus:outline-none`}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="password">Password</option>
                <option value="textarea">Textarea</option>
                <option value="select">Dropdown</option>
                <option value="url">URL</option>
              </select>
              <button
                type="submit"
                className={`px-3 py-1.5 ${isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'} text-xs font-semibold rounded transition-colors flex items-center gap-1`}
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 pt-4 border-t flex flex-col items-start gap-1 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <p className={`text-xs ${subTextClass} text-center`}>FormCraft © 2026. Build powerful forms with ease.</p>
          <p className={`text-xs ${subTextClass} text-center`}>Made by Harshit Kowsik</p>
        </div>
      </div>
    </div>
  );
}


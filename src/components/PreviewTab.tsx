import React, { useState } from 'react';
import { FormConfig } from '../types';
import { Send, CheckCircle, ExternalLink, RefreshCcw, AlertCircle, Mail } from 'lucide-react';

interface PreviewTabProps {
  config: FormConfig;
  theme?: 'dark' | 'bright';
}

export function PreviewTab({ config, theme = 'dark' }: PreviewTabProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    config.fields
      .filter((f) => f.enabled && f.required)
      .forEach((f) => {
        const val = formData[f.name];
        if (!val || !val.trim()) {
          newErrors[f.name] = f.customError || `${f.label} is required.`;
        } else if (f.type === 'email' && !val.includes('@')) {
          newErrors[f.name] = f.customError || 'Please enter a valid email address.';
        }
      });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmittedData(formData);

    let emailBody = '';
    config.fields
      .filter((f) => f.enabled)
      .forEach((f) => {
        const val = formData[f.name] || '(not provided)';
        emailBody += `${f.label.toUpperCase()}: ${val}\n`;
      });

    const subject = encodeURIComponent(`New Form Submission (${config.emailSubjectPrefix || config.formTitle})`);
    const body = encodeURIComponent(emailBody);
    const recipient = encodeURIComponent(config.recipientEmail || 'contact@example.com');

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    setSubmittedData(null);
  };

  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900 shadow-xl';
  const inputClass = isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900';
  const subTextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const headingClass = isDark ? 'text-zinc-100' : 'text-zinc-900';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <span className={`text-[11px] font-mono ${isDark ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'} px-2.5 py-1 rounded border`}>
          Live Form Preview
        </span>
        
        <p className={`text-xs ${subTextClass} mt-2`}>
          Test validation rules and mailto: integration with your form configuration.
        </p>
      </div>

      <div className={`${cardClass} border ${config.borderRadius} p-8 relative`}>
        {submittedData ? (
          <div className="text-center py-6 space-y-4">
            <div className={`w-12 h-12 ${isDark ? 'bg-zinc-800 text-zinc-200 border-zinc-700' : 'bg-zinc-100 text-zinc-800 border-zinc-300'} border rounded-full flex items-center justify-center mx-auto`}>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${headingClass}`}>Form Submitted</h3>
              <p className={`text-xs ${subTextClass} mt-1`}>
                Email client has opened with pre-filled recipient: <span className={`font-mono ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>{config.recipientEmail}</span>
              </p>
            </div>

            <div className={`${isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'} border rounded p-4 text-left max-w-sm mx-auto space-y-1.5 font-mono text-xs`}>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider pb-1 border-b border-zinc-700">
                Gathered Data
              </div>
              {Object.entries(submittedData).map(([key, val]) => (
                <div key={key} className={`flex justify-between ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                  <span>{key}:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{val}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'} text-xs font-semibold rounded transition-colors`}
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Test Again
            </button>
          </div>
        ) : (
          <div>
            <div className={`mb-6 pb-4 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <h3 className={`text-xl font-semibold ${headingClass}`}>{config.formTitle}</h3>
              <p className={`text-xs ${subTextClass} mt-1`}>{config.formDescription}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {config.fields
                .filter((f) => f.enabled)
                .map((field) => {
                  const error = errors[field.name];

                  return (
                    <div key={field.id} className="space-y-1">
                      <label className={`block text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {field.label} {field.required && <span className={subTextClass}>*</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={field.placeholder || ''}
                          rows={4}
                          className={`w-full px-3 py-2 ${inputClass} border ${
                            error ? 'border-red-500' : isDark ? 'border-zinc-700' : 'border-zinc-300'
                          } ${config.borderRadius} text-xs focus:outline-none`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          className={`w-full px-3 py-2 ${inputClass} border ${
                            error ? 'border-red-500' : isDark ? 'border-zinc-700' : 'border-zinc-300'
                          } ${config.borderRadius} text-xs focus:outline-none`}
                        >
                          <option value="" disabled>
                            {field.placeholder || 'Select option'}
                          </option>
                          {(field.options || []).map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={field.placeholder || ''}
                          className={`w-full px-3 py-2 ${inputClass} border ${
                            error ? 'border-red-500' : isDark ? 'border-zinc-700' : 'border-zinc-300'
                          } ${config.borderRadius} text-xs focus:outline-none`}
                        />
                      )}

                      {error && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> {error}
                        </p>
                      )}
                    </div>
                  );
                })}

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className={`flex-1 py-2.5 px-4 ${isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'} text-xs font-semibold ${config.borderRadius} transition-colors inline-flex items-center justify-center gap-2`}
                >
                  {config.submitButtonText} <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
                {config.showResetButton && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`py-2.5 px-4 ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'} text-xs font-medium border rounded transition-colors`}
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>

            <div className={`mt-6 pt-4 border-t ${isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-500'} text-center text-[11px]`}>
              Recipient: <span className={`font-mono ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{config.recipientEmail}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { FormConfig } from '../types';

export function generateHtmlCode(config: FormConfig): string {
  const fieldsHtml = config.fields
    .filter((f) => f.enabled)
    .map((field) => {
      const isRequired = field.required ? 'required' : '';
      const reqMark = field.required
        ? '<span class="fc-required">*</span>'
        : '';

      if (field.type === 'textarea') {
        return `
      <!-- ${field.label} -->
      <div class="fc-group">
        <label for="${field.name}" class="fc-label">
          ${field.label} ${reqMark}
        </label>
        <textarea
          id="${field.name}"
          name="${field.name}"
          rows="4"
          placeholder="${field.placeholder || ''}"
          ${isRequired}
          class="fc-input fc-textarea"
        ></textarea>
      </div>`;
      }

      if (field.type === 'select') {
        const optionsHtml = (field.options || [])
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join('\n          ');

        return `
      <!-- ${field.label} -->
      <div class="fc-group">
        <label for="${field.name}" class="fc-label">
          ${field.label} ${reqMark}
        </label>
        <select
          id="${field.name}"
          name="${field.name}"
          ${isRequired}
          class="fc-input fc-select"
        >
          <option value="" disabled selected>
            ${field.placeholder || 'Select option'}
          </option>
          ${optionsHtml}
        </select>
      </div>`;
      }

      return `
      <!-- ${field.label} -->
      <div class="fc-group">
        <label for="${field.name}" class="fc-label">
          ${field.label} ${reqMark}
        </label>
        <input
          type="${field.type}"
          id="${field.name}"
          name="${field.name}"
          placeholder="${field.placeholder || ''}"
          ${isRequired}
          class="fc-input"
        />
      </div>`;
    })
    .join('\n');

  const radiusValue =
    config.borderRadius === 'rounded-none'
      ? '0px'
      : config.borderRadius === 'rounded-2xl'
      ? '16px'
      : '8px';

  const emailSubject = config.emailSubjectPrefix || config.formTitle;

  return `<!-- ================================================= -->
<!-- ZERO-DEPENDENCY STANDALONE FORM COMPONENT         -->
<!-- Includes embedded root CSS. No Tailwind required. -->
<!-- ================================================= -->

<style>
  :root {
    --fc-bg: #ffffff;
    --fc-text: #09090b;
    --fc-muted: #71717a;
    --fc-border: #e4e4e7;
    --fc-input-bg: #fafafa;
    --fc-input-text: #09090b;
    --fc-primary: #09090b;
    --fc-primary-hover: #27272a;
    --fc-primary-text: #ffffff;
    --fc-radius: ${radiusValue};
    --fc-error: #ef4444;
  }

  .fc-wrapper {
    max-width: 560px;
    margin: 32px auto;
    padding: 32px;
    background: var(--fc-bg);
    color: var(--fc-text);
    border: 1px solid var(--fc-border);
    border-radius: var(--fc-radius);
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.05),
      0 8px 10px -6px rgba(0, 0, 0, 0.05);
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif;
    box-sizing: border-box;
  }

  .fc-wrapper *,
  .fc-wrapper *::before,
  .fc-wrapper *::after {
    box-sizing: border-box;
  }

  .fc-header {
    margin-bottom: 24px;
  }

  .fc-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--fc-text);
    margin: 0 0 6px 0;
  }

  .fc-description {
    font-size: 14px;
    color: var(--fc-muted);
    margin: 0;
    line-height: 1.5;
  }

  .fc-group {
    margin-bottom: 18px;
  }

  .fc-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--fc-text);
    margin-bottom: 6px;
  }

  .fc-required {
    color: var(--fc-error);
    margin-left: 2px;
  }

  .fc-input {
    width: 100%;
    padding: 11px 14px;
    font-size: 14px;
    color: var(--fc-input-text);
    background: var(--fc-input-bg);
    border: 1px solid var(--fc-border);
    border-radius: var(--fc-radius);
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .fc-input:focus {
    border-color: var(--fc-primary);
    box-shadow: 0 0 0 2px rgba(9, 9, 11, 0.1);
  }

  .fc-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .fc-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .fc-btn-submit {
    flex: 1;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--fc-primary-text);
    background: var(--fc-primary);
    border: none;
    border-radius: var(--fc-radius);
    cursor: pointer;
    transition: background 0.2s;
  }

  .fc-btn-submit:hover {
    background: var(--fc-primary-hover);
  }

  .fc-btn-reset {
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 500;
    color: #52525b;
    background: #f4f4f5;
    border: 1px solid var(--fc-border);
    border-radius: var(--fc-radius);
    cursor: pointer;
    transition: background 0.2s;
  }

  .fc-btn-reset:hover {
    background: #e4e4e7;
  }
</style>

<div class="fc-wrapper">
  <div class="fc-header">
    <h2 class="fc-title">${config.formTitle}</h2>
    <p class="fc-description">${config.formDescription}</p>
  </div>

  <form id="dynamic-form" onsubmit="handleFormSubmit(event)">
${fieldsHtml}

    <div class="fc-actions">
      <button
        type="submit"
        class="fc-btn-submit"
      >
        ${config.submitButtonText}
      </button>

      ${
        config.showResetButton
          ? `<button
        type="reset"
        class="fc-btn-reset"
      >
        Reset
      </button>`
          : ''
      }
    </div>
  </form>
</div>

<script>
  const RECIPIENT_EMAIL = "${config.recipientEmail}";
  const EMAIL_SUBJECT = "New Form Submission (${emailSubject})";

  function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Build email body using only submitted form fields.
    let summaryBody = "";

    for (let [key, value] of formData.entries()) {
      summaryBody += key.toUpperCase() + ": " + value + "\\n";
    }

    const mailtoUrl =
      "https://mail.google.com/mail/?view=cm" +
      "&to=" + encodeURIComponent(RECIPIENT_EMAIL) +
      "&su=" + encodeURIComponent(EMAIL_SUBJECT) +
      "&body=" + encodeURIComponent(summaryBody);

    window.open(mailtoUrl, "_blank");
  }
</script>`;
}

export function generateReactCode(config: FormConfig): string {
  const fieldsCode = config.fields
    .filter((f) => f.enabled)
    .map((field) => {
      const isReq = field.required ? 'required' : '';

      if (field.type === 'textarea') {
        return `
        {/* ${field.label} */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ${field.label} ${
              field.required
                ? `<span className="text-red-500">*</span>`
                : ''
            }
          </label>

          <textarea
            name="${field.name}"
            value={formData.${field.name} || ''}
            onChange={handleChange}
            placeholder="${field.placeholder || ''}"
            rows={4}
            ${isReq}
            className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 ${config.borderRadius} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />

          {errors.${field.name} && (
            <p className="text-xs text-red-500 mt-1">
              {errors.${field.name}}
            </p>
          )}
        </div>`;
      }

      if (field.type === 'select') {
        const optionsList = (field.options || [])
          .map(
            (o) => `
            <option value="${o}">${o}</option>`
          )
          .join('');

        return `
        {/* ${field.label} */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ${field.label} ${
              field.required
                ? `<span className="text-red-500">*</span>`
                : ''
            }
          </label>

          <select
            name="${field.name}"
            value={formData.${field.name} || ''}
            onChange={handleChange}
            ${isReq}
            className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 ${config.borderRadius} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="" disabled>
              ${field.placeholder || 'Select option'}
            </option>
            ${optionsList}
          </select>

          {errors.${field.name} && (
            <p className="text-xs text-red-500 mt-1">
              {errors.${field.name}}
            </p>
          )}
        </div>`;
      }

      return `
      {/* ${field.label} */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          ${field.label} ${
            field.required
              ? `<span className="text-red-500">*</span>`
              : ''
          }
        </label>

        <input
          type="${field.type}"
          name="${field.name}"
          value={formData.${field.name} || ''}
          onChange={handleChange}
          placeholder="${field.placeholder || ''}"
          ${isReq}
          className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 ${config.borderRadius} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />

        {errors.${field.name} && (
          <p className="text-xs text-red-500 mt-1">
            {errors.${field.name}}
          </p>
        )}
      </div>`;
    })
    .join('\n');

  const emailSubject = `New Form Submission (${config.emailSubjectPrefix || config.formTitle})`;

  return `import React, { useState } from 'react';

export default function GeneratedForm() {
  const RECIPIENT_EMAIL = "${config.recipientEmail}";
  const EMAIL_SUBJECT = "${emailSubject}";

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    const newErrors = {};

    ${config.fields
      .filter((f) => f.enabled && f.required)
      .map(
        (f) => `
    if (
      !formData.${f.name} ||
      !String(formData.${f.name}).trim()
    ) {
      newErrors.${f.name} = "${
          f.customError || f.label + ' is required.'
        }";
    }`
      )
      .join('')}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build email body using only submitted form fields.
    let body = "";

    Object.entries(formData).forEach(([key, val]) => {
      body += key.toUpperCase() + ": " + val + "\\n";
    });

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm" +
      "&to=" + encodeURIComponent(RECIPIENT_EMAIL) +
      "&su=" + encodeURIComponent(EMAIL_SUBJECT) +
      "&body=" + encodeURIComponent(body);

    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white border border-slate-200 shadow-xl ${config.borderRadius}">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          ${config.formTitle}
        </h2>

        <p className="text-sm text-slate-600 mt-1">
          ${config.formDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        ${fieldsCode}

        <div className="pt-3 flex items-center gap-3">
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium ${config.borderRadius} shadow-md transition-all focus:ring-2 focus:ring-indigo-500"
          >
            ${config.submitButtonText}
          </button>

          ${
            config.showResetButton
              ? `<button
            type="button"
            onClick={() => {
              setFormData({});
              setErrors({});
            }}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium ${config.borderRadius} transition-all"
          >
            Reset
          </button>`
              : ''
          }
        </div>
      </form>
    </div>
  );
}
`;
}

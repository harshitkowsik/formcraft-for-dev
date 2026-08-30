export type FieldType = 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select' | 'checkbox' | 'url' | 'number';

export type LabelStyle = 'floating' | 'placeholder' | 'classic' | 'minimalist';

export type ThemeColor = 'indigo' | 'emerald' | 'violet' | 'rose' | 'amber' | 'blue' | 'slate';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customError?: string;
  options?: string[]; // For select dropdowns
  enabled: boolean;
}

export interface FormConfig {
  formTitle: string;
  formDescription: string;
  recipientEmail: string;
  emailSubjectPrefix: string;
  labelStyle: LabelStyle;
  themeColor: ThemeColor;
  borderRadius: 'rounded-none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
  submitButtonText: string;
  showResetButton: boolean;
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  config: FormConfig;
}

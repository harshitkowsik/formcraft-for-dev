import React, { useEffect, useState } from 'react';
import { FormConfig, FormTemplate } from './types';
import { FORM_TEMPLATES } from './data/templates';
import { Header } from './components/Header';
import { BuilderTab } from './components/BuilderTab';
import { PreviewTab } from './components/PreviewTab';
import { CodeExportTab } from './components/CodeExportTab';
import { TemplatesModal } from './components/TemplatesModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'export'>('builder');
  const [config, setConfig] = useState<FormConfig>(FORM_TEMPLATES[0].config);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'bright'>('dark');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'bright' : 'dark'));
  };

  const handleSelectTemplate = (template: FormTemplate) => {
    setConfig(template.config);
    setActiveTab('preview');
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-zinc-100' : 'bg-white text-zinc-900'} flex flex-col font-sans transition-colors`}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'builder' && (
          <BuilderTab
            config={config}
            setConfig={setConfig}
            onOpenTemplates={() => setIsTemplatesModalOpen(true)}
            onSwitchToPreview={() => setActiveTab('preview')}
            theme={theme}
          />
        )}

        {activeTab === 'preview' && <PreviewTab config={config} theme={theme} />}

        {activeTab === 'export' && <CodeExportTab config={config} theme={theme} />}
      </main>

      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        theme={theme}
      />

      <ScrollToTop theme={theme} />
    </div>
  );
}



import { useState, useEffect } from 'react';
import { getTabsConfig } from './procedures/config/tabsConfig';
import { useOCRHandler } from './procedures/hooks/useOCRHandler';
import { ProcedureActionHandlers } from './procedures/handlers/ProcedureActionHandlers';
import { ProcedureTabsLayout } from './procedures/layout/ProcedureTabsLayout';

interface ProceduresTabsProps {
  section: string;
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
  onOCRDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
}

export function ProceduresTabs({ section, onAddProcedure, onOpenApprovalQueue, onOCRDataExtracted }: ProceduresTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('');
  const { ocrExtractedText, handleOCRTextExtracted } = useOCRHandler({ onAddProcedure });

  // Écouter les événements de changement d'onglet
  useEffect(() => {
    const handleTabSwitch = (event: CustomEvent) => {
      const { section: targetSection, tab } = event.detail;
      if (targetSection === section) {
        console.log(`Switching to tab: ${tab} in section: ${section}`);
        setActiveTab(tab);
      }
    };

    window.addEventListener('switch-to-tab', handleTabSwitch as EventListener);
    return () => {
      window.removeEventListener('switch-to-tab', handleTabSwitch as EventListener);
    };
  }, [section]);

  return (
    <ProcedureActionHandlers 
      onAddProcedure={onAddProcedure}
      onOpenApprovalQueue={onOpenApprovalQueue}
    >
      {({ handleAddClick, handleOpenApprovalQueue }) => {
        const tabsConfig = getTabsConfig({
          section,
          searchTerm,
          setSearchTerm,
          onAddProcedure: handleAddClick,
          onOpenApprovalQueue: handleOpenApprovalQueue,
          onOCRTextExtracted: handleOCRTextExtracted,
          onOCRDataExtracted: onOCRDataExtracted,
          activeTab
        });

        return (
          <ProcedureTabsLayout 
            defaultValue={tabsConfig.defaultValue}
            tabs={tabsConfig.tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        );
      }}
    </ProcedureActionHandlers>
  );
}

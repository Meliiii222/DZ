
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LegalTextHistoryTab } from './legal/LegalTextHistoryTab';
import { LegalTextsPendingApprovalTab } from './legal/LegalTextsPendingApprovalTab';
import { LegalTextsEnrichmentTab } from './legal/LegalTextsEnrichmentTab';
import { LegalTextsCatalogTab } from './legal/LegalTextsCatalogTab';
import { LegalTextsTimelineTab } from './legal/LegalTextsTimelineTab';
import { LegalTextsSearchTab } from './legal/LegalTextsSearchTab';
import LegalTextsApprovalQueue from './legal/LegalTextsApprovalQueue';
import LegalTextsPendingPublication from './legal/LegalTextsPendingPublication';
import { ApprovalQueueModal } from './modals/ApprovalQueueModal';
import { DocumentVersionHistory } from './version-history/DocumentVersionHistory';

interface LegalTextsTabsProps {
  section: string;
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
  onOCRTextExtracted?: (text: string) => void;
  onOCRDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
}

export function LegalTextsTabs({ section, onAddLegalText, onOpenApprovalQueue, onOCRTextExtracted, onOCRDataExtracted }: LegalTextsTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  const handleOpenApprovalQueue = () => {
    setShowApprovalQueue(true);
  };

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

  const getTabsConfig = () => {
    switch (section) {
      case 'legal-catalog':
        return {
          defaultValue: 'catalog',
          tabs: [
            { 
              value: 'catalog', 
              label: 'Catalogue', 
              content: (
                <LegalTextsCatalogTab 
                  onAddLegalText={onAddLegalText}
                  onOpenApprovalQueue={handleOpenApprovalQueue}
                />
              )
            },
            { 
              value: 'timeline', 
              label: 'Timeline des Textes Juridiques', 
              content: <LegalTextsTimelineTab />
            },
            { 
              value: 'versions', 
              label: 'Historiques des Versions', 
              content: <DocumentVersionHistory type="legal" />
            }
          ]
        };
      case 'legal-search':
        return {
          defaultValue: 'search',
          tabs: [
            { 
              value: 'search', 
              label: 'Recherche', 
              content: <LegalTextsSearchTab />
            }
          ]
        };
      case 'legal-enrichment':
        return {
          defaultValue: activeTab || 'enrichment',
          tabs: [
            { 
              value: 'enrichment', 
              label: 'Alimentation', 
              content: (
                <LegalTextsEnrichmentTab 
                  onAddLegalText={onAddLegalText || (() => {})}
                  onOCRTextExtracted={onOCRTextExtracted}
                  onOCRDataExtracted={onOCRDataExtracted}
                />
              )
            },
            { 
              value: 'approval-queue', 
              label: 'File d\'attente d\'approbation', 
              content: <LegalTextsApprovalQueue />
            }
          ]
        };
      default:
        return {
          defaultValue: 'enrichment',
          tabs: [
            { 
              value: 'enrichment', 
              label: 'Alimentation', 
              content: (
                <LegalTextsEnrichmentTab 
                  onAddLegalText={onAddLegalText || (() => {})}
                  onOCRTextExtracted={onOCRTextExtracted}
                  onOCRDataExtracted={onOCRDataExtracted}
                />
              )
            }
          ]
        };
    }
  };

  const tabsConfig = getTabsConfig();

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue={tabsConfig.defaultValue} 
        value={activeTab || tabsConfig.defaultValue}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className={`grid w-full ${
          tabsConfig.tabs.length === 1 ? 'grid-cols-1' : 
          tabsConfig.tabs.length === 2 ? 'grid-cols-2' : 
          tabsConfig.tabs.length === 3 ? 'grid-cols-3' :
          'grid-cols-4'
        }`}>
          {tabsConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabsConfig.tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal d'approbation */}
      <ApprovalQueueModal
        isOpen={showApprovalQueue}
        onClose={() => setShowApprovalQueue(false)}
        filterType="legal-text"
      />
    </div>
  );
}

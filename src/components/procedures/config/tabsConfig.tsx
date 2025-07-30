
import { ProcedureHistoryTab } from '../ProcedureHistoryTab';
import { ProceduresPendingApprovalTab } from '../ProceduresPendingApprovalTab';
import { ProcedureCatalogTab } from '../ProcedureCatalogTab';
import ProceduresApprovalQueue from '../ProceduresApprovalQueue';
import ProceduresPendingPublication from '../ProceduresPendingPublication';
import { ProcedureResourcesSection } from '../../ProcedureResourcesSection';
import { ProcedureSearchSection } from '../../ProcedureSearchSection';
import { TimelineTab } from '../tabs/TimelineTab';
import { EnrichmentTab } from '../tabs/EnrichmentTab';
import { ProcedurePopularSearchesTab } from '../ProcedurePopularSearchesTab';
import { NextGenSearchSection } from '../../search/NextGenSearchSection';
import { ProcedureSearchHistoryTab } from '../ProcedureSearchHistoryTab';
import { SavedSearchesEnhanced } from '../../SavedSearchesEnhanced';
import { DocumentVersionHistory } from '../../version-history/DocumentVersionHistory';

interface TabConfig {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsConfigResult {
  defaultValue: string;
  tabs: TabConfig[];
}

interface GetTabsConfigProps {
  section: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddProcedure: () => void;
  onOpenApprovalQueue: () => void;
  onOCRTextExtracted: (text: string) => void;
  onOCRDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
  activeTab?: string;
}

export function getTabsConfig({
  section,
  searchTerm,
  setSearchTerm,
  onAddProcedure,
  onOpenApprovalQueue,
  onOCRTextExtracted,
  onOCRDataExtracted,
  activeTab
}: GetTabsConfigProps): TabsConfigResult {
  switch (section) {
    case 'procedures-catalog':
      return {
        defaultValue: 'catalogue',
        tabs: [
          { 
            value: 'catalogue', 
            label: 'Catalogue', 
            content: (
              <ProcedureCatalogTab 
                onAddProcedure={onAddProcedure}
                onOpenApprovalQueue={onOpenApprovalQueue}
              />
            )
          },
          { 
            value: 'timeline', 
            label: 'Timeline des procédures', 
            content: <TimelineTab />
          },
          { 
            value: 'versions', 
            label: 'Historiques des Versions', 
            content: <DocumentVersionHistory type="procedure" />
          }
        ]
      };

    case 'procedures-enrichment':
      return {
        defaultValue: activeTab || 'enrichment',
        tabs: [
          { 
            value: 'enrichment', 
            label: 'Alimentation', 
            content: (
              <EnrichmentTab 
                onAddProcedure={onAddProcedure}
                onOCRTextExtracted={onOCRTextExtracted}
                onOCRDataExtracted={onOCRDataExtracted}
              />
            )
          },
          { 
            value: 'approval-queue', 
            label: 'File d\'attente d\'approbation', 
            content: <ProceduresApprovalQueue />
          }
        ]
      };

    case 'procedures-search':
      return {
        defaultValue: 'nextgen',
        tabs: [
          { 
            value: 'nextgen', 
            label: 'Recherche Nouvelle Génération', 
            content: <NextGenSearchSection />
          },
          { 
            value: 'history', 
            label: 'Historique des recherches', 
            content: <ProcedureSearchHistoryTab />
          },
          { 
            value: 'saved-searches', 
            label: 'Recherches sauvegardées', 
            content: <SavedSearchesEnhanced />
          },
          { 
            value: 'popular-searches', 
            label: 'Recherches populaires', 
            content: <ProcedurePopularSearchesTab />
          }
        ]
      };

    case 'procedures-resources':
      return {
        defaultValue: 'resources',
        tabs: [
          { 
            value: 'resources', 
            label: 'Ressources', 
            content: <ProcedureResourcesSection />
          }
        ]
      };

    default:
      return {
        defaultValue: 'catalogue',
        tabs: [
          { 
            value: 'catalogue', 
            label: 'Catalogue', 
            content: (
              <ProcedureCatalogTab 
                onAddProcedure={onAddProcedure}
                onOpenApprovalQueue={onOpenApprovalQueue}
              />
            )
          }
        ]
      };
  }
}

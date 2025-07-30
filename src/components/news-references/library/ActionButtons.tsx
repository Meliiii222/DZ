
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Settings } from 'lucide-react';
import { ApiImportModal } from '@/components/modals/ApiImportModal';
import { useApiModalHandler } from '@/hooks/useApiModalHandler';

interface ActionButtonsProps {
  resourceType?: 'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'directory' | 'dictionnaire-juridique' | 'terminologie-specialisee';
}

export function ActionButtons({ resourceType = 'ouvrage' }: ActionButtonsProps) {
  const { showApiModal, openApiModal, closeApiModal } = useApiModalHandler();

  const handleAddNew = () => {
    console.log('Opening add library resource form:', resourceType);
    
    // Déclencher l'événement directement
    const event = new CustomEvent('open-library-form', {
      detail: { resourceType }
    });
    window.dispatchEvent(event);
  };

  const handleEnrichment = () => {
    console.log('Opening enrichment with file import from library action buttons...');
    
    // Déclencher l'événement d'import directement
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'import',
        title: 'Importer des fichiers',
        data: { acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'] }
      }
    });
    window.dispatchEvent(event);
  };

  const handleApiConfig = () => {
    console.log('Opening API configuration for:', resourceType);
    openApiModal('library');
  };

  return (
    <>
      <div className="flex justify-center gap-3 mb-6">
        <Button className="gap-2 bg-teal-600 hover:bg-teal-700" onClick={handleAddNew}>
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
        <Button variant="outline" className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50" onClick={handleEnrichment}>
          <Upload className="w-4 h-4" />
          Enrichir
        </Button>
        <Button variant="outline" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50" onClick={handleApiConfig}>
          <Settings className="w-4 h-4" />
          API
        </Button>
      </div>

      <ApiImportModal
        isOpen={showApiModal}
        onClose={closeApiModal}
        context="library"
      />
    </>
  );
}

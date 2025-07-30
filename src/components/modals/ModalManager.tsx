
// @ts-nocheck
import React from 'react';
import { useToast } from '@/hooks/use-toast';

// Import des modales spécialisées
import { PDFViewerModal } from './specialized/PDFViewerModal';
import { ComparisonModal } from './specialized/ComparisonModal';
import { FilterModal } from './specialized/FilterModal';

export function ModalManager() {
  const { toast } = useToast();
  
  // État local simplifié pour les modales
  const [modals, setModals] = React.useState({
    pdfViewer: { isOpen: false },
    comparison: { isOpen: false },
    filter: { isOpen: false }
  });

  const closeModal = (modalName: string) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { isOpen: false }
    }));
  };

  const openModal = (modalName: string, data?: any) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { isOpen: true, data }
    }));
  };

  return (
    <>
      <PDFViewerModal
        isOpen={modals.pdfViewer?.isOpen || false}
        onClose={() => closeModal('pdfViewer')}
        pdfUrl={modals.pdfViewer?.data?.url || ''}
        title={modals.pdfViewer?.data?.title || 'Document PDF'}
      />
      
      <ComparisonModal
        isOpen={modals.comparison?.isOpen || false}
        onClose={() => closeModal('comparison')}
        documents={modals.comparison?.data?.documents || []}
      />
      
      <FilterModal
        isOpen={modals.filter?.isOpen || false}
        onClose={() => closeModal('filter')}
        onApply={(filters) => {
          modals.filter?.data?.onApply?.(filters);
          closeModal('filter');
        }}
        initialFilters={modals.filter?.data?.initialFilters || {}}
      />
    </>
  );
}

// Hook simplifié pour compatibilité
export function useModalManager() {
  return {
    openModal: () => {},
    closeModal: () => {},
    modals: {}
  };
}

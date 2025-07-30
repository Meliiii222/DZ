
// @ts-nocheck
import React from 'react';
import { useUnifiedModalContext } from './UnifiedModalProvider';
import { PDFViewerModal } from '../specialized/PDFViewerModal';
import { ComparisonModal } from '../specialized/ComparisonModal';
import { FilterModal } from '../specialized/FilterModal';
import { ExportModal } from '../ExportModal';
import { ImportModal } from '../ImportModal';
import { FeedbackModal } from '../FeedbackModal';
import { AdvancedSearchModal } from '../AdvancedSearchModal';
import { ManagementModal } from '../ManagementModal';
import { AlertManagementModal } from '../AlertManagementModal';
import { UserManagementModal } from '../UserManagementModal';

export function UnifiedModalRenderer() {
  const { modals, closeModal } = useUnifiedModalContext();

  return (
    <>
      <PDFViewerModal
        isOpen={modals.pdfViewer?.isOpen || false}
        onClose={() => closeModal('pdfViewer')}
        data={modals.pdfViewer?.data || { title: 'Document PDF' }}
      />
      
      <ComparisonModal
        isOpen={modals.comparison?.isOpen || false}
        onClose={() => closeModal('comparison')}
        data={modals.comparison?.data || { items: [] }}
        onExport={(items) => {
          console.log('Export comparison:', items);
        }}
      />
      
      <FilterModal
        isOpen={modals.filter?.isOpen || false}
        onClose={() => closeModal('filter')}
        data={modals.filter?.data || { type: 'general' }}
        onFiltersApply={(filters) => {
          console.log('Filters applied:', filters);
        }}
      />

      <ExportModal
        isOpen={modals.export?.isOpen || false}
        onClose={() => closeModal('export')}
        data={modals.export?.data?.data || []}
        filename={modals.export?.data?.filename || 'export'}
      />

      <ImportModal
        isOpen={modals.import?.isOpen || false}
        onClose={() => closeModal('import')}
        acceptedTypes={modals.import?.data?.acceptedTypes || ['.csv', '.xlsx']}
        onImport={(files) => {
          console.log('Import files:', files);
          closeModal('import');
        }}
      />

      <FeedbackModal
        isOpen={modals.feedback?.isOpen || false}
        onClose={() => closeModal('feedback')}
        type={modals.feedback?.data?.type || 'feedback'}
        itemTitle={modals.feedback?.data?.itemTitle}
      />

      <AdvancedSearchModal
        isOpen={modals.advancedSearch?.isOpen || false}
        onClose={() => closeModal('advancedSearch')}
        onSearch={(criteria) => {
          console.log('Advanced search:', criteria);
          closeModal('advancedSearch');
        }}
      />

      <ManagementModal
        isOpen={modals.management?.isOpen || false}
        onClose={() => closeModal('management')}
        type={modals.management?.data?.type || 'domain'}
        onSave={(data) => {
          console.log('Management saved:', data);
          closeModal('management');
        }}
      />

      <AlertManagementModal
        isOpen={modals.alertManagement?.isOpen || false}
        onClose={() => closeModal('alertManagement')}
        alert={modals.alertManagement?.alert}
        onSave={(alertData) => {
          console.log('Alert saved:', alertData);
          closeModal('alertManagement');
        }}
      />

      <UserManagementModal
        isOpen={modals.userManagement?.isOpen || false}
        onClose={() => closeModal('userManagement')}
        user={modals.userManagement?.user}
        action={modals.userManagement?.action || 'create'}
        onSave={(userData) => {
          console.log('User saved:', userData);
          closeModal('userManagement');
        }}
      />
    </>
  );
}

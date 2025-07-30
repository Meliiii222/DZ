
import { useDocumentActions } from './useDocumentActions';
import { useModalActions } from './useModalActions';
import { useFormActions } from './useFormActions';
import { useApprovalActions } from './useApprovalActions';

export function useGlobalActions() {
  const documentActions = useDocumentActions();
  const modalActions = useModalActions();
  const formActions = useFormActions();
  const approvalActions = useApprovalActions();

  // Combine isProcessing states from different hooks
  const isProcessing = documentActions.isProcessing || approvalActions.isProcessing;

  return {
    // Document actions
    handlePDFView: documentActions.handlePDFView,
    handleShare: documentActions.handleShare,
    handleDownload: documentActions.handleDownload,
    handleImport: documentActions.handleImport,
    handleExport: documentActions.handleExport,

    // Modal actions
    handleFilter: modalActions.handleFilter,
    handleComparison: modalActions.handleComparison,
    handleFeedback: modalActions.handleFeedback,
    handleAnalysis: modalActions.handleAnalysis,
    handleManagement: modalActions.handleManagement,

    // Form actions
    handleAddLegalText: formActions.handleAddLegalText,
    handleAddProcedure: formActions.handleAddProcedure,
    handleAddNews: formActions.handleAddNews,
    handleAddLibraryResource: formActions.handleAddLibraryResource,

    // Approval actions
    handleExamine: approvalActions.handleExamine,
    handleApprove: approvalActions.handleApprove,
    handleReject: approvalActions.handleReject,
    handleLike: approvalActions.handleLike,

    // Combined processing state
    isProcessing
  };
}

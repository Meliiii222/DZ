// @ts-nocheck
import { ActionType } from '../types/actionTypes';

// Simple action handlers with full suppressions
export const actionHandlers = {
  handlePDFView: (item, data) => console.log('PDF View:', item, data),
  handleShare: (item, data) => console.log('Share:', item, data),
  handleFilter: (item, data) => console.log('Filter:', item, data),
  handleDownload: (item, data) => console.log('Download:', item, data),
  handleComparison: (items) => console.log('Compare:', items),
  handleFeedback: (item) => console.log('Feedback:', item),
  handleImport: (data) => console.log('Import:', data),
  handleExport: (data) => console.log('Export:', data),
  handleExamine: (item) => console.log('Examine:', item),
  handleReject: (item) => console.log('Reject:', item),
  handleApprove: (item) => console.log('Approve:', item),
  handleLike: (item) => console.log('Like:', item),
  handleAddLegalText: (data) => console.log('Add Legal Text:', data),
  handleManagement: (type, data) => console.log('Management:', type, data),
  handleGenericAction: (type, item) => console.log('Generic Action:', type, item)
};

// Wrapper function for action execution
export const executeAction = (actionType, itemTitle, data, handlers = actionHandlers) => {
  try {
    switch (actionType) {
      case 'pdf':
      case 'voir':
      case 'consulter':
      case 'détails':
        handlers.handlePDFView(itemTitle || 'Document', data?.pdfUrl);
        break;
      case 'partager':
      case 'partager-ressource':
        handlers.handleShare(itemTitle || 'Contenu', data?.url);
        break;
      case 'filtres':
      case 'filtrer-date':
        handlers.handleFilter(data?.type || 'general');
        break;
      case 'télécharger':
      case 'télécharger-pdf':
        handlers.handleDownload(itemTitle || 'document.pdf', data?.url);
        break;
      case 'comparer':
      case 'comparer-textes':
        handlers.handleComparison(data?.items || []);
        break;
      case 'donner-avis':
      case 'évaluer':
        handlers.handleFeedback(itemTitle || 'Element');
        break;
      default:
        console.log('Action non reconnue:', actionType);
    }
  } catch (error) {
    console.error('Erreur lors de l\'exécution de l\'action:', error);
  }
};

// Create action handler function
export const createActionHandler = (actionType: ActionType, itemId: string, itemTitle: string, data?: any, customHandler?: (...args: any[]) => any) => {
  return (event?: React.MouseEvent | MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (customHandler) {
      customHandler(event);
      return;
    }
    
    executeAction(actionType, itemTitle, { ...data, itemId });
  };
};

export default actionHandlers;
// Utility functions for button onClick handlers

import { log } from './securityLogger';
import { 
  openTimelineExportModal, 
  openAdvancedFiltersModal, 
  openStatisticsModal,
  openAlertsConfigModal,
  openKnowledgeGraphModal,
  openDataImportModal,
  openAIAnalysisModal,
  openDebateParticipationModal,
  openWorkflowModal,
  openApprovalTasksModal,
  openApprovalHistoryModal,
  openFavoriteFiltersModal,
  openClearFavoritesModal,
  openTermSuggestionModal,
  openLegalQuizModal,
  openForumReplyModal,
  openUserDiscussionsModal,
  openPopularTopicsModal,
  openOnlineExpertsModal,
  openForumRulesModal,
  openDocumentSuggestionModal,
  openAccessRequestModal,
  openDocumentPreviewModal,
  openAutoWritingModal,
  openCoherenceCheckModal,
  openLegalTranslationModal,
  openDeduplicationModal,
  openNewsletterModal,
  openNewsArchiveModal,
  openCommentModal,
  openFullScreenModal,
  openPrintModal
} from './modalManager';

export const createButtonHandler = (eventType: string, details: any = {}) => {
  return () => {
    log.debug(`Button clicked: ${eventType}`, details, 'ButtonUtils');
    window.dispatchEvent(new CustomEvent(eventType, { detail: details }));
  };
};

// Common button handlers
export const buttonHandlers = {
  // Generic handlers with real functionality
  generic: (buttonText: string, action: string, context: string) => {
    return () => {
      log.debug(`Button clicked: ${buttonText}`, { action, context }, 'ButtonUtils');
      
      // Route vers la bonne modale selon l'action et le contexte
      switch (action) {
        case 'Export de la timeline':
          openTimelineExportModal();
          break;
        case 'Ouverture des filtres avancés':
          openAdvancedFiltersModal(context);
          break;
        case 'Affichage des statistiques':
          openStatisticsModal(context);
          break;
        case 'Configuration d\'alertes':
        case 'Configuration d\'alertes personnalisées':
          openAlertsConfigModal();
          break;
        case 'Nouveau graphe de connaissances':
          openKnowledgeGraphModal();
          break;
        case 'Import de données externes':
          openDataImportModal();
          break;
        case 'Analyse automatique par IA':
          openAIAnalysisModal();
          break;
        case 'Rejoindre la discussion':
          openDebateParticipationModal(buttonText.replace('Participer au débat: ', ''));
          break;
        case 'Création d\'un nouveau workflow':
          openWorkflowModal('new');
          break;
        case 'Modification du workflow':
          openWorkflowModal('edit');
          break;
        case 'Affichage de mes tâches d\'approbation':
          openApprovalTasksModal();
          break;
        case 'Consultation de l\'historique':
          openApprovalHistoryModal();
          break;
        case 'Ouverture des filtres':
          openFavoriteFiltersModal();
          break;
        case 'Suppression de tous les favoris':
          openClearFavoritesModal();
          break;
        case 'Suggestion de terme manquant':
          openTermSuggestionModal();
          break;
        case 'Lancement du quiz juridique':
          openLegalQuizModal();
          break;
        case 'Réponse au sujet':
          openForumReplyModal(buttonText.replace('Répondre: ', ''));
          break;
        case 'Mes sujets de discussion':
          openUserDiscussionsModal();
          break;
        case 'Sujets les plus populaires':
          openPopularTopicsModal();
          break;
        case 'Liste des experts connectés':
          openOnlineExpertsModal();
          break;
        case 'Consultation des règles':
          openForumRulesModal();
          break;
        case 'Suggestion d\'ajout de document':
          openDocumentSuggestionModal();
          break;
        case 'Demande d\'accès à un document':
          openAccessRequestModal();
          break;
        case 'Prévisualisation du compositeur':
          openDocumentPreviewModal();
          break;
        case 'Démarrage de la rédaction IA':
          openAutoWritingModal();
          break;
        case 'Analyse de cohérence automatique':
          openCoherenceCheckModal();
          break;
        case 'Traduction automatique spécialisée':
          openLegalTranslationModal();
          break;
        case 'Sélection de tous les doublons':
        case 'Suppression des doublons sélectionnés':
        case 'Suppression d\'un doublon':
        case 'Prévisualisation du groupe':
        case 'Suppression du groupe de doublons':
          openDeduplicationModal();
          break;
        case 'Abonnement à la newsletter juridique':
          openNewsletterModal();
          break;
        case 'Consultation des archives':
          openNewsArchiveModal();
          break;
        case 'Ajout de commentaire':
          openCommentModal(buttonText.replace('Commenter: ', ''));
          break;
        case 'Mode plein écran':
          openFullScreenModal(buttonText.replace('Plein écran: ', ''));
          break;
        case 'Impression du document':
          openPrintModal(buttonText.replace('Imprimer: ', ''));
          break;
        default:
          // Pour les actions non implémentées, ouvrir une modale générique
          window.dispatchEvent(new CustomEvent('generic-action', { 
            detail: { buttonText, action, context } 
          }));
          break;
      }
    };
  },

  // Document actions
  viewDocument: (id: string, title: string, type: string = 'document') =>
    createButtonHandler('view-legal-text', { textId: id, title, type }),

  downloadDocument: (id: string, title: string, format: string = 'pdf') =>
    createButtonHandler('download-legal-text', { textId: id, title, format }),

  shareDocument: (id: string, title: string) =>
    createButtonHandler('share-legal-text', { textId: id, title }),

  // Search and browse
  browseType: (typeId: string, typeName: string) =>
    createButtonHandler('browse-legal-type', { typeId, typeName }),

  search: (searchType: string, query: string) =>
    createButtonHandler('immersive-search', { searchType, query }),

  // Form actions
  openForm: (formType: string, title: string) =>
    createButtonHandler('open-form-modal', { formType, title }),

  submitForm: (formType: string, title: string) =>
    createButtonHandler('submit-form', { formType, title }),

  // Messages
  markRead: (messageId: string) =>
    createButtonHandler('mark-message-read', { messageId }),

  deleteMessage: (messageId: string) =>
    createButtonHandler('delete-message', { messageId }),

  // Collaboration
  joinForum: (forumType: string) =>
    createButtonHandler('join-forum', { forumType }),

  startDiscussion: (topic: string) =>
    createButtonHandler('start-discussion', { topic }),

  // Saved searches
  executeSavedSearch: (searchName: string) =>
    createButtonHandler('execute-saved-search', { searchName }),

  editSavedSearch: (searchName: string) =>
    createButtonHandler('edit-saved-search', { searchName }),

  deleteSavedSearch: (searchName: string) =>
    createButtonHandler('delete-saved-search', { searchName }),

  // Favorites
  addToFavorites: (itemType: string, itemName: string) =>
    createButtonHandler('add-to-favorites', { itemType, itemName }),

  removeFromFavorites: (itemName: string) =>
    createButtonHandler('remove-from-favorites', { itemName }),

  // News and resources
  readNews: (newsTitle: string) =>
    createButtonHandler('read-news', { newsTitle }),

  downloadResource: (resourceName: string, resourceType: string) =>
    createButtonHandler('download-resource', { resourceName, resourceType }),

  // Dictionary
  searchDictionary: (term: string) =>
    createButtonHandler('search-dictionary', { term }),

  // Timeline
  viewTimelineItem: (itemTitle: string) =>
    createButtonHandler('view-timeline-item', { itemTitle }),

  compareVersions: (documentTitle: string) =>
    createButtonHandler('compare-versions', { documentTitle }),

  // Approval workflow
  approveDocument: (documentTitle: string) =>
    createButtonHandler('approve-document', { documentTitle }),

  rejectDocument: (documentTitle: string) =>
    createButtonHandler('reject-document', { documentTitle }),

  requestChanges: (documentTitle: string) =>
    createButtonHandler('request-changes', { documentTitle })
};
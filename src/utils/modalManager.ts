// Gestionnaire centralisé des modales fonctionnelles pour l'application
import React, { useState, useCallback } from 'react';

export interface ModalData {
  type: string;
  title: string;
  data?: any;
  onSave?: (data: any) => void;
  onClose?: () => void;
}

class ModalManager {
  private listeners: ((modal: ModalData | null) => void)[] = [];
  private currentModal: ModalData | null = null;

  subscribe(callback: (modal: ModalData | null) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  openModal(modal: ModalData) {
    this.currentModal = modal;
    this.listeners.forEach(listener => listener(modal));
  }

  closeModal() {
    this.currentModal = null;
    this.listeners.forEach(listener => listener(null));
  }

  getCurrentModal() {
    return this.currentModal;
  }
}

export const modalManager = new ModalManager();

// Hook pour utiliser le gestionnaire de modales
export const useModalManager = () => {
  const [currentModal, setCurrentModal] = useState<ModalData | null>(null);

  const openModal = useCallback((modal: ModalData) => {
    modalManager.openModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    modalManager.closeModal();
  }, []);

  // Subscribe to modal changes
  React.useEffect(() => {
    return modalManager.subscribe(setCurrentModal);
  }, []);

  return {
    currentModal,
    openModal,
    closeModal
  };
};

// Fonctions d'ouverture de modales spécifiques
export const openTimelineExportModal = () => {
  modalManager.openModal({
    type: 'timeline-export',
    title: 'Exporter la Timeline',
    data: { formats: ['PDF', 'Excel', 'CSV'], dateRange: 'all' }
  });
};

export const openAdvancedFiltersModal = (section: string) => {
  modalManager.openModal({
    type: 'advanced-filters',
    title: `Filtres Avancés - ${section}`,
    data: { section }
  });
};

export const openStatisticsModal = (section: string) => {
  modalManager.openModal({
    type: 'statistics',
    title: `Statistiques - ${section}`,
    data: { section }
  });
};

export const openAlertsConfigModal = () => {
  modalManager.openModal({
    type: 'alerts-config',
    title: 'Configuration des Alertes',
    data: {}
  });
};

export const openKnowledgeGraphModal = () => {
  modalManager.openModal({
    type: 'knowledge-graph',
    title: 'Créer un Graphe de Connaissances',
    data: {}
  });
};

export const openDataImportModal = () => {
  modalManager.openModal({
    type: 'data-import',
    title: 'Importer des Données',
    data: { formats: ['JSON', 'XML', 'CSV', 'RDF'] }
  });
};

export const openAIAnalysisModal = () => {
  modalManager.openModal({
    type: 'ai-analysis',
    title: 'Analyse Automatique par IA',
    data: {}
  });
};

export const openDebateParticipationModal = (debateTitle: string) => {
  modalManager.openModal({
    type: 'debate-participation',
    title: `Participer au débat: ${debateTitle}`,
    data: { debateTitle }
  });
};

export const openWorkflowModal = (workflowType: string = 'new') => {
  modalManager.openModal({
    type: 'workflow',
    title: workflowType === 'new' ? 'Nouveau Workflow' : 'Modifier Workflow',
    data: { workflowType }
  });
};

export const openApprovalTasksModal = () => {
  modalManager.openModal({
    type: 'approval-tasks',
    title: 'Mes Tâches d\'Approbation',
    data: {}
  });
};

export const openApprovalHistoryModal = () => {
  modalManager.openModal({
    type: 'approval-history',
    title: 'Historique des Approbations',
    data: {}
  });
};

export const openFavoriteFiltersModal = () => {
  modalManager.openModal({
    type: 'favorite-filters',
    title: 'Filtrer les Favoris',
    data: {}
  });
};

export const openClearFavoritesModal = () => {
  modalManager.openModal({
    type: 'clear-favorites',
    title: 'Vider les Favoris',
    data: {}
  });
};

export const openTermSuggestionModal = () => {
  modalManager.openModal({
    type: 'term-suggestion',
    title: 'Suggérer un Terme Manquant',
    data: {}
  });
};

export const openLegalQuizModal = () => {
  modalManager.openModal({
    type: 'legal-quiz',
    title: 'Quiz Juridique',
    data: {}
  });
};

export const openForumReplyModal = (topicTitle: string) => {
  modalManager.openModal({
    type: 'forum-reply',
    title: `Répondre à: ${topicTitle}`,
    data: { topicTitle }
  });
};

export const openUserDiscussionsModal = () => {
  modalManager.openModal({
    type: 'user-discussions',
    title: 'Mes Discussions',
    data: {}
  });
};

export const openPopularTopicsModal = () => {
  modalManager.openModal({
    type: 'popular-topics',
    title: 'Sujets Populaires',
    data: {}
  });
};

export const openOnlineExpertsModal = () => {
  modalManager.openModal({
    type: 'online-experts',
    title: 'Experts en Ligne',
    data: {}
  });
};

export const openForumRulesModal = () => {
  modalManager.openModal({
    type: 'forum-rules',
    title: 'Règles du Forum',
    data: {}
  });
};

export const openDocumentSuggestionModal = () => {
  modalManager.openModal({
    type: 'document-suggestion',
    title: 'Suggérer un Document',
    data: {}
  });
};

export const openAccessRequestModal = () => {
  modalManager.openModal({
    type: 'access-request',
    title: 'Demander l\'Accès à un Document',
    data: {}
  });
};

export const openDocumentPreviewModal = () => {
  modalManager.openModal({
    type: 'document-preview',
    title: 'Prévisualiser le Document',
    data: {}
  });
};

export const openAutoWritingModal = () => {
  modalManager.openModal({
    type: 'auto-writing',
    title: 'Rédaction Automatique',
    data: {}
  });
};

export const openCoherenceCheckModal = () => {
  modalManager.openModal({
    type: 'coherence-check',
    title: 'Vérification de Cohérence',
    data: {}
  });
};

export const openLegalTranslationModal = () => {
  modalManager.openModal({
    type: 'legal-translation',
    title: 'Traduction Juridique',
    data: {}
  });
};

export const openDeduplicationModal = () => {
  modalManager.openModal({
    type: 'deduplication',
    title: 'Gestion des Doublons',
    data: {}
  });
};

export const openNewsletterModal = () => {
  modalManager.openModal({
    type: 'newsletter',
    title: 'S\'abonner à la Newsletter',
    data: {}
  });
};

export const openNewsArchiveModal = () => {
  modalManager.openModal({
    type: 'news-archive',
    title: 'Archive des Actualités',
    data: {}
  });
};

export const openCommentModal = (itemTitle: string) => {
  modalManager.openModal({
    type: 'comment',
    title: `Commenter: ${itemTitle}`,
    data: { itemTitle }
  });
};

export const openFullScreenModal = (documentTitle: string) => {
  modalManager.openModal({
    type: 'fullscreen',
    title: `Mode Plein Écran: ${documentTitle}`,
    data: { documentTitle }
  });
};

export const openPrintModal = (documentTitle: string) => {
  modalManager.openModal({
    type: 'print',
    title: `Imprimer: ${documentTitle}`,
    data: { documentTitle }
  });
};
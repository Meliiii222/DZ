// Handlers spécialisés pour les fonctionnalités spécifiques de l'application
import { openFunctionalModal } from '@/components/modals/FunctionalModalSystem';

// Handler pour les guides de ressources procédurales
export function handleConsultGuide(guideName: string) {
  openFunctionalModal('guide', { 
    title: guideName,
    description: `Guide détaillé pour ${guideName}`,
    category: 'Procédures administratives'
  });
}

// Handler pour le téléchargement de formulaires
export function handleDownloadForms(categoryTitle: string) {
  openFunctionalModal('formulaire', { 
    title: `Formulaires ${categoryTitle}`,
    description: `Formulaires officiels pour ${categoryTitle}`,
    category: categoryTitle
  });
}

// Handler pour les modèles de documents
export function handleBrowseTemplates(categoryTitle: string) {
  openFunctionalModal('template', { 
    title: `Modèles ${categoryTitle}`,
    description: `Modèles de documents pour ${categoryTitle}`,
    category: categoryTitle
  });
}

// Handler pour les actions de features
export function handleFeatureAction(action: string) {
  const actionMapping = {
    'customize': 'settings',
    'export': 'document',
    'share': 'document',
    'edit': 'document',
    'preview': 'document'
  };
  
  const type = actionMapping[action as keyof typeof actionMapping] || 'document';
  openFunctionalModal(type, { 
    title: `Action: ${action}`,
    action: action
  });
}

// Handler pour les recherches API
export function handleSearchApi(searchTerm: string) {
  openFunctionalModal('search', { 
    title: 'Recherche API',
    query: searchTerm,
    description: `Recherche dans la documentation API: ${searchTerm}`
  });
}

// Handler pour le téléchargement de ressources
export function handleDownloadResource(resourceName: string, type: string) {
  openFunctionalModal('document', { 
    title: resourceName,
    description: `${type}: ${resourceName}`,
    category: 'Ressources API'
  });
}

// Handler pour les recherches dans les guides utilisateur
export function handleSearchUserGuide(searchTerm: string) {
  openFunctionalModal('search', { 
    title: 'Recherche Guide Utilisateur',
    query: searchTerm,
    description: `Recherche dans les guides: ${searchTerm}`
  });
}

// Handler pour la lecture d'articles
export function handleReadArticle(article: any) {
  openFunctionalModal('document', { 
    title: article.title || article.name || 'Article',
    description: article.description || 'Article du guide utilisateur',
    category: 'Guide utilisateur'
  });
}

// Handler pour le téléchargement de guides
export function handleDownloadGuide(title: string) {
  openFunctionalModal('document', { 
    title: title,
    description: `Guide: ${title}`,
    category: 'Documentation'
  });
}

// Handler pour la lecture de vidéos/tutoriels
export function handlePlayVideo(article: any) {
  openFunctionalModal('video', { 
    title: article.title || article.name || 'Tutoriel vidéo',
    description: article.description || 'Tutoriel vidéo explicatif',
    category: 'Formation'
  });
}

// Handler pour les recherches sémantiques
export function handleSemanticSearch(query: string) {
  openFunctionalModal('search', { 
    title: 'Recherche Sémantique',
    query: query,
    description: `Recherche sémantique: ${query}`,
    searchType: 'semantic'
  });
}

// Handler pour les recherches par mots-clés
export function handleKeywordSearch(query: string) {
  openFunctionalModal('search', { 
    title: 'Recherche par Mots-clés',
    query: query,
    description: `Recherche par mots-clés: ${query}`,
    searchType: 'keyword'
  });
}

// Handler pour les recherches IA
export function handleAISearch(query: string) {
  openFunctionalModal('search', { 
    title: 'Recherche Intelligente IA',
    query: query,
    description: `Recherche IA avancée: ${query}`,
    searchType: 'ai'
  });
}

// Handler pour la navigation par type de document
export function handleBrowseType(type: string, label: string) {
  openFunctionalModal('search', { 
    title: `Navigation ${label}`,
    description: `Parcourir tous les documents de type: ${label}`,
    documentType: type,
    searchType: 'browse'
  });
}

// Handler pour l'affichage de messages
export function handleMessageClick(message: any) {
  openFunctionalModal('document', { 
    title: message.title || 'Message',
    description: message.content || message.text || 'Contenu du message',
    category: 'Messages',
    author: message.sender || message.from
  });
}

// Handler pour les étoiles/favoris
export function handleStar(templateId: string) {
  // Simuler l'ajout aux favoris
  setTimeout(() => {
    const event = new CustomEvent('toast-message', {
      detail: {
        title: "Ajouté aux favoris",
        description: "Cet élément a été ajouté à vos favoris.",
      }
    });
    window.dispatchEvent(event);
  }, 100);
}

// Handler pour l'aperçu d'éléments
export function handlePreview(item: any) {
  openFunctionalModal('document', { 
    title: item.title || item.name || 'Aperçu',
    description: item.description || 'Aperçu de l\'élément',
    category: 'Aperçu',
    isPreview: true
  });
}

// Handler pour l'ajout d'éléments aux textes juridiques
export function handleAddToLegalTexts(template: any) {
  openFunctionalModal('document', { 
    title: `Ajout: ${template.title || template.name}`,
    description: 'Ajout de ce modèle aux textes juridiques',
    category: 'Textes Juridiques',
    action: 'add'
  });
}

// Handler pour l'ajout d'éléments aux procédures
export function handleAddToProcedures(template: any) {
  openFunctionalModal('document', { 
    title: `Ajout: ${template.title || template.name}`,
    description: 'Ajout de ce modèle aux procédures administratives',
    category: 'Procédures',
    action: 'add'
  });
}

// Handler pour l'exportation de modèles
export function handleExportTemplate(template: any) {
  openFunctionalModal('document', { 
    title: `Export: ${template.title || template.name}`,
    description: 'Exportation de ce modèle',
    category: 'Export',
    action: 'export'
  });
}

// Installer tous les handlers spécialisés dans le scope global
export function installSpecializedHandlers() {
  const globalScope = window as any;
  
  globalScope.specializedHandlers = {
    handleConsultGuide,
    handleDownloadForms,
    handleBrowseTemplates,
    handleFeatureAction,
    handleSearchApi,
    handleDownloadResource,
    handleSearchUserGuide,
    handleReadArticle,
    handleDownloadGuide,
    handlePlayVideo,
    handleSemanticSearch,
    handleKeywordSearch,
    handleAISearch,
    handleBrowseType,
    handleMessageClick,
    handleStar,
    handlePreview,
    handleAddToLegalTexts,
    handleAddToProcedures,
    handleExportTemplate
  };
  
  console.log('🔧 Handlers spécialisés installés dans le scope global');
}
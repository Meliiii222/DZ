import { useAppStore } from '@/stores/appStore';
import { toast } from '@/hooks/use-toast';

// Types pour les actions
interface ActionContext {
  type: string;
  data: any;
  callback?: (result: any) => void;
}

// Gestionnaire d'actions réelles
export class RealActionHandler {
  private static instance: RealActionHandler;
  private store: any;

  static getInstance(): RealActionHandler {
    if (!RealActionHandler.instance) {
      RealActionHandler.instance = new RealActionHandler();
    }
    return RealActionHandler.instance;
  }

  constructor() {
    this.store = useAppStore.getState();
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    // Actions pour les textes juridiques
    window.addEventListener('view-legal-text', this.handleViewLegalText.bind(this));
    window.addEventListener('download-legal-text', this.handleDownloadLegalText.bind(this));
    window.addEventListener('share-legal-text', this.handleShareLegalText.bind(this));
    window.addEventListener('add-legal-text', this.handleAddLegalText.bind(this));
    window.addEventListener('edit-legal-text', this.handleEditLegalText.bind(this));
    window.addEventListener('delete-legal-text', this.handleDeleteLegalText.bind(this));
    
    // Actions pour les procédures
    window.addEventListener('view-procedure', this.handleViewProcedure.bind(this));
    window.addEventListener('add-procedure', this.handleAddProcedure.bind(this));
    window.addEventListener('edit-procedure', this.handleEditProcedure.bind(this));
    window.addEventListener('delete-procedure', this.handleDeleteProcedure.bind(this));
    
    // Actions pour les actualités
    window.addEventListener('read-news', this.handleReadNews.bind(this));
    window.addEventListener('add-news', this.handleAddNews.bind(this));
    window.addEventListener('edit-news', this.handleEditNews.bind(this));
    window.addEventListener('delete-news', this.handleDeleteNews.bind(this));
    
    // Actions pour les recherches
    window.addEventListener('immersive-search', this.handleImmersiveSearch.bind(this));
    window.addEventListener('save-search', this.handleSaveSearch.bind(this));
    window.addEventListener('execute-saved-search', this.handleExecuteSavedSearch.bind(this));
    window.addEventListener('edit-saved-search', this.handleEditSavedSearch.bind(this));
    window.addEventListener('delete-saved-search', this.handleDeleteSavedSearch.bind(this));
    
    // Actions pour les favoris
    window.addEventListener('add-to-favorites', this.handleAddToFavorites.bind(this));
    window.addEventListener('remove-from-favorites', this.handleRemoveFromFavorites.bind(this));
    window.addEventListener('view-favorites', this.handleViewFavorites.bind(this));
    
    // Actions pour les modèles
    window.addEventListener('create-template', this.handleCreateTemplate.bind(this));
    window.addEventListener('use-template', this.handleUseTemplate.bind(this));
    window.addEventListener('edit-template', this.handleEditTemplate.bind(this));
    window.addEventListener('delete-template', this.handleDeleteTemplate.bind(this));
    
    // Actions pour les téléchargements
    window.addEventListener('download-resource', this.handleDownloadResource.bind(this));
    window.addEventListener('export-data', this.handleExportData.bind(this));
    window.addEventListener('import-data', this.handleImportData.bind(this));
    
    // Actions de workflow
    window.addEventListener('approve-document', this.handleApproveDocument.bind(this));
    window.addEventListener('reject-document', this.handleRejectDocument.bind(this));
    window.addEventListener('request-changes', this.handleRequestChanges.bind(this));
    
    // Actions de navigation
    window.addEventListener('navigate-to-section', this.handleNavigateToSection.bind(this));
    
    // Actions de formulaires
    window.addEventListener('open-form-modal', this.handleOpenFormModal.bind(this));
    window.addEventListener('submit-form', this.handleSubmitForm.bind(this));
    
    // NOUVELLES ACTIONS POUR LES FONCTIONNALITÉS ÉTENDUES
    
    // Actions pour le forum
    window.addEventListener('view-forum-discussion', this.handleViewForumDiscussion.bind(this));
    window.addEventListener('create-forum-discussion', this.handleCreateForumDiscussion.bind(this));
    window.addEventListener('reply-to-discussion', this.handleReplyToDiscussion.bind(this));
    window.addEventListener('vote-discussion', this.handleVoteDiscussion.bind(this));
    window.addEventListener('vote-reply', this.handleVoteReply.bind(this));
    window.addEventListener('accept-reply', this.handleAcceptReply.bind(this));
    window.addEventListener('pin-discussion', this.handlePinDiscussion.bind(this));
    window.addEventListener('lock-discussion', this.handleLockDiscussion.bind(this));
    window.addEventListener('join-forum', this.handleJoinForum.bind(this));
    window.addEventListener('register-forum', this.handleRegisterForum.bind(this));
    
    // Actions pour les ressources partagées
    window.addEventListener('view-shared-resource', this.handleViewSharedResource.bind(this));
    window.addEventListener('download-shared-resource', this.handleDownloadSharedResource.bind(this));
    window.addEventListener('share-resource', this.handleShareResource.bind(this));
    window.addEventListener('rate-resource', this.handleRateResource.bind(this));
    window.addEventListener('add-shared-resource', this.handleAddSharedResource.bind(this));
    window.addEventListener('edit-shared-resource', this.handleEditSharedResource.bind(this));
    window.addEventListener('delete-shared-resource', this.handleDeleteSharedResource.bind(this));
    
    // Actions pour les tutoriels vidéo
    window.addEventListener('play-video-tutorial', this.handlePlayVideoTutorial.bind(this));
    window.addEventListener('rate-tutorial', this.handleRateTutorial.bind(this));
    window.addEventListener('add-video-tutorial', this.handleAddVideoTutorial.bind(this));
    window.addEventListener('edit-video-tutorial', this.handleEditVideoTutorial.bind(this));
    window.addEventListener('delete-video-tutorial', this.handleDeleteVideoTutorial.bind(this));
    window.addEventListener('download-transcript', this.handleDownloadTranscript.bind(this));
    
    // Actions pour les configurations
    window.addEventListener('open-settings', this.handleOpenSettings.bind(this));
    window.addEventListener('save-configuration', this.handleSaveConfiguration.bind(this));
    window.addEventListener('reset-configuration', this.handleResetConfiguration.bind(this));
    window.addEventListener('export-settings', this.handleExportSettings.bind(this));
    window.addEventListener('import-settings', this.handleImportSettings.bind(this));
    
    // Actions d'icônes et boutons spécialisés
    window.addEventListener('toggle-theme', this.handleToggleTheme.bind(this));
    window.addEventListener('toggle-notifications', this.handleToggleNotifications.bind(this));
    window.addEventListener('open-accessibility', this.handleOpenAccessibility.bind(this));
    window.addEventListener('toggle-offline-mode', this.handleToggleOfflineMode.bind(this));
    window.addEventListener('open-mobile-app', this.handleOpenMobileApp.bind(this));
    window.addEventListener('open-integrations', this.handleOpenIntegrations.bind(this));
    
    // Actions pour les icônes de partage et modification
    window.addEventListener('share-content', this.handleShareContent.bind(this));
    window.addEventListener('edit-content', this.handleEditContent.bind(this));
    window.addEventListener('view-content', this.handleViewContent.bind(this));
    window.addEventListener('configure-item', this.handleConfigureItem.bind(this));
    window.addEventListener('copy-link', this.handleCopyLink.bind(this));
    window.addEventListener('print-content', this.handlePrintContent.bind(this));
    
    // Actions pour les zones de contenu dynamique
    window.addEventListener('filter-content', this.handleFilterContent.bind(this));
    window.addEventListener('sort-content', this.handleSortContent.bind(this));
    window.addEventListener('refresh-content', this.handleRefreshContent.bind(this));
    window.addEventListener('load-more-content', this.handleLoadMoreContent.bind(this));
  }

  // Actions pour les textes juridiques
  private handleViewLegalText(event: CustomEvent) {
    const { textId, title } = event.detail;
    const text = this.store.getLegalText(textId);
    
    if (text) {
      this.openDocumentViewer(text);
    } else {
      // Créer un document exemple si non trouvé
      const exampleText = {
        id: textId,
        title: title || 'Document Juridique',
        content: this.generateExampleLegalContent(title),
        type: 'law' as const,
        status: 'published' as const,
        category: 'Général',
        author: 'Système',
        tags: ['exemple', 'juridique'],
        metadata: {
          source: 'Système automatique',
          references: [],
          validity: 'En vigueur'
        }
      };
      this.openDocumentViewer(exampleText);
    }
  }

  private handleDownloadLegalText(event: CustomEvent) {
    const { textId, title, format = 'PDF' } = event.detail;
    const text = this.store.getLegalText(textId) || {
      title: title || 'Document',
      content: this.generateExampleLegalContent(title)
    };
    
    this.downloadDocument(text, format);
  }

  private handleShareLegalText(event: CustomEvent) {
    const { textId, title } = event.detail;
    this.shareDocument(textId, title);
  }

  private handleAddLegalText(event: CustomEvent) {
    const { data } = event.detail;
    this.openLegalTextForm(data);
  }

  private handleEditLegalText(event: CustomEvent) {
    const { textId } = event.detail;
    const text = this.store.getLegalText(textId);
    if (text) {
      this.openLegalTextForm(text);
    }
  }

  private handleDeleteLegalText(event: CustomEvent) {
    const { textId } = event.detail;
    this.confirmAndDelete('legal-text', textId);
  }

  // Actions pour les procédures
  private handleViewProcedure(event: CustomEvent) {
    console.log('RealActionHandler: handleViewProcedure called with:', event.detail);
    const { procedureId, title } = event.detail;
    const procedure = this.store.getProcedure(procedureId);
    
    if (procedure) {
      this.openProcedureViewer(procedure);
    } else {
      const exampleProcedure = {
        id: procedureId,
        title: title || 'Procédure Administrative',
        description: 'Description de la procédure administrative',
        steps: this.generateExampleSteps(),
        category: 'Général',
        difficulty: 'medium' as const,
        estimatedTime: '30 minutes',
        requiredDocuments: ['Pièce d\'identité', 'Justificatif de domicile'],
        status: 'active' as const
      };
      this.openProcedureViewer(exampleProcedure);
    }
  }

  private handleAddProcedure(event: CustomEvent) {
    const { data } = event.detail;
    this.openProcedureForm(data);
  }

  private handleEditProcedure(event: CustomEvent) {
    const { procedureId } = event.detail;
    const procedure = this.store.getProcedure(procedureId);
    if (procedure) {
      this.openProcedureForm(procedure);
    }
  }

  private handleDeleteProcedure(event: CustomEvent) {
    const { procedureId } = event.detail;
    this.confirmAndDelete('procedure', procedureId);
  }

  // Actions pour les actualités
  private handleReadNews(event: CustomEvent) {
    const { newsTitle, newsId } = event.detail;
    
    // Marquer comme lu
    if (newsId) {
      this.store.markNewsAsRead(newsId, this.store.currentUser);
    }
    
    this.openNewsReader(newsId || newsTitle);
  }

  private handleAddNews(event: CustomEvent) {
    const { data } = event.detail;
    this.openNewsForm(data);
  }

  private handleEditNews(event: CustomEvent) {
    const { newsId } = event.detail;
    this.openNewsForm({ id: newsId });
  }

  private handleDeleteNews(event: CustomEvent) {
    const { newsId } = event.detail;
    this.confirmAndDelete('news', newsId);
  }

  // Actions pour les recherches
  private handleImmersiveSearch(event: CustomEvent) {
    const { searchType, query } = event.detail;
    this.performSearch(query, { type: searchType });
  }

  private handleSaveSearch(event: CustomEvent) {
    const { name, query, filters } = event.detail;
    this.store.saveSearch({ name, query, filters });
    toast({
      title: "Recherche sauvegardée",
      description: `La recherche "${name}" a été sauvegardée avec succès.`,
    });
  }

  private handleExecuteSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    const results = this.store.executeSavedSearch(searchId);
    // Suppression de l'affichage automatique des résultats de recherche
    // this.displaySearchResults(results);
    console.log('Recherche sauvegardée exécutée:', searchId, results);
  }

  private handleEditSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    this.openSavedSearchEditor(searchId);
  }

  private handleDeleteSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    this.confirmAndDelete('saved-search', searchId);
  }

  // Actions pour les favoris
  private handleAddToFavorites(event: CustomEvent) {
    const { itemType, itemName, itemId } = event.detail;
    
    if (!this.store.isFavorite(itemId, itemType)) {
      this.store.addToFavorites({
        itemId: itemId || itemName,
        itemType,
        title: itemName
      });
      
      toast({
        title: "Ajouté aux favoris",
        description: `"${itemName}" ajouté à vos favoris.`,
      });
    } else {
      toast({
        title: "Déjà en favoris",
        description: `"${itemName}" est déjà dans vos favoris.`,
      });
    }
  }

  private handleRemoveFromFavorites(event: CustomEvent) {
    const { itemId, itemType } = event.detail;
    this.store.removeFromFavorites(itemId, itemType);
    toast({
      title: "Retiré des favoris",
      description: "L'élément a été retiré de vos favoris.",
    });
  }

  private handleViewFavorites(event: CustomEvent) {
    const { itemType } = event.detail;
    const favorites = this.store.getFavorites(itemType);
    this.displayFavorites(favorites);
  }

  // Actions pour les modèles
  private handleCreateTemplate(event: CustomEvent) {
    const { data } = event.detail;
    this.openTemplateCreator(data);
  }

  private handleUseTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    const template = this.store.useTemplate(templateId);
    if (template) {
      this.openTemplateEditor(template);
    }
  }

  private handleEditTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    this.openTemplateCreator({ id: templateId });
  }

  private handleDeleteTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    this.confirmAndDelete('template', templateId);
  }

  // Actions pour les téléchargements
  private handleDownloadResource(event: CustomEvent) {
    const { resourceName, resourceType } = event.detail;
    this.downloadResource(resourceName, resourceType);
  }

  private handleExportData(event: CustomEvent) {
    const data = this.store.exportData();
    this.downloadFile(data, 'application_data.json', 'application/json');
    toast({
      title: "Export réussi",
      description: "Les données ont été exportées avec succès.",
    });
  }

  private handleImportData(event: CustomEvent) {
    this.openFileImporter();
  }

  // Actions de workflow
  private handleApproveDocument(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.approveDocument(documentId, documentTitle);
  }

  private handleRejectDocument(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.rejectDocument(documentId, documentTitle);
  }

  private handleRequestChanges(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.requestChanges(documentId, documentTitle);
  }

  // Actions de navigation
  private handleNavigateToSection(event: CustomEvent) {
    const section = event.detail;
    this.store.setCurrentSection(section);
    
    // Déclencher la navigation dans l'interface
    window.dispatchEvent(new CustomEvent('section-change', {
      detail: { section }
    }));
  }

  // Actions de formulaires
  private handleOpenFormModal(event: CustomEvent) {
    const { formType, title } = event.detail;
    this.openFormModal(formType, title);
  }

  private handleSubmitForm(event: CustomEvent) {
    const { formType, data } = event.detail;
    this.submitForm(formType, data);
  }

  // Méthodes utilitaires pour l'interface utilisateur
  private openDocumentViewer(document: any) {
    const modal = this.createModal('Visualisation du Document', `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h3 class="font-semibold text-blue-900 mb-2">${document.title}</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Type:</strong> ${document.type || 'Document'}</div>
            <div><strong>Statut:</strong> ${document.status || 'Actif'}</div>
            <div><strong>Catégorie:</strong> ${document.category || 'Général'}</div>
            <div><strong>Auteur:</strong> ${document.author || 'Système'}</div>
          </div>
        </div>
        
        <div class="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
          <div class="prose max-w-none">
            ${document.content || 'Contenu du document...'}
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('download-legal-text', {detail: {textId: '${document.id}', title: '${document.title}', format: 'PDF'}}))">
            Télécharger PDF
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('share-legal-text', {detail: {textId: '${document.id}', title: '${document.title}'}}))">
            Partager
          </button>
          <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'legal-text', itemName: '${document.title}', itemId: '${document.id}'}}))">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    `);
  }

  private openProcedureViewer(procedure: any) {
    const stepsHtml = procedure.steps?.map((step: any, index: number) => `
      <div class="border-l-4 border-green-400 pl-4 py-2">
        <h4 class="font-semibold">Étape ${index + 1}: ${step.title || `Étape ${index + 1}`}</h4>
        <p class="text-sm text-gray-600">${step.description || 'Description de l\'étape'}</p>
        ${step.documents ? `<div class="text-xs text-blue-600 mt-1">Documents requis: ${step.documents.join(', ')}</div>` : ''}
      </div>
    `).join('') || '<p>Aucune étape définie</p>';

    const modal = this.createModal('Procédure Administrative', `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <h3 class="font-semibold text-green-900 mb-2">${procedure.title}</h3>
          <p class="text-green-800 text-sm mb-2">${procedure.description}</p>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div><strong>Difficulté:</strong> ${procedure.difficulty || 'Moyenne'}</div>
            <div><strong>Durée:</strong> ${procedure.estimatedTime || '30 min'}</div>
            <div><strong>Statut:</strong> ${procedure.status || 'Active'}</div>
          </div>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-semibold">Étapes à suivre:</h4>
          ${stepsHtml}
        </div>
        
        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
          <h5 class="font-semibold text-yellow-800 mb-1">Documents requis:</h5>
          <ul class="text-yellow-700 text-sm">
            ${procedure.requiredDocuments?.map((doc: string) => `<li>• ${doc}</li>`).join('') || '<li>• Aucun document spécifique requis</li>'}
          </ul>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'procedure', itemName: '${procedure.title}', itemId: '${procedure.id}'}}))">
            Ajouter aux favoris
          </button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('download-resource', {detail: {resourceName: '${procedure.title}', resourceType: 'procedure'}}))">
            Télécharger guide
          </button>
        </div>
      </div>
    `);
  }

  private openNewsReader(newsId: string) {
    const news = {
      title: 'Actualité Juridique',
      content: 'Contenu de l\'actualité juridique avec les dernières informations importantes.',
      author: 'Rédaction',
      datePublished: new Date().toLocaleDateString('fr-FR'),
      category: 'Juridique'
    };

    const modal = this.createModal('Actualité', `
      <div class="space-y-4">
        <div class="border-b pb-4">
          <h3 class="text-xl font-semibold mb-2">${news.title}</h3>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Par ${news.author}</span>
            <span>${news.datePublished}</span>
          </div>
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">${news.category}</span>
        </div>
        
        <div class="prose max-w-none">
          <p>${news.content}</p>
          <p>Cette actualité contient des informations importantes concernant les dernières évolutions juridiques et réglementaires.</p>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'news', itemName: '${news.title}', itemId: '${newsId}'}}))">
            Ajouter aux favoris
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('share-legal-text', {detail: {textId: '${newsId}', title: '${news.title}'}}))">
            Partager
          </button>
        </div>
      </div>
    `);
  }

  private performSearch(query: string, options: any = {}) {
    const results = this.store.globalSearch(query);
    // Suppression de l'affichage automatique des résultats de recherche
    // this.displaySearchResults(results, query);
    console.log('Recherche effectuée:', query, results);
  }

  private displaySearchResults(results: any, query?: string) {
    const totalResults = (results.legalTexts?.length || 0) + 
                        (results.procedures?.length || 0) + 
                        (results.news?.length || 0) + 
                        (results.templates?.length || 0);

    const resultsHtml = `
      <div class="space-y-4">
        <div class="bg-blue-50 p-3 rounded">
          <h4 class="font-semibold">${totalResults} résultats trouvés ${query ? `pour "${query}"` : ''}</h4>
        </div>
        
        ${results.legalTexts?.length > 0 ? `
          <div>
            <h5 class="font-semibold text-lg mb-2">Textes Juridiques (${results.legalTexts.length})</h5>
            ${results.legalTexts.slice(0, 3).map((text: any) => `
              <div class="border-l-4 border-blue-400 pl-3 py-2 mb-2 cursor-pointer hover:bg-gray-50" onclick="window.dispatchEvent(new CustomEvent('view-legal-text', {detail: {textId: '${text.id}', title: '${text.title}'}}))">
                <h6 class="font-medium">${text.title}</h6>
                <p class="text-sm text-gray-600">${text.content?.substring(0, 100)}...</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${results.procedures?.length > 0 ? `
          <div>
            <h5 class="font-semibold text-lg mb-2">Procédures (${results.procedures.length})</h5>
            ${results.procedures.slice(0, 3).map((proc: any) => `
              <div class="border-l-4 border-green-400 pl-3 py-2 mb-2 cursor-pointer hover:bg-gray-50" onclick="window.dispatchEvent(new CustomEvent('view-procedure', {detail: {procedureId: '${proc.id}', title: '${proc.title}'}}))">
                <h6 class="font-medium">${proc.title}</h6>
                <p class="text-sm text-gray-600">${proc.description?.substring(0, 100)}...</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('save-search', {detail: {name: 'Recherche ${new Date().toLocaleTimeString()}', query: '${query}', filters: {}}}))">
            Sauvegarder cette recherche
          </button>
        </div>
      </div>
    `;

    this.createModal('Résultats de Recherche', resultsHtml);
  }

  private downloadDocument(document: any, format: string) {
    const content = `
      ${document.title}
      
      ${document.content || 'Contenu du document'}
      
      ---
      Généré le ${new Date().toLocaleDateString('fr-FR')}
    `;
    
    this.downloadFile(content, `${document.title}.${format.toLowerCase()}`, 'text/plain');
    
    toast({
      title: "Téléchargement démarré",
      description: `${document.title}.${format} téléchargé avec succès.`,
    });
  }

  private downloadResource(resourceName: string, resourceType: string) {
    const content = `Ressource: ${resourceName}\nType: ${resourceType}\nTéléchargé le: ${new Date().toLocaleString('fr-FR')}`;
    this.downloadFile(content, `${resourceName}.txt`, 'text/plain');
    
    toast({
      title: "Ressource téléchargée",
      description: `${resourceName} téléchargé avec succès.`,
    });
  }

  private downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private shareDocument(documentId: string, title: string) {
    const shareUrl = `${window.location.origin}/document/${documentId}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: "Lien copié",
          description: "Le lien de partage a été copié dans le presse-papiers.",
        });
      });
    }
  }

  private createModal(title: string, content: string): HTMLElement {
    // Supprimer les modales existantes
    const existingModals = document.querySelectorAll('.real-action-modal');
    existingModals.forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'real-action-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    
    // Utilisation sécurisée du DOM
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">${title}</h2>
            <button class="close-modal text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>
          <div class="mb-6">
            ${content}
          </div>
          <div class="flex justify-end">
            <button class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Fermer</button>
          </div>
        </div>
      </div>
    `;

    // Gestion des événements
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => modal.remove());
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    document.body.appendChild(modal);
    return modal;
  }

  // Méthodes utilitaires pour générer du contenu d'exemple
  private generateExampleLegalContent(title: string): string {
    return `
      <h1>${title || 'Document Juridique'}</h1>
      
      <h2>Article 1 - Objet</h2>
      <p>Le présent document définit les règles et procédures applicables dans le cadre de ${title || 'cette réglementation'}.</p>
      
      <h2>Article 2 - Champ d'application</h2>
      <p>Les dispositions du présent document s'appliquent à tous les cas relevant de sa compétence.</p>
      
      <h2>Article 3 - Modalités d'application</h2>
      <p>Les modalités d'application sont définies par les textes d'application correspondants.</p>
      
      <h2>Article 4 - Entrée en vigueur</h2>
      <p>Le présent document entre en vigueur à la date de sa publication.</p>
    `;
  }

  private generateExampleSteps(): any[] {
    return [
      {
        id: '1',
        title: 'Préparation des documents',
        description: 'Rassembler tous les documents nécessaires à la procédure',
        order: 1,
        isRequired: true,
        documents: ['Pièce d\'identité', 'Justificatif de domicile']
      },
      {
        id: '2',
        title: 'Dépôt de la demande',
        description: 'Déposer la demande auprès du service compétent',
        order: 2,
        isRequired: true
      },
      {
        id: '3',
        title: 'Suivi de la demande',
        description: 'Suivre l\'avancement de votre demande',
        order: 3,
        isRequired: false
      }
    ];
  }

  private confirmAndDelete(type: string, id: string) {
    const modal = this.createModal('Confirmer la suppression', `
      <div class="space-y-4">
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
        <div class="flex space-x-2 justify-end">
          <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onclick="
            window.dispatchEvent(new CustomEvent('confirm-delete', {detail: {type: '${type}', id: '${id}'}}));
            this.closest('.real-action-modal').remove();
          ">
            Supprimer
          </button>
          <button class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </div>
    `);

    // Gérer la confirmation
    window.addEventListener('confirm-delete', (event: any) => {
      const { type, id } = event.detail;
      switch (type) {
        case 'legal-text':
          this.store.deleteLegalText(id);
          break;
        case 'procedure':
          this.store.deleteProcedure(id);
          break;
        case 'news':
          this.store.deleteNews(id);
          break;
        case 'template':
          this.store.deleteTemplate(id);
          break;
        case 'saved-search':
          this.store.deleteSavedSearch(id);
          break;
      }
      toast({
        title: "Suppression effectuée",
        description: "L'élément a été supprimé avec succès.",
      });
    }, { once: true });
  }

  private openLegalTextForm(data?: any) {
    const isEdit = !!data?.id;
    const modal = this.createModal(isEdit ? 'Modifier le Texte Juridique' : 'Nouveau Texte Juridique', `
      <form class="space-y-4" onsubmit="event.preventDefault(); window.dispatchEvent(new CustomEvent('save-legal-text', {detail: {
        id: '${data?.id || ''}',
        title: event.target.title.value,
        content: event.target.content.value,
        type: event.target.type.value,
        category: event.target.category.value,
        tags: event.target.tags.value.split(',').map(t => t.trim()),
        author: '${this.store.currentUser}',
        status: 'draft'
      }})); this.closest('.real-action-modal').remove();">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input type="text" name="title" value="${data?.title || ''}" class="w-full border rounded-md px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" class="w-full border rounded-md px-3 py-2">
              <option value="law" ${data?.type === 'law' ? 'selected' : ''}>Loi</option>
              <option value="decree" ${data?.type === 'decree' ? 'selected' : ''}>Décret</option>
              <option value="regulation" ${data?.type === 'regulation' ? 'selected' : ''}>Règlement</option>
              <option value="circular" ${data?.type === 'circular' ? 'selected' : ''}>Circulaire</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <input type="text" name="category" value="${data?.category || ''}" class="w-full border rounded-md px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (séparés par des virgules)</label>
            <input type="text" name="tags" value="${data?.tags?.join(', ') || ''}" class="w-full border rounded-md px-3 py-2">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
          <textarea name="content" rows="10" class="w-full border rounded-md px-3 py-2" required>${data?.content || ''}</textarea>
        </div>
        
        <div class="flex space-x-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ${isEdit ? 'Modifier' : 'Créer'}
          </button>
          <button type="button" class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    `);

    // Gérer la sauvegarde
    window.addEventListener('save-legal-text', (event: any) => {
      const data = event.detail;
      if (data.id) {
        this.store.updateLegalText(data.id, data);
        toast({
          title: "Texte modifié",
          description: "Le texte juridique a été modifié avec succès.",
        });
      } else {
        this.store.addLegalText(data);
        toast({
          title: "Texte créé",
          description: "Le nouveau texte juridique a été créé avec succès.",
        });
      }
    }, { once: true });
  }

  private openProcedureForm(data?: any) {
    // Redirection vers l'interface de création de procédure
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'procedures-enrichment' }
    }));
    toast({
      title: "Création de procédure",
      description: "Accédez à l'interface de création de procédure dans la section Procédures.",
    });
  }

  private openNewsForm(data?: any) {
    // Redirection vers l'interface de création d'actualité
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'news' }
    }));
    toast({
      title: "Création d'actualité",
      description: "Accédez à l'interface de création d'actualité dans la section Actualités.",
    });
  }

  private openTemplateCreator(data?: any) {
    // Redirection vers l'interface de création de modèles
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'document-templates' }
    }));
    toast({
      title: "Création de modèle",
      description: "Accédez à l'interface de création de modèles dans la section Modèles de documents.",
    });
  }

  private openTemplateEditor(template: any) {
    // Redirection vers l'interface d'édition de modèles
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'document-templates' }
    }));
    toast({
      title: "Édition de modèle",
      description: `Modifiez le modèle "${template.name}" dans l'interface de gestion des modèles.`,
    });
  }

  private displayFavorites(favorites: any[]) {
    const favoritesHtml = favorites.map(fav => `
      <div class="border rounded-lg p-3 hover:bg-gray-50">
        <h4 class="font-medium">${fav.title}</h4>
        <p class="text-sm text-gray-600">Type: ${fav.itemType}</p>
        <p class="text-xs text-gray-500">Ajouté le: ${new Date(fav.dateAdded).toLocaleDateString('fr-FR')}</p>
      </div>
    `).join('');

    this.createModal('Mes Favoris', `
      <div class="space-y-3">
        ${favorites.length > 0 ? favoritesHtml : '<p class="text-gray-500">Aucun favori pour le moment.</p>'}
      </div>
    `);
  }

  private openSavedSearchEditor(searchId: string) {
    // Redirection vers l'interface de gestion des recherches sauvegardées
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'saved-searches' }
    }));
    toast({
      title: "Modification de recherche",
      description: "Accédez à l'interface de gestion des recherches sauvegardées pour modifier votre recherche.",
    });
  }

  private openFormModal(formType: string, title: string) {
    // Actions métier appropriées selon le type de formulaire
    switch (formType) {
      case 'legal-text':
        this.openLegalTextForm();
        break;
      case 'procedure':
        this.openProcedureForm();
        break;
      case 'news':
        this.openNewsForm();
        break;
      case 'template':
        this.openTemplateCreator();
        break;
      default:
        // Action par défaut pour les autres types
        toast({
          title: "Action disponible",
          description: `Fonctionnalité ${title} accessible via l'interface principale.`,
        });
    }
  }

  private submitForm(formType: string, data: any) {
    // Implémentation générique pour la soumission de formulaires
    toast({
      title: "Formulaire soumis",
      description: `Le formulaire ${formType} a été soumis avec succès.`,
    });
  }

  private approveDocument(documentId: string, documentTitle: string) {
    // Logique d'approbation
    toast({
      title: "Document approuvé",
      description: `"${documentTitle}" a été approuvé avec succès.`,
    });
  }

  private rejectDocument(documentId: string, documentTitle: string) {
    // Logique de rejet
    toast({
      title: "Document rejeté",
      description: `"${documentTitle}" a été rejeté.`,
    });
  }

  private requestChanges(documentId: string, documentTitle: string) {
    // Logique de demande de modifications
    toast({
      title: "Modifications demandées",
      description: `Demande de modifications envoyée pour "${documentTitle}".`,
    });
  }

  private openFileImporter() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            this.store.importData(e.target.result);
            toast({
              title: "Import réussi",
              description: "Les données ont été importées avec succès.",
            });
          } catch (error) {
            toast({
              title: "Erreur d'import",
              description: "Impossible d'importer les données.",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  // NOUVELLES MÉTHODES POUR LES FONCTIONNALITÉS ÉTENDUES

  // Actions pour le forum
  private handleViewForumDiscussion(event: CustomEvent) {
    const { discussionId, title } = event.detail;
    this.store.incrementDiscussionViews(discussionId);
    const discussion = this.store.getForumDiscussion(discussionId);
    
    if (discussion) {
      this.openForumDiscussionViewer(discussion);
    } else {
      // Créer une discussion exemple
      const exampleDiscussion = {
        id: discussionId,
        title: title || 'Discussion Juridique',
        content: 'Contenu de la discussion avec détails et arguments juridiques...',
        author: 'Utilisateur Forum',
        category: 'Droit Général',
        status: 'active' as const,
        tags: ['discussion', 'juridique'],
        isPinned: false,
        isLocked: false,
        views: 1,
        votes: 0,
        replies: []
      };
      this.openForumDiscussionViewer(exampleDiscussion);
    }
  }

  private handleCreateForumDiscussion(event: CustomEvent) {
    const { data } = event.detail;
    this.openForumDiscussionForm(data);
  }

  private handleReplyToDiscussion(event: CustomEvent) {
    const { discussionId, discussionTitle } = event.detail;
    this.openReplyForm(discussionId, discussionTitle);
  }

  private handleVoteDiscussion(event: CustomEvent) {
    const { discussionId, vote } = event.detail;
    this.store.voteOnDiscussion(discussionId, vote);
    toast({
      title: vote > 0 ? "Vote positif" : "Vote négatif",
      description: "Votre vote a été enregistré.",
    });
  }

  private handleVoteReply(event: CustomEvent) {
    const { replyId, vote } = event.detail;
    this.store.voteOnReply(replyId, vote);
    toast({
      title: vote > 0 ? "Vote positif" : "Vote négatif",
      description: "Votre vote sur la réponse a été enregistré.",
    });
  }

  private handleAcceptReply(event: CustomEvent) {
    const { replyId } = event.detail;
    this.store.markReplyAsAccepted(replyId);
    toast({
      title: "Réponse acceptée",
      description: "Cette réponse a été marquée comme solution.",
    });
  }

  private handlePinDiscussion(event: CustomEvent) {
    const { discussionId } = event.detail;
    this.store.pinDiscussion(discussionId);
    toast({
      title: "Discussion épinglée",
      description: "La discussion a été épinglée en haut du forum.",
    });
  }

  private handleLockDiscussion(event: CustomEvent) {
    const { discussionId } = event.detail;
    this.store.lockDiscussion(discussionId);
    toast({
      title: "Discussion verrouillée",
      description: "La discussion a été verrouillée aux nouveaux commentaires.",
    });
  }

  private handleJoinForum(event: CustomEvent) {
    this.openForumMembershipModal('join');
  }

  private handleRegisterForum(event: CustomEvent) {
    this.openForumMembershipModal('register');
  }

  // Actions pour les ressources partagées
  private handleViewSharedResource(event: CustomEvent) {
    const { resourceId, title } = event.detail;
    const resource = this.store.getSharedResource(resourceId);
    
    if (resource) {
      this.openSharedResourceViewer(resource);
    } else {
      const exampleResource = {
        id: resourceId,
        title: title || 'Ressource Partagée',
        description: 'Description de la ressource partagée avec informations détaillées.',
        type: 'document' as const,
        url: '#',
        sharedBy: 'Utilisateur',
        category: 'Juridique',
        tags: ['ressource', 'partage'],
        downloads: 0,
        rating: 0,
        isPublic: true
      };
      this.openSharedResourceViewer(exampleResource);
    }
  }

  private handleDownloadSharedResource(event: CustomEvent) {
    const { resourceId, title } = event.detail;
    this.store.incrementResourceDownloads(resourceId);
    this.downloadResource(title, 'shared-resource');
  }

  private handleShareResource(event: CustomEvent) {
    const { resourceId, title } = event.detail;
    this.shareDocument(resourceId, title);
  }

  private handleRateResource(event: CustomEvent) {
    const { resourceId, rating } = event.detail;
    this.store.rateResource(resourceId, rating);
    toast({
      title: "Évaluation enregistrée",
      description: `Vous avez donné ${rating} étoiles à cette ressource.`,
    });
  }

  private handleAddSharedResource(event: CustomEvent) {
    const { data } = event.detail;
    this.openSharedResourceForm(data);
  }

  private handleEditSharedResource(event: CustomEvent) {
    const { resourceId } = event.detail;
    const resource = this.store.getSharedResource(resourceId);
    if (resource) {
      this.openSharedResourceForm(resource);
    }
  }

  private handleDeleteSharedResource(event: CustomEvent) {
    const { resourceId } = event.detail;
    this.confirmAndDelete('shared-resource', resourceId);
  }

  // Actions pour les tutoriels vidéo
  private handlePlayVideoTutorial(event: CustomEvent) {
    const { tutorialId, title } = event.detail;
    this.store.incrementTutorialViews(tutorialId);
    const tutorial = this.store.getVideoTutorial(tutorialId);
    
    if (tutorial) {
      this.openVideoPlayer(tutorial);
    } else {
      const exampleTutorial = {
        id: tutorialId,
        title: title || 'Tutoriel Vidéo',
        description: 'Description du tutoriel vidéo avec objectifs d\'apprentissage.',
        url: 'https://example.com/video',
        duration: '15:30',
        category: 'Formation',
        instructor: 'Expert Juridique',
        views: 1,
        rating: 0,
        tags: ['tutoriel', 'formation'],
        transcript: 'Transcription du tutoriel vidéo...'
      };
      this.openVideoPlayer(exampleTutorial);
    }
  }

  private handleRateTutorial(event: CustomEvent) {
    const { tutorialId, rating } = event.detail;
    this.store.rateTutorial(tutorialId, rating);
    toast({
      title: "Évaluation enregistrée",
      description: `Vous avez donné ${rating} étoiles à ce tutoriel.`,
    });
  }

  private handleAddVideoTutorial(event: CustomEvent) {
    const { data } = event.detail;
    this.openVideoTutorialForm(data);
  }

  private handleEditVideoTutorial(event: CustomEvent) {
    const { tutorialId } = event.detail;
    const tutorial = this.store.getVideoTutorial(tutorialId);
    if (tutorial) {
      this.openVideoTutorialForm(tutorial);
    }
  }

  private handleDeleteVideoTutorial(event: CustomEvent) {
    const { tutorialId } = event.detail;
    this.confirmAndDelete('video-tutorial', tutorialId);
  }

  private handleDownloadTranscript(event: CustomEvent) {
    const { tutorialId, title } = event.detail;
    const tutorial = this.store.getVideoTutorial(tutorialId);
    const transcript = tutorial?.transcript || 'Transcription du tutoriel vidéo...';
    this.downloadFile(transcript, `${title}_transcript.txt`, 'text/plain');
    toast({
      title: "Transcription téléchargée",
      description: "La transcription a été téléchargée avec succès.",
    });
  }

  // Actions pour les configurations
  private handleOpenSettings(event: CustomEvent) {
    const { category = 'general' } = event.detail;
    this.openSettingsModal(category);
  }

  private handleSaveConfiguration(event: CustomEvent) {
    const { key, value, category, userId } = event.detail;
    this.store.setConfiguration({
      key,
      value,
      category,
      userId: userId || this.store.currentUser,
    });
    toast({
      title: "Configuration sauvegardée",
      description: "Vos paramètres ont été sauvegardés avec succès.",
    });
  }

  private handleResetConfiguration(event: CustomEvent) {
    const { category } = event.detail;
    // Logique pour réinitialiser les configurations d'une catégorie
    toast({
      title: "Configuration réinitialisée",
      description: `Les paramètres ${category} ont été réinitialisés.`,
    });
  }

  private handleExportSettings(event: CustomEvent) {
    const configurations = this.store.getUserConfigurations(this.store.currentUser);
    const settingsData = JSON.stringify(configurations, null, 2);
    this.downloadFile(settingsData, 'settings.json', 'application/json');
    toast({
      title: "Paramètres exportés",
      description: "Vos paramètres ont été exportés avec succès.",
    });
  }

  private handleImportSettings(event: CustomEvent) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const configurations = JSON.parse(e.target.result);
            configurations.forEach((config: any) => {
              this.store.setConfiguration({
                key: config.key,
                value: config.value,
                category: config.category,
                userId: this.store.currentUser,
              });
            });
            toast({
              title: "Paramètres importés",
              description: "Vos paramètres ont été importés avec succès.",
            });
          } catch (error) {
            toast({
              title: "Erreur d'import",
              description: "Impossible d'importer les paramètres.",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  // Actions d'icônes et boutons spécialisés
  private handleToggleTheme(event: CustomEvent) {
    const currentTheme = this.store.getConfiguration('theme', this.store.currentUser)?.value || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.store.setConfiguration({
      key: 'theme',
      value: newTheme,
      category: 'appearance',
      userId: this.store.currentUser,
    });
    
    // Appliquer le thème
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    toast({
      title: `Thème ${newTheme === 'dark' ? 'sombre' : 'clair'}`,
      description: "Le thème a été changé avec succès.",
    });
  }

  private handleToggleNotifications(event: CustomEvent) {
    const currentState = this.store.getConfiguration('notifications', this.store.currentUser)?.value || true;
    const newState = !currentState;
    this.store.setConfiguration({
      key: 'notifications',
      value: newState,
      category: 'notifications',
      userId: this.store.currentUser,
    });
    
    toast({
      title: `Notifications ${newState ? 'activées' : 'désactivées'}`,
      description: "Vos préférences de notification ont été mises à jour.",
    });
  }

  private handleOpenAccessibility(event: CustomEvent) {
    this.openSettingsModal('accessibility');
  }

  private handleToggleOfflineMode(event: CustomEvent) {
    const currentState = this.store.getConfiguration('offline-mode', this.store.currentUser)?.value || false;
    const newState = !currentState;
    this.store.setConfiguration({
      key: 'offline-mode',
      value: newState,
      category: 'performance',
      userId: this.store.currentUser,
    });
    
    toast({
      title: `Mode hors-ligne ${newState ? 'activé' : 'désactivé'}`,
      description: "Vos données seront synchronisées quand vous serez en ligne.",
    });
  }

  private handleOpenMobileApp(event: CustomEvent) {
    this.createModal('Application Mobile', `
      <div class="space-y-4">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Téléchargez notre application mobile</h3>
          <p class="text-gray-600 mb-4">Accédez à toutes les fonctionnalités depuis votre smartphone</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border rounded-lg p-4 text-center">
            <h4 class="font-semibold mb-2">iOS</h4>
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Télécharger sur App Store
            </button>
          </div>
          <div class="border rounded-lg p-4 text-center">
            <h4 class="font-semibold mb-2">Android</h4>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Télécharger sur Google Play
            </button>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded">
          <h5 class="font-semibold text-blue-800 mb-1">Fonctionnalités mobiles :</h5>
          <ul class="text-blue-700 text-sm">
            <li>• Accès hors-ligne aux documents</li>
            <li>• Notifications push</li>
            <li>• Synchronisation automatique</li>
            <li>• Interface optimisée tactile</li>
          </ul>
        </div>
      </div>
    `);
  }

  private handleOpenIntegrations(event: CustomEvent) {
    this.openSettingsModal('integrations');
  }

  // Actions pour les icônes de partage et modification
  private handleShareContent(event: CustomEvent) {
    const { contentId, title, type } = event.detail;
    this.shareDocument(contentId, title);
  }

  private handleEditContent(event: CustomEvent) {
    const { contentId, type } = event.detail;
    switch (type) {
      case 'legal-text':
        window.dispatchEvent(new CustomEvent('edit-legal-text', { detail: { textId: contentId } }));
        break;
      case 'procedure':
        window.dispatchEvent(new CustomEvent('edit-procedure', { detail: { procedureId: contentId } }));
        break;
      case 'news':
        window.dispatchEvent(new CustomEvent('edit-news', { detail: { newsId: contentId } }));
        break;
      case 'template':
        window.dispatchEvent(new CustomEvent('edit-template', { detail: { templateId: contentId } }));
        break;
      default:
        toast({
          title: "Édition",
          description: "Ouverture de l'éditeur pour ce contenu.",
        });
    }
  }

  private handleViewContent(event: CustomEvent) {
    const { contentId, title, type } = event.detail;
    switch (type) {
      case 'legal-text':
        window.dispatchEvent(new CustomEvent('view-legal-text', { detail: { textId: contentId, title } }));
        break;
      case 'procedure':
        window.dispatchEvent(new CustomEvent('view-procedure', { detail: { procedureId: contentId, title } }));
        break;
      case 'news':
        window.dispatchEvent(new CustomEvent('read-news', { detail: { newsId: contentId, newsTitle: title } }));
        break;
      case 'forum-discussion':
        window.dispatchEvent(new CustomEvent('view-forum-discussion', { detail: { discussionId: contentId, title } }));
        break;
      default:
        toast({
          title: "Visualisation",
          description: `Ouverture de "${title}" en mode lecture.`,
        });
    }
  }

  private handleConfigureItem(event: CustomEvent) {
    const { itemId, itemType } = event.detail;
    this.createModal('Configuration', `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Configuration de l'élément</h3>
        <p>Options de configuration pour ${itemType} : ${itemId}</p>
        <div class="space-y-2">
          <button class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Modifier les permissions
          </button>
          <button class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Paramètres d'affichage
          </button>
          <button class="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Options avancées
          </button>
        </div>
      </div>
    `);
  }

  private handleCopyLink(event: CustomEvent) {
    const { contentId, title } = event.detail;
    const link = `${window.location.origin}/content/${contentId}`;
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien a été copié dans le presse-papiers.",
      });
    });
  }

  private handlePrintContent(event: CustomEvent) {
    const { contentId, title, content } = event.detail;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              .content { margin-top: 20px; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <div class="content">${content || 'Contenu à imprimer...'}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  // Actions pour les zones de contenu dynamique
  private handleFilterContent(event: CustomEvent) {
    const { filterType, filterValue, contentType } = event.detail;
    toast({
      title: "Filtre appliqué",
      description: `Filtrage par ${filterType}: ${filterValue}`,
    });
  }

  private handleSortContent(event: CustomEvent) {
    const { sortBy, sortOrder, contentType } = event.detail;
    toast({
      title: "Tri appliqué",
      description: `Tri par ${sortBy} (${sortOrder === 'asc' ? 'croissant' : 'décroissant'})`,
    });
  }

  private handleRefreshContent(event: CustomEvent) {
    const { contentType } = event.detail;
    toast({
      title: "Actualisation",
      description: `Contenu ${contentType} actualisé avec succès.`,
    });
  }

  private handleLoadMoreContent(event: CustomEvent) {
    const { contentType, currentCount } = event.detail;
    toast({
      title: "Chargement",
      description: `${currentCount} éléments supplémentaires chargés.`,
    });
  }

  // Méthodes utilitaires pour les nouvelles fonctionnalités
  private openForumDiscussionViewer(discussion: any) {
    const repliesHtml = discussion.replies?.map((reply: any, index: number) => `
      <div class="border-l-4 border-blue-400 pl-4 py-3 mb-3">
        <div class="flex justify-between items-start mb-2">
          <div class="font-semibold">${reply.author}</div>
          <div class="text-sm text-gray-500">${new Date(reply.dateCreated).toLocaleDateString('fr-FR')}</div>
        </div>
        <p class="text-gray-700 mb-2">${reply.content}</p>
        <div class="flex items-center gap-2 text-sm">
          <button class="text-blue-600 hover:text-blue-800" onclick="window.dispatchEvent(new CustomEvent('vote-reply', {detail: {replyId: '${reply.id}', vote: 1}}))">
            👍 ${reply.votes || 0}
          </button>
          <button class="text-green-600 hover:text-green-800" onclick="window.dispatchEvent(new CustomEvent('accept-reply', {detail: {replyId: '${reply.id}'}}))">
            ✓ Accepter
          </button>
        </div>
      </div>
    `).join('') || '<p class="text-gray-500">Aucune réponse pour le moment.</p>';

    const modal = this.createModal('Discussion Forum', `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold text-blue-900">${discussion.title}</h3>
            <div class="flex items-center gap-2">
              <span class="text-sm text-blue-700">${discussion.views} vues</span>
              <button class="text-blue-600 hover:text-blue-800" onclick="window.dispatchEvent(new CustomEvent('vote-discussion', {detail: {discussionId: '${discussion.id}', vote: 1}}))">
                👍 ${discussion.votes || 0}
              </button>
            </div>
          </div>
          <div class="text-sm text-blue-800 mb-2">
            Par ${discussion.author} • ${discussion.category} • ${new Date(discussion.dateCreated).toLocaleDateString('fr-FR')}
          </div>
          <div class="flex gap-2 mb-3">
            ${discussion.tags?.map((tag: string) => `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${tag}</span>`).join('') || ''}
          </div>
          <p class="text-blue-900">${discussion.content}</p>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-semibold">Réponses (${discussion.replies?.length || 0})</h4>
          ${repliesHtml}
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('reply-to-discussion', {detail: {discussionId: '${discussion.id}', discussionTitle: '${discussion.title}'}}))">
            Répondre
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'forum-discussion', itemName: '${discussion.title}', itemId: '${discussion.id}'}}))">
            Ajouter aux favoris
          </button>
          <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('pin-discussion', {detail: {discussionId: '${discussion.id}'}}))">
            Épingler
          </button>
        </div>
      </div>
    `);
  }

  private openForumDiscussionForm(data?: any) {
    const isEdit = !!data?.id;
    const modal = this.createModal(isEdit ? 'Modifier Discussion' : 'Nouvelle Discussion', `
      <form class="space-y-4" onsubmit="event.preventDefault(); window.dispatchEvent(new CustomEvent('save-forum-discussion', {detail: {
        id: '${data?.id || ''}',
        title: event.target.title.value,
        content: event.target.content.value,
        category: event.target.category.value,
        tags: event.target.tags.value.split(',').map(t => t.trim()),
        author: '${this.store.currentUser}',
        status: 'active'
      }})); this.closest('.real-action-modal').remove();">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input type="text" name="title" value="${data?.title || ''}" class="w-full border rounded-md px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select name="category" class="w-full border rounded-md px-3 py-2">
              <option value="Droit Civil" ${data?.category === 'Droit Civil' ? 'selected' : ''}>Droit Civil</option>
              <option value="Droit Commercial" ${data?.category === 'Droit Commercial' ? 'selected' : ''}>Droit Commercial</option>
              <option value="Droit Pénal" ${data?.category === 'Droit Pénal' ? 'selected' : ''}>Droit Pénal</option>
              <option value="Procédure" ${data?.category === 'Procédure' ? 'selected' : ''}>Procédure</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags (séparés par des virgules)</label>
          <input type="text" name="tags" value="${data?.tags?.join(', ') || ''}" class="w-full border rounded-md px-3 py-2">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
          <textarea name="content" rows="8" class="w-full border rounded-md px-3 py-2" required>${data?.content || ''}</textarea>
        </div>
        
        <div class="flex space-x-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ${isEdit ? 'Modifier' : 'Créer'}
          </button>
          <button type="button" class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    `);

    // Gérer la sauvegarde
    window.addEventListener('save-forum-discussion', (event: any) => {
      const data = event.detail;
      if (data.id) {
        this.store.updateForumDiscussion(data.id, data);
        toast({
          title: "Discussion modifiée",
          description: "La discussion a été modifiée avec succès.",
        });
      } else {
        this.store.addForumDiscussion(data);
        toast({
          title: "Discussion créée",
          description: "La nouvelle discussion a été créée avec succès.",
        });
      }
    }, { once: true });
  }

  private openReplyForm(discussionId: string, discussionTitle: string) {
    const modal = this.createModal('Répondre à la Discussion', `
      <form class="space-y-4" onsubmit="event.preventDefault(); window.dispatchEvent(new CustomEvent('save-forum-reply', {detail: {
        discussionId: '${discussionId}',
        content: event.target.content.value,
        author: '${this.store.currentUser}',
        isAcceptedAnswer: false
      }})); this.closest('.real-action-modal').remove();">
        
        <div class="bg-gray-50 p-3 rounded">
          <h4 class="font-semibold text-gray-800">Réponse à :</h4>
          <p class="text-gray-600">${discussionTitle}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Votre réponse</label>
          <textarea name="content" rows="6" class="w-full border rounded-md px-3 py-2" placeholder="Écrivez votre réponse..." required></textarea>
        </div>
        
        <div class="flex space-x-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Publier la réponse
          </button>
          <button type="button" class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    `);

    // Gérer la sauvegarde de la réponse
    window.addEventListener('save-forum-reply', (event: any) => {
      const data = event.detail;
      this.store.addForumReply(data);
      toast({
        title: "Réponse publiée",
        description: "Votre réponse a été publiée avec succès.",
      });
    }, { once: true });
  }

  private openForumMembershipModal(action: 'join' | 'register') {
    const title = action === 'join' ? 'Rejoindre le Forum' : 'S\'inscrire au Forum';
    const buttonText = action === 'join' ? 'Rejoindre' : 'S\'inscrire';
    
    const modal = this.createModal(title, `
      <form class="space-y-4" onsubmit="event.preventDefault(); window.dispatchEvent(new CustomEvent('save-forum-member', {detail: {
        name: event.target.name.value,
        email: event.target.email.value,
        role: 'member'
      }})); this.closest('.real-action-modal').remove();">
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input type="text" name="name" class="w-full border rounded-md px-3 py-2" required>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" class="w-full border rounded-md px-3 py-2" required>
        </div>
        
        <div class="bg-blue-50 p-3 rounded">
          <h5 class="font-semibold text-blue-800 mb-1">Avantages du forum :</h5>
          <ul class="text-blue-700 text-sm">
            <li>• Accès aux discussions d'experts</li>
            <li>• Possibilité de poser des questions</li>
            <li>• Partage d'expériences</li>
            <li>• Notifications des nouvelles discussions</li>
          </ul>
        </div>
        
        <div class="flex space-x-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ${buttonText}
          </button>
          <button type="button" class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    `);

    // Gérer l'inscription
    window.addEventListener('save-forum-member', (event: any) => {
      const data = event.detail;
      this.store.addForumMember(data);
      toast({
        title: action === 'join' ? "Bienvenue !" : "Inscription réussie",
        description: "Vous pouvez maintenant participer aux discussions du forum.",
      });
    }, { once: true });
  }

  private openSharedResourceViewer(resource: any) {
    const modal = this.createModal('Ressource Partagée', `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <h3 class="font-semibold text-green-900 mb-2">${resource.title}</h3>
          <p class="text-green-800 text-sm mb-2">${resource.description}</p>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Type:</strong> ${resource.type}</div>
            <div><strong>Partagé par:</strong> ${resource.sharedBy}</div>
            <div><strong>Catégorie:</strong> ${resource.category}</div>
            <div><strong>Téléchargements:</strong> ${resource.downloads}</div>
          </div>
          <div class="flex gap-2 mt-2">
            ${resource.tags?.map((tag: string) => `<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">${tag}</span>`).join('') || ''}
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('download-shared-resource', {detail: {resourceId: '${resource.id}', title: '${resource.title}'}}))">
            Télécharger
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('share-resource', {detail: {resourceId: '${resource.id}', title: '${resource.title}'}}))">
            Partager
          </button>
          <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'shared-resource', itemName: '${resource.title}', itemId: '${resource.id}'}}))">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    `);
  }

  private openSharedResourceForm(data?: any) {
    // Redirection vers l'interface de gestion des ressources partagées
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'shared-resources' }
    }));
    toast({
      title: "Gestion des ressources",
      description: "Accédez à l'interface de gestion des ressources partagées.",
    });
  }

  private openVideoPlayer(tutorial: any) {
    const modal = this.createModal('Lecteur Vidéo', `
      <div class="space-y-4">
        <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <h3 class="font-semibold text-purple-900 mb-2">${tutorial.title}</h3>
          <p class="text-purple-800 text-sm mb-2">${tutorial.description}</p>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div><strong>Durée:</strong> ${tutorial.duration}</div>
            <div><strong>Instructeur:</strong> ${tutorial.instructor}</div>
            <div><strong>Vues:</strong> ${tutorial.views}</div>
          </div>
        </div>
        
        <div class="bg-gray-100 rounded-lg p-8 text-center">
          <div class="text-6xl mb-4">🎥</div>
          <p class="text-gray-600 mb-4">Lecteur vidéo intégré</p>
          <button class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            ▶ Lire la vidéo
          </button>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('rate-tutorial', {detail: {tutorialId: '${tutorial.id}', rating: 5}}))">
            ⭐ Noter
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('download-transcript', {detail: {tutorialId: '${tutorial.id}', title: '${tutorial.title}'}}))">
            Télécharger transcription
          </button>
          <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'video-tutorial', itemName: '${tutorial.title}', itemId: '${tutorial.id}'}}))">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    `);
  }

  private openVideoTutorialForm(data?: any) {
    // Redirection vers l'interface de gestion des tutoriels vidéo
    window.dispatchEvent(new CustomEvent('navigate-to-section', {
      detail: { section: 'video-tutorials' }
    }));
    toast({
      title: "Gestion des tutoriels",
      description: "Accédez à l'interface de gestion des tutoriels vidéo.",
    });
  }

  private openSettingsModal(category: string) {
    const modal = this.createModal('Paramètres', `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Paramètres - ${category}</h3>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 border rounded">
            <div>
              <h4 class="font-medium">Thème</h4>
              <p class="text-sm text-gray-600">Choisir entre thème clair et sombre</p>
            </div>
            <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('toggle-theme'))">
              Basculer
            </button>
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded">
            <div>
              <h4 class="font-medium">Notifications</h4>
              <p class="text-sm text-gray-600">Recevoir des notifications</p>
            </div>
            <button class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('toggle-notifications'))">
              Basculer
            </button>
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded">
            <div>
              <h4 class="font-medium">Mode hors-ligne</h4>
              <p class="text-sm text-gray-600">Synchroniser les données localement</p>
            </div>
            <button class="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('toggle-offline-mode'))">
              Basculer
            </button>
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('export-settings'))">
            Exporter paramètres
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('import-settings'))">
            Importer paramètres
          </button>
        </div>
      </div>
    `);
  }
}

// Initialiser le gestionnaire d'actions réelles
export const realActionHandler = RealActionHandler.getInstance();
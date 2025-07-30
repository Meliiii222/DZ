import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Play, 
  Settings,
  Zap,
  Bot,
  Search,
  Network,
  Brain,
  Filter,
  RefreshCw,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

interface NotificationEvent {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  icon?: React.ReactNode;
}

export function GlobalNotificationManager() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    // Template-related events
    window.addEventListener('show-templates-modal', (event: any) => {
      const { category } = event.detail;
      toast.success(`Ouverture des modèles: ${category}`, {
        description: 'Chargement de la bibliothèque de modèles...',
        icon: <FileText className="w-4 h-4" />
      });
    });

    window.addEventListener('show-template-creator', () => {
      toast.info('Ouverture du créateur de modèles', {
        description: 'Lancement de l\'éditeur de modèles...',
        icon: <Bot className="w-4 h-4" />
      });
    });

    window.addEventListener('show-collaborative-editor', () => {
      toast.info('Ouverture de l\'éditeur collaboratif', {
        description: 'Initialisation de l\'espace de travail partagé...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    // Guide and resource events
    window.addEventListener('show-guide-viewer', (event: any) => {
      const { title } = event.detail;
      toast.success(`Consultation du guide: ${title}`, {
        description: 'Ouverture du guide pratique...',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('download-guide', (event: any) => {
      const { guide } = event.detail;
      toast.success(`Téléchargement du guide ${guide}`, {
        description: 'Préparation du fichier PDF...',
        icon: <Download className="w-4 h-4" />
      });
    });

    // Video and media events
    window.addEventListener('start-playlist', (event: any) => {
      const { playlistId } = event.detail;
      toast.info('Démarrage de la playlist', {
        description: 'Chargement des vidéos tutorielles...',
        icon: <Play className="w-4 h-4" />
      });
    });

    window.addEventListener('play-video', (event: any) => {
      const { videoId } = event.detail;
      toast.info('Lecture de la vidéo', {
        description: 'Initialisation du lecteur vidéo...',
        icon: <Play className="w-4 h-4" />
      });
    });

    window.addEventListener('download-all-videos', () => {
      toast.info('Téléchargement de toutes les vidéos', {
        description: 'Préparation de l\'archive ZIP...',
        icon: <Download className="w-4 h-4" />
      });
    });

    window.addEventListener('show-playback-preferences', () => {
      toast.info('Ouverture des préférences de lecture', {
        description: 'Configuration du lecteur vidéo...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    window.addEventListener('show-playlist-creator', () => {
      toast.info('Créateur de playlist personnalisée', {
        description: 'Ouverture de l\'éditeur de playlist...',
        icon: <Zap className="w-4 h-4" />
      });
    });

    // Resource sharing events
    window.addEventListener('view-resource', (event: any) => {
      const { resourceId } = event.detail;
      toast.info('Consultation de la ressource', {
        description: 'Ouverture du visualiseur de document...',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('download-resource', (event: any) => {
      const { resourceId } = event.detail;
      toast.success('Téléchargement de la ressource', {
        description: 'Préparation du fichier...',
        icon: <Download className="w-4 h-4" />
      });
    });

    window.addEventListener('share-resource', (event: any) => {
      const { resourceId } = event.detail;
      toast.info('Partage de la ressource', {
        description: 'Ouverture des options de partage...',
        icon: <Share2 className="w-4 h-4" />
      });
    });

    // Search and analysis events
    window.addEventListener('view-document', (event: any) => {
      const { documentId } = event.detail;
      toast.info('Consultation du document', {
        description: 'Ouverture du visualiseur...',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('use-template', (event: any) => {
      const { templateId } = event.detail;
      toast.success('Utilisation du modèle', {
        description: 'Application du modèle au document...',
        icon: <FileText className="w-4 h-4" />
      });
    });

    window.addEventListener('start-citation-analysis', () => {
      toast.info('Analyse des citations croisées', {
        description: 'Lancement de l\'algorithme d\'analyse...',
        icon: <Search className="w-4 h-4" />
      });
    });

    window.addEventListener('open-graph-view', () => {
      toast.info('Ouverture de la vue graphique', {
        description: 'Initialisation du graphe interactif...',
        icon: <Network className="w-4 h-4" />
      });
    });

    window.addEventListener('analyze-similarities', () => {
      toast.info('Analyse des similitudes', {
        description: 'Recherche de cas juridiques similaires...',
        icon: <Brain className="w-4 h-4" />
      });
    });

    // Analytics events
    window.addEventListener('show-advanced-filters', () => {
      toast.info('Filtres avancés', {
        description: 'Ouverture du panneau de filtrage...',
        icon: <Filter className="w-4 h-4" />
      });
    });

    window.addEventListener('refresh-analytics', () => {
      toast.info('Actualisation des données', {
        description: 'Rechargement des statistiques...',
        icon: <RefreshCw className="w-4 h-4" />
      });
    });

    window.addEventListener('export-analytics', () => {
      toast.success('Export des analyses', {
        description: 'Génération du rapport d\'analyse...',
        icon: <Download className="w-4 h-4" />
      });
    });

    // Report generation events
    window.addEventListener('generate-ai-report', () => {
      toast.info('Génération de rapport IA', {
        description: 'L\'IA analyse vos données...',
        icon: <Bot className="w-4 h-4" />
      });
    });

    window.addEventListener('export-pdf', () => {
      toast.success('Export PDF', {
        description: 'Génération du document PDF...',
        icon: <FileText className="w-4 h-4" />
      });
    });

    window.addEventListener('export-excel', () => {
      toast.success('Export Excel', {
        description: 'Génération du fichier Excel...',
        icon: <FileSpreadsheet className="w-4 h-4" />
      });
    });

    window.addEventListener('export-word', () => {
      toast.success('Export Word', {
        description: 'Génération du document Word...',
        icon: <FileImage className="w-4 h-4" />
      });
    });

    // Generic notification handler
    window.addEventListener('show-notification', (event: any) => {
      const { type, message, description } = event.detail;
      const toastFunction = toast[type as keyof typeof toast] || toast.info;
      toastFunction(message, {
        description: description || '',
      });
    });

    // Legal texts events
    window.addEventListener('view-legal-text', (event: any) => {
      const { textId, title, type } = event.detail;
      toast.info(`Consultation: ${title}`, {
        description: `Ouverture du ${type.toLowerCase()}...`,
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('download-legal-text', (event: any) => {
      const { textId, title, format } = event.detail;
      toast.success(`Téléchargement: ${title}`, {
        description: `Génération du fichier ${format.toUpperCase()}...`,
        icon: <Download className="w-4 h-4" />
      });
    });

    window.addEventListener('share-legal-text', (event: any) => {
      const { textId, title } = event.detail;
      toast.info(`Partage: ${title}`, {
        description: 'Ouverture des options de partage...',
        icon: <Share2 className="w-4 h-4" />
      });
    });

    // Browse and search events
    window.addEventListener('browse-legal-type', (event: any) => {
      const { typeId, typeName } = event.detail;
      toast.info(`Parcourir: ${typeName}`, {
        description: 'Chargement des textes par type...',
        icon: <Search className="w-4 h-4" />
      });
    });

    // Form and modal events
    window.addEventListener('open-form-modal', (event: any) => {
      const { formType, title } = event.detail;
      toast.info(`Ouverture: ${title}`, {
        description: 'Chargement du formulaire...',
        icon: <FileText className="w-4 h-4" />
      });
    });

    window.addEventListener('submit-form', (event: any) => {
      const { formType, title } = event.detail;
      toast.success(`Soumission: ${title}`, {
        description: 'Traitement des données en cours...',
        icon: <FileText className="w-4 h-4" />
      });
    });

    // Search interface events
    window.addEventListener('immersive-search', (event: any) => {
      const { searchType, query } = event.detail;
      toast.info(`Recherche ${searchType}`, {
        description: `Recherche: "${query}"...`,
        icon: <Search className="w-4 h-4" />
      });
    });

    // Messages and notifications
    window.addEventListener('mark-message-read', (event: any) => {
      const { messageId } = event.detail;
      toast.success('Message marqué comme lu', {
        description: 'Statut mis à jour',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('delete-message', (event: any) => {
      const { messageId } = event.detail;
      toast.success('Message supprimé', {
        description: 'Message déplacé vers la corbeille',
        icon: <FileText className="w-4 h-4" />
      });
    });

    // Collaboration events
    window.addEventListener('join-forum', (event: any) => {
      const { forumType } = event.detail;
      toast.info(`Rejoindre le forum ${forumType}`, {
        description: 'Connexion en cours...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    window.addEventListener('start-discussion', (event: any) => {
      const { topic } = event.detail;
      toast.info('Nouvelle discussion', {
        description: 'Ouverture de l\'éditeur...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    // Saved searches events
    window.addEventListener('execute-saved-search', (event: any) => {
      const { searchName } = event.detail;
      toast.info(`Exécution: ${searchName}`, {
        description: 'Lancement de la recherche sauvegardée...',
        icon: <Search className="w-4 h-4" />
      });
    });

    window.addEventListener('edit-saved-search', (event: any) => {
      const { searchName } = event.detail;
      toast.info(`Modification: ${searchName}`, {
        description: 'Ouverture de l\'éditeur...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    window.addEventListener('delete-saved-search', (event: any) => {
      const { searchName } = event.detail;
      toast.success(`Suppression: ${searchName}`, {
        description: 'Recherche supprimée',
        icon: <FileText className="w-4 h-4" />
      });
    });

    // Favorites events
    window.addEventListener('add-to-favorites', (event: any) => {
      const { itemType, itemName } = event.detail;
      toast.success(`Ajouté aux favoris: ${itemName}`, {
        description: `${itemType} sauvegardé`,
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('remove-from-favorites', (event: any) => {
      const { itemName } = event.detail;
      toast.success(`Retiré des favoris: ${itemName}`, {
        description: 'Favori supprimé',
        icon: <FileText className="w-4 h-4" />
      });
    });

    // News and library events
    window.addEventListener('read-news', (event: any) => {
      const { newsTitle } = event.detail;
      toast.info(`Lecture: ${newsTitle}`, {
        description: 'Ouverture de l\'article...',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('download-resource', (event: any) => {
      const { resourceName, resourceType } = event.detail;
      toast.success(`Téléchargement: ${resourceName}`, {
        description: `${resourceType} en cours de téléchargement...`,
        icon: <Download className="w-4 h-4" />
      });
    });

    // Dictionary and directory events
    window.addEventListener('search-dictionary', (event: any) => {
      const { term } = event.detail;
      toast.info(`Recherche dans le dictionnaire: ${term}`, {
        description: 'Recherche en cours...',
        icon: <Search className="w-4 h-4" />
      });
    });

    // Timeline and history events
    window.addEventListener('view-timeline-item', (event: any) => {
      const { itemTitle } = event.detail;
      toast.info(`Consultation: ${itemTitle}`, {
        description: 'Ouverture des détails...',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('compare-versions', (event: any) => {
      const { documentTitle } = event.detail;
      toast.info(`Comparaison: ${documentTitle}`, {
        description: 'Ouverture de l\'outil de comparaison...',
        icon: <Settings className="w-4 h-4" />
      });
    });

    // Approval and workflow events
    window.addEventListener('approve-document', (event: any) => {
      const { documentTitle } = event.detail;
      toast.success(`Approuvé: ${documentTitle}`, {
        description: 'Document approuvé avec succès',
        icon: <Eye className="w-4 h-4" />
      });
    });

    window.addEventListener('reject-document', (event: any) => {
      const { documentTitle } = event.detail;
      toast.success(`Rejeté: ${documentTitle}`, {
        description: 'Document rejeté',
        icon: <FileText className="w-4 h-4" />
      });
    });

    window.addEventListener('request-changes', (event: any) => {
      const { documentTitle } = event.detail;
      toast.info(`Modifications demandées: ${documentTitle}`, {
        description: 'Commentaires envoyés à l\'auteur',
        icon: <Settings className="w-4 h-4" />
      });
    });

    // Generic button events
    window.addEventListener('generic-button-click', (event: any) => {
      const { buttonText, action, context } = event.detail;
      toast.info(`${buttonText}`, {
        description: `${action} - ${context}`,
        icon: <Settings className="w-4 h-4" />
      });
    });

    setIsInitialized(true);

    // Cleanup function
    return () => {
      const events = [
        'show-templates-modal',
        'show-template-creator',
        'show-collaborative-editor',
        'show-guide-viewer',
        'download-guide',
        'start-playlist',
        'play-video',
        'download-all-videos',
        'show-playback-preferences',
        'show-playlist-creator',
        'view-resource',
        'download-resource',
        'share-resource',
        'view-document',
        'use-template',
        'start-citation-analysis',
        'open-graph-view',
        'analyze-similarities',
        'show-advanced-filters',
        'refresh-analytics',
        'export-analytics',
        'generate-ai-report',
        'export-pdf',
        'export-excel',
        'export-word',
        'show-notification',
        'show-share-modal',
        'view-legal-text',
        'download-legal-text',
        'share-legal-text',
        'browse-legal-type',
        'open-form-modal',
        'submit-form',
        'immersive-search',
        'mark-message-read',
        'delete-message',
        'join-forum',
        'start-discussion',
        'execute-saved-search',
        'edit-saved-search',
        'delete-saved-search',
        'add-to-favorites',
        'remove-from-favorites',
        'read-news',
        'search-dictionary',
        'view-timeline-item',
        'compare-versions',
        'approve-document',
        'reject-document',
        'request-changes',
        'generic-button-click'
      ];

      events.forEach(eventName => {
        window.removeEventListener(eventName, () => {});
      });
    };
  }, [isInitialized]);

  return null; // This component doesn't render anything
}
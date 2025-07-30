import React, { useState, useEffect } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  FileText, 
  Eye, 
  Share2, 
  Settings, 
  Search, 
  Filter, 
  Save, 
  Edit, 
  Trash2, 
  Plus,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Video,
  FileImage,
  Database
} from 'lucide-react';

interface ModalState {
  isOpen: boolean;
  type: string;
  data?: any;
  title?: string;
  description?: string;
}

interface FunctionalData {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'actif' | 'inactif' | 'en_cours' | 'termine';
  category: string;
  author: string;
  date: string;
  size?: string;
  pages?: number;
  content?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export function FunctionalModalSystem() {
  const { toast } = useToast();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: '',
    data: null
  });

  // Fonction pour générer des données réalistes selon le type
  const generateFunctionalData = (type: string, context?: any): FunctionalData[] => {
    const baseData = {
      id: `${type}-${Date.now()}`,
      author: 'Système Algérien',
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'actif' as const,
      metadata: {
        source: 'Système de gestion algérien',
        version: '1.0',
        lastUpdate: new Date().toISOString()
      }
    };

    switch (type) {
      case 'guide':
        return [{
          ...baseData,
          title: context?.title || 'Guide d\'utilisation',
          description: 'Guide complet pour l\'utilisation des procédures administratives algériennes',
          type: 'Guide',
          category: 'Documentation',
          size: '2.5 MB',
          pages: 45,
          content: 'Ce guide contient toutes les informations nécessaires pour naviguer dans le système de procédures administratives algériennes...',
          tags: ['guide', 'procédures', 'administration', 'algérie']
        }];

      case 'formulaire':
        return [{
          ...baseData,
          title: context?.title || 'Formulaire administratif',
          description: 'Formulaire officiel pour les démarches administratives',
          type: 'Formulaire',
          category: 'Document officiel',
          size: '1.2 MB',
          pages: 8,
          content: 'Formulaire à remplir pour les démarches administratives selon la réglementation algérienne...',
          tags: ['formulaire', 'officiel', 'démarche', 'administration']
        }];

      case 'procedure':
        return [{
          ...baseData,
          title: context?.title || 'Procédure administrative',
          description: 'Procédure détaillée pour les démarches administratives',
          type: 'Procédure',
          category: 'Administration',
          content: 'Étapes détaillées pour effectuer cette procédure administrative selon la réglementation en vigueur...',
          tags: ['procédure', 'étapes', 'administration', 'officiel']
        }];

      case 'document':
        return [{
          ...baseData,
          title: context?.title || 'Document officiel',
          description: 'Document officiel du système administratif algérien',
          type: 'Document',
          category: 'Officiel',
          size: '3.1 MB',
          pages: 25,
          content: 'Document contenant les informations officielles selon la réglementation algérienne...',
          tags: ['document', 'officiel', 'algérie', 'réglementation']
        }];

      case 'template':
        return [{
          ...baseData,
          title: context?.title || 'Modèle de document',
          description: 'Modèle standardisé pour la création de documents',
          type: 'Modèle',
          category: 'Template',
          content: 'Modèle prêt à utiliser conforme aux standards algériens...',
          tags: ['modèle', 'template', 'standard', 'création']
        }];

      case 'resource':
        return [{
          ...baseData,
          title: context?.title || 'Ressource documentaire',
          description: 'Ressource utile pour les procédures administratives',
          type: 'Ressource',
          category: 'Documentation',
          size: '4.2 MB',
          content: 'Ressource contenant des informations complémentaires...',
          tags: ['ressource', 'documentation', 'information', 'aide']
        }];

      case 'video':
        return [{
          ...baseData,
          title: context?.title || 'Tutoriel vidéo',
          description: 'Tutoriel vidéo explicatif',
          type: 'Vidéo',
          category: 'Formation',
          size: '125 MB',
          content: 'Vidéo explicative des procédures administratives...',
          tags: ['vidéo', 'tutoriel', 'formation', 'explication']
        }];

      case 'search':
        return Array.from({ length: 5 }, (_, i) => ({
          ...baseData,
          id: `search-result-${i + 1}`,
          title: `Résultat de recherche ${i + 1}`,
          description: `Description du résultat ${i + 1} correspondant à votre recherche`,
          type: 'Résultat',
          category: 'Recherche',
          content: `Contenu détaillé du résultat ${i + 1}...`,
          tags: ['recherche', 'résultat', 'pertinent']
        }));

      default:
        return [{
          ...baseData,
          title: context?.title || 'Élément fonctionnel',
          description: 'Élément du système avec fonctionnalité complète',
          type: 'Système',
          category: 'Fonctionnel',
          content: 'Contenu fonctionnel du système...',
          tags: ['système', 'fonctionnel']
        }];
    }
  };

  // Fonction pour ouvrir une modal
  const openModal = (type: string, context?: any) => {
    const data = generateFunctionalData(type, context);
    setModalState({
      isOpen: true,
      type,
      data,
      title: getModalTitle(type, context),
      description: getModalDescription(type, context)
    });
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: '',
      data: null
    });
  };

  // Fonctions utilitaires pour les titres et descriptions
  const getModalTitle = (type: string, context?: any) => {
    const titles = {
      guide: 'Consultation du Guide',
      formulaire: 'Téléchargement de Formulaire',
      procedure: 'Détails de la Procédure',
      document: 'Visualisation du Document',
      template: 'Utilisation du Modèle',
      resource: 'Accès aux Ressources',
      video: 'Lecture de Tutoriel',
      search: 'Résultats de Recherche',
      export: 'Exportation de Données',
      share: 'Partage de Contenu',
      edit: 'Modification d\'Élément',
      delete: 'Suppression d\'Élément',
      settings: 'Configuration',
      filter: 'Filtrage Avancé'
    };
    return context?.title || titles[type as keyof typeof titles] || 'Action Fonctionnelle';
  };

  const getModalDescription = (type: string, context?: any) => {
    const descriptions = {
      guide: 'Consultez le guide détaillé pour cette procédure',
      formulaire: 'Téléchargez le formulaire officiel',
      procedure: 'Découvrez les étapes détaillées de cette procédure',
      document: 'Visualisez et gérez ce document',
      template: 'Utilisez ce modèle pour créer vos documents',
      resource: 'Accédez aux ressources complémentaires',
      video: 'Regardez le tutoriel explicatif',
      search: 'Explorez les résultats de votre recherche',
      export: 'Exportez vos données dans le format souhaité',
      share: 'Partagez ce contenu avec d\'autres utilisateurs',
      edit: 'Modifiez les informations de cet élément',
      delete: 'Confirmez la suppression de cet élément',
      settings: 'Configurez les paramètres selon vos besoins',
      filter: 'Appliquez des filtres pour affiner vos résultats'
    };
    return descriptions[type as keyof typeof descriptions] || 'Effectuez cette action fonctionnelle';
  };

  // Gestionnaire d'actions
  const handleAction = (action: string, item?: FunctionalData) => {
    switch (action) {
      case 'download':
        toast({
          title: "Téléchargement initié",
          description: `Le téléchargement de "${item?.title}" a commencé.`,
        });
        // Simuler un téléchargement
        setTimeout(() => {
          toast({
            title: "Téléchargement terminé",
            description: `"${item?.title}" a été téléchargé avec succès.`,
          });
        }, 2000);
        break;

      case 'view':
        toast({
          title: "Ouverture du document",
          description: `"${item?.title}" s'ouvre dans un nouvel onglet.`,
        });
        break;

      case 'share':
        toast({
          title: "Lien de partage généré",
          description: `Le lien de partage pour "${item?.title}" a été copié.`,
        });
        break;

      case 'edit':
        toast({
          title: "Mode édition activé",
          description: `Vous pouvez maintenant modifier "${item?.title}".`,
        });
        break;

      case 'delete':
        toast({
          title: "Élément supprimé",
          description: `"${item?.title}" a été supprimé avec succès.`,
        });
        closeModal();
        break;

      case 'save':
        toast({
          title: "Sauvegarde réussie",
          description: "Les modifications ont été sauvegardées.",
        });
        break;

      default:
        toast({
          title: "Action exécutée",
          description: "L'action a été réalisée avec succès.",
        });
    }
  };

  // Rendu du contenu selon le type de modal
  const renderModalContent = () => {
    const { type, data } = modalState;
    const items = data || [];

    switch (type) {
      case 'search':
        return (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Input placeholder="Affiner la recherche..." className="flex-1" />
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {items.map((item: FunctionalData, index: number) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        {item.tags?.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAction('view', item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleAction('download', item)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'guide':
      case 'document':
      case 'resource':
        const item = items[0];
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>• {item.pages} pages</span>
                <span>• {item.size}</span>
                <span>• {item.date}</span>
              </div>
            </div>
            
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{item.content}</p>
                </div>
                <div className="flex gap-2">
                  {item.tags?.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <p className="text-sm text-gray-900">{item.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Catégorie</label>
                    <p className="text-sm text-gray-900">{item.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auteur</label>
                    <p className="text-sm text-gray-900">{item.author}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Statut</label>
                    <Badge variant={item.status === 'actif' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleAction('download', item)} 
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('share', item)}
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('view', item)}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ouvrir
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction('edit', item)}
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'formulaire':
      case 'template':
        const formItem = items[0];
        return (
          <div className="space-y-6">
            <div className="text-center border-b pb-4">
              <FileText className="w-16 h-16 mx-auto text-blue-600 mb-2" />
              <h3 className="text-lg font-semibold">{formItem.title}</h3>
              <p className="text-gray-600">{formItem.description}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Instructions d'utilisation</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Téléchargez ce formulaire, remplissez-le selon les instructions et 
                    soumettez-le à l'administration compétente.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taille du fichier:</span>
                <span>{formItem.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Format:</span>
                <span>PDF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dernière mise à jour:</span>
                <span>{formItem.date}</span>
              </div>
            </div>
          </div>
        );

      case 'video':
        const videoItem = items[0];
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Video className="w-20 h-20 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold">{videoItem.title}</h3>
              <p className="text-gray-600 mt-2">{videoItem.description}</p>
            </div>
            
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Lecteur vidéo simulé</p>
                <p className="text-sm text-gray-400">Durée: 15:30</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleAction('view', videoItem)}>
                <Video className="w-4 h-4 mr-2" />
                Lire la vidéo
              </Button>
              <Button variant="outline" onClick={() => handleAction('download', videoItem)}>
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        );

      case 'filter':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Type de document</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loi">Loi</SelectItem>
                    <SelectItem value="decret">Décret</SelectItem>
                    <SelectItem value="arrete">Arrêté</SelectItem>
                    <SelectItem value="circulaire">Circulaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Statut</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="archive">Archivé</SelectItem>
                    <SelectItem value="brouillon">Brouillon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Date de début</label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Date de fin</label>
                <Input type="date" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Mots-clés</label>
              <Input placeholder="Rechercher par mots-clés..." />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="display">Affichage</TabsTrigger>
                <TabsTrigger value="advanced">Avancé</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Langue</label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Région</label>
                  <Select defaultValue="dz">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dz">Algérie</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="display" className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Mode sombre</label>
                  <input type="checkbox" className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Notifications</label>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Cache</label>
                  <Button variant="outline" className="w-full mt-1">
                    Vider le cache
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold">Action fonctionnelle</h3>
            <p className="text-gray-600 mt-2">Cette action est maintenant opérationnelle.</p>
          </div>
        );
    }
  };

  // Footer des modales
  const renderModalFooter = () => {
    const { type } = modalState;
    
    switch (type) {
      case 'filter':
        return (
          <div className="flex gap-3">
            <Button variant="outline" onClick={closeModal} className="flex-1">
              Annuler
            </Button>
            <Button onClick={() => handleAction('save')} className="flex-1">
              Appliquer les filtres
            </Button>
          </div>
        );
        
      case 'settings':
        return (
          <div className="flex gap-3">
            <Button variant="outline" onClick={closeModal} className="flex-1">
              Annuler
            </Button>
            <Button onClick={() => handleAction('save')} className="flex-1">
              Sauvegarder
            </Button>
          </div>
        );
        
      case 'formulaire':
      case 'template':
        const item = modalState.data?.[0];
        return (
          <div className="flex gap-3">
            <Button variant="outline" onClick={closeModal} className="flex-1">
              Fermer
            </Button>
            <Button onClick={() => handleAction('download', item)} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        );
        
      default:
        return (
          <Button onClick={closeModal} className="w-full">
            Fermer
          </Button>
        );
    }
  };

  // Écouter les événements globaux pour ouvrir les modales
  useEffect(() => {
    const handleModalEvent = (event: CustomEvent) => {
      const { type, context } = event.detail;
      openModal(type, context);
    };

    window.addEventListener('open-functional-modal', handleModalEvent as EventListener);
    
    return () => {
      window.removeEventListener('open-functional-modal', handleModalEvent as EventListener);
    };
  }, []);

  return (
    <BaseModal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      title={modalState.title}
      description={modalState.description}
      size="lg"
      footer={renderModalFooter()}
    >
      {renderModalContent()}
    </BaseModal>
  );
}

// Fonction utilitaire pour déclencher les modales depuis n'importe où
export const openFunctionalModal = (type: string, context?: any) => {
  window.dispatchEvent(new CustomEvent('open-functional-modal', {
    detail: { type, context }
  }));
};
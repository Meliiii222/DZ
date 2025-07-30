
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  FileText, 
  PenTool, 
  Bot, 
  Download, 
  Eye, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Book,
  Scale,
  FileCheck,
  Printer
} from 'lucide-react';

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  complexity: 'Simple' | 'Moyen' | 'Complexe';
  estimatedTime: string;
  fields: string[];
}

interface GeneratedDocument {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'completed';
  progress: number;
  wordCount: number;
  createdAt: string;
  lastModified: string;
}

export function DocumentComposer() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const templates: DocumentTemplate[] = [
    {
      id: '1',
      name: 'Contrat de Travail',
      category: 'Droit du Travail',
      description: 'Contrat de travail à durée indéterminée conforme au droit algérien',
      complexity: 'Moyen',
      estimatedTime: '15-20 minutes',
      fields: ['Employeur', 'Employé', 'Poste', 'Salaire', 'Durée', 'Clauses spéciales']
    },
    {
      id: '2',
      name: 'Acte de Vente Immobilière',
      category: 'Droit Immobilier',
      description: 'Acte de vente d\'un bien immobilier avec toutes les clauses légales',
      complexity: 'Complexe',
      estimatedTime: '30-45 minutes',
      fields: ['Vendeur', 'Acquéreur', 'Bien', 'Prix', 'Conditions', 'Garanties']
    },
    {
      id: '3',
      name: 'Statuts de Société',
      category: 'Droit Commercial',
      description: 'Statuts de société à responsabilité limitée (SARL)',
      complexity: 'Complexe',
      estimatedTime: '45-60 minutes',
      fields: ['Dénomination', 'Capital', 'Objet social', 'Associés', 'Gérance', 'Assemblées']
    },
    {
      id: '4',
      name: 'Requête Administrative',
      category: 'Droit Administratif',
      description: 'Requête devant le tribunal administratif',
      complexity: 'Moyen',
      estimatedTime: '20-30 minutes',
      fields: ['Requérant', 'Administration', 'Objet', 'Moyens', 'Conclusions']
    },
    {
      id: '5',
      name: 'Bail Commercial',
      category: 'Droit Commercial',
      description: 'Contrat de bail commercial avec clauses de protection',
      complexity: 'Moyen',
      estimatedTime: '25-35 minutes',
      fields: ['Bailleur', 'Locataire', 'Local', 'Loyer', 'Durée', 'Conditions']
    },
    {
      id: '6',
      name: 'Convention de Divorce',
      category: 'Droit Civil',
      description: 'Convention de divorce par consentement mutuel',
      complexity: 'Complexe',
      estimatedTime: '40-50 minutes',
      fields: ['Époux', 'Enfants', 'Biens', 'Pension', 'Garde', 'Accord']
    },
    {
      id: '7',
      name: 'Procès-Verbal d\'Assemblée',
      category: 'Droit Commercial',
      description: 'Procès-verbal d\'assemblée générale ordinaire',
      complexity: 'Simple',
      estimatedTime: '10-15 minutes',
      fields: ['Société', 'Date', 'Présents', 'Ordre du jour', 'Décisions']
    },
    {
      id: '8',
      name: 'Contrat de Prestation de Services',
      category: 'Droit Commercial',
      description: 'Contrat de prestation de services professionnels',
      complexity: 'Moyen',
      estimatedTime: '20-25 minutes',
      fields: ['Prestataire', 'Client', 'Services', 'Tarifs', 'Durée', 'Conditions']
    },
    {
      id: '9',
      name: 'Testament Authentique',
      category: 'Droit Civil',
      description: 'Testament authentique devant notaire',
      complexity: 'Complexe',
      estimatedTime: '35-45 minutes',
      fields: ['Testateur', 'Légataires', 'Biens', 'Conditions', 'Exécuteur']
    },
    {
      id: '10',
      name: 'Demande de Licence Commerciale',
      category: 'Droit Administratif',
      description: 'Demande de licence d\'exploitation commerciale',
      complexity: 'Moyen',
      estimatedTime: '15-20 minutes',
      fields: ['Demandeur', 'Activité', 'Local', 'Documents', 'Garanties']
    },
    {
      id: '11',
      name: 'Contrat de Mariage',
      category: 'Droit Civil',
      description: 'Contrat de mariage avec régime matrimonial',
      complexity: 'Complexe',
      estimatedTime: '50-60 minutes',
      fields: ['Époux', 'Régime', 'Biens', 'Clauses', 'Conditions']
    },
    {
      id: '12',
      name: 'Acte de Cession de Parts',
      category: 'Droit Commercial',
      description: 'Acte de cession de parts sociales',
      complexity: 'Moyen',
      estimatedTime: '25-30 minutes',
      fields: ['Cédant', 'Cessionnaire', 'Parts', 'Prix', 'Conditions', 'Approbation']
    }
  ];

  // Pagination pour les modèles disponibles
  const {
    currentData: paginatedTemplates,
    currentPage: templatesCurrentPage,
    totalPages: templatesTotalPages,
    itemsPerPage: templatesItemsPerPage,
    totalItems: templatesTotalItems,
    setCurrentPage: setTemplatesCurrentPage,
    setItemsPerPage: setTemplatesItemsPerPage
  } = usePagination({
    data: templates,
    itemsPerPage: 10
  });

  const documents: GeneratedDocument[] = [
    {
      id: '1',
      title: 'Contrat de Travail - Ahmed Benali',
      type: 'Contrat de Travail',
      status: 'completed',
      progress: 100,
      wordCount: 1247,
      createdAt: '2024-01-15',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      title: 'Acte de Vente - Villa Hydra',
      type: 'Acte de Vente Immobilière',
      status: 'review',
      progress: 85,
      wordCount: 2156,
      createdAt: '2024-01-14',
      lastModified: '2024-01-15'
    },
    {
      id: '3',
      title: 'Statuts SARL - TechCorp',
      type: 'Statuts de Société',
      status: 'draft',
      progress: 60,
      wordCount: 1834,
      createdAt: '2024-01-13',
      lastModified: '2024-01-14'
    },
    {
      id: '4',
      title: 'Requête Administrative - Mairie d\'Alger',
      type: 'Requête Administrative',
      status: 'completed',
      progress: 100,
      wordCount: 892,
      createdAt: '2024-01-12',
      lastModified: '2024-01-12'
    },
    {
      id: '5',
      title: 'Bail Commercial - Centre Commercial',
      type: 'Bail Commercial',
      status: 'review',
      progress: 75,
      wordCount: 1567,
      createdAt: '2024-01-11',
      lastModified: '2024-01-13'
    },
    {
      id: '6',
      title: 'Convention de Divorce - Famille Martin',
      type: 'Convention de Divorce',
      status: 'draft',
      progress: 45,
      wordCount: 2341,
      createdAt: '2024-01-10',
      lastModified: '2024-01-12'
    },
    {
      id: '7',
      title: 'Procès-Verbal AG - Entreprise SARL',
      type: 'Procès-Verbal d\'Assemblée',
      status: 'completed',
      progress: 100,
      wordCount: 678,
      createdAt: '2024-01-09',
      lastModified: '2024-01-09'
    },
    {
      id: '8',
      title: 'Contrat de Services - Cabinet Avocat',
      type: 'Contrat de Prestation de Services',
      status: 'review',
      progress: 90,
      wordCount: 1345,
      createdAt: '2024-01-08',
      lastModified: '2024-01-11'
    },
    {
      id: '9',
      title: 'Testament Authentique - M. Dubois',
      type: 'Testament Authentique',
      status: 'draft',
      progress: 30,
      wordCount: 1890,
      createdAt: '2024-01-07',
      lastModified: '2024-01-10'
    },
    {
      id: '10',
      title: 'Demande de Licence - Restaurant Le Gourmet',
      type: 'Demande de Licence Commerciale',
      status: 'completed',
      progress: 100,
      wordCount: 756,
      createdAt: '2024-01-06',
      lastModified: '2024-01-08'
    },
    {
      id: '11',
      title: 'Contrat de Mariage - Famille Benali',
      type: 'Contrat de Mariage',
      status: 'review',
      progress: 80,
      wordCount: 1678,
      createdAt: '2024-01-05',
      lastModified: '2024-01-09'
    },
    {
      id: '12',
      title: 'Acte de Cession - Parts Sociales SARL',
      type: 'Acte de Cession de Parts',
      status: 'draft',
      progress: 55,
      wordCount: 1123,
      createdAt: '2024-01-04',
      lastModified: '2024-01-07'
    }
  ];

  // Pagination pour les documents générés
  const {
    currentData: paginatedDocuments,
    currentPage: documentsCurrentPage,
    totalPages: documentsTotalPages,
    itemsPerPage: documentsItemsPerPage,
    totalItems: documentsTotalItems,
    setCurrentPage: setDocumentsCurrentPage,
    setItemsPerPage: setDocumentsItemsPerPage
  } = usePagination({
    data: documents,
    itemsPerPage: 6
  });

  const handleGenerateDocument = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulation de génération
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'review': return 'bg-orange-500';
      case 'draft': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'draft': return <FileText className="w-4 h-4 text-blue-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-orange-100 text-orange-800';
      case 'Complexe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-600" />
            Rédaction Complète de Documents IA
          </CardTitle>
          <p className="text-gray-600">
            Génération automatique de documents juridiques complets avec IA avancée
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Modèles Disponibles</TabsTrigger>
          <TabsTrigger value="composer">Compositeur IA</TabsTrigger>
          <TabsTrigger value="documents">Mes Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-600" />
                Bibliothèque de Modèles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge className={getComplexityColor(template.complexity)}>
                        {template.complexity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <p className="text-xs text-gray-500">
                        Temps estimé: {template.estimatedTime}
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Champs requis:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => handleGenerateDocument(template)}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Générer le Document
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Pagination pour les modèles disponibles */}
              <Pagination
                currentPage={templatesCurrentPage}
                totalPages={templatesTotalPages}
                totalItems={templatesTotalItems}
                itemsPerPage={templatesItemsPerPage}
                onPageChange={setTemplatesCurrentPage}
                onItemsPerPageChange={setTemplatesItemsPerPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composer" className="space-y-6">
          {isGenerating ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  Génération en cours...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Génération: {selectedTemplate?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {generationProgress}%
                    </span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                  <div className="text-sm text-gray-600">
                    {generationProgress < 30 && "Analyse des données d'entrée..."}
                    {generationProgress >= 30 && generationProgress < 60 && "Génération du contenu..."}
                    {generationProgress >= 60 && generationProgress < 90 && "Application des clauses légales..."}
                    {generationProgress >= 90 && "Finalisation du document..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Compositeur IA Intelligent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Prêt à créer votre document</h3>
                  <p className="text-gray-600 mb-4">
                    Sélectionnez un modèle dans l'onglet "Modèles Disponibles" pour commencer
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <Scale className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-medium">Conformité Légale</h4>
                      <p className="text-sm text-gray-600">100% conforme au droit algérien</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium">Validation Auto</h4>
                      <p className="text-sm text-gray-600">Vérification automatique des clauses</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium">IA Générative</h4>
                      <p className="text-sm text-gray-600">Contenu adapté et personnalisé</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-green-600" />
                Documents Générés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedDocuments.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc.status)}
                        <h3 className="font-semibold">{doc.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{doc.type}</Badge>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(doc.status)}`}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{doc.wordCount} mots</span>
                      <span>Créé le {doc.createdAt}</span>
                      <span>Modifié le {doc.lastModified}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <Progress value={doc.progress} className="flex-1 mr-4" />
                      <span className="text-sm font-medium">{doc.progress}%</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <PenTool className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="w-3 h-3 mr-1" />
                        Imprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination pour les documents générés */}
              <Pagination
                currentPage={documentsCurrentPage}
                totalPages={documentsTotalPages}
                totalItems={documentsTotalItems}
                itemsPerPage={documentsItemsPerPage}
                onPageChange={setDocumentsCurrentPage}
                onItemsPerPageChange={setDocumentsItemsPerPage}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

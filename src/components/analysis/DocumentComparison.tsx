import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  useFunctionalModals, 
  DocumentViewModal, 
  DownloadModal, 
  ComparisonModal
} from '@/components/modals/FunctionalModals';
import { 
  GitCompare, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  FileText,
  Calendar,
  User,
  Building,
  Scale,
  BookOpen,
  Gavel,
  Star,
  Plus,
  X,
  Check,
  AlertTriangle,
  Info,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'legal' | 'procedure';
  category: string;
  author: string;
  institution: string;
  date: string;
  version: string;
  status: 'En vigueur' | 'Actif' | 'Archivé' | 'Brouillon';
  size: string;
  pages: number;
  language: string;
  description: string;
}

interface ComparisonResult {
  similarity: number;
  differences: string[];
  commonElements: string[];
  recommendations: string[];
  analysisType: string;
}

export function DocumentComparison() {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'legal' | 'procedure'>('all');
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const {
    modals,
    openDocumentView,
    openDownload,
    openComparison,
    closeModal
  } = useFunctionalModals();

  // Documents d'exemple
  const availableDocuments: Document[] = [
    {
      id: '1',
      title: 'Code civil algérien',
      type: 'legal',
      category: 'Code',
      author: 'Ministère de la Justice',
      institution: 'République Algérienne',
      date: '2024-01-15',
      version: 'v3.2',
      status: 'En vigueur',
      size: '2.4 MB',
      pages: 456,
      language: 'Français',
      description: 'Code civil avec les dernières modifications législatives'
    },
    {
      id: '2',
      title: 'Code de procédure civile',
      type: 'legal',
      category: 'Code',
      author: 'Ministère de la Justice',
      institution: 'République Algérienne',
      date: '2024-01-10',
      version: 'v2.8',
      status: 'En vigueur',
      size: '1.8 MB',
      pages: 312,
      language: 'Français',
      description: 'Procédures civiles et administratives'
    },
    {
      id: '3',
      title: 'Procédure de création d\'entreprise SARL',
      type: 'procedure',
      category: 'Entreprise',
      author: 'CNRC',
      institution: 'Centre National du Registre de Commerce',
      date: '2024-01-08',
      version: 'v2.1',
      status: 'Actif',
      size: '1.2 MB',
      pages: 45,
      language: 'Français',
      description: 'Guide complet pour la création d\'une SARL'
    },
    {
      id: '4',
      title: 'Loi de finances 2024',
      type: 'legal',
      category: 'Loi',
      author: 'Ministère des Finances',
      institution: 'République Algérienne',
      date: '2023-12-30',
      version: 'v1.3',
      status: 'En vigueur',
      size: '3.1 MB',
      pages: 198,
      language: 'Français',
      description: 'Dispositions fiscales et budgétaires pour 2024'
    },
    {
      id: '5',
      title: 'Procédure de demande de passeport',
      type: 'procedure',
      category: 'État Civil',
      author: 'Direction Générale de la Sûreté Nationale',
      institution: 'Ministère de l\'Intérieur',
      date: '2024-01-05',
      version: 'v1.4',
      status: 'Actif',
      size: '0.8 MB',
      pages: 28,
      language: 'Français',
      description: 'Procédure complète pour l\'obtention d\'un passeport'
    },
    {
      id: '6',
      title: 'Code du travail',
      type: 'legal',
      category: 'Code',
      author: 'Ministère du Travail',
      institution: 'République Algérienne',
      date: '2023-11-20',
      version: 'v4.1',
      status: 'En vigueur',
      size: '2.9 MB',
      pages: 387,
      language: 'Français',
      description: 'Réglementation du travail et de l\'emploi'
    },
    {
      id: '7',
      title: 'Procédure de permis de construire',
      type: 'procedure',
      category: 'Urbanisme',
      author: 'Direction de l\'Urbanisme',
      institution: 'Ministère de l\'Habitat',
      date: '2024-01-12',
      version: 'v1.7',
      status: 'Actif',
      size: '1.5 MB',
      pages: 67,
      language: 'Français',
      description: 'Procédure complète pour l\'obtention d\'un permis de construire'
    },
    {
      id: '8',
      title: 'Code de commerce',
      type: 'legal',
      category: 'Code',
      author: 'Ministère du Commerce',
      institution: 'République Algérienne',
      date: '2023-10-15',
      version: 'v3.5',
      status: 'En vigueur',
      size: '2.7 MB',
      pages: 423,
      language: 'Français',
      description: 'Réglementation commerciale et des échanges'
    },
    {
      id: '9',
      title: 'Procédure de carte d\'identité nationale',
      type: 'procedure',
      category: 'État Civil',
      author: 'Direction Générale de la Sûreté Nationale',
      institution: 'Ministère de l\'Intérieur',
      date: '2024-01-03',
      version: 'v2.0',
      status: 'Actif',
      size: '0.9 MB',
      pages: 34,
      language: 'Français',
      description: 'Procédure pour l\'obtention de la carte d\'identité nationale'
    },
    {
      id: '10',
      title: 'Code pénal',
      type: 'legal',
      category: 'Code',
      author: 'Ministère de la Justice',
      institution: 'République Algérienne',
      date: '2023-09-25',
      version: 'v4.2',
      status: 'En vigueur',
      size: '3.3 MB',
      pages: 512,
      language: 'Français',
      description: 'Réglementation pénale et des infractions'
    },
    {
      id: '11',
      title: 'Procédure de déclaration fiscale',
      type: 'procedure',
      category: 'Fiscalité',
      author: 'Direction Générale des Impôts',
      institution: 'Ministère des Finances',
      date: '2024-01-07',
      version: 'v1.8',
      status: 'Actif',
      size: '1.1 MB',
      pages: 41,
      language: 'Français',
      description: 'Procédure de déclaration fiscale pour les entreprises'
    },
    {
      id: '12',
      title: 'Loi sur la protection des données',
      type: 'legal',
      category: 'Loi',
      author: 'Ministère du Numérique',
      institution: 'République Algérienne',
      date: '2024-01-20',
      version: 'v1.0',
      status: 'En vigueur',
      size: '1.6 MB',
      pages: 89,
      language: 'Français',
      description: 'Protection des données personnelles et vie privée'
    }
  ];

  const filteredDocuments = availableDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesType && !selectedDocuments.find(selected => selected.id === doc.id);
  });

  // Pagination pour les documents disponibles
  const {
    currentData: paginatedFilteredDocuments,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredDocuments,
    itemsPerPage: 6
  });

  const categories = [...new Set(availableDocuments.map(doc => doc.category))];

  const addDocument = (document: Document) => {
    if (selectedDocuments.length < 5) { // Limite à 5 documents
      setSelectedDocuments([...selectedDocuments, document]);
    }
  };

  const removeDocument = (documentId: string) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.id !== documentId));
  };

  const startComparison = async () => {
    if (selectedDocuments.length < 2) return;
    
    setIsComparing(true);
    
    // Simulation d'analyse de comparaison
    setTimeout(() => {
      const mockResults: ComparisonResult = {
        similarity: Math.floor(Math.random() * 40) + 30, // 30-70%
        differences: [
          'Différences dans la structure des articles',
          'Terminologie juridique variée',
          'Références légales distinctes',
          'Dates d\'entrée en vigueur différentes',
          'Champs d\'application spécifiques'
        ],
        commonElements: [
          'Références à la Constitution algérienne',
          'Structure hiérarchique similaire',
          'Principes juridiques fondamentaux',
          'Procédures d\'application communes'
        ],
        recommendations: [
          'Harmoniser la terminologie juridique',
          'Standardiser les références croisées',
          'Mettre à jour les dates de référence',
          'Améliorer la cohérence structurelle'
        ],
        analysisType: 'Analyse comparative automatisée'
      };
      
      setComparisonResults(mockResults);
      setIsComparing(false);
    }, 3000);
  };

  const getTypeColor = (type: string) => {
    return type === 'legal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur':
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'Archivé':
        return 'bg-gray-100 text-gray-800';
      case 'Brouillon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600" />
            Comparaison des Documents
          </CardTitle>
          <p className="text-gray-600">
            Comparez deux ou plusieurs documents juridiques et procédures pour identifier les similitudes, 
            différences et recommandations d'harmonisation.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sélection des documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Sélectionner les documents à comparer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filtres et recherche */}
            <div className="space-y-3">
              <Input
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  Tous
                </Button>
                <Button
                  variant={filterType === 'legal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('legal')}
                >
                  Textes juridiques
                </Button>
                <Button
                  variant={filterType === 'procedure' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('procedure')}
                >
                  Procédures administratives
                </Button>
              </div>
            </div>

            {/* Liste des documents disponibles */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {paginatedFilteredDocuments.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{document.title}</h4>
                      <Badge className={getTypeColor(document.type)}>
                        {document.type === 'legal' ? 'Juridique' : 'Procédure'}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>{document.category} • {document.version} • {document.date}</div>
                      <div>{document.institution}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addDocument(document)}
                    disabled={selectedDocuments.length >= 5}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents sélectionnés et comparaison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents sélectionnés ({selectedDocuments.length}/5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Documents sélectionnés */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedDocuments.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{document.title}</h4>
                      <Badge className={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">
                      {document.category} • {document.pages} pages • {document.size}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDocumentView(document)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeDocument(document.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {selectedDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Sélectionnez au moins 2 documents pour commencer la comparaison</p>
              </div>
            )}

            {/* Bouton de comparaison */}
            {selectedDocuments.length >= 2 && (
              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={startComparison}
                  disabled={isComparing}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  {isComparing ? 'Comparaison en cours...' : `Comparer ${selectedDocuments.length} documents`}
                </Button>
                
                {selectedDocuments.length > 2 && (
                  <p className="text-xs text-gray-600 text-center">
                    Comparaison multi-documents activée
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Résultats de comparaison */}
      {comparisonResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Résultats de la Comparaison
            </CardTitle>
            <p className="text-gray-600">
              {comparisonResults.analysisType} de {selectedDocuments.length} documents
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="differences">Différences</TabsTrigger>
                <TabsTrigger value="similarities">Similitudes</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {comparisonResults.similarity}%
                      </div>
                      <div className="text-sm text-gray-600">Similarité globale</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {comparisonResults.differences.length}
                      </div>
                      <div className="text-sm text-gray-600">Différences détectées</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {comparisonResults.commonElements.length}
                      </div>
                      <div className="text-sm text-gray-600">Éléments communs</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="differences" className="space-y-3">
                {comparisonResults.differences.map((difference, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm">{difference}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="similarities" className="space-y-3">
                {comparisonResults.commonElements.map((element, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm">{element}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-3">
                {comparisonResults.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => openDownload(selectedDocuments)}>
                <Download className="w-4 h-4 mr-2" />
                Télécharger le rapport
              </Button>
              <Button variant="outline" onClick={() => openComparison(selectedDocuments, 'documents')}>
                <GitCompare className="w-4 h-4 mr-2" />
                Comparaison détaillée
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modales */}
      {modals.documentView.document && (
        <DocumentViewModal
          isOpen={modals.documentView.isOpen}
          onClose={() => closeModal('documentView')}
          document={modals.documentView.document}
        />
      )}

      {modals.download.document && (
        <DownloadModal
          isOpen={modals.download.isOpen}
          onClose={() => closeModal('download')}
          document={modals.download.document}
        />
      )}

      {modals.comparison.items.length > 0 && (
        <ComparisonModal
          isOpen={modals.comparison.isOpen}
          onClose={() => closeModal('comparison')}
          items={modals.comparison.items}
          type={modals.comparison.type}
        />
      )}
    </div>
  );
}
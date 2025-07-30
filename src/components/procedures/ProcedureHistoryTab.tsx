import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  useFunctionalModals, 
  DocumentViewModal, 
  DownloadModal, 
  ComparisonModal
} from '@/components/modals/FunctionalModals';
import { 
  History, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  GitCompare, 
  Calendar, 
  User, 
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Archive,
  RefreshCw,
  Building,
  Users,
  Star
} from 'lucide-react';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface ProcedureVersion {
  id: string;
  procedureName: string;
  version: string;
  date: string;
  author: string;
  institution: string;
  type: 'Création' | 'Mise à jour majeure' | 'Mise à jour mineure' | 'Correction' | 'Révision' | 'Archivage';
  changes: string;
  status: 'Actif' | 'Archivé' | 'Brouillon' | 'En révision';
  category: string;
  stepsCount: number;
  documentsCount: number;
  formsCount: number;
  impact: 'Majeur' | 'Mineur' | 'Critique';
  validatedBy?: string;
  comments?: string;
}

const mockProcedureVersions: ProcedureVersion[] = [
  {
    id: '1',
    procedureName: 'Création d\'entreprise SARL',
    version: 'v3.2',
    date: '15/01/2024',
    author: 'Ahmed Benali',
    institution: 'Centre National du Registre de Commerce',
    type: 'Mise à jour majeure',
    changes: 'Ajout de nouvelles étapes pour la dématérialisation et mise à jour des formulaires obligatoires',
    status: 'Actif',
    category: 'Commercial',
    stepsCount: 8,
    documentsCount: 12,
    formsCount: 4,
    impact: 'Majeur',
    validatedBy: 'Direction Générale CNRC',
    comments: 'Intégration des nouvelles dispositions de la loi sur la digitalisation'
  },
  {
    id: '2',
    procedureName: 'Demande de passeport biométrique',
    version: 'v2.5',
    date: '12/01/2024',
    author: 'Fatima Kaddour',
    institution: 'Ministère de l\'Intérieur',
    type: 'Mise à jour mineure',
    changes: 'Modification des délais de traitement et ajout de nouveaux centres de dépôt',
    status: 'Actif',
    category: 'Civil',
    stepsCount: 6,
    documentsCount: 8,
    formsCount: 2,
    impact: 'Mineur',
    validatedBy: 'Direction des Passeports',
    comments: 'Optimisation des délais suite à l\'ouverture de nouveaux centres'
  },
  {
    id: '3',
    procedureName: 'Déclaration fiscale annuelle',
    version: 'v4.1',
    date: '10/01/2024',
    author: 'Mohamed Cherif',
    institution: 'Direction Générale des Impôts',
    type: 'Révision',
    changes: 'Révision complète des formulaires et mise à jour des barèmes fiscaux 2024',
    status: 'En révision',
    category: 'Fiscal',
    stepsCount: 10,
    documentsCount: 15,
    formsCount: 6,
    impact: 'Critique',
    validatedBy: 'En attente',
    comments: 'Révision en cours pour conformité avec la nouvelle loi de finances'
  },
  {
    id: '4',
    procedureName: 'Permis de construire résidentiel',
    version: 'v2.8',
    date: '08/01/2024',
    author: 'Leila Mansouri',
    institution: 'Direction de l\'Urbanisme',
    type: 'Correction',
    changes: 'Correction des erreurs dans les formulaires et clarification des étapes',
    status: 'Actif',
    category: 'Urbanisme',
    stepsCount: 12,
    documentsCount: 18,
    formsCount: 8,
    impact: 'Mineur',
    validatedBy: 'Service Urbanisme',
    comments: 'Corrections mineures suite aux retours des utilisateurs'
  },
  {
    id: '5',
    procedureName: 'Création d\'entreprise SARL',
    version: 'v3.1',
    date: '05/01/2024',
    author: 'Ahmed Benali',
    institution: 'Centre National du Registre de Commerce',
    type: 'Mise à jour mineure',
    changes: 'Mise à jour des coordonnées des centres et correction de liens',
    status: 'Archivé',
    category: 'Commercial',
    stepsCount: 7,
    documentsCount: 11,
    formsCount: 3,
    impact: 'Mineur',
    validatedBy: 'Direction Générale CNRC',
    comments: 'Version remplacée par v3.2'
  },
  {
    id: '6',
    procedureName: 'Demande d\'autorisation d\'exercice',
    version: 'v1.3',
    date: '03/01/2024',
    author: 'Karim Boudiaf',
    institution: 'Ministère de la Santé',
    type: 'Création',
    changes: 'Création de la procédure pour les professionnels de santé étrangers',
    status: 'Actif',
    category: 'Santé',
    stepsCount: 9,
    documentsCount: 14,
    formsCount: 5,
    impact: 'Majeur',
    validatedBy: 'Direction des Ressources Humaines',
    comments: 'Nouvelle procédure suite à la réforme du secteur de la santé'
  }
];

export function ProcedureHistoryTab() {
  const { modals, openDocumentView, openDownload, openComparison, closeModal } = useFunctionalModals();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModificationType, setSelectedModificationType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const categories = ['Tous', 'Commercial', 'Civil', 'Fiscal', 'Administratif', 'Social', 'Environnemental'];
  const modificationTypes = ['Tous', 'Création', 'Mise à jour majeure', 'Mise à jour mineure', 'Correction', 'Révision', 'Archivage'];
  const statuses = ['Tous', 'Actif', 'Archivé', 'Brouillon', 'En révision'];
  const institutions = ['Tous', 'CNRC', 'Ministère de l\'Intérieur', 'DGI', 'Ministère du Travail', 'Ministère de l\'Environnement'];

  const filteredVersions = mockProcedureVersions.filter(version => {
    const matchesSearch = version.procedureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.changes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || version.category === selectedCategory;
    const matchesModificationType = !selectedModificationType || selectedModificationType === 'Tous' || version.type === selectedModificationType;
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || version.status === selectedStatus;
    const matchesInstitution = !selectedInstitution || selectedInstitution === 'Tous' || version.institution.includes(selectedInstitution);
    
    return matchesSearch && matchesCategory && matchesModificationType && matchesStatus && matchesInstitution;
  });

  // Pagination sur les versions filtrées
  const {
    currentData: paginatedVersions,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({ data: filteredVersions, itemsPerPage: 10 });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Création': return 'bg-green-100 text-green-800';
      case 'Mise à jour majeure': return 'bg-blue-100 text-blue-800';
      case 'Mise à jour mineure': return 'bg-cyan-100 text-cyan-800';
      case 'Correction': return 'bg-yellow-100 text-yellow-800';
      case 'Révision': return 'bg-purple-100 text-purple-800';
      case 'Archivage': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'Archivé': return 'bg-gray-100 text-gray-800';
      case 'Brouillon': return 'bg-orange-100 text-orange-800';
      case 'En révision': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critique': return 'bg-red-100 text-red-800';
      case 'Majeur': return 'bg-orange-100 text-orange-800';
      case 'Mineur': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Actif': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Archivé': return <Archive className="w-4 h-4 text-gray-600" />;
      case 'Brouillon': return <Edit className="w-4 h-4 text-orange-600" />;
      case 'En révision': return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleVersionSelection = (versionId: string, checked: boolean) => {
    if (checked) {
      setSelectedVersions([...selectedVersions, versionId]);
    } else {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    }
  };

  const handleCompareVersions = () => {
    if (selectedVersions.length >= 2) {
      const versionsToCompare = mockProcedureVersions.filter(v => selectedVersions.includes(v.id));
      openComparison(versionsToCompare, 'versions');
    } else {
      alert('⚠️ Veuillez sélectionner au moins 2 versions pour effectuer une comparaison.');
    }
  };

  return (
    <>
    <div className="space-y-6">
      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" />
            Filtres et recherche
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedModificationType} onValueChange={setSelectedModificationType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de modification" />
              </SelectTrigger>
              <SelectContent>
                {modificationTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Institution" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedModificationType('');
                setSelectedStatus('');
                setSelectedInstitution('');
              }}
            >
              Réinitialiser
            </Button>
          </div>

          {selectedVersions.length >= 2 && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-emerald-800 font-medium">
                {selectedVersions.length} versions sélectionnées pour comparaison
              </span>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleCompareVersions}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Comparer les versions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{filteredVersions.length}</p>
            <p className="text-sm text-gray-600">Versions trouvées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'Actif').length}
            </p>
            <p className="text-sm text-gray-600">Versions actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'En révision').length}
            </p>
            <p className="text-sm text-gray-600">En révision</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Archive className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {filteredVersions.filter(v => v.status === 'Archivé').length}
            </p>
            <p className="text-sm text-gray-600">Archivées</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des versions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            Historique des modifications ({filteredVersions.length} résultats)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedVersions.map((version) => (
              <div key={version.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.id)}
                      onChange={(e) => handleVersionSelection(version.id, e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg text-gray-900">{version.procedureName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {version.version}
                        </Badge>
                        <Badge className={getTypeColor(version.type)}>
                          {version.type}
                        </Badge>
                        <Badge className={getImpactColor(version.impact)}>
                          Impact {version.impact}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{version.changes}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Auteur:</span>
                          <span className="font-medium">{version.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Institution:</span>
                          <span className="font-medium">{version.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{version.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Étapes:</span>
                          <span className="font-medium">{version.stepsCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Documents:</span>
                          <span className="font-medium">{version.documentsCount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Formulaires:</span>
                          <span className="font-medium">{version.formsCount}</span>
                        </div>
                      </div>

                      {version.validatedBy && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">Validé par:</span>
                            <span className="font-medium">{version.validatedBy}</span>
                          </div>
                          {version.comments && (
                            <p className="text-sm text-gray-600 mt-2">{version.comments}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(version.status)}
                      <Badge className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button variant="ghost" size="sm">
                        <GitCompare className="w-4 h-4 mr-1" />
                        Comparer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>

          {filteredVersions.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Aucune version trouvée</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modales fonctionnelles */}
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
      
      <ComparisonModal
        isOpen={modals.comparison.isOpen}
        onClose={() => closeModal('comparison')}
        items={modals.comparison.items}
        type={modals.comparison.type}
      />
    </div>
    </>
  );
}
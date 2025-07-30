import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Search, 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Eye, 
  GitBranch,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DocumentVersion {
  id: string;
  version: string;
  title: string;
  type: 'legal' | 'procedure';
  category: string;
  publishDate: string;
  author: string;
  status: 'active' | 'archived' | 'draft';
  changes: string[];
  fileSize: string;
  downloadCount: number;
  description?: string;
}

interface DocumentVersionHistoryProps {
  type?: 'legal' | 'procedure' | 'both';
}

export function DocumentVersionHistory({ type = 'both' }: DocumentVersionHistoryProps) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Données d'exemple pour les versions de documents
  const documentVersions: DocumentVersion[] = [
    {
      id: '1',
      version: 'v3.2',
      title: 'Code civil algérien',
      type: 'legal',
      category: 'Code',
      publishDate: '2024-01-15',
      author: 'Ministère de la Justice',
      status: 'active',
      changes: [
        'Modification de l\'article 123 sur les successions',
        'Ajout de nouvelles dispositions sur les contrats numériques',
        'Correction d\'erreurs typographiques'
      ],
      fileSize: '2.4 MB',
      downloadCount: 1247,
      description: 'Version mise à jour avec les dernières modifications législatives'
    },
    {
      id: '2',
      version: 'v3.1',
      title: 'Code civil algérien',
      type: 'legal',
      category: 'Code',
      publishDate: '2023-12-01',
      author: 'Ministère de la Justice',
      status: 'archived',
      changes: [
        'Révision des articles sur le mariage',
        'Mise à jour des références légales'
      ],
      fileSize: '2.3 MB',
      downloadCount: 892
    },
    {
      id: '3',
      version: 'v2.1',
      title: 'Procédure de création d\'entreprise SARL',
      type: 'procedure',
      category: 'Entreprise',
      publishDate: '2024-01-10',
      author: 'CNRC',
      status: 'active',
      changes: [
        'Simplification des étapes de validation',
        'Ajout de la signature électronique',
        'Réduction des délais de traitement'
      ],
      fileSize: '1.8 MB',
      downloadCount: 567,
      description: 'Procédure optimisée avec les nouvelles technologies'
    },
    {
      id: '4',
      version: 'v2.0',
      title: 'Procédure de création d\'entreprise SARL',
      type: 'procedure',
      category: 'Entreprise',
      publishDate: '2023-11-15',
      author: 'CNRC',
      status: 'archived',
      changes: [
        'Refonte complète de la procédure',
        'Intégration du système numérique'
      ],
      fileSize: '1.6 MB',
      downloadCount: 423
    },
    {
      id: '5',
      version: 'v1.3',
      title: 'Loi de finances 2024',
      type: 'legal',
      category: 'Loi',
      publishDate: '2023-12-30',
      author: 'Ministère des Finances',
      status: 'active',
      changes: [
        'Nouveaux taux d\'imposition',
        'Mesures d\'incitation fiscale',
        'Dispositions anti-évasion fiscale'
      ],
      fileSize: '3.1 MB',
      downloadCount: 2156,
      description: 'Loi de finances avec les nouvelles dispositions fiscales'
    },
    {
      id: '6',
      version: 'v1.4',
      title: 'Procédure de demande de passeport',
      type: 'procedure',
      category: 'État Civil',
      publishDate: '2024-01-05',
      author: 'Ministère de l\'Intérieur',
      status: 'active',
      changes: [
        'Ajout de la prise de rendez-vous en ligne',
        'Nouvelles conditions de sécurité',
        'Réduction du délai d\'obtention'
      ],
      fileSize: '1.2 MB',
      downloadCount: 1834
    }
  ];

  // Pagination pour les versions de documents
  const {
    currentData: paginatedVersions,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: documentVersions,
    itemsPerPage: 6
  });

  // Grouper les versions par document
  const groupedVersions = documentVersions.reduce((acc, version) => {
    const key = version.title;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(version);
    return acc;
  }, {} as Record<string, DocumentVersion[]>);

  // Trier chaque groupe par version (plus récente en premier)
  Object.keys(groupedVersions).forEach(key => {
    groupedVersions[key].sort((a, b) => {
      const versionA = parseFloat(a.version.replace('v', ''));
      const versionB = parseFloat(b.version.replace('v', ''));
      return versionB - versionA;
    });
  });

  const documentOptions = Object.keys(groupedVersions);

  const filteredDocuments = documentOptions.filter(docTitle => {
    const matchesSearch = docTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const versions = groupedVersions[docTitle];
    const matchesType = type === 'both' || versions.some(v => v.type === type);
    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'archived':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (docType: string) => {
    return docType === 'legal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Historiques des Versions</h2>
        <p className="text-gray-600">
          Consultez l'historique complet des versions de tous les documents juridiques et procédures administratives
        </p>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Recherche et filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>


        </CardContent>
      </Card>

      {/* Sélection de document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Sélectionner un document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((docTitle) => {
              const versions = groupedVersions[docTitle];
              const latestVersion = versions[0];
              const isSelected = selectedDocument === docTitle;

              return (
                <Card 
                  key={docTitle}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDocument(docTitle)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm line-clamp-2">{docTitle}</h3>
                        <Badge className={getTypeColor(latestVersion.type)}>
                          {latestVersion.type === 'legal' ? 'Juridique' : 'Procédure'}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {versions.length} version{versions.length > 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Dernière: {latestVersion.publishDate}
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(latestVersion.status)}
                          <Badge className={getStatusColor(latestVersion.status)}>
                            {latestVersion.status === 'active' ? 'Actif' : 
                             latestVersion.status === 'archived' ? 'Archivé' : 'Brouillon'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun document trouvé avec les critères de recherche actuels</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historique des versions pour le document sélectionné */}
      {selectedDocument && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Historique des versions - {selectedDocument}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupedVersions[selectedDocument].map((version, index) => (
                <div key={version.id} className="relative">
                  {/* Ligne de connexion */}
                  {index < groupedVersions[selectedDocument].length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Indicateur de version */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        version.status === 'active' ? 'bg-green-100' : 
                        version.status === 'archived' ? 'bg-gray-100' : 'bg-yellow-100'
                      }`}>
                        {getStatusIcon(version.status)}
                      </div>
                    </div>

                    {/* Contenu de la version */}
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* En-tête */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-lg">{version.version}</span>
                                <Badge className={getStatusColor(version.status)}>
                                  {version.status === 'active' ? 'Version actuelle' : 
                                   version.status === 'archived' ? 'Archivée' : 'Brouillon'}
                                </Badge>
                                <Badge className={getTypeColor(version.type)}>
                                  {version.category}
                                </Badge>
                              </div>
                              {version.description && (
                                <p className="text-sm text-gray-600">{version.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Consulter
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Télécharger
                              </Button>
                            </div>
                          </div>

                          {/* Métadonnées */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {version.publishDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {version.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {version.downloadCount} téléchargements
                            </div>
                          </div>

                          {/* Changements */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Modifications apportées :</h4>
                            <ul className="space-y-1">
                              {version.changes.map((change, changeIndex) => (
                                <li key={changeIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                  <ArrowRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                                  {change}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedDocument && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <GitBranch className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Sélectionnez un document</h3>
            <p>Choisissez un document ci-dessus pour voir l'historique complet de ses versions</p>
          </CardContent>
        </Card>
      )}

      {/* Liste des versions avec pagination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Toutes les versions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedVersions.map((version) => (
              <div key={version.id} className="relative">
                <div className="flex gap-4">
                  {/* Indicateur de version */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      version.status === 'active' ? 'bg-green-100' : 
                      version.status === 'archived' ? 'bg-gray-100' : 'bg-yellow-100'
                    }`}>
                      {getStatusIcon(version.status)}
                    </div>
                  </div>

                  {/* Contenu de la version */}
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* En-tête */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-lg">{version.version}</span>
                              <Badge className={getStatusColor(version.status)}>
                                {version.status === 'active' ? 'Version actuelle' : 
                                 version.status === 'archived' ? 'Archivée' : 'Brouillon'}
                              </Badge>
                              <Badge className={getTypeColor(version.type)}>
                                {version.category}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-base">{version.title}</h3>
                            {version.description && (
                              <p className="text-sm text-gray-600">{version.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Consulter
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        </div>

                        {/* Métadonnées */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {version.publishDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {version.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {version.downloadCount} téléchargements
                          </div>
                        </div>

                        {/* Changements */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Modifications apportées :</h4>
                          <ul className="space-y-1">
                            {version.changes.map((change, changeIndex) => (
                              <li key={changeIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                <ArrowRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                                {change}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
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
    </div>
  );
}
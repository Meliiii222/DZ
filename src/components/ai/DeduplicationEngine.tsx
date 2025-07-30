
// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Copy, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Database,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

interface DuplicateGroup {
  id: string;
  documents: Array<{
    id: string;
    title: string;
    similarity: number;
    source: string;
    size: string;
    lastModified: string;
  }>;
  type: 'exact' | 'near' | 'semantic';
  count: number;
  totalSize: string;
}

export function DeduplicationEngine() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDuplicates, setSelectedDuplicates] = useState<string[]>([]);

  const duplicateGroups: DuplicateGroup[] = [
    {
      id: '1',
      type: 'exact',
      count: 3,
      totalSize: '4.2 MB',
      documents: [
        {
          id: '1a',
          title: 'Code civil algérien - Version 2023.pdf',
          similarity: 100,
          source: '/documents/legislation/',
          size: '1.4 MB',
          lastModified: '2024-01-15'
        },
        {
          id: '1b',
          title: 'Code civil algérien - Version 2023 (copie).pdf',
          similarity: 100,
          source: '/documents/backup/',
          size: '1.4 MB',
          lastModified: '2024-01-10'
        },
        {
          id: '1c',
          title: 'Code_civil_algérien_2023.pdf',
          similarity: 100,
          source: '/documents/temp/',
          size: '1.4 MB',
          lastModified: '2024-01-08'
        }
      ]
    },
    {
      id: '2',
      type: 'near',
      count: 2,
      totalSize: '3.6 MB',
      documents: [
        {
          id: '2a',
          title: 'Loi de finances 2024 - Version finale.pdf',
          similarity: 94.7,
          source: '/documents/finances/',
          size: '1.8 MB',
          lastModified: '2024-01-20'
        },
        {
          id: '2b',
          title: 'Loi de finances 2024 - Projet amendé.pdf',
          similarity: 94.7,
          source: '/documents/projets/',
          size: '1.8 MB',
          lastModified: '2024-01-18'
        }
      ]
    },
    {
      id: '3',
      type: 'semantic',
      count: 4,
      totalSize: '6.8 MB',
      documents: [
        {
          id: '3a',
          title: 'Procédure civile - Chapitre 1.pdf',
          similarity: 87.3,
          source: '/documents/procedures/',
          size: '1.7 MB',
          lastModified: '2024-01-12'
        },
        {
          id: '3b',
          title: 'Code de procédure civile - Partie 1.pdf',
          similarity: 87.3,
          source: '/documents/codes/',
          size: '1.7 MB',
          lastModified: '2024-01-14'
        },
        {
          id: '3c',
          title: 'Dispositions générales - Procédure civile.pdf',
          similarity: 87.3,
          source: '/documents/general/',
          size: '1.7 MB',
          lastModified: '2024-01-16'
        },
        {
          id: '3d',
          title: 'Règles de procédure - Droit civil.pdf',
          similarity: 87.3,
          source: '/documents/regles/',
          size: '1.7 MB',
          lastModified: '2024-01-11'
        }
      ]
    }
  ];

  // Pagination pour les groupes de doublons
  const {
    currentData: paginatedGroups,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: duplicateGroups,
    itemsPerPage: 5
  });

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exact': return 'bg-red-100 text-red-800';
      case 'near': return 'bg-orange-100 text-orange-800';
      case 'semantic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exact': return <Copy className="w-4 h-4 text-red-600" />;
      case 'near': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'semantic': return <Target className="w-4 h-4 text-blue-600" />;
      default: return <Copy className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'exact': return 'Duplicata exact';
      case 'near': return 'Quasi-duplicata';
      case 'semantic': return 'Similarité sémantique';
      default: return 'Inconnu';
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 95) return 'text-red-600';
    if (similarity >= 85) return 'text-orange-600';
    return 'text-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-6 h-6 text-orange-600" />
            Moteur de Déduplication Automatique
          </CardTitle>
          <p className="text-gray-600">
            Détection et résolution intelligente des doublons dans la base documentaire
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-red-600">247</div>
              <div className="text-xs text-gray-600">Duplicatas détectés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-green-600">1.2 GB</div>
              <div className="text-xs text-gray-600">Espace récupérable</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-blue-600">89.7%</div>
              <div className="text-xs text-gray-600">Précision détection</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-purple-600">156</div>
              <div className="text-xs text-gray-600">Groupes de doublons</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contrôles de scan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Analyse de Déduplication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleStartScan} 
                disabled={isScanning}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 mr-2" />
                    Lancer l&apos;analyse
                  </>
                )}
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={buttonHandlers.generic('Tout sélectionner', 'Sélection de tous les doublons', 'Déduplication')}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Tout sélectionner
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={buttonHandlers.generic('Supprimer sélection', 'Suppression des doublons sélectionnés', 'Déduplication')}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer sélection
                </Button>
              </div>
            </div>

            {isScanning && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analyse des fichiers...</span>
                  <span className="text-sm text-gray-500">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="w-full" />
                <div className="text-sm text-gray-600">
                  {scanProgress < 30 && "Indexation des documents..."}
                  {scanProgress >= 30 && scanProgress < 60 && "Calcul des empreintes..."}
                  {scanProgress >= 60 && scanProgress < 90 && "Détection des similarités..."}
                  {scanProgress >= 90 && "Finalisation de l'analyse..."}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Groupes de duplicatas */}
      <div className="space-y-4">
        {paginatedGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(group.type)}
                  <div>
                    <CardTitle className="text-lg">{getTypeLabel(group.type)}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {group.count} documents • {group.totalSize}
                    </p>
                  </div>
                </div>
                <Badge className={getTypeColor(group.type)}>
                  {getTypeLabel(group.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedDuplicates.includes(doc.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDuplicates([...selectedDuplicates, doc.id]);
                          } else {
                            setSelectedDuplicates(selectedDuplicates.filter(id => id !== doc.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{doc.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{doc.source}</span>
                          <span>{doc.size}</span>
                          <span>Modifié: {doc.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${getSimilarityColor(doc.similarity)}`}>
                        {doc.similarity}%
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Supprimer doublon: ${doc.title}`, 'Suppression d\'un doublon', 'Déduplication')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Espace récupérable: <span className="font-medium">{group.totalSize}</span>
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={buttonHandlers.generic(`Prévisualiser groupe: ${group.title}`, 'Prévisualisation du groupe', 'Déduplication')}
                    >
                      Prévisualiser
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={buttonHandlers.generic(`Supprimer groupe: ${group.title}`, 'Suppression du groupe de doublons', 'Déduplication')}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Supprimer doublons
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

      {/* Statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Statistiques de Déduplication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Duplicatas Exacts</h4>
              <div className="text-2xl font-bold text-red-600">127</div>
              <div className="text-sm text-gray-600">Documents identiques</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Quasi-duplicatas</h4>
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-gray-600">Similarité &gt; 90%</div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Similarité Sémantique</h4>
              <div className="text-2xl font-bold text-blue-600">31</div>
              <div className="text-sm text-gray-600">Contenu similaire</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

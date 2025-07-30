
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { GitCompareArrows, AlertTriangle, Link, FileText, ClipboardList, Search, Filter } from 'lucide-react';

interface Item {
  id: string;
  title: string;
  type: string;
  status: string;
  lastModified: string;
}

interface Dependency {
  from: string;
  to: string;
  type: 'reference' | 'prerequisite' | 'modification';
  description: string;
}

interface Conflict {
  items: string[];
  type: 'contradiction' | 'overlap' | 'gap';
  severity: 'high' | 'medium' | 'low';
  description: string;
}

const mockLegalTexts: Item[] = [
  { id: '1', title: 'Code civil algérien - Livre des obligations', type: 'Code', status: 'En vigueur', lastModified: '2023-05-15' },
  { id: '2', title: 'Code de commerce algérien', type: 'Code', status: 'En vigueur', lastModified: '2023-03-10' },
  { id: '3', title: 'Loi sur les relations de travail', type: 'Loi', status: 'En vigueur', lastModified: '2023-08-22' },
  { id: '4', title: 'Décret exécutif sur les contrats publics', type: 'Décret', status: 'En vigueur', lastModified: '2023-06-30' },
];

const mockProcedures: Item[] = [
  { id: '1', title: 'Création d\'entreprise individuelle', type: 'Économique', status: 'Active', lastModified: '2023-07-12' },
  { id: '2', title: 'Demande de permis de construire', type: 'Urbanisme', status: 'Active', lastModified: '2023-04-18' },
  { id: '3', title: 'Inscription au registre du commerce', type: 'Commercial', status: 'Active', lastModified: '2023-09-05' },
  { id: '4', title: 'Déclaration fiscale annuelle', type: 'Fiscal', status: 'Active', lastModified: '2023-08-14' },
];

const mockDependencies: Dependency[] = [
  { from: 'Code civil algérien', to: 'Loi sur les relations de travail', type: 'reference', description: 'Articles sur les contrats de travail référencent le code civil' },
  { from: 'Création d\'entreprise', to: 'Inscription au registre du commerce', type: 'prerequisite', description: 'L\'inscription au registre est obligatoire après création' },
  { from: 'Code de commerce', to: 'Décret exécutif sur les contrats publics', type: 'modification', description: 'Le décret modifie certaines dispositions du code de commerce' },
];

const mockConflicts: Conflict[] = [
  { items: ['Code civil', 'Code de commerce'], type: 'overlap', severity: 'medium', description: 'Chevauchement dans la définition des contrats commerciaux' },
  { items: ['Permis de construire', 'Déclaration fiscale'], type: 'gap', severity: 'low', description: 'Manque de coordination sur les délais fiscaux post-construction' },
];

export function DependenciesConflictsAnalysis() {
  const [selectedType, setSelectedType] = useState<'legal' | 'procedure' | ''>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [analysisResults, setAnalysisResults] = useState<{
    dependencies: Dependency[];
    conflicts: Conflict[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCurrentItems = () => {
    const items = selectedType === 'legal' ? mockLegalTexts : mockProcedures;
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearch = () => {
    const items = getCurrentItems();
    setFilteredItems(items);
  };

  const handleItemSelection = (itemId: string) => {
    setSelectedItem(itemId);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResults({
        dependencies: mockDependencies,
        conflicts: mockConflicts
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedType('');
    setSelectedItem(null);
    setSearchQuery('');
    setFilteredItems([]);
    setAnalysisResults(null);
  };

  const getTypeIcon = (type: string) => {
    return selectedType === 'legal' ? FileText : ClipboardList;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <GitCompareArrows className="w-16 h-16 mx-auto text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold">Analyse des Dépendances & Conflits</h2>
          <p className="text-gray-600 mt-2">
            Analysez les dépendances et identifiez les conflits entre textes juridiques ou procédures administratives
          </p>
        </div>
      </div>

      {!analysisResults ? (
        <div className="space-y-6">
          {/* Sélection du type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Choisir le type d'éléments à analyser</CardTitle>
              <CardDescription>
                Sélectionnez le type d'éléments que vous souhaitez comparer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedType} onValueChange={(value: 'legal' | 'procedure') => {
                setSelectedType(value);
                setSelectedItem(null);
                setSearchQuery('');
                setFilteredItems([]);
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le type d'éléments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Textes juridiques
                    </div>
                  </SelectItem>
                  <SelectItem value="procedure">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" />
                      Procédures administratives
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Filtre de recherche */}
          {selectedType && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  2. Rechercher et filtrer les éléments
                </CardTitle>
                <CardDescription>
                  Utilisez le filtre pour trouver rapidement les éléments que vous souhaitez analyser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Rechercher par titre ou type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
                
                {filteredItems.length > 0 && (
                  <div className="text-sm text-gray-600 mb-2">
                    {filteredItems.length} résultat(s) trouvé(s)
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sélection des éléments */}
          {selectedType && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  3. Sélectionner l'élément à comparer
                </CardTitle>
                <CardDescription>
                  Choisissez un seul élément à comparer à tous les autres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(filteredItems.length > 0 ? filteredItems : getCurrentItems()).map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <div key={item.id} className={`flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${selectedItem === item.id ? 'bg-purple-100 border-purple-400' : ''}`}
                        onClick={() => handleItemSelection(item.id)}
                      >
                        <input
                          type="radio"
                          checked={selectedItem === item.id}
                          onChange={() => handleItemSelection(item.id)}
                          className="mt-1"
                          name="unique-selection"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <TypeIcon className="w-4 h-4 text-purple-600" />
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge variant="outline">{item.status}</Badge>
                            <span>Modifié: {item.lastModified}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {isAnalyzing && (
                  <div className="flex items-center justify-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-2"></div>
                    <span>Analyse en cours...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Exemples d'utilisation */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Exemples d'utilisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Analyse de textes juridiques</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Comparez le Code civil et le Code de commerce pour identifier :
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1 ml-4">
                    <li>• Les références croisées entre les codes</li>
                    <li>• Les chevauchements de compétences</li>
                    <li>• Les contradictions potentielles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Analyse de procédures</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Comparez les procédures de création d'entreprise pour identifier :
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1 ml-4">
                    <li>• Les étapes communes ou dépendantes</li>
                    <li>• Les documents requis en double</li>
                    <li>• Les délais conflictuels</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Résultats d'analyse */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Résultats de l'analyse</h3>
            <Button variant="outline" onClick={resetAnalysis}>
              Nouvelle analyse
            </Button>
          </div>

          {/* Dépendances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5 text-green-600" />
                Dépendances identifiées
              </CardTitle>
              <CardDescription>
                Relations et références entre les éléments analysés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.dependencies.map((dep, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        {dep.type === 'reference' ? 'Référence' : 
                         dep.type === 'prerequisite' ? 'Prérequis' : 'Modification'}
                      </Badge>
                      <span className="font-medium">{dep.from} → {dep.to}</span>
                    </div>
                    <p className="text-sm text-green-700">{dep.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conflits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Conflits détectés
              </CardTitle>
              <CardDescription>
                Contradictions, chevauchements et lacunes identifiés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.conflicts.map((conflict, index) => (
                  <Alert key={index} className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(conflict.severity)}>
                            Sévérité: {conflict.severity === 'high' ? 'Élevée' : 
                                     conflict.severity === 'medium' ? 'Moyenne' : 'Faible'}
                          </Badge>
                          <Badge variant="outline">
                            {conflict.type === 'contradiction' ? 'Contradiction' :
                             conflict.type === 'overlap' ? 'Chevauchement' : 'Lacune'}
                          </Badge>
                        </div>
                        <p className="font-medium">
                          Éléments concernés: {conflict.items.join(', ')}
                        </p>
                        <p className="text-sm">{conflict.description}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-purple-700">
                <p>• Réviser les chevauchements identifiés pour éviter les ambiguïtés</p>
                <p>• Établir des procédures de coordination pour les dépendances critiques</p>
                <p>• Documenter les références croisées pour faciliter la maintenance</p>
                <p>• Planifier une révision périodique pour maintenir la cohérence</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

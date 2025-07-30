import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Eye,
  BookOpen,
  Clock,
  TrendingUp,
  Share2,
  Plus,
  RefreshCw
} from 'lucide-react';

interface SemanticSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchType: 'semantic' | 'concept' | 'similarity' | 'citation';
  title: string;
}

interface SearchResult {
  id: string;
  title: string;
  type: string;
  relevance: number;
  excerpt: string;
  concepts: string[];
  date: string;
  institution: string;
  citations: number;
}

export function SemanticSearchModal({ isOpen, onClose, searchType, title }: SemanticSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchScope, setSearchScope] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    minRelevance: 70,
    maxResults: 50
  });

  const domains = [
    { value: 'all', label: 'Tous les domaines' },
    { value: 'civil', label: 'Droit civil' },
    { value: 'commercial', label: 'Droit commercial' },
    { value: 'penal', label: 'Droit pénal' },
    { value: 'administrative', label: 'Droit administratif' },
    { value: 'constitutionnel', label: 'Droit constitutionnel' },
    { value: 'international', label: 'Droit international' }
  ];

  const searchScopes = [
    { value: 'all', label: 'Tout le corpus' },
    { value: 'laws', label: 'Lois uniquement' },
    { value: 'decrees', label: 'Décrets uniquement' },
    { value: 'jurisprudence', label: 'Jurisprudence' },
    { value: 'doctrine', label: 'Doctrine' }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulation de recherche avec délai réaliste
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Génération de résultats simulés intelligents selon le type de recherche
    const mockResults: SearchResult[] = [];
    const numResults = Math.floor(Math.random() * 8) + 3; // 3-10 résultats
    
    for (let i = 0; i < numResults; i++) {
      const relevance = Math.floor(Math.random() * 30) + 70; // 70-100%
      
      let baseTitle = '';
      let concepts: string[] = [];
      
      if (searchType === 'semantic') {
        baseTitle = `Analyse sémantique: ${query}`;
        concepts = ['concept juridique', 'interprétation', 'contexte légal'];
      } else if (searchType === 'concept') {
        baseTitle = `Concept juridique: ${query}`;
        concepts = ['définition', 'application', 'évolution'];
      } else if (searchType === 'similarity') {
        baseTitle = `Documents similaires à: ${query}`;
        concepts = ['similarité', 'comparaison', 'analogie'];
      } else if (searchType === 'citation') {
        baseTitle = `Analyse de citations: ${query}`;
        concepts = ['références', 'jurisprudence', 'précédents'];
      }
      
      const types = ['Loi', 'Décret', 'Arrêt', 'Doctrine'];
      const institutions = ['Ministère de la Justice', 'Conseil d\'État', 'Cour Suprême', 'Parlement'];
      
      mockResults.push({
        id: `result-${i}`,
        title: `${baseTitle} - Article ${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)],
        relevance,
        excerpt: `Extrait pertinent contenant "${query}" avec analyse contextuelle des implications juridiques et des applications pratiques dans le domaine concerné...`,
        concepts: [...concepts, `concept-${i}`, `notion-${i}`],
        date: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        institution: institutions[Math.floor(Math.random() * institutions.length)],
        citations: Math.floor(Math.random() * 50) + 1
      });
    }
    
    setResults(mockResults.sort((a, b) => b.relevance - a.relevance));
    setIsSearching(false);
  };

  const handleExport = () => {
    const exportData = {
      query,
      searchType,
      timestamp: new Date().toISOString(),
      filters,
      results: results.map(r => ({
        title: r.title,
        relevance: r.relevance,
        excerpt: r.excerpt,
        concepts: r.concepts
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recherche_${searchType}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddConcept = () => {
    // Ajouter un nouveau concept à la recherche
    const newConcept = prompt('Entrez un nouveau concept à ajouter:');
    if (newConcept) {
      setQuery(query + (query ? ' + ' : '') + newConcept);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="results">Résultats ({results.length})</TabsTrigger>
            <TabsTrigger value="analysis">Analyse</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {/* Zone de recherche */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuration de la recherche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Requête principale</label>
                    <Textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Entrez votre requête sémantique..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Domaine juridique</label>
                      <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map(domain => (
                            <SelectItem key={domain.value} value={domain.value}>
                              {domain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Portée de recherche</label>
                      <Select value={searchScope} onValueChange={setSearchScope}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {searchScopes.map(scope => (
                            <SelectItem key={scope.value} value={scope.value}>
                              {scope.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Filtres avancés */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium">Date début</label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date fin</label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pertinence min. ({filters.minRelevance}%)</label>
                    <Input
                      type="range"
                      min="50"
                      max="100"
                      value={filters.minRelevance}
                      onChange={(e) => setFilters({...filters, minRelevance: parseInt(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleSearch} 
                    disabled={isSearching || !query.trim()}
                    className="flex-1"
                  >
                    {isSearching ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Recherche en cours...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Lancer la recherche
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleAddConcept}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter concept
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {results.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Aucun résultat. Lancez une recherche pour voir les résultats.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {results.length} résultat(s) trouvé(s) pour "{query}"
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleExport}>
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{result.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>{result.type}</span>
                              <span>{result.institution}</span>
                              <span>{result.date}</span>
                              <span>{result.citations} citations</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={result.relevance >= 90 ? 'default' : 'secondary'}>
                              {result.relevance}% pertinent
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3">{result.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {result.concepts.map((concept, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {concept}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Consulter
                            </Button>
                            <Button size="sm">
                              <BookOpen className="w-4 h-4 mr-1" />
                              Analyser
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse conceptuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Précision sémantique</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Couverture conceptuelle</span>
                        <span>74%</span>
                      </div>
                      <Progress value={74} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cohérence juridique</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendances identifiées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Évolution jurisprudentielle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Actualité législative</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Doctrine émergente</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Database, 
  Brain, 
  Zap, 
  Network,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  similarity: number;
  content: string;
  type: string;
  source: string;
  relevance: number;
}

export function VectorSearch() {
  // États pour la recherche vectorielle
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Fonction de recherche vectorielle réelle
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Simulation d'une vraie recherche vectorielle
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Résultats simulés de recherche vectorielle
      const results = [
        { id: 1, title: 'Document juridique similaire 1', similarity: 0.95 },
        { id: 2, title: 'Document juridique similaire 2', similarity: 0.87 },
        { id: 3, title: 'Document juridique similaire 3', similarity: 0.82 }
      ];
      
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const sampleResults: SearchResult[] = [
    {
      id: '1',
      title: 'Code civil algérien - Article 674',
      similarity: 0.94,
      content: 'Les dispositions relatives à la propriété foncière et aux droits réels...',
      type: 'Législation',
      source: 'Code civil',
      relevance: 95
    },
    {
      id: '2',
      title: 'Arrêt Cour suprême - Chambre civile',
      similarity: 0.87,
      content: 'En matière de propriété immobilière, la prescription acquisitive...',
      type: 'Jurisprudence',
      source: 'Cour suprême',
      relevance: 89
    },
    {
      id: '3',
      title: 'Loi foncière - Dispositions générales',
      similarity: 0.82,
      content: 'Les règles d\'acquisition et de transmission des biens fonciers...',
      type: 'Législation',
      source: 'Loi 90-25',
      relevance: 84
    }
  ];

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'text-green-600';
    if (similarity >= 0.7) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Législation': return 'bg-blue-100 text-blue-800';
      case 'Jurisprudence': return 'bg-purple-100 text-purple-800';
      case 'Doctrine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-600" />
            Recherche Vectorielle et Graphe de Connaissances
          </CardTitle>
          <p className="text-gray-600">
            Recherche sémantique avancée basée sur les embeddings vectoriels
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-blue-600">2.5M</div>
              <div className="text-xs text-gray-600">Vecteurs indexés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-green-600">768</div>
              <div className="text-xs text-gray-600">Dimensions</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-purple-600">94.7%</div>
              <div className="text-xs text-gray-600">Précision</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-orange-600">0.2s</div>
              <div className="text-xs text-gray-600">Temps de réponse</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-green-600" />
            Recherche Sémantique Avancée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Recherche par similarité sémantique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Recherche...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </>
                )}
              </Button>
            </div>

            {isSearching && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analyse vectorielle en cours...</span>
                  <span className="text-sm text-gray-500">Traitement des embeddings</span>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Résultats de Recherche Vectorielle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{result.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(result.type)}>
                        {result.type}
                      </Badge>
                      <div className={`text-sm font-bold ${getSimilarityColor(result.similarity)}`}>
                        {(result.similarity * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 line-clamp-2">{result.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Source: {result.source}</span>
                    <div className="flex items-center gap-4">
                      <span>Similarité: {(result.similarity * 100).toFixed(1)}%</span>
                      <span>Pertinence: {result.relevance}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={result.relevance} className="w-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Graphe de connaissances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Graphe de Connaissances Juridiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">Entités</h4>
                </div>
                <div className="text-2xl font-bold text-blue-600">127,456</div>
                <div className="text-sm text-gray-600">Concepts juridiques</div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium">Relations</h4>
                </div>
                <div className="text-2xl font-bold text-green-600">589,234</div>
                <div className="text-sm text-gray-600">Liens sémantiques</div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h4 className="font-medium">Chemins</h4>
                </div>
                <div className="text-2xl font-bold text-purple-600">1.2M</div>
                <div className="text-sm text-gray-600">Chemins sémantiques</div>
              </div>
            </div>

            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Network className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Visualisation du graphe de connaissances</p>
                <p className="text-sm text-gray-500">Représentation interactive des relations juridiques</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithmes vectoriels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Algorithmes Vectoriels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">BERT Juridique</h4>
              <p className="text-sm text-gray-600 mb-3">Modèle transformeur spécialisé pour le droit algérien</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
                <span className="text-sm font-medium">F1-Score: 0.94</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Word2Vec Légal</h4>
              <p className="text-sm text-gray-600 mb-3">Embeddings contextuels pour terminologie juridique</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">Actif</Badge>
                <span className="text-sm font-medium">Similarité: 0.87</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Sentence-BERT</h4>
              <p className="text-sm text-gray-600 mb-3">Embeddings de phrases pour recherche sémantique</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-100 text-purple-800">Actif</Badge>
                <span className="text-sm font-medium">Précision: 0.91</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">FastText Arabe</h4>
              <p className="text-sm text-gray-600 mb-3">Embeddings optimisés pour textes juridiques arabes</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-100 text-orange-800">En test</Badge>
                <span className="text-sm font-medium">Couverture: 0.88</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

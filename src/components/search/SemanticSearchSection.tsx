
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Brain, Network, Quote, Search, Link, Eye, Download } from 'lucide-react';
import { SemanticSearchModal } from '@/components/modals/SemanticSearchModal';

interface ConceptualResult {
  id: string;
  title: string;
  concept: string;
  relevance: number;
  connections: string[];
  type: 'text' | 'jurisprudence' | 'doctrine';
  excerpt: string;
}

export function SemanticSearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("concepts");
  const [results, setResults] = useState<ConceptualResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showSimilarityModal, setShowSimilarityModal] = useState(false);

  const mockResults: ConceptualResult[] = [
    {
      id: "1",
      title: "Responsabilité civile contractuelle",
      concept: "Obligation de résultat",
      relevance: 0.95,
      connections: ["Article 1231-1 Code civil", "Cass. Civ. 1ère, 2021", "Doctrine Mazeaud"],
      type: "text",
      excerpt: "L'obligation de résultat engage la responsabilité du débiteur dès lors que le résultat promis n'est pas atteint..."
    },
    {
      id: "2", 
      title: "Jurisprudence - Cour de Cassation",
      concept: "Force majeure sanitaire",
      relevance: 0.88,
      connections: ["Covid-19", "Article 1218 Code civil", "Ordonnance 2020-306"],
      type: "jurisprudence",
      excerpt: "La pandémie de Covid-19 peut constituer un cas de force majeure sous certaines conditions..."
    },
    {
      id: "3",
      title: "Droit commercial - Société",
      concept: "Responsabilité limitée",
      relevance: 0.92,
      connections: ["Code de commerce", "Article L223-1", "Jurisprudence 2023"],
      type: "text",
      excerpt: "La responsabilité des associés est limitée au montant de leurs apports..."
    },
    {
      id: "4",
      title: "Droit administratif - Marchés publics",
      concept: "Principe d'égalité",
      relevance: 0.87,
      connections: ["Code des marchés publics", "Article 3", "Jurisprudence CE"],
      type: "jurisprudence",
      excerpt: "L'égalité d'accès à la commande publique est un principe fondamental..."
    },
    {
      id: "5",
      title: "Droit pénal - Infractions",
      concept: "Élément intentionnel",
      relevance: 0.94,
      connections: ["Code pénal", "Article 121-3", "Doctrine classique"],
      type: "text",
      excerpt: "L'élément intentionnel est constitutif de l'infraction pénale..."
    },
    {
      id: "6",
      title: "Droit social - Contrat de travail",
      concept: "Subordination juridique",
      relevance: 0.89,
      connections: ["Code du travail", "Article L1111-1", "Jurisprudence sociale"],
      type: "jurisprudence",
      excerpt: "Le lien de subordination caractérise le contrat de travail..."
    },
    {
      id: "7",
      title: "Droit fiscal - Impôts directs",
      concept: "Principe de légalité",
      relevance: 0.91,
      connections: ["Code général des impôts", "Article 1", "Constitution"],
      type: "text",
      excerpt: "L'impôt ne peut être établi que par la loi..."
    },
    {
      id: "8",
      title: "Droit constitutionnel - Contrôle",
      concept: "Constitutionnalité",
      relevance: 0.86,
      connections: ["Constitution", "Article 61", "Conseil constitutionnel"],
      type: "jurisprudence",
      excerpt: "Le contrôle de constitutionnalité s'exerce a priori..."
    },
    {
      id: "9",
      title: "Droit international - Traités",
      concept: "Primauté du droit international",
      relevance: 0.93,
      connections: ["Convention de Vienne", "Article 27", "Jurisprudence internationale"],
      type: "text",
      excerpt: "Les traités internationaux ont une autorité supérieure aux lois..."
    },
    {
      id: "10",
      title: "Droit européen - Directives",
      concept: "Transposition",
      relevance: 0.88,
      connections: ["Traité UE", "Article 288", "Jurisprudence CJUE"],
      type: "jurisprudence",
      excerpt: "Les directives doivent être transposées en droit national..."
    },
    {
      id: "11",
      title: "Droit de la propriété intellectuelle",
      concept: "Droit d'auteur",
      relevance: 0.90,
      connections: ["Code de la propriété intellectuelle", "Article L111-1", "Jurisprudence spécialisée"],
      type: "text",
      excerpt: "L'auteur d'une œuvre de l'esprit jouit sur cette œuvre d'un droit de propriété exclusif..."
    },
    {
      id: "12",
      title: "Droit de l'environnement - Pollueur-payeur",
      concept: "Responsabilité environnementale",
      relevance: 0.85,
      connections: ["Code de l'environnement", "Article L110-1", "Principes internationaux"],
      type: "jurisprudence",
      excerpt: "Le principe pollueur-payeur vise à internaliser les coûts environnementaux..."
    }
  ];

  // Pagination pour les résultats de recherche
  const {
    currentData: paginatedResults,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: results,
    itemsPerPage: 10
  });

  const handleSearch = async (type: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulation d'une recherche sémantique
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="citations">Citations</TabsTrigger>
          <TabsTrigger value="visual">Visuel</TabsTrigger>
          <TabsTrigger value="similar">Cas Similaires</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Recherche par Concepts Juridiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <EnhancedInput
                  placeholder="Ex: responsabilité, force majeure, obligation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  context="legal"
                  enableVoice={true}
                />
                <Button 
                  onClick={() => handleSearch('concepts')}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? "Analyse..." : "Rechercher"}
                </Button>
              </div>

              {paginatedResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Résultats conceptuels ({totalItems})</h3>
                  {paginatedResults.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {result.title}
                            </h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-purple-500 text-white">
                                {result.concept}
                              </Badge>
                              <Badge variant="outline" className={
                                result.type === 'text' ? 'border-blue-300' :
                                result.type === 'jurisprudence' ? 'border-green-300' : 'border-orange-300'
                              }>
                                {result.type}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <span>{Math.round(result.relevance * 100)}% pertinent</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 text-sm">
                              {result.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {result.connections.map((connection, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <Link className="w-3 h-3 mr-1" />
                                  {connection}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                console.log('Consulting semantic result:', result.title);
                                window.dispatchEvent(new CustomEvent('view-document', { 
                                  detail: { documentId: result.id }
                                }));
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Consulter
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={() => {
                                console.log('Using semantic result:', result.title);
                                window.dispatchEvent(new CustomEvent('use-template', { 
                                  detail: { templateId: result.id }
                                }));
                              }}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Utiliser
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="w-5 h-5" />
                Recherche par Citation Croisée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Quote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Navigation Intelligente</h3>
                <p className="text-gray-600 mb-4">
                  Explorez les liens entre textes juridiques et leurs références croisées
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowCitationModal(true)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Lancer l'analyse des citations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Recherche Visuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Network className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Interface Graphique</h3>
                <p className="text-gray-600 mb-4">
                  Visualisez les relations entre textes juridiques sous forme de graphe interactif
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowGraphModal(true)}
                >
                  <Network className="w-4 h-4 mr-2" />
                  Ouvrir la vue graphique
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="similar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Recherche par Cas Similaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Matching Juridique</h3>
                <p className="text-gray-600 mb-4">
                  Algorithme de matching basé sur les faits juridiques similaires
                </p>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowSimilarityModal(true)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Analyser les similitudes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modales de recherche sémantique */}
      {showCitationModal && (
        <SemanticSearchModal
          isOpen={showCitationModal}
          onClose={() => setShowCitationModal(false)}
          searchType="citation"
          title="Analyse des Citations Juridiques"
        />
      )}

      {showGraphModal && (
        <SemanticSearchModal
          isOpen={showGraphModal}
          onClose={() => setShowGraphModal(false)}
          searchType="semantic"
          title="Vue Graphique des Relations"
        />
      )}

      {showSimilarityModal && (
        <SemanticSearchModal
          isOpen={showSimilarityModal}
          onClose={() => setShowSimilarityModal(false)}
          searchType="similarity"
          title="Analyse de Similarité Juridique"
        />
      )}
    </div>
  );
}

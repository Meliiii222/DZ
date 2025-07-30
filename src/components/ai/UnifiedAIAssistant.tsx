
// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Bot, Brain, Zap, TrendingUp, MessageSquare, Sparkles, History, BarChart3, Users, Target, Shield, AlertTriangle, Search, Eye, Download } from 'lucide-react';
import { SmartAutocomplete } from '@/components/common/SmartAutocomplete';

interface AICapability {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'assistant' | 'analysis';
}

interface AIInsight {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: () => void;
}

interface RecentSearch {
  query: string;
  time: string;
  results: number;
  category?: string;
}

export function UnifiedAIAssistant() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'analysis'>('assistant');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Capacités IA unifiées - suppression des catégories prediction et nlp
  const aiCapabilities: Record<string, AICapability[]> = {
    assistant: [
      {
        icon: <Bot className="w-5 h-5 text-green-600" />,
        title: "Recherche intelligente contextuelle",
        description: "Assistant conversationnel avec compréhension du contexte juridique algérien",
        category: 'assistant'
      },
      {
        icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
        title: "Suggestions automatiques",
        description: "Recommandations proactives basées sur votre historique et profil",
        category: 'assistant'
      },
      {
        icon: <Search className="w-5 h-5 text-purple-600" />,
        title: "Actions rapides intelligentes",
        description: "Raccourcis contextuels et commandes vocales avancées",
        category: 'assistant'
      },
      {
        icon: <Sparkles className="w-5 h-5 text-orange-600" />,
        title: "Interface adaptative",
        description: "Personnalisation automatique selon vos préférences d'utilisation",
        category: 'assistant'
      }
    ],
    analysis: [
      {
        icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
        title: "Analyse comparative automatisée",
        description: "Comparaison intelligente de textes juridiques et procédures",
        category: 'analysis'
      },
      {
        icon: <Brain className="w-5 h-5 text-purple-600" />,
        title: "Synthèse multi-documents",
        description: "Consolidation automatique d'informations provenant de sources multiples",
        category: 'analysis'
      },
      {
        icon: <Target className="w-5 h-5 text-green-600" />,
        title: "Scoring de pertinence",
        description: "Évaluation automatique de la pertinence des contenus juridiques",
        category: 'analysis'
      },
      {
        icon: <Sparkles className="w-5 h-5 text-orange-600" />,
        title: "Génération de rapports intelligents",
        description: "Création automatique de synthèses et analyses personnalisées",
        category: 'analysis'
      }
    ]
  };

  // Recherches récentes
  const recentSearches: RecentSearch[] = [
    { query: "Procédure de divorce en Algérie", time: "Il y a 2 heures", results: 15, category: "Droit de la famille" },
    { query: "Code du commerce article 544", time: "Hier", results: 8, category: "Droit commercial" },
    { query: "Loi sur l'investissement 2023", time: "Il y a 2 jours", results: 23, category: "Droit économique" },
    { query: "Procédure administrative contentieuse", time: "Il y a 3 jours", results: 12, category: "Droit administratif" },
    { query: "Loi sur la protection des données", time: "Il y a 4 jours", results: 18, category: "Droit numérique" },
    { query: "Code de procédure civile", time: "Il y a 5 jours", results: 25, category: "Droit civil" },
    { query: "Droit du travail algérien", time: "Il y a 6 jours", results: 14, category: "Droit social" },
    { query: "Procédure de création d'entreprise", time: "Il y a 7 jours", results: 20, category: "Droit commercial" },
    { query: "Loi sur les marchés publics", time: "Il y a 8 jours", results: 16, category: "Droit administratif" },
    { query: "Code pénal article 264", time: "Il y a 9 jours", results: 11, category: "Droit pénal" },
    { query: "Procédure de divorce par consentement", time: "Il y a 10 jours", results: 13, category: "Droit de la famille" },
    { query: "Loi sur l'investissement étranger", time: "Il y a 11 jours", results: 19, category: "Droit économique" }
  ];

  // Pagination pour les recherches récentes
  const {
    currentData: paginatedRecentSearches,
    currentPage: recentSearchesCurrentPage,
    totalPages: recentSearchesTotalPages,
    itemsPerPage: recentSearchesItemsPerPage,
    totalItems: recentSearchesTotalItems,
    setCurrentPage: setRecentSearchesCurrentPage,
    setItemsPerPage: setRecentSearchesItemsPerPage
  } = usePagination({
    data: recentSearches,
    itemsPerPage: 10
  });

  // Insights IA
  const aiInsights: AIInsight[] = [
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Tendance détectée",
      description: "Augmentation des recherches sur les marchés publics (+45% cette semaine)",
      action: () => {
        alert('📊 ANALYSE DES TENDANCES\n\n✅ Marchés publics: +45%\n📈 Procédures administratives: +23%\n🔍 Textes sur l\'investissement: +31%\n\nCette analyse vous aide à anticiper les besoins législatifs émergents.');
      }
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Nouveau texte pertinent",
      description: "Décret exécutif n° 24-15 pourrait intéresser vos recherches récentes",
      action: () => {
        alert('📜 NOUVEAU TEXTE DÉTECTÉ\n\nTitre: Décret exécutif n° 24-15\nDomaine: Marchés publics électroniques\nDate: 15 janvier 2025\nPertinence: 🔥 Très élevée\n\nCe texte correspond à vos recherches récentes sur la digitalisation administrative.');
      }
    },
    {
      icon: <Target className="w-5 h-5 text-green-600" />,
      title: "Recommandation personnalisée",
      description: "3 nouvelles procédures correspondent à votre profil d'activité",
      action: () => {
        alert('🎯 RECOMMANDATIONS PERSONNALISÉES\n\n1. Procédure de demande d\'autorisation d\'investissement\n2. Formalités de création d\'entreprise simplifiées\n3. Déclaration fiscale électronique pour PME\n\nCes procédures ont été sélectionnées selon votre profil et historique de recherches.');
      }
    }
  ];

  const handleSearch = async (query: string) => {
    setIsProcessing(true);
    console.log('Recherche IA unifiée:', query);
    
    // Simulation du traitement IA
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    console.log('Action rapide IA:', action);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header principal */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <img src="/lovable-uploads/AI.png" alt="IA" className="w-10 h-10" />
              Assistant IA Juridique Unifié
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              Intelligence Artificielle avancée pour le droit algérien - Fonctionnalités essentielles d'assistant IA
            </p>
            
            {/* Interface de recherche unifiée */}
            <div className="max-w-2xl mx-auto mb-6">
              <SmartAutocomplete
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Recherche intelligente avec IA : posez votre question juridique..."
                context="legal"
                className="w-full text-lg"
              />
            </div>
            
            {/* Badges de statut */}
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Badge className="bg-green-600 text-white px-3 py-1">
                <Bot className="w-4 h-4 mr-1" />
                Assistant Intelligent
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Target className="w-4 h-4 mr-1" />
                Analyse Avancée
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation par onglets - suppression des onglets prediction et nlp */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Record<string, unknown>)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assistant" className="gap-2">
            <Bot className="w-4 h-4" />
            Assistant IA
          </TabsTrigger>
          <TabsTrigger value="analysis" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Analyse
          </TabsTrigger>
        </TabsList>

        {/* Contenu des onglets */}
        <TabsContent value="assistant" className="mt-6">
          <div className="space-y-6">
            {/* Capacités d'assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-green-600" />
                  Assistant IA Conversationnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiCapabilities.assistant.map((capability, index) => (
                    <Card key={index} className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          {capability.icon}
                          <h3 className="font-semibold text-sm">{capability.title}</h3>
                        </div>
                        <p className="text-xs text-gray-600">{capability.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recherches récentes et Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recherches Récentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paginatedRecentSearches.map((search, index) => (
                    <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm cursor-pointer hover:text-green-600">
                        {search.query}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{search.time}</span>
                        <div className="flex gap-2">
                          {search.category && (
                            <Badge variant="secondary" className="text-xs">
                              {search.category}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {search.results} résultats
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Pagination
                    currentPage={recentSearchesCurrentPage}
                    totalPages={recentSearchesTotalPages}
                    totalItems={recentSearchesTotalItems}
                    itemsPerPage={recentSearchesItemsPerPage}
                    onPageChange={setRecentSearchesCurrentPage}
                    onItemsPerPageChange={setRecentSearchesItemsPerPage}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Insights IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg border">
                        {insight.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-sm">{insight.title}</div>
                        <div className="text-xs text-gray-600">{insight.description}</div>
                        {insight.action && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={insight.action}
                            className="mt-2 text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Voir détails
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                  Analyse et Synthèse Intelligente
                </CardTitle>
                <p className="text-gray-600">
                  Outils d'analyse avancée et de synthèse automatique pour les contenus juridiques
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiCapabilities.analysis.map((capability, index) => (
                    <Card key={index} className="border-2 border-dashed border-orange-200 hover:border-orange-400 transition-colors">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          {capability.icon}
                          <h3 className="font-semibold text-sm">{capability.title}</h3>
                        </div>
                        <p className="text-xs text-gray-600">{capability.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2 text-xs"
                          onClick={() => handleQuickAction(capability.title)}
                        >
                          Utiliser
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions rapides */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Actions Rapides IA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => handleQuickAction('summary')}
              >
                <Bot className="w-6 h-6" />
                Résumé IA
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => handleQuickAction('comparison')}
              >
                <BarChart3 className="w-6 h-6" />
                Comparaison IA
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => handleQuickAction('search')}
              >
                <Search className="w-6 h-6" />
                Recherche IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

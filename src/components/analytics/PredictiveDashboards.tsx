
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Shield, 
  TrendingUp, 
  Eye, 
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  Zap,
  Brain,
  Bell,
  Radar
} from 'lucide-react';

export function PredictiveDashboards() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  const complianceRadarData = [
    {
      domain: "Droit du travail",
      riskLevel: "Élevé",
      score: 75,
      alerts: 12,
      trend: "↗",
      nextDeadline: "15 jours",
      color: "text-red-600"
    },
    {
      domain: "Droit fiscal",
      riskLevel: "Moyen",
      score: 85,
      alerts: 5,
      trend: "→",
      nextDeadline: "30 jours",
      color: "text-orange-600"
    },
    {
      domain: "Droit des sociétés",
      riskLevel: "Faible",
      score: 95,
      alerts: 2,
      trend: "↘",
      nextDeadline: "45 jours",
      color: "text-green-600"
    },
    {
      domain: "Droit environnemental",
      riskLevel: "Critique",
      score: 60,
      alerts: 18,
      trend: "↗",
      nextDeadline: "7 jours",
      color: "text-red-700"
    }
  ];

  const trendsData = [
    {
      title: "Évolution du télétravail",
      category: "Droit du travail",
      trend: "+45%",
      impact: "Élevé",
      source: "Jurisprudence",
      timeframe: "6 derniers mois"
    },
    {
      title: "Réglementation RGPD",
      category: "Protection des données",
      trend: "+23%",
      impact: "Critique",
      source: "Réglementaire",
      timeframe: "3 derniers mois"
    },
    {
      title: "Transition énergétique",
      category: "Droit environnemental",
      trend: "+67%",
      impact: "Moyen",
      source: "Législatif",
      timeframe: "12 derniers mois"
    }
  ];

  const competitiveIntelligence = [
    {
      sector: "Banque & Finance",
      changes: 15,
      criticalUpdates: 3,
      lastUpdate: "Il y a 2 heures",
      keyTopics: ["Basel III", "DSP2", "MiFID II"]
    },
    {
      sector: "Santé & Pharma",
      changes: 8,
      criticalUpdates: 1,
      lastUpdate: "Il y a 4 heures",
      keyTopics: ["MDR", "RGPD Santé", "Télémédecine"]
    },
    {
      sector: "Tech & Innovation",
      changes: 22,
      criticalUpdates: 5,
      lastUpdate: "Il y a 1 heure",
      keyTopics: ["IA Act", "DMA", "DSA"]
    }
  ];

  const impactAssessments = [
    {
      text: "Loi sur la réduction de l'empreinte environnementale",
      impactScore: 8.5,
      affectedDomains: ["Environnement", "Industrie", "Transport"],
      deadline: "6 mois",
      preparationStatus: "En cours",
      actions: 12
    },
    {
      text: "Directive sur la transparence salariale",
      impactScore: 7.2,
      affectedDomains: ["RH", "Égalité", "Reporting"],
      deadline: "18 mois",
      preparationStatus: "Planifié",
      actions: 8
    },
    {
      text: "Réglement sur l'IA générative",
      impactScore: 9.1,
      affectedDomains: ["Tech", "Compliance", "Innovation"],
      deadline: "12 mois",
      preparationStatus: "Urgent",
      actions: 24
    }
  ];

  // Pagination pour le radar de conformité
  const {
    currentData: paginatedComplianceRadar,
    currentPage: radarPage,
    totalPages: radarTotalPages,
    itemsPerPage: radarItemsPerPage,
    totalItems: radarTotalItems,
    setCurrentPage: setRadarPage,
    setItemsPerPage: setRadarItemsPerPage
  } = usePagination({
    data: complianceRadarData,
    itemsPerPage: 4
  });

  // Pagination pour les tendances
  const {
    currentData: paginatedTrends,
    currentPage: trendsPage,
    totalPages: trendsTotalPages,
    itemsPerPage: trendsItemsPerPage,
    totalItems: trendsTotalItems,
    setCurrentPage: setTrendsPage,
    setItemsPerPage: setTrendsItemsPerPage
  } = usePagination({
    data: trendsData,
    itemsPerPage: 3
  });

  // Pagination pour l'intelligence concurrentielle
  const {
    currentData: paginatedCompetitive,
    currentPage: competitivePage,
    totalPages: competitiveTotalPages,
    itemsPerPage: competitiveItemsPerPage,
    totalItems: competitiveTotalItems,
    setCurrentPage: setCompetitivePage,
    setItemsPerPage: setCompetitiveItemsPerPage
  } = usePagination({
    data: competitiveIntelligence,
    itemsPerPage: 3
  });

  // Pagination pour les évaluations d'impact
  const {
    currentData: paginatedImpact,
    currentPage: impactPage,
    totalPages: impactTotalPages,
    itemsPerPage: impactItemsPerPage,
    totalItems: impactTotalItems,
    setCurrentPage: setImpactPage,
    setItemsPerPage: setImpactItemsPerPage
  } = usePagination({
    data: impactAssessments,
    itemsPerPage: 3
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          Tableaux de Bord Prédictifs
        </h3>
        <p className="text-gray-600">
          Intelligence prédictive pour anticiper les évolutions juridiques et réglementaires
        </p>
      </div>

      <Tabs defaultValue="compliance-radar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compliance-radar" className="gap-2">
            <Radar className="w-4 h-4" />
            Radar de Conformité
          </TabsTrigger>
          <TabsTrigger value="trends" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analyse des Tendances
          </TabsTrigger>
          <TabsTrigger value="competitive" className="gap-2">
            <Eye className="w-4 h-4" />
            Intelligence Concurrentielle
          </TabsTrigger>
          <TabsTrigger value="impact" className="gap-2">
            <Target className="w-4 h-4" />
            Évaluation d'Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compliance-radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Radar de Conformité - Alertes Préventives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedComplianceRadar.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{item.domain}</h4>
                        <Badge className={`${
                          item.riskLevel === 'Critique' ? 'bg-red-100 text-red-800' :
                          item.riskLevel === 'Élevé' ? 'bg-orange-100 text-orange-800' :
                          item.riskLevel === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.riskLevel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Score de conformité</span>
                            <span className="font-medium">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Alertes actives:</span>
                            <div className="font-medium flex items-center gap-1">
                              <Bell className="w-4 h-4 text-orange-500" />
                              {item.alerts}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Tendance:</span>
                            <div className={`font-medium ${item.color}`}>
                              {item.trend}
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Prochaine échéance critique:</div>
                          <div className="font-medium text-orange-600">{item.nextDeadline}</div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Voir détails
                          </Button>
                          <Button size="sm" variant="outline">
                            Plan d'action
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {radarTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={radarPage}
                    totalPages={radarTotalPages}
                    totalItems={radarTotalItems}
                    itemsPerPage={radarItemsPerPage}
                    onPageChange={setRadarPage}
                    onItemsPerPageChange={setRadarItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Analyse des Tendances Jurisprudentielles et Réglementaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedTrends.map((trend, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{trend.title}</h4>
                          <Badge variant="outline" className="mb-2">{trend.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{trend.trend}</div>
                          <div className="text-sm text-gray-500">{trend.timeframe}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Impact prévu:</span>
                          <div className={`font-medium ${
                            trend.impact === 'Critique' ? 'text-red-600' :
                            trend.impact === 'Élevé' ? 'text-orange-600' :
                            'text-yellow-600'
                          }`}>
                            {trend.impact}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Source:</span>
                          <div className="font-medium">{trend.source}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Activity className="w-4 h-4 mr-1" />
                          Analyser
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bell className="w-4 h-4 mr-1" />
                          Suivre
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {trendsTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={trendsPage}
                    totalPages={trendsTotalPages}
                    totalItems={trendsTotalItems}
                    itemsPerPage={trendsItemsPerPage}
                    onPageChange={setTrendsPage}
                    onItemsPerPageChange={setTrendsItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                Intelligence Concurrentielle - Veille Sectorielle Automatisée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {paginatedCompetitive.map((sector, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{sector.sector}</CardTitle>
                      <div className="text-sm text-gray-500">{sector.lastUpdate}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{sector.changes}</div>
                            <div className="text-sm text-gray-600">Évolutions</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{sector.criticalUpdates}</div>
                            <div className="text-sm text-gray-600">Critiques</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Sujets clés:</div>
                          <div className="flex flex-wrap gap-1">
                            {sector.keyTopics.map((topic, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Eye className="w-4 h-4 mr-2" />
                          Rapport détaillé
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {competitiveTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={competitivePage}
                    totalPages={competitiveTotalPages}
                    totalItems={competitiveTotalItems}
                    itemsPerPage={competitiveItemsPerPage}
                    onPageChange={setCompetitivePage}
                    onItemsPerPageChange={setCompetitiveItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Évaluation Automatique de l'Impact des Nouveaux Textes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedImpact.map((assessment, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{assessment.text}</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {assessment.affectedDomains.map((domain, idx) => (
                              <Badge key={idx} variant="outline">{domain}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-orange-600">{assessment.impactScore}</div>
                          <div className="text-sm text-gray-500">Score d'impact</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Échéance:</span>
                          <div className="font-medium">{assessment.deadline}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Statut:</span>
                          <Badge className={`${
                            assessment.preparationStatus === 'Urgent' ? 'bg-red-100 text-red-800' :
                            assessment.preparationStatus === 'En cours' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {assessment.preparationStatus}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Actions:</span>
                          <div className="font-medium">{assessment.actions} identifiées</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Priorité:</span>
                          <div className={`font-medium ${
                            assessment.impactScore > 8 ? 'text-red-600' :
                            assessment.impactScore > 6 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {assessment.impactScore > 8 ? 'Critique' :
                             assessment.impactScore > 6 ? 'Élevée' : 'Normale'}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Target className="w-4 h-4 mr-1" />
                          Plan d'adaptation
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analyse détaillée
                        </Button>
                        <Button size="sm" variant="outline">
                          <Zap className="w-4 h-4 mr-1" />
                          Actions rapides
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {impactTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={impactPage}
                    totalPages={impactTotalPages}
                    totalItems={impactTotalItems}
                    itemsPerPage={impactItemsPerPage}
                    onPageChange={setImpactPage}
                    onItemsPerPageChange={setImpactItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

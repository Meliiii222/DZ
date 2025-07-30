
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  DollarSign, 
  AlertCircle, 
  Map, 
  BarChart3,
  TrendingUp,
  Target,
  Thermometer,
  Award,
  Calculator,
  MapPin,
  Gauge,
  Activity
} from 'lucide-react';

export function AdvancedMetrics() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');

  const roiData = {
    totalInvestment: 150000,
    savedCosts: 320000,
    preventedFines: 180000,
    timesSaved: 1200,
    roi: 233,
    paybackPeriod: 8.5
  };

  const criticalityScores = [
    {
      alert: "Nouvelle directive RGPD - Cookies tiers",
      score: 9.2,
      category: "Réglementaire",
      deadline: "3 mois",
      impact: "Critique",
      automation: "Élevée"
    },
    {
      alert: "Modification Code du travail - Télétravail",
      score: 7.8,
      category: "Législatif",
      deadline: "6 mois",
      impact: "Élevé",
      automation: "Moyenne"
    },
    {
      alert: "Jurisprudence - Responsabilité numérique",
      score: 6.5,
      category: "Jurisprudentiel",
      deadline: "12 mois",
      impact: "Moyen",
      automation: "Faible"
    },
    {
      alert: "Norme ISO 27001 - Mise à jour",
      score: 8.9,
      category: "Norme",
      deadline: "4 mois",
      impact: "Critique",
      automation: "Élevée"
    },
    {
      alert: "Loi sur l'économie numérique - Article 45",
      score: 8.1,
      category: "Législatif",
      deadline: "2 mois",
      impact: "Élevé",
      automation: "Moyenne"
    },
    {
      alert: "Directive européenne - Protection des données",
      score: 9.5,
      category: "Réglementaire",
      deadline: "1 mois",
      impact: "Critique",
      automation: "Élevée"
    },
    {
      alert: "Jurisprudence - Contrats électroniques",
      score: 5.8,
      category: "Jurisprudentiel",
      deadline: "8 mois",
      impact: "Moyen",
      automation: "Faible"
    },
    {
      alert: "Norme ISO 9001 - Certification qualité",
      score: 7.2,
      category: "Norme",
      deadline: "5 mois",
      impact: "Élevé",
      automation: "Moyenne"
    },
    {
      alert: "Loi sur la cybersécurité - Nouvelles obligations",
      score: 8.7,
      category: "Législatif",
      deadline: "3 mois",
      impact: "Critique",
      automation: "Élevée"
    },
    {
      alert: "Directive - Transparence fiscale",
      score: 6.9,
      category: "Réglementaire",
      deadline: "7 mois",
      impact: "Moyen",
      automation: "Moyenne"
    },
    {
      alert: "Jurisprudence - Droit de la concurrence",
      score: 5.3,
      category: "Jurisprudentiel",
      deadline: "10 mois",
      impact: "Moyen",
      automation: "Faible"
    },
    {
      alert: "Norme ISO 14001 - Management environnemental",
      score: 7.6,
      category: "Norme",
      deadline: "6 mois",
      impact: "Élevé",
      automation: "Moyenne"
    }
  ];

  const riskHeatmapData = [
    { domain: "Protection des données", risk: 85, trend: "↗", incidents: 12 },
    { domain: "Droit du travail", risk: 72, trend: "→", incidents: 8 },
    { domain: "Compliance financière", risk: 91, trend: "↗", incidents: 15 },
    { domain: "Propriété intellectuelle", risk: 45, trend: "↘", incidents: 3 },
    { domain: "Droit environnemental", risk: 68, trend: "↗", incidents: 6 },
    { domain: "Sécurité informatique", risk: 88, trend: "↗", incidents: 18 },
    { domain: "Droit des contrats", risk: 55, trend: "→", incidents: 4 },
    { domain: "Réglementation sectorielle", risk: 76, trend: "↗", incidents: 9 },
    { domain: "Droit fiscal", risk: 82, trend: "↗", incidents: 11 },
    { domain: "Droit des sociétés", risk: 63, trend: "→", incidents: 7 },
    { domain: "Droit de la consommation", risk: 58, trend: "↘", incidents: 5 },
    { domain: "Droit pénal", risk: 79, trend: "↗", incidents: 13 },
    { domain: "Droit administratif", risk: 67, trend: "→", incidents: 8 },
    { domain: "Droit international", risk: 73, trend: "↗", incidents: 10 },
    { domain: "Droit bancaire", risk: 89, trend: "↗", incidents: 16 },
    { domain: "Droit des assurances", risk: 51, trend: "↘", incidents: 4 }
  ];

  const benchmarkingData = [
    {
      metric: "Temps de réaction aux alertes",
      ourValue: "2.3 heures",
      sectorAverage: "4.7 heures",
      performance: "Excellent",
      percentile: 92
    },
    {
      metric: "Couverture réglementaire",
      ourValue: "94%",
      sectorAverage: "78%",
      performance: "Très bon",
      percentile: 88
    },
    {
      metric: "Coût de la veille juridique",
      ourValue: "€85k/an",
      sectorAverage: "€120k/an",
      performance: "Excellent",
      percentile: 95
    },
    {
      metric: "Taux de conformité",
      ourValue: "96.5%",
      sectorAverage: "89.2%",
      performance: "Excellent",
      percentile: 94
    },
    {
      metric: "Délai de mise en conformité",
      ourValue: "18 jours",
      sectorAverage: "32 jours",
      performance: "Très bon",
      percentile: 89
    },
    {
      metric: "Précision des alertes",
      ourValue: "97.2%",
      sectorAverage: "84.5%",
      performance: "Excellent",
      percentile: 96
    },
    {
      metric: "Temps de traitement des documents",
      ourValue: "1.8 heures",
      sectorAverage: "3.2 heures",
      performance: "Très bon",
      percentile: 87
    },
    {
      metric: "Taux de satisfaction utilisateur",
      ourValue: "94.8%",
      sectorAverage: "82.1%",
      performance: "Excellent",
      percentile: 93
    },
    {
      metric: "Nombre d'incidents évités",
      ourValue: "156/an",
      sectorAverage: "89/an",
      performance: "Excellent",
      percentile: 91
    },
    {
      metric: "Efficacité de l'automatisation",
      ourValue: "87.3%",
      sectorAverage: "65.7%",
      performance: "Très bon",
      percentile: 85
    }
  ];

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "text-red-600 bg-red-50";
    if (risk >= 60) return "text-orange-600 bg-orange-50";
    if (risk >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent": return "text-green-600 bg-green-50";
      case "Très bon": return "text-blue-600 bg-blue-50";
      case "Bon": return "text-yellow-600 bg-yellow-50";
      default: return "text-red-600 bg-red-50";
    }
  };

  // Pagination pour les scores de criticité
  const {
    currentData: paginatedCriticalityScores,
    currentPage: criticalityPage,
    totalPages: criticalityTotalPages,
    itemsPerPage: criticalityItemsPerPage,
    totalItems: criticalityTotalItems,
    setCurrentPage: setCriticalityPage,
    setItemsPerPage: setCriticalityItemsPerPage
  } = usePagination({
    data: criticalityScores,
    itemsPerPage: 4
  });

  // Pagination pour la heatmap de risques
  const {
    currentData: paginatedRiskHeatmap,
    currentPage: riskPage,
    totalPages: riskTotalPages,
    itemsPerPage: riskItemsPerPage,
    totalItems: riskTotalItems,
    setCurrentPage: setRiskPage,
    setItemsPerPage: setRiskItemsPerPage
  } = usePagination({
    data: riskHeatmapData,
    itemsPerPage: 4
  });

  // Pagination pour le benchmarking
  const {
    currentData: paginatedBenchmarking,
    currentPage: benchmarkPage,
    totalPages: benchmarkTotalPages,
    itemsPerPage: benchmarkItemsPerPage,
    totalItems: benchmarkTotalItems,
    setCurrentPage: setBenchmarkPage,
    setItemsPerPage: setBenchmarkItemsPerPage
  } = usePagination({
    data: benchmarkingData,
    itemsPerPage: 3
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Gauge className="w-6 h-6 text-emerald-600" />
          Métriques Avancées
        </h3>
        <p className="text-gray-600">
          Métriques de performance et d'analyse de la valeur de votre veille juridique
        </p>
      </div>

      <Tabs defaultValue="roi-metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roi-metrics" className="gap-2">
            <DollarSign className="w-4 h-4" />
            ROI Veille Juridique
          </TabsTrigger>
          <TabsTrigger value="criticality" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Scoring de Criticité
          </TabsTrigger>
          <TabsTrigger value="risk-heatmap" className="gap-2">
            <Map className="w-4 h-4" />
            Heatmaps de Risques
          </TabsTrigger>
          <TabsTrigger value="benchmarking" className="gap-2">
            <Award className="w-4 h-4" />
            Benchmarking Sectoriel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roi-metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                ROI de la Veille Juridique - Calcul de la Valeur Ajoutée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Métriques principales */}
                <div className="space-y-4">
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{roiData.roi}%</div>
                      <div className="text-lg font-medium text-gray-700">Retour sur Investissement</div>
                      <div className="text-sm text-gray-500 mt-1">Sur 12 mois</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{roiData.paybackPeriod} mois</div>
                      <div className="text-lg font-medium text-gray-700">Période de Retour</div>
                      <div className="text-sm text-gray-500 mt-1">Investissement amorti</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Détail des économies */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Détail des Économies Réalisées</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">Coûts évités</div>
                        <div className="text-sm text-gray-600">Anticipation des risques</div>
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        €{roiData.savedCosts.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">Amendes évitées</div>
                        <div className="text-sm text-gray-600">Conformité préventive</div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        €{roiData.preventedFines.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium">Temps économisé</div>
                        <div className="text-sm text-gray-600">Automatisation</div>
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        {roiData.timesSaved}h
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium">Investissement total</div>
                        <div className="text-sm text-gray-600">Plateforme + ressources</div>
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        €{roiData.totalInvestment.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold mb-2">Projection sur 24 mois</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">458%</div>
                    <div className="text-sm text-gray-600">ROI projeté</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">€750k</div>
                    <div className="text-sm text-gray-600">Économies totales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">2,400h</div>
                    <div className="text-sm text-gray-600">Temps économisé</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criticality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-600" />
                Scoring de Criticité - Évaluation Automatique de l'Urgence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedCriticalityScores.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{item.alert}</h4>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge className={`${
                              item.impact === 'Critique' ? 'bg-red-100 text-red-800' :
                              item.impact === 'Élevé' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.impact}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${
                            item.score >= 8 ? 'text-red-600' :
                            item.score >= 6 ? 'text-orange-600' :
                            'text-yellow-600'
                          }`}>
                            {item.score}
                          </div>
                          <div className="text-sm text-gray-500">Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Échéance:</span>
                          <div className="font-medium">{item.deadline}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Automation:</span>
                          <div className={`font-medium ${
                            item.automation === 'Élevée' ? 'text-green-600' :
                            item.automation === 'Moyenne' ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {item.automation}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Priorité:</span>
                          <div className={`font-medium ${
                            item.score >= 8 ? 'text-red-600' :
                            item.score >= 6 ? 'text-orange-600' :
                            'text-yellow-600'
                          }`}>
                            {item.score >= 8 ? 'Urgente' :
                             item.score >= 6 ? 'Élevée' : 'Normale'}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Niveau de criticité</span>
                          <span>{item.score}/10</span>
                        </div>
                        <Progress value={item.score * 10} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className={`${
                          item.score >= 8 ? 'bg-red-600 hover:bg-red-700' :
                          item.score >= 6 ? 'bg-orange-600 hover:bg-orange-700' :
                          'bg-yellow-600 hover:bg-yellow-700'
                        }`}>
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Action immédiate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Activity className="w-4 h-4 mr-1" />
                          Analyser
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {criticalityTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={criticalityPage}
                    totalPages={criticalityTotalPages}
                    totalItems={criticalityTotalItems}
                    itemsPerPage={criticalityItemsPerPage}
                    onPageChange={setCriticalityPage}
                    onItemsPerPageChange={setCriticalityItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Heatmaps de Risques - Cartographie Visuelle des Vulnérabilités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedRiskHeatmap.map((item, index) => (
                  <Card key={index} className={`border-l-4 ${
                    item.risk >= 80 ? 'border-l-red-500' :
                    item.risk >= 60 ? 'border-l-orange-500' :
                    item.risk >= 40 ? 'border-l-yellow-500' :
                    'border-l-green-500'
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{item.domain}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(item.risk)}`}>
                          {item.risk}%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Niveau de risque</span>
                            <span className="font-medium">{item.risk}%</span>
                          </div>
                          <Progress value={item.risk} className="h-3" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Tendance:</span>
                            <div className={`font-medium text-lg ${
                              item.trend === '↗' ? 'text-red-600' :
                              item.trend === '→' ? 'text-orange-600' :
                              'text-green-600'
                            }`}>
                              {item.trend}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Incidents:</span>
                            <div className="font-medium text-lg">{item.incidents}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm font-medium mb-1">Actions recommandées:</div>
                          <div className="text-sm text-gray-600">
                            {item.risk >= 80 ? 'Intervention urgente requise' :
                             item.risk >= 60 ? 'Surveillance renforcée nécessaire' :
                             item.risk >= 40 ? 'Monitoring de routine' :
                             'Situation sous contrôle'}
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full" 
                          variant={item.risk >= 80 ? 'default' : 'outline'}
                          onClick={() => {
                            // Naviguer vers la section de gestion des risques
                            window.dispatchEvent(new CustomEvent('navigate-to-section', { 
                              detail: 'security' 
                            }));
                          }}
                        >
                          <Map className="w-4 h-4 mr-2" />
                          Plan d'atténuation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {riskTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={riskPage}
                    totalPages={riskTotalPages}
                    totalItems={riskTotalItems}
                    itemsPerPage={riskItemsPerPage}
                    onPageChange={setRiskPage}
                    onItemsPerPageChange={setRiskItemsPerPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Benchmarking Sectoriel - Comparaison avec les Pratiques du Secteur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedBenchmarking.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{item.metric}</h4>
                        <Badge className={getPerformanceColor(item.performance)}>
                          {item.performance}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Notre valeur:</span>
                          <div className="font-bold text-lg text-blue-600">{item.ourValue}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Moyenne secteur:</span>
                          <div className="font-bold text-lg text-gray-600">{item.sectorAverage}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Percentile:</span>
                          <div className="font-bold text-lg text-green-600">{item.percentile}e</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Performance:</span>
                          <div className={`font-bold text-lg ${
                            item.performance === 'Excellent' ? 'text-green-600' :
                            item.performance === 'Très bon' ? 'text-blue-600' :
                            item.performance === 'Bon' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {item.performance}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Position sectorielle</span>
                          <span>{item.percentile}e percentile</span>
                        </div>
                        <Progress value={item.percentile} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analyse détaillée
                        </Button>
                        <Button size="sm" variant="outline">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Améliorer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {benchmarkTotalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={benchmarkPage}
                    totalPages={benchmarkTotalPages}
                    totalItems={benchmarkTotalItems}
                    itemsPerPage={benchmarkItemsPerPage}
                    onPageChange={setBenchmarkPage}
                    onItemsPerPageChange={setBenchmarkItemsPerPage}
                  />
                </div>
              )}

              <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Résumé de Performance Sectorielle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">92.8</div>
                      <div className="text-sm text-gray-600">Score global moyen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">3/5</div>
                      <div className="text-sm text-gray-600">Métriques excellentes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">Top 10%</div>
                      <div className="text-sm text-gray-600">Classement sectoriel</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

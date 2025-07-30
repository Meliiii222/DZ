
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitCompareArrows, Play, TrendingUp, TrendingDown, Calendar, Users, BarChart3, PieChart, FileText, Clock, Filter, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

const comparisonData = [
  { metric: 'Performance', periode1: 85, periode2: 92, difference: 7 },
  { metric: 'Utilisation', periode1: 78, periode2: 85, difference: 7 },
  { metric: 'Satisfaction', periode1: 90, periode2: 94, difference: 4 },
  { metric: 'Conformité', periode1: 88, periode2: 91, difference: 3 },
  { metric: 'Efficacité', periode1: 82, periode2: 89, difference: 7 },
  { metric: 'Qualité', periode1: 95, periode2: 97, difference: 2 },
  { metric: 'Temps de réponse', periode1: 75, periode2: 82, difference: 7 },
  { metric: 'Taux de succès', periode1: 88, periode2: 93, difference: 5 },
  { metric: 'Volume de documents', periode1: 1200, periode2: 1450, difference: 21 },
  { metric: 'Fréquence d\'accès', periode1: 65, periode2: 72, difference: 7 },
  { metric: 'Précision', periode1: 92, periode2: 95, difference: 3 },
  { metric: 'Réactivité', periode1: 80, periode2: 87, difference: 7 }
];

const trendData = [
  { month: 'Jan', q1: 85, q4: 78, usage: 1200, documents: 45 },
  { month: 'Fév', q1: 88, q4: 82, usage: 1350, documents: 52 },
  { month: 'Mar', q1: 92, q4: 85, usage: 1480, documents: 58 },
  { month: 'Avr', q1: 87, q4: 88, usage: 1320, documents: 49 },
  { month: 'Mai', q1: 94, q4: 91, usage: 1650, documents: 67 },
  { month: 'Jun', q1: 91, q4: 89, usage: 1580, documents: 63 },
  { month: 'Jul', q1: 89, q4: 86, usage: 1420, documents: 55 },
  { month: 'Aoû', q1: 93, q4: 90, usage: 1720, documents: 71 },
  { month: 'Sep', q1: 96, q4: 93, usage: 1850, documents: 78 },
  { month: 'Oct', q1: 90, q4: 87, usage: 1680, documents: 69 },
  { month: 'Nov', q1: 95, q4: 92, usage: 1920, documents: 82 },
  { month: 'Déc', q1: 98, q4: 95, usage: 2100, documents: 89 }
];

const distributionData = [
  { name: 'Textes Juridiques', value: 65, color: '#3b82f6' },
  { name: 'Procédures Admin.', value: 25, color: '#10b981' },
  { name: 'Décrets', value: 8, color: '#f59e0b' },
  { name: 'Arrêtés', value: 2, color: '#ef4444' }
];

const departmentData = [
  { department: 'Justice', performance: 92, satisfaction: 88, efficiency: 90 },
  { department: 'Intérieur', performance: 87, satisfaction: 85, efficiency: 89 },
  { department: 'Finances', performance: 94, satisfaction: 91, efficiency: 95 },
  { department: 'Travail', performance: 89, satisfaction: 87, efficiency: 88 },
  { department: 'Santé', performance: 91, satisfaction: 89, efficiency: 92 },
  { department: 'Éducation', performance: 86, satisfaction: 84, efficiency: 87 },
  { department: 'Transport', performance: 88, satisfaction: 86, efficiency: 89 },
  { department: 'Agriculture', performance: 85, satisfaction: 83, efficiency: 86 },
  { department: 'Commerce', performance: 93, satisfaction: 90, efficiency: 94 },
  { department: 'Environnement', performance: 90, satisfaction: 88, efficiency: 91 },
  { department: 'Culture', performance: 84, satisfaction: 82, efficiency: 85 },
  { department: 'Sports', performance: 87, satisfaction: 85, efficiency: 88 }
];

const timeSeriesData = [
  { date: '2024-01', docs: 234, users: 1890, queries: 5640 },
  { date: '2024-02', docs: 267, users: 2100, queries: 6200 },
  { date: '2024-03', docs: 298, users: 2350, queries: 6890 },
  { date: '2024-04', docs: 276, users: 2180, queries: 6340 },
  { date: '2024-05', docs: 312, users: 2560, queries: 7420 },
  { date: '2024-06', docs: 289, users: 2380, queries: 6980 }
];

export function ComparativeAnalysis() {
  const [period1, setPeriod1] = useState('q1-2024');
  const [period2, setPeriod2] = useState('q4-2024');
  const [comparisonType, setComparisonType] = useState('periods');
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: '2024-01', end: '2024-06' });
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterDocType, setFilterDocType] = useState('all');
  const [selectedMetrics, setSelectedMetrics] = useState({
    Performance: true,
    Utilisation: true,
    Satisfaction: true,
    Conformité: true,
    Efficacité: true,
    Qualité: true,
    'Temps de réponse': true,
    'Taux de succès': true,
    'Volume de documents': true,
    'Fréquence d\'accès': true
  });

  // Pagination pour les données de comparaison
  const {
    currentData: paginatedComparisonData,
    currentPage: comparisonPage,
    totalPages: comparisonTotalPages,
    itemsPerPage: comparisonItemsPerPage,
    totalItems: comparisonTotalItems,
    setCurrentPage: setComparisonPage,
    setItemsPerPage: setComparisonItemsPerPage
  } = usePagination({
    data: comparisonData,
    itemsPerPage: 5
  });

  // Pagination pour les données de tendances
  const {
    currentData: paginatedTrendData,
    currentPage: trendPage,
    totalPages: trendTotalPages,
    itemsPerPage: trendItemsPerPage,
    totalItems: trendTotalItems,
    setCurrentPage: setTrendPage,
    setItemsPerPage: setTrendItemsPerPage
  } = usePagination({
    data: trendData,
    itemsPerPage: 6
  });

  // Pagination pour les données de départements
  const {
    currentData: paginatedDepartmentData,
    currentPage: departmentPage,
    totalPages: departmentTotalPages,
    itemsPerPage: departmentItemsPerPage,
    totalItems: departmentTotalItems,
    setCurrentPage: setDepartmentPage,
    setItemsPerPage: setDepartmentItemsPerPage
  } = usePagination({
    data: departmentData,
    itemsPerPage: 6
  });

  const handleMetricChange = (metric: string, checked: boolean) => {
    setSelectedMetrics(prev => ({ ...prev, [metric]: checked }));
  };

  const handleStartComparison = () => {
    console.log('Lancement de la comparaison:', { comparisonType, period1, period2, selectedMetrics });
    setAnalysisStarted(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      console.log('Analyse comparative terminée');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompareArrows className="w-5 h-5 text-purple-600" />
            Analyse Comparative Temporelle
          </CardTitle>
          <CardDescription>
            Analysez l'évolution des performances, tendances et métriques juridiques dans le temps avec l'IA avancée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration avancée de l'analyse */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type d'analyse</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="periods">Comparaison périodes</SelectItem>
                  <SelectItem value="trends">Analyse tendances</SelectItem>
                  <SelectItem value="departments">Performance départements</SelectItem>
                  <SelectItem value="usage">Patterns d'utilisation</SelectItem>
                  <SelectItem value="efficiency">Efficacité temporelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période de référence</label>
              <Select value={period1} onValueChange={setPeriod1}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="2023">Année 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période de comparaison</label>
              <Select value={period2} onValueChange={setPeriod2}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="2024">Année 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Granularité</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                  <SelectItem value="quarterly">Trimestrielle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filtres avancés */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres d'analyse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Département</label>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les départements</SelectItem>
                      <SelectItem value="justice">Justice</SelectItem>
                      <SelectItem value="interieur">Intérieur</SelectItem>
                      <SelectItem value="finances">Finances</SelectItem>
                      <SelectItem value="travail">Travail</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type de document</label>
                  <Select value={filterDocType} onValueChange={setFilterDocType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="legal">Textes juridiques</SelectItem>
                      <SelectItem value="procedure">Procédures admin.</SelectItem>
                      <SelectItem value="decree">Décrets</SelectItem>
                      <SelectItem value="order">Arrêtés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Plage temporelle</label>
                  <div className="flex gap-2">
                    <Input type="month" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} />
                    <Input type="month" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700" 
              size="lg"
              onClick={handleStartComparison}
              disabled={analysisStarted}
            >
              <Play className="w-5 h-5 mr-2" />
              {analysisStarted ? 'Analyse en cours...' : 'Lancer l\'analyse temporelle'}
            </Button>
            
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Exporter les résultats
            </Button>
          </div>

          {/* Métriques sélectionnables avec catégories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métriques d'analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="usage">Utilisation</TabsTrigger>
                  <TabsTrigger value="quality">Qualité</TabsTrigger>
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Performance', 'Efficacité', 'Temps de réponse'].map(metric => (
                      <div key={metric} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={metric} 
                          checked={selectedMetrics[metric]}
                          onChange={(e) => handleMetricChange(metric, e.target.checked)}
                          className="rounded" 
                        />
                        <label htmlFor={metric} className="text-sm">{metric}</label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Utilisation', 'Fréquence d\'accès', 'Taux de succès'].map(metric => (
                      <div key={metric} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={metric} 
                          checked={selectedMetrics[metric]}
                          onChange={(e) => handleMetricChange(metric, e.target.checked)}
                          className="rounded" 
                        />
                        <label htmlFor={metric} className="text-sm">{metric}</label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="quality" className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Satisfaction', 'Conformité', 'Qualité'].map(metric => (
                      <div key={metric} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={metric} 
                          checked={selectedMetrics[metric]}
                          onChange={(e) => handleMetricChange(metric, e.target.checked)}
                          className="rounded" 
                        />
                        <label htmlFor={metric} className="text-sm">{metric}</label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="volume" className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Volume de documents'].map(metric => (
                      <div key={metric} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={metric} 
                          checked={selectedMetrics[metric]}
                          onChange={(e) => handleMetricChange(metric, e.target.checked)}
                          className="rounded" 
                        />
                        <label htmlFor={metric} className="text-sm">{metric}</label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Résultats enrichis de l'analyse */}
          {analysisStarted && (
            <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="trends">Tendances</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                <TabsTrigger value="departments">Départements</TabsTrigger>
                <TabsTrigger value="insights">Insights IA</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold">1,847</p>
                          <p className="text-sm text-gray-600">Documents analysés</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold">12,456</p>
                          <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold">+18%</p>
                          <p className="text-sm text-gray-600">Amélioration performance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-8 h-8 text-orange-600" />
                        <div>
                          <p className="text-2xl font-bold">-24%</p>
                          <p className="text-sm text-gray-600">Réduction temps traitement</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison {period1.toUpperCase()} vs {period2.toUpperCase()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="metric" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="periode1" fill="#3b82f6" name={period1.toUpperCase()} />
                          <Bar dataKey="periode2" fill="#10b981" name={period2.toUpperCase()} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution temporelle multi-métriques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={paginatedTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="q1" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Performance Q1" />
                          <Area type="monotone" dataKey="q4" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Performance Q4" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Volume d'utilisation et documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="docs" stroke="#8884d8" strokeWidth={2} name="Documents" />
                          <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} name="Utilisateurs" />
                          <Line type="monotone" dataKey="queries" stroke="#ffc658" strokeWidth={2} name="Requêtes" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="distribution" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribution par type de document</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Tooltip />
                            <Legend />
                            <RechartsPieChart data={distributionData} cx="50%" cy="50%" outerRadius={80}>
                              {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </RechartsPieChart>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Répartition par catégories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {distributionData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <Badge variant="secondary">{item.value}%</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="departments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance par département</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paginatedDepartmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="department" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="performance" fill="#3b82f6" name="Performance" />
                          <Bar dataKey="satisfaction" fill="#10b981" name="Satisfaction" />
                          <Bar dataKey="efficiency" fill="#f59e0b" name="Efficacité" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Insights IA - Analyse prédictive
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">🎯 Tendance Positive</h4>
                        <p className="text-sm text-blue-800">
                          L'utilisation des textes juridiques a augmenté de 18% ce trimestre. 
                          Prédiction : +25% d'ici fin d'année basée sur les patterns actuels.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">📈 Optimisation Détectée</h4>
                        <p className="text-sm text-green-800">
                          Les procédures administratives montrent une efficacité accrue de 22%. 
                          Facteur clé : réduction du temps de traitement moyen.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">⚠️ Point d'Attention</h4>
                        <p className="text-sm text-orange-800">
                          Pic d'utilisation détecté les mardis et mercredis. 
                          Recommandation : optimiser les ressources ces jours-là.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">🔮 Prédiction Saisonnière</h4>
                        <p className="text-sm text-purple-800">
                          Hausse prévue de 30% en fin d'année fiscale. 
                          Préparer l'infrastructure pour gérer la charge supplémentaire.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analyse des écarts détaillée</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {paginatedComparisonData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{item.metric}</span>
                            <Badge variant={item.difference > 0 ? "default" : "secondary"}>
                              {item.difference > 0 ? "Amélioration" : "Stable"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.difference > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={item.difference > 0 ? 'text-green-600 font-semibold' : 'text-red-600'}>
                              {item.difference > 0 ? '+' : ''}{item.difference}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {comparisonTotalPages > 1 && (
                      <div className="mt-6">
                        <Pagination
                          currentPage={comparisonPage}
                          totalPages={comparisonTotalPages}
                          totalItems={comparisonTotalItems}
                          itemsPerPage={comparisonItemsPerPage}
                          onPageChange={setComparisonPage}
                          onItemsPerPageChange={setComparisonItemsPerPage}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

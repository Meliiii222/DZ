
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Users,
  Eye,
  Clock,
  Tag,
  BarChart3,
  PieChart,
  Activity,
  Star,
  ArrowUp,
  ArrowDown,
  Hash,
  Globe,
  Target
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

export function SearchTrendsAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const topSearchTerms = [
    {
      term: "code du travail",
      searches: 2847,
      change: "+23%",
      trend: "up",
      category: "Droit du travail",
      avgResultsViewed: 5.2,
      clickThroughRate: 78
    },
    {
      term: "loi de finances 2025",
      searches: 2156,
      change: "+45%",
      trend: "up",
      category: "Finances publiques",
      avgResultsViewed: 3.8,
      clickThroughRate: 85
    },
    {
      term: "procédures administratives",
      searches: 1923,
      change: "-8%",
      trend: "down",
      category: "Droit administratif",
      avgResultsViewed: 4.1,
      clickThroughRate: 72
    },
    {
      term: "protection des données",
      searches: 1756,
      change: "+67%",
      trend: "up",
      category: "Numérique",
      avgResultsViewed: 6.3,
      clickThroughRate: 91
    },
    {
      term: "droit environnemental",
      searches: 1432,
      change: "+12%",
      trend: "up",
      category: "Environnement",
      avgResultsViewed: 4.7,
      clickThroughRate: 69
    }
  ];

  const searchMetrics = [
    { 
      label: "Recherches totales", 
      value: "45,234", 
      change: "+18%", 
      icon: Search, 
      color: "text-blue-600" 
    },
    { 
      label: "Termes uniques", 
      value: "8,967", 
      change: "+25%", 
      icon: Hash, 
      color: "text-purple-600" 
    },
    { 
      label: "Taux de succès", 
      value: "87%", 
      change: "+5%", 
      icon: Target, 
      color: "text-green-600" 
    },
    { 
      label: "Recherches sans résultat", 
      value: "234", 
      change: "-12%", 
      icon: Eye, 
      color: "text-orange-600" 
    }
  ];

  const categoryTrends = [
    { category: "Droit du travail", searches: 8945, change: "+15%", trend: "up", percentage: 22 },
    { category: "Finances publiques", searches: 7234, change: "+28%", trend: "up", percentage: 18 },
    { category: "Droit administratif", searches: 6123, change: "-5%", trend: "down", percentage: 15 },
    { category: "Numérique", searches: 5456, change: "+42%", trend: "up", percentage: 13 },
    { category: "Environnement", searches: 4567, change: "+18%", trend: "up", percentage: 11 },
    { category: "Droit civil", searches: 3789, change: "+8%", trend: "up", percentage: 9 },
    { category: "Autres", searches: 4886, change: "+12%", trend: "up", percentage: 12 }
  ];

  const timeBasedAnalysis = [
    { hour: "09:00", searches: 1234, label: "9h" },
    { hour: "10:00", searches: 1567, label: "10h" },
    { hour: "11:00", searches: 1891, label: "11h" },
    { hour: "14:00", searches: 2134, label: "14h" },
    { hour: "15:00", searches: 1987, label: "15h" },
    { hour: "16:00", searches: 1654, label: "16h" }
  ];

  const emergingTopics = [
    {
      topic: "Intelligence artificielle juridique",
      growth: "+156%",
      searches: 456,
      isNew: true
    },
    {
      topic: "Télétravail réglementation",
      growth: "+89%",
      searches: 823,
      isNew: false
    },
    {
      topic: "Crypto-monnaies législation",
      growth: "+234%",
      searches: 267,
      isNew: true
    },
    {
      topic: "Transition énergétique",
      growth: "+67%",
      searches: 634,
      isNew: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Analyse des Tendances de Recherche</h3>
          <p className="text-gray-600">Découvrez les tendances et comportements de recherche des utilisateurs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Période
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="terms">Termes Populaires</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="timing">Temporalité</TabsTrigger>
          <TabsTrigger value="emerging">Tendances Émergentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Recherches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { mois: "Jan", recherches: 8234 },
                      { mois: "Fév", recherches: 9567 },
                      { mois: "Mar", recherches: 12456 },
                      { mois: "Avr", recherches: 11234 },
                      { mois: "Mai", recherches: 15678 },
                      { mois: "Jun", recherches: 14532 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="recherches" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Recherches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSearchTerms.slice(0, 5).map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{term.term}</div>
                          <div className="text-xs text-gray-500">{term.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{term.searches.toLocaleString()}</div>
                        <div className={`text-xs flex items-center gap-1 ${
                          term.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {term.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {term.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des termes..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {topSearchTerms.map((term, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">"{term.term}"</h3>
                          <Badge className="bg-blue-100 text-blue-800">{term.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{term.searches.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Recherches</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{term.avgResultsViewed}</div>
                          <div className="text-xs text-gray-500">Résultats vus (moy.)</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{term.clickThroughRate}%</div>
                          <div className="text-xs text-gray-500">Taux de clic</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                            term.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {term.trend === 'up' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                            {term.change}
                          </div>
                          <div className="text-xs text-gray-500">Évolution</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryTrends.map(cat => ({ name: cat.category, value: cat.searches }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {categoryTrends.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'][index % 7]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendances par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryTrends.map((category, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{category.category}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          category.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {category.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          {category.change}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{category.searches.toLocaleString()} recherches</span>
                        <span className="text-sm font-medium">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité par Heure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeBasedAnalysis.map((time, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{time.label}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{time.searches.toLocaleString()} recherches</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full" 
                            style={{ width: `${(time.searches / 2134) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparaison Hebdomadaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { jour: "Lun", semaine1: 1234, semaine2: 1456 },
                      { jour: "Mar", semaine1: 1567, semaine2: 1678 },
                      { jour: "Mer", semaine1: 1890, semaine2: 2123 },
                      { jour: "Jeu", semaine1: 2134, semaine2: 2345 },
                      { jour: "Ven", semaine1: 1876, semaine2: 2012 },
                      { jour: "Sam", semaine1: 856, semaine2: 945 },
                      { jour: "Dim", semaine1: 678, semaine2: 723 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="jour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="semaine1" fill="#3b82f6" name="Semaine précédente" />
                      <Bar dataKey="semaine2" fill="#10b981" name="Cette semaine" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emerging" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergingTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {topic.topic}
                        {topic.isNew && <Badge className="bg-green-100 text-green-800">Nouveau</Badge>}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{topic.growth}</div>
                      <div className="text-xs text-gray-500">Croissance</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{topic.searches} recherches</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sujets à Surveiller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-2" />
                <p>Système de veille automatique des tendances émergentes</p>
                <p className="text-sm mt-1">Les nouveaux sujets d'intérêt seront détectés automatiquement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

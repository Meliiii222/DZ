import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  Filter, 
  Download, 
  RefreshCw,
  Calendar,
  Activity,
  Cpu,
  Database,
  Gauge,
  PieChart,
  LineChart,
  Settings
} from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';

export function AIAnalyticsAdvanced() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeMetric, setActiveMetric] = useState('performance');

  const aiMetrics = [
    {
      title: 'Analyses IA traitées',
      value: '3,284',
      change: '+15%',
      trend: 'up',
      icon: Cpu,
      color: 'text-blue-600'
    },
    {
      title: 'Précision moyenne',
      value: '96.8%',
      change: '+1.2%',
      trend: 'up',
      icon: Gauge,
      color: 'text-green-600'
    },
    {
      title: 'Temps de traitement',
      value: '2.4s',
      change: '-0.3s',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      title: 'Modèles actifs',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Database,
      color: 'text-orange-600'
    }
  ];

  const aiModules = [
    { name: 'Traitement du langage naturel', status: 'Actif', performance: '98%', color: 'bg-green-500' },
    { name: 'Classification automatique', status: 'Actif', performance: '95%', color: 'bg-blue-500' },
    { name: 'Extraction d\'entités', status: 'Actif', performance: '92%', color: 'bg-purple-500' },
    { name: 'Analyse de sentiment', status: 'En cours', performance: '89%', color: 'bg-orange-500' }
  ];

  const periodOptions = [
    { value: 'week', label: '7 derniers jours' },
    { value: 'month', label: '30 derniers jours' },
    { value: 'quarter', label: '3 derniers mois' },
    { value: 'year', label: '12 derniers mois' }
  ];

  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Analyser les métriques IA..."
        onSearch={(query) => console.log('Recherche analytics IA:', query)}
        onAdd={() => console.log('Nouvelle analyse IA')}
        onFilter={() => console.log('Filtrer analyses')}
        onSort={() => console.log('Trier analyses')}
        onExport={() => console.log('Exporter analyses')}
        onRefresh={() => console.log('Actualiser analytics')}
        showActions={true}
      />

      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs période précédente</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gray-50">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contrôles et filtres */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Tableau de bord Analytics IA
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  console.log('Opening advanced filters');
                  window.dispatchEvent(new CustomEvent('show-advanced-filters'));
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  console.log('Refreshing analytics data');
                  window.dispatchEvent(new CustomEvent('refresh-analytics'));
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  console.log('Exporting analytics data');
                  window.dispatchEvent(new CustomEvent('export-analytics'));
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Onglets détaillés */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="models">Modèles IA</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Performance globale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Graphique de performance IA</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-600" />
                  Répartition des traitements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Graphique en secteurs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                État des modèles IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${module.color}`}></div>
                      <div>
                        <span className="font-medium block">{module.name}</span>
                        <span className="text-sm text-gray-500">{module.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{module.performance}</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                Statistiques d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-2xl font-bold text-blue-600">2,847</h4>
                  <p className="text-sm text-gray-600">Requêtes traitées</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-2xl font-bold text-green-600">156</h4>
                  <p className="text-sm text-gray-600">Modèles utilisés</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-2xl font-bold text-purple-600">94.2%</h4>
                  <p className="text-sm text-gray-600">Taux de succès</p>
                </div>
              </div>
              <div className="mt-6 h-32 flex items-center justify-center border rounded-lg bg-gray-50">
                <p className="text-gray-500">Graphique d'utilisation temporelle</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-600" />
                Insights automatiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded">
                  <p className="font-medium">Amélioration de performance détectée</p>
                  <p className="text-sm text-gray-600">Le modèle NLP montre une amélioration de 3% cette semaine</p>
                </div>
                <div className="p-3 border-l-4 border-l-green-500 bg-green-50 rounded">
                  <p className="font-medium">Nouveau pattern identifié</p>
                  <p className="text-sm text-gray-600">Augmentation des requêtes de classification automatique</p>
                </div>
                <div className="p-3 border-l-4 border-l-orange-500 bg-orange-50 rounded">
                  <p className="font-medium">Optimisation recommandée</p>
                  <p className="text-sm text-gray-600">Le modèle d'extraction pourrait bénéficier d'un réentraînement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" />
                Configuration des modèles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Seuils de confiance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">NLP</span>
                        <Badge>85%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Classification</span>
                        <Badge>90%</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Paramètres système</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Timeout</span>
                        <Badge>30s</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Batch size</span>
                        <Badge>100</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
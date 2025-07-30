import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Filter, 
  Download, 
  RefreshCw,
  Calendar,
  Activity,
  Zap,
  LineChart,
  Target,
  AlertTriangle
} from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';

export function PredictiveAnalysisAdvanced() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeFilter, setActiveFilter] = useState('all');

  const predictionMetrics = [
    {
      title: 'Prédictions générées',
      value: '1,247',
      change: '+18%',
      trend: 'up',
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Précision moyenne',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Analyses en cours',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Alertes prédictives',
      value: '47',
      change: '+12',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  const predictionTypes = [
    { name: 'Décisions judiciaires', accuracy: '96%', color: 'bg-green-500' },
    { name: 'Évolution législative', accuracy: '89%', color: 'bg-blue-500' },
    { name: 'Risques juridiques', accuracy: '92%', color: 'bg-orange-500' },
    { name: 'Tendances jurisprudentielles', accuracy: '87%', color: 'bg-purple-500' }
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
        placeholder="Lancer une nouvelle analyse prédictive..."
        onSearch={(query) => console.log('Analyse prédictive:', query)}
        onAdd={() => console.log('Nouvelle prédiction')}
        onFilter={() => console.log('Filtrer prédictions')}
        onSort={() => console.log('Trier prédictions')}
        onExport={() => console.log('Exporter prédictions')}
        onRefresh={() => console.log('Actualiser prédictions')}
        showActions={true}
      />

      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictionMetrics.map((metric, index) => (
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
              <Calendar className="w-5 h-5 text-purple-600" />
              Tableau de bord prédictif
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
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Onglets détaillés */}
      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Modèles prédictifs</TabsTrigger>
          <TabsTrigger value="scenarios">Scénarios</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Performance des modèles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <Badge variant="secondary">{type.accuracy}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Scénarios prédictifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Scénario optimiste</h4>
                  <p className="text-sm text-gray-600">Évolution favorable de la jurisprudence</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">85% probabilité</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Scénario pessimiste</h4>
                  <p className="text-sm text-gray-600">Durcissement réglementaire</p>
                  <Badge className="mt-2 bg-red-100 text-red-800">23% probabilité</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-600" />
                Tendances prédictives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                <p className="text-gray-500">Graphique des tendances prédictives</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                Rapports prédictifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span>Rapport mensuel - Prédictions juridiques</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span>Analyse prédictive - Évolutions réglementaires</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
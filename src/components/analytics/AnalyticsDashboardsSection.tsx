
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Brain,
  Gauge
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { LegalTrendsChart } from './LegalTrendsChart';
import { ComplianceMetrics } from './ComplianceMetrics';
import { ActivityHeatmap } from './ActivityHeatmap';
import { AlertsOverview } from './AlertsOverview';
import { PredictiveDashboards } from './PredictiveDashboards';
import { AdvancedMetrics } from './AdvancedMetrics';
import { PersonalizedDashboards } from './PersonalizedDashboards';

interface AnalyticsDashboardsSectionProps {
  language: string;
}

export function AnalyticsDashboardsSection({ language }: AnalyticsDashboardsSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const kpiCards = [
    {
      title: 'Textes analysés',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Alertes générées',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'Taux de conformité',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: PieChart,
      color: 'text-green-600'
    },
    {
      title: 'Consultations',
      value: '18,924',
      change: '-3%',
      trend: 'down',
      icon: Eye,
      color: 'text-purple-600'
    }
  ];

  const periodOptions = [
    { value: 'week', label: '7 derniers jours' },
    { value: 'month', label: '30 derniers jours' },
    { value: 'quarter', label: '3 derniers mois' },
    { value: 'year', label: '12 derniers mois' }
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Tableaux de bord"
        description="Analysez les tendances juridiques et suivez les métriques de performance"
        icon={BarChart3}
        iconColor="text-blue-600"
      />

      {/* KPI Cards - Petit tableau de bord déplacé avant Période d'analyse */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs période précédente</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-50`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contrôles de période et actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Période d'analyse
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
                Filtres
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

      {/* Tableaux de bord détaillés */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="personalized">Tableaux Personnalisés</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="compliance">Conformité</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="predictive">Prédictif</TabsTrigger>
          <TabsTrigger value="advanced-metrics">Métriques Avancées</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LegalTrendsChart period={selectedPeriod} />
            <ComplianceMetrics period={selectedPeriod} />
          </div>
          <AlertsOverview />
        </TabsContent>

        <TabsContent value="personalized" className="space-y-6">
          <PersonalizedDashboards />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <LegalTrendsChart period={selectedPeriod} detailed={true} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceMetrics period={selectedPeriod} detailed={true} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityHeatmap period={selectedPeriod} />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveDashboards />
        </TabsContent>

        <TabsContent value="advanced-metrics" className="space-y-6">
          <AdvancedMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

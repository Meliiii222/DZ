import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsDashboardsSection } from '@/components/analytics/AnalyticsDashboardsSection';
import { DocumentUsageMetrics } from '@/components/analytics/DocumentUsageMetrics';
import { LegislativeImpactReports } from '@/components/analytics/LegislativeImpactReports';
import { SearchTrendsAnalysis } from '@/components/analytics/SearchTrendsAnalysis';
import { ProcedureAnalysisTab } from '@/components/procedures/ProcedureAnalysisTab';
import { CustomReportGeneration } from '@/components/analysis/CustomReportGeneration';
import { PredefinedTemplates } from '@/components/analysis/PredefinedTemplates';
import { PerformanceAnalysis } from '@/components/analysis/PerformanceAnalysis';
import { ComparativeAnalysis } from '@/components/analysis/ComparativeAnalysis';
import { DocumentComparison } from '@/components/analysis/DocumentComparison';
import { AIInsights } from '@/components/analysis/AIInsights';
import { DashboardsSection } from '@/components/analysis/DashboardsSection';
import { DependenciesConflictsAnalysis } from '@/components/analysis/DependenciesConflictsAnalysis';
import { PredictiveAnalysisAdvanced } from '@/components/analysis/PredictiveAnalysisAdvanced';
import { AIAnalyticsAdvanced } from '@/components/analysis/AIAnalyticsAdvanced';
import { UnifiedSectionHeader } from '@/components/common/UnifiedSectionHeader';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Activity,
  Users
} from 'lucide-react';
import { TrendsAnalysis } from '@/components/analysis/TrendsAnalysis';
import { KnowledgeGraph } from '@/components/analysis/KnowledgeGraph';

interface AnalysisReportsSectionsProps {
  section: string;
  language: string;
}

export function AnalysisReportsSections({ section, language }: AnalysisReportsSectionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getSectionTitle = () => {
    switch (section) {
      case 'analytics-dashboards':
        return 'Tableaux de Bord';
      case 'analysis':
        return 'Analyses';
      case 'reports':
        return 'Rapports';
      case 'assisted-writing':
        return 'Rédaction assistée';
      default:
        return 'Analyse & Rapports';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'analytics-dashboards':
        return 'Tableaux de bord avancés pour une analyse approfondie des données';
      case 'analysis':
        return 'Outils d\'analyse avancés pour examiner les tendances et les métriques';
      case 'reports':
        return 'Générez des rapports détaillés sur l\'utilisation et les performances';
      case 'assisted-writing':
        return 'Outils d\'aide à la rédaction de documents juridiques';
      default:
        return 'Outils d\'analyse et de reporting pour optimiser vos processus juridiques';
    }
  };

  const getSectionIcon = () => {
    switch (section) {
      case 'analytics-dashboards':
        return BarChart3;
      case 'analysis':
        return TrendingUp;
      case 'reports':
        return FileText;
      default:
        return BarChart3;
    }
  };

  const dashboardStats = [
    { label: "Tableaux actifs", value: "24", icon: BarChart3, color: "text-blue-600" },
    { label: "Rapports générés", value: "156", icon: FileText, color: "text-green-600" },
    { label: "Analyses en cours", value: "8", icon: Activity, color: "text-purple-600" },
    { label: "Utilisateurs actifs", value: "47", icon: Users, color: "text-orange-600" }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Rapport mensuel d'activité - Décembre 2024",
      type: "Activité",
      generated: "Il y a 2 heures",
      size: "2.4 MB",
      status: "Terminé",
      downloads: 23
    },
    {
      id: 2,
      title: "Analyse des tendances législatives Q4 2024",
      type: "Analyse",
      generated: "Il y a 1 jour",
      size: "5.1 MB",
      status: "Terminé",
      downloads: 67
    },
    {
      id: 3,
      title: "Performance des recherches - Novembre 2024",
      type: "Performance",
      generated: "Il y a 3 jours",
      size: "1.8 MB",
      status: "En cours",
      downloads: 0
    }
  ];

  const renderAnalytics = () => (
    <AnalyticsDashboardsSection language={language} />
  );

  const renderAnalysis = () => (
    <Tabs defaultValue="advanced" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="advanced">Analyses avancées</TabsTrigger>
        <TabsTrigger value="insights">Insights IA et Recommandations</TabsTrigger>
        <TabsTrigger value="usage">Métriques d'utilisation</TabsTrigger>
        <TabsTrigger value="trends">Tendances</TabsTrigger>
        <TabsTrigger value="knowledge-graph">Graphe de Connaissance</TabsTrigger>
      </TabsList>

      <TabsContent value="advanced">
        <Tabs defaultValue="dependencies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dependencies">Dépendances & Conflits</TabsTrigger>
            <TabsTrigger value="procedures">Analyses des procédures</TabsTrigger>
            <TabsTrigger value="comparative">Analyse Comparative</TabsTrigger>
            <TabsTrigger value="performance">Analyse de Performance</TabsTrigger>
            <TabsTrigger value="predictive">Analyse prédictive</TabsTrigger>
            <TabsTrigger value="analytics-ai">Analytics IA</TabsTrigger>
          </TabsList>

          <TabsContent value="dependencies">
            <DependenciesConflictsAnalysis />
          </TabsContent>

          <TabsContent value="procedures">
            <ProcedureAnalysisTab />
          </TabsContent>

          <TabsContent value="comparative">
            <Tabs defaultValue="document-comparison" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="document-comparison">Comparaison des documents</TabsTrigger>
                <TabsTrigger value="temporal-analysis">Analyse Comparative Temporelle</TabsTrigger>
              </TabsList>

              <TabsContent value="document-comparison">
                <DocumentComparison />
              </TabsContent>

              <TabsContent value="temporal-analysis">
                <ComparativeAnalysis />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceAnalysis />
          </TabsContent>

          <TabsContent value="predictive">
            <PredictiveAnalysisAdvanced />
          </TabsContent>

          <TabsContent value="analytics-ai">
            <AIAnalyticsAdvanced />
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="insights">
        <AIInsights />
      </TabsContent>

      <TabsContent value="usage">
        <DocumentUsageMetrics />
      </TabsContent>

      <TabsContent value="trends">
        <TrendsAnalysis />
      </TabsContent>

      <TabsContent value="knowledge-graph">
        <KnowledgeGraph />
      </TabsContent>
    </Tabs>
  );

  const renderReports = () => (
    <Tabs defaultValue="custom" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="custom">Génération de Rapport Personnalisé</TabsTrigger>
        <TabsTrigger value="templates">Modèles de Rapports Prédéfinis</TabsTrigger>
        <TabsTrigger value="legislative-impact">Impact Législatif</TabsTrigger>
        <TabsTrigger value="trends">Analyse des tendances</TabsTrigger>
      </TabsList>

      <TabsContent value="custom">
        <CustomReportGeneration />
      </TabsContent>

      <TabsContent value="templates">
        <PredefinedTemplates />
      </TabsContent>

      <TabsContent value="legislative-impact">
        <LegislativeImpactReports />
      </TabsContent>

      <TabsContent value="trends">
        <SearchTrendsAnalysis />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={getSectionIcon()}
        title={getSectionTitle()}
        description={getSectionDescription()}
      />

      {section === 'analytics-dashboards' && renderAnalytics()}
      {section === 'analysis' && renderAnalysis()}
      {section === 'reports' && renderReports()}
    </div>
  );
}

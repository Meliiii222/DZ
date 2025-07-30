import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Calendar,
  Users,
  Target,
  Zap
} from 'lucide-react';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface AnalyticsData {
  totalDocuments: number;
  processedToday: number;
  averageConfidence: number;
  averageProcessingTime: number;
  documentTypes: { type: string; count: number; percentage: number }[];
  dailyStats: { date: string; processed: number; approved: number; rejected: number }[];
  qualityMetrics: { range: string; count: number; percentage: number }[];
  userActivity: { user: string; processed: number; approved: number; avgTime: number }[];
  errorAnalysis: { error: string; count: number; percentage: number }[];
}

const OCRAnalyticsComponent: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  // Pagination pour l'activité utilisateur
  const {
    currentData: paginatedUserActivity,
    currentPage: userPage,
    totalPages: userTotalPages,
    itemsPerPage: userItemsPerPage,
    totalItems: userTotalItems,
    setCurrentPage: setUserPage,
    setItemsPerPage: setUserItemsPerPage
  } = usePagination({
    data: analyticsData?.userActivity || [],
    itemsPerPage: 5
  });

  // Pagination pour l'analyse d'erreurs
  const {
    currentData: paginatedErrorAnalysis,
    currentPage: errorPage,
    totalPages: errorTotalPages,
    itemsPerPage: errorItemsPerPage,
    totalItems: errorTotalItems,
    setCurrentPage: setErrorPage,
    setItemsPerPage: setErrorItemsPerPage
  } = usePagination({
    data: analyticsData?.errorAnalysis || [],
    itemsPerPage: 5
  });

  useEffect(() => {
    // Simulation de données analytics
    const mockData: AnalyticsData = {
      totalDocuments: 2847,
      processedToday: 156,
      averageConfidence: 91.3,
      averageProcessingTime: 2.4,
      documentTypes: [
        { type: 'Décret Exécutif', count: 1203, percentage: 42.3 },
        { type: 'Arrêté', count: 892, percentage: 31.3 },
        { type: 'Loi', count: 456, percentage: 16.0 },
        { type: 'Ordonnance', count: 296, percentage: 10.4 }
      ],
      dailyStats: [
        { date: '2024-02-01', processed: 145, approved: 132, rejected: 8 },
        { date: '2024-02-02', processed: 167, approved: 156, rejected: 6 },
        { date: '2024-02-03', processed: 134, approved: 128, rejected: 4 },
        { date: '2024-02-04', processed: 189, approved: 175, rejected: 9 },
        { date: '2024-02-05', processed: 156, approved: 148, rejected: 5 },
        { date: '2024-02-06', processed: 178, approved: 169, rejected: 7 },
        { date: '2024-02-07', processed: 156, approved: 145, rejected: 6 }
      ],
      qualityMetrics: [
        { range: '95-100%', count: 1425, percentage: 50.1 },
        { range: '90-95%', count: 853, percentage: 30.0 },
        { range: '85-90%', count: 398, percentage: 14.0 },
        { range: '80-85%', count: 142, percentage: 5.0 },
        { range: '<80%', count: 29, percentage: 1.0 }
      ],
      userActivity: [
        { user: 'Dr. Ahmed Benali', processed: 342, approved: 325, avgTime: 1.8 },
        { user: 'Prof. Fatima Zohra', processed: 298, approved: 289, avgTime: 2.1 },
        { user: 'Dr. Karim Mansouri', processed: 256, approved: 240, avgTime: 2.7 },
        { user: 'Me. Sarah Belkacem', processed: 189, approved: 178, avgTime: 2.3 }
      ],
      errorAnalysis: [
        { error: 'Qualité PDF insuffisante', count: 45, percentage: 38.5 },
        { error: 'Document non juridique', count: 28, percentage: 23.9 },
        { error: 'Langue non supportée', count: 22, percentage: 18.8 },
        { error: 'Format non standard', count: 15, percentage: 12.8 },
        { error: 'Fichier corrompu', count: 7, percentage: 6.0 }
      ]
    };

    setAnalyticsData(mockData);
  }, [selectedPeriod]);

  const generateReport = () => {
    if (!analyticsData) return;

    const reportData = {
      reportId: `OCR_REPORT_${Date.now()}`,
      generatedAt: new Date().toISOString(),
      period: selectedPeriod,
      summary: {
        totalDocuments: analyticsData.totalDocuments,
        averageConfidence: analyticsData.averageConfidence,
        averageProcessingTime: analyticsData.averageProcessingTime,
        dailyAverage: Math.round(analyticsData.totalDocuments / 30)
      },
      details: analyticsData
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_ocr_${selectedPeriod}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="📊 Analytics et Rapports"
          description="Analyse des performances et statistiques du système OCR"
          icon={BarChart3}
          iconColor="text-purple-600"
        />
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d' && '7 jours'}
                {period === '30d' && '30 jours'}
                {period === '90d' && '90 jours'}
              </Button>
            ))}
          </div>
          <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Rapport
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents Totaux</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalDocuments.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{analyticsData.processedToday} aujourd'hui</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confiance Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.averageConfidence}%</p>
              <p className="text-xs text-green-600">+2.3% ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Temps Moyen</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.averageProcessingTime}s</p>
              <p className="text-xs text-green-600">-0.3s ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux d'Approbation</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-xs text-green-600">+1.8% ce mois</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="quality">Qualité</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="errors">Erreurs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Activité des 7 derniers jours
              </h3>
              <div className="space-y-3">
                {analyticsData.dailyStats.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {new Date(day.date).toLocaleDateString('fr-FR', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600">{day.processed} traités</span>
                      <span className="text-green-600">{day.approved} approuvés</span>
                      <span className="text-red-600">{day.rejected} rejetés</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Document Types */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Répartition par Type</h3>
              <div className="space-y-4">
                {analyticsData.documentTypes.map((type, index) => (
                  <div key={type.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{type.type}</span>
                      <span className="text-sm text-gray-600">
                        {type.count} ({type.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Types de Documents Traités</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analyticsData.documentTypes.map((type) => (
                <Card key={type.type} className="p-4 bg-gray-50">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{type.count}</p>
                    <p className="text-sm text-gray-600">{type.type}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      {type.percentage}%
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribution de la Qualité OCR</h3>
            <div className="space-y-4">
              {analyticsData.qualityMetrics.map((metric) => (
                <div key={metric.range} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Confiance {metric.range}</span>
                      {metric.range === '95-100%' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {metric.range === '<80%' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    </div>
                    <span className="text-sm text-gray-600">
                      {metric.count} documents ({metric.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        metric.range === '95-100%' ? 'bg-green-600' :
                        metric.range === '90-95%' ? 'bg-blue-600' :
                        metric.range === '85-90%' ? 'bg-yellow-600' :
                        metric.range === '80-85%' ? 'bg-orange-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Activité utilisateur avec pagination */}
        <TabsContent value="users" className="space-y-4">
          <div className="space-y-4">
            {paginatedUserActivity.map((user, index) => (
              <Card key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{user.user}</p>
                    <p className="text-sm text-gray-600">
                      {user.processed} traités • {user.approved} approuvés
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Taux: {((user.approved / user.processed) * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-600">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {user.avgTime}s moy.
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={userPage}
              totalPages={userTotalPages}
              totalItems={userTotalItems}
              itemsPerPage={userItemsPerPage}
              onPageChange={setUserPage}
              onItemsPerPageChange={setUserItemsPerPage}
            />
          </div>
        </TabsContent>

        {/* Analyse d'erreurs avec pagination */}
        <TabsContent value="errors" className="space-y-4">
          <div className="space-y-4">
            {paginatedErrorAnalysis.map((error, index) => (
              <Card key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{error.error}</span>
                  <span className="text-sm text-gray-600">
                    {error.count} occurrences ({error.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${error.percentage}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={errorPage}
              totalPages={errorTotalPages}
              totalItems={errorTotalItems}
              itemsPerPage={errorItemsPerPage}
              onPageChange={setErrorPage}
              onItemsPerPageChange={setErrorItemsPerPage}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OCRAnalyticsComponent;
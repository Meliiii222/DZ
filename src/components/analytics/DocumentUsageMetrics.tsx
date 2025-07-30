
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  FileText, 
  Eye, 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Search,
  BarChart3,
  Users,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

export function DocumentUsageMetrics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const topDocuments = [
    {
      id: 1,
      title: "Code du travail - Article 87-95",
      type: "Texte juridique",
      views: 1247,
      downloads: 89,
      shares: 23,
      trend: "up",
      changePercent: 15,
      lastAccessed: "Il y a 2 heures",
      category: "Droit du travail"
    },
    {
      id: 2,
      title: "Loi de finances 2025",
      type: "Loi",
      views: 1156,
      downloads: 156,
      shares: 45,
      trend: "up",
      changePercent: 32,
      lastAccessed: "Il y a 1 heure",
      category: "Finances publiques"
    },
    {
      id: 3,
      title: "Décret d'application - Procédures administratives",
      type: "Décret",
      views: 892,
      downloads: 67,
      shares: 12,
      trend: "down",
      changePercent: -8,
      lastAccessed: "Il y a 4 heures",
      category: "Droit administratif"
    },
    {
      id: 4,
      title: "Circulaire ministérielle - Environnement",
      type: "Circulaire",
      views: 734,
      downloads: 34,
      shares: 8,
      trend: "up",
      changePercent: 22,
      lastAccessed: "Il y a 6 heures",
      category: "Droit environnemental"
    }
  ];

  const usageStats = [
    { label: "Vues totales", value: "45,234", change: "+12%", icon: Eye, color: "text-blue-600" },
    { label: "Téléchargements", value: "8,967", change: "+8%", icon: Download, color: "text-green-600" },
    { label: "Partages", value: "1,234", change: "+25%", icon: Share2, color: "text-purple-600" },
    { label: "Documents actifs", value: "567", change: "+3%", icon: FileText, color: "text-orange-600" }
  ];

  const userEngagement = [
    {
      metric: "Temps moyen de lecture",
      value: "4m 32s",
      change: "+15%",
      trend: "up"
    },
    {
      metric: "Taux de rebond",
      value: "23%",
      change: "-8%",
      trend: "down"
    },
    {
      metric: "Pages par session",
      value: "3.2",
      change: "+12%",
      trend: "up"
    },
    {
      metric: "Utilisateurs récurrents",
      value: "78%",
      change: "+5%",
      trend: "up"
    }
  ];

  // Pagination pour l'activité récente (topDocuments)
  const {
    currentData: paginatedRecentActivity,
    currentPage: recentActivityCurrentPage,
    totalPages: recentActivityTotalPages,
    itemsPerPage: recentActivityItemsPerPage,
    totalItems: recentActivityTotalItems,
    setCurrentPage: setRecentActivityCurrentPage,
    setItemsPerPage: setRecentActivityItemsPerPage
  } = usePagination({
    data: topDocuments,
    itemsPerPage: 5
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Métriques d'Utilisation des Documents</h3>
          <p className="text-gray-600">Analysez l'utilisation et l'engagement avec vos documents</p>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="top-documents">Top Documents</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {usageStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedRecentActivity.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="font-medium text-sm">{doc.title}</div>
                          <div className="text-xs text-gray-500">{doc.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{doc.views} vues</div>
                        <div className="text-xs text-gray-500">{doc.lastAccessed}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination pour l'activité récente */}
                <div className="mt-4">
                  <Pagination
                    currentPage={recentActivityCurrentPage}
                    totalPages={recentActivityTotalPages}
                    totalItems={recentActivityTotalItems}
                    itemsPerPage={recentActivityItemsPerPage}
                    onPageChange={setRecentActivityCurrentPage}
                    onItemsPerPageChange={setRecentActivityItemsPerPage}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userEngagement.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.value}</span>
                        <div className={`flex items-center gap-1 text-xs ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="top-documents" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des documents..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {topDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-semibold">{doc.title}</h3>
                        <Badge variant="outline">{doc.type}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{doc.category}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold">{doc.views.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-500">Vues</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Download className="w-4 h-4 text-green-600" />
                            <span className="font-semibold">{doc.downloads}</span>
                          </div>
                          <div className="text-xs text-gray-500">Téléchargements</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Share2 className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold">{doc.shares}</span>
                          </div>
                          <div className="text-xs text-gray-500">Partages</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-sm ${
                        doc.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {doc.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {doc.changePercent > 0 ? '+' : ''}{doc.changePercent}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">vs période précédente</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métriques d'Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userEngagement.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.metric}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          {item.change}
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité par Heure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { heure: "08h", activite: 45 },
                      { heure: "09h", activite: 78 },
                      { heure: "10h", activite: 123 },
                      { heure: "11h", activite: 156 },
                      { heure: "14h", activite: 189 },
                      { heure: "15h", activite: 145 },
                      { heure: "16h", activite: 98 },
                      { heure: "17h", activite: 67 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="heure" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="activite" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendances d'Utilisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { mois: "Jan", vues: 2340, telechargements: 456 },
                    { mois: "Fév", vues: 2890, telechargements: 523 },
                    { mois: "Mar", vues: 3456, telechargements: 678 },
                    { mois: "Avr", vues: 3123, telechargements: 612 },
                    { mois: "Mai", vues: 4567, telechargements: 789 },
                    { mois: "Jun", vues: 4234, telechargements: 734 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vues" stroke="#3b82f6" strokeWidth={2} name="Vues" />
                    <Line type="monotone" dataKey="telechargements" stroke="#10b981" strokeWidth={2} name="Téléchargements" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

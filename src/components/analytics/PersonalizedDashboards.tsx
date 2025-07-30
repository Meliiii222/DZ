import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { NewDashboardModal } from '@/components/modals/NewDashboardModal';
import { 
  Plus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp,
  Users,
  FileText,
  Search,
  Star,
  Activity,
  Calendar,
  Filter,
  Download,
  Share2
} from 'lucide-react';

export function PersonalizedDashboards() {
  const [isNewDashboardModalOpen, setIsNewDashboardModalOpen] = useState(false);

  const [dashboards, setDashboards] = useState([
    {
      id: 1,
      name: "Mon Tableau de Bord Principal",
      description: "Vue d'ensemble de mes activités juridiques quotidiennes",
      widgets: ["Recherches récentes", "Documents favoris", "Notifications", "Activité hebdomadaire"],
      isDefault: true,
      lastModified: "Il y a 2 heures",
      views: 156
    },
    {
      id: 2,
      name: "Suivi Législatif",
      description: "Monitoring des nouvelles lois et réglementations",
      widgets: ["Nouveaux textes", "Modifications récentes", "Échéances importantes", "Tendances"],
      isDefault: false,
      lastModified: "Il y a 1 jour",
      views: 89
    },
    {
      id: 3,
      name: "Performance Équipe",
      description: "Statistiques d'utilisation de l'équipe juridique",
      widgets: ["Utilisateurs actifs", "Documents consultés", "Recherches populaires", "Collaboration"],
      isDefault: false,
      lastModified: "Il y a 3 jours",
      views: 67
    },
    {
      id: 4,
      name: "Analyse de Conformité",
      description: "Suivi des obligations réglementaires",
      widgets: ["Conformité RGPD", "Audits", "Risques", "Rapports"],
      isDefault: false,
      lastModified: "Il y a 5 jours",
      views: 45
    },
    {
      id: 5,
      name: "Veille Juridique",
      description: "Surveillance des évolutions juridiques",
      widgets: ["Alertes", "Jurisprudence", "Réformes", "Actualités"],
      isDefault: false,
      lastModified: "Il y a 1 semaine",
      views: 78
    },
    {
      id: 6,
      name: "Gestion des Procédures",
      description: "Suivi des procédures administratives",
      widgets: ["Procédures en cours", "Échéances", "Statuts", "Documents"],
      isDefault: false,
      lastModified: "Il y a 2 jours",
      views: 92
    },
    {
      id: 7,
      name: "Analyse des Tendances",
      description: "Évolution des pratiques juridiques",
      widgets: ["Tendances", "Graphiques", "Comparaisons", "Prédictions"],
      isDefault: false,
      lastModified: "Il y a 4 jours",
      views: 34
    },
    {
      id: 8,
      name: "Collaboration Équipe",
      description: "Activités collaboratives de l'équipe",
      widgets: ["Projets", "Tâches", "Communication", "Partage"],
      isDefault: false,
      lastModified: "Il y a 3 jours",
      views: 56
    },
    {
      id: 9,
      name: "Intelligence Concurrentielle",
      description: "Analyse de la concurrence juridique",
      widgets: ["Concurrence", "Marché", "Benchmarks", "Stratégies"],
      isDefault: false,
      lastModified: "Il y a 1 semaine",
      views: 23
    },
    {
      id: 10,
      name: "Évaluation d'Impact",
      description: "Impact des changements législatifs",
      widgets: ["Impact", "Analyse", "Risques", "Opportunités"],
      isDefault: false,
      lastModified: "Il y a 2 semaines",
      views: 41
    },
    {
      id: 11,
      name: "Gestion des Documents",
      description: "Organisation et suivi des documents",
      widgets: ["Documents", "Archives", "Versions", "Métadonnées"],
      isDefault: false,
      lastModified: "Il y a 1 jour",
      views: 67
    },
    {
      id: 12,
      name: "Reporting Exécutif",
      description: "Rapports pour la direction",
      widgets: ["KPIs", "Métriques", "Rapports", "Présentations"],
      isDefault: false,
      lastModified: "Il y a 3 jours",
      views: 29
    }
  ]);

  const availableWidgets = [
    { id: 'searches', name: 'Recherches récentes', icon: Search, category: 'Activité' },
    { id: 'documents', name: 'Documents favoris', icon: FileText, category: 'Contenu' },
    { id: 'notifications', name: 'Notifications', icon: Activity, category: 'Système' },
    { id: 'trends', name: 'Tendances', icon: TrendingUp, category: 'Analyse' },
    { id: 'users', name: 'Utilisateurs actifs', icon: Users, category: 'Utilisateurs' },
    { id: 'calendar', name: 'Calendrier', icon: Calendar, category: 'Planification' },
    { id: 'charts', name: 'Graphiques', icon: BarChart3, category: 'Visualisation' }
  ];

  // Pagination pour les tableaux de bord personnalisés
  const {
    currentData: paginatedDashboards,
    currentPage: dashboardsCurrentPage,
    totalPages: dashboardsTotalPages,
    itemsPerPage: dashboardsItemsPerPage,
    totalItems: dashboardsTotalItems,
    setCurrentPage: setDashboardsCurrentPage,
    setItemsPerPage: setDashboardsItemsPerPage
  } = usePagination({
    data: dashboards,
    itemsPerPage: 10
  });

  // Pagination pour les widgets disponibles
  const {
    currentData: paginatedWidgets,
    currentPage: widgetsCurrentPage,
    totalPages: widgetsTotalPages,
    itemsPerPage: widgetsItemsPerPage,
    totalItems: widgetsTotalItems,
    setCurrentPage: setWidgetsCurrentPage,
    setItemsPerPage: setWidgetsItemsPerPage
  } = usePagination({
    data: availableWidgets,
    itemsPerPage: 10
  });

  // Tableaux de bord disponibles transformés en format de cards
  const availableDashboards = [
    {
      id: 'available-2',
      name: "Statistiques d'Usage",
      description: "Métriques d'utilisation",
      widgets: ["Métriques d'usage", "Statistiques utilisateurs", "Performances", "Rapports"],
      isDefault: false,
      lastModified: "Modèle disponible",
      views: "---",
      icon: PieChart,
      iconColor: "text-green-600"
    },
    {
      id: 'available-3',
      name: "Tendances Temporelles",
      description: "Évolution dans le temps",
      widgets: ["Tendances temporelles", "Évolution", "Graphiques", "Historique"],
      isDefault: false,
      lastModified: "Modèle disponible",
      views: "---",
      icon: LineChart,
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Tableaux de Bord Personnalisés</h3>
          <p className="text-gray-600">Créez et gérez vos tableaux de bord personnalisés</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsNewDashboardModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Tableau de Bord
        </Button>
      </div>

      <Tabs defaultValue="my-dashboards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-dashboards">Mes Tableaux de Bord</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="shared">Partagés</TabsTrigger>
        </TabsList>

        <TabsContent value="my-dashboards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mon Tableau de Bord Principal en premier */}
            {paginatedDashboards.map((dashboard) => (
              <Card key={dashboard.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                        {dashboard.name}
                        {dashboard.isDefault && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{dashboard.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Widgets ({dashboard.widgets.length})</div>
                      <div className="flex flex-wrap gap-1">
                        {dashboard.widgets.map((widget, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {widget}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Modifié :</span>
                        <div className="font-medium">{dashboard.lastModified}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Vues :</span>
                        <div className="font-medium">{dashboard.views}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Puis les tableaux de bord disponibles (Statistiques d'Usage, etc.) */}
            {availableDashboards.map((dashboard) => (
              <Card key={dashboard.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <dashboard.icon className={`w-5 h-5 ${dashboard.iconColor}`} />
                        {dashboard.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{dashboard.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Widgets ({dashboard.widgets.length})</div>
                      <div className="flex flex-wrap gap-1">
                        {dashboard.widgets.map((widget, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {widget}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Status :</span>
                        <div className="font-medium">{dashboard.lastModified}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Vues :</span>
                        <div className="font-medium">{dashboard.views}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Ouvrir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les tableaux de bord personnalisés */}
          <Pagination
            currentPage={dashboardsCurrentPage}
            totalPages={dashboardsTotalPages}
            totalItems={dashboardsTotalItems}
            itemsPerPage={dashboardsItemsPerPage}
            onPageChange={setDashboardsCurrentPage}
            onItemsPerPageChange={setDashboardsItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-dashed border-2 hover:border-emerald-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2">Tableau de Bord Juridique</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Modèle complet pour le suivi des activités juridiques
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 hover:border-emerald-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <PieChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2">Analyse de Performance</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Suivi des métriques et KPIs de votre équipe
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 hover:border-emerald-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <LineChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2">Tendances Législatives</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Monitoring des évolutions réglementaires
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Utiliser ce modèle
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <div className="text-center py-12">
            <Share2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Aucun tableau de bord partagé</h3>
            <p className="text-gray-600 mb-4">
              Les tableaux de bord partagés par vos collègues apparaîtront ici
            </p>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Demander l'accès
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Nouveau Tableau de Bord */}
      <NewDashboardModal
        isOpen={isNewDashboardModalOpen}
        onClose={() => setIsNewDashboardModalOpen(false)}
      />
    </div>
  );
}

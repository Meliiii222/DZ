
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

export function AlertsOverview() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Nouveau décret fiscal',
      description: 'Décret n°2024-001 modifiant les taux d\'imposition',
      date: '2024-01-15',
      status: 'new',
      domain: 'Droit fiscal'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Modification réglementaire',
      description: 'Arrêté modifiant les conditions d\'exercice professionnel',
      date: '2024-01-14',
      status: 'processed',
      domain: 'Droit du travail'
    },
    {
      id: 3,
      type: 'info',
      title: 'Jurisprudence importante',
      description: 'Cour de cassation - Arrêt du 12 janvier 2024',
      date: '2024-01-12',
      status: 'archived',
      domain: 'Droit civil'
    },
    {
      id: 4,
      type: 'critical',
      title: 'Échéance réglementaire',
      description: 'Date limite d\'application: 31 janvier 2024',
      date: '2024-01-10',
      status: 'pending',
      domain: 'Droit commercial'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">Nouveau</Badge>;
      case 'processed':
        return <Badge variant="default">Traité</Badge>;
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'archived':
        return <Badge variant="outline">Archivé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const alertStats = [
    { label: 'Nouvelles alertes', value: 12, color: 'text-red-600' },
    { label: 'En traitement', value: 8, color: 'text-orange-600' },
    { label: 'Traitées', value: 45, color: 'text-green-600' },
    { label: 'Total ce mois', value: 65, color: 'text-blue-600' }
  ];

  // Pagination pour les alertes
  const {
    currentData: paginatedAlerts,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: alerts,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-6">
      {/* Statistiques des alertes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {alertStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste des alertes récentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" />
              Alertes Récentes
            </CardTitle>
            <Button variant="outline" size="sm">
              Voir toutes les alertes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold truncate">{alert.title}</h4>
                    {getStatusBadge(alert.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{alert.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {alert.domain}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

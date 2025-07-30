
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Eye, 
  Share2,
  AlertTriangle
} from 'lucide-react';

export function CollaborativeSurveillanceTab() {
  const surveillanceItems = [
    {
      id: 1,
      domain: "Droit fiscal",
      assignedTo: "Équipe Fiscalité",
      alerts: 3,
      lastUpdate: "Hier",
      priority: "Haute",
      sources: ["Journal Officiel", "Circulaires DGI", "Jurisprudence"]
    },
    {
      id: 2,
      domain: "Droit du travail",
      assignedTo: "Cabinet Social",
      alerts: 1,
      lastUpdate: "Il y a 2 jours",
      priority: "Moyenne",
      sources: ["Code du travail", "Conventions collectives"]
    }
  ];

  // Pagination pour les éléments de surveillance
  const {
    currentData: paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: surveillanceItems,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{item.domain}</CardTitle>
                <Badge className={
                  item.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                  item.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {item.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Assigné à :</span>
                  <div className="font-medium">{item.assignedTo}</div>
                </div>
                <div>
                  <span className="text-gray-500">Alertes :</span>
                  <div className="font-medium flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    {item.alerts}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Sources surveillées :</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.sources.map((source, index) => (
                    <Badge key={index} variant="outline">{source}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Dernière mise à jour : {item.lastUpdate}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir alertes
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Déléguer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
}

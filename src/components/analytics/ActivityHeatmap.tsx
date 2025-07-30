
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Activity } from 'lucide-react';

interface ActivityHeatmapProps {
  period: string;
}

export function ActivityHeatmap({ period }: ActivityHeatmapProps) {
  // Génération de données simulées pour la heatmap
  const generateHeatmapData = () => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return days.map(day => ({
      day,
      hours: hours.map(hour => ({
        hour,
        value: Math.floor(Math.random() * 100)
      }))
    }));
  };

  const heatmapData = generateHeatmapData();

  const getColorIntensity = (value: number) => {
    if (value < 20) return 'bg-blue-100';
    if (value < 40) return 'bg-blue-200';
    if (value < 60) return 'bg-blue-300';
    if (value < 80) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const topActivities = [
    { action: 'Consultation de textes', count: 1247, percentage: 35 },
    { action: 'Recherche avancée', count: 892, percentage: 25 },
    { action: 'Téléchargements', count: 654, percentage: 18 },
    { action: 'Création d\'alertes', count: 423, percentage: 12 },
    { action: 'Partage de documents', count: 356, percentage: 10 }
  ];

  // Pagination pour les activités
  const {
    currentData: paginatedActivities,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: topActivities,
    itemsPerPage: 3
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Carte de Chaleur d'Activité
          </CardTitle>
          <p className="text-sm text-gray-600">
            Visualisation des heures de pointe d'utilisation par jour de la semaine
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Légende des heures */}
            <div className="flex justify-between text-xs text-gray-500 px-12">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>
            
            {/* Heatmap */}
            <div className="space-y-1">
              {heatmapData.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex items-center gap-2">
                  <div className="w-10 text-xs text-gray-600 text-right">
                    {dayData.day}
                  </div>
                  <div className="flex gap-1">
                    {dayData.hours.map((hourData, hourIndex) => (
                      <div
                        key={hourIndex}
                        className={`w-3 h-3 rounded-sm ${getColorIntensity(hourData.value)}`}
                        title={`${dayData.day} ${hourData.hour}h: ${hourData.value} activités`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Légende de couleur */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>Moins</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              </div>
              <span>Plus</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top des Activités</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{activity.action}</span>
                    <span className="text-sm text-gray-600">{activity.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                </div>
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

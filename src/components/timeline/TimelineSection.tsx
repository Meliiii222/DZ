// @ts-nocheck
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Download,
  Search,
  Filter,
  FileText,
  Scale
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'loi' | 'décret' | 'arrêté' | 'circulaire';
  category: string;
  impact: 'majeur' | 'moyen' | 'mineur';
}

export function TimelineSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      date: "2024-01-15",
      title: "Loi sur la protection des données personnelles",
      description: "Adoption de la nouvelle loi sur la protection des données personnelles",
      type: "loi",
      category: "Numérique",
      impact: "majeur"
    },
    {
      id: 2,
      date: "2024-01-10",
      title: "Décret d'application du Code du travail",
      description: "Publication du décret d'application des nouvelles dispositions",
      type: "décret",
      category: "Travail",
      impact: "moyen"
    },
    {
      id: 3,
      date: "2024-01-05",
      title: "Arrêté sur les procédures administratives",
      description: "Simplification des procédures administratives",
      type: "arrêté",
      category: "Administration",
      impact: "mineur"
    }
  ];

  const years = ['2024', '2023', '2022', '2021'];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = event.date.startsWith(selectedYear);
    return matchesSearch && matchesYear;
  });

  // Pagination pour les événements de timeline
  const {
    currentData: paginatedEvents,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredEvents,
    itemsPerPage: 8
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'majeur': return 'bg-red-100 text-red-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'mineur': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'loi': return <Scale className="w-4 h-4" />;
      case 'décret': return <FileText className="w-4 h-4" />;
      case 'arrêté': return <FileText className="w-4 h-4" />;
      case 'circulaire': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timeline Juridique</h1>
          <p className="text-muted-foreground mt-2">
            Chronologie des évolutions législatives et réglementaires
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
                      onClick={() => {
              import('@/utils/modalManager').then(({ openTimelineExportModal }) => {
                openTimelineExportModal();
              });
            }}
        >
          <Download className="w-4 h-4" />
          Exporter
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher dans la timeline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <Button 
          variant="outline"
                      onClick={() => {
              import('@/utils/modalManager').then(({ openAdvancedFiltersModal }) => {
                openAdvancedFiltersModal('Timeline');
              });
            }}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Timeline des événements avec pagination */}
      <div className="space-y-4">
        {paginatedEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(event.type)}
                    <Badge variant="outline" className="capitalize">
                      {event.type}
                    </Badge>
                    <Badge className={getImpactColor(event.impact)}>
                      Impact {event.impact}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString('fr-FR')}
                  </span>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={buttonHandlers.viewTimelineItem(event.id.toString(), event.title)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Consulter
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={buttonHandlers.downloadDocument(event.id.toString(), event.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
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

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.compareVersions('Comparer périodes', 'Comparaison de périodes')}
            >
              <Scale className="w-5 h-5" />
              Comparer les périodes
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openStatisticsModal }) => {
                openStatisticsModal('Timeline');
              });
            }}
            >
              <Calendar className="w-5 h-5" />
              Voir les statistiques
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openAlertsConfigModal }) => {
                openAlertsConfigModal();
              });
            }}
            >
              <Clock className="w-5 h-5" />
              Alertes de changements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
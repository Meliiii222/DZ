
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  Eye, 
  Share2, 
  Plus, 
  Users,
  BookOpen,
  Zap
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

export function KnowledgeGraphsTab() {
  const [contributeOpen, setContributeOpen] = useState(false);

  const knowledgeGraphs = [
    {
      id: 1,
      title: "Droit des contrats - Relations conceptuelles",
      description: "Graphe des concepts liés au droit des contrats algérien",
      nodes: 45,
      connections: 78,
      contributors: 8,
      category: "Droit civil"
    },
    {
      id: 2,
      title: "Procédures administratives - Workflow",
      description: "Cartographie des procédures et leurs interdépendances",
      nodes: 32,
      connections: 56,
      contributors: 12,
      category: "Droit administratif"
    }
  ];

  // Pagination pour les graphes de connaissances
  const {
    currentData: paginatedGraphs,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: knowledgeGraphs,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Graphes de Connaissances</h2>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setContributeOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Contribuer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedGraphs.map((graph) => (
          <Card key={graph.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{graph.title}</CardTitle>
                <Badge variant="outline">{graph.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{graph.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{graph.nodes}</div>
                  <div className="text-xs text-gray-500">Nœuds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{graph.connections}</div>
                  <div className="text-xs text-gray-500">Connexions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{graph.contributors}</div>
                  <div className="text-xs text-gray-500">Contributeurs</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={buttonHandlers.viewDocument(graph.id.toString(), graph.title, 'graphe')}
                >
                  <Network className="w-4 h-4 mr-2" />
                  Explorer
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={buttonHandlers.shareDocument(graph.id.toString(), graph.title)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Créer graphe', 'Nouveau graphe de connaissances', 'Graphes')}
            >
              <Plus className="w-6 h-6" />
              Créer un graphe
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Importer données', 'Import de données externes', 'Graphes')}
            >
              <BookOpen className="w-6 h-6" />
              Importer des données
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Analyse IA', 'Analyse automatique par IA', 'Graphes')}
            >
              <Zap className="w-6 h-6" />
              Analyse IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

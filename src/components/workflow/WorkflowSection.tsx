import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Users,
  Settings,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

interface WorkflowItem {
  id: number;
  name: string;
  status: 'en_cours' | 'en_attente' | 'terminé' | 'échoué';
  progress: number;
  assignee: string;
  dueDate: string;
  description: string;
  priority: 'haute' | 'moyenne' | 'basse';
}

export function WorkflowSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('tous');

  const workflows: WorkflowItem[] = [
    {
      id: 1,
      name: "Validation juridique - Contrat commercial",
      status: "en_cours",
      progress: 65,
      assignee: "Dr. Ahmed Benali",
      dueDate: "2024-01-20",
      description: "Révision et validation du contrat commercial avec la société XYZ",
      priority: "haute"
    },
    {
      id: 2,
      name: "Analyse réglementaire - Nouveau décret",
      status: "en_attente",
      progress: 30,
      assignee: "Prof. Fatima Zerrouki",
      dueDate: "2024-01-25",
      description: "Analyse d'impact du nouveau décret sur les entreprises",
      priority: "moyenne"
    },
    {
      id: 3,
      name: "Rédaction procédure administrative",
      status: "terminé",
      progress: 100,
      assignee: "Me. Karim Mansouri",
      dueDate: "2024-01-15",
      description: "Rédaction de la nouvelle procédure administrative",
      priority: "basse"
    }
  ];

  const statuses = ['tous', 'en_cours', 'en_attente', 'terminé', 'échoué'];

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'tous' || workflow.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination pour les workflows
  const {
    currentData: paginatedWorkflows,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredWorkflows,
    itemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'terminé': return 'bg-green-100 text-green-800';
      case 'échoué': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_cours': return <Play className="w-4 h-4" />;
      case 'en_attente': return <Pause className="w-4 h-4" />;
      case 'terminé': return <CheckCircle className="w-4 h-4" />;
      case 'échoué': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Workflows</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et suivez vos processus juridiques et administratifs
          </p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={buttonHandlers.generic('Nouveau workflow', 'Création d\'un nouveau workflow', 'Workflow')}
        >
          <Plus className="w-4 h-4" />
          Nouveau workflow
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Rechercher un workflow..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {statuses.map(status => (
            <option key={status} value={status} className="capitalize">
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des workflows avec pagination */}
      <div className="space-y-4">
        {paginatedWorkflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(workflow.status)}
                  <Badge className={getStatusColor(workflow.status)}>
                    {workflow.status.replace('_', ' ')}
                  </Badge>
                </div>
                <Badge className={getPriorityColor(workflow.priority)}>
                  {workflow.priority}
                </Badge>
              </div>
              <CardTitle className="text-lg">{workflow.name}</CardTitle>
              <p className="text-sm text-gray-600">{workflow.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span>{workflow.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${workflow.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{workflow.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Échéance: {new Date(workflow.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={buttonHandlers.viewDocument(workflow.id.toString(), workflow.name, 'workflow')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={buttonHandlers.generic(`Modifier workflow: ${workflow.name}`, 'Modification du workflow', 'Workflow')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                                          onClick={() => window.dispatchEvent(new CustomEvent('configure-item', {detail: {itemId: workflow.id, itemType: 'workflow'}}))}
                    >
                      <Settings className="w-4 h-4" />
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

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-8">
          <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Aucun workflow trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou créez un nouveau workflow
          </p>
        </div>
      )}

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Modèles workflow', 'Consultation des modèles', 'Workflow')}
            >
              <Play className="w-5 h-5" />
              Modèles de workflow
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Statistiques', 'Affichage des statistiques', 'Workflow')}
            >
              <CheckCircle className="w-5 h-5" />
              Statistiques
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Automatisation', 'Configuration de l\'automatisation', 'Workflow')}
            >
              <Settings className="w-5 h-5" />
              Automatisation
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Notifications', 'Configuration des notifications', 'Workflow')}
            >
              <AlertCircle className="w-5 h-5" />
              Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
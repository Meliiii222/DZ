// @ts-nocheck
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  MessageSquare,
  User,
  Calendar,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Edit
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

interface ApprovalItem {
  id: number;
  title: string;
  type: 'document' | 'procedure' | 'contrat' | 'decision';
  submittedBy: string;
  submittedDate: string;
  status: 'en_attente' | 'approuvé' | 'rejeté' | 'révision_requise';
  priority: 'haute' | 'moyenne' | 'basse';
  description: string;
  deadline: string;
  reviewers: string[];
  comments: number;
}

export function ApprovalWorkflowSection() {
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [comment, setComment] = useState('');

  const approvalItems: ApprovalItem[] = [
    {
      id: 1,
      title: "Contrat de partenariat commercial - Société ABC",
      type: "contrat",
      submittedBy: "Dr. Ahmed Benali",
      submittedDate: "2024-01-15",
      status: "en_attente",
      priority: "haute",
      description: "Révision et validation du contrat de partenariat avec la société ABC pour le projet d'expansion.",
      deadline: "2024-01-20",
      reviewers: ["Prof. Fatima Zerrouki", "Me. Karim Mansouri"],
      comments: 3
    },
    {
      id: 2,
      title: "Nouvelle procédure administrative - Demandes de permis",
      type: "procedure",
      submittedBy: "Prof. Fatima Zerrouki",
      submittedDate: "2024-01-12",
      status: "révision_requise",
      priority: "moyenne",
      description: "Procédure simplifiée pour les demandes de permis de construire.",
      deadline: "2024-01-25",
      reviewers: ["Dr. Ahmed Benali"],
      comments: 5
    },
    {
      id: 3,
      title: "Décision réglementaire - Tarifs 2024",
      type: "decision",
      submittedBy: "Me. Karim Mansouri",
      submittedDate: "2024-01-10",
      status: "approuvé",
      priority: "basse",
      description: "Décision relative aux nouveaux tarifs applicables en 2024.",
      deadline: "2024-01-18",
      reviewers: ["Dr. Ahmed Benali", "Prof. Fatima Zerrouki"],
      comments: 2
    }
  ];

  // Pagination pour les éléments d'approbation
  const {
    currentData: paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: approvalItems,
    itemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'approuvé': return 'bg-green-100 text-green-800';
      case 'rejeté': return 'bg-red-100 text-red-800';
      case 'révision_requise': return 'bg-orange-100 text-orange-800';
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
      case 'en_attente': return <Clock className="w-4 h-4" />;
      case 'approuvé': return <CheckCircle className="w-4 h-4" />;
      case 'rejeté': return <XCircle className="w-4 h-4" />;
      case 'révision_requise': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = (item: ApprovalItem) => {
    buttonHandlers.approveDocument(item.id.toString(), item.title)();
    setSelectedItem(null);
    setComment('');
  };

  const handleReject = (item: ApprovalItem) => {
    buttonHandlers.rejectDocument(item.id.toString(), item.title)();
    setSelectedItem(null);
    setComment('');
  };

  const handleRequestChanges = (item: ApprovalItem) => {
    buttonHandlers.requestChanges(item.id.toString(), item.title)();
    setSelectedItem(null);
    setComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workflow d'Approbation</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les demandes d'approbation et de validation
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={buttonHandlers.generic('Mes tâches', 'Affichage de mes tâches d\'approbation', 'Approbation')}
          >
            Mes tâches
          </Button>
          <Button 
            variant="outline"
            onClick={buttonHandlers.generic('Historique', 'Consultation de l\'historique', 'Approbation')}
          >
            Historique
          </Button>
        </div>
      </div>

      {/* Approval items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Demandes en attente</h2>
          {/* Liste des éléments d'approbation avec pagination */}
          <div className="space-y-4">
            {paginatedItems.map((item) => (
              <Card 
                key={item.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedItem?.id === item.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(item.status)}
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{item.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Échéance: {new Date(item.deadline).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{item.comments} commentaires</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            buttonHandlers.viewDocument(item.id.toString(), item.title, item.type)();
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            buttonHandlers.generic(`Commenter: ${item.title}`, 'Ajout de commentaire', 'Approbation')();
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
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
        </div>

        {/* Approval panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Panneau d'approbation</h2>
          {selectedItem ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedItem.title}</CardTitle>
                <p className="text-gray-600">{selectedItem.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {selectedItem.type}
                  </div>
                  <div>
                    <span className="font-medium">Priorité:</span> {selectedItem.priority}
                  </div>
                  <div>
                    <span className="font-medium">Soumis par:</span> {selectedItem.submittedBy}
                  </div>
                  <div>
                    <span className="font-medium">Date limite:</span> {new Date(selectedItem.deadline).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Réviseurs assignés:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.reviewers.map((reviewer, index) => (
                      <Badge key={index} variant="outline">{reviewer}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Commentaire:</label>
                  <Textarea
                    placeholder="Ajoutez votre commentaire..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedItem)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approuver
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleRequestChanges(selectedItem)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Demander des modifications
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleReject(selectedItem)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Rejeter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Sélectionnez un élément</h3>
                <p className="text-gray-600">
                  Cliquez sur un élément à gauche pour le réviser
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600">En attente</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-600">Approuvés</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-gray-600">Révision requise</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-600">Rejetés</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
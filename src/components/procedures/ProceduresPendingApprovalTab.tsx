// @ts-nocheck
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  User,
  Calendar,
  FileText,
  AlertTriangle,
  Filter,
  Building
} from 'lucide-react';

export function ProceduresPendingApprovalTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [insertionFilter, setInsertionFilter] = useState('all');
  const [pendingProceduresState, setPendingProceduresState] = useState(pendingProcedures);
  const [selectedProcedureForView, setSelectedProcedureForView] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [actionProcedureId, setActionProcedureId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingProcedures = [
    {
      id: 1,
      title: "Création d'entreprise individuelle numérique",
      category: "Commercial",
      submittedBy: "Sara Benali",
      submittedDate: "14 jan 2025",
      institution: "Centre National du Registre de Commerce",
      status: "En cours d'examen",
      priority: "Haute",
      description: "Procédure simplifiée pour la création d'entreprise individuelle en ligne",
      workflowStep: "Examen préliminaire",
      daysWaiting: 4,
      stepsCount: 8,
      documentsCount: 6,
      insertionType: "ocr" // OCR
    },
    {
      id: 2,
      title: "Demande de permis de construire résidentiel",
      category: "Urbanisme",
      submittedBy: "Mohamed Cherif",
      submittedDate: "11 jan 2025",
      institution: "Direction de l'Urbanisme et de l'Architecture",
      status: "Validation technique",
      priority: "Moyenne",
      description: "Procédure pour l'obtention d'un permis de construire pour logement",
      workflowStep: "Validation technique",
      daysWaiting: 7,
      stepsCount: 12,
      documentsCount: 15,
      insertionType: "manual" // Manuel
    },
    {
      id: 3,
      title: "Renouvellement de carte de séjour",
      category: "Immigration",
      submittedBy: "Amina Meziane",
      submittedDate: "9 jan 2025",
      institution: "Direction Générale de la Sûreté Nationale",
      status: "Approbation finale",
      priority: "Urgente",
      description: "Procédure de renouvellement de titre de séjour pour étrangers",
      workflowStep: "Approbation administrative finale",
      daysWaiting: 9,
      stepsCount: 6,
      documentsCount: 8,
      insertionType: "manual" // Manuel
    },
    {
      id: 4,
      title: "Inscription au registre du commerce électronique",
      category: "Commercial",
      submittedBy: "Yacine Bouaziz",
      submittedDate: "7 jan 2025",
      institution: "Centre National du Registre de Commerce",
      status: "En cours d'examen",
      priority: "Haute",
      description: "Procédure d'inscription pour activités de commerce électronique",
      workflowStep: "Examen préliminaire",
      daysWaiting: 11,
      stepsCount: 10,
      documentsCount: 9,
      insertionType: "ocr" // OCR
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours d\'examen':
        return 'bg-blue-100 text-blue-800';
      case 'Validation technique':
        return 'bg-orange-100 text-orange-800';
      case 'Approbation finale':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-red-100 text-red-800';
      case 'Haute':
        return 'bg-orange-100 text-orange-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (procedureId: number) => {
    setActionProcedureId(procedureId);
    setShowApprovalModal(true);
  };

  const handleReject = (procedureId: number) => {
    setActionProcedureId(procedureId);
    setShowRejectionModal(true);
  };

  const handleView = (procedureId: number) => {
    const procedure = pendingProceduresState.find(p => p.id === procedureId);
    if (procedure) {
      setSelectedProcedureForView(procedure);
    }
  };

  const confirmApproval = () => {
    if (actionProcedureId) {
      setPendingProceduresState(procedures => 
        procedures.map(procedure => 
          procedure.id === actionProcedureId 
            ? { ...procedure, status: 'Approuvée', workflowStep: 'Approuvée pour publication' }
            : procedure
        )
      );
      setShowApprovalModal(false);
      setActionProcedureId(null);
      alert('✅ Procédure approuvée avec succès !');
    }
  };

  const confirmRejection = () => {
    if (actionProcedureId && rejectionReason.trim()) {
      setPendingProceduresState(procedures => 
        procedures.map(procedure => 
          procedure.id === actionProcedureId 
            ? { ...procedure, status: 'Rejetée', workflowStep: `Rejetée: ${rejectionReason}` }
            : procedure
        )
      );
      setShowRejectionModal(false);
      setActionProcedureId(null);
      setRejectionReason('');
      alert('❌ Procédure rejetée avec raison fournie.');
    }
  };

  // Logique de filtrage
  const filteredProcedures = pendingProceduresState.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || procedure.status === statusFilter;
    const matchesInsertion = insertionFilter === 'all' || procedure.insertionType === insertionFilter;
    return matchesSearch && matchesStatus && matchesInsertion;
  });

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-sm text-gray-600">En attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">1</p>
            <p className="text-sm text-gray-600">Priorité urgente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-sm text-gray-600">Approuvées ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">7.2</p>
            <p className="text-sm text-gray-600">Délai moyen (jours)</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <EnhancedInput
              placeholder="Rechercher dans les procédures en attente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              context="search"
              enableVoice={true}
            />
          </div>
        </div>

        {/* Filtres de statut */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Statut :</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === 'En cours d\'examen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('En cours d\'examen')}
              >
                En attente
              </Button>
              <Button
                variant={statusFilter === 'Validation technique' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('Validation technique')}
              >
                En examen
              </Button>
            </div>
          </div>
        </Card>

        {/* Filtres d'insertion */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Type d'insertion :</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={insertionFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInsertionFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={insertionFilter === 'manual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInsertionFilter('manual')}
              >
                Insertion manuelle
              </Button>
              <Button
                variant={insertionFilter === 'ocr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInsertionFilter('ocr')}
              >
                Insertion OCR
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des procédures en attente */}
      <div className="space-y-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{procedure.title}</CardTitle>
                    <Badge variant="outline">{procedure.category}</Badge>
                    <Badge className={getPriorityColor(procedure.priority)}>
                      {procedure.priority}
                    </Badge>
                  </div>
                  <CardDescription className="mb-3">
                    {procedure.description}
                  </CardDescription>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Soumis par:</span>
                      <p className="font-medium flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {procedure.submittedBy}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {procedure.submittedDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Institution:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {procedure.institution}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">En attente:</span>
                      <p className="font-medium">{procedure.daysWaiting} jours</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>{procedure.stepsCount} étapes</span>
                    <span>{procedure.documentsCount} documents requis</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(procedure.status)}>
                    {procedure.status}
                  </Badge>
                  <div className="text-xs text-gray-500 text-right">
                    Étape: {procedure.workflowStep}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Workflow d'approbation des procédures administratives
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleView(procedure.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Examiner
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleReject(procedure.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeter
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApprove(procedure.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approuver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow d'approbation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Workflow d'approbation des procédures administratives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h4 className="font-semibold text-blue-900">Examen préliminaire</h4>
                <p className="text-sm text-blue-700">Vérification de la complétude du dossier (2-3 jours)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h4 className="font-semibold text-blue-900">Validation technique</h4>
                <p className="text-sm text-blue-700">Examen technique par l'expert métier (5-7 jours)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h4 className="font-semibold text-blue-900">Approbation administrative finale</h4>
                <p className="text-sm text-blue-700">Validation finale et mise en ligne (3-5 jours)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

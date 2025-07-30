/**
 * Composant de workflow d'approbation pour les documents OCR traités
 * Gère la validation et l'enregistrement des données extraites
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DocumentViewerModal } from "../modals/DocumentViewerModal";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  User, 
  FileText, 
  Save, 
  Send,
  Eye,
  Edit,
  MessageCircle,
  History,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  Zap,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  FileSearch,
  ClipboardList
} from "lucide-react";

interface ApprovalWorkflowProps {
  extractedData?: any;
  onApproval?: (approvedData: any) => void;
  onRejection?: (reason: string) => void;
}

interface ApprovalStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignee?: string;
  dueDate?: string;
  completedAt?: string;
  notes?: string;
}

interface WorkflowDocument {
  id: string;
  title: string;
  documentType: 'legal-text' | 'procedure';
  extractionDate: string;
  extractionConfidence: number;
  status: 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected';
  submittedBy: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  extractedData: any;
  reviewNotes?: string;
  lastModified: string;
}

export function ApprovalWorkflowComponent({ extractedData, onApproval, onRejection }: ApprovalWorkflowProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected'>('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<'all' | 'legal-text' | 'procedure'>('all');
  const [selectedDocument, setSelectedDocument] = useState<WorkflowDocument | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  // Documents simulés pour le workflow
  const workflowItems: WorkflowDocument[] = [
    {
      id: '1',
      title: 'Loi n° 23-01 du 10 février 2023 relative aux investissements',
      documentType: 'legal-text',
      extractionDate: '2025-01-12',
      extractionConfidence: 94,
      status: 'pending',
      submittedBy: 'Système OCR-IA',
      priority: 'high',
      extractedData: {
        number: '23-01',
        date: '10 février 2023',
        title: 'Loi relative aux investissements',
        authority: 'Assemblée Populaire Nationale',
        type: 'Loi'
      },
      lastModified: '2025-01-12T10:30:00'
    },
    {
      id: '2',
      title: 'Décret exécutif n° 23-145 fixant les modalités d\'application',
      documentType: 'legal-text',
      extractionDate: '2025-01-11',
      extractionConfidence: 87,
      status: 'under_review',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Dr. Amina Khelifi',
      priority: 'medium',
      extractedData: {
        number: '23-145',
        date: '15 mars 2023',
        title: 'Décret fixant les modalités d\'application',
        authority: 'Premier Ministre',
        type: 'Décret exécutif'
      },
      lastModified: '2025-01-11T15:45:00'
    },
    {
      id: '3',
      title: 'Procédure de création d\'entreprise SARL',
      documentType: 'procedure',
      extractionDate: '2025-01-10',
      extractionConfidence: 91,
      status: 'approved',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'M. Karim Benaissa',
      priority: 'medium',
      extractedData: {
        title: 'Création d\'entreprise SARL',
        institution: 'CNRC',
        duration: '15 jours ouvrables',
        steps: 8,
        documents: ['Statuts', 'Acte de naissance', 'Justificatif de domicile']
      },
      reviewNotes: 'Procédure validée et mise à jour selon les dernières réglementations.',
      lastModified: '2025-01-10T09:20:00'
    },
    {
      id: '4',
      title: 'Arrêté ministériel n° 234/2023 relatif aux normes environnementales',
      documentType: 'legal-text',
      extractionDate: '2025-01-09',
      extractionConfidence: 83,
      status: 'needs_revision',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Dr. Leila Mansouri',
      priority: 'low',
      extractedData: {
        number: '234/2023',
        date: '20 avril 2023',
        title: 'Arrêté relatif aux normes environnementales',
        authority: 'Ministère de l\'Environnement',
        type: 'Arrêté ministériel'
      },
      reviewNotes: 'Nécessite une vérification des références réglementaires citées.',
      lastModified: '2025-01-09T14:10:00'
    },
    {
      id: '5',
      title: 'Procédure de demande de passeport biométrique',
      documentType: 'procedure',
      extractionDate: '2025-01-08',
      extractionConfidence: 96,
      status: 'approved',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Mme. Fatima Benali',
      priority: 'high',
      extractedData: {
        title: 'Demande de passeport biométrique',
        institution: 'Ministère de l\'Intérieur',
        duration: '10 jours ouvrables',
        steps: 5,
        documents: ['Acte de naissance', 'Photo d\'identité', 'Justificatif de résidence']
      },
      reviewNotes: 'Procédure conforme aux nouvelles directives du ministère.',
      lastModified: '2025-01-08T11:30:00'
    },
    {
      id: '6',
      title: 'Ordonnance n° 23-02 modifiant le code de commerce',
      documentType: 'legal-text',
      extractionDate: '2025-01-07',
      extractionConfidence: 89,
      status: 'rejected',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'M. Ahmed Taleb',
      priority: 'medium',
      extractedData: {
        number: '23-02',
        date: '25 janvier 2023',
        title: 'Ordonnance modifiant le code de commerce',
        authority: 'Président de la République',
        type: 'Ordonnance'
      },
      reviewNotes: 'Document incomplet - manque les articles modificateurs.',
      lastModified: '2025-01-07T16:45:00'
    }
  ];

  // Filtrage des documents
  const filteredDocuments = workflowItems.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.assignedTo && doc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filter === 'all' || doc.status === filter;
    
    const matchesDocumentType = documentTypeFilter === 'all' ||
      (documentTypeFilter === 'legal-text' && doc.documentType === 'legal-text') ||
      (documentTypeFilter === 'procedure' && doc.documentType === 'procedure');
    
    return matchesSearch && matchesStatus && matchesDocumentType;
  });

  // Pagination pour les documents filtrés
  const {
    currentData: paginatedDocuments,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredDocuments,
    itemsPerPage: 10
  });

  const getStatistics = () => {
    return {
      total: workflowItems.length,
      pending: workflowItems.filter(d => d.status === 'pending').length,
      underReview: workflowItems.filter(d => d.status === 'under_review').length,
      approved: workflowItems.filter(d => d.status === 'approved').length,
      needsRevision: workflowItems.filter(d => d.status === 'needs_revision').length,
      rejected: workflowItems.filter(d => d.status === 'rejected').length,
      avgConfidence: workflowItems.reduce((acc, doc) => acc + doc.extractionConfidence, 0) / workflowItems.length
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <SectionHeader
        title="📋 Fil d'Approbation OCR-IA"
        description="Validation et approbation des documents traités par OCR-IA"
        icon={ClipboardList}
        iconColor="text-orange-600"
      />

      {/* Statistics - Cliquables comme filtres */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card 
          className={`p-4 bg-gray-50 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'all' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('all')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-yellow-50 border-yellow-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'pending' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('pending')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-yellow-600">En attente</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-blue-50 border-blue-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'under_review' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('under_review')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.underReview}</p>
            <p className="text-sm text-blue-600">En révision</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-green-50 border-green-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'approved' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('approved')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
            <p className="text-sm text-green-600">Approuvés</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-orange-50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'needs_revision' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('needs_revision')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-700">{stats.needsRevision}</p>
            <p className="text-sm text-orange-600">À réviser</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-red-50 border-red-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'rejected' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('rejected')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
            <p className="text-sm text-red-600">Rejetés</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filtres et recherche */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher dans les documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={documentTypeFilter} onValueChange={(value: any) => setDocumentTypeFilter(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="legal-text">Textes juridiques</SelectItem>
                <SelectItem value="procedure">Procédures</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Liste des documents paginée */}
          <div className="space-y-4">
            {paginatedDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={doc.documentType === 'legal-text' ? 'default' : 'secondary'}>
                          {doc.documentType === 'legal-text' ? 'Texte juridique' : 'Procédure'}
                        </Badge>
                        <Badge 
                          variant={
                            doc.status === 'approved' ? 'default' :
                            doc.status === 'pending' ? 'secondary' :
                            doc.status === 'under_review' ? 'outline' :
                            doc.status === 'needs_revision' ? 'secondary' : 'destructive'
                          }
                          className={
                            doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                            doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            doc.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                            doc.status === 'needs_revision' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {doc.status === 'approved' ? 'Approuvé' :
                           doc.status === 'pending' ? 'En attente' :
                           doc.status === 'under_review' ? 'En révision' :
                           doc.status === 'needs_revision' ? 'À réviser' : 'Rejeté'}
                        </Badge>
                        <Badge variant="outline" className={
                          doc.priority === 'high' ? 'border-red-200 text-red-700' :
                          doc.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                          'border-gray-200 text-gray-700'
                        }>
                          {doc.priority === 'high' ? 'Priorité élevée' :
                           doc.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{doc.extractionConfidence}%</span>
                      </div>
                      <p className="text-xs text-gray-500">{doc.extractionDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Soumis par :</span>
                        <p className="text-gray-800">{doc.submittedBy}</p>
                      </div>
                      {doc.assignedTo && (
                        <div>
                          <span className="font-medium text-gray-600">Assigné à :</span>
                          <p className="text-gray-800">{doc.assignedTo}</p>
                        </div>
                      )}
                    </div>
                    
                    {doc.reviewNotes && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700">
                          <MessageCircle className="w-4 h-4 inline mr-1" />
                          {doc.reviewNotes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedDocument(doc);
                          setIsViewerOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Examiner
                      </Button>
                      
                      {doc.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Approuver
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <ThumbsDown className="w-4 h-4 mr-1" />
                            Rejeter
                          </Button>
                        </>
                      )}
                      
                      {doc.status === 'under_review' && (
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4 mr-1" />
                          Réviser
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Sidebar avec informations supplémentaires */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques de confiance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confiance moyenne</span>
                    <span>{Math.round(stats.avgConfidence)}%</span>
                  </div>
                  <Progress value={stats.avgConfidence} className="h-2" />
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>• Documents à haute confiance (>90%) : {workflowItems.filter(d => d.extractionConfidence > 90).length}</p>
                  <p>• Documents à confiance moyenne (70-90%) : {workflowItems.filter(d => d.extractionConfidence >= 70 && d.extractionConfidence <= 90).length}</p>
                  <p>• Documents à faible confiance (<70%) : {workflowItems.filter(d => d.extractionConfidence < 70).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exporter les données
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <FileSearch className="w-4 h-4 mr-2" />
                Recherche avancée
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <History className="w-4 h-4 mr-2" />
                Historique complet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de visualisation des documents */}
      {selectedDocument && (
        <DocumentViewerModal
          isOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false);
            setSelectedDocument(null);
          }}
          document={{
            title: selectedDocument.title,
            content: JSON.stringify(selectedDocument.extractedData, null, 2),
            metadata: {
              type: selectedDocument.documentType,
              extractionDate: selectedDocument.extractionDate,
              confidence: selectedDocument.extractionConfidence,
              status: selectedDocument.status
            }
          }}
        />
      )}
    </div>
  );
}

export default ApprovalWorkflowComponent;
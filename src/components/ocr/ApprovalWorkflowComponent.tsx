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
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  assignee?: string;
  completedAt?: string;
  comments?: string[];
}

interface WorkflowItem {
  id: string;
  documentTitle: string;
  documentType: 'legal-text' | 'procedure';
  category: string;
  submittedAt: string;
  submittedBy: string;
  currentStep: number;
  totalSteps: number;
  status: 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  extractionConfidence: number;
  mappingConfidence: number;
  processedByOCR: true; // Tous les éléments sont traités par OCR-IA
  assignedTo?: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  type: 'comment' | 'approval' | 'rejection' | 'revision_request';
}

export function ApprovalWorkflowComponent({ 
  extractedData, 
  onApproval, 
  onRejection 
}: ApprovalWorkflowProps) {
  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<WorkflowItem | null>(null);
  const [workflowItems, setWorkflowItems] = useState<WorkflowItem[]>([]);
  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>([]);
  const [reviewComments, setReviewComments] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<WorkflowItem | null>(null);
  const [isViewerModalOpen, setIsViewerModalOpen] = useState<boolean>(false);
  const [documentToView, setDocumentToView] = useState<any | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  
  // États pour les filtres - inspirés de LegalTextsApprovalQueue
  const [filter, setFilter] = useState<string>('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialiser avec des données d'exemple
    initializeWorkflowData();
  }, []);

  const initializeWorkflowData = () => {
    const mockWorkflowItems: WorkflowItem[] = [
      {
        id: 'wf_001',
        documentTitle: 'Décret exécutif n° 25-001 du 15 janvier 2025',
        documentType: 'legal-text',
        category: 'Environnement',
        submittedAt: '2025-01-15T10:30:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 2,
        totalSteps: 4,
        status: 'under_review',
        priority: 'high',
        extractionConfidence: 95,
        mappingConfidence: 88,
        processedByOCR: true,
        assignedTo: 'Dr. Fatima Cherif',
        comments: [
          {
            id: '1',
            author: 'Dr. Fatima Cherif',
            content: 'Révision en cours des articles 15-18.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: 'comment'
          }
        ]
      },
      {
        id: 'wf_002', 
        documentTitle: 'Arrêté ministériel n° 25-002 du 14 janvier 2025',
        documentType: 'legal-text',
        category: 'Urbanisme',
        submittedAt: '2025-01-14T14:20:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 4,
        totalSteps: 4,
        status: 'approved',
        priority: 'medium',
        extractionConfidence: 92,
        mappingConfidence: 90,
        processedByOCR: true,
        assignedTo: 'Dr. Karim Meziane',
        comments: []
      },
      {
        id: 'wf_003',
        documentTitle: 'Procédure d\'obtention du permis de construire',
        documentType: 'procedure',
        category: 'Administration',
        submittedAt: '2025-01-13T09:15:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 1,
        totalSteps: 4,
        status: 'pending',
        priority: 'urgent',
        extractionConfidence: 98,
        mappingConfidence: 95,
        processedByOCR: true,
        comments: []
      },
      {
        id: 'wf_004',
        documentTitle: 'Loi n° 25-004 du 12 janvier 2025',
        documentType: 'legal-text',
        category: 'Finance',
        submittedAt: '2025-01-12T16:45:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 3,
        totalSteps: 4,
        status: 'under_review',
        priority: 'high',
        extractionConfidence: 93,
        mappingConfidence: 89,
        processedByOCR: true,
        assignedTo: 'Dr. Ahmed Benali',
        comments: [
          {
            id: '2',
            author: 'Dr. Ahmed Benali',
            content: 'Validation de la section économique en cours.',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            type: 'comment'
          }
        ]
      },
      {
        id: 'wf_005',
        documentTitle: 'Procédure de création d\'entreprise numérique',
        documentType: 'procedure',
        category: 'Commercial',
        submittedAt: '2025-01-11T11:20:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 2,
        totalSteps: 4,
        status: 'needs_revision',
        priority: 'medium',
        extractionConfidence: 91,
        mappingConfidence: 87,
        processedByOCR: true,
        assignedTo: 'Ing. Amina Bouaziz',
        comments: [
          {
            id: '3',
            author: 'Ing. Amina Bouaziz',
            content: 'Besoin de clarifications sur les étapes 3-4.',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            type: 'revision_request'
          }
        ]
      },
      {
        id: 'wf_006',
        documentTitle: 'Ordonnance n° 25-006 relative aux startups',
        documentType: 'legal-text',
        category: 'Économie',
        submittedAt: '2025-01-10T08:45:00Z',
        submittedBy: 'Système OCR-IA',
        currentStep: 1,
        totalSteps: 4,
        status: 'rejected',
        priority: 'low',
        extractionConfidence: 76,
        mappingConfidence: 72,
        processedByOCR: true,
        comments: [
          {
            id: '4',
            author: 'Dr. Yacine Meziane',
            content: 'Qualité OCR insuffisante, ressaisie nécessaire.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: 'rejection'
          }
        ]
      }
    ];

    const mockApprovalSteps: ApprovalStep[] = [
      {
        id: 'step_1',
        title: 'Validation Technique',
        description: 'Vérification de la qualité d\'extraction OCR',
        status: 'approved',
        assignee: 'Système OCR-IA',
        completedAt: '2025-01-15T10:35:00Z',
        comments: ['Extraction OCR de haute qualité (95%)', 'Toutes les entités juridiques détectées']
      },
      {
        id: 'step_2',
        title: 'Révision Juridique',
        description: 'Validation du contenu juridique et des références',
        status: 'in_review',
        assignee: 'Expert Juridique',
        comments: ['En cours de révision...']
      },
      {
        id: 'step_3',
        title: 'Validation Finale',
        description: 'Approbation finale avant enregistrement',
        status: 'pending',
        assignee: 'Responsable Publications'
      },
      {
        id: 'step_4',
        title: 'Publication',
        description: 'Enregistrement et mise à disposition',
        status: 'pending',
        assignee: 'Système'
      }
    ];

    setWorkflowItems(mockWorkflowItems);
    setApprovalSteps(mockApprovalSteps);
    setCurrentWorkflowItem(mockWorkflowItems[0]);
  };

  const handleApprove = (docId: string) => {
    setWorkflowItems(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'approved' as const } : doc
    ));
  };

  const handleReject = (docId: string) => {
    setWorkflowItems(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'rejected' as const } : doc
    ));
  };

  const handleExamine = (docId: string) => {
    const doc = workflowItems.find(d => d.id === docId);
    if (doc) {
      // Adapter le format pour DocumentViewerModal
      const adaptedDoc = {
        ...doc,
        title: doc.documentTitle,
        type: doc.documentType === 'legal-text' ? 'Texte juridique' : 'Procédure administrative',
        submissionDate: new Date(doc.submittedAt),
        confidence: doc.extractionConfidence
      };
      setDocumentToView(adaptedDoc);
      setIsViewerModalOpen(true);
    }
  };

  const addComment = (docId: string, comment?: string) => {
    const commentText = comment || newComment;
    if (!commentText.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: 'Utilisateur actuel',
      content: commentText,
      timestamp: new Date(),
      type: 'comment'
    };

    setWorkflowItems(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, comments: [...doc.comments, newCommentObj] }
        : doc
    ));
    
    if (!comment) {
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction de filtrage inspirée de LegalTextsApprovalQueue
  const filteredDocuments = workflowItems.filter(doc => {
    const matchesSearch = doc.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === 'all' || doc.status === filter;
    const matchesDocumentType = documentTypeFilter === 'all' || 
      (documentTypeFilter === 'legal-text' && doc.documentType === 'legal-text') ||
      (documentTypeFilter === 'procedure' && doc.documentType === 'procedure');
    
    return matchesSearch && matchesStatus && matchesDocumentType;
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
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <Button
                  variant={documentTypeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDocumentTypeFilter('all')}
                >
                  Tous
                </Button>
                <Button
                  variant={documentTypeFilter === 'legal-text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDocumentTypeFilter('legal-text')}
                >
                  Textes juridiques
                </Button>
                <Button
                  variant={documentTypeFilter === 'procedure' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDocumentTypeFilter('procedure')}
                >
                  Procédures administratives
                </Button>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Documents - Liste unique sans onglets */}
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <Card 
                key={doc.id} 
                className={`p-4 cursor-pointer transition-all ${
                  selectedDocument?.id === doc.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      doc.status === 'pending' ? 'bg-yellow-400' :
                      doc.status === 'under_review' ? 'bg-blue-400' :
                      doc.status === 'approved' ? 'bg-green-400' :
                      doc.status === 'needs_revision' ? 'bg-orange-400' :
                      'bg-red-400'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{doc.documentTitle}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                        <Badge className={`text-xs ${
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          doc.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'needs_revision' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status === 'pending' ? 'En attente' :
                           doc.status === 'under_review' ? 'En révision' :
                           doc.status === 'approved' ? 'Approuvé' :
                           doc.status === 'needs_revision' ? 'Révision nécessaire' :
                           'Rejeté'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {doc.documentType === 'legal-text' ? 'Texte juridique' : 'Procédure administrative'}
                        </Badge>
                        {doc.priority === 'urgent' && (
                          <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Soumis il y a {Math.floor((Date.now() - new Date(doc.submittedAt).getTime()) / (1000 * 60 * 60))}h • Confiance: {doc.extractionConfidence}%
                      </p>
                      {doc.assignedTo && (
                        <p className="text-sm text-blue-600 mt-1">
                          Assigné à {doc.assignedTo}
                        </p>
                      )}
                      
                      {/* Barre de progression pour les documents en révision */}
                      {doc.status === 'under_review' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progression</span>
                            <span>Étape {doc.currentStep}/{doc.totalSteps}</span>
                          </div>
                          <Progress value={(doc.currentStep / doc.totalSteps) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{doc.comments.length}</span>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredDocuments.length === 0 && (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
                <p className="text-gray-500">Aucun document ne correspond aux critères de filtrage actuels.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Document Details - Inspiré de LegalTextsApprovalQueue */}
        <div className="space-y-4">
          {selectedDocument ? (
            <>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du Document</h3>
                <div className="space-y-3 text-sm">
                  <div><strong>Type:</strong> {selectedDocument.documentType === 'legal-text' ? 'Texte juridique' : 'Procédure administrative'}</div>
                  <div><strong>Catégorie:</strong> {selectedDocument.category}</div>
                  <div><strong>Confiance OCR:</strong> {selectedDocument.extractionConfidence}%</div>
                  <div><strong>Confiance Mapping:</strong> {selectedDocument.mappingConfidence}%</div>
                  <div><strong>Soumis par:</strong> {selectedDocument.submittedBy}</div>
                  <div><strong>Date de soumission:</strong> {formatDate(selectedDocument.submittedAt)}</div>
                  {selectedDocument.assignedTo && (
                    <div><strong>Assigné à:</strong> {selectedDocument.assignedTo}</div>
                  )}
                  <div><strong>Statut:</strong> 
                    <Badge className={`ml-2 text-xs ${
                      selectedDocument.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedDocument.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                      selectedDocument.status === 'approved' ? 'bg-green-100 text-green-800' :
                      selectedDocument.status === 'needs_revision' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedDocument.status === 'pending' ? 'En attente' :
                       selectedDocument.status === 'under_review' ? 'En révision' :
                       selectedDocument.status === 'approved' ? 'Approuvé' :
                       selectedDocument.status === 'needs_revision' ? 'Révision nécessaire' :
                       'Rejeté'}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleExamine(selectedDocument.id)}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <FileSearch className="h-4 w-4 mr-2" />
                    Examiner le document
                  </Button>
                  {selectedDocument.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleApprove(selectedDocument.id)}
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        size="sm"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Approuver
                      </Button>
                      <Button 
                        onClick={() => handleReject(selectedDocument.id)}
                        variant="destructive"
                        className="flex-1"
                        size="sm"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Comments */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Commentaires</h4>
                <div className="space-y-3 mb-4">
                  {selectedDocument.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                  {selectedDocument.comments.length === 0 && (
                    <p className="text-sm text-gray-500 italic">Aucun commentaire pour le moment.</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Textarea
                    placeholder="Ajouter un commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button 
                    onClick={() => addComment(selectedDocument.id)}
                    size="sm"
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Ajouter commentaire
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6 text-center">
              <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Sélectionnez un document pour voir les détails</p>
            </Card>
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={isViewerModalOpen}
        onClose={() => {
          setIsViewerModalOpen(false);
          setDocumentToView(null);
        }}
        document={documentToView}
      />
    </div>
  );
}

export default ApprovalWorkflowComponent;
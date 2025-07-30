// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import DocumentDetailModal from "../modals/DocumentDetailModal";
import { DocumentViewerModal } from "../modals/DocumentViewerModal";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Eye,
  Filter,
  Search,
  ClipboardList,
  Scale,
  FileSearch
} from 'lucide-react';

interface LegalDocument {
  id: string;
  title: string;
  type: string;
  legalCategory: 'loi' | 'decret' | 'arrete' | 'ordonnance' | 'code';
  insertionType: 'manual' | 'ocr';
  submittedBy: string;
  submissionDate: Date;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_revision';
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  comments: Comment[];
  ocrData: Record<string, unknown>;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  type: 'comment' | 'approval' | 'rejection' | 'revision_request';
}

const LegalTextsApprovalQueue: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [insertionFilter, setInsertionFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewerModalOpen, setIsViewerModalOpen] = useState<boolean>(false);
  const [documentToView, setDocumentToView] = useState<LegalDocument | null>(null);

  useEffect(() => {
    const mockDocuments: LegalDocument[] = [
      {
        id: '1',
        title: 'LOI N° 25-01 - Modernisation de la Justice Numérique',
        type: 'Loi',
        legalCategory: 'loi',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        submissionDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'pending',
        confidence: 96.5,
        priority: 'high',
        comments: [],
        ocrData: {
          numero: '25-01',
          dateHijri: '12 Chaaban 1446',
          dateGregorienne: '15 février 2025'
        }
      },
      {
        id: '2',
        title: 'DÉCRET EXÉCUTIF N° 25-45 - Organisation Administrative',
        type: 'Décret Exécutif',
        legalCategory: 'decret',
        insertionType: 'manual',
        submittedBy: 'Ahmed Benali',
        submissionDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: 'under_review',
        confidence: 100,
        priority: 'medium',
        assignedTo: 'Dr. Fatima Cherif',
        comments: [
          {
            id: '1',
            author: 'Dr. Fatima Cherif',
            content: 'Révision des articles 15-18 nécessaire.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: 'comment'
          }
        ],
        ocrData: {
          numero: '25-45',
          dateGregorienne: '12 février 2025'
        }
      },
      {
        id: '3',
        title: 'ARRÊTÉ MINISTÉRIEL N° 25-125 - Procédures Judiciaires',
        type: 'Arrêté',
        legalCategory: 'arrete',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        submissionDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
        status: 'approved',
        confidence: 92.3,
        priority: 'low',
        assignedTo: 'Dr. Karim Meziane',
        comments: [],
        ocrData: {
          numero: '25-125',
          dateGregorienne: '10 février 2025'
        }
      },
      {
        id: '4',
        title: 'ORDONNANCE N° 25-02 - Code de l\'Investissement',
        type: 'Ordonnance',
        legalCategory: 'ordonnance',
        insertionType: 'manual',
        submittedBy: 'Amina Bouaziz',
        submissionDate: new Date(Date.now() - 8 * 60 * 60 * 1000),
        status: 'needs_revision',
        confidence: 100,
        priority: 'high',
        assignedTo: 'Dr. Ahmed Benali',
        comments: [
          {
            id: '2',
            author: 'Dr. Ahmed Benali',
            content: 'Modification de la section économique requise.',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            type: 'revision_request'
          }
        ],
        ocrData: {
          numero: '25-02',
          dateGregorienne: '8 février 2025'
        }
      },
      {
        id: '5',
        title: 'CODE CIVIL ALGÉRIEN - Mise à jour 2025',
        type: 'Code',
        legalCategory: 'code',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        submissionDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
        status: 'rejected',
        confidence: 78.9,
        priority: 'medium',
        assignedTo: 'Dr. Fatima Cherif',
        comments: [
          {
            id: '3',
            author: 'Dr. Fatima Cherif',
            content: 'Qualité OCR insuffisante, ressaisie manuelle nécessaire.',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            type: 'rejection'
          }
        ],
        ocrData: {
          numero: 'CC-2025',
          dateGregorienne: '5 février 2025'
        }
      },
      {
        id: '6',
        title: 'DÉCRET EXÉCUTIF N° 25-67 - Modernisation des Services Publics',
        type: 'Décret Exécutif',
        legalCategory: 'decret',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        submissionDate: new Date(Date.now() - 16 * 60 * 60 * 1000),
        status: 'under_review',
        confidence: 94.2,
        priority: 'high',
        assignedTo: 'Dr. Karim Meziane',
        comments: [
          {
            id: '4',
            author: 'Dr. Karim Meziane',
            content: 'Révision des dispositions techniques en cours.',
            timestamp: new Date(Date.now() - 90 * 60 * 1000),
            type: 'comment'
          }
        ],
        ocrData: {
          numero: '25-67',
          dateGregorienne: '3 février 2025'
        }
      }
    ];

    setDocuments(mockDocuments);
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === 'all' || doc.status === filter;
    const matchesType = typeFilter === 'all' || doc.legalCategory === typeFilter;
    const matchesInsertion = insertionFilter === 'all' || doc.insertionType === insertionFilter;
    return matchesSearch && matchesStatus && matchesType && matchesInsertion;
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      'under_review': { label: 'En révision', className: 'bg-blue-100 text-blue-800' },
      'approved': { label: 'Approuvé', className: 'bg-green-100 text-green-800' },
      'rejected': { label: 'Rejeté', className: 'bg-red-100 text-red-800' },
      'needs_revision': { label: 'À réviser', className: 'bg-orange-100 text-orange-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleApprove = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'approved' as const } : doc
    ));
  };

  const handleReject = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'rejected' as const } : doc
    ));
  };

  const handleRevision = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'needs_revision' as const } : doc
    ));
  };

  const handleExamine = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setDocumentToView(doc);
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

    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, comments: [...doc.comments, newCommentObj] }
        : doc
    ));
    
    if (!comment) {
      setNewComment('');
    }
  };

  const getStatistics = () => {
    return {
      total: documents.length,
      pending: documents.filter(d => d.status === 'pending').length,
      underReview: documents.filter(d => d.status === 'under_review').length,
      approved: documents.filter(d => d.status === 'approved').length,
      needsRevision: documents.filter(d => d.status === 'needs_revision').length,
      rejected: documents.filter(d => d.status === 'rejected').length,
      avgConfidence: documents.reduce((acc, doc) => acc + doc.confidence, 0) / documents.length
    };
  };

  const stats = getStatistics();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <SectionHeader
        title="📋 File d'attente d'approbation"
        description="Validation et approbation des documents juridiques traités par OCR"
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
                  Manuelle
                </Button>
                <Button
                  variant={insertionFilter === 'ocr' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setInsertionFilter('ocr')}
                >
                  OCR-IA
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

          {/* Type Filters */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-3">Type de texte :</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={typeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('all')}
                >
                  Tous
                </Button>
                <Button
                  variant={typeFilter === 'loi' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('loi')}
                >
                  Lois
                </Button>
                <Button
                  variant={typeFilter === 'decret' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('decret')}
                >
                  Décrets
                </Button>
                <Button
                  variant={typeFilter === 'arrete' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('arrete')}
                >
                  Arrêtés
                </Button>
                <Button
                  variant={typeFilter === 'ordonnance' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('ordonnance')}
                >
                  Ordonnances
                </Button>
                <Button
                  variant={typeFilter === 'code' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter('code')}
                >
                  Codes
                </Button>
              </div>
            </div>
          </Card>



          {/* Documents */}
          <div className="space-y-3">
            {paginatedDocuments.map((doc) => (
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
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
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
                           doc.status === 'needs_revision' ? 'À réviser' :
                           'Rejeté'}
                        </Badge>
                        {doc.priority === 'high' && (
                          <Badge className="bg-red-100 text-red-800 text-xs">Priorité élevée</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Soumis il y a {Math.floor((Date.now() - doc.submissionDate.getTime()) / (1000 * 60 * 60))}h • Confiance: {doc.confidence}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{doc.comments.length}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {paginatedDocuments.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
              <p className="text-gray-500">Aucun document ne correspond aux critères de filtrage actuels.</p>
            </Card>
          )}

          {/* Pagination */}
          {paginatedDocuments.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </div>

        {/* Document Details */}
        <div className="space-y-4">
          {selectedDocument ? (
            <>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du Document</h3>
                <div className="space-y-3 text-sm">
                  <div><strong>Type:</strong> {selectedDocument.type}</div>
                  <div><strong>Numéro:</strong> {selectedDocument.ocrData?.numero || 'N/A'}</div>
                  <div><strong>Date:</strong> {selectedDocument.ocrData?.dateGregorienne || 'N/A'}</div>
                  <div><strong>Confiance OCR:</strong> {selectedDocument.confidence}%</div>
                  <div><strong>Soumis par:</strong> {selectedDocument.submittedBy}</div>
                  <div><strong>Date de soumission:</strong> {selectedDocument.submissionDate.toLocaleString()}</div>
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
};

export default LegalTextsApprovalQueue;
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/common/SectionHeader";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  MessageCircle,
  Send,
  Eye,
  Search,
  BookOpen,
  Calendar,
  Scale
} from 'lucide-react';

interface LegalDocument {
  id: string;
  title: string;
  type: string;
  legalCategory: 'loi' | 'decret' | 'arrete' | 'ordonnance' | 'code';
  insertionType: 'manual' | 'ocr';
  submittedBy: string;
  approvedDate: Date;
  scheduledPublicationDate: Date;
  status: 'approved_pending_publication' | 'scheduled' | 'published' | 'publication_delayed';
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  approvedBy: string;
  comments: Comment[];
  ocrData: Record<string, unknown>;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  type: 'comment' | 'publication_note' | 'scheduling';
}

const LegalTextsPendingPublication: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [insertionFilter, setInsertionFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const mockDocuments: LegalDocument[] = [
      {
        id: '1',
        title: 'LOI N° 25-01 - Modernisation de la Justice Numérique',
        type: 'Loi',
        legalCategory: 'loi',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        approvedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        scheduledPublicationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'approved_pending_publication',
        confidence: 96.5,
        priority: 'high',
        approvedBy: 'Dr. Ahmed Benali',
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
        approvedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        scheduledPublicationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: 'scheduled',
        confidence: 100,
        priority: 'medium',
        approvedBy: 'Dr. Fatima Cherif',
        comments: [
          {
            id: '1',
            author: 'Service Publication',
            content: 'Programmé pour publication au Journal Officiel demain.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: 'scheduling'
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
        approvedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        scheduledPublicationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'published',
        confidence: 92.3,
        priority: 'low',
        approvedBy: 'Dr. Karim Meziane',
        comments: [
          {
            id: '2',
            author: 'Service Publication',
            content: 'Publié avec succès au Journal Officiel N° 2025-08.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            type: 'publication_note'
          }
        ],
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
        approvedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        scheduledPublicationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'publication_delayed',
        confidence: 100,
        priority: 'high',
        approvedBy: 'Dr. Ahmed Benali',
        comments: [
          {
            id: '3',
            author: 'Service Publication',
            content: 'Publication reportée en attente de validation finale du ministère.',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            type: 'publication_note'
          }
        ],
        ocrData: {
          numero: '25-02',
          dateGregorienne: '8 février 2025'
        }
      },
      {
        id: '5',
        title: 'CODE DE PROCÉDURE CIVILE - Amendements 2025',
        type: 'Code',
        legalCategory: 'code',
        insertionType: 'ocr',
        submittedBy: 'Service OCR Automatique',
        approvedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        scheduledPublicationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'approved_pending_publication',
        confidence: 89.7,
        priority: 'medium',
        approvedBy: 'Dr. Fatima Cherif',
        comments: [],
        ocrData: {
          numero: 'CPC-2025',
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'approved_pending_publication': { label: 'En attente de publication', className: 'bg-yellow-100 text-yellow-800' },
      'scheduled': { label: 'Programmé', className: 'bg-blue-100 text-blue-800' },
      'published': { label: 'Publié', className: 'bg-green-100 text-green-800' },
      'publication_delayed': { label: 'Publication reportée', className: 'bg-red-100 text-red-800' }
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

  const handleSchedulePublication = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'scheduled' as const } : doc
    ));
  };

  const handleMarkPublished = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'published' as const } : doc
    ));
  };

  const handleDelayPublication = (docId: string) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId ? { ...doc, status: 'publication_delayed' as const } : doc
    ));
  };

  const addComment = (docId: string) => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: 'Utilisateur actuel',
      content: newComment,
      timestamp: new Date(),
      type: 'comment'
    };

    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, comments: [...doc.comments, newCommentObj] }
        : doc
    ));
    setNewComment('');
  };

  const getStatistics = () => {
    return {
      total: documents.length,
      pendingPublication: documents.filter(d => d.status === 'approved_pending_publication').length,
      scheduled: documents.filter(d => d.status === 'scheduled').length,
      published: documents.filter(d => d.status === 'published').length,
      delayed: documents.filter(d => d.status === 'publication_delayed').length,
      avgConfidence: documents.reduce((acc, doc) => acc + doc.confidence, 0) / documents.length
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Textes juridiques en attente de publication"
        description="Gestion et suivi des textes juridiques approuvés en attente de publication"
        icon={BookOpen}
        iconColor="text-green-600"
      />

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingPublication}</p>
              <p className="text-sm text-gray-600">En attente</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              <p className="text-sm text-gray-600">Programmés</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              <p className="text-sm text-gray-600">Publiés</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtres et Recherche */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des textes en attente de publication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Filtres de statut */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Statut :</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={filter === 'approved_pending_publication' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('approved_pending_publication')}
              >
                En attente
              </Button>
              <Button
                variant={filter === 'scheduled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('scheduled')}
              >
                Programmés
              </Button>
            </div>
          </div>
        </Card>

        {/* Filtres de type de texte juridique */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Type de texte juridique :</span>
            </div>
            <div className="flex gap-2 flex-wrap">
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

      {/* Liste des documents */}
      <div className="grid gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getPriorityIcon(doc.priority)}
                  <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                  {getStatusBadge(doc.status)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Approuvé par {doc.approvedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Publication: {doc.scheduledPublicationDate.toLocaleDateString('fr-FR')}
                  </span>
                  <Badge variant="outline">
                    {doc.insertionType === 'ocr' ? 'OCR' : 'Manuel'}
                  </Badge>
                  <Badge variant="secondary">
                    {doc.type}
                  </Badge>
                  {doc.insertionType === 'ocr' && (
                    <span className="text-blue-600 font-medium">
                      Confiance: {doc.confidence}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedDocument(doc)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Voir
                </Button>
                {doc.status === 'approved_pending_publication' && (
                  <Button size="sm" variant="outline" onClick={() => handleSchedulePublication(doc.id)}>
                    <Calendar className="w-4 h-4 mr-1" />
                    Programmer
                  </Button>
                )}
                {doc.status === 'scheduled' && (
                  <Button size="sm" variant="outline" onClick={() => handleMarkPublished(doc.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Marquer publié
                  </Button>
                )}
              </div>
            </div>

            {/* Commentaires */}
            {doc.comments.length > 0 && (
              <div className="border-t pt-3 mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes de publication:</h4>
                {doc.comments.slice(-2).map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded p-3 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Zone d'ajout de commentaire */}
            <div className="border-t pt-3 mt-3">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ajouter une note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[80px]"
                />
                <Button onClick={() => addComment(doc.id)} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun texte trouvé</h3>
          <p className="text-gray-500">Aucun texte juridique ne correspond aux critères de filtrage actuels.</p>
        </Card>
      )}
    </div>
  );
};

export default LegalTextsPendingPublication;
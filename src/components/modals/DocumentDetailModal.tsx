// @ts-nocheck
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  X, 
  User, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Calendar,
  Hash,
  Tag,
  Zap
} from 'lucide-react';

interface DocumentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Record<string, unknown>;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRevision?: (id: string) => void;
  onAddComment?: (id: string, comment: string) => void;
  newComment?: string;
  setNewComment?: (comment: string) => void;
}

const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  isOpen,
  onClose,
  document,
  onApprove,
  onReject,
  onRevision,
  onAddComment,
  newComment = '',
  setNewComment
}) => {
  if (!document) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      'under_review': { label: 'En examen', className: 'bg-blue-100 text-blue-800' },
      'approved': { label: 'Approuvé', className: 'bg-green-100 text-green-800' },
      'rejected': { label: 'Rejeté', className: 'bg-red-100 text-red-800' },
      'needs_revision': { label: 'Révision requise', className: 'bg-orange-100 text-orange-800' },
      'approved_pending_publication': { label: 'En attente de publication', className: 'bg-yellow-100 text-yellow-800' },
      'scheduled': { label: 'Programmé', className: 'bg-blue-100 text-blue-800' },
      'published': { label: 'Publié', className: 'bg-green-100 text-green-800' },
      'publication_delayed': { label: 'Publication reportée', className: 'bg-red-100 text-red-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddComment = () => {
    if (onAddComment && newComment.trim()) {
      onAddComment(document.id, newComment);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                {document.title}
              </DialogTitle>
              <div className="flex items-center gap-3 mb-4">
                {getPriorityIcon(document.priority)}
                {getStatusBadge(document.status)}
                <Badge variant="outline">
                  {document.insertionType === 'ocr' ? 'OCR' : 'Manuel'}
                </Badge>
                <Badge variant="secondary">
                  {document.type}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Soumis par :</span>
                  <span className="font-medium">{document.submittedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Date de soumission :</span>
                  <span className="font-medium">{formatDate(document.submissionDate)}</span>
                </div>
                {document.approvedBy && (
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Approuvé par :</span>
                    <span className="font-medium">{document.approvedBy}</span>
                  </div>
                )}
                {document.assignedTo && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Assigné à :</span>
                    <span className="font-medium">{document.assignedTo}</span>
                  </div>
                )}
                {document.scheduledPublicationDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Publication prévue :</span>
                    <span className="font-medium">{formatDate(document.scheduledPublicationDate)}</span>
                  </div>
                )}
                {document.insertionType === 'ocr' && document.confidence && (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Confiance OCR :</span>
                    <span className="font-medium text-blue-600">{document.confidence}%</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Données OCR */}
          {document.ocrData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Données extraites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(document.ocrData).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 capitalize">{key} :</span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Catégorie */}
          {(document.legalCategory || document.procedureCategory) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Catégorie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-sm">
                  {document.legalCategory || document.procedureCategory}
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Commentaires et historique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Commentaires et historique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {document.comments && document.comments.length > 0 ? (
                <div className="space-y-3">
                  {document.comments.map((comment: Record<string, unknown>) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      {comment.type && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {comment.type}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Aucun commentaire</p>
              )}

              {/* Zone d'ajout de commentaire */}
              {onAddComment && setNewComment && (
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ajouter un commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 min-h-[80px]"
                    />
                    <Button onClick={handleAddComment} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {(document.status === 'pending' || document.status === 'under_review') && onApprove && (
            <>
              <Button 
                variant="outline" 
                onClick={() => onApprove(document.id)}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Approuver
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onRevision && onRevision(document.id)}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Révision
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onReject(document.id)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                Rejeter
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailModal;
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Eye } from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  type: 'legal' | 'procedure' | 'mixed';
  onApprove?: (comment: string) => void;
  onReject?: (reason: string) => void;
  onView?: () => void;
  showActions?: boolean;
}

export function ApprovalModal({ 
  isOpen, 
  onClose, 
  data, 
  type, 
  onApprove, 
  onReject, 
  onView, 
  showActions = true 
}: ApprovalModalProps) {
  const [comment, setComment] = React.useState('');
  const [rejectReason, setRejectReason] = React.useState('');
  const [showRejectForm, setShowRejectForm] = React.useState(false);

  const handleApprove = () => {
    onApprove?.(comment);
    setComment('');
    onClose();
  };

  const handleReject = () => {
    onReject?.(rejectReason);
    setRejectReason('');
    setShowRejectForm(false);
    onClose();
  };

  const renderContent = () => {
    if (type === 'legal') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Type de texte</Label>
              <p className="font-medium">{(data as any)?.textType || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Secteur</Label>
              <p className="font-medium">{(data as any)?.sector || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Institution</Label>
              <p className="font-medium">{(data as any)?.institution || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Date de création</Label>
              <p className="font-medium">{(data as any)?.creationDate || 'Non spécifiée'}</p>
            </div>
          </div>
          {(data as any)?.subject && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Objet</Label>
              <p className="mt-1">{(data as any).subject}</p>
            </div>
          )}
          {(data as any)?.content && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Contenu</Label>
              <div className="mt-1 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm">{(data as any).content}</p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Titre</Label>
              <p className="font-medium">{(data as any)?.title || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Catégorie</Label>
              <p className="font-medium">{(data as any)?.category || 'Non spécifiée'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Institution</Label>
              <p className="font-medium">{(data as any)?.institution || 'Non spécifiée'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Durée estimée</Label>
              <p className="font-medium">{(data as any)?.estimatedDuration || 'Non spécifiée'}</p>
            </div>
          </div>
          {(data as any)?.description && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
              <div className="mt-1 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm">{(data as any).description}</p>
              </div>
            </div>
          )}
          {((data as any)?.procedureSteps as any[])?.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Étapes ({((data as any)?.procedureSteps as any[])?.length})</Label>
              <div className="mt-1 space-y-2 max-h-32 overflow-y-auto">
                {(((data as any)?.procedureSteps as any[])?.length > 3 ? ((data as any)?.procedureSteps as any[])?.slice(0, 3) : ((data as any)?.procedureSteps as any[]))?.map((step: any, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    <span className="font-medium">{index + 1}.</span> {step.title || step.description}
                  </div>
                ))}
                {((data as any)?.procedureSteps as any[])?.length > 3 && (
                  <p className="text-xs text-muted-foreground">... et {((data as any)?.procedureSteps as any[])?.length - 3} autres étapes</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Prévisualisation pour approbation
            <Badge variant={type === 'legal' ? 'default' : 'secondary'}>
              {type === 'legal' ? 'Texte Juridique' : 'Procédure'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {renderContent()}

          {showActions && (
            <div className="border-t pt-4 space-y-4">
              {!showRejectForm ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Commentaire d'approbation (optionnel)</Label>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ajoutez un commentaire pour l'approbation..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleApprove} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approuver
                    </Button>
                    <Button variant="destructive" onClick={() => setShowRejectForm(true)} className="flex-1">
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Raison du rejet</Label>
                    <Textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Expliquez pourquoi ce contenu doit être rejeté..."
                      className="mt-1"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="destructive" 
                      onClick={handleReject} 
                      className="flex-1"
                      disabled={!rejectReason.trim()}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Confirmer le rejet
                    </Button>
                    <Button variant="outline" onClick={() => setShowRejectForm(false)} className="flex-1">
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
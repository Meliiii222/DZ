import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, X } from "lucide-react";

interface ProcedureSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnother: () => void;
  procedureData: Record<string, unknown>;
}

export function ProcedureSummaryModal({
  isOpen,
  onClose,
  onAddAnother,
  procedureData
}: ProcedureSummaryModalProps) {
  if (!procedureData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Procédure ajoutée avec succès
          </DialogTitle>
          <DialogDescription>
            La procédure administrative a été enregistrée et est maintenant disponible dans le système.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">
              {String(procedureData.title || procedureData.name || "Nouvelle procédure")}
            </h3>
            <p className="text-green-700 text-sm">
              La procédure a été soumise et est en attente d'approbation.
            </p>
          </div>

          {procedureData.description && (
            <div>
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-gray-600 text-sm">{String(procedureData.description)}</p>
            </div>
          )}

          {procedureData.category && (
            <div>
              <h4 className="font-medium mb-2">Catégorie:</h4>
              <p className="text-gray-600 text-sm">{String(procedureData.category)}</p>
            </div>
          )}

          {procedureData.institution && (
            <div>
              <h4 className="font-medium mb-2">Institution:</h4>
              <p className="text-gray-600 text-sm">{String(procedureData.institution)}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Fermer
            </Button>
            <Button onClick={onAddAnother}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une autre procédure
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
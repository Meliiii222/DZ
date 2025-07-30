import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Download, 
  Share2, 
  Clock, 
  Users, 
  MapPin, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Building
} from 'lucide-react';

interface ProcedureConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  procedure: any;
}

export function ProcedureConsultationModal({ isOpen, onClose, procedure }: ProcedureConsultationModalProps) {
  if (!procedure) return null;

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Complexe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'En révision': return 'bg-yellow-100 text-yellow-800';
      case 'Suspendu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span className="text-lg font-semibold text-emerald-600">
                {procedure.title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Badges de statut */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getComplexityColor(procedure.complexity)}>
              {procedure.complexity}
            </Badge>
            <Badge className={getStatusColor(procedure.status)}>
              {procedure.status}
            </Badge>
            <Badge variant="outline" className="text-emerald-600">
              {procedure.category}
            </Badge>
          </div>

          {/* Informations principales */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Durée:</span>
                  <span className="font-medium">{procedure.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Audience:</span>
                  <span className="font-medium">{procedure.audience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Organisation:</span>
                  <span className="font-medium">{procedure.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Dernière MAJ:</span>
                  <span className="font-medium">{procedure.lastUpdate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">
                {procedure.description}
              </p>
            </CardContent>
          </Card>

          {/* Documents requis */}
          {procedure.requiredDocuments && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents requis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {procedure.requiredDocuments.map((doc: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Étapes */}
          {procedure.steps && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Étapes à suivre</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {procedure.steps.map((step: string, index: number) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Commencer la procédure
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
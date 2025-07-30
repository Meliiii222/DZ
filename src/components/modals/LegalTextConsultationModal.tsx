import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Download, 
  Share2, 
  Calendar, 
  Building, 
  Scale, 
  FileText, 
  ExternalLink,
  BookOpen,
  Tag,
  Globe,
  User
} from 'lucide-react';

interface LegalTextConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: any;
}

export function LegalTextConsultationModal({ isOpen, onClose, text }: LegalTextConsultationModalProps) {
  if (!text) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur': return 'bg-green-100 text-green-800';
      case 'Abrogé': return 'bg-red-100 text-red-800';
      case 'Modifié': return 'bg-yellow-100 text-yellow-800';
      case 'En projet': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Constitution': return 'bg-purple-100 text-purple-800';
      case 'Loi': return 'bg-blue-100 text-blue-800';
      case 'Décret': return 'bg-emerald-100 text-emerald-800';
      case 'Arrêté': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold text-blue-600">
                {text.title}
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
            <Badge className={getTypeColor(text.type)}>
              {text.type}
            </Badge>
            <Badge className={getStatusColor(text.status)}>
              {text.status}
            </Badge>
            {text.domain && (
              <Badge variant="outline" className="text-blue-600">
                {text.domain}
              </Badge>
            )}
          </div>

          {/* Informations principales */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Date de publication:</span>
                  <span className="font-medium">{text.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Journal Officiel:</span>
                  <span className="font-medium">{text.joNumber}</span>
                </div>
                {text.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Organisation:</span>
                    <span className="font-medium">{text.organization}</span>
                  </div>
                )}
                {text.signatory && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Signataire:</span>
                    <span className="font-medium">{text.signatory}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description/Objet */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Objet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">
                {text.description || "Ce texte définit les règles et procédures applicables dans le cadre de la législation algérienne."}
              </p>
            </CardContent>
          </Card>

          {/* Contenu/Articles principaux */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Contenu principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {text.content || "Le présent texte définit les règles et procédures applicables dans le cadre de la législation algérienne. Il établit les dispositions nécessaires à l'application des mesures prévues et précise les modalités d'exécution."}
                  </p>
                </div>
                
                {text.articles && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Articles clés:</h4>
                    <ul className="space-y-1">
                      {text.articles.slice(0, 3).map((article: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 font-medium">Art. {index + 1}:</span>
                          <span className="text-gray-700">{article}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Références et liens */}
          {(text.references || text.relatedTexts) && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Références et textes liés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {text.references && (
                    <div>
                      <span className="text-gray-600">Références:</span>
                      <ul className="mt-1 space-y-1">
                        {text.references.map((ref: string, index: number) => (
                          <li key={index} className="text-blue-600 hover:underline cursor-pointer">
                            • {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {text.relatedTexts && (
                    <div>
                      <span className="text-gray-600">Textes connexes:</span>
                      <ul className="mt-1 space-y-1">
                        {text.relatedTexts.map((related: string, index: number) => (
                          <li key={index} className="text-emerald-600 hover:underline cursor-pointer">
                            • {related}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir le texte complet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
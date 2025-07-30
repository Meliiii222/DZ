import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buttonHandlers } from '@/utils/buttonUtils';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Calendar, 
  User, 
  Hash, 
  Tag, 
  Eye, 
  Download,
  Printer,
  Maximize2,
  Info,
  Clock,
  CheckCircle
} from 'lucide-react';

interface DocumentData {
  id: string;
  title: string;
  type: string;
  submittedBy: string;
  submissionDate: Date;
  status: string;
  confidence?: number;
  priority?: string;
  ocrData?: {
    numero?: string;
    dateGregorienne?: string;
    dateHijri?: string;
    reference?: string;
    categorie?: string;
  };
  // Contenu simulé du document
  content?: string | {
    preambule?: string;
    articles?: Array<{
      numero: string;
      titre: string;
      contenu: string;
    }>;
    dispositionsFinales?: string;
  };
}

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    title: string;
    content?: string | {
      preambule?: string;
      articles?: Array<{
        numero: string;
        titre: string;
        contenu: string;
      }>;
      dispositionsFinales?: string;
    };
    type?: string;
    id?: string;
    submittedBy?: string;
    submissionDate?: Date;
    status?: string;
    confidence?: number;
    priority?: string;
    ocrData?: {
      numero?: string;
      dateGregorienne?: string;
      dateHijri?: string;
      reference?: string;
      categorie?: string;
    };
  } | null;
}

export function DocumentViewerModal({ isOpen, onClose, document }: DocumentViewerModalProps) {
  if (!document) return null;

  // Contenu simulé basé sur le type de document
  const getDocumentContent = () => {
    const isLegalText = document.type.toLowerCase().includes('loi') || 
                       document.type.toLowerCase().includes('décret') || 
                       document.type.toLowerCase().includes('arrêté');
    
    if (isLegalText) {
      return {
        preambule: `RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE

MINISTÈRE DE LA JUSTICE

${document.title}

Vu la Constitution, notamment ses articles 140, 141 et 143 ;
Vu la loi n° 12-06 du 18 Safar 1433 correspondant au 12 janvier 2012 relative aux associations ;
Vu le décret présidentiel n° 19-240 du 2 Safar 1441 correspondant au 1er octobre 2019 portant nomination des membres du Gouvernement ;

DÉCIDE :`,
        articles: [
          {
            numero: "Article 1er",
            titre: "Objet",
            contenu: "Le présent décret a pour objet de définir les modalités d'application des dispositions relatives à la modernisation administrative et à l'amélioration des services publics."
          },
          {
            numero: "Article 2",
            titre: "Champ d'application",
            contenu: "Les dispositions du présent décret s'appliquent à l'ensemble des administrations publiques, des établissements publics à caractère administratif et des collectivités territoriales."
          },
          {
            numero: "Article 3",
            titre: "Définitions",
            contenu: "Au sens du présent décret, on entend par :\n- Service public : toute activité d'intérêt général exercée par une personne publique ;\n- Usager : toute personne physique ou morale qui bénéficie d'un service public ;\n- Modernisation : l'amélioration continue des processus et des services."
          },
          {
            numero: "Article 4",
            titre: "Principes généraux",
            contenu: "Les services publics sont organisés selon les principes de continuité, d'égalité, d'adaptabilité et de transparence. Ils doivent garantir un accès équitable à tous les usagers."
          }
        ],
        dispositionsFinales: `Article 15 : Le présent décret sera publié au Journal officiel de la République algérienne démocratique et populaire.

Fait à Alger, le ${document.ocrData?.dateGregorienne || 'date non spécifiée'}.

Le Premier Ministre,
[Signature]

Le Ministre de la Justice, Garde des Sceaux,
[Signature]`
      };
    } else {
      // Contenu pour procédures administratives
      return {
        preambule: `PROCÉDURE ADMINISTRATIVE

${document.title}

RÉFÉRENCE : ${document.ocrData?.reference || 'REF-PROC-2025-001'}
CATÉGORIE : ${document.ocrData?.categorie || 'Administrative'}

Cette procédure définit les étapes et modalités à suivre pour traiter les demandes relatives aux services administratifs.`,
        articles: [
          {
            numero: "Étape 1",
            titre: "Dépôt de la demande",
            contenu: "Le demandeur doit constituer un dossier complet comprenant :\n- Formulaire de demande dûment rempli\n- Pièces justificatives requises\n- Copie de la pièce d'identité\n- Justificatifs de domicile"
          },
          {
            numero: "Étape 2",
            titre: "Examen de recevabilité",
            contenu: "Le service compétent examine la recevabilité du dossier dans un délai de 5 jours ouvrables. En cas de dossier incomplet, une notification est adressée au demandeur."
          },
          {
            numero: "Étape 3",
            titre: "Instruction du dossier",
            contenu: "L'instruction du dossier comprend la vérification des pièces, l'enquête administrative si nécessaire, et l'évaluation de la conformité aux critères requis."
          },
          {
            numero: "Étape 4",
            titre: "Décision et notification",
            contenu: "La décision est prise dans un délai maximum de 30 jours. Le demandeur est notifié par courrier recommandé ou par voie électronique."
          }
        ],
        dispositionsFinales: `DOCUMENTS REQUIS :
- Formulaire officiel
- Pièce d'identité
- Justificatifs selon la nature de la demande

DÉLAIS :
- Examen de recevabilité : 5 jours
- Instruction : 30 jours maximum
- Recours : 60 jours après notification

Pour plus d'informations, contacter le service concerné.`
      };
    }
  };

  const content = typeof document.content === 'string' ? 
    { preambule: document.content } : 
    (document.content || getDocumentContent());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'needs_revision': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'under_review': return 'En cours d\'examen';
      case 'approved': return 'Approuvé';
      case 'needs_revision': return 'Révision nécessaire';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Visualisation du document
                </div>
              </DialogTitle>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Badge variant="outline">{document.type || 'Document'}</Badge>
                {document.status && (
                  <Badge className={getStatusColor(document.status)}>
                    {getStatusText(document.status)}
                  </Badge>
                )}
                {document.confidence && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Confiance OCR: {document.confidence}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={buttonHandlers.downloadDocument(document.id?.toString() || '1', document.title)}
              >
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={buttonHandlers.generic(`Imprimer: ${document.title}`, 'Impression du document', 'Documents')}
              >
                <Printer className="h-4 w-4 mr-1" />
                Imprimer
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={buttonHandlers.generic(`Plein écran: ${document.title}`, 'Mode plein écran', 'Documents')}
              >
                <Maximize2 className="h-4 w-4 mr-1" />
                Plein écran
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6 pt-0">
          <Tabs defaultValue="document" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="document">
                <FileText className="h-4 w-4 mr-1" />
                Document
              </TabsTrigger>
              <TabsTrigger value="metadata">
                <Info className="h-4 w-4 mr-1" />
                Métadonnées
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="h-4 w-4 mr-1" />
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="h-full mt-4">
              <Card className="h-full">
                <ScrollArea className="h-full p-6">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* En-tête du document */}
                    <div className="text-center border-b pb-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {document.title}
                      </h1>
                      <div className="text-sm text-gray-600">
                        {document.ocrData?.numero && (
                          <p>Numéro: {document.ocrData.numero}</p>
                        )}
                        {document.ocrData?.dateGregorienne && (
                          <p>Date: {document.ocrData.dateGregorienne}</p>
                        )}
                        {document.ocrData?.dateHijri && (
                          <p>Date hijri: {document.ocrData.dateHijri}</p>
                        )}
                      </div>
                    </div>

                    {/* Préambule */}
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {content.preambule}
                    </div>

                    {/* Articles */}
                    <div className="space-y-6">
                      {content.articles?.map((article, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {article.numero} - {article.titre}
                          </h3>
                          <div className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                            {article.contenu}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dispositions finales */}
                    {content.dispositionsFinales && (
                      <div className="border-t pt-6">
                        <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                          {content.dispositionsFinales}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="h-full mt-4">
              <Card className="h-full p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Informations générales</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-500" />
                        <span className="text-sm"><strong>ID:</strong> {document.id || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span className="text-sm"><strong>Type:</strong> {document.type || 'Document'}</span>
                      </div>
                      {document.submittedBy && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm"><strong>Soumis par:</strong> {document.submittedBy}</span>
                        </div>
                      )}
                      {document.submissionDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm"><strong>Date de soumission:</strong> {document.submissionDate.toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Données OCR</h3>
                    <div className="space-y-3">
                      {document.ocrData?.numero && (
                        <div className="text-sm">
                          <strong>Numéro:</strong> {document.ocrData.numero}
                        </div>
                      )}
                      {document.ocrData?.dateGregorienne && (
                        <div className="text-sm">
                          <strong>Date grégorienne:</strong> {document.ocrData.dateGregorienne}
                        </div>
                      )}
                      {document.ocrData?.dateHijri && (
                        <div className="text-sm">
                          <strong>Date hijri:</strong> {document.ocrData.dateHijri}
                        </div>
                      )}
                      {document.ocrData?.reference && (
                        <div className="text-sm">
                          <strong>Référence:</strong> {document.ocrData.reference}
                        </div>
                      )}
                      {document.confidence && (
                        <div className="text-sm">
                          <strong>Confiance OCR:</strong> {document.confidence}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="h-full mt-4">
              <Card className="h-full p-6">
                <h3 className="font-semibold text-lg mb-4">Historique des actions</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Document soumis</div>
                      <div className="text-xs text-gray-600">
                        {document.submissionDate?.toLocaleString('fr-FR') || 'Date inconnue'} par {document.submittedBy || 'Utilisateur inconnu'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">En attente d'examen</div>
                      <div className="text-xs text-gray-600">
                        Document en file d'attente pour validation
                      </div>
                    </div>
                  </div>
                  
                  {document.status === 'approved' && (
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <div className="text-sm font-medium">Document approuvé</div>
                        <div className="text-xs text-gray-600">
                          Validation effectuée avec succès
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
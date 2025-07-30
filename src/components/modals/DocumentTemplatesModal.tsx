import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye, Star, FileText } from 'lucide-react';

interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  previewUrl?: string;
}

interface DocumentTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function DocumentTemplatesModal({ isOpen, onClose, category }: DocumentTemplatesModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Génération dynamique de modèles selon la catégorie
  const getTemplatesForCategory = (categoryName: string): DocumentTemplate[] => {
    const baseTemplates: Record<string, DocumentTemplate[]> = {
      "Contrats et accords": [
        {
          id: "contract-1",
          title: "Contrat de travail CDI",
          description: "Modèle standard de contrat à durée indéterminée conforme au droit du travail",
          type: "DOCX",
          size: "45 KB",
          downloadCount: 2340,
          rating: 4.8,
          tags: ["travail", "CDI", "employé", "droit social"]
        },
        {
          id: "contract-2", 
          title: "Accord de confidentialité",
          description: "NDA professionnel pour protection des informations sensibles",
          type: "PDF",
          size: "32 KB",
          downloadCount: 1890,
          rating: 4.6,
          tags: ["confidentialité", "NDA", "information", "protection"]
        },
        {
          id: "contract-3",
          title: "Contrat de prestation de services",
          description: "Cadre juridique pour missions de conseil et prestations",
          type: "DOCX",
          size: "38 KB", 
          downloadCount: 1567,
          rating: 4.7,
          tags: ["prestation", "services", "conseil", "mission"]
        }
      ],
      "Documents administratifs": [
        {
          id: "admin-1",
          title: "Demande d'autorisation commerciale",
          description: "Formulaire standard pour demandes d'autorisation d'activité commerciale",
          type: "PDF",
          size: "28 KB",
          downloadCount: 3200,
          rating: 4.9,
          tags: ["commerce", "autorisation", "activité", "entreprise"]
        },
        {
          id: "admin-2",
          title: "Déclaration de modification statutaire",
          description: "Document pour déclaration des modifications des statuts sociétaires",
          type: "DOCX",
          size: "41 KB",
          downloadCount: 1234,
          rating: 4.5,
          tags: ["statuts", "modification", "société", "déclaration"]
        }
      ],
      "Procédures judiciaires": [
        {
          id: "legal-1",
          title: "Requête en référé",
          description: "Modèle de requête pour procédure d'urgence devant le tribunal",
          type: "DOCX",
          size: "52 KB",
          downloadCount: 890,
          rating: 4.8,
          tags: ["référé", "urgence", "tribunal", "procédure"]
        },
        {
          id: "legal-2",
          title: "Assignation en justice",
          description: "Acte introductif d'instance pour contentieux civil",
          type: "PDF",
          size: "47 KB",
          downloadCount: 1123,
          rating: 4.6,
          tags: ["assignation", "justice", "civil", "contentieux"]
        }
      ]
    };

    return baseTemplates[categoryName] || [];
  };

  const templates = getTemplatesForCategory(category);
  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownload = (template: DocumentTemplate) => {
    // Simulation de téléchargement réel
    const fileName = `${template.title.replace(/\s+/g, '_')}.${template.type.toLowerCase()}`;
    const blob = new Blob([`Contenu du modèle: ${template.title}\n\nDescription: ${template.description}`], 
                         { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Modèles - {category}
            </DialogTitle>
          </DialogHeader>

          {/* Barre de recherche */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Liste des modèles */}
          <div className="space-y-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun modèle trouvé pour cette catégorie
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                        <p className="text-gray-600 mb-3">{template.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>Type: {template.type}</span>
                          <span>Taille: {template.size}</span>
                          <span>{template.downloadCount} téléchargements</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Aperçu
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(template)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale de prévisualisation */}
      <Dialog open={showPreview} onOpenChange={() => setShowPreview(false)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu - {selectedTemplate?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Description</h4>
                <p>{selectedTemplate.description}</p>
              </div>
              
              <div className="bg-white border-2 border-dashed border-gray-200 p-8 text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Aperçu du modèle: {selectedTemplate.title}
                </p>
                <p className="text-sm text-gray-500">
                  Ce modèle contient la structure et les clauses standards pour {selectedTemplate.title.toLowerCase()}.
                  Téléchargez le document pour accéder au contenu complet et modifiable.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                >
                  Fermer
                </Button>
                <Button
                  onClick={() => {
                    handleDownload(selectedTemplate);
                    setShowPreview(false);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
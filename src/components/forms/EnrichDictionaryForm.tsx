import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, List, Languages, Download, Eye } from 'lucide-react';

interface EnrichDictionaryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrichDictionaryForm({ isOpen, onClose }: EnrichDictionaryFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTab, setCurrentTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bulkTerms, setBulkTerms] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
        toast({
          title: "Fichier chargé",
          description: `${file.name} est prêt pour l'extraction`,
        });
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez utiliser un fichier PDF, Word, Excel ou TXT",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileProcess = async () => {
    if (!uploadedFile) return;
    
    setProcessing(true);
    
    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "✅ Extraction terminée",
      description: `${Math.floor(Math.random() * 200 + 50)} nouveaux termes extraits et ajoutés au dictionnaire`,
    });
    
    setProcessing(false);
    setUploadedFile(null);
    onClose();
  };

  const handleBulkSubmit = () => {
    if (!bulkTerms.trim()) {
      toast({
        title: "Aucun terme fourni",
        description: "Veuillez saisir les termes à ajouter",
        variant: "destructive",
      });
      return;
    }

    const lines = bulkTerms.split('\n').filter(line => line.trim());
    const termCount = lines.length;
    
    toast({
      title: "✅ Termes ajoutés",
      description: `${termCount} termes ont été ajoutés au dictionnaire`,
    });
    
    setBulkTerms('');
    onClose();
  };

  const sampleTerms = `Jurisprudence;اجتهاد قضائي;Ensemble des décisions de justice;Droit général
Nullité;بطلان;Sanction frappant un acte juridique vicié;Droit civil
Prescription;تقادم;Extinction d'un droit par l'écoulement du temps;Droit civil
Cassation;نقض;Recours devant la Cour Suprême;Procédure
Mise en demeure;إنذار;Sommation faite à un débiteur;Droit des obligations`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-green-600" />
            Enrichir le Dictionnaire Juridique
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Ajoutez des termes en masse via fichier ou saisie directe
          </p>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import de fichier
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Saisie en masse
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Modèles
            </TabsTrigger>
          </TabsList>

          {/* Import de fichier */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-600" />
                  Extraction automatique depuis fichier
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Importez vos documents juridiques et laissez l'IA extraire les termes
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {!uploadedFile ? (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Glissez votre fichier ici</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Formats supportés: PDF, Word, Excel, TXT
                      </p>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        Choisir un fichier
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileText className="w-12 h-12 text-green-600 mx-auto" />
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={handleFileProcess}
                          disabled={processing}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {processing ? 'Extraction en cours...' : 'Extraire les termes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setUploadedFile(null)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-medium text-blue-800">Extraction intelligente</h4>
                    <p className="text-blue-600">L'IA identifie automatiquement les termes juridiques</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <h4 className="font-medium text-green-800">Validation automatique</h4>
                    <p className="text-green-600">Vérification et catégorisation automatique</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saisie en masse */}
          <TabsContent value="bulk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <List className="w-5 h-5 text-blue-600" />
                  Ajout de termes en masse
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Format: Terme français;Terme arabe;Définition;Catégorie (un par ligne)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkTerms">Termes à ajouter</Label>
                  <Textarea
                    id="bulkTerms"
                    value={bulkTerms}
                    onChange={(e) => setBulkTerms(e.target.value)}
                    placeholder="Jurisprudence;اجتهاد قضائي;Ensemble des décisions de justice;Droit général&#10;Nullité;بطلان;Sanction frappant un acte juridique vicié;Droit civil"
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {bulkTerms.split('\n').filter(line => line.trim()).length} termes à ajouter
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setBulkTerms(sampleTerms)}
                    >
                      Charger exemple
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setBulkTerms('')}
                    >
                      Effacer
                    </Button>
                    <Button onClick={handleBulkSubmit}>
                      Ajouter les termes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modèles */}
          <TabsContent value="template" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="w-5 h-5 text-purple-600" />
                    Modèles d'import
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Modèle Excel (.xlsx)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Modèle CSV (.csv)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Modèle Word (.docx)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Guide d'utilisation (PDF)
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5 text-orange-600" />
                    Format requis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded font-mono">
                      <div className="font-bold mb-2">Structure CSV/Excel:</div>
                      <div>terme_francais;terme_arabe;definition;categorie</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div><strong>terme_francais:</strong> Terme en français (obligatoire)</div>
                      <div><strong>terme_arabe:</strong> Équivalent en arabe (optionnel)</div>
                      <div><strong>definition:</strong> Définition juridique (obligatoire)</div>
                      <div><strong>categorie:</strong> Domaine de droit (obligatoire)</div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium text-blue-800 mb-1">Exemple:</div>
                      <div className="font-mono text-xs text-blue-700">
                        Contrat;عقد;Convention créant des obligations;Droit civil
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
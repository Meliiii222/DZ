// @ts-nocheck
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'legal-texts' | 'procedures';
  onImportComplete?: (results: Record<string, unknown>[]) => void;
}

interface ImportResult {
  id: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: Record<string, unknown>;
}

export function BatchImportModal({ isOpen, onClose, context, onImportComplete }: BatchImportModalProps) {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setShowResults(false);
    setResults([]);
  }, []);

  const downloadTemplate = useCallback(() => {
    const headers = context === 'legal-texts' 
      ? ['Titre', 'Type', 'Contenu', 'Domaine Juridique', 'Mots-clés', 'Organisation', 'Date Publication']
      : ['Nom', 'Catégorie', 'Description', 'Institution', 'Durée', 'Coût', 'Exigences', 'Étapes'];
    
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `modele-import-${context}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    toast({
      title: "Modèle téléchargé",
      description: `Le modèle CSV pour ${context} a été téléchargé avec succès.`,
    });
  }, [context, toast]);

  const processFile = useCallback(async (file: File): Promise<ImportResult[]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',');
          
          const results: ImportResult[] = [];
          
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= headers.length - 1) {
              // Simuler le traitement réussi
              results.push({
                id: `import-${i}`,
                status: 'success',
                message: `Ligne ${i}: Importé avec succès`,
                data: headers.reduce((obj, header, index) => {
                  obj[header.trim()] = values[index]?.trim() || '';
                  return obj;
                }, {} as Record<string, unknown>)
              });
            } else {
              // Simuler une erreur
              results.push({
                id: `import-${i}`,
                status: 'error',
                message: `Ligne ${i}: Données manquantes ou incorrectes`
              });
            }
          }
          
          resolve(results);
        } catch (error) {
          resolve([{
            id: `file-${file.name}`,
            status: 'error',
            message: `Erreur lors du traitement du fichier: ${error}`
          }]);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  const handleImport = useCallback(async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un fichier à importer.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResults([]);
    setShowResults(false);

    try {
      const allResults: ImportResult[] = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setProgress(((i + 1) / selectedFiles.length) * 100);
        
        const fileResults = await processFile(file);
        allResults.push(...fileResults);
        
        // Simuler le délai de traitement
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setResults(allResults);
      setShowResults(true);
      
      const successCount = allResults.filter(r => r.status === 'success').length;
      const errorCount = allResults.filter(r => r.status === 'error').length;
      
      toast({
        title: "Import terminé",
        description: `${successCount} éléments importés avec succès, ${errorCount} erreurs.`,
        variant: errorCount > 0 ? "destructive" : "default"
      });
      
      if (onImportComplete) {
        onImportComplete(allResults);
      }
      
    } catch (error) {
      toast({
        title: "Erreur d'import",
        description: "Une erreur est survenue lors de l'import des fichiers.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFiles, processFile, toast, onImportComplete]);

  const handleClose = useCallback(() => {
    setSelectedFiles([]);
    setIsProcessing(false);
    setProgress(0);
    setResults([]);
    setShowResults(false);
    onClose();
  }, [onClose]);

  const getContextTitle = () => {
    return context === 'legal-texts' ? 'Textes Juridiques' : 'Procédures Administratives';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Import en lot - {getContextTitle()}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Télécharger</TabsTrigger>
            <TabsTrigger value="template">Modèle</TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>Résultats</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Fichiers à importer</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  multiple
                  onChange={handleFileSelect}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formats acceptés: CSV, Excel (.xlsx, .xls)
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Fichiers sélectionnés:</Label>
                  <div className="space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-2">
                  <Label>Progression de l'import</Label>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-gray-500">
                    Traitement en cours... {Math.round(progress)}%
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  disabled={selectedFiles.length === 0 || isProcessing}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Importation en cours...' : 'Lancer l\'import'}
                </Button>
                <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
                  Annuler
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Téléchargez le modèle CSV pour {getContextTitle().toLowerCase()} afin de préparer vos données dans le bon format.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Colonnes requises:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    {context === 'legal-texts' ? (
                      <>
                        <li>• Titre (obligatoire)</li>
                        <li>• Type (obligatoire)</li>
                        <li>• Contenu (obligatoire)</li>
                        <li>• Domaine Juridique</li>
                        <li>• Mots-clés (séparés par des points-virgules)</li>
                        <li>• Organisation</li>
                        <li>• Date Publication (format: YYYY-MM-DD)</li>
                      </>
                    ) : (
                      <>
                        <li>• Nom (obligatoire)</li>
                        <li>• Catégorie (obligatoire)</li>
                        <li>• Description (obligatoire)</li>
                        <li>• Institution</li>
                        <li>• Durée</li>
                        <li>• Coût</li>
                        <li>• Exigences (séparées par des points-virgules)</li>
                        <li>• Étapes (séparées par des points-virgules)</li>
                      </>
                    )}
                  </ul>
                </div>

                <Button onClick={downloadTemplate} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le modèle CSV
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {showResults && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {results.filter(r => r.status === 'success').length}
                    </div>
                    <div className="text-sm text-gray-600">Succès</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">
                      {results.filter(r => r.status === 'error').length}
                    </div>
                    <div className="text-sm text-gray-600">Erreurs</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded">
                    <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">
                      {results.filter(r => r.status === 'warning').length}
                    </div>
                    <div className="text-sm text-gray-600">Avertissements</div>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded border-l-4 ${
                        result.status === 'success' ? 'border-green-500 bg-green-50' :
                        result.status === 'error' ? 'border-red-500 bg-red-50' :
                        'border-yellow-500 bg-yellow-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {result.status === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : result.status === 'error' ? (
                          <XCircle className="w-4 h-4 text-red-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                        <span className="text-sm font-medium">{result.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
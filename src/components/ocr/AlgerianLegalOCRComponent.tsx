// @ts-nocheck
import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Brain, CheckCircle, AlertCircle, Loader2, Download, Eye, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { algerianOCRService, ExtractedData } from '@/services/ocrService';
import { algerianAIMappingService, MappingResult } from '@/services/aiMappingService';
import { useAlgerianNomenclatureData } from '@/hooks/useAlgerianNomenclatureData';
import { getSupportedAlgerianDocumentFormats, isAlgerianDocumentSupported } from '@/utils/algerianOCRExtractor';
import { extractAndAdaptAlgerianDocument } from '@/utils/algerianOCRAdapter';
import { AdvancedOCRConfigurationSection } from '@/components/configuration/AdvancedOCRConfigurationSection';

interface OCRProcessingState {
  status: 'idle' | 'uploading' | 'extracting' | 'mapping' | 'validating' | 'completed' | 'error';
  progress: number;
  currentStep: string;
  error?: string;
}

interface ProcessedDocument {
  file: File;
  extractedData: ExtractedData;
  mappingResult: MappingResult;
  selectedFormTemplate?: Record<string, unknown>;
}

export const AlgerianLegalOCRComponent: React.FC = () => {
  const [processingState, setProcessingState] = useState<OCRProcessingState>({
    status: 'idle',
    progress: 0,
    currentStep: ''
  });
  
  const [processedDocument, setProcessedDocument] = useState<ProcessedDocument | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { getAlgerianFormTemplateWithNomenclature } = useAlgerianNomenclatureData();

  // Gestion du drag & drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isSupported = isAlgerianDocumentSupported(file);
      
      if (isSupported) {
        setSelectedFile(file);
        toast({
          title: "Fichier accepté",
          description: `Format détecté: ${file.type || 'Extension: ' + file.name.split('.').pop()}`,
          variant: "default"
        });
      } else {
        toast({
          title: "Format non supporté",
          description: `Formats supportés: ${getSupportedAlgerianDocumentFormats().join(', ')}`,
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isSupported = isAlgerianDocumentSupported(file);
      
      if (isSupported) {
        setSelectedFile(file);
        toast({
          title: "Fichier accepté",
          description: `Format détecté: ${file.type || 'Extension: ' + file.name.split('.').pop()}`,
          variant: "default"
        });
      } else {
        toast({
          title: "Format non supporté",
          description: `Formats supportés: ${getSupportedAlgerianDocumentFormats().join(', ')}`,
          variant: "destructive"
        });
      }
    }
  };

  const updateProgress = (status: OCRProcessingState['status'], progress: number, currentStep: string) => {
    setProcessingState({ status, progress, currentStep });
  };

  const processDocument = async () => {
    if (!selectedFile) return;

    try {
      // Étape 1: Extraction depuis le fichier (PDF, Word, Excel, Image)
      updateProgress('extracting', 10, `Extraction depuis ${selectedFile.name}...`);
      
      const extractedData = await extractAndAdaptAlgerianDocument(selectedFile);
      
      updateProgress('extracting', 40, 'Structuration des données juridiques...');
      
      // Étape 2: Déterminer le template de formulaire approprié
      updateProgress('mapping', 60, 'Sélection du formulaire approprié...');
      
      const formTemplate = getAlgerianFormTemplateWithNomenclature(extractedData.structuredData.type);
      
      if (!formTemplate) {
        throw new Error(`Aucun formulaire trouvé pour le type: ${extractedData.structuredData.type}`);
      }

      // Étape 3: Mapping IA vers les champs du formulaire
      updateProgress('mapping', 75, 'Mapping intelligent des données...');
      
      const mappingResult = await algerianAIMappingService.mapToForm(extractedData, formTemplate);

      // Étape 4: Validation finale
      updateProgress('validating', 90, 'Validation des données mappées...');

      const processedDoc: ProcessedDocument = {
        file: selectedFile,
        extractedData,
        mappingResult,
        selectedFormTemplate: formTemplate
      };

      setProcessedDocument(processedDoc);
      updateProgress('completed', 100, 'Traitement terminé avec succès');

      toast({
        title: "🇩🇿 Document traité avec succès",
        description: `Confiance: ${Math.round(mappingResult.confidence)}% - ${mappingResult.detectedEntities.length} entités détectées`
      });

    } catch (error) {
      console.error('Erreur lors du traitement:', error);
      setProcessingState({
        status: 'error',
        progress: 0,
        currentStep: '',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });

      toast({
        title: "Erreur de traitement",
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: "destructive"
      });
    }
  };

  const resetProcess = () => {
    setProcessingState({ status: 'idle', progress: 0, currentStep: '' });
    setProcessedDocument(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exportResults = () => {
    if (!processedDocument) return;

    const exportData = {
      documentInfo: {
        filename: processedDocument.file.name,
        size: processedDocument.file.size,
        processedAt: new Date().toISOString()
      },
      extractedData: processedDocument.extractedData,
      mappingResult: processedDocument.mappingResult,
      formTemplate: processedDocument.selectedFormTemplate
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ocr_results_${processedDocument.file.name.replace('.pdf', '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveToApprovalWorkflow = () => {
    if (!processedDocument) return;
    
    // Ici, vous pouvez intégrer avec le système d'approbation existant
    toast({
      title: "Enregistré dans le fil d'approbation",
      description: "Le document a été ajouté au processus de validation.",
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">🇩🇿 DZ OCR-IA Juridique</h2>
        <AdvancedOCRConfigurationSection 
          showOCRProcessor={false}
          onShowOCRProcessor={() => {}}
        />
        <p className="text-gray-600">
          Extraction et structuration automatique des documents juridiques algériens
        </p>
      </div>

      {/* Zone d'upload */}
      {processingState.status === 'idle' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Téléchargement de document
            </CardTitle>
            <CardDescription>
              Glissez-déposez un document juridique algérien (PDF, Word, Excel, Image) ou cliquez pour sélectionner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Fichier sélectionné: {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={processDocument} className="bg-blue-600 hover:bg-blue-700">
                      <Brain className="w-4 h-4 mr-2" />
                      Traiter le document
                    </Button>
                    <Button variant="outline" onClick={resetProcess}>
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-gray-600 space-y-2">
                    <p>📄 <strong>Formats supportés :</strong> {getSupportedAlgerianDocumentFormats().join(', ')}</p>
                    <p>📏 <strong>Taille max :</strong> 50 MB</p>
                    <p>🇩🇿 <strong>Optimisé pour :</strong> Documents juridiques algériens</p>
                    <p>🤖 <strong>OCR intégré :</strong> Support automatique des images</p>
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>Types MIME :</strong> PDF, Word, Excel, Images (JPEG, PNG, etc.)
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Parcourir les fichiers
                  </Button>
                              <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.xlsx,.xls,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
              onChange={handleFileSelect}
              className="hidden"
            />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Indicateur de progression */}
      {processingState.status !== 'idle' && processingState.status !== 'completed' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Traitement en cours...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={processingState.progress} className="w-full" />
            <p className="text-sm text-gray-600">{processingState.currentStep}</p>
            
            {processingState.status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {processingState.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Résultats du traitement */}
      {processingState.status === 'completed' && processedDocument && (
        <div className="space-y-6">
          {/* Résumé des résultats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Traitement terminé
              </CardTitle>
              <CardDescription>
                Document: {processedDocument.file.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(processedDocument.mappingResult.confidence)}%
                  </div>
                  <div className="text-sm text-gray-500">Confiance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {processedDocument.mappingResult.detectedEntities.length}
                  </div>
                  <div className="text-sm text-gray-500">Entités détectées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {processedDocument.extractedData.metadata.pageCount}
                  </div>
                  <div className="text-sm text-gray-500">Pages traitées</div>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button onClick={exportResults} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter les résultats
                </Button>
                <Button onClick={saveToApprovalWorkflow} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer dans le fil d'approbation
                </Button>
                <Button onClick={resetProcess} variant="outline">
                  Nouveau document
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Détails du traitement */}
          <Tabs defaultValue="document-info" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="document-info">Document</TabsTrigger>
              <TabsTrigger value="extracted-data">Données extraites</TabsTrigger>
              <TabsTrigger value="form-mapping">Mapping formulaire</TabsTrigger>
              <TabsTrigger value="entities">Entités</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
            </TabsList>

            <TabsContent value="document-info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type de document</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Institution</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.institution}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Numéro</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Langue</label>
                      <Badge variant="outline">
                        {processedDocument.extractedData.metadata.language.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Titre</label>
                    <p className="text-sm mt-1">{processedDocument.extractedData.structuredData.title}</p>
                  </div>
                  
                  {processedDocument.extractedData.structuredData.dateHijri && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date hégirien</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.dateHijri}</p>
                    </div>
                  )}
                  
                  {processedDocument.extractedData.structuredData.dateGregorian && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date grégorien</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.dateGregorian}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extracted-data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Données extraites</CardTitle>
                  <CardDescription>
                    Texte et données extraits du document ({(processedDocument.extractedData as Record<string, unknown>).documentFormat || 'Format détecté'})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Format de fichier</label>
                        <p className="text-sm font-semibold text-blue-600">{(processedDocument.extractedData as Record<string, unknown>).documentFormat || 'PDF'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Confiance d'extraction</label>
                        <p className="text-sm font-semibold text-green-600">{Math.round(processedDocument.extractedData.confidence * 100)}%</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Articles détectés</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.articles?.length || 0}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Références juridiques</label>
                      <p className="text-sm">{processedDocument.extractedData.structuredData.references?.length || 0}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Tables extraites</label>
                      <p className="text-sm">{processedDocument.extractedData.tables?.length || 0}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Aperçu du contenu</label>
                      <div className="mt-2 p-3 bg-gray-50 rounded text-xs max-h-40 overflow-y-auto">
                        {processedDocument.extractedData.text?.substring(0, 500) || 'Aucun texte extrait'}...
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="form-mapping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mapping vers le formulaire</CardTitle>
                  <CardDescription>
                    Données mappées automatiquement vers les champs du formulaire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(processedDocument.mappingResult.formData).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium text-gray-700">{key}</span>
                        <span className="text-sm text-gray-600 max-w-xs truncate">
                          {value ? String(value) : 'Non renseigné'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Entités juridiques détectées</CardTitle>
                  <CardDescription>
                    Institutions, dates, références et concepts juridiques identifiés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {processedDocument.mappingResult.detectedEntities.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{entity.type}</Badge>
                          <span className="text-sm font-medium">{entity.text}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            Confiance: {Math.round(entity.confidence * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Validation des données</CardTitle>
                  <CardDescription>
                    Erreurs et suggestions de validation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {processedDocument.mappingResult.validationErrors.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-green-600 font-medium">Toutes les validations sont passées</p>
                      <p className="text-sm text-gray-500">Aucune erreur détectée dans les données mappées</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {processedDocument.mappingResult.validationErrors.map((error, index) => (
                        <Alert key={index} variant={error.severity === 'error' ? 'destructive' : 'default'}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{error.fieldName}:</strong> {error.message}
                            {error.suggestion && (
                              <div className="mt-1 text-xs text-gray-600">
                                Suggestion: {error.suggestion}
                              </div>
                            )}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AlgerianLegalOCRComponent;
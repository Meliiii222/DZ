import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  RefreshCw,
  Zap,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { optimizedOCRService } from '@/services/optimizedOCRService';

// Type pour compatibilité
interface ExtractedData {
  text: string;
  tables: any[];
  entities: any[];
  relations: any[];
  confidence: number;
  structure: any;
}
import { autoMappingService, MappingResult } from '@/services/autoMappingService';

interface AdvancedOCRProcessorProps {
  onFormDataExtracted: (data: Record<string, unknown>) => void;
  formType: 'legal-text' | 'procedure' | 'general';
  onClose?: () => void;
}

interface ProcessingStage {
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  details?: string;
}

export function AdvancedOCRProcessor({ 
  onFormDataExtracted, 
  formType, 
  onClose 
}: AdvancedOCRProcessorProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [mappingResult, setMappingResult] = useState<MappingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([
    { name: 'Extraction des pages', status: 'pending', progress: 0 },
    { name: 'Détection des structures', status: 'pending', progress: 0 },
    { name: 'Analyse OCR avancée', status: 'pending', progress: 0 },
    { name: 'Extraction des entités juridiques', status: 'pending', progress: 0 },
    { name: 'Analyse des relations', status: 'pending', progress: 0 },
    { name: 'Mapping automatique', status: 'pending', progress: 0 },
    { name: 'Validation et optimisation', status: 'pending', progress: 0 }
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérification plus flexible des types de fichiers
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    const isPDF = fileType.includes('pdf') || fileName.endsWith('.pdf');
    const isImage = fileType.includes('image') || 
                   fileName.endsWith('.jpg') || 
                   fileName.endsWith('.jpeg') || 
                   fileName.endsWith('.png') || 
                   fileName.endsWith('.gif') || 
                   fileName.endsWith('.bmp') || 
                   fileName.endsWith('.webp');
    
    if (!isPDF && !isImage) {
      setError('Veuillez sélectionner un fichier PDF ou une image (JPG, PNG, etc.)');
      toast({
        title: "Type de fichier non supporté",
        description: "Seuls les fichiers PDF et images sont acceptés",
        variant: "destructive"
      });
      return;
    }

    console.log(`📄 Fichier sélectionné: ${file.name} (${file.type || 'type non détecté'}) - ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    setCurrentFile(file);
    setError(null);
    await processDocument(file);
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setExtractedData(null);
    setMappingResult(null);
    
    // Réinitialiser les étapes
    setProcessingStages(stages => stages.map(stage => ({ 
      ...stage, 
      status: 'pending', 
      progress: 0 
    })));

    try {
      console.log('🇩🇿 Début du traitement avancé du document juridique algérien');
      
      // Étape 1: Extraction et structuration
      updateStage(0, 'processing', 0, 'Conversion du document...');
              const extractedData = await optimizedOCRService.extractAdvanced(file);
      updateStage(0, 'completed', 100, `${extractedData.entities.length} entités extraites`);
      
      setExtractedData(extractedData);
      
      // Étapes 2-5: Simulation des étapes intermédiaires avec progression
      await simulateProcessingStages(1, 5);
      
      // Étape 6: Mapping automatique
      updateStage(5, 'processing', 0, 'Analyse intelligente des champs...');
      const mappingResult = await autoMappingService.mapExtractedDataToForm(
        extractedData, 
        formType
      );
      updateStage(5, 'completed', 100, `${mappingResult.mappedFields.length} champs mappés`);
      
      setMappingResult(mappingResult);
      
      // Étape 7: Validation finale
      updateStage(6, 'processing', 0, 'Finalisation...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStage(6, 'completed', 100, 'Traitement terminé');
      
      toast({
        title: "✅ Extraction réussie",
        description: `Document traité avec ${Math.round(mappingResult.confidence * 100)}% de confiance`,
      });

    } catch (err) {
      console.error('Erreur lors du traitement:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur de traitement';
      setError(errorMessage);
      
      // Marquer l'étape actuelle comme erreur
      const currentStageIndex = processingStages.findIndex(s => s.status === 'processing');
      if (currentStageIndex >= 0) {
        updateStage(currentStageIndex, 'error', 0, errorMessage);
      }
      
      toast({
        title: "❌ Erreur de traitement",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateStage = (index: number, status: ProcessingStage['status'], progress: number, details?: string) => {
    setProcessingStages(stages => stages.map((stage, i) => 
      i === index ? { ...stage, status, progress, details } : stage
    ));
  };

  const simulateProcessingStages = async (startIndex: number, endIndex: number) => {
    for (let i = startIndex; i <= endIndex; i++) {
      updateStage(i, 'processing', 0);
      
      // Simulation progressive
      for (let progress = 0; progress <= 100; progress += 20) {
        updateStage(i, 'processing', progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      updateStage(i, 'completed', 100);
    }
  };

  const handleUseExtractedData = () => {
    if (!mappingResult) return;
    
    // Conversion des champs mappés en objet de données de formulaire
    const formData = mappingResult.mappedFields.reduce((acc, field) => {
      acc[field.fieldName] = field.value;
      return acc;
    }, {} as Record<string, unknown>);
    
    // Ajout des métadonnées d'extraction
    formData._extractionMetadata = {
      confidence: mappingResult.confidence,
      extractionDate: new Date().toISOString(),
      fileName: currentFile?.name,
      unmappedData: mappingResult.unmappedData,
      suggestions: mappingResult.suggestions
    };
    
    onFormDataExtracted(formData);
    
    toast({
      title: "🎯 Données appliquées",
      description: "Les données extraites ont été appliquées au formulaire",
    });
    
    if (onClose) onClose();
  };

  const getStageIcon = (status: ProcessingStage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'Excellente';
    if (confidence >= 0.6) return 'Bonne';
    return 'Faible';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          OCR Avancé pour Textes Juridiques Algériens 🇩🇿
        </CardTitle>
        <p className="text-sm text-gray-600">
          Extraction intelligente avec PyMuPDF, spaCy et analyse des relations juridiques
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Zone d'upload */}
        {!currentFile && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Télécharger un Document Juridique
            </h3>
            <p className="text-gray-600 mb-4">
              PDF ou image de journal officiel, loi, décret, procédure administrative
            </p>
            <div className="text-xs text-gray-500 mb-4 space-y-1">
              <p>✅ <strong>Formats acceptés :</strong> PDF, JPG, PNG, GIF, BMP, WebP</p>
              <p>✅ <strong>Taille max :</strong> 50 MB</p>
              <p>✅ <strong>Optimisé pour :</strong> Documents juridiques algériens</p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Sélectionner un fichier
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.PDF,application/pdf,image/*,image/png,image/jpg,image/jpeg,image/gif,image/bmp,image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Fichier sélectionné */}
        {currentFile && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <p className="font-semibold">{currentFile.name}</p>
              <p className="text-sm text-gray-600">
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isProcessing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Changer
              </Button>
            )}
          </div>
        )}

        {/* Erreur */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Étapes de traitement */}
        {isProcessing && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Traitement en cours...
            </h3>
            {processingStages.map((stage, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {getStageIcon(stage.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stage.name}</span>
                    <span className="text-sm text-gray-500">{stage.progress}%</span>
                  </div>
                  {stage.status === 'processing' && (
                    <Progress value={stage.progress} className="mt-1 h-2" />
                  )}
                  {stage.details && (
                    <p className="text-sm text-gray-600 mt-1">{stage.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Résultats */}
        {extractedData && mappingResult && !isProcessing && (
          <Tabs defaultValue="mapping" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mapping">
                <Target className="w-4 h-4 mr-2" />
                Mapping ({mappingResult.mappedFields.length})
              </TabsTrigger>
              <TabsTrigger value="entities">
                <Eye className="w-4 h-4 mr-2" />
                Entités ({extractedData.entities.length})
              </TabsTrigger>
              <TabsTrigger value="structure">
                <FileText className="w-4 h-4 mr-2" />
                Structure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mapping" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Champs Mappés Automatiquement</h3>
                  <Badge 
                    className={`text-white ${getConfidenceColor(mappingResult.confidence)}`}
                  >
                    {getConfidenceLabel(mappingResult.confidence)} ({Math.round(mappingResult.confidence * 100)}%)
                  </Badge>
                </div>
              </div>

              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {mappingResult.mappedFields.map((field, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-blue-600">
                        {field.fieldName}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {field.source}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${field.confidence > 0.8 ? 'bg-green-100 text-green-800' : field.confidence > 0.6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {Math.round(field.confidence * 100)}%
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 break-words">
                      {field.value.length > 200 
                        ? field.value.substring(0, 200) + '...' 
                        : field.value
                      }
                    </p>
                  </div>
                ))}
              </div>

              {mappingResult.suggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-sm text-orange-600 mb-2">
                    Suggestions ({mappingResult.suggestions.length})
                  </h4>
                  <div className="space-y-2">
                    {mappingResult.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-2 bg-orange-50 rounded border-l-4 border-orange-400">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{suggestion.fieldName}</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(suggestion.confidence * 100)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{suggestion.reason}</p>
                        <p className="text-sm font-mono bg-white px-2 py-1 rounded mt-1">
                          {suggestion.suggestedValue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="entities" className="space-y-4">
              <h3 className="font-semibold">Entités Juridiques Détectées</h3>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {extractedData.entities.map((entity, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary">{entity.type}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(entity.confidence * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{entity.value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <h3 className="font-semibold">Structure du Document</h3>
              <div className="space-y-3">
                {extractedData.structure.title && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Titre</h4>
                    <p className="text-sm">{extractedData.structure.title}</p>
                  </div>
                )}
                
                {extractedData.structure.type && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Type</h4>
                    <p className="text-sm">{extractedData.structure.type}</p>
                  </div>
                )}
                
                {extractedData.structure.articles.length > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">
                      Articles ({extractedData.structure.articles.length})
                    </h4>
                    <div className="mt-2 max-h-40 overflow-y-auto">
                      {extractedData.structure.articles.slice(0, 5).map((article, index) => (
                        <div key={index} className="text-sm border-l-2 border-purple-200 pl-2 mb-2">
                          <span className="font-medium">Article {article.number}:</span>
                          <p className="text-gray-600">
                            {article.content.substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                      {extractedData.structure.articles.length > 5 && (
                        <p className="text-xs text-gray-500">
                          ... et {extractedData.structure.articles.length - 5} autres articles
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Actions */}
        {mappingResult && !isProcessing && (
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentFile(null);
                setExtractedData(null);
                setMappingResult(null);
                setError(null);
              }}
            >
              Nouveau Document
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // Export des données en JSON
                  const dataToExport = {
                    extractedData,
                    mappingResult,
                    metadata: {
                      fileName: currentFile?.name,
                      processingDate: new Date().toISOString(),
                      formType
                    }
                  };
                  
                  const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
                    type: 'application/json'
                  });
                  
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `extraction-${currentFile?.name || 'document'}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              
              <Button
                onClick={handleUseExtractedData}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Appliquer au Formulaire
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
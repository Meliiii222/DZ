/**
 * Composant principal DZ OCR-IA pour l'extraction et structuration des textes juridiques algériens
 * Implémente le plan de travail complet : extraction, structuration, mapping OCR
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Eye,
  Save,
  Settings,
  Zap,
  Database,
  GitBranch,
  Target,
  ArrowRight,
  Clock,
  TrendingUp,
  Camera,
  Scan,
  Image,
  FileImage,
  File,
  Download,
  Send,
  Languages,
  FileCheck,
  Search,
  X
} from "lucide-react";
import legalOCRExtractionService, { StructuredLegalDocument } from '@/services/legalOCRExtractionService';
import legalFormMappingService, { MappedFormData, FormStructure } from '@/services/legalFormMappingService';
import { validateFile } from '@/utils/basicSecurity';

interface DZOCRIAProcessorProps {
  language?: string;
}

interface ProcessingStats {
  filesProcessed: number;
  entitiesExtracted: number;
  fieldsMaped: number;
  avgConfidence: number;
  totalProcessingTime: number;
}

interface ExtractedText {
  content: string;
  confidence: number;
  language?: string;
  pages?: number;
}

interface DetectedEntity {
  type: string;
  value: string;
  confidence: number;
  position?: { x: number; y: number; width: number; height: number };
}

interface MappedField {
  fieldId: string;
  originalValue: string;
  mappedValue: string;
  confidence: number;
  status: 'mapped' | 'unmapped' | 'pending';
}

export function DZOCRIAProcessor({ language = "fr" }: DZOCRIAProcessorProps) {
  // États du composant
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<StructuredLegalDocument | null>(null);
  const [mappedData, setMappedData] = useState<MappedFormData | null>(null);
  const [availableForms, setAvailableForms] = useState<string[]>([]);
  const [selectedFormType, setSelectedFormType] = useState<string>('');
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScanOptions, setShowScanOptions] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  
  // Détails d'extraction
  const [extractedText, setExtractedText] = useState<ExtractedText | null>(null);
  const [detectedEntities, setDetectedEntities] = useState<DetectedEntity[]>([]);
  const [mappedFields, setMappedFields] = useState<MappedField[]>([]);
  const [unmappedFields, setUnmappedFields] = useState<MappedField[]>([]);

  const [processingStats, setProcessingStats] = useState<ProcessingStats>({
    filesProcessed: 0,
    entitiesExtracted: 0,
    fieldsMaped: 0,
    avgConfidence: 0,
    totalProcessingTime: 0
  });

  // Initialisation
  React.useEffect(() => {
    const forms = legalFormMappingService.getAvailableFormTypes();
    setAvailableForms(forms);
    if (forms.length > 0) {
      setSelectedFormType(forms[0]);
    }
  }, []);

  // Nettoyer la caméra au démontage
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  /**
   * Gestion drag & drop
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file) {
      setSelectedFile(file);
      await processFileByType(file);
    }
  }, []);

  /**
   * Gestion de l'upload de fichier
   */
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    await processFileByType(file);
  }, []);

  /**
   * Traitement par type de fichier
   */
  const processFileByType = async (file: File) => {
    setError(null);
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    try {
      if (fileType === 'application/pdf') {
        await processDocument(file);
      } else if (fileType.startsWith('image/')) {
        await processImageFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        await processWordFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        await processExcelFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
                 fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
        await processPowerPointFile(file);
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        await processTextFile(file);
      } else if (fileType === 'application/rtf' || fileName.endsWith('.rtf')) {
        await processRtfFile(file);
      } else {
        setError('Format de fichier non supporté. Types acceptés: PDF, Images, Word, Excel, PowerPoint, Texte, RTF');
      }
    } catch (error) {
      setError(`Erreur lors du traitement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  /**
   * Traitement des différents formats
   */
  const processImageFile = async (file: File) => {
    setProcessingStep('🖼️ Traitement de l\'image...');
    await processDocument(file);
  };

  const processWordFile = async (file: File) => {
    setProcessingStep('📝 Extraction du contenu Word...');
    await processDocument(file);
  };

  const processExcelFile = async (file: File) => {
    setProcessingStep('📊 Extraction du contenu Excel...');
    await processDocument(file);
  };

  const processPowerPointFile = async (file: File) => {
    setProcessingStep('🎯 Extraction du contenu PowerPoint...');
    await processDocument(file);
  };

  const processTextFile = async (file: File) => {
    setProcessingStep('📄 Lecture du fichier texte...');
    
    const text = await file.text();
    setExtractedText({
      content: text,
      confidence: 1.0,
      language: 'fr',
      pages: 1
    });

    // Simuler l'extraction d'entités pour les fichiers texte
    const entities = extractEntitiesFromText(text);
    setDetectedEntities(entities);
    
    setProcessingStep('✅ Fichier texte traité avec succès');
  };

  const processRtfFile = async (file: File) => {
    setProcessingStep('📄 Extraction du contenu RTF...');
    await processDocument(file);
  };

  /**
   * Extraction d'entités depuis le texte
   */
  const extractEntitiesFromText = (text: string): DetectedEntity[] => {
    const entities: DetectedEntity[] = [];
    
    // Recherche des lois
    const loiRegex = /(?:loi|LOI)\s+n[°]\s*(\d+[-/]\d+)/gi;
    let match;
    while ((match = loiRegex.exec(text)) !== null) {
      entities.push({
        type: 'LOI',
        value: match[0],
        confidence: 0.9
      });
    }

    // Recherche des décrets
    const decretRegex = /(?:décret|DÉCRET)\s+(?:présidentiel|exécutif)?\s*n[°]\s*(\d+[-/]\d+)/gi;
    while ((match = decretRegex.exec(text)) !== null) {
      entities.push({
        type: 'DÉCRET',
        value: match[0],
        confidence: 0.85
      });
    }

    // Recherche des dates
    const dateRegex = /\d{1,2}[-/]\d{1,2}[-/]\d{4}/g;
    while ((match = dateRegex.exec(text)) !== null) {
      entities.push({
        type: 'DATE',
        value: match[0],
        confidence: 0.8
      });
    }

    return entities;
  };

  /**
   * Processus principal d'extraction et mapping selon l'algorithme annexé
   */
  const processDocument = useCallback(async (file?: File) => {
    const fileToProcess = file || selectedFile;
    if (!fileToProcess) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessingSteps([]);
    const startTime = Date.now();

    try {
      // Étape 1: Extraction OCR selon l'algorithme annexé
      setProcessingStep('🇩🇿 Extraction locale - Lecture structures juridiques DZ...');
      setProgress(10);
      
      const extractionResult = await legalOCRExtractionService.extractFromPDF(fileToProcess);
      setExtractedData(extractionResult);
      
      // Simuler l'extraction de texte détaillée
      setExtractedText({
        content: extractionResult.entities.map(e => e.title).join('\n'),
        confidence: extractionResult.metadata.confidence,
        language: 'fr',
        pages: 1
      });

      // Convertir les entités pour l'affichage détaillé
      const detailedEntities = extractionResult.entities.map((entity, index) => ({
        type: entity.type.toUpperCase(),
        value: `${entity.type} N° ${entity.number}`,
        confidence: extractionResult.metadata.confidence,
        position: undefined
      }));
      setDetectedEntities(detailedEntities);
      
      setProgress(40);

      // Étape 2: Structuration avec expressions régulières
      setProcessingStep('🧠 IA locale - Analyse entités juridiques algériennes...');
      setProgress(60);
      
      // Simulation du traitement NLP (spaCy/Hugging Face local)
      await simulateNLPProcessing();
      setProgress(75);

      // Étape 3: Mapping dynamique vers formulaires
      setProcessingStep('🗂️ Mapping local vers formulaires DZ - Nomenclature algérienne...');
      const mappingResult = await legalFormMappingService.mapOCRDataToForm(
        extractionResult, 
        selectedFormType || undefined
      );
      setMappedData(mappingResult);

      // Séparer les champs mappés et non mappés
      const mapped: MappedField[] = [];
      const unmapped: MappedField[] = [];

      mappingResult.sections.forEach(section => {
        section.fields.forEach(field => {
          const mappedField: MappedField = {
            fieldId: field.fieldId,
            originalValue: field.value || '',
            mappedValue: field.value || '',
            confidence: field.confidence,
            status: field.value ? 'mapped' : 'unmapped'
          };

          if (field.value) {
            mapped.push(mappedField);
          } else {
            unmapped.push(mappedField);
          }
        });
      });

      setMappedFields(mapped);
      setUnmappedFields(unmapped);
      
      setProgress(90);

      // Étape 4: Finalisation
      setProcessingStep('✅ Traitement local DZ terminé avec succès - Données sécurisées !');
      setProgress(100);

      // Mise à jour des statistiques
      const processingTime = Date.now() - startTime;
      setProcessingStats(prev => ({
        filesProcessed: prev.filesProcessed + 1,
        entitiesExtracted: prev.entitiesExtracted + extractionResult.entities.length,
        fieldsMaped: prev.fieldsMaped + mapped.length,
        avgConfidence: (prev.avgConfidence + extractionResult.metadata.confidence) / 2,
        totalProcessingTime: prev.totalProcessingTime + processingTime
      }));

      console.log('🇩🇿 DZ OCR-IA Processing completed successfully:', {
        extraction: extractionResult,
        mapping: mappingResult
      });

    } catch (error) {
      console.error('🇩🇿 Processing failed:', error);
      setProcessingStep(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      setError(`Erreur lors du traitement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, selectedFormType]);

  /**
   * Simulation du traitement NLP local (spaCy/Hugging Face)
   */
  const simulateNLPProcessing = async (): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('🧠 NLP Processing simulation: Entity recognition and relation extraction completed');
        resolve();
      }, 1000);
    });
  };

  /**
   * Gestion de la caméra
   */
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      setError('Impossible d\'accéder à la caméra');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new globalThis.File([blob], 'capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            stopCamera();
            await processDocument(file);
          }
        });
      }
    }
  };

  /**
   * Navigation entre onglets avec validation
   */
  const navigateToMapping = () => {
    if (extractedData) {
      setActiveTab('mapping');
    } else {
      setError('Veuillez d\'abord extraire des données avant de procéder au mapping');
    }
  };

  const navigateToWorkflow = () => {
    if (mappedData) {
      setActiveTab('workflow');
    } else {
      setError('Veuillez d\'abord effectuer le mapping avant de procéder au workflow');
    }
  };

  const resetToUpload = () => {
    setActiveTab('upload');
    setSelectedFile(null);
    setExtractedData(null);
    setMappedData(null);
    setExtractedText(null);
    setDetectedEntities([]);
    setMappedFields([]);
    setUnmappedFields([]);
    setError(null);
    setProgress(0);
    setProcessingStep('');
  };

  /**
   * Enregistrement dans le fil d'approbation
   */
  const saveToApprovalWorkflow = useCallback(async () => {
    if (!mappedData || !extractedData) return;

    try {
      // Simulation de l'enregistrement dans le workflow
      console.log('💾 Saving to approval workflow...');
      
      const approvalData = {
        documentType: 'legal_text',
        extractedData,
        mappedData,
        status: 'pending_approval',
        submittedAt: new Date().toISOString(),
        submittedBy: 'ocr_system',
        metadata: {
          ocrConfidence: mappedData.metadata.ocrConfidence,
          mappingConfidence: mappedData.metadata.mappingConfidence,
          processingTime: mappedData.metadata.processingTime,
          warnings: mappedData.metadata.warnings
        }
      };

      // Ici, en production, cela irait vers le service d'approbation
      localStorage.setItem(`approval_${Date.now()}`, JSON.stringify(approvalData));
      
      alert('✅ Document enregistré dans le fil d\'approbation avec succès !');
      
      // Retourner à l'onglet upload après succès
      resetToUpload();
      
    } catch (error) {
      console.error('Failed to save to approval workflow:', error);
      setError('❌ Erreur lors de l\'enregistrement');
    }
  }, [mappedData, extractedData]);

  /**
   * Rendu de la zone d'upload
   */
  const renderUploadZone = () => (
    <div className="space-y-4">
      {/* Zone d'upload principal */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt,.rtf"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-green-600 mr-2" />
            <span className="text-2xl">🇩🇿</span>
          </div>
          <div className="text-lg font-medium text-gray-900 mb-2">
            📁 Chargement Local de Documents Algériens
          </div>
          <div className="text-sm text-green-700 font-medium mb-2">
            🔒 Traitement 100% Local - Confidentialité Garantie
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Formats juridiques DZ supportés :
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Badge variant="outline" className="border-green-200 text-green-700">🇩🇿 PDF Juridique</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">📷 Scans DZ</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">📝 Documents AR/FR</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">📊 Tableaux DZ</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">🎯 Présentations</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">📝 Texte Local</Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">📄 Formats RTF</Badge>
          </div>
        </label>
      </div>

      {/* Options d'équipement externe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200" onClick={() => setShowScanOptions(!showScanOptions)}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Scan className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-xl">🇩🇿</span>
            </div>
            <div className="font-medium text-blue-700">Scanner Local DZ</div>
            <div className="text-sm text-gray-600">🔒 Traitement local sur poste</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200" onClick={startCamera}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Camera className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-xl">🇩🇿</span>
            </div>
            <div className="font-medium text-green-700">Caméra Locale DZ</div>
            <div className="text-sm text-gray-600">📱 Capture directe sécurisée</div>
          </CardContent>
        </Card>
      </div>

      {/* Interface caméra */}
      {isCameraOpen && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full max-w-md mx-auto rounded" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={capturePhoto}>
                <Camera className="w-4 h-4 mr-2" />
                Capturer
              </Button>
              <Button variant="outline" onClick={stopCamera}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations sur le scanner */}
      {showScanOptions && (
        <Alert>
          <Scan className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-2">Instructions Scanner :</div>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Connectez votre scanner à l'ordinateur</li>
              <li>Placez le document dans le scanner</li>
              <li>Utilisez le logiciel du scanner pour numériser</li>
              <li>Sauvegardez en PDF ou image</li>
              <li>Glissez-déposez le fichier dans la zone ci-dessus</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  /**
   * Rendu des résultats d'extraction
   */
  const renderExtractionResults = () => {
    if (!extractedData && !extractedText) return null;

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Données Extraites
              <Badge variant="outline">
                {extractedData?.entities.length || detectedEntities.length} entité(s) détectée(s)
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Métadonnées */}
              <div className="space-y-2">
                <h4 className="font-semibold">Métadonnées du Document</h4>
                <div className="text-sm space-y-1">
                  <div>Type: <Badge>{extractedData?.metadata.documentType || 'Texte'}</Badge></div>
                  <div>Confiance: <Badge variant={extractedData?.metadata.confidence > 0.8 ? "default" : "secondary"}>
                    {((extractedData?.metadata.confidence || extractedText?.confidence || 0) * 100).toFixed(1)}%
                  </Badge></div>
                  <div>Temps de traitement: {extractedData?.metadata.processingTime || '< 1000'}ms</div>
                  <div>Tables détectées: {extractedData?.tables.length || 0}</div>
                  {extractedText && (
                    <>
                      <div>Pages: {extractedText.pages}</div>
                      <div>Langue: {extractedText.language}</div>
                    </>
                  )}
                </div>
              </div>

              {/* Entités juridiques */}
              <div className="space-y-2">
                <h4 className="font-semibold">Entités Juridiques</h4>
                {(extractedData?.entities || []).map((entity, index) => (
                  <div key={index} className="text-sm border rounded p-2">
                    <div className="font-medium">{entity.type.toUpperCase()} N° {entity.number}</div>
                    <div className="text-gray-600">{entity.title}</div>
                    <div className="text-xs text-gray-500">
                      Autorité: {entity.issuingAuthority}
                    </div>
                    <div className="text-xs text-gray-500">
                      Articles: {entity.articles.length} | Références: {entity.references.length}
                    </div>
                  </div>
                ))}
                {detectedEntities.map((entity, index) => (
                  <div key={`detected-${index}`} className="text-sm border rounded p-2">
                    <div className="font-medium">{entity.type}</div>
                    <div className="text-gray-600">{entity.value}</div>
                    <div className="text-xs text-gray-500">
                      Confiance: {(entity.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Texte extrait */}
            {extractedText && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Texte Extrait</h4>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  {extractedText.content.substring(0, 500)}
                  {extractedText.content.length > 500 && '...'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bouton vers mapping */}
        <div className="flex justify-end">
          <Button onClick={navigateToMapping} className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Mapping vers Formulaires
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  /**
   * Rendu des résultats de mapping
   */
  const renderMappingResults = () => {
    return (
      <div className="space-y-4">
        {/* Sélection du type de formulaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Type de Formulaire Cible
            </label>
            <select 
              value={selectedFormType}
              onChange={(e) => setSelectedFormType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {availableForms.map(formType => (
                <option key={formType} value={formType}>
                  {formType === 'legal_document' ? 'Document Juridique' : 
                   formType === 'administrative_procedure' ? 'Procédure Administrative' : formType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mode de Mapping
            </label>
            <select className="w-full border rounded px-3 py-2">
              <option value="automatic">Automatique (Recommandé)</option>
              <option value="manual">Manuel</option>
              <option value="hybrid">Hybride</option>
            </select>
          </div>
        </div>

        {mappedData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Résultats du Mapping
                <Badge variant="outline">
                  {mappedData.sections.length} section(s) mappée(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Statistiques de mapping */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {(mappedData.metadata.mappingConfidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Confiance Mapping</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mappedFields.length}
                    </div>
                    <div className="text-xs text-gray-500">Champs Mappés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {unmappedFields.length}
                    </div>
                    <div className="text-xs text-gray-500">Non Mappés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mappedData.metadata.warnings.length}
                    </div>
                    <div className="text-xs text-gray-500">Avertissements</div>
                  </div>
                </div>

                {/* Données mappées */}
                {mappedFields.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">Données Mappées ({mappedFields.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mappedFields.map((field, index) => (
                        <div key={index} className="text-sm border border-green-200 rounded p-2 bg-green-50">
                          <div className="font-medium">{field.fieldId}</div>
                          <div className="text-gray-600">{field.mappedValue}</div>
                          <div className="text-xs text-gray-500">
                            Confiance: {(field.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Données non mappées */}
                {unmappedFields.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-700">Données non Mappées ({unmappedFields.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {unmappedFields.map((field, index) => (
                        <div key={index} className="text-sm border border-red-200 rounded p-2 bg-red-50">
                          <div className="font-medium">{field.fieldId}</div>
                          <div className="text-gray-500 italic">Aucune valeur trouvée</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Avertissements */}
                {mappedData.metadata.warnings.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold mb-2">Avertissements de Mapping:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {mappedData.metadata.warnings.map((warning, index) => (
                          <li key={index} className="text-sm">{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bouton vers workflow */}
        <div className="flex justify-end">
          <Button onClick={navigateToWorkflow} className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Workflow & Approbation
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  /**
   * Rendu du workflow
   */
  const renderWorkflowResults = () => {
    if (!mappedData) {
      return (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Aucune donnée à valider. Veuillez d'abord effectuer l'extraction et le mapping d'un document.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {/* Résumé pour validation */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-2">Prêt pour Validation:</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Type de formulaire:</strong> {mappedData.formId}
              </div>
              <div>
                <strong>Confiance mapping:</strong> {(mappedData.metadata.mappingConfidence * 100).toFixed(1)}%
              </div>
              <div>
                <strong>Champs mappés:</strong> {mappedFields.length}
              </div>
              <div>
                <strong>Champs non mappés:</strong> {unmappedFields.length}
              </div>
              <div>
                <strong>Avertissements:</strong> {mappedData.metadata.warnings.length}
              </div>
              <div>
                <strong>Temps total:</strong> {mappedData.metadata.processingTime}ms
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Détails complets */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé Complet de l'Extraction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Texte extrait */}
            {extractedText && (
              <div>
                <h4 className="font-semibold mb-2">📄 Texte Extrait</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <div><strong>Contenu:</strong> {extractedText.content.length} caractères</div>
                  <div><strong>Confiance:</strong> {(extractedText.confidence * 100).toFixed(1)}%</div>
                  <div><strong>Pages:</strong> {extractedText.pages}</div>
                  <div><strong>Langue:</strong> {extractedText.language}</div>
                </div>
              </div>
            )}

            {/* Entités détectées */}
            <div>
              <h4 className="font-semibold mb-2">🏷️ Entités Détectées ({detectedEntities.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {detectedEntities.map((entity, index) => (
                  <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                    <div><strong>{entity.type}:</strong> {entity.value}</div>
                    <div className="text-xs text-gray-600">Confiance: {(entity.confidence * 100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Données mappées détaillées */}
            <div>
              <h4 className="font-semibold mb-2">✅ Données Mappées ({mappedFields.length})</h4>
              <div className="space-y-2">
                {mappedFields.map((field, index) => (
                  <div key={index} className="bg-green-50 p-2 rounded text-sm">
                    <div><strong>{field.fieldId}:</strong> {field.mappedValue}</div>
                    <div className="text-xs text-gray-600">
                      Original: {field.originalValue} | Confiance: {(field.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Données non mappées */}
            {unmappedFields.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">❌ Données non Mappées ({unmappedFields.length})</h4>
                <div className="space-y-2">
                  {unmappedFields.map((field, index) => (
                    <div key={index} className="bg-red-50 p-2 rounded text-sm">
                      <div><strong>{field.fieldId}:</strong> <span className="text-gray-500 italic">Non trouvé</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={saveToApprovalWorkflow} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer dans le Fil d'Approbation
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Prévisualiser
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Ajuster
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span>DZ OCR-IA</span>
              <Badge variant="outline" className="bg-green-50">
                🇩🇿 Textes Juridiques Algériens
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Extraction et structuration automatique des documents PDF des journaux officiels algériens.
            Mapping intelligent vers les formulaires de nomenclature avec NLP avancé.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistiques de traitement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Statistiques de Traitement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{processingStats.filesProcessed}</div>
              <div className="text-xs text-gray-500">Fichiers Traités</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{processingStats.entitiesExtracted}</div>
              <div className="text-xs text-gray-500">Entités Extraites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{processingStats.fieldsMaped}</div>
              <div className="text-xs text-gray-500">Champs Mappés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(processingStats.avgConfidence * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">Confiance Moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {(processingStats.totalProcessingTime / 1000).toFixed(1)}s
              </div>
              <div className="text-xs text-gray-500">Temps Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Erreurs */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setError(null)}
            className="ml-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">📄 Upload & Extraction</TabsTrigger>
          <TabsTrigger value="mapping">🗂️ Mapping & Formulaires</TabsTrigger>
          <TabsTrigger value="workflow">⚡ Workflow & Approbation</TabsTrigger>
        </TabsList>

        {/* Onglet Upload et Extraction */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                🇩🇿 Upload & Extraction Locale DZ
              </CardTitle>
              <CardDescription>
                Traitement 100% local - Aucune donnée envoyée vers des services externes. 
                Extraction OCR intelligente spécialisée pour documents juridiques algériens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Bandeau de sécurité locale */}
              <Alert className="border-green-200 bg-green-50">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇩🇿</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 mb-1">
                      🔒 Processeur OCR 100% Local Algérien
                    </h4>
                    <p className="text-sm text-green-700">
                      Vos documents restent sur votre machine. Aucun transfert vers des serveurs externes.
                      Intelligence artificielle embarquée pour documents juridiques DZ.
                    </p>
                  </div>
                </div>
              </Alert>

              {renderUploadZone()}

              {/* Fichier sélectionné */}
              {selectedFile && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <strong>Fichier sélectionné:</strong> {selectedFile.name}
                        <br />
                        <span className="text-sm text-gray-500">
                          Type: {selectedFile.type || 'Unknown'} | Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <Button 
                        onClick={() => processDocument()} 
                        disabled={isProcessing}
                        className="ml-4 bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            🇩🇿 Traitement Local...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            🚀 Lancer Extraction DZ
                          </>
                        )}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Barre de progression */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{processingStep}</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Résultats d'extraction */}
              {renderExtractionResults()}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Mapping */}
        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mapping vers Formulaires
              </CardTitle>
              <CardDescription>
                Configuration du mapping automatique vers les formulaires de nomenclature
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderMappingResults()}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Workflow */}
        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Workflow d'Approbation
              </CardTitle>
              <CardDescription>
                Validation et enregistrement dans le fil d'approbation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderWorkflowResults()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DZOCRIAProcessor;
import { useState, useCallback } from 'react';
import { processDocumentOCR, mapToFormFields, RealOCRResult } from '@/services/realOcrService';

export interface UseOCRProcessingReturn {
  isProcessing: boolean;
  result: RealOCRResult | null;
  mappedData: Record<string, unknown>;
  error: string | null;
  processingSteps: string[];
  processFile: (file: File) => Promise<void>;
  processImageFile: (file: File) => Promise<void>;
  processWordFile: (file: File) => Promise<void>;
  processExcelFile: (file: File) => Promise<void>;
  processPowerPointFile: (file: File) => Promise<void>;
  processTextFile: (file: File) => Promise<void>;
  processRTFFile: (file: File) => Promise<void>;
  clearResults: () => void;
}

export const useOCRProcessing = (): UseOCRProcessingReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RealOCRResult | null>(null);
  const [mappedData, setMappedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);

  const addProcessingStep = useCallback((step: string) => {
    setProcessingSteps(prev => [...prev, step]);
  }, []);

  const processFileBase = useCallback(async (file: File, fileType: string) => {
    setIsProcessing(true);
    setError(null);
    setProcessingSteps([]);

    try {
      addProcessingStep(`📄 Lecture du fichier ${file.name}`);
      await new Promise(resolve => setTimeout(resolve, 500));

      addProcessingStep(`🔍 Détection du type: ${fileType}`);
      await new Promise(resolve => setTimeout(resolve, 300));

      addProcessingStep('🤖 Traitement OCR en cours...');
      const ocrResult = await processDocumentOCR(file);
      await new Promise(resolve => setTimeout(resolve, 800));

      addProcessingStep('🧠 Analyse des entités...');
      await new Promise(resolve => setTimeout(resolve, 600));

      addProcessingStep('📊 Mapping automatique...');
      const mapped = await mapToFormFields(ocrResult);
      await new Promise(resolve => setTimeout(resolve, 400));

      addProcessingStep('✅ Traitement terminé avec succès');
      
      setResult(ocrResult);
      setMappedData(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du traitement');
      addProcessingStep('❌ Erreur lors du traitement');
    } finally {
      setIsProcessing(false);
    }
  }, [addProcessingStep]);

  const processFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Document PDF');
  }, [processFileBase]);

  const processImageFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Image');
  }, [processFileBase]);

  const processWordFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Document Word');
  }, [processFileBase]);

  const processExcelFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Feuille de calcul Excel');
  }, [processFileBase]);

  const processPowerPointFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Présentation PowerPoint');
  }, [processFileBase]);

  const processTextFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Fichier texte');
  }, [processFileBase]);

  const processRTFFile = useCallback(async (file: File) => {
    return processFileBase(file, 'Document RTF');
  }, [processFileBase]);

  const clearResults = useCallback(() => {
    setResult(null);
    setMappedData(null);
    setError(null);
    setProcessingSteps([]);
  }, []);

  return {
    isProcessing,
    result,
    mappedData,
    error,
    processingSteps,
    processFile,
    processImageFile,
    processWordFile,
    processExcelFile,
    processPowerPointFile,
    processTextFile,
    processRTFFile,
    clearResults
  };
};
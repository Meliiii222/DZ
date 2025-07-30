// @ts-nocheck
import { ExtractedData } from '@/services/ocrService';
import { extractAlgerianDataFromFile } from './algerianOCRExtractor';

export interface AdaptedAlgerianData extends ExtractedData {
  documentFormat?: string;
  originalMetadata?: Record<string, unknown>;
}

interface AlgerianDataWithMetadata {
  type?: string;
  title?: string;
  content?: string;
  description?: string;
  reference?: string;
  institution?: string;
  publicationDate?: string;
  promulgation_date?: string;
  date_journal?: string;
  related_texts?: string[];
  extractionMetadata?: {
    pageCount?: number;
  };
  signatory?: string;
  authority?: string;
  wilaya?: string;
  commune?: string;
  journal_numero?: string;
  effective_date?: string;
  legal_basis?: string;
  name?: string;
  sector?: string;
  target_audience?: string;
  required_documents?: string[];
  steps?: string[];
  duration?: string;
  cost?: string;
  location?: string;
  contact_info?: string;
  conditions?: string[];
  documentFormat?: string;
}

/**
 * Adapte les données extraites par le nouveau système vers le format attendu
 * par les services existants
 */
export async function extractAndAdaptAlgerianDocument(file: File): Promise<AdaptedAlgerianData> {
  try {
    console.log('🔄 Adaptation des données algériennes...');
    
    // Extraire les données avec le nouveau système
    const algerianData = await extractAlgerianDataFromFile(file);
    
    // Adapter vers le format ExtractedData attendu par les services existants
    const algerianDataTyped = algerianData as AlgerianDataWithMetadata;
    
    const adaptedData: AdaptedAlgerianData = {
      text: algerianDataTyped.description || '',
      tables: [], // Pas de tables extraites pour le moment
      metadata: {
        pageCount: algerianDataTyped.extractionMetadata?.pageCount || 1,
        processingTime: Date.now(),
        documentType: algerianDataTyped.type || 'document',
        language: 'mixed' as 'ar' | 'fr' | 'mixed',
        extractionDate: new Date()
      },
      confidence: 0.85, // Confiance par défaut, sera recalculée
      structuredData: {
        // Données de base conformes à StructuredLegalData
        type: algerianDataTyped.type || 'document',
        title: algerianDataTyped.title || '',
        number: algerianDataTyped.reference || '',
        institution: algerianDataTyped.institution || '',
        content: algerianDataTyped.content || algerianDataTyped.description || '',
        
        // Dates formatées
        dateGregorian: algerianDataTyped.publicationDate || algerianDataTyped.promulgation_date,
        dateHijri: algerianDataTyped.date_journal,
        
        // Données structurées requises
        articles: [],
        references: algerianDataTyped.related_texts ? 
          algerianDataTyped.related_texts.map((text: string) => ({
            type: 'vu' as const,
            reference: text,
            description: text
          })) : [],
        signatories: algerianDataTyped.signatory ? [algerianDataTyped.signatory] : [],
        
        // Extensions pour compatibilité (stockées comme propriétés non-typées)
        ...(algerianDataTyped.authority && { authority: algerianDataTyped.authority }),
        ...(algerianDataTyped.wilaya && { wilaya: algerianDataTyped.wilaya }),
        ...(algerianDataTyped.commune && { commune: algerianDataTyped.commune }),
        ...(algerianDataTyped.journal_numero && { journal_numero: algerianDataTyped.journal_numero }),
        ...(algerianDataTyped.effective_date && { effective_date: algerianDataTyped.effective_date }),
        ...(algerianDataTyped.legal_basis && { legal_basis: algerianDataTyped.legal_basis }),
        
        // Données de procédure (extensions)
        ...(algerianDataTyped.name && { name: algerianDataTyped.name }),
        ...(algerianDataTyped.sector && { sector: algerianDataTyped.sector }),
        ...(algerianDataTyped.target_audience && { target_audience: algerianDataTyped.target_audience }),
        ...(algerianDataTyped.required_documents && { required_documents: algerianDataTyped.required_documents }),
        ...(algerianDataTyped.steps && { steps: algerianDataTyped.steps }),
        ...(algerianDataTyped.duration && { duration: algerianDataTyped.duration }),
        ...(algerianDataTyped.cost && { cost: algerianDataTyped.cost }),
        ...(algerianDataTyped.location && { location: algerianDataTyped.location }),
        ...(algerianDataTyped.contact_info && { contact_info: algerianDataTyped.contact_info }),
        ...(algerianDataTyped.conditions && { conditions: algerianDataTyped.conditions })
      },
      
      // Métadonnées du nouveau système (extensions AdaptedAlgerianData)
      documentFormat: algerianDataTyped.documentFormat,
      originalMetadata: algerianDataTyped.extractionMetadata
    };
    
    // Déterminer le type de document plus précisément
    if (algerianDataTyped.steps || algerianDataTyped.required_documents) {
      adaptedData.structuredData.type = 'procedure';
    } else if (adaptedData.structuredData.number || algerianDataTyped.journal_numero) {
      adaptedData.structuredData.type = 'legal';
    }
    
    // Calculer un score de confiance basé sur la qualité des données extraites
    adaptedData.confidence = calculateExtractionConfidence(adaptedData);
    
    console.log('✅ Adaptation terminée:', {
      format: adaptedData.documentFormat,
      type: adaptedData.structuredData.type,
      confidence: adaptedData.confidence
    });
    
    return adaptedData;
    
  } catch (error) {
    console.error('🚨 Erreur lors de l\'adaptation:', error);
    throw error;
  }
}

/**
 * Calcule un score de confiance basé sur la qualité des données extraites
 */
function calculateExtractionConfidence(data: AdaptedAlgerianData): number {
  let score = 0.5; // Base
  
  // Bonus pour les champs importants remplis
  if (data.structuredData.title) score += 0.1;
  if (data.structuredData.type) score += 0.1;
  if (data.structuredData.content && data.structuredData.content.length > 50) score += 0.1;
  if (data.structuredData.number) score += 0.1;
  if ((data.structuredData as Record<string, unknown>).authority || data.structuredData.institution) score += 0.1;
  
  // Bonus selon le type de document
  if (data.structuredData.type === 'legal') {
    if ((data.structuredData as Record<string, unknown>).journal_numero) score += 0.05;
    if (data.structuredData.dateGregorian) score += 0.05;
  } else if (data.structuredData.type === 'procedure') {
    if ((data.structuredData as Record<string, unknown>).steps && (data.structuredData as Record<string, unknown>).steps.length > 0) score += 0.05;
    if ((data.structuredData as Record<string, unknown>).required_documents && (data.structuredData as Record<string, unknown>).required_documents.length > 0) score += 0.05;
  }
  
  // Bonus pour le format d'origine
  if (data.documentFormat === 'PDF') score += 0.05;
  else if (data.documentFormat === 'Word DOCX') score += 0.03;
  else if (data.documentFormat === 'Image OCR') score -= 0.1; // Moins fiable
  
  return Math.min(0.95, Math.max(0.1, score));
}
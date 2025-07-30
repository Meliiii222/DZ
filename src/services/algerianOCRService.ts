// @ts-nocheck
// Service OCR optimisé pour l'Algérie - 100% local et indépendant
// Spécialement conçu pour les documents juridiques algériens

import { createWorker } from 'tesseract.js';
import { REGEX_JURIDIQUE_ALGERIA, CONFIG_ALGERIA } from '@/data/algerianData';

export interface AlgerianOCRResult {
  text: string;
  confidence: number;
  language: 'fra' | 'ara' | 'mixed';
  entities: JuridicalEntity[];
  metadata: OCRMetadata;
}

export interface JuridicalEntity {
  type: 'loi' | 'decret' | 'arrete' | 'article' | 'institution' | 'wilaya';
  text: string;
  position: { start: number; end: number };
  metadata?: {
    number?: string;
    date?: string;
    type?: string;
  };
}

export interface OCRMetadata {
  processingTime: number;
  imageSize: { width: number; height: number };
  detectedLanguage: string;
  localProcessing: boolean;
  algerianOptimized: boolean;
}

class AlgerianOCRService {
  private workers: Map<string, any> = new Map();
  private isInitialized = false;

  constructor() {
    console.log('🇩🇿 Service OCR Algérien initialisé - 100% local et indépendant');
  }

  /**
   * Initialise les workers Tesseract pour français et arabe
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('🚀 Initialisation des moteurs OCR algériens...');
      
      // Worker pour le français (documents officiels algériens)
      const frenchWorker = await createWorker();
      await frenchWorker.loadLanguage('fra');
      await frenchWorker.initialize('fra');
      await frenchWorker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789°-/.,;:()[]{}«»"\'àáâäèéêëìíîïòóôöùúûüÿç ',
        tessedit_pageseg_mode: '1',
        preserve_interword_spaces: '1'
      });
      this.workers.set('fra', frenchWorker);

      // Worker pour l'arabe (documents officiels en arabe)
      const arabicWorker = await createWorker();
      await arabicWorker.loadLanguage('ara');
      await arabicWorker.initialize('ara');
      await arabicWorker.setParameters({
        tessedit_pageseg_mode: '1',
        preserve_interword_spaces: '1'
      });
      this.workers.set('ara', arabicWorker);

      this.isInitialized = true;
      console.log('✅ Moteurs OCR algériens prêts');
    } catch (error) {
      console.error('❌ Erreur initialisation OCR algérien:', error);
      throw new Error('Impossible d\'initialiser le service OCR algérien');
    }
  }

  /**
   * Détecte automatiquement la langue d'un document
   */
  private detectLanguage(text: string): 'fra' | 'ara' | 'mixed' {
    const arabicChars = text.match(/[\u0600-\u06FF]/g)?.length || 0;
    const frenchChars = text.match(/[a-zA-ZàáâäèéêëìíîïòóôöùúûüÿçÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜŸÇ]/g)?.length || 0;
    
    const totalChars = arabicChars + frenchChars;
    if (totalChars === 0) return 'fra'; // Par défaut français pour l'Algérie
    
    const arabicRatio = arabicChars / totalChars;
    
    if (arabicRatio > 0.7) return 'ara';
    if (arabicRatio < 0.3) return 'fra';
    return 'mixed';
  }

  /**
   * Extrait les entités juridiques algériennes du texte
   */
  private extractAlgerianEntities(text: string): JuridicalEntity[] {
    const entities: JuridicalEntity[] = [];

    // Extraction des lois algériennes
    let match;
    while ((match = REGEX_JURIDIQUE_ALGERIA.loi.exec(text)) !== null) {
      entities.push({
        type: 'loi',
        text: match[0],
        position: { start: match.index, end: match.index + match[0].length },
        metadata: {
          number: `${match[1]}-${match[2]}`,
          date: `${match[3]} ${match[4]} ${match[5]}`
        }
      });
    }

    // Extraction des décrets
    REGEX_JURIDIQUE_ALGERIA.decret.lastIndex = 0;
    while ((match = REGEX_JURIDIQUE_ALGERIA.decret.exec(text)) !== null) {
      entities.push({
        type: 'decret',
        text: match[0],
        position: { start: match.index, end: match.index + match[0].length },
        metadata: {
          type: match[1],
          number: `${match[2]}-${match[3]}`,
          date: `${match[4]} ${match[5]} ${match[6]}`
        }
      });
    }

    // Extraction des arrêtés
    REGEX_JURIDIQUE_ALGERIA.arrete.lastIndex = 0;
    while ((match = REGEX_JURIDIQUE_ALGERIA.arrete.exec(text)) !== null) {
      entities.push({
        type: 'arrete',
        text: match[0],
        position: { start: match.index, end: match.index + match[0].length },
        metadata: {
          type: match[1],
          number: match[2],
          date: `${match[3]} ${match[4]} ${match[5]}`
        }
      });
    }

    // Extraction des articles
    REGEX_JURIDIQUE_ALGERIA.article.lastIndex = 0;
    while ((match = REGEX_JURIDIQUE_ALGERIA.article.exec(text)) !== null) {
      entities.push({
        type: 'article',
        text: match[0],
        position: { start: match.index, end: match.index + match[0].length },
        metadata: {
          number: match[1] + (match[2] || '')
        }
      });
    }

    return entities;
  }

  /**
   * Traite un document avec OCR optimisé pour l'Algérie
   */
  async processDocument(
    file: File | string,
    options: {
      language?: 'auto' | 'fra' | 'ara';
      detectEntities?: boolean;
    } = {}
  ): Promise<AlgerianOCRResult> {
    const startTime = Date.now();
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log('🔍 Traitement OCR document algérien...');
      
      // Détermine la langue à utiliser
      let targetLanguage = options.language || 'auto';
      
      // Si auto-détection, commence par le français (langue principale en Algérie)
      const worker = this.workers.get(targetLanguage === 'auto' ? 'fra' : targetLanguage);
      
      if (!worker) {
        throw new Error(`Worker non disponible pour la langue: ${targetLanguage}`);
      }

      // Traitement OCR
      const ocrResult = await worker.recognize(file);
      const extractedText = ocrResult.data.text;
      
      // Détection automatique de la langue
      const detectedLanguage = this.detectLanguage(extractedText);
      
      // Si détection automatique et langue différente détectée, re-traiter
      let finalText = extractedText;
      let finalConfidence = ocrResult.data.confidence;
      
      if (options.language === 'auto' && detectedLanguage !== 'fra' && detectedLanguage !== 'mixed') {
        console.log(`🔄 Re-traitement avec moteur ${detectedLanguage}`);
        const secondWorker = this.workers.get(detectedLanguage);
        if (secondWorker) {
          const secondResult = await secondWorker.recognize(file);
          finalText = secondResult.data.text;
          finalConfidence = secondResult.data.confidence;
        }
      }

      // Extraction des entités juridiques algériennes
      const entities = options.detectEntities !== false 
        ? this.extractAlgerianEntities(finalText)
        : [];

      const processingTime = Date.now() - startTime;

      console.log(`✅ OCR algérien terminé: ${entities.length} entités détectées en ${processingTime}ms`);

      return {
        text: finalText,
        confidence: finalConfidence,
        language: detectedLanguage,
        entities,
        metadata: {
          processingTime,
          imageSize: { width: 0, height: 0 }, // À implémenter si nécessaire
          detectedLanguage,
          localProcessing: true,
          algerianOptimized: true
        }
      };

    } catch (error) {
      console.error('❌ Erreur traitement OCR algérien:', error);
      throw new Error(`Erreur OCR: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Analyse spécialisée pour les documents juridiques algériens
   */
  async analyzeAlgerianLegalDocument(file: File): Promise<{
    classification: string;
    entities: JuridicalEntity[];
    summary: string;
    recommendations: string[];
  }> {
    console.log('📋 Analyse spécialisée document juridique algérien...');
    
    const ocrResult = await this.processDocument(file, {
      language: 'auto',
      detectEntities: true
    });

    // Classification du document
    let classification = 'Document juridique';
    const text = ocrResult.text.toLowerCase();
    
    if (text.includes('loi') && text.includes('république algérienne')) {
      classification = 'Loi de la République Algérienne';
    } else if (text.includes('décret exécutif')) {
      classification = 'Décret Exécutif';
    } else if (text.includes('décret présidentiel')) {
      classification = 'Décret Présidentiel';
    } else if (text.includes('arrêté')) {
      classification = 'Arrêté';
    } else if (text.includes('constitution')) {
      classification = 'Texte Constitutionnel';
    }

    // Recommandations basées sur le contenu algérien
    const recommendations: string[] = [];
    
    if (ocrResult.entities.length > 0) {
      recommendations.push('Document contenant des références juridiques algériennes');
    }
    
    if (ocrResult.language === 'mixed') {
      recommendations.push('Document bilingue français-arabe détecté');
    }
    
    if (ocrResult.confidence < 80) {
      recommendations.push('Qualité d\'image à améliorer pour meilleure extraction');
    }

    recommendations.push('Traitement 100% local - Données sécurisées en Algérie');

    return {
      classification,
      entities: ocrResult.entities,
      summary: `Document ${classification} analysé avec ${ocrResult.entities.length} références juridiques détectées`,
      recommendations
    };
  }

  /**
   * Libère les ressources
   */
  async cleanup(): Promise<void> {
    console.log('🧹 Nettoyage des ressources OCR algériennes...');
    
    for (const [lang, worker] of this.workers) {
      try {
        await worker.terminate();
        console.log(`✅ Worker ${lang} terminé`);
      } catch (error) {
        console.warn(`⚠️ Erreur terminaison worker ${lang}:`, error);
      }
    }
    
    this.workers.clear();
    this.isInitialized = false;
  }
}

// Instance singleton du service OCR algérien
export const algerianOCRService = new AlgerianOCRService();

// Configuration pour l'export
export const ALGERIAN_OCR_CONFIG = {
  supportedLanguages: CONFIG_ALGERIA.languages,
  optimizedForAlgeria: true,
  localProcessing: CONFIG_ALGERIA.localProcessing,
  independent: CONFIG_ALGERIA.independent
};
// @ts-nocheck
import * as pdfjsLib from 'pdfjs-dist';
import nlp from 'compromise';

// Interface pour maintenir la compatibilité
interface ExtractedData {
  text: string;
  tables: TableData[];
  entities: LegalEntity[];
  relations: LegalRelation[];
  confidence: number;
  structure: DocumentStructure;
}

interface TableData {
  id: string;
  cells: string[][];
  position: { x: number; y: number; width: number; height: number };
  confidence: number;
}

interface LegalEntity {
  type: 'law' | 'decree' | 'article' | 'institution' | 'date' | 'number' | 'reference';
  value: string;
  position: { start: number; end: number };
  confidence: number;
  metadata?: Record<string, unknown>;
}

interface LegalRelation {
  type: 'references' | 'modifies' | 'repeals' | 'complements';
  source: string;
  target: string;
  confidence: number;
}

interface DocumentStructure {
  sections: DocumentSection[];
  hierarchy: HierarchyNode[];
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  level: number;
  position: { start: number; end: number };
}

interface HierarchyNode {
  id: string;
  type: 'title' | 'chapter' | 'section' | 'article' | 'paragraph';
  value: string;
  children: HierarchyNode[];
  position: { start: number; end: number };
}

// Cache pour éviter de recharger les modèles
let huggingFaceCache: any = null;
let isLoading = false;

/**
 * Charge les modèles Hugging Face de manière lazy (seulement quand nécessaire)
 */
async function loadHuggingFaceModels() {
  if (huggingFaceCache) {
    return huggingFaceCache;
  }

  if (isLoading) {
    // Attendre que le chargement en cours se termine
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return huggingFaceCache;
  }

  try {
    isLoading = true;
    console.log('🔄 Chargement des modèles IA (cela peut prendre quelques secondes)...');
    
    // Import dynamique pour éviter de charger le WASM au démarrage
    const { pipeline, env } = await import('@huggingface/transformers');
    
    // Configuration pour fonctionnement 100% local
    env.allowRemoteModels = false;  // ❌ Pas de téléchargement internet
    env.allowLocalModels = true;    // ✅ Utilise modèles locaux/cache
    env.useBrowserCache = true;     // ✅ Cache navigateur
    env.localModelPath = '/models/'; // ✅ Dossier modèles locaux

    // Initialiser les pipelines nécessaires
    const textClassifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    const tokenClassifier = await pipeline('token-classification', 'Xenova/bert-base-NER');

    huggingFaceCache = {
      textClassifier,
      tokenClassifier,
      pipeline,
      env
    };

    console.log('✅ Modèles IA chargés avec succès');
    return huggingFaceCache;
  } catch (error) {
    console.error('❌ Erreur lors du chargement des modèles IA:', error);
    throw new Error('Impossible de charger les modèles d\'IA avancés');
  } finally {
    isLoading = false;
  }
}

/**
 * Service OCR optimisé avec chargement à la demande
 */
class OptimizedOCRService {
  private useAdvancedAI = false;

  /**
   * Active les fonctionnalités IA avancées (charge les modèles)
   */
  async enableAdvancedAI(): Promise<void> {
    await loadHuggingFaceModels();
    this.useAdvancedAI = true;
  }

  /**
   * Extraction de texte basique (sans IA lourde)
   */
  async extractTextBasic(file: File): Promise<string> {
    try {
      if (file.type === 'application/pdf') {
        return await this.extractTextFromPDF(file);
      } else if (file.type.startsWith('image/')) {
        return await this.extractTextFromImage(file);
      } else {
        throw new Error('Type de fichier non supporté');
      }
    } catch (error) {
      console.error('Erreur extraction basique:', error);
      throw error;
    }
  }

  /**
   * Extraction avancée avec IA (charge les modèles si nécessaire)
   */
  async extractAdvanced(file: File): Promise<ExtractedData> {
    try {
      // Extraction de base
      const text = await this.extractTextBasic(file);

      // Si l'IA avancée n'est pas activée, proposer de l'activer
      if (!this.useAdvancedAI) {
        const useAI = confirm(
          'Voulez-vous utiliser l\'IA avancée pour une meilleure analyse ?\n' +
          '(Cela téléchargera ~21MB de modèles la première fois)'
        );
        
        if (useAI) {
          await this.enableAdvancedAI();
        } else {
          // Retourner une analyse basique
          return this.createBasicExtractedData(text);
        }
      }

      // Analyse avancée avec IA
      const models = await loadHuggingFaceModels();
      return await this.performAdvancedAnalysis(text, models);

    } catch (error) {
      console.error('Erreur extraction avancée:', error);
      // Fallback vers l'analyse basique
      const text = await this.extractTextBasic(file);
      return this.createBasicExtractedData(text);
    }
  }

  /**
   * Extraction PDF avec PDF.js
   */
  private async extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  }

  /**
   * Extraction d'image avec Tesseract.js (plus léger que Hugging Face)
   */
  private async extractTextFromImage(file: File): Promise<string> {
    try {
      // Import dynamique de Tesseract pour éviter de le charger au démarrage
      const Tesseract = await import('tesseract.js');
      
      console.log('🔄 Analyse OCR de l\'image...');
      const { data: { text } } = await Tesseract.recognize(file, 'fra');
      console.log('✅ OCR terminé');
      
      return text;
    } catch (error) {
      console.error('Erreur OCR Tesseract:', error);
      throw new Error('Impossible d\'extraire le texte de l\'image');
    }
  }

  /**
   * Crée une structure de données basique sans IA
   */
  private createBasicExtractedData(text: string): ExtractedData {
    // Analyse basique avec nlp-compromise (léger)
    const doc = nlp(text);
    
    // Extraction d'entités basiques
    const entities: LegalEntity[] = [];
    
    // Dates - utilisation basique sans dates()
    const dateMatches = text.match(/\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}/g) || [];
    dateMatches.forEach((dateMatch) => {
      entities.push({
        type: 'date',
        value: dateMatch,
        position: { start: 0, end: 0 }, // Position approximative
        confidence: 0.7
      });
    });

    // Numéros (articles, lois, etc.)
    const numbers = text.match(/\b(?:article|loi|décret)\s+n°?\s*\d+/gi) || [];
    numbers.forEach((match, index) => {
      entities.push({
        type: match.toLowerCase().includes('article') ? 'article' : 
              match.toLowerCase().includes('loi') ? 'law' : 'decree',
        value: match,
        position: { start: index * 10, end: index * 10 + match.length },
        confidence: 0.8
      });
    });

    return {
      text,
      tables: [], // Extraction de tableaux nécessiterait une analyse plus poussée
      entities,
      relations: [], // Relations nécessitent l'IA avancée
      confidence: 0.7,
      structure: {
        sections: [{
          id: 'main',
          title: 'Document principal',
          content: text,
          level: 1,
          position: { start: 0, end: text.length }
        }],
        hierarchy: []
      }
    };
  }

  /**
   * Analyse avancée avec les modèles Hugging Face
   */
  private async performAdvancedAnalysis(text: string, models: any): Promise<ExtractedData> {
    try {
      console.log('🤖 Analyse IA avancée en cours...');

      // Classification du texte
      const classification = await models.textClassifier(text.substring(0, 512));
      
      // Reconnaissance d'entités nommées
      const entities = await models.tokenClassifier(text.substring(0, 512));

      // Traitement des résultats...
      const processedEntities: LegalEntity[] = entities.map((entity: any) => ({
        type: this.mapEntityType(entity.entity),
        value: entity.word,
        position: { start: entity.start, end: entity.end },
        confidence: entity.score
      }));

      console.log('✅ Analyse IA terminée');

      return {
        text,
        tables: [], // TODO: Implémenter l'extraction de tableaux
        entities: processedEntities,
        relations: [], // TODO: Implémenter l'extraction de relations
        confidence: classification[0]?.score || 0.8,
        structure: {
          sections: [{
            id: 'main',
            title: 'Document analysé par IA',
            content: text,
            level: 1,
            position: { start: 0, end: text.length }
          }],
          hierarchy: []
        }
      };
    } catch (error) {
      console.error('Erreur analyse IA:', error);
      // Fallback vers l'analyse basique
      return this.createBasicExtractedData(text);
    }
  }

  /**
   * Mappe les types d'entités de Hugging Face vers notre système
   */
  private mapEntityType(entityType: string): LegalEntity['type'] {
    switch (entityType.toUpperCase()) {
      case 'PER': return 'institution';
      case 'ORG': return 'institution';
      case 'DATE': return 'date';
      case 'NUM': return 'number';
      default: return 'reference';
    }
  }

  /**
   * Vérifie si les modèles IA sont chargés
   */
  isAdvancedAILoaded(): boolean {
    return this.useAdvancedAI && huggingFaceCache !== null;
  }

  /**
   * Obtient la taille estimée des modèles IA
   */
  getAIModelsSize(): string {
    return '~21MB';
  }
}

// Export d'une instance singleton
export const optimizedOCRService = new OptimizedOCRService();
export default optimizedOCRService;
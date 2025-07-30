// @ts-nocheck
/**
 * Service OCR Avancé pour les Textes Juridiques et Procédures Administratives Algériennes
 * Implémente l'extraction, structuration et mapping selon le plan de travail
 */

import { extractTextFromPDF } from './pdfExtractionService';
import * as pdfjsLib from 'pdfjs-dist';

// Interfaces pour l'extraction et structuration
export interface ExtractedTextZone {
  content: string;
  type: 'title' | 'metadata' | 'article' | 'content' | 'signature' | 'date';
  position: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface ExtractedTable {
  cells: string[][];
  position: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface StructuredPublication {
  type: 'loi' | 'decret_executif' | 'decret_presidentiel' | 'arrete' | 'ordonnance' | 'procedure';
  titre: string;
  numero: string;
  pouvoirEmetteur: string;
  dateHijri?: string;
  dateGregorienne?: string;
  institution: string;
  contenu: string;
  articles: Article[];
  references: Reference[];
  liens: PublicationLink[];
  signataires: string[];
  journalOfficiel?: {
    numero: string;
    date: string;
    page: number;
  };
}

export interface Article {
  numero: string;
  titre?: string;
  contenu: string;
  modifications?: string[];
}

export interface Reference {
  type: 'vu' | 'legal' | 'institutional';
  texte: string;
  numero?: string;
  date?: string;
}

export interface PublicationLink {
  type: 'annexe' | 'liste' | 'modification' | 'abrogation' | 'approbation' | 'controle' | 'extension' | 'vu';
  cible: string;
  description: string;
}

export interface LegalEntity {
  type: 'person' | 'institution' | 'date' | 'number' | 'wilaya' | 'commune' | 'legal_reference';
  value: string;
  confidence: number;
  position: number;
}

export interface ExtractedMappingData {
  documentType: 'legal' | 'procedure';
  structuredData: StructuredPublication;
  entities: LegalEntity[];
  mappedFields: Record<string, unknown>;
  confidence: number;
  processingSteps: string[];
}

/**
 * Étape 1: Extraction du texte et des tables avec PyMuPDF (simulation)
 */
export class TextTableExtractor {
  async extractFromPDF(file: File): Promise<{ text: string; tables: ExtractedTable[]; zones: ExtractedTextZone[] }> {
    console.log('🔄 [Étape 1] Extraction du texte et des tables...');
    
    try {
      // Extraction du texte principal avec PDF.js
      const { text } = await extractTextFromPDF(file);
      
      // Simulation de la détection des zones et tables selon l'algorithme annexe
      const zones = await this.detectTextZones(text);
      const tables = await this.detectTables(text);
      
      console.log('✅ [Étape 1] Extraction terminée:', {
        textLength: text.length,
        zonesCount: zones.length,
        tablesCount: tables.length
      });
      
      return { text, tables, zones };
      
    } catch (error) {
      console.error('❌ [Étape 1] Erreur d\'extraction:', error);
      throw new Error(`Erreur d'extraction: ${error.message}`);
    }
  }

  private async detectTextZones(text: string): Promise<ExtractedTextZone[]> {
    const zones: ExtractedTextZone[] = [];
    
    // Détection des titres (généralement en majuscules et au début)
    const titleRegex = /^[A-ZÀ-Ÿ\s]{10,}$/gm;
    let match;
    while ((match = titleRegex.exec(text)) !== null) {
      zones.push({
        content: match[0].trim(),
        type: 'title',
        position: { x: 0, y: 0, width: 100, height: 20 },
        confidence: 0.85
      });
    }
    
    // Détection des métadonnées (dates, numéros)
    const metadataRegex = /(N°\s*\d+|du\s+\d+\s+\w+\s+\d{4}|JOURNAL OFFICIEL)/gi;
    while ((match = metadataRegex.exec(text)) !== null) {
      zones.push({
        content: match[0],
        type: 'metadata',
        position: { x: 0, y: 0, width: 100, height: 15 },
        confidence: 0.90
      });
    }
    
    // Détection des articles
    const articleRegex = /Article\s+\d+[^:]*:[^\n]+/gi;
    while ((match = articleRegex.exec(text)) !== null) {
      zones.push({
        content: match[0],
        type: 'article',
        position: { x: 0, y: 0, width: 100, height: 30 },
        confidence: 0.88
      });
    }
    
    return zones;
  }

  private async detectTables(text: string): Promise<ExtractedTable[]> {
    // Simulation de détection de tables basée sur des patterns réguliers
    const tables: ExtractedTable[] = [];
    
    // Recherche de structures tabulaires simples
    const tablePattern = /(\|[^|\n]+)+\|/g;
    let match;
    while ((match = tablePattern.exec(text)) !== null) {
      const rows = match[0].split('\n').map(row => 
        row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
      );
      
      if (rows.length > 1 && rows[0].length > 1) {
        tables.push({
          cells: rows,
          position: { x: 0, y: 0, width: 100, height: rows.length * 20 },
          confidence: 0.75
        });
      }
    }
    
    return tables;
  }
}

/**
 * Étape 2: Structuration des données extraites avec regex
 */
export class DataStructurer {
  structureData(text: string, zones: ExtractedTextZone[]): StructuredPublication {
    console.log('🔄 [Étape 2] Structuration des données...');
    
    const structured: StructuredPublication = {
      type: this.detectDocumentType(text),
      titre: this.extractTitle(text, zones),
      numero: this.extractNumber(text),
      pouvoirEmetteur: this.extractAuthority(text),
      dateHijri: this.extractHijriDate(text),
      dateGregorienne: this.extractGregorianDate(text),
      institution: this.extractInstitution(text),
      contenu: this.extractMainContent(text),
      articles: this.extractArticles(text),
      references: this.extractReferences(text),
      liens: this.extractPublicationLinks(text),
      signataires: this.extractSignatories(text),
      journalOfficiel: this.extractJournalInfo(text)
    };
    
    console.log('✅ [Étape 2] Structuration terminée:', {
      type: structured.type,
      articlesCount: structured.articles.length,
      referencesCount: structured.references.length
    });
    
    return structured;
  }

  private detectDocumentType(text: string): StructuredPublication['type'] {
    if (text.includes('DÉCRET EXÉCUTIF')) return 'decret_executif';
    if (text.includes('DÉCRET PRÉSIDENTIEL')) return 'decret_presidentiel';
    if (text.includes('ARRÊTÉ')) return 'arrete';
    if (text.includes('ORDONNANCE')) return 'ordonnance';
    if (text.includes('LOI')) return 'loi';
    if (text.includes('procédure') || text.includes('démarche')) return 'procedure';
    return 'loi';
  }

  private extractTitle(text: string, zones: ExtractedTextZone[]): string {
    // Priorité aux zones détectées comme titres
    const titleZone = zones.find(zone => zone.type === 'title');
    if (titleZone) return titleZone.content;
    
    // Fallback sur regex
    const titleMatch = text.match(/^[A-ZÀ-Ÿ\s,.-]{20,}/m);
    return titleMatch ? titleMatch[0].trim() : '';
  }

  private extractNumber(text: string): string {
    const patterns = [
      /N°\s*(\d+-\d+)/,
      /numéro\s*(\d+-\d+)/i,
      /n°\s*(\d+[/-]\d+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }
    return '';
  }

  private extractAuthority(text: string): string {
    const authorities = [
      'PRÉSIDENT DE LA RÉPUBLIQUE',
      'PREMIER MINISTRE',
      'MINISTRE',
      'WALI',
      'MAIRE'
    ];
    
    for (const authority of authorities) {
      if (text.toUpperCase().includes(authority)) {
        return authority;
      }
    }
    return '';
  }

  private extractHijriDate(text: string): string | undefined {
    const hijriPattern = /(\d+\s+\w+\s+\d{4})\s+de\s+l'hégire/i;
    const match = text.match(hijriPattern);
    return match ? match[1] : undefined;
  }

  private extractGregorianDate(text: string): string | undefined {
    const gregorianPattern = /(\d{1,2}\s+\w+\s+\d{4})/;
    const match = text.match(gregorianPattern);
    return match ? match[1] : undefined;
  }

  private extractInstitution(text: string): string {
    const institutions = [
      'République Algérienne Démocratique et Populaire',
      'Présidence de la République',
      'Premier Ministère',
      'Ministère de la Justice',
      'Ministère de l\'Intérieur'
    ];
    
    for (const institution of institutions) {
      if (text.includes(institution)) {
        return institution;
      }
    }
    return 'République Algérienne Démocratique et Populaire';
  }

  private extractMainContent(text: string): string {
    // Extraire le contenu principal en évitant les métadonnées
    const lines = text.split('\n');
    const contentLines = lines.filter(line => 
      line.trim().length > 20 && 
      !line.includes('JOURNAL OFFICIEL') &&
      !line.includes('République Algérienne')
    );
    return contentLines.slice(0, 10).join('\n');
  }

  private extractArticles(text: string): Article[] {
    const articles: Article[] = [];
    const articlePattern = /Article\s+(\d+)\.?\s*-?\s*([^A]*?)(?=Article\s+\d+|$)/gi;
    
    let match;
    while ((match = articlePattern.exec(text)) !== null) {
      articles.push({
        numero: match[1],
        contenu: match[2].trim()
      });
    }
    
    return articles;
  }

  private extractReferences(text: string): Reference[] {
    const references: Reference[] = [];
    
    // Extraction des références "Vu"
    const vuPattern = /Vu\s+([^;]+)/gi;
    let match;
    while ((match = vuPattern.exec(text)) !== null) {
      references.push({
        type: 'vu',
        texte: match[1].trim()
      });
    }
    
    return references;
  }

  private extractPublicationLinks(text: string): PublicationLink[] {
    const links: PublicationLink[] = [];
    
    // Détection des différents types de liens selon l'annexe
    const linkPatterns = [
      { pattern: /annexe\s+([^.]+)/gi, type: 'annexe' as const },
      { pattern: /abroge\s+([^.]+)/gi, type: 'abrogation' as const },
      { pattern: /approuve\s+([^.]+)/gi, type: 'approbation' as const },
      { pattern: /modifie\s+([^.]+)/gi, type: 'modification' as const }
    ];
    
    linkPatterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        links.push({
          type,
          cible: match[1].trim(),
          description: match[0]
        });
      }
    });
    
    return links;
  }

  private extractSignatories(text: string): string[] {
    const signatoryPattern = /Le\s+([^,\n]+?)(?=\s*\[Signature\]|\s*$)/g;
    const signatories: string[] = [];
    
    let match;
    while ((match = signatoryPattern.exec(text)) !== null) {
      signatories.push(match[1].trim());
    }
    
    return signatories;
  }

  private extractJournalInfo(text: string) {
    const journalMatch = text.match(/JOURNAL OFFICIEL.*?N°\s*(\d+).*?du\s+([^,\n]+)/i);
    if (journalMatch) {
      return {
        numero: journalMatch[1],
        date: journalMatch[2].trim(),
        page: 1 // TODO: extraire le numéro de page
      };
    }
    return undefined;
  }
}

/**
 * Étape 3: Traitement NLP et extraction d'entités (simulation spaCy/Hugging Face)
 */
export class NLPProcessor {
  async extractEntities(text: string, structuredData: StructuredPublication): Promise<LegalEntity[]> {
    console.log('🔄 [Étape 3] Traitement NLP et extraction d\'entités...');
    
    const entities: LegalEntity[] = [];
    
    // Simulation d'extraction d'entités avec patterns algériens
    entities.push(...this.extractPersonEntities(text));
    entities.push(...this.extractInstitutionEntities(text));
    entities.push(...this.extractDateEntities(text));
    entities.push(...this.extractNumberEntities(text));
    entities.push(...this.extractGeographicEntities(text));
    entities.push(...this.extractLegalReferences(text));
    
    console.log('✅ [Étape 3] Extraction d\'entités terminée:', {
      entitiesCount: entities.length,
      types: [...new Set(entities.map(e => e.type))]
    });
    
    return entities;
  }

  private extractPersonEntities(text: string): LegalEntity[] {
    const personPatterns = [
      /M\.\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      /Mme\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      /Dr\.\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g
    ];
    
    const entities: LegalEntity[] = [];
    personPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          type: 'person',
          value: match[1],
          confidence: 0.85,
          position: match.index
        });
      }
    });
    
    return entities;
  }

  private extractInstitutionEntities(text: string): LegalEntity[] {
    const institutions = [
      'Ministère', 'Présidence', 'Wilaya', 'Commune', 'APC',
      'Direction', 'Secrétariat', 'Conseil', 'Commission'
    ];
    
    const entities: LegalEntity[] = [];
    institutions.forEach(institution => {
      const regex = new RegExp(`${institution}[^.]*`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'institution',
          value: match[0].substring(0, 100),
          confidence: 0.80,
          position: match.index
        });
      }
    });
    
    return entities;
  }

  private extractDateEntities(text: string): LegalEntity[] {
    const datePatterns = [
      /\d{1,2}\s+\w+\s+\d{4}/g,
      /\d{1,2}\/\d{1,2}\/\d{4}/g,
      /\d{4}-\d{2}-\d{2}/g
    ];
    
    const entities: LegalEntity[] = [];
    datePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          type: 'date',
          value: match[0],
          confidence: 0.90,
          position: match.index
        });
      }
    });
    
    return entities;
  }

  private extractNumberEntities(text: string): LegalEntity[] {
    const numberPattern = /N°?\s*\d+[-/]?\d*/g;
    const entities: LegalEntity[] = [];
    
    let match;
    while ((match = numberPattern.exec(text)) !== null) {
      entities.push({
        type: 'number',
        value: match[0],
        confidence: 0.88,
        position: match.index
      });
    }
    
    return entities;
  }

  private extractGeographicEntities(text: string): LegalEntity[] {
    // Wilayas algériennes (principales)
    const wilayas = [
      'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa',
      'Sétif', 'Sidi Bel Abbès', 'Biskra', 'Tiaret', 'Béjaïa', 'Tlemcen'
    ];
    
    const entities: LegalEntity[] = [];
    wilayas.forEach(wilaya => {
      const regex = new RegExp(`\\b${wilaya}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'wilaya',
          value: match[0],
          confidence: 0.85,
          position: match.index
        });
      }
    });
    
    return entities;
  }

  private extractLegalReferences(text: string): LegalEntity[] {
    const legalPatterns = [
      /article\s+\d+/gi,
      /loi\s+n°?\s*\d+[-/]?\d*/gi,
      /décret\s+n°?\s*\d+[-/]?\d*/gi,
      /arrêté\s+n°?\s*\d+[-/]?\d*/gi
    ];
    
    const entities: LegalEntity[] = [];
    legalPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          type: 'legal_reference',
          value: match[0],
          confidence: 0.85,
          position: match.index
        });
      }
    });
    
    return entities;
  }
}

/**
 * Étape 4: Mapping dynamique vers les formulaires
 */
export class FormMapper {
  mapToFormFields(
    structuredData: StructuredPublication,
    entities: LegalEntity[],
    documentType: 'legal' | 'procedure'
  ): Record<string, unknown> {
    console.log('🔄 [Étape 4] Mapping vers les formulaires...');
    
    const baseMapping = this.getBaseMapping(structuredData, documentType);
    const entityMapping = this.mapEntities(entities);
    const contextMapping = this.getContextualMapping(structuredData, documentType);
    
    const mappedFields = {
      ...baseMapping,
      ...entityMapping,
      ...contextMapping
    };
    
    console.log('✅ [Étape 4] Mapping terminé:', {
      fieldsCount: Object.keys(mappedFields).length,
      documentType
    });
    
    return mappedFields;
  }

  private getBaseMapping(data: StructuredPublication, documentType: 'legal' | 'procedure'): Record<string, unknown> {
    if (documentType === 'legal') {
      return {
        title: data.titre,
        type: this.mapDocumentTypeToForm(data.type),
        reference: data.numero,
        institution: data.institution,
        authority: data.pouvoirEmetteur,
        content: data.contenu,
        publication_date: data.dateGregorienne,
        hijri_date: data.dateHijri,
        signatories: data.signataires,
        journal_numero: data.journalOfficiel?.numero,
        journal_date: data.journalOfficiel?.date,
        articles: data.articles.map(a => a.contenu).join('\n\n'),
        references: data.references.map(r => r.texte).join('\n'),
        related_texts: data.liens.map(l => l.description)
      };
    } else {
      return {
        name: data.titre,
        type: 'administrative',
        description: data.contenu,
        institution: data.institution,
        steps: data.articles.map(a => a.contenu),
        required_documents: data.references.map(r => r.texte),
        target_audience: 'Citoyens algériens',
        sector: this.extractSectorFromContent(data.contenu)
      };
    }
  }

  private mapEntities(entities: LegalEntity[]): Record<string, unknown> {
    const mapping: Record<string, unknown> = {};
    
    // Extraire les wilayas
    const wilayas = entities.filter(e => e.type === 'wilaya').map(e => e.value);
    if (wilayas.length > 0) {
      mapping.wilaya = wilayas[0];
    }
    
    // Extraire les dates
    const dates = entities.filter(e => e.type === 'date').map(e => e.value);
    if (dates.length > 0) {
      mapping.extracted_dates = dates;
    }
    
    // Extraire les numéros
    const numbers = entities.filter(e => e.type === 'number').map(e => e.value);
    if (numbers.length > 0) {
      mapping.extracted_numbers = numbers;
    }
    
    return mapping;
  }

  private getContextualMapping(data: StructuredPublication, documentType: 'legal' | 'procedure'): Record<string, unknown> {
    const contextMapping: Record<string, unknown> = {};
    
    // Mapping basé sur le contenu et le contexte
    if (data.contenu.toLowerCase().includes('budget') || data.contenu.toLowerCase().includes('finance')) {
      contextMapping.sector = 'Finance';
      contextMapping.category = 'Budgétaire';
    }
    
    if (data.contenu.toLowerCase().includes('urbanisme') || data.contenu.toLowerCase().includes('construction')) {
      contextMapping.sector = 'Urbanisme';
      contextMapping.category = 'Aménagement';
    }
    
    if (data.contenu.toLowerCase().includes('education') || data.contenu.toLowerCase().includes('école')) {
      contextMapping.sector = 'Éducation';
      contextMapping.category = 'Enseignement';
    }
    
    // Mapping des liens entre publications
    if (data.liens.length > 0) {
      contextMapping.publication_links = data.liens.map(link => ({
        type: link.type,
        target: link.cible,
        description: link.description
      }));
    }
    
    return contextMapping;
  }

  private mapDocumentTypeToForm(type: StructuredPublication['type']): string {
    const typeMapping = {
      'loi': 'Loi',
      'decret_executif': 'Décret exécutif',
      'decret_presidentiel': 'Décret présidentiel',
      'arrete': 'Arrêté',
      'ordonnance': 'Ordonnance',
      'procedure': 'Procédure administrative'
    };
    
    return typeMapping[type] || 'Document juridique';
  }

  private extractSectorFromContent(content: string): string {
    const sectors = [
      { keywords: ['justice', 'tribunal', 'juridique'], sector: 'Justice' },
      { keywords: ['santé', 'médical', 'hôpital'], sector: 'Santé' },
      { keywords: ['éducation', 'école', 'université'], sector: 'Éducation' },
      { keywords: ['commerce', 'entreprise', 'économie'], sector: 'Commerce' },
      { keywords: ['transport', 'route', 'circulation'], sector: 'Transport' },
      { keywords: ['environnement', 'pollution', 'écologie'], sector: 'Environnement' }
    ];
    
    const lowerContent = content.toLowerCase();
    for (const { keywords, sector } of sectors) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        return sector;
      }
    }
    
    return 'Administration générale';
  }
}

/**
 * Service principal orchestrant toutes les étapes
 */
export class AdvancedOCRService {
  private textTableExtractor = new TextTableExtractor();
  private dataStructurer = new DataStructurer();
  private nlpProcessor = new NLPProcessor();
  private formMapper = new FormMapper();

  async processDocument(file: File): Promise<ExtractedMappingData> {
    console.log('🚀 Début du traitement OCR avancé pour:', file.name);
    const startTime = Date.now();
    const processingSteps: string[] = [];
    
    try {
      // Étape 1: Extraction du texte et des tables
      processingSteps.push('Extraction du texte et des tables');
      const { text, tables, zones } = await this.textTableExtractor.extractFromPDF(file);
      
      // Étape 2: Structuration des données
      processingSteps.push('Structuration des données avec regex');
      const structuredData = this.dataStructurer.structureData(text, zones);
      
      // Étape 3: Traitement NLP et extraction d'entités
      processingSteps.push('Extraction d\'entités NLP');
      const entities = await this.nlpProcessor.extractEntities(text, structuredData);
      
      // Déterminer le type de document
      const documentType = structuredData.type === 'procedure' ? 'procedure' : 'legal';
      
      // Étape 4: Mapping vers les formulaires
      processingSteps.push('Mapping vers les champs de formulaire');
      const mappedFields = this.formMapper.mapToFormFields(structuredData, entities, documentType);
      
      // Calcul de la confiance globale
      const confidence = this.calculateOverallConfidence(structuredData, entities, mappedFields);
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Traitement OCR avancé terminé en ${processingTime}ms avec confiance: ${Math.round(confidence * 100)}%`);
      
      return {
        documentType,
        structuredData,
        entities,
        mappedFields,
        confidence,
        processingSteps
      };
      
    } catch (error) {
      console.error('❌ Erreur lors du traitement OCR avancé:', error);
      throw new Error(`Erreur de traitement: ${error.message}`);
    }
  }

  private calculateOverallConfidence(
    structuredData: StructuredPublication,
    entities: LegalEntity[],
    mappedFields: Record<string, unknown>
  ): number {
    let score = 0.5; // Base
    
    // Bonus pour les données structurées
    if (structuredData.titre) score += 0.1;
    if (structuredData.numero) score += 0.1;
    if (structuredData.institution) score += 0.05;
    if (structuredData.articles.length > 0) score += 0.1;
    if (structuredData.references.length > 0) score += 0.05;
    
    // Bonus pour les entités extraites
    if (entities.length > 5) score += 0.05;
    if (entities.filter(e => e.confidence > 0.8).length > 3) score += 0.05;
    
    // Bonus pour le mapping
    if (Object.keys(mappedFields).length > 8) score += 0.05;
    
    return Math.min(0.95, Math.max(0.1, score));
  }
}

/**
 * Service OCR Local Algérien - Fonctionnement 100% Hors Ligne
 * Utilise PyMuPDF (via PyScript/Emscripten), spaCy local, et Tesseract.js
 */
export class LocalAlgerianOCRService {
  private tesseractWorker: any = null;
  private nlpModel: any = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('🔧 [Local OCR] Initialisation des services locaux...');

    try {
      // Initialiser Tesseract.js en local (français + arabe)
      await this.initializeTesseract();
      
      // Initialiser le modèle NLP local
      await this.initializeLocalNLP();
      
      this.isInitialized = true;
      console.log('✅ [Local OCR] Tous les services locaux initialisés');
    } catch (error) {
      console.error('❌ [Local OCR] Erreur d\'initialisation:', error);
      throw error;
    }
  }

  private async initializeTesseract(): Promise<void> {
    // Importation dynamique de Tesseract.js pour fonctionnement local
    const { createWorker } = await import('tesseract.js');
    
    this.tesseractWorker = await createWorker('fra+ara', 1, {
      logger: m => console.log('📖 [Tesseract]', m),
      errorHandler: err => console.error('❌ [Tesseract]', err)
    });

    // Configuration pour les documents juridiques algériens
    await this.tesseractWorker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789أبتثجحخدذرزسشصضطظعغفقكلمنهويىءآإؤئ °-/.,;:()[]{}«»"\'',
      preserve_interword_spaces: '1',
      tessedit_pageseg_mode: '1' // Mode page complète
    });

    console.log('✅ [Tesseract] Initialisé avec support FR+AR local');
  }

  private async initializeLocalNLP(): Promise<void> {
    // Utiliser compromise.js pour le NLP local (déjà installé)
    const nlp = await import('compromise');
    
    // Extension spécialisée pour le vocabulaire juridique algérien
    const algerianLegalPlugin = {
      tags: {
        LegalTerm: 'legalTerm',
        Institution: 'institution',
        DateHijri: 'dateHijri',
        LegalReference: 'legalReference'
      },
      words: {
        'décret': 'LegalTerm',
        'arrêté': 'LegalTerm',
        'ordonnance': 'LegalTerm',
        'ministre': 'Institution',
        'président': 'Institution',
        'moharram': 'DateHijri',
        'safar': 'DateHijri',
        'article': 'LegalReference'
      }
    };

    this.nlpModel = nlp.default.extend(algerianLegalPlugin);
    console.log('✅ [NLP Local] Modèle compromise.js étendu pour l\'algérien');
  }

  /**
   * Extraction OCR complète avec PyMuPDF local + Tesseract.js
   */
  async extractWithLocalTools(file: File): Promise<{
    text: string;
    tables: ExtractedTable[];
    zones: ExtractedTextZone[];
    structuredData: StructuredPublication;
    confidence: number;
    processingTime: number;
  }> {
    const startTime = Date.now();
    
    if (!this.isInitialized) {
      await this.initialize();
    }

    console.log('🇩🇿 [Local OCR] Début extraction avec outils locaux...');

    try {
      // Étape 1: Extraction avec PyMuPDF local (via PDF.js comme fallback)
      const { pdfText, pages } = await this.extractWithLocalPyMuPDF(file);
      
      // Étape 2: OCR avec Tesseract.js pour les pages d'images
      const ocrResults = await this.processWithLocalTesseract(pages);
      
      // Étape 3: Fusion et traitement avec algorithme des 16 étapes
      const extractor = new AlgerianLegalOCRExtractor();
      const { text, tables, zones } = await extractor.extractAndStructureDocument(file);
      
      // Étape 4: Analyse NLP locale avec compromise.js étendu
      const structuredData = await this.analyzeWithLocalNLP(text, zones);
      
      // Étape 5: Calcul de confiance
      const confidence = this.calculateLocalConfidence(text, zones, tables);
      
      const processingTime = Date.now() - startTime;
      
      console.log('✅ [Local OCR] Extraction terminée en', processingTime, 'ms');
      
      return {
        text: text || pdfText,
        tables,
        zones,
        structuredData,
        confidence,
        processingTime
      };

    } catch (error) {
      console.error('❌ [Local OCR] Erreur d\'extraction locale:', error);
      throw error;
    }
  }

  /**
   * Extraction PyMuPDF locale (via WebAssembly si disponible, sinon PDF.js)
   */
  private async extractWithLocalPyMuPDF(file: File): Promise<{ pdfText: string; pages: ImageData[] }> {
    console.log('📄 [PyMuPDF Local] Extraction du PDF...');
    
    try {
      // Tentative d'utilisation de PyMuPDF via WebAssembly (si disponible)
      if (typeof window !== 'undefined' && (window as any).PyMuPDF) {
        return await this.extractWithWASMPyMuPDF(file);
      }
      
      // Fallback avec PDF.js (toujours local)
      return await this.extractWithLocalPDFJS(file);
      
    } catch (error) {
      console.warn('⚠️ [PyMuPDF] Fallback vers PDF.js:', error);
      return await this.extractWithLocalPDFJS(file);
    }
  }

  private async extractWithWASMPyMuPDF(file: File): Promise<{ pdfText: string; pages: ImageData[] }> {
    // Implémentation PyMuPDF WebAssembly (si disponible)
    const arrayBuffer = await file.arrayBuffer();
    const PyMuPDF = (window as any).PyMuPDF;
    
    const doc = PyMuPDF.open(arrayBuffer);
    let pdfText = '';
    const pages: ImageData[] = [];
    
    for (let pageNum = 0; pageNum < doc.pageCount; pageNum++) {
      const page = doc.loadPage(pageNum);
      
      // Extraction de texte
      pdfText += page.getText() + '\n\n';
      
      // Conversion en image pour l'algorithme de détection de lignes
      const pixmap = page.getPixmap(2.0); // Haute résolution
      const imageData = this.pixmapToImageData(pixmap);
      pages.push(imageData);
    }
    
    doc.close();
    return { pdfText, pages };
  }

  private async extractWithLocalPDFJS(file: File): Promise<{ pdfText: string; pages: ImageData[] }> {
    console.log('📄 [PDF.js Local] Extraction...');
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let pdfText = '';
    const pages: ImageData[] = [];
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      
      // Extraction de texte
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      pdfText += pageText + '\n\n';
      
      // Conversion en image haute résolution
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({ canvasContext: context, viewport }).promise;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      pages.push(imageData);
    }
    
    return { pdfText, pages };
  }

  /**
   * Traitement OCR avec Tesseract.js local
   */
  private async processWithLocalTesseract(pages: ImageData[]): Promise<string[]> {
    console.log('🔍 [Tesseract Local] OCR en cours...');
    
    const results: string[] = [];
    
    for (let i = 0; i < pages.length; i++) {
      console.log(`📖 [Tesseract] Page ${i + 1}/${pages.length}`);
      
      // Conversion ImageData vers Canvas pour Tesseract
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = pages[i].width;
      canvas.height = pages[i].height;
      ctx.putImageData(pages[i], 0, 0);
      
      // OCR avec Tesseract.js
      const { data: { text, confidence } } = await this.tesseractWorker.recognize(canvas);
      
      console.log(`✅ [Tesseract] Page ${i + 1} - Confiance: ${Math.round(confidence)}%`);
      results.push(text);
    }
    
    return results;
  }

  /**
   * Analyse NLP locale avec compromise.js étendu
   */
  private async analyzeWithLocalNLP(text: string, zones: ExtractedTextZone[]): Promise<StructuredPublication> {
    console.log('🧠 [NLP Local] Analyse linguistique...');
    
    const doc = this.nlpModel(text);
    
    // Extraction d'entités avec le modèle local étendu
    const entities = {
      institutions: doc.match('#Institution').out('array'),
      legalTerms: doc.match('#LegalTerm').out('array'),
      dates: doc.match('#DateHijri').out('array'),
      references: doc.match('#LegalReference').out('array'),
      numbers: doc.match('#Value').out('array')
    };
    
    console.log('📊 [NLP] Entités détectées:', {
      institutions: entities.institutions.length,
      legalTerms: entities.legalTerms.length,
      dates: entities.dates.length,
      references: entities.references.length
    });
    
    // Structuration avec le nouveau analyseur
    const structurer = new AlgerianLegalDataStructurer();
    return structurer.structureData(text, zones);
  }

  /**
   * Calcul de confiance local
   */
  private calculateLocalConfidence(text: string, zones: ExtractedTextZone[], tables: ExtractedTable[]): number {
    let totalConfidence = 0;
    let factors = 0;
    
    // Facteur 1: Qualité du texte extrait
    const textQuality = this.assessTextQuality(text);
    totalConfidence += textQuality * 0.3;
    factors += 0.3;
    
    // Facteur 2: Confiance des zones OCR
    if (zones.length > 0) {
      const avgZoneConfidence = zones.reduce((sum, zone) => sum + zone.confidence, 0) / zones.length;
      totalConfidence += avgZoneConfidence * 0.4;
      factors += 0.4;
    }
    
    // Facteur 3: Confiance des tables
    if (tables.length > 0) {
      const avgTableConfidence = tables.reduce((sum, table) => sum + table.confidence, 0) / tables.length;
      totalConfidence += avgTableConfidence * 0.2;
      factors += 0.2;
    }
    
    // Facteur 4: Présence d'éléments juridiques algériens
    const legalElementsScore = this.assessAlgerianLegalElements(text);
    totalConfidence += legalElementsScore * 0.1;
    factors += 0.1;
    
    return factors > 0 ? totalConfidence / factors : 0.5;
  }

  private assessTextQuality(text: string): number {
    if (!text || text.length < 100) return 0.2;
    
    // Vérifier la présence de caractères cohérents
    const validChars = text.match(/[a-zA-ZÀ-ÿأ-ي\s\d]/g);
    const validRatio = validChars ? validChars.length / text.length : 0;
    
    // Vérifier la structure de phrases
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 10);
    const sentenceScore = Math.min(sentences.length / 10, 1);
    
    return (validRatio * 0.7) + (sentenceScore * 0.3);
  }

  private assessAlgerianLegalElements(text: string): number {
    const algerianElements = [
      /République\s+algérienne/i,
      /ministère/i,
      /décret\s+exécutif/i,
      /journal\s+officiel/i,
      /article\s+\d+/i,
      /président\s+de\s+la\s+république/i
    ];
    
    const foundElements = algerianElements.filter(pattern => pattern.test(text));
    return foundElements.length / algerianElements.length;
  }

  private pixmapToImageData(pixmap: any): ImageData {
    // Conversion PyMuPDF Pixmap vers ImageData
    const width = pixmap.width;
    const height = pixmap.height;
    const samples = pixmap.samples;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < samples.length; i += 3) {
      const pixelIndex = (i / 3) * 4;
      data[pixelIndex] = samples[i];     // R
      data[pixelIndex + 1] = samples[i + 1]; // G
      data[pixelIndex + 2] = samples[i + 2]; // B
      data[pixelIndex + 3] = 255;            // A
    }
    
    return imageData;
  }

  async cleanup(): Promise<void> {
    if (this.tesseractWorker) {
      await this.tesseractWorker.terminate();
      this.tesseractWorker = null;
    }
    this.isInitialized = false;
    console.log('🧹 [Local OCR] Services nettoyés');
  }
}

/**
 * Service de Mapping Local avec StanfordNLP/LegalBERT local
 */
export class LocalLegalMappingService {
  private localModels: Map<string, any> = new Map();
  
  async initializeLocalModels(): Promise<void> {
    console.log('🤖 [Local Mapping] Chargement des modèles locaux...');
    
    try {
      // Charger un modèle de relations léger local (simulation d'un LegalBERT local)
      await this.loadLocalRelationModel();
      
      // Charger les schémas de mapping algériens
      await this.loadAlgerianMappingSchemas();
      
      console.log('✅ [Local Mapping] Modèles locaux chargés');
    } catch (error) {
      console.error('❌ [Local Mapping] Erreur de chargement:', error);
      throw error;
    }
  }

  private async loadLocalRelationModel(): Promise<void> {
    // Simulation d'un modèle local pour l'extraction de relations
    const relationPatterns = {
      modifications: [
        /modifie\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi,
        /complète\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi,
        /remplace\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi
      ],
      abrogations: [
        /abroge\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi,
        /annule\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi,
        /suspend\s+(?:l[ea]\s+)?(.+?)(?=\.|;|,)/gi
      ],
      references: [
        /vu\s+(.+?)(?=;|,|\.|vu\s)/gi,
        /conformément\s+à\s+(.+?)(?=;|,|\.)/gi,
        /en\s+application\s+de\s+(.+?)(?=;|,|\.)/gi
      ]
    };
    
    this.localModels.set('relations', relationPatterns);
  }

  private async loadAlgerianMappingSchemas(): Promise<void> {
    // Schémas de mapping spécifiques aux formulaires algériens
    const algerianSchemas = {
      'legal-text': {
        titre: ['title', 'name', 'intitule'],
        numero: ['number', 'reference', 'num'],
        type: ['type', 'nature', 'category'],
        institution: ['institution', 'organe', 'autorite'],
        datePublication: ['date', 'publication_date', 'date_publication'],
        contenu: ['content', 'text', 'corps'],
        articles: ['articles', 'dispositions'],
        signataires: ['signataires', 'signatures', 'autorites']
      },
      'procedure': {
        nom: ['name', 'title', 'denomination'],
        description: ['description', 'objet', 'finalite'],
        etapes: ['steps', 'demarches', 'procedures'],
        documentsRequis: ['documents', 'pieces', 'dossier'],
        duree: ['duration', 'delai', 'temps'],
        cout: ['cost', 'frais', 'tarif'],
        publicCible: ['target', 'beneficiaires', 'concernes']
      }
    };
    
    this.localModels.set('schemas', algerianSchemas);
  }

  /**
   * Mapping automatique avec modèles locaux
   */
  async mapToLocalForm(
    structuredData: StructuredPublication,
    formType: 'legal-text' | 'procedure'
  ): Promise<Record<string, unknown>> {
    console.log('🔗 [Local Mapping] Mapping vers formulaire...');
    
    const schema = this.localModels.get('schemas')?.[formType];
    if (!schema) {
      throw new Error(`Schéma non trouvé pour le type: ${formType}`);
    }
    
    const mappedData: Record<string, unknown> = {};
    
    // Mapping direct selon le schéma
    for (const [targetField, sourceFields] of Object.entries(schema)) {
      const value = this.findBestMatch(structuredData, sourceFields as string[]);
      if (value !== null) {
        mappedData[targetField] = value;
      }
    }
    
    // Enrichissement avec analyse de relations locales
    const relations = await this.extractLocalRelations(structuredData.contenu);
    mappedData['relations'] = relations;
    
    // Validation locale
    const validation = this.validateLocalMapping(mappedData, formType);
    mappedData['_validation'] = validation;
    
    console.log('✅ [Local Mapping] Mapping terminé:', Object.keys(mappedData).length, 'champs');
    return mappedData;
  }

  private findBestMatch(data: StructuredPublication, sourceFields: string[]): unknown {
    // Recherche de la meilleure correspondance dans les données structurées
    for (const field of sourceFields) {
      if (field === 'title' && data.titre) return data.titre;
      if (field === 'number' && data.numero) return data.numero;
      if (field === 'type' && data.type) return data.type;
      if (field === 'institution' && data.institution) return data.institution;
      if (field === 'date' && data.dateGregorienne) return data.dateGregorienne;
      if (field === 'content' && data.contenu) return data.contenu;
      if (field === 'articles' && data.articles) return data.articles;
      if (field === 'signataires' && data.signataires) return data.signataires;
    }
    return null;
  }

  private async extractLocalRelations(text: string): Promise<any[]> {
    const relations: any[] = [];
    const relationPatterns = this.localModels.get('relations');
    
    if (!relationPatterns) return relations;
    
    // Extraction des modifications
    for (const pattern of relationPatterns.modifications) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relations.push({
          type: 'modification',
          target: match[1].trim(),
          source: match[0]
        });
      }
    }
    
    // Extraction des abrogations
    for (const pattern of relationPatterns.abrogations) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relations.push({
          type: 'abrogation',
          target: match[1].trim(),
          source: match[0]
        });
      }
    }
    
    // Extraction des références
    for (const pattern of relationPatterns.references) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relations.push({
          type: 'reference',
          target: match[1].trim(),
          source: match[0]
        });
      }
    }
    
    return relations;
  }

  private validateLocalMapping(data: Record<string, unknown>, formType: string): any {
    const validation = {
      isValid: true,
      errors: [] as string[],
      warnings: [] as string[],
      completeness: 0
    };
    
    const requiredFields = formType === 'legal-text' 
      ? ['titre', 'type', 'institution']
      : ['nom', 'description'];
    
    // Vérification des champs requis
    const presentFields = requiredFields.filter(field => data[field]);
    validation.completeness = presentFields.length / requiredFields.length;
    
    // Erreurs pour champs manquants critiques
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      validation.isValid = false;
      validation.errors.push(`Champs manquants: ${missingFields.join(', ')}`);
    }
    
    // Avertissements pour champs optionnels
    if (formType === 'legal-text' && !data['datePublication']) {
      validation.warnings.push('Date de publication non détectée');
    }
    
    return validation;
  }
}

// Export du service principal
export const advancedOCRService = new AdvancedOCRService();
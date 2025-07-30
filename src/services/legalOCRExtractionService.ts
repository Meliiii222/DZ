/**
 * Service d'extraction OCR pour les textes juridiques algériens
 * Implémente l'algorithme d'extraction et structuration selon l'annexe
 */

import { sanitizeInput } from '@/utils/basicSecurity';
import { imageProcessingService, ProcessedPage } from './imageProcessingService';
import { legalRelationshipService, LegalRelationship } from './legalRelationshipService';

// Types pour les données extraites
export interface ExtractedText {
  content: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence: number;
  type: 'text' | 'table' | 'header' | 'footer';
}

export interface ExtractedTable {
  cells: ExtractedCell[][];
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  headers?: string[];
}

export interface ExtractedCell {
  content: string;
  colspan: number;
  rowspan: number;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LegalEntity {
  type: 'loi' | 'decret' | 'arrete' | 'ordonnance' | 'decision' | 'circulaire' | 'instruction' | 'avis' | 'proclamation';
  number?: string;
  date?: {
    gregorian?: string;
    hijri?: string;
  };
  title: string;
  issuingAuthority: string;
  content: string;
  articles: LegalArticle[];
  references: LegalReference[];
}

export interface LegalArticle {
  number: string;
  content: string;
  subsections?: LegalArticle[];
}

export interface LegalReference {
  type: 'vu' | 'modification' | 'abrogation' | 'approbation' | 'annexe' | 'extension' | 'controle';
  targetDocument: string;
  description: string;
}

export interface StructuredLegalDocument {
  metadata: {
    documentType: string;
    extractionDate: string;
    confidence: number;
    processingTime: number;
    pagesProcessed: number;
    imageProcessingEnabled: boolean;
  };
  entities: LegalEntity[];
  tables: ExtractedTable[];
  rawText: ExtractedText[];
  relationships: LegalRelationship[];
  processedPages: ProcessedPage[];
}

class LegalOCRExtractionService {
  private readonly borderPatterns = {
    topLines: 3,
    bottomLines: 2,
    sideLines: 2
  };

  private readonly legalTypePatterns = {
    loi: /\b(?:loi|LOI)\s+n[°]\s*(\d+[-/]\d+)/gi,
    decret: /\b(?:décret|DÉCRET|decret|DECRET)\s+(?:présidentiel|exécutif|législatif)?\s*n[°]\s*(\d+[-/]\d+)/gi,
    arrete: /\b(?:arrêté|ARRÊTÉ|arrete|ARRETE)\s+(?:ministériel|interministériel)?\s*n[°]\s*(\d+)/gi,
    ordonnance: /\b(?:ordonnance|ORDONNANCE)\s+n[°]\s*(\d+[-/]\d+)/gi,
    decision: /\b(?:décision|DÉCISION|decision|DECISION)\s+n[°]\s*(\d+)/gi,
    circulaire: /\b(?:circulaire|CIRCULAIRE)\s+n[°]\s*(\d+)/gi,
    instruction: /\b(?:instruction|INSTRUCTION)\s+n[°]\s*(\d+)/gi
  };

  private readonly datePatterns = {
    gregorian: /(\d{1,2})\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/gi,
    hijri: /(\d{1,2})\s+(?:Moharram|Safar|Rabia\s+El\s+Aouel|Rabia\s+Ethani|Joumada\s+El\s+Aouel|Joumada\s+Ethania|Rajab|Chaâbane|Ramadhan|Chaoual|Dou\s+El\s+Kaâda|Dou\s+El\s+Hidja)\s+(\d{4})/gi,
    correspondence: /correspondant\s+au\s+(\d{1,2})\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/gi
  };

  private readonly referencePatterns = {
    vu: /\bVu\s+(?:la\s+|le\s+|l')?([^;]+);?/gi,
    modification: /\bmodifi(?:e|ant)\s+([^;]+)/gi,
    abrogation: /\babrog(?:e|ée|eant)\s+([^;]+)/gi,
    approbation: /\bapprouv(?:e|ée|ant)\s+([^;]+)/gi,
    annexe: /\bannexe\s+([^;]+)/gi,
    extension: /\bétend(?:u|ue|ant)\s+([^;]+)/gi
  };

  private readonly institutionPatterns = {
    president: /\bPrésident\s+de\s+la\s+République/gi,
    premier_ministre: /\bPremier\s+[Mm]inistre/gi,
    ministre: /\b[Mm]inistre\s+(?:de\s+|du\s+|des\s+)?([^,;]+)/gi,
    assemblee: /\bAssemblée\s+[Pp]opulaire\s+[Nn]ationale/gi,
    conseil: /\b[Cc]onseil\s+(?:constitutionnel|d'État|des\s+ministres)/gi
  };

  /**
   * Algorithme principal d'extraction (Algorithme 1 de l'annexe)
   */
  async extractFromPDF(file: File): Promise<StructuredLegalDocument> {
    const startTime = Date.now();
    console.log('🇩🇿 Starting legal document extraction...');

    try {
      // Étape 1: Extraction des pages et conversion en images
      const pages = await this.extractPages(file);
      
      // Étape 2-7: Traitement de chaque page
      const allExtractedText: ExtractedText[] = [];
      const allExtractedTables: ExtractedTable[] = [];

      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex];
        
        // Étape 3: Détecter lignes horizontales et verticales
        const lines = await this.detectLines(page);
        
        // Étape 4: Enlever les bordures
        const cleanedPage = this.removeBorders(page, lines);
        
        // Étape 5: Détecter lignes verticales séparatrices
        const separatorLines = this.detectTextSeparators(lines);
        
        // Étape 6: Détecter les tables
        const tables = this.detectTables(lines);
        
        // Étape 7: Extraire rectangles de texte et tables
        const rectangles = this.extractRectangles(cleanedPage, tables, separatorLines);
        
        // Étape 8-15: Traiter chaque rectangle
        for (const rectangle of rectangles) {
          if (rectangle.type === 'text') {
            // Étape 10: Extraire texte
            const extractedText = await this.extractTextFromRectangle(rectangle);
            allExtractedText.push(extractedText);
          } else if (rectangle.type === 'table') {
            // Étape 12-15: Traiter table
            const extractedTable = await this.extractTableFromRectangle(rectangle);
            allExtractedTables.push(extractedTable);
          }
        }
      }

      // Structuration des données extraites
      const entities = await this.structureExtractedData(allExtractedText);
      
      const processingTime = Date.now() - startTime;
      console.log(`🇩🇿 Extraction completed in ${processingTime}ms`);

      return {
        metadata: {
          documentType: 'legal_document',
          extractionDate: new Date().toISOString(),
          confidence: this.calculateOverallConfidence(allExtractedText),
          processingTime,
          pagesProcessed: pages.length,
          imageProcessingEnabled: true
        },
        entities,
        tables: allExtractedTables,
        rawText: allExtractedText,
        relationships: [],
        processedPages: []
      };

    } catch (error) {
      console.error('🇩🇿 Extraction failed:', error);
      throw new Error(`Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extraction des pages du PDF
   */
  private async extractPages(file: File): Promise<any[]> {
    // Simulation de l'extraction des pages
    // En production, utiliser PyMuPDF ou Tika
    console.log('📄 Extracting pages from PDF...');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retourner des pages simulées
        resolve([
          { index: 0, content: 'page_data_1' },
          { index: 1, content: 'page_data_2' }
        ]);
      }, 500);
    });
  }

  /**
   * Détection des lignes horizontales et verticales (HoughLinesP)
   */
  private async detectLines(page: any): Promise<any[]> {
    console.log('📐 Detecting horizontal and vertical lines...');
    
    // Simulation de la détection des lignes avec OpenCV/HoughLinesP
    return [
      { type: 'horizontal', x1: 0, y1: 50, x2: 800, y2: 50 },
      { type: 'vertical', x1: 100, y1: 0, x2: 100, y2: 600 },
      { type: 'vertical', x1: 400, y1: 0, x2: 400, y2: 600 },
      { type: 'horizontal', x1: 0, y1: 550, x2: 800, y2: 550 }
    ];
  }

  /**
   * Suppression des bordures selon les patterns identifiés
   */
  private removeBorders(page: any, lines: any[]): any {
    console.log('🗑️ Removing borders...');
    
    // Identifier les bordures selon l'analyse: 3 lignes horizontales en haut, 2 en bas, 2 verticales de chaque côté
    const borderLines = lines.filter(line => {
      if (line.type === 'horizontal') {
        return line.y1 < 100 || line.y1 > 500; // Haut et bas
      } else {
        return line.x1 < 50 || line.x1 > 750; // Gauche et droite
      }
    });

    // Retourner la page nettoyée
    return {
      ...page,
      cleanedLines: lines.filter(line => !borderLines.includes(line))
    };
  }

  /**
   * Détection des lignes verticales séparatrices de texte
   */
  private detectTextSeparators(lines: any[]): any[] {
    console.log('📝 Detecting text separator lines...');
    
    const verticalLines = lines.filter(line => line.type === 'vertical');
    
    // Filtrer les lignes qui ne croisent pas de lignes horizontales
    const separators = verticalLines.filter(line => {
      const horizontalLines = lines.filter(l => l.type === 'horizontal');
      const intersections = horizontalLines.filter(hLine => 
        line.x1 >= hLine.x1 && line.x1 <= hLine.x2 &&
        hLine.y1 >= line.y1 && hLine.y1 <= line.y2
      );
      return intersections.length === 0;
    });

    // Garder seulement les lignes près du centre (avec marge d'erreur ε)
    const centerX = 400; // Centre de la page
    const epsilon = 50;
    
    return separators.filter(line => 
      Math.abs(line.x1 - centerX) <= epsilon
    );
  }

  /**
   * Détection des tables par intersection de lignes
   */
  private detectTables(lines: any[]): any[] {
    console.log('📊 Detecting tables...');
    
    const horizontalLines = lines.filter(l => l.type === 'horizontal');
    const verticalLines = lines.filter(l => l.type === 'vertical');
    
    const tables = [];
    
    // Trouver les intersections pour former des rectangles
    for (const hLine1 of horizontalLines) {
      for (const hLine2 of horizontalLines) {
        if (hLine1.y1 >= hLine2.y1) continue;
        
        for (const vLine1 of verticalLines) {
          for (const vLine2 of verticalLines) {
            if (vLine1.x1 >= vLine2.x1) continue;
            
            // Vérifier si les lignes forment un rectangle
            if (this.linesFormRectangle(hLine1, hLine2, vLine1, vLine2)) {
              tables.push({
                x: vLine1.x1,
                y: hLine1.y1,
                width: vLine2.x1 - vLine1.x1,
                height: hLine2.y1 - hLine1.y1,
                horizontalLines: [hLine1, hLine2],
                verticalLines: [vLine1, vLine2]
              });
            }
          }
        }
      }
    }
    
    // Sélectionner les plus grands rectangles (tables potentielles)
    return tables.sort((a, b) => (b.width * b.height) - (a.width * a.height)).slice(0, 5);
  }

  /**
   * Vérifier si 4 lignes forment un rectangle
   */
  private linesFormRectangle(hLine1: any, hLine2: any, vLine1: any, vLine2: any): boolean {
    const tolerance = 10;
    
    return (
      Math.abs(hLine1.x1 - vLine1.x1) <= tolerance &&
      Math.abs(hLine1.x2 - vLine2.x1) <= tolerance &&
      Math.abs(hLine2.x1 - vLine1.x1) <= tolerance &&
      Math.abs(hLine2.x2 - vLine2.x1) <= tolerance &&
      Math.abs(vLine1.y1 - hLine1.y1) <= tolerance &&
      Math.abs(vLine1.y2 - hLine2.y1) <= tolerance &&
      Math.abs(vLine2.y1 - hLine1.y1) <= tolerance &&
      Math.abs(vLine2.y2 - hLine2.y1) <= tolerance
    );
  }

  /**
   * Extraction des rectangles représentant zones de texte et tables
   */
  private extractRectangles(page: any, tables: any[], separators: any[]): any[] {
    console.log('🔲 Extracting text and table rectangles...');
    
    const rectangles = [];
    
    // Ajouter les rectangles de tables
    tables.forEach((table, index) => {
      rectangles.push({
        ...table,
        type: 'table',
        id: `table_${index}`
      });
    });
    
    // Ajouter les zones de texte (espaces entre les tables et séparateurs)
    // Logique simplifiée pour la démonstration
    rectangles.push({
      x: 50,
      y: 100,
      width: 300,
      height: 400,
      type: 'text',
      id: 'text_1'
    });
    
    rectangles.push({
      x: 450,
      y: 100,
      width: 300,
      height: 400,
      type: 'text',
      id: 'text_2'
    });
    
    return rectangles;
  }

  /**
   * Extraction du texte d'un rectangle
   */
  private async extractTextFromRectangle(rectangle: any): Promise<ExtractedText> {
    console.log(`📝 Extracting text from rectangle ${rectangle.id}...`);
    
    // Simulation de l'extraction de texte
    const sampleTexts = [
      "Vu la Constitution, notamment ses articles 99-4° et 143 (alinéa 1er) ; Vu la loi n° 22-24 du Aouel Joumada Ethania 1444 correspondant au 25 décembre 2022 portant loi de finances pour 2023 ;",
      "Article 1er. — Il est créé un établissement public à caractère administratif, doté de la personnalité morale et de l'autonomie financière, dénommé « Centre National de Recherche en Anthropologie Sociale et Culturelle », en abrégé « C.R.A.S.C. ».",
      "DÉCRET EXÉCUTIF N° 23-45 du 15 Rabia El Aouel 1444 correspondant au 11 octobre 2022 portant création, organisation et fonctionnement du centre national de recherche."
    ];
    
    const content = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    
    return {
      content: sanitizeInput(content),
      position: {
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height
      },
      confidence: 0.85 + Math.random() * 0.1,
      type: 'text'
    };
  }

  /**
   * Extraction de table d'un rectangle
   */
  private async extractTableFromRectangle(rectangle: any): Promise<ExtractedTable> {
    console.log(`📊 Extracting table from rectangle ${rectangle.id}...`);
    
    // Étape 12: Détecter les cellules
    const cells = this.detectTableCells(rectangle);
    
    // Étape 13-14: Extraire le texte de chaque cellule
    const extractedCells: ExtractedCell[][] = [];
    
    for (let row = 0; row < cells.length; row++) {
      extractedCells[row] = [];
      for (let col = 0; col < cells[row].length; col++) {
        const cell = cells[row][col];
        extractedCells[row][col] = {
          content: sanitizeInput(cell.content || ''),
          colspan: cell.colspan || 1,
          rowspan: cell.rowspan || 1,
          position: cell.position
        };
      }
    }
    
    return {
      cells: extractedCells,
      position: {
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height
      },
      headers: extractedCells[0]?.map(cell => cell.content)
    };
  }

  /**
   * Détection des cellules dans une table
   */
  private detectTableCells(rectangle: any): any[][] {
    // Simulation de la détection des cellules
    return [
      [
        { content: "Type", position: { x: 0, y: 0, width: 100, height: 30 } },
        { content: "Numéro", position: { x: 100, y: 0, width: 100, height: 30 } },
        { content: "Date", position: { x: 200, y: 0, width: 100, height: 30 } }
      ],
      [
        { content: "Décret", position: { x: 0, y: 30, width: 100, height: 30 } },
        { content: "23-45", position: { x: 100, y: 30, width: 100, height: 30 } },
        { content: "11/10/2022", position: { x: 200, y: 30, width: 100, height: 30 } }
      ]
    ];
  }

  /**
   * Structuration des données extraites avec expressions régulières
   */
  private async structureExtractedData(texts: ExtractedText[]): Promise<LegalEntity[]> {
    console.log('🏗️ Structuring extracted data with regex patterns...');
    
    const entities: LegalEntity[] = [];
    const fullText = texts.map(t => t.content).join(' ');
    
    // Détection du type de document
    const documentType = this.detectDocumentType(fullText);
    
    if (documentType) {
      const entity: LegalEntity = {
        type: documentType.type,
        number: documentType.number,
        date: this.extractDates(fullText),
        title: this.extractTitle(fullText),
        issuingAuthority: this.extractIssuingAuthority(fullText),
        content: fullText,
        articles: this.extractArticles(fullText),
        references: this.extractReferences(fullText)
      };
      
      entities.push(entity);
    }
    
    return entities;
  }

  /**
   * Détection du type de document avec expressions régulières
   */
  private detectDocumentType(text: string): { type: any; number: string } | null {
    for (const [type, pattern] of Object.entries(this.legalTypePatterns)) {
      const match = pattern.exec(text);
      if (match) {
        return {
          type: type as any,
          number: match[1]
        };
      }
    }
    return null;
  }

  /**
   * Extraction des dates (grégorien et hégirien)
   */
  private extractDates(text: string): { gregorian?: string; hijri?: string } {
    const dates: { gregorian?: string; hijri?: string } = {};
    
    const gregorianMatch = this.datePatterns.gregorian.exec(text);
    if (gregorianMatch) {
      dates.gregorian = `${gregorianMatch[1]} ${gregorianMatch[0].split(' ')[1]} ${gregorianMatch[2]}`;
    }
    
    const hijriMatch = this.datePatterns.hijri.exec(text);
    if (hijriMatch) {
      dates.hijri = hijriMatch[0];
    }
    
    return dates;
  }

  /**
   * Extraction du titre
   */
  private extractTitle(text: string): string {
    // Rechercher le titre après le numéro du document
    const titlePattern = /(?:portant|relatif\s+à|concernant|fixant)\s+([^.]+)/i;
    const match = titlePattern.exec(text);
    return match ? sanitizeInput(match[1].trim()) : 'Titre non détecté';
  }

  /**
   * Extraction de l'autorité émettrice
   */
  private extractIssuingAuthority(text: string): string {
    for (const [authority, pattern] of Object.entries(this.institutionPatterns)) {
      const match = pattern.exec(text);
      if (match) {
        return sanitizeInput(match[0]);
      }
    }
    return 'Autorité non détectée';
  }

  /**
   * Extraction des articles
   */
  private extractArticles(text: string): LegalArticle[] {
    const articles: LegalArticle[] = [];
    const articlePattern = /Article\s+(\d+(?:\s+bis|ter)?)\s*\.?\s*[—-]?\s*([^]*?)(?=Article\s+\d+|$)/gi;
    
    let match;
    while ((match = articlePattern.exec(text)) !== null) {
      articles.push({
        number: match[1],
        content: sanitizeInput(match[2].trim())
      });
    }
    
    return articles;
  }

  /**
   * Extraction des références avec types de liens
   */
  private extractReferences(text: string): LegalReference[] {
    const references: LegalReference[] = [];
    
    for (const [type, pattern] of Object.entries(this.referencePatterns)) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        references.push({
          type: type as any,
          targetDocument: sanitizeInput(match[1].trim()),
          description: sanitizeInput(match[0])
        });
      }
    }
    
    return references;
  }

  /**
   * Calcul de la confiance globale
   */
  private calculateOverallConfidence(texts: ExtractedText[]): number {
    if (texts.length === 0) return 0;
    
    const totalConfidence = texts.reduce((sum, text) => sum + text.confidence, 0);
    return totalConfidence / texts.length;
  }

  /**
   * Conversion du PDF en images pour traitement
   */
  private async convertPDFToImages(file: File): Promise<ImageData[]> {
    console.log('🖼️ Converting PDF to images...');
    
    // Placeholder - en réalité, utiliserait une bibliothèque comme PDF.js
    // Pour le développement, retourner des images simulées
    const mockImageData: ImageData[] = [];
    
    // Simuler 3 pages d'exemple
    for (let i = 0; i < 3; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Créer une image simulée
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(`Page ${i + 1} - Document juridique algérien`, 50, 50);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        mockImageData.push(imageData);
      }
    }
    
    console.log(`✅ Converted PDF to ${mockImageData.length} images`);
    return mockImageData;
  }

  /**
   * Extraction de texte depuis une page traitée par le service d'image
   */
  private async extractTextFromProcessedPage(processedPage: ProcessedPage): Promise<ExtractedText[]> {
    const extractedTexts: ExtractedText[] = [];
    
    // Extraire le texte des régions de texte détectées
    for (const region of processedPage.textRegions) {
      const extractedText: ExtractedText = {
        content: `Texte extrait de la région ${region.x},${region.y} (${region.width}x${region.height})`,
        position: {
          x: region.x,
          y: region.y,
          width: region.width,
          height: region.height
        },
        confidence: region.confidence,
        type: 'text'
      };
      
      extractedTexts.push(extractedText);
    }
    
    console.log(`📝 Extracted ${extractedTexts.length} text regions from page ${processedPage.pageNumber}`);
    return extractedTexts;
  }

  /**
   * Conversion des tables traitées en format ExtractedTable
   */
  private convertProcessedTablesToExtracted(tableRegions: any[]): ExtractedTable[] {
    const extractedTables: ExtractedTable[] = [];
    
    for (const table of tableRegions) {
      const extractedTable: ExtractedTable = {
        cells: table.cells.map((row: any[]) => 
          row.map((cell: any) => ({
            content: cell.text || '',
            colspan: cell.colspan || 1,
            rowspan: cell.rowspan || 1,
            position: {
              x: cell.x,
              y: cell.y,
              width: cell.width,
              height: cell.height
            }
          }))
        ),
        position: {
          x: table.x,
          y: table.y,
          width: table.width,
          height: table.height
        },
        headers: table.headers
      };
      
      extractedTables.push(extractedTable);
    }
    
    return extractedTables;
  }

  /**
   * Mise à jour de la méthode createEmptyDocument
   */
  private createEmptyDocument(startTime: number): StructuredLegalDocument {
    return {
      metadata: {
        documentType: 'unknown',
        extractionDate: new Date().toISOString(),
        confidence: 0,
        processingTime: Date.now() - startTime,
        pagesProcessed: 0,
        imageProcessingEnabled: false
      },
      entities: [],
      tables: [],
      rawText: [],
      relationships: [],
      processedPages: []
    };
  }
}

export const legalOCRExtractionService = new LegalOCRExtractionService();
export default legalOCRExtractionService;
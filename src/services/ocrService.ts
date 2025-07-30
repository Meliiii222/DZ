// @ts-nocheck
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';

// Configuration de PDF.js avec worker local
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export interface ExtractedData {
  text: string;
  tables: TableData[];
  metadata: DocumentMetadata;
  confidence: number;
  structuredData: StructuredLegalData;
}

export interface TableData {
  rows: string[][];
  position: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface DocumentMetadata {
  pageCount: number;
  documentType: string;
  language: 'ar' | 'fr' | 'mixed';
  extractionDate: Date;
  processingTime: number;
}

export interface StructuredLegalData {
  title: string;
  type: string;
  number: string;
  dateHijri?: string;
  dateGregorian?: string;
  institution: string;
  content: string;
  articles: ArticleData[];
  references: ReferenceData[];
  signatories: string[];
}

export interface ArticleData {
  number: string;
  title: string;
  content: string;
  modifications?: string[];
  abrogations?: string[];
}

export interface ReferenceData {
  type: 'vu' | 'modification' | 'abrogation' | 'approbation' | 'extension' | 'annexe';
  reference: string;
  description: string;
}

export interface LineData {
  type: 'horizontal' | 'vertical';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'text' | 'table';
}

export class AlgerianLegalOCRService {
  private tesseractWorker: Record<string, unknown> = null;

  constructor() {
    this.initializeTesseract();
  }

  private async initializeTesseract() {
    try {
      this.tesseractWorker = await createWorker(['ara', 'fra']);
      await this.tesseractWorker.setParameters({
        tessedit_pageseg_mode: '1',
        tessedit_ocr_engine_mode: '2',
      });
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Tesseract:', error);
    }
  }

  /**
   * Algorithme principal d'extraction selon les spécifications
   * Algorithme 1 : Algorithme d'extraction
   */
  async extractFromPDF(file: File): Promise<ExtractedData> {
    const startTime = Date.now();
    console.log('🇩🇿 [OCR] Début de l\'extraction du document PDF');

    try {
      // Étape 1: Extraire les pages
      const pages = await this.extractPages(file);
      
      let allText = '';
      const allTables: TableData[] = [];
      
      // Étape 2: Pour chaque page
      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex];
        console.log(`🇩🇿 [OCR] Traitement de la page ${pageIndex + 1}/${pages.length}`);
        
        // Étape 3: Détecter toutes les lignes horizontales et verticales
        const lines = await this.detectLines(page);
        
        // Étape 4: Enlever les bordures
        const cleanedImage = await this.removeBorders(page, lines);
        
        // Étape 5: Détecter les lignes verticales séparatrices de texte
        const separatorLines = await this.detectTextSeparatorLines(lines);
        
        // Étape 6: Détecter les tables
        const tables = await this.detectTables(lines, cleanedImage);
        
        // Étape 7: Extraire les rectangles représentant les zones de textes et les tables
        const rectangles = await this.extractRectangles(lines, tables, cleanedImage);
        
        // Étape 8: Pour chaque rectangle
        for (const rectangle of rectangles) {
          if (rectangle.type === 'text') {
            // Étape 10: Extraire le texte contenant dans le rectangle
            const textContent = await this.extractTextFromRectangle(cleanedImage, rectangle);
            allText += textContent + '\n';
          } else {
            // Étape 12-15: Traitement des tables
            const tableData = await this.extractTableData(cleanedImage, rectangle);
            allTables.push(tableData);
          }
        }
      }

      // Structurer les données extraites
      const structuredData = await this.structureLegalData(allText);
      
      const processingTime = Date.now() - startTime;
      
      const extractedData: ExtractedData = {
        text: allText,
        tables: allTables,
        metadata: {
          pageCount: pages.length,
          documentType: this.detectDocumentType(allText),
          language: this.detectLanguage(allText),
          extractionDate: new Date(),
          processingTime
        },
        confidence: this.calculateConfidence(allText, allTables),
        structuredData
      };

      console.log('🇩🇿 [OCR] Extraction terminée avec succès');
      return extractedData;

    } catch (error) {
      console.error('🇩🇿 [OCR] Erreur lors de l\'extraction:', error);
      throw new Error(`Erreur lors de l'extraction OCR: ${error.message}`);
    }
  }

  /**
   * Étape 1: Extraire les pages du PDF
   */
  private async extractPages(file: File): Promise<ImageData[]> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const pages: ImageData[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      pages.push(imageData);
    }

    return pages;
  }

  /**
   * Étape 3: Détecter toutes les lignes horizontales et verticales
   * Utilise les techniques de dilatation et érosion + HoughLinesP
   */
  private async detectLines(imageData: ImageData): Promise<LineData[]> {
    // Simulation de la détection de lignes avec OpenCV
    // Dans un environnement réel, on utiliserait opencv4nodejs
    const lines: LineData[] = [];
    
    // Algorithme simplifié pour la détection de lignes
    const { width, height, data } = imageData;
    
    // Détecter les lignes horizontales
    for (let y = 0; y < height; y += 10) {
      let lineStart = -1;
      let blackPixels = 0;
      
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 4;
        const gray = (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
        
        if (gray < 128) { // Pixel noir
          if (lineStart === -1) lineStart = x;
          blackPixels++;
        } else {
          if (lineStart !== -1 && blackPixels > width * 0.3) {
            lines.push({
              type: 'horizontal',
              x1: lineStart,
              y1: y,
              x2: x,
              y2: y,
              thickness: 1
            });
          }
          lineStart = -1;
          blackPixels = 0;
        }
      }
    }

    // Détecter les lignes verticales
    for (let x = 0; x < width; x += 10) {
      let lineStart = -1;
      let blackPixels = 0;
      
      for (let y = 0; y < height; y++) {
        const pixelIndex = (y * width + x) * 4;
        const gray = (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
        
        if (gray < 128) { // Pixel noir
          if (lineStart === -1) lineStart = y;
          blackPixels++;
        } else {
          if (lineStart !== -1 && blackPixels > height * 0.3) {
            lines.push({
              type: 'vertical',
              x1: x,
              y1: lineStart,
              x2: x,
              y2: y,
              thickness: 1
            });
          }
          lineStart = -1;
          blackPixels = 0;
        }
      }
    }

    return lines;
  }

  /**
   * Étape 4: Enlever les bordures
   */
  private async removeBorders(imageData: ImageData, lines: LineData[]): Promise<ImageData> {
    const { width, height, data } = imageData;
    const newImageData = new ImageData(new Uint8ClampedArray(data), width, height);
    
    // Identifier les bordures (3 lignes horizontales en haut, 2 en bas, 2 verticales de chaque côté)
    const horizontalLines = lines.filter(l => l.type === 'horizontal').sort((a, b) => a.y1 - b.y1);
    const verticalLines = lines.filter(l => l.type === 'vertical').sort((a, b) => a.x1 - b.x1);
    
    // Supprimer les bordures en les remplaçant par du blanc
    const topBorder = horizontalLines.slice(0, 3);
    const bottomBorder = horizontalLines.slice(-2);
    const leftBorder = verticalLines.slice(0, 2);
    const rightBorder = verticalLines.slice(-2);
    
    [...topBorder, ...bottomBorder, ...leftBorder, ...rightBorder].forEach(line => {
      this.eraseLine(newImageData, line);
    });
    
    return newImageData;
  }

  private eraseLine(imageData: ImageData, line: LineData) {
    const { width, data } = imageData;
    const thickness = Math.max(line.thickness, 3);
    
    if (line.type === 'horizontal') {
      for (let x = line.x1; x <= line.x2; x++) {
        for (let dy = -thickness; dy <= thickness; dy++) {
          const y = line.y1 + dy;
          if (y >= 0 && y < imageData.height) {
            const pixelIndex = (y * width + x) * 4;
            data[pixelIndex] = 255;     // R
            data[pixelIndex + 1] = 255; // G
            data[pixelIndex + 2] = 255; // B
            data[pixelIndex + 3] = 255; // A
          }
        }
      }
    } else {
      for (let y = line.y1; y <= line.y2; y++) {
        for (let dx = -thickness; dx <= thickness; dx++) {
          const x = line.x1 + dx;
          if (x >= 0 && x < width) {
            const pixelIndex = (y * width + x) * 4;
            data[pixelIndex] = 255;     // R
            data[pixelIndex + 1] = 255; // G
            data[pixelIndex + 2] = 255; // B
            data[pixelIndex + 3] = 255; // A
          }
        }
      }
    }
  }

  /**
   * Étape 5: Détecter les lignes verticales séparatrices de texte
   */
  private async detectTextSeparatorLines(lines: LineData[]): Promise<LineData[]> {
    const verticalLines = lines.filter(l => l.type === 'vertical');
    const horizontalLines = lines.filter(l => l.type === 'horizontal');
    
    // Filtrer les lignes verticales qui ne croisent pas de lignes horizontales
    const separatorLines = verticalLines.filter(vLine => {
      const intersections = horizontalLines.filter(hLine => 
        this.linesIntersect(vLine, hLine)
      );
      return intersections.length === 0;
    });
    
    // Garder seulement les lignes près du centre de la page
    const pageCenter = verticalLines.length > 0 ? 
      verticalLines.reduce((sum, line) => sum + line.x1, 0) / verticalLines.length : 0;
    
    return separatorLines.filter(line => 
      Math.abs(line.x1 - pageCenter) < 100 // Marge d'erreur ε
    );
  }

  private linesIntersect(vLine: LineData, hLine: LineData): boolean {
    return vLine.x1 >= hLine.x1 && vLine.x1 <= hLine.x2 &&
           hLine.y1 >= vLine.y1 && hLine.y1 <= vLine.y2;
  }

  /**
   * Étape 6: Détecter les tables (Intersection de lignes horizontales et des lignes verticales)
   */
  private async detectTables(lines: LineData[], imageData: ImageData): Promise<Rectangle[]> {
    const horizontalLines = lines.filter(l => l.type === 'horizontal');
    const verticalLines = lines.filter(l => l.type === 'vertical');
    
    const tables: Rectangle[] = [];
    
    // Trouver les intersections pour former des rectangles
    for (let i = 0; i < horizontalLines.length - 1; i++) {
      for (let j = i + 1; j < horizontalLines.length; j++) {
        const topLine = horizontalLines[i];
        const bottomLine = horizontalLines[j];
        
        // Trouver les lignes verticales qui intersectent ces deux lignes horizontales
        const intersectingVerticals = verticalLines.filter(vLine => 
          this.linesIntersect(vLine, topLine) && this.linesIntersect(vLine, bottomLine)
        );
        
        if (intersectingVerticals.length >= 2) {
          const leftLine = intersectingVerticals[0];
          const rightLine = intersectingVerticals[intersectingVerticals.length - 1];
          
          tables.push({
            x: leftLine.x1,
            y: topLine.y1,
            width: rightLine.x1 - leftLine.x1,
            height: bottomLine.y1 - topLine.y1,
            type: 'table'
          });
        }
      }
    }
    
    return tables;
  }

  /**
   * Étape 7: Extraire les rectangles représentants les zones de textes et les rectangles représentants les tables
   */
  private async extractRectangles(lines: LineData[], tables: Rectangle[], imageData: ImageData): Promise<Rectangle[]> {
    const rectangles: Rectangle[] = [...tables];
    
    // Identifier les zones de texte en trouvant les espaces non occupés par les tables
    const { width, height } = imageData;
    const textAreas = this.findTextAreas(width, height, tables, lines);
    
    rectangles.push(...textAreas.map(area => ({ ...area, type: 'text' as const })));
    
    return rectangles;
  }

  private findTextAreas(width: number, height: number, tables: Rectangle[], lines: LineData[]): Rectangle[] {
    const textAreas: Rectangle[] = [];
    const separatorLines = lines.filter(l => l.type === 'vertical');
    
    // Diviser la page en colonnes basées sur les lignes séparatrices
    const columns = this.divideIntoColumns(width, height, separatorLines);
    
    for (const column of columns) {
      // Soustraire les zones occupées par les tables
      const availableAreas = this.subtractTables(column, tables);
      textAreas.push(...availableAreas);
    }
    
    return textAreas;
  }

  private divideIntoColumns(width: number, height: number, separatorLines: LineData[]): Rectangle[] {
    if (separatorLines.length === 0) {
      return [{ x: 0, y: 0, width, height, type: 'text' }];
    }
    
    const columns: Rectangle[] = [];
    const sortedLines = separatorLines.sort((a, b) => a.x1 - b.x1);
    
    // Première colonne
    columns.push({
      x: 0,
      y: 0,
      width: sortedLines[0].x1,
      height,
      type: 'text'
    });
    
    // Colonnes intermédiaires
    for (let i = 0; i < sortedLines.length - 1; i++) {
      columns.push({
        x: sortedLines[i].x1,
        y: 0,
        width: sortedLines[i + 1].x1 - sortedLines[i].x1,
        height,
        type: 'text'
      });
    }
    
    // Dernière colonne
    columns.push({
      x: sortedLines[sortedLines.length - 1].x1,
      y: 0,
      width: width - sortedLines[sortedLines.length - 1].x1,
      height,
      type: 'text'
    });
    
    return columns;
  }

  private subtractTables(area: Rectangle, tables: Rectangle[]): Rectangle[] {
    let availableAreas = [area];
    
    for (const table of tables) {
      const newAreas: Rectangle[] = [];
      
      for (const availableArea of availableAreas) {
        if (this.rectanglesOverlap(availableArea, table)) {
          // Diviser la zone disponible autour de la table
          const fragments = this.fragmentRectangle(availableArea, table);
          newAreas.push(...fragments);
        } else {
          newAreas.push(availableArea);
        }
      }
      
      availableAreas = newAreas;
    }
    
    return availableAreas.filter(area => area.width > 50 && area.height > 20);
  }

  private rectanglesOverlap(rect1: Rectangle, rect2: Rectangle): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  private fragmentRectangle(area: Rectangle, obstacle: Rectangle): Rectangle[] {
    const fragments: Rectangle[] = [];
    
    // Fragment au-dessus
    if (obstacle.y > area.y) {
      fragments.push({
        x: area.x,
        y: area.y,
        width: area.width,
        height: obstacle.y - area.y,
        type: 'text'
      });
    }
    
    // Fragment en dessous
    if (obstacle.y + obstacle.height < area.y + area.height) {
      fragments.push({
        x: area.x,
        y: obstacle.y + obstacle.height,
        width: area.width,
        height: area.y + area.height - (obstacle.y + obstacle.height),
        type: 'text'
      });
    }
    
    // Fragment à gauche
    if (obstacle.x > area.x) {
      fragments.push({
        x: area.x,
        y: Math.max(area.y, obstacle.y),
        width: obstacle.x - area.x,
        height: Math.min(area.y + area.height, obstacle.y + obstacle.height) - Math.max(area.y, obstacle.y),
        type: 'text'
      });
    }
    
    // Fragment à droite
    if (obstacle.x + obstacle.width < area.x + area.width) {
      fragments.push({
        x: obstacle.x + obstacle.width,
        y: Math.max(area.y, obstacle.y),
        width: area.x + area.width - (obstacle.x + obstacle.width),
        height: Math.min(area.y + area.height, obstacle.y + obstacle.height) - Math.max(area.y, obstacle.y),
        type: 'text'
      });
    }
    
    return fragments.filter(frag => frag.width > 0 && frag.height > 0);
  }

  /**
   * Étape 10: Extraire le texte contenant dans le rectangle
   */
  private async extractTextFromRectangle(imageData: ImageData, rectangle: Rectangle): Promise<string> {
    if (!this.tesseractWorker) {
      await this.initializeTesseract();
    }

    try {
      // Créer un canvas pour la zone spécifique
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = rectangle.width;
      canvas.height = rectangle.height;
      
      // Extraire la zone spécifique de l'image
      const extractedImageData = ctx.createImageData(rectangle.width, rectangle.height);
      const { width: fullWidth, data: fullData } = imageData;
      
      for (let y = 0; y < rectangle.height; y++) {
        for (let x = 0; x < rectangle.width; x++) {
          const srcIndex = ((rectangle.y + y) * fullWidth + (rectangle.x + x)) * 4;
          const destIndex = (y * rectangle.width + x) * 4;
          
          extractedImageData.data[destIndex] = fullData[srcIndex];
          extractedImageData.data[destIndex + 1] = fullData[srcIndex + 1];
          extractedImageData.data[destIndex + 2] = fullData[srcIndex + 2];
          extractedImageData.data[destIndex + 3] = fullData[srcIndex + 3];
        }
      }
      
      ctx.putImageData(extractedImageData, 0, 0);
      
      // Utiliser Tesseract pour extraire le texte
      const { data: { text } } = await this.tesseractWorker.recognize(canvas);
      return text.trim();
      
    } catch (error) {
      console.error('Erreur lors de l\'extraction de texte:', error);
      return '';
    }
  }

  /**
   * Étapes 12-15: Traitement des tables
   */
  private async extractTableData(imageData: ImageData, rectangle: Rectangle): Promise<TableData> {
    // Étape 12: Détecter les cellules de la table
    const cells = await this.detectTableCells(imageData, rectangle);
    
    // Étape 13-14: Pour chaque cellule, extraire le texte
    const rows: string[][] = [];
    const cellsByRow = this.organizeCellsByRows(cells);
    
    for (const rowCells of cellsByRow) {
      const row: string[] = [];
      for (const cell of rowCells) {
        const cellText = await this.extractTextFromRectangle(imageData, cell);
        row.push(cellText);
      }
      rows.push(row);
    }
    
    return {
      rows,
      position: rectangle,
      confidence: this.calculateTableConfidence(rows)
    };
  }

  private async detectTableCells(imageData: ImageData, tableRect: Rectangle): Promise<Rectangle[]> {
    // Détecter les lignes dans la zone de la table
    const tableImageData = this.extractImageRegion(imageData, tableRect);
    const lines = await this.detectLines(tableImageData);
    
    const horizontalLines = lines.filter(l => l.type === 'horizontal').sort((a, b) => a.y1 - b.y1);
    const verticalLines = lines.filter(l => l.type === 'vertical').sort((a, b) => a.x1 - b.x1);
    
    const cells: Rectangle[] = [];
    
    // Créer les cellules à partir des intersections de lignes
    for (let i = 0; i < horizontalLines.length - 1; i++) {
      for (let j = 0; j < verticalLines.length - 1; j++) {
        cells.push({
          x: tableRect.x + verticalLines[j].x1,
          y: tableRect.y + horizontalLines[i].y1,
          width: verticalLines[j + 1].x1 - verticalLines[j].x1,
          height: horizontalLines[i + 1].y1 - horizontalLines[i].y1,
          type: 'text'
        });
      }
    }
    
    return cells;
  }

  private extractImageRegion(imageData: ImageData, region: Rectangle): ImageData {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = region.width;
    canvas.height = region.height;
    
    const extractedImageData = ctx.createImageData(region.width, region.height);
    const { width: fullWidth, data: fullData } = imageData;
    
    for (let y = 0; y < region.height; y++) {
      for (let x = 0; x < region.width; x++) {
        const srcIndex = ((region.y + y) * fullWidth + (region.x + x)) * 4;
        const destIndex = (y * region.width + x) * 4;
        
        extractedImageData.data[destIndex] = fullData[srcIndex];
        extractedImageData.data[destIndex + 1] = fullData[srcIndex + 1];
        extractedImageData.data[destIndex + 2] = fullData[srcIndex + 2];
        extractedImageData.data[destIndex + 3] = fullData[srcIndex + 3];
      }
    }
    
    return extractedImageData;
  }

  private organizeCellsByRows(cells: Rectangle[]): Rectangle[][] {
    const rows: Rectangle[][] = [];
    const sortedCells = cells.sort((a, b) => a.y - b.y);
    
    let currentRow: Rectangle[] = [];
    let currentY = sortedCells[0]?.y || 0;
    
    for (const cell of sortedCells) {
      if (Math.abs(cell.y - currentY) > 10) { // Nouvelle ligne
        if (currentRow.length > 0) {
          rows.push(currentRow.sort((a, b) => a.x - b.x));
        }
        currentRow = [cell];
        currentY = cell.y;
      } else {
        currentRow.push(cell);
      }
    }
    
    if (currentRow.length > 0) {
      rows.push(currentRow.sort((a, b) => a.x - b.x));
    }
    
    return rows;
  }

  private calculateTableConfidence(rows: string[][]): number {
    let totalCells = 0;
    let filledCells = 0;
    
    for (const row of rows) {
      totalCells += row.length;
      filledCells += row.filter(cell => cell.trim().length > 0).length;
    }
    
    return totalCells > 0 ? (filledCells / totalCells) * 100 : 0;
  }

  /**
   * Structurer les données légales extraites selon les expressions régulières
   */
  private async structureLegalData(text: string): Promise<StructuredLegalData> {
    const structuredData: StructuredLegalData = {
      title: '',
      type: '',
      number: '',
      dateHijri: '',
      dateGregorian: '',
      institution: '',
      content: text,
      articles: [],
      references: [],
      signatories: []
    };

    // Expressions régulières pour l'extraction des données algériennes
    const patterns = {
      // Type de publication et numéro
      publicationType: /(?:loi|décret|arrêté|ordonnance|instruction|circulaire)\s*n°?\s*(\d+[-\d]*)/gi,
      
      // Dates hégirien et grégorien
      dateHijri: /(\d+)\s+(Moharram|Safar|Rabia\s+El\s+Aouel|Rabia\s+Ethani|Joumada\s+El\s+Aouela|Joumada\s+Ethania|Rajab|Chaabane|Ramadhan|Chaoual|Dou\s+El\s+Kaada|Dou\s+El\s+Hidja)\s+(\d{4})/gi,
      
      dateGregorian: /correspondant\s+au\s+(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/gi,
      
      // Institutions algériennes
      institution: /(?:Président\s+de\s+la\s+République|Ministre|Premier\s+Ministre|Wali|Président\s+du\s+Conseil\s+constitutionnel)/gi,
      
      // Articles
      article: /Article\s+(\d+)\s*[:-.]\s*([^]*?)(?=Article\s+\d+|$)/gi,
      
      // Références "Vu"
      vuReference: /Vu\s+(?:la\s+)?(?:loi|le\s+décret|l'arrêté|l'ordonnance)\s+n°?\s*([\d-]+)[^;]*?;/gi,
      
      // Modifications législatives
      modification: /modifie?\s+(?:et\s+complète\s+)?(?:la\s+)?(?:loi|le\s+décret|l'arrêté)\s+n°?\s*([\d-]+)/gi,
      
      // Abrogations
      abrogation: /abroge?\s+(?:la\s+)?(?:loi|le\s+décret|l'arrêté)\s+n°?\s*([\d-]+)/gi,
      
      // Signataires
      signatory: /(?:Le\s+Président\s+de\s+la\s+République|Le\s+Premier\s+Ministre|Le\s+Ministre)[^]*?([A-Z][a-z]+\s+[A-Z][a-z]+)/gi
    };

    // Extraire le titre (première ligne significative)
    const lines = text.split('\n').filter(line => line.trim().length > 10);
    if (lines.length > 0) {
      structuredData.title = lines[0].trim();
    }

    // Extraire le type et numéro de publication
    const typeMatch = text.match(patterns.publicationType);
    if (typeMatch) {
      const fullMatch = typeMatch[0];
      structuredData.type = fullMatch.split(/\s+n°?\s*/)[0];
      structuredData.number = fullMatch.match(/(\d+[-\d]*)/)?.[1] || '';
    }

    // Extraire les dates
    const hijriMatch = text.match(patterns.dateHijri);
    if (hijriMatch) {
      structuredData.dateHijri = hijriMatch[0];
    }

    const gregorianMatch = text.match(patterns.dateGregorian);
    if (gregorianMatch) {
      structuredData.dateGregorian = gregorianMatch[0];
    }

    // Extraire l'institution
    const institutionMatch = text.match(patterns.institution);
    if (institutionMatch) {
      structuredData.institution = institutionMatch[0];
    }

    // Extraire les articles
    let articleMatch;
    while ((articleMatch = patterns.article.exec(text)) !== null) {
      structuredData.articles.push({
        number: articleMatch[1],
        title: `Article ${articleMatch[1]}`,
        content: articleMatch[2].trim()
      });
    }

    // Extraire les références "Vu"
    let vuMatch;
    while ((vuMatch = patterns.vuReference.exec(text)) !== null) {
      structuredData.references.push({
        type: 'vu',
        reference: vuMatch[1],
        description: vuMatch[0]
      });
    }

    // Extraire les modifications
    let modificationMatch;
    while ((modificationMatch = patterns.modification.exec(text)) !== null) {
      structuredData.references.push({
        type: 'modification',
        reference: modificationMatch[1],
        description: modificationMatch[0]
      });
    }

    // Extraire les abrogations
    let abrogationMatch;
    while ((abrogationMatch = patterns.abrogation.exec(text)) !== null) {
      structuredData.references.push({
        type: 'abrogation',
        reference: abrogationMatch[1],
        description: abrogationMatch[0]
      });
    }

    // Extraire les signataires
    let signatoryMatch;
    while ((signatoryMatch = patterns.signatory.exec(text)) !== null) {
      if (signatoryMatch[1]) {
        structuredData.signatories.push(signatoryMatch[1]);
      }
    }

    return structuredData;
  }

  private detectDocumentType(text: string): string {
    const types = [
      { pattern: /constitution/gi, type: 'Constitution' },
      { pattern: /loi\s+n°/gi, type: 'Loi' },
      { pattern: /décret\s+exécutif/gi, type: 'Décret exécutif' },
      { pattern: /décret\s+présidentiel/gi, type: 'Décret présidentiel' },
      { pattern: /arrêté\s+ministériel/gi, type: 'Arrêté ministériel' },
      { pattern: /arrêté\s+interministériel/gi, type: 'Arrêté interministériel' },
      { pattern: /ordonnance/gi, type: 'Ordonnance' },
      { pattern: /instruction/gi, type: 'Instruction' },
      { pattern: /circulaire/gi, type: 'Circulaire' }
    ];

    for (const { pattern, type } of types) {
      if (pattern.test(text)) {
        return type;
      }
    }

    return 'Document juridique';
  }

  private detectLanguage(text: string): 'ar' | 'fr' | 'mixed' {
    const arabicPattern = /[\u0600-\u06FF]/;
    const frenchPattern = /[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]/;
    
    const hasArabic = arabicPattern.test(text);
    const hasFrench = frenchPattern.test(text);
    
    if (hasArabic && hasFrench) return 'mixed';
    if (hasArabic) return 'ar';
    return 'fr';
  }

  private calculateConfidence(text: string, tables: TableData[]): number {
    let confidence = 0;
    
    // Confiance basée sur la longueur du texte
    if (text.length > 100) confidence += 30;
    if (text.length > 500) confidence += 20;
    
    // Confiance basée sur la détection de mots-clés juridiques
    const legalKeywords = [
      'article', 'loi', 'décret', 'arrêté', 'ordonnance',
      'république', 'algérienne', 'ministre', 'président'
    ];
    
    const foundKeywords = legalKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    ).length;
    
    confidence += (foundKeywords / legalKeywords.length) * 30;
    
    // Confiance basée sur les tables
    if (tables.length > 0) {
      const avgTableConfidence = tables.reduce((sum, table) => sum + table.confidence, 0) / tables.length;
      confidence += avgTableConfidence * 0.2;
    }
    
    return Math.min(confidence, 100);
  }

  async cleanup() {
    if (this.tesseractWorker) {
      await this.tesseractWorker.terminate();
      this.tesseractWorker = null;
    }
  }
}

// Instance singleton
export const algerianOCRService = new AlgerianLegalOCRService();
// @ts-nocheck
import * as mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

export interface ExtractedDocument {
  text: string;
  format: string;
  metadata?: {
    pageCount?: number;
    sheetNames?: string[];
    imageInfo?: {
      width: number;
      height: number;
    };
  };
}

export class DocumentExtractor {
  
  /**
   * Extrait le texte d'un fichier selon son format
   */
  static async extractText(file: File): Promise<ExtractedDocument> {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    console.log(`🔍 Extraction du texte depuis: ${file.name} (${file.type})`);

    // PDF
    if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
      return await this.extractFromPDF(file);
    }
    
    // Word Documents (.docx)
    if (fileType.includes('officedocument.wordprocessingml') || fileName.endsWith('.docx')) {
      return await this.extractFromWordDocx(file);
    }
    
    // Word Documents (.doc) - Limité car mammoth ne supporte que .docx nativement
    if (fileName.endsWith('.doc')) {
      return await this.extractFromWordDoc(file);
    }
    
    // Excel (.xlsx, .xls)
    if (fileType.includes('spreadsheetml') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return await this.extractFromExcel(file);
    }
    
    // Images
    if (fileType.includes('image') || this.isImageFile(fileName)) {
      return await this.extractFromImage(file);
    }
    
    throw new Error(`Format de fichier non supporté: ${file.name}`);
  }

  /**
   * Extraction depuis PDF (utilise la logique existante)
   */
  private static async extractFromPDF(file: File): Promise<ExtractedDocument> {
    try {
      // Réutiliser la logique existante du service OCR
      const pdfjsLib = (window as Record<string, unknown>).pdfjsLib;
      if (!pdfjsLib) {
        throw new Error('PDF.js n\'est pas chargé');
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      const pageCount = pdf.numPages;
      
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: Record<string, unknown>) => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      return {
        text: fullText.trim(),
        format: 'PDF',
        metadata: { pageCount }
      };
    } catch (error) {
      console.error('Erreur extraction PDF:', error);
      throw new Error(`Erreur lors de l'extraction du PDF: ${error}`);
    }
  }

  /**
   * Extraction depuis Word .docx
   */
  private static async extractFromWordDocx(file: File): Promise<ExtractedDocument> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      return {
        text: result.value,
        format: 'Word DOCX',
        metadata: {}
      };
    } catch (error) {
      console.error('Erreur extraction Word DOCX:', error);
      throw new Error(`Erreur lors de l'extraction du document Word: ${error}`);
    }
  }

  /**
   * Extraction depuis Word .doc (limitation: conversion vers texte basique)
   */
  private static async extractFromWordDoc(file: File): Promise<ExtractedDocument> {
    try {
      // Pour les fichiers .doc, nous devons les traiter différemment
      // Mammoth ne supporte que .docx nativement
      const text = await file.text();
      
      // Nettoyage basique du texte brut
      const cleanText = text
        .replace(/[\0-\x1F\x7F-\x9F]/g, '') // eslint-disable-line no-control-regex
        .replace(/\s+/g, ' ') // Normalise les espaces
        .trim();

      return {
        text: cleanText,
        format: 'Word DOC (extraction basique)',
        metadata: {}
      };
    } catch (error) {
      console.error('Erreur extraction Word DOC:', error);
      throw new Error(`Erreur lors de l'extraction du document Word .doc: ${error}`);
    }
  }

  /**
   * Extraction depuis tableur (version simplifiée)
   */
  private static async extractFromExcel(file: File): Promise<ExtractedDocument> {
    try {
      // Pour les fichiers Excel et CSV - version simplifiée
      const content = await file.text();
      
      // Traitement basique CSV
      const lines = content.split('\n').slice(0, 1000); // Limiter à 1000 lignes
      const processedContent = lines.map((line, index) => {
        // Sanitisation basique
        const cleanLine = line.replace(/[<>]/g, '').substring(0, 500);
        return `Ligne ${index + 1}: ${cleanLine}`;
      }).join('\n');
      
      return {
        text: processedContent,
        format: 'CSV',
        metadata: { 
          rowCount: lines.length,
          columnCount: lines[0]?.split(',').length || 0,
          processedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.warn('Spreadsheet extraction failed:', error);
      throw new Error(`Erreur lors de l'extraction du fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Extraction depuis image avec OCR
   */
  private static async extractFromImage(file: File): Promise<ExtractedDocument> {
    try {
      // Créer un élément image pour obtenir les dimensions
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      return new Promise((resolve, reject) => {
        img.onload = async () => {
          try {
            const imageInfo = {
              width: img.width,
              height: img.height
            };
            
            URL.revokeObjectURL(imageUrl);
            
            console.log('🔍 Début de l\'extraction OCR de l\'image...');
            
            // Utiliser Tesseract.js pour l'OCR
            const { data: { text } } = await Tesseract.recognize(file, 'fra+ara', {
              logger: m => {
                if (m.status === 'recognizing text') {
                  console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
                }
              }
            });

            resolve({
              text: text.trim(),
              format: 'Image OCR',
              metadata: { imageInfo }
            });
          } catch (error) {
            reject(new Error(`Erreur OCR: ${error}`));
          }
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(imageUrl);
          reject(new Error('Impossible de charger l\'image'));
        };
        
        img.src = imageUrl;
      });
    } catch (error) {
      console.error('Erreur extraction image:', error);
      throw new Error(`Erreur lors de l'extraction de l'image: ${error}`);
    }
  }

  /**
   * Vérifie si le fichier est une image
   */
  private static isImageFile(fileName: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg'];
    return imageExtensions.some(ext => fileName.endsWith(ext));
  }

  /**
   * Obtient la liste des formats supportés
   */
  static getSupportedFormats(): string[] {
    return [
      '.pdf',
      '.docx',
      '.doc',
      '.xlsx',
      '.xls',
      '.jpg', '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.webp',
      '.tiff'
    ];
  }

  /**
   * Vérifie si un fichier est supporté
   */
  static isFileSupported(file: File): boolean {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    return (
      // PDF
      fileType.includes('pdf') || fileName.endsWith('.pdf') ||
      // Word
      fileType.includes('officedocument.wordprocessingml') || 
      fileName.endsWith('.docx') || fileName.endsWith('.doc') ||
      // Excel
      fileType.includes('spreadsheetml') || 
      fileName.endsWith('.xlsx') || fileName.endsWith('.xls') ||
      // Images
      fileType.includes('image') || this.isImageFile(fileName)
    );
  }
}
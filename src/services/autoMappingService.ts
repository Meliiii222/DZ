// @ts-nocheck
// Import des types depuis le service optimisé
interface ExtractedData {
  text: string;
  tables: any[];
  entities: LegalEntity[];
  relations: LegalRelation[];
  confidence: number;
  structure: DocumentStructure;
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
  sections: any[];
  hierarchy: any[];
}
import { LegalText, AdministrativeProcedure, LEGAL_TEXT_TYPES, INSTITUTIONS } from '@/types/legal';

interface FieldMapping {
  fieldName: string;
  value: string;
  confidence: number;
  source: 'extracted_entity' | 'inferred' | 'pattern_match';
  metadata?: Record<string, unknown>;
}

interface MappingResult {
  mappedFields: FieldMapping[];
  unmappedData: string[];
  confidence: number;
  suggestions: FieldSuggestion[];
}

interface FieldSuggestion {
  fieldName: string;
  suggestedValue: string;
  reason: string;
  confidence: number;
}

interface FormSchema {
  type: 'legal-text' | 'procedure' | 'general';
  fields: FormField[];
}

interface FormField {
  name: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
  };
}

class AutoMappingService {
  private legalTextSchema: FormSchema;
  private procedureSchema: FormSchema;

  constructor() {
    this.initializeSchemas();
  }

  private initializeSchemas() {
    // Schéma pour les textes juridiques
    this.legalTextSchema = {
      type: 'legal-text',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'type', type: 'select', required: true, options: [...LEGAL_TEXT_TYPES] },
        { name: 'number', type: 'text', required: true },
        { name: 'institution', type: 'select', required: true, options: [...INSTITUTIONS] },
        { name: 'datePublication', type: 'date', required: true },
        { name: 'dateHijri', type: 'text', required: false },
        { name: 'domain', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'status', type: 'select', required: true, options: ['En vigueur', 'Abrogé', 'En cours', 'Suspendu'] },
        { name: 'articles', type: 'number', required: false },
        { name: 'modifications', type: 'number', required: false },
        { name: 'version', type: 'text', required: false }
      ]
    };

    // Schéma pour les procédures administratives
    this.procedureSchema = {
      type: 'procedure',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'institution', type: 'select', required: true, options: [...INSTITUTIONS] },
        { name: 'description', type: 'textarea', required: true },
        { name: 'duration', type: 'text', required: true },
        { name: 'difficulty', type: 'select', required: true, options: ['Facile', 'Moyen', 'Difficile'] },
        { name: 'cost', type: 'text', required: false },
        { name: 'requiredDocuments', type: 'textarea', required: true },
        { name: 'status', type: 'select', required: true, options: ['Validée', 'En révision', 'Obsolète'] }
      ]
    };
  }

  async mapExtractedDataToForm(
    extractedData: ExtractedData, 
    formType: 'legal-text' | 'procedure' | 'general'
  ): Promise<MappingResult> {
    console.log('🎯 Début du mapping automatique des données extraites');
    
    const schema = this.getSchema(formType);
    const mappedFields: FieldMapping[] = [];
    const unmappedData: string[] = [];
    const suggestions: FieldSuggestion[] = [];

    // Étape 1: Mapping direct basé sur les entités extraites
    for (const field of schema.fields) {
      const mapping = await this.mapField(field, extractedData);
      if (mapping) {
        mappedFields.push(mapping);
      } else {
        // Générer des suggestions pour les champs non mappés
        const suggestion = this.generateFieldSuggestion(field, extractedData);
        if (suggestion) {
          suggestions.push(suggestion);
        }
      }
    }

    // Étape 2: Identification des données non utilisées
    const usedText = mappedFields.map(m => m.value).join(' ');
    const unusedEntities = extractedData.entities.filter(entity => 
      !usedText.includes(entity.value)
    );
    unmappedData.push(...unusedEntities.map(e => e.value));

    // Étape 3: Calcul de la confiance globale
    const confidence = this.calculateMappingConfidence(mappedFields, schema.fields);

    console.log(`✅ Mapping terminé: ${mappedFields.length} champs mappés, ${suggestions.length} suggestions`);

    return {
      mappedFields,
      unmappedData,
      confidence,
      suggestions
    };
  }

  private getSchema(formType: string): FormSchema {
    switch (formType) {
      case 'legal-text':
        return this.legalTextSchema;
      case 'procedure':
        return this.procedureSchema;
      default:
        return this.legalTextSchema; // Par défaut
    }
  }

  private async mapField(field: FormField, extractedData: ExtractedData): Promise<FieldMapping | null> {
    const { entities, structure, text } = extractedData;

    switch (field.name) {
      case 'title':
        return this.mapTitle(field, structure);
      
      case 'type':
        return this.mapDocumentType(field, structure, entities);
      
      case 'number':
        return this.mapNumber(field, structure, entities);
      
      case 'institution':
        return this.mapInstitution(field, entities, text);
      
      case 'datePublication':
        return this.mapDate(field, entities, 'gregorian');
      
      case 'dateHijri':
        return this.mapDate(field, entities, 'hijri');
      
      case 'domain':
        return this.mapDomain(field, text, entities);
      
      case 'description':
        return this.mapDescription(field, text, structure);
      
      case 'content':
        return this.mapContent(field, text, structure);
      
      case 'status':
        return this.mapStatus(field, text, entities);
      
      case 'articles':
        return this.mapArticlesCount(field, structure);
      
      case 'category':
        return this.mapCategory(field, text, entities);
      
      case 'duration':
        return this.mapDuration(field, text);
      
      case 'difficulty':
        return this.mapDifficulty(field, text);
      
      case 'cost':
        return this.mapCost(field, text);
      
      case 'requiredDocuments':
        return this.mapRequiredDocuments(field, text);
      
      default:
        return null;
    }
  }

  private mapTitle(field: FormField, structure: DocumentStructure): FieldMapping | null {
    if (structure.title) {
      return {
        fieldName: field.name,
        value: structure.title,
        confidence: 0.9,
        source: 'extracted_entity'
      };
    }
    return null;
  }

  private mapDocumentType(field: FormField, structure: DocumentStructure, entities: LegalEntity[]): FieldMapping | null {
    // Priorité à la structure extraite
    if (structure.type) {
      const normalizedType = this.normalizeDocumentType(structure.type);
      if (LEGAL_TEXT_TYPES.includes(normalizedType as Record<string, unknown>)) {
        return {
          fieldName: field.name,
          value: normalizedType,
          confidence: 0.95,
          source: 'extracted_entity'
        };
      }
    }

    // Recherche dans les entités
    const typeEntities = entities.filter(e => e.type === 'law' || e.type === 'decree');
    if (typeEntities.length > 0) {
      const typeValue = this.extractDocumentTypeFromEntity(typeEntities[0].value);
      if (typeValue) {
        return {
          fieldName: field.name,
          value: typeValue,
          confidence: 0.85,
          source: 'pattern_match'
        };
      }
    }

    return null;
  }

  private mapNumber(field: FormField, structure: DocumentStructure, entities: LegalEntity[]): FieldMapping | null {
    if (structure.number) {
      return {
        fieldName: field.name,
        value: structure.number,
        confidence: 0.9,
        source: 'extracted_entity'
      };
    }

    // Recherche dans les entités numériques
    const numberEntities = entities.filter(e => e.type === 'number');
    if (numberEntities.length > 0) {
      const numberPattern = /(\d{2}-\d{2,3})/;
      for (const entity of numberEntities) {
        const match = entity.value.match(numberPattern);
        if (match) {
          return {
            fieldName: field.name,
            value: match[1],
            confidence: 0.8,
            source: 'pattern_match'
          };
        }
      }
    }

    return null;
  }

  private mapInstitution(field: FormField, entities: LegalEntity[], text: string): FieldMapping | null {
    // Recherche dans les entités institutions
    const institutionEntities = entities.filter(e => e.type === 'institution');
    if (institutionEntities.length > 0) {
      const institution = this.findBestInstitutionMatch(institutionEntities[0].value);
      if (institution) {
        return {
          fieldName: field.name,
          value: institution,
          confidence: 0.85,
          source: 'extracted_entity'
        };
      }
    }

    // Recherche par patterns dans le texte
    for (const institution of INSTITUTIONS) {
      if (text.toLowerCase().includes(institution.toLowerCase())) {
        return {
          fieldName: field.name,
          value: institution,
          confidence: 0.75,
          source: 'pattern_match'
        };
      }
    }

    return null;
  }

  private mapDate(field: FormField, entities: LegalEntity[], type: 'gregorian' | 'hijri'): FieldMapping | null {
    const dateEntities = entities.filter(e => e.type === 'date');
    
    for (const entity of dateEntities) {
      if (type === 'hijri' && this.isHijriDate(entity.value)) {
        return {
          fieldName: field.name,
          value: entity.value,
          confidence: 0.9,
          source: 'extracted_entity'
        };
      } else if (type === 'gregorian' && this.isGregorianDate(entity.value)) {
        return {
          fieldName: field.name,
          value: this.parseGregorianDate(entity.value),
          confidence: 0.9,
          source: 'extracted_entity'
        };
      }
    }

    return null;
  }

  private mapDomain(field: FormField, text: string, entities: LegalEntity[]): FieldMapping | null {
    // Analyse sémantique pour déterminer le domaine
    const domainKeywords = {
      'Justice': ['pénal', 'civil', 'commercial', 'judiciaire', 'tribunal', 'cour'],
      'Finances': ['budget', 'fiscal', 'taxe', 'douane', 'trésor'],
      'Commerce': ['commerce', 'concurrence', 'consommateur', 'marché'],
      'Travail': ['travail', 'emploi', 'sécurité sociale', 'retraite'],
      'Santé': ['santé', 'médical', 'hôpital', 'médicament']
    };

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      for (const keyword of keywords) {
        if (text.toLowerCase().includes(keyword)) {
          return {
            fieldName: field.name,
            value: domain,
            confidence: 0.7,
            source: 'inferred'
          };
        }
      }
    }

    return null;
  }

  private mapDescription(field: FormField, text: string, structure: DocumentStructure): FieldMapping | null {
    // Extraction du premier paragraphe comme description
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 50);
    if (paragraphs.length > 0) {
      let description = paragraphs[0];
      // Nettoyer la description
      description = description.replace(/^(TITRE|CHAPITRE|SECTION)\s+[IVX]+\s*[-.]?\s*/i, '');
      description = description.trim();
      
      if (description.length > 20) {
        return {
          fieldName: field.name,
          value: description.substring(0, 500) + (description.length > 500 ? '...' : ''),
          confidence: 0.75,
          source: 'extracted_entity'
        };
      }
    }

    return null;
  }

  private mapContent(field: FormField, text: string, structure: DocumentStructure): FieldMapping | null {
    return {
      fieldName: field.name,
      value: text,
      confidence: 1.0,
      source: 'extracted_entity'
    };
  }

  private mapStatus(field: FormField, text: string, entities: LegalEntity[]): FieldMapping | null {
    // Recherche d'indicateurs de statut
    const statusPatterns = {
      'En vigueur': /en\s+vigueur|applicable|entre\s+en\s+application/i,
      'Abrogé': /abrog[eé]|annul[eé]|supprim[eé]/i,
      'Suspendu': /suspend|report[eé]|diff[eé]r[eé]/i
    };

    for (const [status, pattern] of Object.entries(statusPatterns)) {
      if (pattern.test(text)) {
        return {
          fieldName: field.name,
          value: status,
          confidence: 0.8,
          source: 'pattern_match'
        };
      }
    }

    // Par défaut, considérer comme "En vigueur"
    return {
      fieldName: field.name,
      value: 'En vigueur',
      confidence: 0.6,
      source: 'inferred'
    };
  }

  private mapArticlesCount(field: FormField, structure: DocumentStructure): FieldMapping | null {
    if (structure.articles && structure.articles.length > 0) {
      return {
        fieldName: field.name,
        value: structure.articles.length.toString(),
        confidence: 0.95,
        source: 'extracted_entity'
      };
    }
    return null;
  }

  private mapCategory(field: FormField, text: string, entities: LegalEntity[]): FieldMapping | null {
    // Catégorisation basée sur les mots-clés
    const categories = {
      'État civil': ['état civil', 'naissance', 'mariage', 'décès', 'nationalité'],
      'Fiscalité': ['impôt', 'taxe', 'déclaration fiscale', 'tva'],
      'Urbanisme': ['permis de construire', 'urbanisme', 'construction'],
      'Commerce': ['registre de commerce', 'licence', 'autorisation commerciale'],
      'Santé': ['carte chifa', 'sécurité sociale', 'assurance maladie']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        if (text.toLowerCase().includes(keyword)) {
          return {
            fieldName: field.name,
            value: category,
            confidence: 0.8,
            source: 'pattern_match'
          };
        }
      }
    }

    return null;
  }

  private mapDuration(field: FormField, text: string): FieldMapping | null {
    // Recherche de durées dans le texte
    const durationPattern = /(\d+)\s*(jour|semaine|mois|année)s?/gi;
    const matches = text.match(durationPattern);
    
    if (matches && matches.length > 0) {
      return {
        fieldName: field.name,
        value: matches[0],
        confidence: 0.7,
        source: 'pattern_match'
      };
    }

    return null;
  }

  private mapDifficulty(field: FormField, text: string): FieldMapping | null {
    // Évaluation de la difficulté basée sur des indicateurs
    const complexityIndicators = {
      'Difficile': ['complexe', 'plusieurs étapes', 'commission', 'expertise'],
      'Moyen': ['modéré', 'standard', 'habituel'],
      'Facile': ['simple', 'direct', 'automatique', 'en ligne']
    };

    for (const [difficulty, indicators] of Object.entries(complexityIndicators)) {
      for (const indicator of indicators) {
        if (text.toLowerCase().includes(indicator)) {
          return {
            fieldName: field.name,
            value: difficulty,
            confidence: 0.6,
            source: 'inferred'
          };
        }
      }
    }

    return {
      fieldName: field.name,
      value: 'Moyen',
      confidence: 0.4,
      source: 'inferred'
    };
  }

  private mapCost(field: FormField, text: string): FieldMapping | null {
    // Recherche de coûts dans le texte
    const costPattern = /(\d+(?:\.\d+)?)\s*(da|dinar|euro|€)/gi;
    const matches = text.match(costPattern);
    
    if (matches && matches.length > 0) {
      return {
        fieldName: field.name,
        value: matches[0],
        confidence: 0.8,
        source: 'pattern_match'
      };
    }

    // Recherche de mentions de gratuité
    if (/gratuit|sans frais|aucun coût/i.test(text)) {
      return {
        fieldName: field.name,
        value: 'Gratuit',
        confidence: 0.9,
        source: 'pattern_match'
      };
    }

    return null;
  }

  private mapRequiredDocuments(field: FormField, text: string): FieldMapping | null {
    // Recherche de listes de documents
    const docPattern = /(?:pièces?\s+(?:à\s+)?fournir|documents?\s+(?:à\s+)?joindre|dossier\s+(?:à\s+)?constituer)[\s\S]{0,500}/i;
    const match = text.match(docPattern);
    
    if (match) {
      return {
        fieldName: field.name,
        value: match[0].trim(),
        confidence: 0.8,
        source: 'pattern_match'
      };
    }

    return null;
  }

  // Méthodes utilitaires
  private normalizeDocumentType(type: string): string {
    const normalized = type.toLowerCase().trim();
    const mappings: { [key: string]: string } = {
      'loi': 'Loi',
      'décret exécutif': 'Décret exécutif',
      'décret présidentiel': 'Décret présidentiel',
      'ordonnance': 'Ordonnance',
      'arrêté ministériel': 'Arrêté ministériel',
      'arrêté interministériel': 'Arrêté interministériel'
    };
    
    return mappings[normalized] || type;
  }

  private extractDocumentTypeFromEntity(entityValue: string): string | null {
    const typePattern = /(loi|décret\s+(?:exécutif|présidentiel)|ordonnance|arrêté)/i;
    const match = entityValue.match(typePattern);
    return match ? this.normalizeDocumentType(match[1]) : null;
  }

  private findBestInstitutionMatch(value: string): string | null {
    const normalized = value.toLowerCase();
    return INSTITUTIONS.find(inst => 
      normalized.includes(inst.toLowerCase()) || 
      inst.toLowerCase().includes(normalized)
    ) || null;
  }

  private isHijriDate(dateStr: string): boolean {
    const hijriMonths = [
      'moharram', 'safar', 'rabia el aouel', 'rabia ethani', 
      'joumada el aouela', 'joumada ethania', 'rajab', 'chaabane', 
      'ramadhan', 'chaoual', 'dhou el kaada', 'dhou el hidja'
    ];
    
    return hijriMonths.some(month => 
      dateStr.toLowerCase().includes(month)
    );
  }

  private isGregorianDate(dateStr: string): boolean {
    const gregorianMonths = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    
    return gregorianMonths.some(month => 
      dateStr.toLowerCase().includes(month)
    );
  }

  private parseGregorianDate(dateStr: string): string {
    // Conversion en format ISO pour les champs date
    const datePattern = /(\d{1,2})(?:er)?\s+(\w+)\s+(\d{4})/;
    const match = dateStr.match(datePattern);
    
    if (match) {
      const [, day, monthName, year] = match;
      const monthMap: { [key: string]: string } = {
        'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
        'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
        'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
      };
      
      const month = monthMap[monthName.toLowerCase()];
      if (month) {
        return `${year}-${month}-${day.padStart(2, '0')}`;
      }
    }
    
    return dateStr;
  }

  private generateFieldSuggestion(field: FormField, extractedData: ExtractedData): FieldSuggestion | null {
    // Génération de suggestions intelligentes pour les champs non mappés
    if (field.name === 'version' && extractedData.text.includes('modifie')) {
      return {
        fieldName: field.name,
        suggestedValue: '2.0',
        reason: 'Document de modification détecté',
        confidence: 0.6
      };
    }

    return null;
  }

  private calculateMappingConfidence(mappedFields: FieldMapping[], allFields: FormField[]): number {
    const requiredFields = allFields.filter(f => f.required);
    const mappedRequiredFields = mappedFields.filter(m => 
      requiredFields.some(f => f.name === m.fieldName)
    );
    
    const completenessScore = mappedRequiredFields.length / requiredFields.length;
    const averageFieldConfidence = mappedFields.reduce((sum, field) => sum + field.confidence, 0) / mappedFields.length;
    
    return (completenessScore * 0.6 + averageFieldConfidence * 0.4);
  }
}

export const autoMappingService = new AutoMappingService();
export type { MappingResult, FieldMapping, FieldSuggestion };
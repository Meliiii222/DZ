/**
 * Service de mapping dynamique des données OCR vers les formulaires
 * Récupère la structure depuis la nomenclature et adapte selon le contexte
 */

import { StructuredLegalDocument, LegalEntity } from './legalOCRExtractionService';
import { sanitizeInput } from '@/utils/basicSecurity';
import { 
  getTemplateByType, 
  getFormStructureByType,
  algerianLegalTemplates,
  type AlgerianLegalTemplate,
  type FormTemplate 
} from '@/data/algerianLegalTemplates';

// Interface pour les champs de formulaire
export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'checkbox' | 'radio' | 'file';
  required: boolean;
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  defaultValue?: any;
  mappingRules?: string[];
}

// Interface pour la structure de formulaire
export interface FormStructure {
  id: string;
  name: string;
  category: 'texte_juridique' | 'procedure_administrative';
  sections: FormSection[];
  metadata: {
    version: string;
    lastModified: string;
    documentTypes: string[];
  };
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  conditional?: {
    field: string;
    value: any;
  };
}

// Interface pour les données mappées
export interface MappedFormData {
  formId: string;
  sections: Array<{
    sectionId: string;
    fields: Array<{
      fieldId: string;
      value: any;
      confidence: number;
      source: 'ocr' | 'user' | 'system';
      mappingMethod: string;
    }>;
  }>;
  metadata: {
    ocrConfidence: number;
    mappingConfidence: number;
    processingTime: number;
    warnings: string[];
  };
}

class LegalFormMappingService {
  private formTemplates: Map<string, FormStructure> = new Map();

  constructor() {
    this.initializeFormTemplates();
    this.initializeTemplates();
  }

  /**
   * Initialise les templates de formulaires depuis la nomenclature algérienne
   */
  private initializeFormTemplates(): void {
    console.log('📋 Initializing Algerian legal form templates...');

    // Charger tous les templates algériens
    for (const template of algerianLegalTemplates) {
      const formStructure: FormStructure = {
        id: template.id,
        name: template.name,
        category: 'texte_juridique',
              sections: this.convertAlgerianSectionsToFormSections(template.formStructure.sections),
        metadata: {
          version: template.formStructure.metadata.version,
          lastModified: template.formStructure.metadata.lastUpdated,
          documentTypes: template.formStructure.metadata.applicableTypes
        }
      };
      
      this.formTemplates.set(template.id, formStructure);
      this.formTemplates.set(template.type, formStructure); // Alias par type
    }

    console.log(`✅ Loaded ${algerianLegalTemplates.length} Algerian legal templates`);
  }

  /**
   * Convertit les sections algériennes vers le format FormSection
   */
  private convertAlgerianSectionsToFormSections(algerianSections: any[]): FormSection[] {
    return algerianSections.map(section => ({
      id: section.id,
      title: section.title,
      description: section.description,
      fields: section.fields.map((field: any) => ({
        id: field.id,
        name: field.name,
        type: field.type,
        required: field.required,
        label: field.label,
        placeholder: field.placeholder,
        options: field.options,
        validation: field.validation,
        defaultValue: field.defaultValue,
        mappingRules: field.ocrMappingRules || []
      }))
    }));
  }

  /**
   * Récupère la structure de formulaire pour un type de document donné
   */
  public getFormStructureForDocumentType(documentType: string): FormStructure | undefined {
    // Recherche d'abord par type exact
    let formStructure = this.formTemplates.get(documentType.toLowerCase());
    
    if (!formStructure) {
      // Recherche par template algérien
      const template = getTemplateByType(documentType);
      if (template) {
        formStructure = this.formTemplates.get(template.id);
      }
    }
    
    if (!formStructure) {
      // Fallback vers template générique
      formStructure = this.createGenericTemplate(documentType);
    }
    
    return formStructure;
  }

  /**
   * Crée un template générique pour les documents non reconnus
   */
  private createGenericTemplate(documentType: string): FormStructure {
    return {
      id: 'generic_document',
      name: `Formulaire ${documentType}`,
      category: 'texte_juridique',
      sections: [
        {
          id: 'identification',
          title: 'Identification du Document',
          fields: [
            {
              id: 'document_type',
              name: 'type_document',
              type: 'text',
              required: true,
              label: 'Type de Document',
              options: [
                { value: 'loi', label: 'Loi' },
                { value: 'decret', label: 'Décret' },
                { value: 'arrete', label: 'Arrêté' },
                { value: 'ordonnance', label: 'Ordonnance' },
                { value: 'decision', label: 'Décision' },
                { value: 'circulaire', label: 'Circulaire' },
                { value: 'instruction', label: 'Instruction' }
              ],
              mappingRules: ['legalTypePatterns']
            },
            {
              id: 'document_number',
              name: 'numero_document',
              type: 'text',
              required: true,
              label: 'Numéro du Document',
              placeholder: 'Ex: 23-45',
              validation: {
                pattern: '^[0-9]+[-/][0-9]+$',
                maxLength: 20
              },
              mappingRules: ['documentNumber']
            },
            {
              id: 'document_title',
              name: 'titre_document',
              type: 'textarea',
              required: true,
              label: 'Titre du Document',
              validation: {
                maxLength: 500
              },
              mappingRules: ['documentTitle']
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastModified: new Date().toISOString(),
        documentTypes: ['loi', 'decret', 'arrete', 'ordonnance', 'decision', 'circulaire', 'instruction']
      }
    };
  }

  private initializeTemplates(): void {
    // Template pour les procédures administratives
    const administrativeProcedureTemplate: FormStructure = {
      id: 'administrative_procedure_form',
      name: 'Formulaire Procédure Administrative',
      category: 'procedure_administrative',
      sections: [
        {
          id: 'procedure_info',
          title: 'Informations de la Procédure',
          fields: [
            {
              id: 'procedure_name',
              name: 'nom_procedure',
              type: 'text',
              required: true,
              label: 'Nom de la Procédure',
              validation: {
                maxLength: 200
              },
              mappingRules: ['procedureName']
            },
            {
              id: 'responsible_entity',
              name: 'entite_responsable',
              type: 'text',
              required: true,
              label: 'Entité Responsable',
              validation: {
                maxLength: 200
              },
              mappingRules: ['responsibleEntity']
            },
            {
              id: 'procedure_steps',
              name: 'etapes_procedure',
              type: 'textarea',
              required: true,
              label: 'Étapes de la Procédure',
              validation: {
                maxLength: 5000
              },
              mappingRules: ['procedureSteps']
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastModified: new Date().toISOString(),
        documentTypes: ['procedure', 'guide', 'manuel']
      }
    };

    const legalDocumentTemplate: FormStructure = {
      id: 'legal_document_form',
      name: 'Formulaire Document Juridique',
      category: 'texte_juridique',
      sections: [
        {
          id: 'legal_info',
          title: 'Informations Juridiques',
          fields: [
            {
              id: 'document_type',
              name: 'document_type',
              type: 'select',
              required: true,
              label: 'Type de Document',
              options: [
                { value: 'loi', label: 'Loi' },
                { value: 'decret', label: 'Décret' },
                { value: 'arrete', label: 'Arrêté' },
                { value: 'ordonnance', label: 'Ordonnance' },
                { value: 'decision', label: 'Décision' },
                { value: 'circulaire', label: 'Circulaire' },
                { value: 'instruction', label: 'Instruction' }
              ],
              mappingRules: ['documentTypePatterns']
            },
            {
              id: 'document_number',
              name: 'document_number',
              type: 'text',
              required: true,
              label: 'Numéro du Document',
              validation: {
                pattern: '\\d+[-/]\\d+',
                maxLength: 50
              },
              mappingRules: ['numberPatterns']
            },
            {
              id: 'title',
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
              validation: {
                maxLength: 500
              },
              mappingRules: ['titlePatterns']
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastModified: new Date().toISOString(),
        documentTypes: ['loi', 'decret', 'arrete', 'ordonnance', 'decision', 'circulaire', 'instruction']
      }
    };

    this.formTemplates.set('legal_document', legalDocumentTemplate);
    this.formTemplates.set('administrative_procedure', administrativeProcedureTemplate);
    
    console.log(`📋 Initialized ${this.formTemplates.size} form templates`);
  }

  /**
   * Mapping principal des données OCR vers un formulaire
   */
  async mapOCRDataToForm(
    ocrData: StructuredLegalDocument,
    formType?: string
  ): Promise<MappedFormData> {
    const startTime = Date.now();
    console.log('🗂️ Starting OCR data mapping to form...');

    try {
      // Déterminer le type de formulaire automatiquement si non spécifié
      const selectedFormType = formType || this.determineFormType(ocrData);
      const formStructure = this.formTemplates.get(selectedFormType);

      if (!formStructure) {
        throw new Error(`Form template not found: ${selectedFormType}`);
      }

      // Mapper chaque section
      const mappedSections = await Promise.all(
        formStructure.sections.map(section => this.mapSection(section, ocrData))
      );

      const processingTime = Date.now() - startTime;
      const mappingConfidence = this.calculateMappingConfidence(mappedSections);

      console.log(`🗂️ Mapping completed in ${processingTime}ms with confidence ${mappingConfidence.toFixed(2)}`);

      return {
        formId: formStructure.id,
        sections: mappedSections,
        metadata: {
          ocrConfidence: ocrData.metadata.confidence,
          mappingConfidence,
          processingTime,
          warnings: this.generateWarnings(mappedSections, ocrData)
        }
      };

    } catch (error) {
      console.error('🗂️ Mapping failed:', error);
      throw new Error(`Mapping failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Détermine automatiquement le type de formulaire selon les données OCR
   */
  private determineFormType(ocrData: StructuredLegalDocument): string {
    if (ocrData.entities.length > 0) {
      const entity = ocrData.entities[0];
      const legalTypes = ['loi', 'decret', 'arrete', 'ordonnance', 'decision', 'circulaire', 'instruction'];
      
      if (legalTypes.includes(entity.type)) {
        return 'legal_document';
      }
    }

    // Détecter si c'est une procédure administrative
    const fullText = ocrData.rawText.map(t => t.content).join(' ').toLowerCase();
    if (fullText.includes('procédure') || fullText.includes('étapes') || fullText.includes('guide')) {
      return 'administrative_procedure';
    }

    // Par défaut, considérer comme document juridique
    return 'legal_document';
  }

  /**
   * Mapper une section du formulaire
   */
  private async mapSection(
    section: FormSection,
    ocrData: StructuredLegalDocument
  ): Promise<any> {
    console.log(`📋 Mapping section: ${section.title}`);

    const mappedFields = await Promise.all(
      section.fields.map(field => this.mapField(field, ocrData))
    );

    return {
      sectionId: section.id,
      fields: mappedFields
    };
  }

  /**
   * Mapper un champ du formulaire
   */
  private async mapField(
    field: FormField,
    ocrData: StructuredLegalDocument
  ): Promise<any> {
    console.log(`🔍 Mapping field: ${field.label}`);

    let value: any = null;
    let confidence = 0;
    let mappingMethod = 'none';
    let source: 'ocr' | 'user' | 'system' = 'system';

    if (field.mappingRules && field.mappingRules.length > 0) {
      const mappingResult = await this.applyMappingRules(field.mappingRules, ocrData);
      value = mappingResult.value;
      confidence = mappingResult.confidence;
      mappingMethod = mappingResult.method;
      source = mappingResult.value ? 'ocr' : 'system';
    }

    // Appliquer la validation et la sanitisation
    if (value) {
      value = this.validateAndSanitizeValue(value, field);
    }

    return {
      fieldId: field.id,
      value: value || field.defaultValue || null,
      confidence,
      source,
      mappingMethod
    };
  }

  /**
   * Applique les règles de mapping pour un champ
   */
  private async applyMappingRules(
    rules: string[],
    ocrData: StructuredLegalDocument
  ): Promise<{ value: any; confidence: number; method: string }> {
    for (const rule of rules) {
      const result = await this.applyMappingRule(rule, ocrData);
      if (result.value !== null) {
        return result;
      }
    }

    return { value: null, confidence: 0, method: 'none' };
  }

  /**
   * Applique une règle de mapping spécifique
   */
  private async applyMappingRule(
    rule: string,
    ocrData: StructuredLegalDocument
  ): Promise<{ value: any; confidence: number; method: string }> {
    
    switch (rule) {
      case 'legalTypePatterns':
        return this.extractLegalType(ocrData);
      
      case 'documentNumber':
        return this.extractDocumentNumber(ocrData);
      
      case 'documentTitle':
        return this.extractDocumentTitle(ocrData);
      
      case 'institutionPatterns':
        return this.extractIssuingAuthority(ocrData);
      
      case 'gregorianDate':
        return this.extractGregorianDate(ocrData);
      
      case 'hijriDate':
        return this.extractHijriDate(ocrData);
      
      case 'preambleContent':
        return this.extractPreamble(ocrData);
      
      case 'articlesContent':
        return this.extractArticles(ocrData);
      
      case 'vuReferences':
        return this.extractVuReferences(ocrData);
      
      case 'modificationReferences':
        return this.extractModificationReferences(ocrData);
      
      case 'abrogationReferences':
        return this.extractAbrogationReferences(ocrData);
      
      default:
        return { value: null, confidence: 0, method: 'unknown_rule' };
    }
  }

  /**
   * Méthodes d'extraction spécifiques
   */
  private extractLegalType(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      return {
        value: ocrData.entities[0].type,
        confidence: 0.9,
        method: 'entity_extraction'
      };
    }
    return { value: null, confidence: 0, method: 'entity_extraction' };
  }

  private extractDocumentNumber(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0 && ocrData.entities[0].number) {
      return {
        value: ocrData.entities[0].number,
        confidence: 0.85,
        method: 'regex_extraction'
      };
    }
    return { value: null, confidence: 0, method: 'regex_extraction' };
  }

  private extractDocumentTitle(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      return {
        value: ocrData.entities[0].title,
        confidence: 0.8,
        method: 'pattern_matching'
      };
    }
    return { value: null, confidence: 0, method: 'pattern_matching' };
  }

  private extractIssuingAuthority(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      const authority = ocrData.entities[0].issuingAuthority;
      let mappedValue = 'autre';
      
      if (authority.toLowerCase().includes('président')) mappedValue = 'president';
      else if (authority.toLowerCase().includes('premier ministre')) mappedValue = 'premier_ministre';
      else if (authority.toLowerCase().includes('ministre')) mappedValue = 'ministre';
      else if (authority.toLowerCase().includes('assemblée')) mappedValue = 'assemblee';
      else if (authority.toLowerCase().includes('conseil')) mappedValue = 'conseil';
      
      return {
        value: mappedValue,
        confidence: mappedValue !== 'autre' ? 0.8 : 0.3,
        method: 'pattern_matching'
      };
    }
    return { value: null, confidence: 0, method: 'pattern_matching' };
  }

  private extractGregorianDate(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0 && ocrData.entities[0].date?.gregorian) {
      return {
        value: ocrData.entities[0].date.gregorian,
        confidence: 0.9,
        method: 'date_extraction'
      };
    }
    return { value: null, confidence: 0, method: 'date_extraction' };
  }

  private extractHijriDate(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0 && ocrData.entities[0].date?.hijri) {
      return {
        value: ocrData.entities[0].date.hijri,
        confidence: 0.9,
        method: 'date_extraction'
      };
    }
    return { value: null, confidence: 0, method: 'date_extraction' };
  }

  private extractPreamble(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    // Extraire le préambule (texte avant le premier article)
    const fullText = ocrData.rawText.map(t => t.content).join(' ');
    const firstArticleIndex = fullText.toLowerCase().indexOf('article');
    
    if (firstArticleIndex > 0) {
      const preamble = fullText.substring(0, firstArticleIndex).trim();
      return {
        value: preamble,
        confidence: 0.7,
        method: 'text_segmentation'
      };
    }
    return { value: null, confidence: 0, method: 'text_segmentation' };
  }

  private extractArticles(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0 && ocrData.entities[0].articles.length > 0) {
      const articlesText = ocrData.entities[0].articles.map(
        article => `Article ${article.number}: ${article.content}`
      ).join('\n\n');
      
      return {
        value: articlesText,
        confidence: 0.85,
        method: 'article_extraction'
      };
    }
    return { value: null, confidence: 0, method: 'article_extraction' };
  }

  private extractVuReferences(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      const vuRefs = ocrData.entities[0].references.filter(ref => ref.type === 'vu');
      if (vuRefs.length > 0) {
        const refsText = vuRefs.map(ref => ref.description).join('\n');
        return {
          value: refsText,
          confidence: 0.8,
          method: 'reference_extraction'
        };
      }
    }
    return { value: null, confidence: 0, method: 'reference_extraction' };
  }

  private extractModificationReferences(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      const modRefs = ocrData.entities[0].references.filter(ref => ref.type === 'modification');
      if (modRefs.length > 0) {
        const refsText = modRefs.map(ref => ref.description).join('\n');
        return {
          value: refsText,
          confidence: 0.8,
          method: 'reference_extraction'
        };
      }
    }
    return { value: null, confidence: 0, method: 'reference_extraction' };
  }

  private extractAbrogationReferences(ocrData: StructuredLegalDocument): { value: any; confidence: number; method: string } {
    if (ocrData.entities.length > 0) {
      const abrogRefs = ocrData.entities[0].references.filter(ref => ref.type === 'abrogation');
      if (abrogRefs.length > 0) {
        const refsText = abrogRefs.map(ref => ref.description).join('\n');
        return {
          value: refsText,
          confidence: 0.8,
          method: 'reference_extraction'
        };
      }
    }
    return { value: null, confidence: 0, method: 'reference_extraction' };
  }

  /**
   * Valide et sanitise une valeur selon le type de champ
   */
  private validateAndSanitizeValue(value: any, field: FormField): any {
    if (typeof value === 'string') {
      value = sanitizeInput(value);
      
      if (field.validation?.maxLength) {
        value = value.substring(0, field.validation.maxLength);
      }
      
      if (field.validation?.pattern) {
        const pattern = new RegExp(field.validation.pattern);
        if (!pattern.test(value)) {
          console.warn(`Value "${value}" doesn't match pattern for field ${field.id}`);
        }
      }
    }
    
    return value;
  }

  /**
   * Calcule la confiance globale du mapping
   */
  private calculateMappingConfidence(sections: any[]): number {
    let totalConfidence = 0;
    let totalFields = 0;

    sections.forEach(section => {
      section.fields.forEach((field: any) => {
        totalConfidence += field.confidence;
        totalFields++;
      });
    });

    return totalFields > 0 ? totalConfidence / totalFields : 0;
  }

  /**
   * Génère des avertissements sur la qualité du mapping
   */
  private generateWarnings(sections: any[], ocrData: StructuredLegalDocument): string[] {
    const warnings: string[] = [];

    // Vérifier les champs obligatoires non mappés
    sections.forEach(section => {
      section.fields.forEach((field: any) => {
        if (field.confidence < 0.5) {
          warnings.push(`Faible confiance pour le champ ${field.fieldId} (${(field.confidence * 100).toFixed(1)}%)`);
        }
        if (!field.value && field.required) {
          warnings.push(`Champ obligatoire non mappé: ${field.fieldId}`);
        }
      });
    });

    // Vérifier la confiance globale de l'OCR
    if (ocrData.metadata.confidence < 0.7) {
      warnings.push(`Confiance OCR faible: ${(ocrData.metadata.confidence * 100).toFixed(1)}%`);
    }

    return warnings;
  }

  /**
   * Retourne la liste des types de formulaires disponibles
   */
  getAvailableFormTypes(): string[] {
    return Array.from(this.formTemplates.keys());
  }

  /**
   * Retourne un template de formulaire spécifique
   */
  getFormTemplate(formType: string): FormStructure | null {
    return this.formTemplates.get(formType) || null;
  }

  /**
   * Met à jour la structure d'un formulaire (si nécessaire selon le contexte)
   */
  updateFormStructure(formType: string, updates: Partial<FormStructure>): boolean {
    const existing = this.formTemplates.get(formType);
    if (!existing) return false;

    const updated = { ...existing, ...updates };
    this.formTemplates.set(formType, updated);
    
    console.log(`📋 Updated form structure for: ${formType}`);
    return true;
  }
}

export const legalFormMappingService = new LegalFormMappingService();
export default legalFormMappingService;
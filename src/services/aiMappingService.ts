// @ts-nocheck
import { ExtractedData, StructuredLegalData } from './ocrService';
import nlp from 'compromise';

export interface MappingResult {
  formData: Record<string, any>;
  confidence: number;
  suggestions: FieldSuggestion[];
  validationErrors: ValidationError[];
  detectedEntities: LegalEntity[];
}

export interface FieldSuggestion {
  fieldName: string;
  suggestedValue: string;
  confidence: number;
  source: 'ocr' | 'ai' | 'pattern' | 'nomenclature';
  alternatives: string[];
}

export interface ValidationError {
  fieldName: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

export interface LegalEntity {
  type: 'institution' | 'person' | 'date' | 'reference' | 'location' | 'legal_concept';
  text: string;
  confidence: number;
  position: { start: number; end: number };
  metadata: Record<string, any>;
}

export class AlgerianLegalAIMappingService {
  private algerianInstitutions: string[] = [
    'Président de la République',
    'Premier Ministre',
    'Ministre de la Justice',
    'Ministre de l\'Intérieur',
    'Ministre des Finances',
    'Ministre de l\'Énergie',
    'Conseil constitutionnel',
    'Cour suprême',
    'Conseil d\'État',
    'Assemblée populaire nationale',
    'Conseil de la nation',
    'Wali',
    'Président de l\'APC',
    'Directeur général'
  ];

  private algerianWilayas: string[] = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou',
    'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba',
    'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla',
    'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf',
    'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza',
    'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'
  ];

  private legalTermsArabic: Record<string, string> = {
    'قانون': 'loi',
    'مرسوم': 'décret',
    'قرار': 'arrêté',
    'أمر': 'ordonnance',
    'تعليمة': 'instruction',
    'منشور': 'circulaire',
    'دستور': 'constitution',
    'مادة': 'article',
    'فصل': 'chapitre',
    'باب': 'titre',
    'رئيس الجمهورية': 'Président de la République',
    'الوزير الأول': 'Premier Ministre',
    'وزير': 'Ministre',
    'والي': 'Wali'
  };

  private hijriMonths: Record<string, number> = {
    'Moharram': 1,
    'Safar': 2,
    'Rabia El Aouel': 3,
    'Rabia Ethani': 4,
    'Joumada El Aouela': 5,
    'Joumada Ethania': 6,
    'Rajab': 7,
    'Chaabane': 8,
    'Ramadhan': 9,
    'Chaoual': 10,
    'Dou El Kaada': 11,
    'Dou El Hidja': 12
  };

  private gregorianMonths: Record<string, number> = {
    'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
    'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12
  };

  /**
   * Mapper les données OCR extraites vers les champs de formulaire
   */
  async mapToForm(extractedData: ExtractedData, formTemplate: Record<string, unknown>): Promise<MappingResult> {
    console.log('🇩🇿 [AI Mapping] Début du mapping des données vers le formulaire');

    try {
      // Étape 1: Détecter les entités juridiques spécifiques
      const detectedEntities = await this.detectLegalEntities(extractedData.text, extractedData.structuredData);

      // Étape 2: Analyser le contexte juridique algérien
      const contextAnalysis = await this.analyzeAlgerianLegalContext(extractedData.structuredData, detectedEntities);

      // Étape 3: Mapper vers les champs du formulaire
      const formData = await this.mapToFormFields(extractedData.structuredData, formTemplate, detectedEntities, contextAnalysis);

      // Étape 4: Générer des suggestions intelligentes
      const suggestions = await this.generateFieldSuggestions(extractedData, formTemplate, detectedEntities);

      // Étape 5: Valider les données mappées
      const validationErrors = await this.validateMappedData(formData, formTemplate);

      // Étape 6: Calculer la confiance globale
      const confidence = this.calculateMappingConfidence(formData, suggestions, validationErrors, extractedData.confidence);

      console.log('🇩🇿 [AI Mapping] Mapping terminé avec succès');

      return {
        formData,
        confidence,
        suggestions,
        validationErrors,
        detectedEntities
      };

    } catch (error) {
      console.error('🇩🇿 [AI Mapping] Erreur lors du mapping:', error);
      throw new Error(`Erreur lors du mapping IA: ${error.message}`);
    }
  }

  /**
   * Détecter les entités juridiques spécifiques dans le texte
   */
  private async detectLegalEntities(text: string, structuredData: StructuredLegalData): Promise<LegalEntity[]> {
    const entities: LegalEntity[] = [];

    // Détecter les institutions algériennes
    for (const institution of this.algerianInstitutions) {
      const regex = new RegExp(institution.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'institution',
          text: match[0],
          confidence: 0.9,
          position: { start: match.index, end: match.index + match[0].length },
          metadata: { 
            standardName: institution,
            category: 'government'
          }
        });
      }
    }

    // Détecter les wilayas
    for (const wilaya of this.algerianWilayas) {
      const regex = new RegExp(`\\b${wilaya}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'location',
          text: match[0],
          confidence: 0.85,
          position: { start: match.index, end: match.index + match[0].length },
          metadata: { 
            type: 'wilaya',
            standardName: wilaya
          }
        });
      }
    }

    // Détecter les dates hégirien
    const hijriPattern = /(\d+)\s+(Moharram|Safar|Rabia\s+El\s+Aouel|Rabia\s+Ethani|Joumada\s+El\s+Aouela|Joumada\s+Ethania|Rajab|Chaabane|Ramadhan|Chaoual|Dou\s+El\s+Kaada|Dou\s+El\s+Hidja)\s+(\d{4})/gi;
    let hijriMatch;
    while ((hijriMatch = hijriPattern.exec(text)) !== null) {
      entities.push({
        type: 'date',
        text: hijriMatch[0],
        confidence: 0.95,
        position: { start: hijriMatch.index, end: hijriMatch.index + hijriMatch[0].length },
        metadata: { 
          calendar: 'hijri',
          day: parseInt(hijriMatch[1]),
          month: hijriMatch[2],
          year: parseInt(hijriMatch[3])
        }
      });
    }

    // Détecter les dates grégorien
    const gregorianPattern = /(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/gi;
    let gregorianMatch;
    while ((gregorianMatch = gregorianPattern.exec(text)) !== null) {
      entities.push({
        type: 'date',
        text: gregorianMatch[0],
        confidence: 0.95,
        position: { start: gregorianMatch.index, end: gregorianMatch.index + gregorianMatch[0].length },
        metadata: { 
          calendar: 'gregorian',
          day: parseInt(gregorianMatch[1]),
          month: gregorianMatch[2],
          year: parseInt(gregorianMatch[3])
        }
      });
    }

    // Détecter les références juridiques
    const referencePattern = /(?:loi|décret|arrêté|ordonnance)\s+n°?\s*([\d-/]+)/gi;
    let refMatch;
    while ((refMatch = referencePattern.exec(text)) !== null) {
      entities.push({
        type: 'reference',
        text: refMatch[0],
        confidence: 0.9,
        position: { start: refMatch.index, end: refMatch.index + refMatch[0].length },
        metadata: { 
          type: refMatch[0].split(/\s+/)[0].toLowerCase(),
          number: refMatch[1]
        }
      });
    }

    // Détecter les personnes (noms propres en contexte juridique)
    const personPattern = /(?:Monsieur|Madame|M\.|Mme)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
    let personMatch;
    while ((personMatch = personPattern.exec(text)) !== null) {
      entities.push({
        type: 'person',
        text: personMatch[0],
        confidence: 0.8,
        position: { start: personMatch.index, end: personMatch.index + personMatch[0].length },
        metadata: { 
          name: personMatch[1],
          title: personMatch[0].split(/\s+/)[0]
        }
      });
    }

    // Détecter les concepts juridiques spécifiques
    const legalConcepts = [
      'abrogation', 'modification', 'complément', 'annulation', 'suspension',
      'promulgation', 'publication', 'entrée en vigueur', 'application',
      'conformité constitutionnelle', 'contrôle de légalité'
    ];

    for (const concept of legalConcepts) {
      const regex = new RegExp(`\\b${concept}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: 'legal_concept',
          text: match[0],
          confidence: 0.85,
          position: { start: match.index, end: match.index + match[0].length },
          metadata: { 
            concept: concept,
            category: 'legal_action'
          }
        });
      }
    }

    return entities.sort((a, b) => a.position.start - b.position.start);
  }

  /**
   * Analyser le contexte juridique algérien
   */
  private async analyzeAlgerianLegalContext(structuredData: StructuredLegalData, entities: LegalEntity[]): Promise<any> {
    const context = {
      documentType: structuredData.type,
      institutionLevel: this.determineInstitutionLevel(structuredData.institution),
      juridicalDomain: this.inferJuridicalDomain(structuredData.content),
      geographicScope: this.determineGeographicScope(entities),
      temporalContext: this.analyzeTemporalContext(entities),
      legalHierarchy: this.determineLegalHierarchy(structuredData.type),
      references: this.analyzeReferences(structuredData.references)
    };

    return context;
  }

  private determineInstitutionLevel(institution: string): string {
    if (institution.includes('Président de la République')) return 'national_executive';
    if (institution.includes('Premier Ministre')) return 'national_executive';
    if (institution.includes('Ministre')) return 'ministerial';
    if (institution.includes('Wali')) return 'wilaya';
    if (institution.includes('APC')) return 'communal';
    if (institution.includes('Conseil constitutionnel')) return 'constitutional';
    if (institution.includes('Cour suprême')) return 'judicial';
    return 'unknown';
  }

  private inferJuridicalDomain(content: string): string[] {
    const domains = [];
    
    const domainKeywords = {
      'civil': ['état civil', 'mariage', 'divorce', 'succession', 'propriété'],
      'penal': ['crime', 'délit', 'contravention', 'sanction', 'peine'],
      'commercial': ['commerce', 'entreprise', 'société', 'registre du commerce'],
      'administratif': ['fonction publique', 'service public', 'administration'],
      'fiscal': ['impôt', 'taxe', 'douane', 'fiscalité'],
      'social': ['sécurité sociale', 'travail', 'emploi', 'retraite'],
      'environnemental': ['environnement', 'pollution', 'protection'],
      'urbain': ['urbanisme', 'construction', 'permis de construire'],
      'transport': ['transport', 'circulation', 'permis de conduire'],
      'santé': ['santé', 'médical', 'pharmacie', 'hôpital']
    };

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        domains.push(domain);
      }
    }

    return domains.length > 0 ? domains : ['general'];
  }

  private determineGeographicScope(entities: LegalEntity[]): string {
    const locationEntities = entities.filter(e => e.type === 'location');
    
    if (locationEntities.length === 0) return 'national';
    if (locationEntities.some(e => e.metadata.type === 'wilaya')) return 'wilaya';
    return 'local';
  }

  private analyzeTemporalContext(entities: LegalEntity[]): Record<string, unknown> {
    const dateEntities = entities.filter(e => e.type === 'date');
    
    return {
      hasHijriDates: dateEntities.some(e => e.metadata.calendar === 'hijri'),
      hasGregorianDates: dateEntities.some(e => e.metadata.calendar === 'gregorian'),
      dateCount: dateEntities.length,
      latestYear: Math.max(...dateEntities.map(e => e.metadata.year || 0))
    };
  }

  private determineLegalHierarchy(documentType: string): number {
    const hierarchy = {
      'Constitution': 1,
      'Loi organique': 2,
      'Loi': 3,
      'Ordonnance': 4,
      'Décret présidentiel': 5,
      'Décret exécutif': 6,
      'Arrêté interministériel': 7,
      'Arrêté ministériel': 8,
      'Décision': 9,
      'Instruction': 10,
      'Circulaire': 11
    };

    return hierarchy[documentType] || 99;
  }

  private analyzeReferences(references: Record<string, unknown>[]): Record<string, unknown> {
    return {
      vuReferences: references.filter(r => r.type === 'vu').length,
      modifications: references.filter(r => r.type === 'modification').length,
      abrogations: references.filter(r => r.type === 'abrogation').length,
      totalReferences: references.length
    };
  }

  /**
   * Mapper vers les champs du formulaire
   */
  private async mapToFormFields(structuredData: StructuredLegalData, formTemplate: Record<string, unknown>, entities: LegalEntity[], context: Record<string, unknown>): Promise<Record<string, any>> {
    const formData: Record<string, any> = {};

    // Mapping des champs de base
    if (formTemplate.fields) {
      for (const field of formTemplate.fields) {
        const mappedValue = await this.mapFieldValue(field, structuredData, entities, context);
        if (mappedValue !== null) {
          formData[field.name] = mappedValue;
        }
      }
    }

    // Mappings spécialisés selon le type de document
    this.applySpecializedMappings(formData, structuredData, context);

    return formData;
  }

  private async mapFieldValue(field: Record<string, unknown>, structuredData: StructuredLegalData, entities: LegalEntity[], context: Record<string, unknown>): Promise<any> {
    const fieldName = field.name.toLowerCase();
    const fieldType = field.type;

    // Mapping par nom de champ
    switch (fieldName) {
      case 'title':
      case 'titre':
        return structuredData.title || null;

      case 'type':
      case 'type_document':
        return structuredData.type || null;

      case 'number':
      case 'numero':
        return structuredData.number || null;

      case 'date_hijri':
      case 'date_hegirien':
        return structuredData.dateHijri || null;

      case 'date_gregorian':
      case 'date_gregorien':
        return structuredData.dateGregorian || this.extractGregorianDate(entities);

      case 'institution':
      case 'organisme':
        return structuredData.institution || this.extractInstitution(entities);

      case 'wilaya':
        return this.extractWilaya(entities);

      case 'domain':
      case 'domaine':
        return context.juridicalDomain[0] || null;

      case 'content':
      case 'contenu':
        return structuredData.content || null;

      case 'articles_count':
      case 'nombre_articles':
        return structuredData.articles.length || null;

      case 'signatory':
      case 'signataire':
        return structuredData.signatories[0] || null;

      default:
        return await this.inferFieldValue(field, structuredData, entities, context);
    }
  }

  private extractGregorianDate(entities: LegalEntity[]): string | null {
    const gregorianDates = entities.filter(e => e.type === 'date' && e.metadata.calendar === 'gregorian');
    return gregorianDates.length > 0 ? gregorianDates[0].text : null;
  }

  private extractInstitution(entities: LegalEntity[]): string | null {
    const institutions = entities.filter(e => e.type === 'institution');
    return institutions.length > 0 ? institutions[0].metadata.standardName : null;
  }

  private extractWilaya(entities: LegalEntity[]): string | null {
    const wilayas = entities.filter(e => e.type === 'location' && e.metadata.type === 'wilaya');
    return wilayas.length > 0 ? wilayas[0].metadata.standardName : null;
  }

  private async inferFieldValue(field: Record<string, unknown>, structuredData: StructuredLegalData, entities: LegalEntity[], context: Record<string, unknown>): Promise<any> {
    // Utiliser NLP pour inférer des valeurs basées sur le contexte
    const doc = nlp(structuredData.content);
    
    // Inférence basée sur le type de champ
    switch (field.type) {
      case 'date':
        return this.inferDateField(field, entities);
      
      case 'select':
        return this.inferSelectField(field, structuredData, context);
      
      case 'number':
        return this.inferNumberField(field, structuredData.content);
      
      case 'text':
        return this.inferTextField(field, doc, entities);
      
      default:
        return null;
    }
  }

  private inferDateField(field: Record<string, unknown>, entities: LegalEntity[]): string | null {
    const dateEntities = entities.filter(e => e.type === 'date');
    if (dateEntities.length > 0) {
      // Retourner la première date trouvée
      return dateEntities[0].text;
    }
    return null;
  }

  private inferSelectField(field: Record<string, unknown>, structuredData: StructuredLegalData, context: Record<string, unknown>): string | null {
    if (!field.options) return null;

    // Chercher une correspondance dans les options
    const options = field.options.map((opt: Record<string, unknown>) => typeof opt === 'string' ? opt : opt.value);
    
    // Correspondance exacte avec le type de document
    if (options.includes(structuredData.type)) {
      return structuredData.type;
    }

    // Correspondance avec le domaine juridique
    const domain = context.juridicalDomain.find((d: string) => options.includes(d));
    if (domain) return domain;

    // Correspondance avec l'institution
    const institution = options.find((opt: string) => structuredData.institution.includes(opt));
    if (institution) return institution;

    return null;
  }

  private inferNumberField(field: Record<string, unknown>, content: string): number | null {
    // Extraire des nombres selon le contexte du champ
    const fieldName = field.name.toLowerCase();
    
    if (fieldName.includes('article')) {
      const articleMatch = content.match(/(\d+)\s+articles?/i);
      return articleMatch ? parseInt(articleMatch[1]) : null;
    }
    
    if (fieldName.includes('page')) {
      const pageMatch = content.match(/(\d+)\s+pages?/i);
      return pageMatch ? parseInt(pageMatch[1]) : null;
    }

    return null;
  }

  private inferTextField(field: Record<string, unknown>, doc: Record<string, unknown>, entities: LegalEntity[]): string | null {
    const fieldName = field.name.toLowerCase();
    
    if (fieldName.includes('summary') || fieldName.includes('resume')) {
      // Générer un résumé automatique
      const sentences = doc.sentences().out('array');
      return sentences.slice(0, 2).join(' ');
    }
    
    if (fieldName.includes('keyword') || fieldName.includes('tag')) {
      // Extraire des mots-clés
      const keywords = doc.nouns().out('array').slice(0, 5);
      return keywords.join(', ');
    }

    return null;
  }

  private applySpecializedMappings(formData: Record<string, any>, structuredData: StructuredLegalData, context: Record<string, unknown>): void {
    // Mappings spécialisés selon le type de document
    switch (structuredData.type.toLowerCase()) {
      case 'loi':
        this.applyLawMappings(formData, structuredData, context);
        break;
      case 'décret exécutif':
        this.applyDecreeMappings(formData, structuredData, context);
        break;
      case 'arrêté ministériel':
        this.applyMinisterialOrderMappings(formData, structuredData, context);
        break;
    }
  }

  private applyLawMappings(formData: Record<string, any>, structuredData: StructuredLegalData, context: Record<string, unknown>): void {
    // Mappings spécifiques aux lois
    if (!formData.legal_nature) {
      formData.legal_nature = context.legalHierarchy <= 3 ? 'Loi fondamentale' : 'Loi ordinaire';
    }
    
    if (!formData.parliamentary_procedure) {
      formData.parliamentary_procedure = 'Procédure législative ordinaire';
    }
  }

  private applyDecreeMappings(formData: Record<string, any>, structuredData: StructuredLegalData, context: Record<string, unknown>): void {
    // Mappings spécifiques aux décrets
    if (!formData.execution_level) {
      formData.execution_level = 'National';
    }
    
    if (!formData.regulatory_power) {
      formData.regulatory_power = 'Pouvoir réglementaire';
    }
  }

  private applyMinisterialOrderMappings(formData: Record<string, any>, structuredData: StructuredLegalData, context: Record<string, unknown>): void {
    // Mappings spécifiques aux arrêtés ministériels
    if (!formData.ministerial_scope) {
      formData.ministerial_scope = context.geographicScope === 'national' ? 'National' : 'Sectoriel';
    }
  }

  /**
   * Générer des suggestions intelligentes
   */
  private async generateFieldSuggestions(extractedData: ExtractedData, formTemplate: Record<string, unknown>, entities: LegalEntity[]): Promise<FieldSuggestion[]> {
    const suggestions: FieldSuggestion[] = [];

    if (formTemplate.fields) {
      for (const field of formTemplate.fields) {
        const suggestion = await this.generateFieldSuggestion(field, extractedData, entities);
        if (suggestion) {
          suggestions.push(suggestion);
        }
      }
    }

    return suggestions;
  }

  private async generateFieldSuggestion(field: Record<string, unknown>, extractedData: ExtractedData, entities: LegalEntity[]): Promise<FieldSuggestion | null> {
    const fieldName = field.name;
    const relevantEntities = this.findRelevantEntities(field, entities);
    
    if (relevantEntities.length === 0) return null;

    const primaryEntity = relevantEntities[0];
    const alternatives = relevantEntities.slice(1, 4).map(e => e.text);

    return {
      fieldName,
      suggestedValue: primaryEntity.text,
      confidence: primaryEntity.confidence,
      source: 'ai',
      alternatives
    };
  }

  private findRelevantEntities(field: Record<string, unknown>, entities: LegalEntity[]): LegalEntity[] {
    const fieldName = field.name.toLowerCase();
    const fieldType = field.type;

    // Filtrer les entités pertinentes selon le champ
    let relevantEntities: LegalEntity[] = [];

    if (fieldName.includes('date')) {
      relevantEntities = entities.filter(e => e.type === 'date');
    } else if (fieldName.includes('institution') || fieldName.includes('organisme')) {
      relevantEntities = entities.filter(e => e.type === 'institution');
    } else if (fieldName.includes('wilaya') || fieldName.includes('lieu')) {
      relevantEntities = entities.filter(e => e.type === 'location');
    } else if (fieldName.includes('reference')) {
      relevantEntities = entities.filter(e => e.type === 'reference');
    } else if (fieldName.includes('person') || fieldName.includes('signataire')) {
      relevantEntities = entities.filter(e => e.type === 'person');
    }

    return relevantEntities.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Valider les données mappées
   */
  private async validateMappedData(formData: Record<string, any>, formTemplate: Record<string, unknown>): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    if (formTemplate.fields) {
      for (const field of formTemplate.fields) {
        const fieldErrors = this.validateField(field, formData[field.name]);
        errors.push(...fieldErrors);
      }
    }

    return errors;
  }

  private validateField(field: Record<string, unknown>, value: Record<string, unknown>): ValidationError[] {
    const errors: ValidationError[] = [];
    const fieldName = field.name;

    // Validation de champ requis
    if (field.required && (value === null || value === undefined || value === '')) {
      errors.push({
        fieldName,
        message: `Le champ ${fieldName} est requis`,
        severity: 'error',
        suggestion: 'Vérifiez que le document contient cette information'
      });
    }

    // Validation de type
    if (value !== null && value !== undefined) {
      const typeError = this.validateFieldType(field, value);
      if (typeError) {
        errors.push({
          fieldName,
          message: typeError,
          severity: 'warning'
        });
      }
    }

    // Validation spécifique aux champs algériens
    const contextError = this.validateAlgerianContext(field, value);
    if (contextError) {
      errors.push({
        fieldName,
        message: contextError,
        severity: 'info'
      });
    }

    return errors;
  }

  private validateFieldType(field: Record<string, unknown>, value: Record<string, unknown>): string | null {
    switch (field.type) {
      case 'number':
        if (isNaN(Number(value))) {
          return `La valeur "${value}" n'est pas un nombre valide`;
        }
        break;
      
      case 'date':
        if (typeof value === 'string' && !this.isValidDate(value)) {
          return `La date "${value}" n'est pas dans un format valide`;
        }
        break;
      
      case 'email':
        if (typeof value === 'string' && !this.isValidEmail(value)) {
          return `L'email "${value}" n'est pas valide`;
        }
        break;
    }

    return null;
  }

  private validateAlgerianContext(field: Record<string, unknown>, value: Record<string, unknown>): string | null {
    const fieldName = field.name.toLowerCase();

    if (fieldName.includes('wilaya') && typeof value === 'string') {
      if (!this.algerianWilayas.includes(value)) {
        return `"${value}" ne correspond pas à une wilaya algérienne connue`;
      }
    }

    if (fieldName.includes('institution') && typeof value === 'string') {
      const isKnownInstitution = this.algerianInstitutions.some(inst => 
        value.toLowerCase().includes(inst.toLowerCase())
      );
      if (!isKnownInstitution) {
        return `"${value}" ne correspond pas à une institution algérienne connue`;
      }
    }

    return null;
  }

  private isValidDate(dateString: string): boolean {
    // Vérifier les formats de date algériens (hégirien et grégorien)
    const hijriPattern = /\d+\s+(Moharram|Safar|Rabia\s+El\s+Aouel|Rabia\s+Ethani|Joumada\s+El\s+Aouela|Joumada\s+Ethania|Rajab|Chaabane|Ramadhan|Chaoual|Dou\s+El\s+Kaada|Dou\s+El\s+Hidja)\s+\d{4}/;
    const gregorianPattern = /\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4}/;
    
    return hijriPattern.test(dateString) || gregorianPattern.test(dateString) || !isNaN(Date.parse(dateString));
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Calculer la confiance globale du mapping
   */
  private calculateMappingConfidence(formData: Record<string, any>, suggestions: FieldSuggestion[], validationErrors: ValidationError[], ocrConfidence: number): number {
    let confidence = ocrConfidence * 0.4; // 40% basé sur la confiance OCR

    // Ajouter la confiance basée sur le nombre de champs mappés
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(v => v !== null && v !== undefined && v !== '').length;
    
    if (totalFields > 0) {
      confidence += (filledFields / totalFields) * 30; // 30% basé sur le taux de remplissage
    }

    // Ajouter la confiance basée sur les suggestions
    const avgSuggestionConfidence = suggestions.length > 0 
      ? suggestions.reduce((sum, s) => sum + s.confidence, 0) / suggestions.length 
      : 0;
    confidence += avgSuggestionConfidence * 0.2; // 20% basé sur la confiance des suggestions

    // Pénaliser pour les erreurs de validation
    const errorPenalty = validationErrors.length * 2;
    confidence = Math.max(0, confidence - errorPenalty);

    // Bonus pour les documents juridiques algériens bien structurés
    const hasAlgerianElements = this.hasAlgerianLegalElements(formData);
    if (hasAlgerianElements) {
      confidence += 10;
    }

    return Math.min(100, Math.max(0, confidence));
  }

  private hasAlgerianLegalElements(formData: Record<string, any>): boolean {
    const text = JSON.stringify(formData).toLowerCase();
    
    const algerianIndicators = [
      'algérie', 'algérienne', 'république algérienne',
      'wilaya', 'wali', 'apc',
      'moharram', 'safar', 'rabia', 'joumada', 'rajab', 'chaabane', 'ramadhan', 'chaoual',
      'président de la république', 'premier ministre'
    ];

    return algerianIndicators.some(indicator => text.includes(indicator));
  }

  /**
   * Nettoyer les ressources
   */
  async cleanup(): Promise<void> {
    // Nettoyer les ressources si nécessaire
  }
}

// Instance singleton
export const algerianAIMappingService = new AlgerianLegalAIMappingService();
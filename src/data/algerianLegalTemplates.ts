/**
 * Templates de données juridiques algériennes
 * Basés sur la nomenclature officielle pour les formulaires OCR
 */

export interface AlgerianLegalTemplate {
  id: string;
  name: string;
  type: string;
  code: string;
  description: string;
  formStructure: FormTemplate;
  regexPatterns: RegexPattern[];
  institutionPatterns: string[];
  validationRules: ValidationRule[];
}

export interface FormTemplate {
  sections: FormSection[];
  metadata: {
    version: string;
    lastUpdated: string;
    applicableTypes: string[];
  };
}

export interface FormSection {
  id: string;
  title: string;
  required: boolean;
  fields: FormField[];
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'checkbox';
  required: boolean;
  ocrMappingRules: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  options?: Array<{ value: string; label: string }>;
}

export interface RegexPattern {
  name: string;
  pattern: RegExp;
  description: string;
  extractionGroup: number;
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
}

// Templates pour les différents types de documents juridiques algériens
export const algerianLegalTemplates: AlgerianLegalTemplate[] = [
  {
    id: 'decret_executif',
    name: 'Décret Exécutif',
    type: 'décret exécutif',
    code: 'DEC',
    description: 'Acte réglementaire du Premier ministre',
    formStructure: {
      sections: [
        {
          id: 'identification',
          title: 'Identification du Document',
          required: true,
          fields: [
            {
              id: 'numero_decret',
              name: 'numero_decret',
              label: 'Numéro du Décret',
              type: 'text',
              required: true,
              ocrMappingRules: [
                'decret\\s+(?:executif|exécutif)\\s+n[°]\\s*(\\d+[-/]\\d+)',
                'n[°]\\s*(\\d+[-/]\\d+).*(?:decret|décret)'
              ],
              validation: {
                pattern: '^\\d{2}-\\d{3}$',
                minLength: 6,
                maxLength: 10
              }
            },
            {
              id: 'date_hijri',
              name: 'date_hijri',
              label: 'Date Hijri',
              type: 'text',
              required: true,
              ocrMappingRules: [
                '(\\d{1,2})\\s+(moharram|safar|rabi[\\\'\\s]?\\s*(?:el\\s+)?(?:aouel|ethani)|joumada\\s+(?:el\\s+)?(?:oula|ethania)|rajab|cha[\\\'\\s]?bane?|ramadhan|chaoual|dhou\\s+el\\s+(?:kaada|hidja))\\s+(\\d{3,4})'
              ]
            },
            {
              id: 'date_gregorienne',
              name: 'date_gregorienne',
              label: 'Date Grégorienne',
              type: 'date',
              required: true,
              ocrMappingRules: [
                'correspondant\\s+(?:au\\s+)?(\\d{1,2})\\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\\s+(\\d{4})',
                '(\\d{1,2})\\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\\s+(\\d{4})'
              ]
            },
            {
              id: 'titre',
              name: 'titre',
              label: 'Titre/Objet',
              type: 'textarea',
              required: true,
              ocrMappingRules: [
                'portant\\s+([^.]+)',
                'relatif\\s+à\\s+([^.]+)',
                'fixant\\s+([^.]+)'
              ]
            }
          ]
        },
        {
          id: 'autorite_emettrice',
          title: 'Autorité Émettrice',
          required: true,
          fields: [
            {
              id: 'premier_ministre',
              name: 'premier_ministre',
              label: 'Premier ministre',
              type: 'checkbox',
              required: false,
              ocrMappingRules: ['premier\\s+ministre']
            },
            {
              id: 'ministere_concerne',
              name: 'ministere_concerne',
              label: 'Ministère concerné',
              type: 'select',
              required: false,
              ocrMappingRules: [
                'ministère\\s+(?:de\\s+(?:la\\s+|l\'|du\\s+|des\\s+)?)?([^,.;]+)',
                'minister\\s+(?:de\\s+(?:la\\s+|l\'|du\\s+|des\\s+)?)?([^,.;]+)'
              ],
              options: [
                { value: 'msp', label: 'Ministère de la Santé et de la Population' },
                { value: 'men', label: 'Ministère de l\'Éducation Nationale' },
                { value: 'mjs', label: 'Ministère de la Jeunesse et des Sports' },
                { value: 'mic', label: 'Ministère de l\'Industrie et du Commerce' },
                { value: 'autre', label: 'Autre ministère' }
              ]
            }
          ]
        },
        {
          id: 'contenu_juridique',
          title: 'Contenu Juridique',
          required: true,
          fields: [
            {
              id: 'articles',
              name: 'articles',
              label: 'Articles',
              type: 'textarea',
              required: true,
              ocrMappingRules: [
                'Article\\s+(\\d+(?:\\s+bis|ter)?)\\s*\\.?\\s*[—-]?\\s*([^]*?)(?=Article\\s+\\d+|$)'
              ]
            },
            {
              id: 'references_vu',
              name: 'references_vu',
              label: 'Références "Vu"',
              type: 'textarea',
              required: false,
              ocrMappingRules: [
                'vu\\s+la\\s+(loi|ordonnance|décret|arrêté)\\s+n[°]\\s*([\\d\\-\\/]+)[^;]*',
                'vu\\s+le\\s+(code|décret\\s+législatif)\\s+n[°]\\s*([\\d\\-\\/]+)[^;]*'
              ]
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastUpdated: '2025-01-15',
        applicableTypes: ['décret exécutif']
      }
    },
    regexPatterns: [
      {
        name: 'numero_decret',
        pattern: /décret\s+(?:executif|exécutif)\s+n[°]\s*(\d+[-/]\d+)/gi,
        description: 'Numéro du décret exécutif',
        extractionGroup: 1
      },
      {
        name: 'date_complete',
        pattern: /(\d{1,2})\s+(moharram|safar|rabi['\s]?\s*(?:el\s+)?(?:aouel|ethani)|joumada\s+(?:el\s+)?(?:oula|ethania)|rajab|cha['\s]?bane?|ramadhan|chaoual|dhou\s+el\s+(?:kaada|hidja))\s+(\d{3,4})\s+correspondant\s+(?:au\s+)?(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/gi,
        description: 'Date complète hijri et grégorienne',
        extractionGroup: 0
      }
    ],
    institutionPatterns: [
      'premier ministre',
      'ministère de la santé et de la population',
      'ministère de l\'éducation nationale'
    ],
    validationRules: [
      {
        field: 'numero_decret',
        rule: 'required|regex:^\\d{2}-\\d{3}$',
        message: 'Le numéro de décret doit être au format XX-XXX'
      },
      {
        field: 'date_gregorienne',
        rule: 'required|date',
        message: 'La date grégorienne est requise'
      }
    ]
  },

  {
    id: 'arrete_ministeriel',
    name: 'Arrêté Ministériel',
    type: 'arrêté ministériel',
    code: 'ARM',
    description: 'Décision d\'un ministre',
    formStructure: {
      sections: [
        {
          id: 'identification',
          title: 'Identification du Document',
          required: true,
          fields: [
            {
              id: 'numero_arrete',
              name: 'numero_arrete',
              label: 'Numéro de l\'Arrêté',
              type: 'text',
              required: true,
              ocrMappingRules: [
                'arrêté\\s+(?:ministériel)?\\s*n[°]\\s*(\\d+)',
                'n[°]\\s*(\\d+).*arrêté'
              ],
              validation: {
                pattern: '^\\d{1,6}$',
                minLength: 1,
                maxLength: 6
              }
            },
            {
              id: 'date_signature',
              name: 'date_signature',
              label: 'Date de Signature',
              type: 'date',
              required: true,
              ocrMappingRules: [
                '(\\d{1,2})\\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\\s+(\\d{4})'
              ]
            },
            {
              id: 'objet',
              name: 'objet',
              label: 'Objet de l\'Arrêté',
              type: 'textarea',
              required: true,
              ocrMappingRules: [
                'portant\\s+([^.]+)',
                'relatif\\s+à\\s+([^.]+)',
                'fixant\\s+([^.]+)',
                'concernant\\s+([^.]+)'
              ]
            }
          ]
        },
        {
          id: 'ministre_signataire',
          title: 'Ministre Signataire',
          required: true,
          fields: [
            {
              id: 'nom_ministre',
              name: 'nom_ministre',
              label: 'Nom du Ministre',
              type: 'text',
              required: true,
              ocrMappingRules: [
                'le\\s+ministre\\s+([^,\\.]+)',
                'ministre\\s+de\\s+([^,\\.]+)'
              ]
            },
            {
              id: 'fonction_ministre',
              name: 'fonction_ministre',
              label: 'Fonction/Portefeuille',
              type: 'select',
              required: true,
              ocrMappingRules: [
                'ministre\\s+de\\s+([^,\\.]+)'
              ],
              options: [
                { value: 'sante', label: 'Santé et Population' },
                { value: 'education', label: 'Éducation Nationale' },
                { value: 'justice', label: 'Justice' },
                { value: 'interieur', label: 'Intérieur et Collectivités Locales' },
                { value: 'finance', label: 'Finances' },
                { value: 'autre', label: 'Autre' }
              ]
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastUpdated: '2025-01-15',
        applicableTypes: ['arrêté ministériel', 'arrêté']
      }
    },
    regexPatterns: [
      {
        name: 'numero_arrete',
        pattern: /arrêté\s+(?:ministériel)?\s*n[°]\s*(\d+)/gi,
        description: 'Numéro de l\'arrêté ministériel',
        extractionGroup: 1
      }
    ],
    institutionPatterns: [
      'ministre de la santé',
      'ministre de l\'éducation',
      'ministre de la justice'
    ],
    validationRules: [
      {
        field: 'numero_arrete',
        rule: 'required|numeric',
        message: 'Le numéro d\'arrêté doit être numérique'
      }
    ]
  },

  {
    id: 'loi',
    name: 'Loi',
    type: 'loi',
    code: 'LOI',
    description: 'Texte voté par le Parlement',
    formStructure: {
      sections: [
        {
          id: 'identification',
          title: 'Identification de la Loi',
          required: true,
          fields: [
            {
              id: 'numero_loi',
              name: 'numero_loi',
              label: 'Numéro de la Loi',
              type: 'text',
              required: true,
              ocrMappingRules: [
                'loi\\s+n[°]\\s*(\\d+[-/]\\d+)',
                'n[°]\\s*(\\d+[-/]\\d+).*loi'
              ],
              validation: {
                pattern: '^\\d{2}-\\d{2}$',
                minLength: 5,
                maxLength: 10
              }
            },
            {
              id: 'titre_loi',
              name: 'titre_loi',
              label: 'Titre de la Loi',
              type: 'textarea',
              required: true,
              ocrMappingRules: [
                'portant\\s+([^.]+)',
                'relative\\s+à\\s+([^.]+)',
                'modifiant\\s+et\\s+complétant\\s+([^.]+)'
              ]
            },
            {
              id: 'date_promulgation',
              name: 'date_promulgation',
              label: 'Date de Promulgation',
              type: 'date',
              required: true,
              ocrMappingRules: [
                'promulguée\\s+le\\s+(\\d{1,2})\\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\\s+(\\d{4})'
              ]
            }
          ]
        },
        {
          id: 'contenu_legislatif',
          title: 'Contenu Législatif',
          required: true,
          fields: [
            {
              id: 'chapitres',
              name: 'chapitres',
              label: 'Chapitres',
              type: 'textarea',
              required: false,
              ocrMappingRules: [
                'chapitre\\s+(\\w+)\\s*[:-]\\s*([^]+?)(?=chapitre|titre|$)'
              ]
            },
            {
              id: 'articles_loi',
              name: 'articles_loi',
              label: 'Articles de la Loi',
              type: 'textarea',
              required: true,
              ocrMappingRules: [
                'Article\\s+(\\d+(?:\\s+bis|ter)?)\\s*\\.?\\s*[—-]?\\s*([^]*?)(?=Article\\s+\\d+|$)'
              ]
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastUpdated: '2025-01-15',
        applicableTypes: ['loi']
      }
    },
    regexPatterns: [
      {
        name: 'numero_loi',
        pattern: /loi\s+n[°]\s*(\d+[-/]\d+)/gi,
        description: 'Numéro de la loi',
        extractionGroup: 1
      }
    ],
    institutionPatterns: [
      'assemblée populaire nationale',
      'conseil de la nation',
      'parlement'
    ],
    validationRules: [
      {
        field: 'numero_loi',
        rule: 'required|regex:^\\d{2}-\\d{2}$',
        message: 'Le numéro de loi doit être au format XX-XX'
      }
    ]
  },

  {
    id: 'ordonnance',
    name: 'Ordonnance',
    type: 'ordonnance',
    code: 'ORD',
    description: 'Acte du Président de la République',
    formStructure: {
      sections: [
        {
          id: 'identification',
          title: 'Identification de l\'Ordonnance',
          required: true,
          fields: [
            {
              id: 'numero_ordonnance',
              name: 'numero_ordonnance',
              label: 'Numéro de l\'Ordonnance',
              type: 'text',
              required: true,
              ocrMappingRules: [
                'ordonnance\\s+n[°]\\s*(\\d+[-/]\\d+)',
                'n[°]\\s*(\\d+[-/]\\d+).*ordonnance'
              ]
            },
            {
              id: 'date_ordonnance',
              name: 'date_ordonnance',
              label: 'Date de l\'Ordonnance',
              type: 'date',
              required: true,
              ocrMappingRules: [
                '(\\d{1,2})\\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\\s+(\\d{4})'
              ]
            }
          ]
        },
        {
          id: 'presidence',
          title: 'Présidence de la République',
          required: true,
          fields: [
            {
              id: 'president_nom',
              name: 'president_nom',
              label: 'Nom du Président',
              type: 'text',
              required: false,
              ocrMappingRules: [
                'président\\s+de\\s+la\\s+république\\s*[,:]?\\s*([^,\\.]+)'
              ]
            }
          ]
        }
      ],
      metadata: {
        version: '1.0',
        lastUpdated: '2025-01-15',
        applicableTypes: ['ordonnance']
      }
    },
    regexPatterns: [
      {
        name: 'numero_ordonnance',
        pattern: /ordonnance\s+n[°]\s*(\d+[-/]\d+)/gi,
        description: 'Numéro de l\'ordonnance',
        extractionGroup: 1
      }
    ],
    institutionPatterns: [
      'président de la république',
      'présidence de la république'
    ],
    validationRules: [
      {
        field: 'numero_ordonnance',
        rule: 'required',
        message: 'Le numéro d\'ordonnance est requis'
      }
    ]
  }
];

// Fonction utilitaire pour récupérer un template par type
export function getTemplateByType(documentType: string): AlgerianLegalTemplate | undefined {
  return algerianLegalTemplates.find(template => 
    template.type.toLowerCase() === documentType.toLowerCase() ||
    template.name.toLowerCase().includes(documentType.toLowerCase())
  );
}

// Fonction pour récupérer tous les patterns regex d'un type
export function getRegexPatternsByType(documentType: string): RegexPattern[] {
  const template = getTemplateByType(documentType);
  return template ? template.regexPatterns : [];
}

// Fonction pour récupérer la structure de formulaire d'un type
export function getFormStructureByType(documentType: string): FormTemplate | undefined {
  const template = getTemplateByType(documentType);
  return template ? template.formStructure : undefined;
}

// Institutions algériennes courantes
export const algerianInstitutions = [
  'Présidence de la République',
  'Premier ministre',
  'Assemblée Populaire Nationale',
  'Conseil de la Nation',
  'Conseil Constitutionnel',
  'Ministère de la Santé et de la Population',
  'Ministère de l\'Éducation Nationale',
  'Ministère de la Justice',
  'Ministère de l\'Intérieur et des Collectivités Locales',
  'Ministère des Finances',
  'Ministère de l\'Industrie et du Commerce',
  'Ministère de la Jeunesse et des Sports',
  'Ministère des Affaires Étrangères',
  'Ministère de la Défense Nationale',
  'Ministère des Transports',
  'Ministère de l\'Énergie',
  'Ministère de l\'Agriculture et du Développement Rural',
  'Ministère de l\'Habitat et de l\'Urbanisme',
  'Ministère du Travail et de la Sécurité Sociale',
  'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique'
];

// Mois hijri en français
export const hijriMonths = [
  'moharram', 'safar', 'rabi el aouel', 'rabi ethani',
  'joumada el oula', 'joumada ethania', 'rajab', 'chabane',
  'ramadhan', 'chaoual', 'dhou el kaada', 'dhou el hidja'
];

// Export par défaut
export default algerianLegalTemplates;
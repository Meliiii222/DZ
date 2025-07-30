// Export des types principaux
export interface LegalText {
  id: string;
  title: string;
  type: LegalTextType;
  domain: string;
  institution: string;
  datePublication: Date;
  dateModification?: Date;
  status: 'En vigueur' | 'Abrogé' | 'En cours' | 'Suspendu';
  description: string;
  content: string;
  articles?: number;
  modifications?: number;
  version?: string;
}

export interface AdministrativeProcedure {
  id: string;
  title: string;
  category: string;
  institution: string;
  description: string;
  steps: ProcedureStep[];
  documents: string[];
  requiredDocuments: string[];
  duration: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  successRate: number;
  status: 'Validée' | 'En révision' | 'Obsolète';
  lastUpdate: Date;
  forms: ProcedureForm[];
  cost: string;
  completedCount: number;
  rating: number;
  tags?: string[];
}

export interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  required: boolean;
  documents?: string[];
}

export interface ProcedureForm {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  format: string;
}

// Export des énumérations et constantes
export const LEGAL_TEXT_TYPES = [
  'Constitution',
  'Loi',
  'Ordonnance',
  'Décret exécutif',
  'Décret présidentiel',
  'Arrêté ministériel',
  'Arrêté interministériel',
  'Décision',
  'Instruction',
  'Circulaire'
] as const;

export type LegalTextType = typeof LEGAL_TEXT_TYPES[number];

export const SECTORS = [
  'Justice',
  'Intérieur et Collectivités locales',
  'Affaires étrangères',
  'Défense nationale',
  'Finances',
  'Énergie et Mines',
  'Industrie',
  'Agriculture et Développement rural',
  'Commerce et Promotion des exportations',
  'Transports',
  'Travaux publics et Transports',
  'Habitat, Urbanisme et Ville',
  'Santé',
  'Population et Réforme hospitalière',
  'Éducation nationale',
  'Enseignement supérieur et Recherche scientifique',
  'Formation et Enseignement professionnels',
  'Jeunesse et Sports',
  'Culture et Arts',
  'Communication',
  'Affaires religieuses et Wakfs',
  'Solidarité nationale, Famille et Condition de la femme',
  'Travail, Emploi et Sécurité sociale',
  'Environnement et Énergies renouvelables',
  'Ressources en eau',
  'Tourisme et Artisanat',
  'Pêche et Productions halieutiques',
  'Relations avec le Parlement'
] as const;

export type Sector = typeof SECTORS[number];

export const INSTITUTIONS = [
  // Institutions constitutionnelles
  'Présidence de la République',
  'Parlement - Assemblée populaire nationale (APN)',
  'Parlement - Conseil de la Nation',
  'Gouvernement - Premier ministère',
  'Cour constitutionnelle',
  'Cour suprême',
  'Conseil d\'État',
  'Cour des comptes',
  'Conseil supérieur de la magistrature',
  
  // Ministères
  'Ministère de la Justice',
  'Ministère de l\'Intérieur et des Collectivités locales',
  'Ministère des Affaires étrangères',
  'Ministère de la Défense nationale',
  'Ministère des Finances',
  'Ministère de l\'Énergie et des Mines',
  'Ministère de l\'Industrie',
  'Ministère de l\'Agriculture et du Développement rural',
  'Ministère du Commerce et de la Promotion des exportations',
  'Ministère des Transports',
  'Ministère des Travaux publics et des Transports',
  'Ministère de l\'Habitat, de l\'Urbanisme et de la Ville',
  'Ministère de la Santé',
  'Ministère de la Population et de la Réforme hospitalière',
  'Ministère de l\'Éducation nationale',
  'Ministère de l\'Enseignement supérieur et de la Recherche scientifique',
  'Ministère de la Formation et de l\'Enseignement professionnels',
  'Ministère de la Jeunesse et des Sports',
  'Ministère de la Culture et des Arts',
  'Ministère de la Communication',
  'Ministère des Affaires religieuses et des Wakfs',
  'Ministère de la Solidarité nationale, de la Famille et de la Condition de la femme',
  'Ministère du Travail, de l\'Emploi et de la Sécurité sociale',
  'Ministère de l\'Environnement et des Énergies renouvelables',
  'Ministère des Ressources en eau',
  'Ministère du Tourisme et de l\'Artisanat',
  'Ministère de la Pêche et des Productions halieutiques',
  'Ministère des Relations avec le Parlement',
  
  // Organismes spécialisés
  'ANDI - Agence nationale de développement de l\'investissement',
  'CNRC - Centre national du registre de commerce',
  'CNAS - Caisse nationale d\'assurances sociales',
  'CNR - Caisse nationale de retraite',
  'CACOBATPH - Caisse nationale de congés payés et du chômage-intempéries',
  'ONDA - Office national des droits d\'auteur',
  'INAPI - Institut national algérien de propriété industrielle',
  'ONS - Office national des statistiques',
  'Banque d\'Algérie',
  'Conseil de la concurrence',
  'Commission bancaire',
  'Commission de supervision des assurances',
  'Autorité de régulation de la poste et des télécommunications',
  'Commission de régulation de l\'électricité et du gaz'
] as const;

export type Institution = typeof INSTITUTIONS[number];

export const SECTORS_WITH_SUBSECTORS = {
  'Justice': [
    'Droit pénal',
    'Droit civil',
    'Droit commercial',
    'Droit administratif',
    'Organisation judiciaire',
    'Procédures',
    'Exécution des décisions de justice'
  ],
  'Finances': [
    'Budget de l\'État',
    'Fiscalité directe',
    'Fiscalité indirecte',
    'Douanes',
    'Trésor public',
    'Comptabilité publique',
    'Marchés publics'
  ],
  'Commerce et Promotion des exportations': [
    'Commerce intérieur',
    'Commerce extérieur',
    'Concurrence',
    'Protection du consommateur',
    'Propriété industrielle',
    'Promotion des exportations'
  ],
  'Travail, Emploi et Sécurité sociale': [
    'Relations de travail',
    'Hygiène et sécurité',
    'Emploi',
    'Formation professionnelle',
    'Sécurité sociale',
    'Retraite'
  ],
  'Habitat, Urbanisme et Ville': [
    'Urbanisme',
    'Construction',
    'Habitat social',
    'Promotion immobilière',
    'Aménagement du territoire'
  ]
} as const;

export type SectorWithSubsectors = keyof typeof SECTORS_WITH_SUBSECTORS;

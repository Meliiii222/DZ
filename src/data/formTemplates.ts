export interface FormTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  fields: FormFieldTemplate[];
  description: string;
  createdAt: string;
  isSystem: boolean;
}

export interface FormFieldTemplate {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'file' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export const FORM_TEMPLATES: FormTemplate[] = [
  // Constitution
  {
    id: 'constitution',
    name: 'Constitution',
    type: 'Texte Constitutionnel',
    category: 'Textes Juridiques',
    description: 'Formulaire pour les textes constitutionnels avec préambule, titres et articles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'en_tete', label: 'En-tête', type: 'textarea', required: true },
      { name: 'preambule', label: 'Préambule (plusieurs paragraphes)', type: 'textarea', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'chapitre', label: 'Chapitre', type: 'text', required: false },
      { name: 'numero_article', label: 'N° Article', type: 'text', required: true },
      { name: 'serments', label: 'Serments', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Accord International
  {
    id: 'accord_international',
    name: 'Accord International',
    type: 'Accord',
    category: 'Relations Internationales',
    description: 'Formulaire pour les accords internationaux bilatéraux ou multilatéraux',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'type_accord', label: 'Type de l\'accord', type: 'select', required: true, 
        options: ['Accord International', 'Convention Internationale'] },
      { name: 'types_accord', label: 'Types l\'accord', type: 'select', required: true, 
        options: ['Bilatérale', 'Multilatérale'] },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'parties', label: 'Parties (parties/Pays)', type: 'textarea', required: true },
      { name: 'ref_recueil_traite', label: 'Réf Recueil de traité', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Convention Internationale
  {
    id: 'convention_internationale',
    name: 'Convention Internationale',
    type: 'Convention',
    category: 'Relations Internationales',
    description: 'Formulaire pour les conventions internationales',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'type_accord', label: 'Type de l\'accord', type: 'select', required: true, 
        options: ['Accord International', 'Convention Internationale'] },
      { name: 'types_accord', label: 'Types l\'accord', type: 'select', required: true, 
        options: ['Bilatérale', 'Multilatérale'] },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'parties', label: 'Parties (parties/Pays)', type: 'textarea', required: true },
      { name: 'ref_recueil_traite', label: 'Réf Recueil de traité', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Code
  {
    id: 'code',
    name: 'Code',
    type: 'Code Juridique',
    category: 'Textes Juridiques',
    description: 'Formulaire pour les codes juridiques avec références et articles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_texte', label: 'Type de Texte', type: 'select', required: true,
        options: ['Commerce', 'Civil', 'Procédure Administratif', 'Pénal'] },
      { name: 'type_loi', label: 'Type de Loi', type: 'select', required: true,
        options: ['Constitutionnelle', 'Organique', 'Loi'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'select', required: true, options: [] },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Code', 'Loi Organique', 'Loi'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'chapitre', label: 'Chapitre', type: 'text', required: false },
      { name: 'numero_article', label: 'N° Article', type: 'text', required: false },
      { name: 'section', label: 'Section', type: 'text', required: false },
      { name: 'numero_article_section', label: 'N° de l\'article (Section)', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Loi Organique
  {
    id: 'loi_organique',
    name: 'Loi Organique',
    type: 'Loi',
    category: 'Textes Juridiques',
    description: 'Formulaire pour les lois organiques avec structure hiérarchique',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_texte', label: 'Type de Texte', type: 'select', required: true,
        options: ['Commerce', 'Civil', 'Procédure Administratif', 'Pénal'] },
      { name: 'type_loi', label: 'Type de Loi', type: 'select', required: true,
        options: ['Constitutionnelle', 'Organique', 'Loi'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'select', required: true, options: [] },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Code', 'Loi Organique', 'Loi'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'chapitre', label: 'Chapitre', type: 'text', required: false },
      { name: 'numero_article', label: 'N° Article', type: 'text', required: false },
      { name: 'section', label: 'Section', type: 'text', required: false },
      { name: 'numero_article_section', label: 'N° de l\'article (Section)', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Loi
  {
    id: 'loi',
    name: 'Loi',
    type: 'Loi',
    category: 'Textes Juridiques',
    description: 'Formulaire pour les lois ordinaires',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_texte', label: 'Type de Texte', type: 'select', required: true,
        options: ['Commerce', 'Civil', 'Procédure Administratif', 'Pénal'] },
      { name: 'type_loi', label: 'Type de Loi', type: 'select', required: true,
        options: ['Constitutionnelle', 'Organique', 'Loi'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'select', required: true, options: [] },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Code', 'Loi Organique', 'Loi'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'chapitre', label: 'Chapitre', type: 'text', required: false },
      { name: 'numero_article', label: 'N° Article', type: 'text', required: false },
      { name: 'section', label: 'Section', type: 'text', required: false },
      { name: 'numero_article_section', label: 'N° de l\'article (Section)', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Ordonnance
  {
    id: 'ordonnance',
    name: 'Ordonnance',
    type: 'Ordonnance',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les ordonnances présidentielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_ordonnance', label: 'Date de l\'Ordonnance', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancienne_ordonnance', label: 'Référence de l\'ancienne ordonnance', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Ordonnance', 'Loi', 'Décret'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Décret Législatif
  {
    id: 'decret_legislatif',
    name: 'Décret Législatif',
    type: 'Décret',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les décrets législatifs',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Législatif', 'Présidentiel', 'Exécutif'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_decret', label: 'Date de Décret', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Ordonnance', 'Loi', 'Décret'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Décret Présidentiel
  {
    id: 'decret_presidentiel',
    name: 'Décret Présidentiel',
    type: 'Décret',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les décrets présidentiels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Législatif', 'Présidentiel', 'Exécutif'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_decret', label: 'Date de Décret', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Ordonnance', 'Loi', 'Décret'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Décret Exécutif
  {
    id: 'decret_executif',
    name: 'Décret Exécutif',
    type: 'Décret',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les décrets exécutifs',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Législatif', 'Présidentiel', 'Exécutif'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_decret', label: 'Date de Décret', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'motif', label: 'Motif', type: 'select', required: true,
        options: ['Nouveau', 'Modifier', 'Compléter', 'Abroger', 'Rectifier'] },
      { name: 'reference_ancien_decret', label: 'Référence de l\'ancien décret', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Ordonnance', 'Loi', 'Décret'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  }
];

// Je continue avec les autres formulaires dans un fichier séparé pour éviter d'avoir un fichier trop volumineux
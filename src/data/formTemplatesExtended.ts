import { FormTemplate } from './formTemplates';

export const EXTENDED_FORM_TEMPLATES: FormTemplate[] = [
  // Arrêté
  {
    id: 'arrete',
    name: 'Arrêté',
    type: 'Arrêté',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les arrêtés ministériels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Arrêté interministérielle
  {
    id: 'arrete_interministerielle',
    name: 'Arrêté interministérielle',
    type: 'Arrêté',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les arrêtés interministériels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Arrêté ministérielle
  {
    id: 'arrete_ministerielle',
    name: 'Arrêté ministérielle',
    type: 'Arrêté',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les arrêtés ministériels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Décision
  {
    id: 'decision',
    name: 'Décision',
    type: 'Décision',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les décisions administratives',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Décision interministérielle
  {
    id: 'decision_interministerielle',
    name: 'Décision interministérielle',
    type: 'Décision',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les décisions interministérielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Avis
  {
    id: 'avis',
    name: 'Avis',
    type: 'Avis',
    category: 'Communications Officielles',
    description: 'Formulaire pour les avis officiels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Proclamation
  {
    id: 'proclamation',
    name: 'Proclamation',
    type: 'Proclamation',
    category: 'Communications Officielles',
    description: 'Formulaire pour les proclamations officielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Instruction
  {
    id: 'instruction',
    name: 'Instruction',
    type: 'Instruction',
    category: 'Documents Administratifs',
    description: 'Formulaire pour les instructions administratives',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Instruction interministérielle
  {
    id: 'instruction_interministerielle',
    name: 'Instruction interministérielle',
    type: 'Instruction',
    category: 'Documents Administratifs',
    description: 'Formulaire pour les instructions interministérielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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

  // Règlements
  {
    id: 'reglements',
    name: 'Règlements',
    type: 'Règlement',
    category: 'Textes Réglementaires',
    description: 'Formulaire pour les règlements',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Arrêté', 'Arrêté interministérielle', 'Décision'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
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
  }
];
import { FormTemplate } from './formTemplates';

export const ADDITIONAL_FORM_TEMPLATES: FormTemplate[] = [
  // Circulaire
  {
    id: 'circulaire',
    name: 'Circulaire',
    type: 'Circulaire',
    category: 'Communications Administratives',
    description: 'Formulaire pour les circulaires administratives',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Circulaire', 'Circulaire interministérielle'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_circulaire', label: 'Date de Circulaire', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'reference_relative', label: 'Référence relative', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Circulaire', 'Circulaire interministérielle'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Circulaire interministérielle
  {
    id: 'circulaire_interministerielle',
    name: 'Circulaire interministérielle',
    type: 'Circulaire',
    category: 'Communications Administratives',
    description: 'Formulaire pour les circulaires interministérielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'type_decret', label: 'Type de Décret', type: 'select', required: true,
        options: ['Circulaire', 'Circulaire interministérielle'] },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_circulaire', label: 'Date de Circulaire', type: 'date', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true, options: [] },
      { name: 'reference_relative', label: 'Référence relative', type: 'text', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Circulaire', 'Circulaire interministérielle'] },
      { name: 'numero_reference', label: 'N° de la référence', type: 'text', required: false },
      { name: 'numero_article', label: 'N° de l\'article', type: 'text', required: false },
      { name: 'paragraphe', label: 'Paragraphe', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Convention
  {
    id: 'convention',
    name: 'Convention',
    type: 'Convention',
    category: 'Accords et Conventions',
    description: 'Formulaire pour les conventions nationales',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création (d\'entrée en vigueur)', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'type_convention', label: 'Type de la Convention', type: 'select', required: true, options: [] },
      { name: 'types_accord', label: 'Types l\'accord', type: 'select', required: true,
        options: ['Bilatérale', 'Multilatérale'] },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'parties', label: 'Parties (parties/Organismes)', type: 'textarea', required: true },
      { name: 'references_juridiques', label: 'Références juridiques', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'preambule', label: 'Préambule (contexte et l\'objectif)', type: 'textarea', required: false },
      { name: 'annexes', label: 'Annexes', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Note
  {
    id: 'note',
    name: 'Note',
    type: 'Note',
    category: 'Communications Administratives',
    description: 'Formulaire pour les notes administratives',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Note circulaire
  {
    id: 'note_circulaire',
    name: 'Note circulaire',
    type: 'Note',
    category: 'Communications Administratives',
    description: 'Formulaire pour les notes circulaires',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Notification
  {
    id: 'notification',
    name: 'Notification',
    type: 'Notification',
    category: 'Communications Administratives',
    description: 'Formulaire pour les notifications officielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Communiqué
  {
    id: 'communique',
    name: 'Communiqué',
    type: 'Communiqué',
    category: 'Communications Officielles',
    description: 'Formulaire pour les communiqués officiels',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Correspondance
  {
    id: 'correspondance',
    name: 'Correspondance',
    type: 'Correspondance',
    category: 'Communications Administratives',
    description: 'Formulaire pour les correspondances officielles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'destinataire', label: 'Destinataire', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Délibération
  {
    id: 'deliberation',
    name: 'Délibération',
    type: 'Délibération',
    category: 'Décisions Collégiales',
    description: 'Formulaire pour les délibérations institutionnelles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_deliberation', label: 'Date de la délibération/résolution', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'ref_cadre_application', label: 'Réf cadre d\'application', type: 'text', required: false },
      { name: 'conclusion', label: 'Conclusion (Uniquement pour Délibération)', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Résolutions
  {
    id: 'resolutions',
    name: 'Résolutions',
    type: 'Résolution',
    category: 'Décisions Collégiales',
    description: 'Formulaire pour les résolutions institutionnelles',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_resolution', label: 'Date de la délibération/résolution', type: 'date', required: true },
      { name: 'nom_institution', label: 'Nom de l\'institution', type: 'text', required: true },
      { name: 'ref_cadre_application', label: 'Réf cadre d\'application', type: 'text', required: false },
      { name: 'conclusion', label: 'Conclusion (Uniquement pour Délibération)', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  }
];
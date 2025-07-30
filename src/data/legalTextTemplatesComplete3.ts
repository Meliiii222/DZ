
import { LegalTextTemplate } from './legalTextTemplates';

export const COMPLETE_LEGAL_TEXT_TEMPLATES_3: LegalTextTemplate[] = [
  // Arrêté
  {
    name: 'Arrêté',
    type: 'arrete',
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
    name: 'Arrêté interministérielle',
    type: 'arrete-interministerielle',
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
    name: 'Décision',
    type: 'decision',
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
    name: 'Instruction',
    type: 'instruction',
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
    name: 'Règlements',
    type: 'reglements',
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

  // Circulaire
  {
    name: 'Circulaire',
    type: 'circulaire',
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
    name: 'Circulaire interministérielle',
    type: 'circulaire-interministerielle',
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

  // Fonction publique (43ème template)
  {
    name: 'Fonction publique',
    type: 'fonction-publique',
    fields: [
      { name: 'numero_jurisprudence', label: 'N° de Jurisprudence', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'structure_concernee', label: 'Structure concernée', type: 'text', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  }
];

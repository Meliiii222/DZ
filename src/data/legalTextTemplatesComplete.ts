
import { LegalTextTemplate } from './legalTextTemplates';

export const COMPLETE_LEGAL_TEXT_TEMPLATES: LegalTextTemplate[] = [
  // Constitution
  {
    name: 'Constitution',
    type: 'constitution',
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'en_tete', label: 'En-tête', type: 'text', required: true },
      { name: 'preambule', label: 'Préambule (plusieurs paragraphes)', type: 'textarea', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'chapitre', label: 'Chapitre', type: 'text', required: false },
      { name: 'numero_article', label: 'N° Article', type: 'text', required: false },
      { name: 'serments', label: 'Serments', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Accord International
  {
    name: 'Accord International',
    type: 'accord-international',
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
      { name: 'parties', label: 'Parties (parties/Pays)', type: 'dynamic-list', required: true },
      { name: 'ref_recueil_traite', label: 'Réf Recueil de traité', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Convention Internationale
  {
    name: 'Convention Internationale',
    type: 'convention-internationale',
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
      { name: 'parties', label: 'Parties (parties/Pays)', type: 'dynamic-list', required: true },
      { name: 'ref_recueil_traite', label: 'Réf Recueil de traité', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Code
  {
    name: 'Code',
    type: 'code',
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
      { name: 'titre', label: 'Titre', type: 'text', required: true },
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
    name: 'Loi Organique',
    type: 'loi-organique',
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
      { name: 'titre', label: 'Titre', type: 'text', required: true },
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
    name: 'Loi',
    type: 'loi',
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
      { name: 'titre', label: 'Titre', type: 'text', required: true },
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
    name: 'Ordonnance',
    type: 'ordonnance',
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
    name: 'Décret Législatif',
    type: 'decret-legislatif',
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
    name: 'Décret Présidentiel',
    type: 'decret-presidentiel',
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
    name: 'Décret Exécutif',
    type: 'decret-executif',
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

  // Arrêté ministérielle
  {
    name: 'Arrêté ministérielle',
    type: 'arrete-ministerielle',
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
    name: 'Décision interministérielle',
    type: 'decision-interministerielle',
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
    name: 'Avis',
    type: 'avis',
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
    name: 'Proclamation',
    type: 'proclamation',
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
    name: 'Instruction interministérielle',
    type: 'instruction-interministerielle',
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

  // Convention
  {
    name: 'Convention',
    type: 'convention',
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
      { name: 'parties', label: 'Parties (parties/Organismes)', type: 'dynamic-list', required: true },
      { name: 'references_juridiques', label: 'Références juridiques', type: 'select', required: false,
        options: ['Code', 'Loi', 'Accords', 'Conventions'] },
      { name: 'preambule', label: 'Préambule (contexte et l\'objectif)', type: 'textarea', required: false },
      { name: 'annexes', label: 'Annexes', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  }
];

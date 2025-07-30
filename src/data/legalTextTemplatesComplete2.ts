import { LegalTextTemplate } from './legalTextTemplates';

export const COMPLETE_LEGAL_TEXT_TEMPLATES_2: LegalTextTemplate[] = [
  // Note
  {
    name: 'Note',
    type: 'note',
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
    name: 'Note circulaire',
    type: 'note-circulaire',
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
    name: 'Notification',
    type: 'notification',
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
    name: 'Communiqué',
    type: 'communique',
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
    name: 'Correspondance',
    type: 'correspondance',
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
    name: 'Délibération',
    type: 'deliberation',
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
    name: 'Résolutions',
    type: 'resolutions',
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
  },

  // Déclaration
  {
    name: 'Déclaration',
    type: 'declaration-officielle',
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
      { name: 'date_signature', label: 'Date de signature', type: 'date', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Bulletin d'information
  {
    name: 'Bulletin d\'information',
    type: 'bulletin-information',
    fields: [
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'sous_titre', label: 'Sous-Titre', type: 'text', required: false },
      { name: 'introduction', label: 'Introduction', type: 'textarea', required: true },
      { name: 'corps', label: 'Corps (Information détaillée)', type: 'textarea', required: true },
      { name: 'conclusion', label: 'Conclusion', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Jurisprudence
  {
    name: 'Jurisprudence',
    type: 'jurisprudence',
    fields: [
      { name: 'numero_jurisprudence', label: 'N° de Jurisprudence', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'structure_concernee', label: 'Structure concernée', type: 'text', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Cahier de charge
  {
    name: 'Cahier de charge',
    type: 'cahier-charge',
    fields: [
      { name: 'titre_document', label: 'Titre du document', type: 'text', required: true },
      { name: 'nom_projet', label: 'Nom du projet', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'parties_prenantes', label: 'Nom des parties prenantes', type: 'textarea', required: true },
      { name: 'reference_document', label: 'Référence du document', type: 'text', required: true },
      { name: 'table_matieres', label: 'Table des matières', type: 'textarea', required: true },
      { name: 'contexte_projet', label: 'Contexte du projet', type: 'textarea', required: true },
      { name: 'objectifs', label: 'Objectifs', type: 'textarea', required: true },
      { name: 'cadre_legal', label: 'Cadre légal (loi)', type: 'text', required: false },
      { name: 'identification_parties', label: 'Identification des parties', type: 'textarea', required: true },
      { name: 'coordonnees', label: 'Coordonnées', type: 'textarea', required: true },
      { name: 'mission', label: 'La mission', type: 'textarea', required: true },
      { name: 'perimetre_intervention', label: 'Périmètre d\'intervention', type: 'textarea', required: true },
      { name: 'documents_attendus', label: 'Les documents attendus', type: 'textarea', required: true },
      { name: 'exigences_techniques', label: 'Exigences techniques et méthodologique', type: 'textarea', required: true },
      { name: 'duree_calendrier', label: 'Durée et calendrier', type: 'textarea', required: true },
      { name: 'condition_financiere', label: 'Condition financière', type: 'textarea', required: true },
      { name: 'confidentialite', label: 'Confidentialité', type: 'textarea', required: false },
      { name: 'obligation_commanditaire', label: 'Obligation commanditaire', type: 'textarea', required: true },
      { name: 'obligation_prestataire', label: 'Obligation Prestataire', type: 'textarea', required: true },
      { name: 'signature_parties', label: 'Signature des parties', type: 'text', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Cahier des clauses administratives générales
  {
    name: 'Cahier des clauses administratives générales',
    type: 'ccag',
    fields: [
      { name: 'ref', label: 'Réf', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'objet', label: 'Objet (nature du marché)', type: 'select', required: true,
        options: ['Travaux', 'Marchés industriels', 'Prestations intellectuelles', 'Fournitures courantes et prestations de services', 'Techniques de l\'information et de la communication', 'Marchés de maîtrise d\'œuvre'] },
      { name: 'champ_application', label: 'Champ d\'application', type: 'textarea', required: true },
      { name: 'obligation_titulaire', label: 'Obligation titulaire', type: 'textarea', required: true },
      { name: 'modalite_paiement', label: 'Modalité de paiement', type: 'textarea', required: true },
      { name: 'delais_execution', label: 'Délais d\'exécution', type: 'textarea', required: true },
      { name: 'reception_prestations', label: 'Réception des prestations (vérification et test)', type: 'textarea', required: true },
      { name: 'garantit', label: 'Garantit', type: 'textarea', required: true },
      { name: 'maintenance', label: 'Maintenance', type: 'textarea', required: false },
      { name: 'resiliation', label: 'Résiliation', type: 'textarea', required: true },
      { name: 'reglement_litiges', label: 'Règlement des litiges', type: 'textarea', required: true },
      { name: 'signature', label: 'Signature', type: 'text', required: true }
    ]
  },

  // Discours
  {
    name: 'Discours',
    type: 'discours',
    fields: [
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'introduction', label: 'Introduction', type: 'textarea', required: true },
      { name: 'developpement', label: 'Développement', type: 'textarea', required: true },
      { name: 'conclusion', label: 'Conclusion', type: 'textarea', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Rapport
  {
    name: 'Rapport',
    type: 'rapport',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_signataire', label: 'Nom du signataire', type: 'text', required: true },
      { name: 'table_matiere', label: 'Table de matière', type: 'textarea', required: true },
      { name: 'introduction', label: 'Introduction (Information générale)', type: 'textarea', required: true },
      { name: 'developpement', label: 'Développement (Avec les différentes sections)', type: 'textarea', required: true },
      { name: 'conclusion', label: 'Conclusion', type: 'textarea', required: true },
      { name: 'signature', label: 'Signature (Uniquement pour le rapport)', type: 'text', required: true },
      { name: 'piece_jointes', label: 'Pièce jointes', type: 'file', required: false }
    ]
  },

  // Guide
  {
    name: 'Guide',
    type: 'guide',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'nom_signataire', label: 'Nom du signataire', type: 'text', required: true },
      { name: 'table_matiere', label: 'Table de matière', type: 'textarea', required: true },
      { name: 'introduction', label: 'Introduction (Information générale)', type: 'textarea', required: true },
      { name: 'developpement', label: 'Développement (Avec les différentes sections)', type: 'textarea', required: true },
      { name: 'conclusion', label: 'Conclusion', type: 'textarea', required: true },
      { name: 'signature', label: 'Signature (Uniquement pour le rapport)', type: 'text', required: true },
      { name: 'piece_jointes', label: 'Pièce jointes', type: 'file', required: false }
    ]
  },

  // Plan d'action
  {
    name: 'Plan d\'action',
    type: 'plan-action',
    fields: [
      { name: 'contexte', label: 'Contexte', type: 'textarea', required: true },
      { name: 'objectif', label: 'Objectif', type: 'textarea', required: true },
      { name: 'etat_actuel', label: 'État actuel', type: 'textarea', required: true },
      { name: 'ressources_disponibles', label: 'Ressources disponibles', type: 'textarea', required: true },
      { name: 'action_entreprendre', label: 'Action à entreprendre', type: 'textarea', required: true },
      { name: 'affectation_roles', label: 'Affectation des rôles', type: 'textarea', required: true },
      { name: 'definition_planning', label: 'Définition du planning', type: 'textarea', required: true },
      { name: 'budgets', label: 'Budgets', type: 'textarea', required: true },
      { name: 'ressources_humaines', label: 'Ressources humaines', type: 'textarea', required: true },
      { name: 'ressources_materielles', label: 'Ressources matérielles', type: 'textarea', required: true },
      { name: 'suivi_evaluation', label: 'Suivi et Évaluation', type: 'textarea', required: true },
      { name: 'conclusion', label: 'Conclusion', type: 'textarea', required: true },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Barème
  {
    name: 'Barème',
    type: 'bareme',
    fields: [
      { name: 'contexte', label: 'Contexte', type: 'textarea', required: true },
      { name: 'instructions', label: 'Instructions', type: 'textarea', required: true },
      { name: 'critere_evaluation', label: 'Critère d\'évaluation', type: 'textarea', required: true },
      { name: 'point_attribues', label: 'Point attribués', type: 'textarea', required: true },
      { name: 'commentaire', label: 'Commentaire', type: 'textarea', required: false },
      { name: 'total', label: 'Total', type: 'number', required: true },
      { name: 'signature', label: 'Signature', type: 'text', required: true }
    ]
  },

  // Norme
  {
    name: 'Norme',
    type: 'norme',
    fields: [
      { name: 'contexte', label: 'Contexte', type: 'textarea', required: true },
      { name: 'instructions', label: 'Instructions', type: 'textarea', required: true },
      { name: 'critere_evaluation', label: 'Critère d\'évaluation', type: 'textarea', required: true },
      { name: 'point_attribues', label: 'Point attribués', type: 'textarea', required: true },
      { name: 'commentaire', label: 'Commentaire', type: 'textarea', required: false },
      { name: 'total', label: 'Total', type: 'number', required: true },
      { name: 'signature', label: 'Signature', type: 'text', required: true }
    ]
  },

  // Procès-verbal
  {
    name: 'Procès-verbal',
    type: 'proces-verbal',
    fields: [
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'date_heure', label: 'Date et heure', type: 'text', required: true },
      { name: 'lieu', label: 'Lieu', type: 'text', required: true },
      { name: 'participants_present', label: 'Participants présents', type: 'textarea', required: true },
      { name: 'absent', label: 'Absents', type: 'textarea', required: false },
      { name: 'president_seance', label: 'Président de séance', type: 'text', required: true },
      { name: 'secretaire_seance', label: 'Secrétaire de séance', type: 'text', required: true },
      { name: 'ordre_jours', label: 'Ordre du jour (les points à discuter)', type: 'textarea', required: true },
      { name: 'deroulement_reunion', label: 'Déroulement de la réunion (et intervention des participants)', type: 'textarea', required: true },
      { name: 'questions_diverses', label: 'Questions diverses', type: 'textarea', required: false },
      { name: 'decision', label: 'Décision', type: 'textarea', required: true },
      { name: 'cloture_reunion', label: 'Clôture de réunion', type: 'textarea', required: true },
      { name: 'signature', label: 'Signature', type: 'text', required: true },
      { name: 'piece_jointe', label: 'Pièce jointe', type: 'file', required: false }
    ]
  }
];

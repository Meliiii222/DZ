import { FormTemplate } from './formTemplates';

export const FINAL_FORM_TEMPLATES: FormTemplate[] = [
  // Déclaration
  {
    id: 'declaration',
    name: 'Déclaration',
    type: 'Déclaration',
    category: 'Communications Officielles',
    description: 'Formulaire pour les déclarations officielles',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'bulletin_information',
    name: 'Bulletin d\'information',
    type: 'Bulletin',
    category: 'Publications',
    description: 'Formulaire pour les bulletins d\'information',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'jurisprudence',
    name: 'Jurisprudence',
    type: 'Jurisprudence',
    category: 'Décisions Judiciaires',
    description: 'Formulaire pour les décisions de jurisprudence',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'cahier_charge',
    name: 'Cahier de charge',
    type: 'Cahier des charges',
    category: 'Documents Contractuels',
    description: 'Formulaire pour les cahiers des charges',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'ccag',
    name: 'Cahier des clauses administratives générales',
    type: 'CCAG',
    category: 'Documents Contractuels',
    description: 'Formulaire pour les cahiers des clauses administratives générales',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'discours',
    name: 'Discours',
    type: 'Discours',
    category: 'Communications Officielles',
    description: 'Formulaire pour les discours officiels',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'rapport',
    name: 'Rapport',
    type: 'Rapport',
    category: 'Documents Techniques',
    description: 'Formulaire pour les rapports officiels',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'guide',
    name: 'Guide',
    type: 'Guide',
    category: 'Documents Techniques',
    description: 'Formulaire pour les guides pratiques',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'plan_action',
    name: 'Plan d\'action',
    type: 'Plan',
    category: 'Planification',
    description: 'Formulaire pour les plans d\'action',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'bareme',
    name: 'Barème',
    type: 'Barème',
    category: 'Évaluation',
    description: 'Formulaire pour les barèmes d\'évaluation',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'norme',
    name: 'Norme',
    type: 'Norme',
    category: 'Standards',
    description: 'Formulaire pour les normes techniques',
    createdAt: '2024-01-01',
    isSystem: true,
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
    id: 'proces_verbal',
    name: 'Procès-verbal',
    type: 'Procès-verbal',
    category: 'Comptes-rendus',
    description: 'Formulaire pour les procès-verbaux de réunion',
    createdAt: '2024-01-01',
    isSystem: true,
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
  },

  // Fonction Publique
  {
    id: 'fonction_publique',
    name: 'Fonction Publique',
    type: 'Fonction Publique',
    category: 'Administration Publique',
    description: 'Formulaire pour les textes relatifs à la fonction publique algérienne',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'journal_numero', label: 'Journal N°', type: 'text', required: true },
      { name: 'date_journal', label: 'Date du Journal', type: 'date', required: true },
      { name: 'numero_page', label: 'N° de Page', type: 'number', required: true },
      { name: 'numero_ref', label: 'N° Réf', type: 'text', required: true },
      { name: 'date_creation', label: 'Date de création', type: 'date', required: true },
      { name: 'titre', label: 'Titre', type: 'text', required: true },
      { name: 'type_acte', label: 'Type d\'acte', type: 'select', required: true,
        options: ['Statut particulier', 'Grille indiciaire', 'Nomination', 'Promotion', 'Mutation', 'Détachement', 'Mise à disposition', 'Sanction disciplinaire', 'Retraite', 'Disponibilité'] },
      { name: 'corps_fonctionnaires', label: 'Corps de fonctionnaires', type: 'select', required: true,
        options: ['Enseignants', 'Médecins', 'Ingénieurs', 'Administrateurs', 'Techniciens', 'Agents d\'exécution', 'Magistrats', 'Diplomates', 'Sécurité', 'Douanes'] },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true,
        options: ['Education', 'Santé', 'Justice', 'Intérieur', 'Finances', 'Agriculture', 'Industrie', 'Commerce', 'Travaux publics', 'Transports'] },
      { name: 'grade', label: 'Grade/Échelon', type: 'text', required: false },
      { name: 'indice_base', label: 'Indice de base', type: 'number', required: false },
      { name: 'indice_majoré', label: 'Indice majoré', type: 'number', required: false },
      { name: 'conditions_acces', label: 'Conditions d\'accès', type: 'textarea', required: false },
      { name: 'missions_attributions', label: 'Missions et attributions', type: 'textarea', required: false },
      { name: 'modalites_recrutement', label: 'Modalités de recrutement', type: 'textarea', required: false },
      { name: 'formation_required', label: 'Formation requise', type: 'textarea', required: false },
      { name: 'cadre_application', label: 'Cadre d\'application (Nature)', type: 'select', required: false,
        options: ['Ordonnance 06-03 du 15 juillet 2006', 'Décret 85-59 du 23 mars 1985', 'Loi 90-11 du 21 avril 1990'] },
      { name: 'observation', label: 'Observations', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  },

  // Jurisprudence Fonction Publique
  {
    id: 'jurisprudence_fonction_publique',
    name: 'Jurisprudence Fonction Publique',
    type: 'Jurisprudence Fonction Publique',
    category: 'Décisions Judiciaires',
    description: 'Formulaire pour les décisions de jurisprudence relatives à la fonction publique algérienne',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_jurisprudence', label: 'N° de Jurisprudence', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'structure_concernee', label: 'Structure concernée', type: 'text', required: true },
      { name: 'sujet', label: 'Sujet', type: 'text', required: true },
      { name: 'corps_fonctionnaires', label: 'Corps de fonctionnaires', type: 'select', required: true,
        options: ['Enseignants', 'Médecins', 'Ingénieurs', 'Administrateurs', 'Techniciens', 'Agents d\'exécution', 'Magistrats', 'Diplomates', 'Sécurité', 'Douanes'] },
      { name: 'secteur', label: 'Secteur', type: 'select', required: true,
        options: ['Education', 'Santé', 'Justice', 'Intérieur', 'Finances', 'Agriculture', 'Industrie', 'Commerce', 'Travaux publics', 'Transports'] },
      { name: 'type_decision', label: 'Type de décision', type: 'select', required: true,
        options: ['Disciplinaire', 'Promotion', 'Mutation', 'Recrutement', 'Retraite', 'Disponibilité', 'Détachement', 'Contentieux salarial', 'Contentieux administratif'] },
      { name: 'grade', label: 'Grade/Échelon concerné', type: 'text', required: false },
      { name: 'resume_decision', label: 'Résumé de la décision', type: 'textarea', required: true },
      { name: 'motifs_juridiques', label: 'Motifs juridiques', type: 'textarea', required: true },
      { name: 'portee_decision', label: 'Portée de la décision', type: 'textarea', required: false },
      { name: 'references_legales', label: 'Références légales', type: 'textarea', required: false },
      { name: 'piece_jointe', label: 'Pièce Jointe', type: 'file', required: false }
    ]
  }
];

// Combiner tous les templates
import { FORM_TEMPLATES } from './formTemplates';
import { EXTENDED_FORM_TEMPLATES } from './formTemplatesExtended';
import { ADDITIONAL_FORM_TEMPLATES } from './formTemplatesAdditional';

// Formulaires de procédures administratives (8 catégories)
export const ADMINISTRATIVE_PROCEDURE_TEMPLATES: FormTemplate[] = [
  // État Civil
  {
    id: 'procedure_etat_civil',
    name: 'Procédure État Civil',
    type: 'Procédure Administrative',
    category: 'État Civil',
    description: 'Formulaire pour les procédures d\'état civil (extraits d\'acte de naissance, mariage, décès)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_demande', label: 'N° de Demande', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de Demande', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Extrait d\'acte de naissance', 'Extrait d\'acte de mariage', 'Extrait d\'acte de décès', 'Livret de famille', 'Certificat de célibat', 'Certificat de non polygamie'] },
      { name: 'demandeur_nom', label: 'Nom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_prenom', label: 'Prénom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_adresse', label: 'Adresse du Demandeur', type: 'textarea', required: true },
      { name: 'demandeur_telephone', label: 'Téléphone', type: 'text', required: false },
      { name: 'concerne_nom', label: 'Nom de la Personne Concernée', type: 'text', required: true },
      { name: 'concerne_prenom', label: 'Prénom de la Personne Concernée', type: 'text', required: true },
      { name: 'concerne_date_naissance', label: 'Date de Naissance', type: 'date', required: true },
      { name: 'concerne_lieu_naissance', label: 'Lieu de Naissance', type: 'text', required: true },
      { name: 'pere_nom', label: 'Nom du Père', type: 'text', required: false },
      { name: 'mere_nom', label: 'Nom de la Mère', type: 'text', required: false },
      { name: 'commune_naissance', label: 'Commune de Naissance', type: 'text', required: true },
      { name: 'wilaya_naissance', label: 'Wilaya de Naissance', type: 'text', required: true },
      { name: 'motif_demande', label: 'Motif de la Demande', type: 'textarea', required: true },
      { name: 'pieces_jointes', label: 'Pièces Jointes', type: 'textarea', required: true },
      { name: 'agent_traitant', label: 'Agent Traitant', type: 'text', required: false },
      { name: 'date_traitement', label: 'Date de Traitement', type: 'date', required: false },
      { name: 'statut', label: 'Statut', type: 'select', required: false,
        options: ['En attente', 'En cours de traitement', 'Complété', 'Rejeté'] },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Urbanisme
  {
    id: 'procedure_urbanisme',
    name: 'Procédure Urbanisme',
    type: 'Procédure Administrative',
    category: 'Urbanisme',
    description: 'Formulaire pour les procédures d\'urbanisme (permis de construire, certificat d\'urbanisme)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_dossier', label: 'N° de Dossier', type: 'text', required: true },
      { name: 'date_depot', label: 'Date de Dépôt', type: 'date', required: true },
      { name: 'type_demande', label: 'Type de Demande', type: 'select', required: true,
        options: ['Permis de construire', 'Permis de démolir', 'Certificat d\'urbanisme opérationnel', 'Certificat d\'urbanisme d\'information', 'Autorisation de lotir', 'Permis d\'aménager'] },
      { name: 'demandeur_nom', label: 'Nom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_prenom', label: 'Prénom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_qualite', label: 'Qualité du Demandeur', type: 'select', required: true,
        options: ['Propriétaire', 'Mandataire', 'Architecte', 'Entreprise'] },
      { name: 'terrain_adresse', label: 'Adresse du Terrain', type: 'textarea', required: true },
      { name: 'terrain_superficie', label: 'Superficie du Terrain (m²)', type: 'number', required: true },
      { name: 'terrain_numero_titre', label: 'N° Titre de Propriété', type: 'text', required: true },
      { name: 'construction_nature', label: 'Nature de la Construction', type: 'select', required: true,
        options: ['Habitation individuelle', 'Habitation collective', 'Commerce', 'Bureau', 'Industrie', 'Équipement public'] },
      { name: 'construction_superficie', label: 'Superficie de Construction (m²)', type: 'number', required: true },
      { name: 'construction_hauteur', label: 'Hauteur de Construction (m)', type: 'number', required: true },
      { name: 'construction_etages', label: 'Nombre d\'Étages', type: 'number', required: true },
      { name: 'architecte_nom', label: 'Nom de l\'Architecte', type: 'text', required: false },
      { name: 'architecte_numero', label: 'N° d\'Inscription ONA', type: 'text', required: false },
      { name: 'entrepreneur_nom', label: 'Nom de l\'Entrepreneur', type: 'text', required: false },
      { name: 'plans_joints', label: 'Plans Joints', type: 'textarea', required: true },
      { name: 'conformite_pos', label: 'Conformité au POS', type: 'select', required: true,
        options: ['Conforme', 'Non conforme', 'À vérifier'] },
      { name: 'avis_commission', label: 'Avis de la Commission', type: 'textarea', required: false },
      { name: 'decision', label: 'Décision', type: 'select', required: false,
        options: ['Favorable', 'Défavorable', 'Favorable avec réserves'] },
      { name: 'date_decision', label: 'Date de Décision', type: 'date', required: false },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Commerce
  {
    id: 'procedure_commerce',
    name: 'Procédure Commerce',
    type: 'Procédure Administrative',
    category: 'Commerce',
    description: 'Formulaire pour les procédures commerciales (registre du commerce, licences)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_demande', label: 'N° de Demande', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de Demande', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Inscription au registre du commerce', 'Modification du registre', 'Radiation du registre', 'Licence d\'importation', 'Licence d\'exportation', 'Agrément commercial'] },
      { name: 'entreprise_denomination', label: 'Dénomination de l\'Entreprise', type: 'text', required: true },
      { name: 'entreprise_forme_juridique', label: 'Forme Juridique', type: 'select', required: true,
        options: ['EURL', 'SARL', 'SPA', 'SNC', 'Entreprise individuelle', 'EIRL'] },
      { name: 'entreprise_capital', label: 'Capital Social (DA)', type: 'number', required: true },
      { name: 'entreprise_adresse', label: 'Adresse du Siège Social', type: 'textarea', required: true },
      { name: 'entreprise_activite', label: 'Activité Principale', type: 'text', required: true },
      { name: 'entreprise_code_activite', label: 'Code d\'Activité', type: 'text', required: true },
      { name: 'gerant_nom', label: 'Nom du Gérant', type: 'text', required: true },
      { name: 'gerant_prenom', label: 'Prénom du Gérant', type: 'text', required: true },
      { name: 'gerant_nationalite', label: 'Nationalité du Gérant', type: 'text', required: true },
      { name: 'gerant_adresse', label: 'Adresse du Gérant', type: 'textarea', required: true },
      { name: 'representant_nom', label: 'Nom du Représentant Légal', type: 'text', required: false },
      { name: 'etablissement_adresse', label: 'Adresse de l\'Établissement', type: 'textarea', required: true },
      { name: 'etablissement_superficie', label: 'Superficie (m²)', type: 'number', required: false },
      { name: 'employes_nombre', label: 'Nombre d\'Employés', type: 'number', required: false },
      { name: 'documents_joints', label: 'Documents Joints', type: 'textarea', required: true },
      { name: 'frais_verses', label: 'Frais Versés (DA)', type: 'number', required: false },
      { name: 'numero_rc', label: 'N° Registre de Commerce', type: 'text', required: false },
      { name: 'date_immatriculation', label: 'Date d\'Immatriculation', type: 'date', required: false },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Emploi
  {
    id: 'procedure_emploi',
    name: 'Procédure Emploi',
    type: 'Procédure Administrative',
    category: 'Emploi',
    description: 'Formulaire pour les procédures d\'emploi (déclaration d\'embauche, licenciement)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_declaration', label: 'N° de Déclaration', type: 'text', required: true },
      { name: 'date_declaration', label: 'Date de Déclaration', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Déclaration d\'embauche', 'Modification contrat', 'Déclaration de licenciement', 'Déclaration d\'accident de travail', 'Demande d\'autorisation de travail'] },
      { name: 'employeur_denomination', label: 'Dénomination de l\'Employeur', type: 'text', required: true },
      { name: 'employeur_adresse', label: 'Adresse de l\'Employeur', type: 'textarea', required: true },
      { name: 'employeur_activite', label: 'Activité de l\'Entreprise', type: 'text', required: true },
      { name: 'employeur_numero_nas', label: 'N° NAS Employeur', type: 'text', required: true },
      { name: 'employeur_numero_rc', label: 'N° Registre de Commerce', type: 'text', required: true },
      { name: 'salarie_nom', label: 'Nom du Salarié', type: 'text', required: true },
      { name: 'salarie_prenom', label: 'Prénom du Salarié', type: 'text', required: true },
      { name: 'salarie_date_naissance', label: 'Date de Naissance', type: 'date', required: true },
      { name: 'salarie_lieu_naissance', label: 'Lieu de Naissance', type: 'text', required: true },
      { name: 'salarie_adresse', label: 'Adresse du Salarié', type: 'textarea', required: true },
      { name: 'salarie_nationalite', label: 'Nationalité', type: 'text', required: true },
      { name: 'salarie_niveau_instruction', label: 'Niveau d\'Instruction', type: 'select', required: true,
        options: ['Sans instruction', 'Primaire', 'Moyen', 'Secondaire', 'Universitaire', 'Formation professionnelle'] },
      { name: 'contrat_type', label: 'Type de Contrat', type: 'select', required: true,
        options: ['CDI', 'CDD', 'Contrat de formation', 'Contrat d\'apprentissage', 'Contrat saisonnier'] },
      { name: 'contrat_duree', label: 'Durée du Contrat', type: 'text', required: false },
      { name: 'poste_occupe', label: 'Poste Occupé', type: 'text', required: true },
      { name: 'salaire_base', label: 'Salaire de Base (DA)', type: 'number', required: true },
      { name: 'date_embauche', label: 'Date d\'Embauche', type: 'date', required: true },
      { name: 'periode_essai', label: 'Période d\'Essai', type: 'text', required: false },
      { name: 'horaire_travail', label: 'Horaire de Travail', type: 'text', required: true },
      { name: 'lieu_travail', label: 'Lieu de Travail', type: 'text', required: true },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Santé
  {
    id: 'procedure_sante',
    name: 'Procédure Santé',
    type: 'Procédure Administrative',
    category: 'Santé',
    description: 'Formulaire pour les procédures de santé (agréments, autorisations sanitaires)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_demande', label: 'N° de Demande', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de Demande', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Agrément d\'établissement de santé', 'Autorisation d\'exercice médical', 'Licence de pharmacie', 'Autorisation laboratoire', 'Carte professionnelle paramédicale'] },
      { name: 'demandeur_nom', label: 'Nom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_prenom', label: 'Prénom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_profession', label: 'Profession', type: 'select', required: true,
        options: ['Médecin généraliste', 'Médecin spécialiste', 'Chirurgien-dentiste', 'Pharmacien', 'Infirmier', 'Sage-femme', 'Kinésithérapeute', 'Biologiste'] },
      { name: 'demandeur_diplome', label: 'Diplôme Principal', type: 'text', required: true },
      { name: 'demandeur_universite', label: 'Université d\'Obtention', type: 'text', required: true },
      { name: 'demandeur_annee_diplome', label: 'Année d\'Obtention', type: 'number', required: true },
      { name: 'etablissement_denomination', label: 'Dénomination de l\'Établissement', type: 'text', required: false },
      { name: 'etablissement_type', label: 'Type d\'Établissement', type: 'select', required: false,
        options: ['Cabinet médical', 'Clinique privée', 'Pharmacie', 'Laboratoire', 'Centre de soins', 'Hôpital privé'] },
      { name: 'etablissement_adresse', label: 'Adresse de l\'Établissement', type: 'textarea', required: true },
      { name: 'etablissement_wilaya', label: 'Wilaya', type: 'text', required: true },
      { name: 'etablissement_commune', label: 'Commune', type: 'text', required: true },
      { name: 'specialite_medicale', label: 'Spécialité Médicale', type: 'text', required: false },
      { name: 'equipements_medicaux', label: 'Équipements Médicaux', type: 'textarea', required: false },
      { name: 'personnel_medical', label: 'Personnel Médical', type: 'textarea', required: false },
      { name: 'capacite_accueil', label: 'Capacité d\'Accueil', type: 'number', required: false },
      { name: 'services_proposes', label: 'Services Proposés', type: 'textarea', required: true },
      { name: 'experience_professionnelle', label: 'Expérience Professionnelle', type: 'textarea', required: true },
      { name: 'formation_continue', label: 'Formation Continue', type: 'textarea', required: false },
      { name: 'assurance_responsabilite', label: 'Assurance Responsabilité Civile', type: 'text', required: true },
      { name: 'documents_joints', label: 'Documents Joints', type: 'textarea', required: true },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Éducation
  {
    id: 'procedure_education',
    name: 'Procédure Éducation',
    type: 'Procédure Administrative',
    category: 'Éducation',
    description: 'Formulaire pour les procédures d\'éducation (agréments d\'établissements, autorisations)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_demande', label: 'N° de Demande', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de Demande', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Agrément école privée', 'Autorisation cours de soutien', 'Reconnaissance diplôme', 'Équivalence de diplôme', 'Autorisation centre de formation'] },
      { name: 'etablissement_denomination', label: 'Dénomination de l\'Établissement', type: 'text', required: true },
      { name: 'etablissement_type', label: 'Type d\'Établissement', type: 'select', required: true,
        options: ['École primaire privée', 'CEM privé', 'Lycée privé', 'École de formation professionnelle', 'Centre de langues', 'École maternelle'] },
      { name: 'etablissement_adresse', label: 'Adresse de l\'Établissement', type: 'textarea', required: true },
      { name: 'etablissement_superficie', label: 'Superficie (m²)', type: 'number', required: true },
      { name: 'promoteur_nom', label: 'Nom du Promoteur', type: 'text', required: true },
      { name: 'promoteur_prenom', label: 'Prénom du Promoteur', type: 'text', required: true },
      { name: 'promoteur_qualifications', label: 'Qualifications du Promoteur', type: 'textarea', required: true },
      { name: 'directeur_nom', label: 'Nom du Directeur', type: 'text', required: true },
      { name: 'directeur_diplome', label: 'Diplôme du Directeur', type: 'text', required: true },
      { name: 'directeur_experience', label: 'Expérience du Directeur', type: 'textarea', required: true },
      { name: 'enseignants_nombre', label: 'Nombre d\'Enseignants', type: 'number', required: true },
      { name: 'enseignants_qualifications', label: 'Qualifications des Enseignants', type: 'textarea', required: true },
      { name: 'eleves_capacite', label: 'Capacité d\'Accueil (Élèves)', type: 'number', required: true },
      { name: 'salles_classe_nombre', label: 'Nombre de Salles de Classe', type: 'number', required: true },
      { name: 'equipements_pedagogiques', label: 'Équipements Pédagogiques', type: 'textarea', required: true },
      { name: 'programme_enseignement', label: 'Programme d\'Enseignement', type: 'textarea', required: true },
      { name: 'methodes_pedagogiques', label: 'Méthodes Pédagogiques', type: 'textarea', required: true },
      { name: 'frais_scolarite', label: 'Frais de Scolarité', type: 'number', required: true },
      { name: 'transport_scolaire', label: 'Transport Scolaire', type: 'select', required: true,
        options: ['Disponible', 'Non disponible'] },
      { name: 'restauration_scolaire', label: 'Restauration Scolaire', type: 'select', required: true,
        options: ['Disponible', 'Non disponible'] },
      { name: 'securite_mesures', label: 'Mesures de Sécurité', type: 'textarea', required: true },
      { name: 'documents_joints', label: 'Documents Joints', type: 'textarea', required: true },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Transport
  {
    id: 'procedure_transport',
    name: 'Procédure Transport',
    type: 'Procédure Administrative',
    category: 'Transport',
    description: 'Formulaire pour les procédures de transport (licences de transport, agréments)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_demande', label: 'N° de Demande', type: 'text', required: true },
      { name: 'date_demande', label: 'Date de Demande', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Licence transport de voyageurs', 'Licence transport de marchandises', 'Agrément auto-école', 'Autorisation taxi', 'Carte de transport'] },
      { name: 'demandeur_nom', label: 'Nom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_prenom', label: 'Prénom du Demandeur', type: 'text', required: true },
      { name: 'demandeur_adresse', label: 'Adresse du Demandeur', type: 'textarea', required: true },
      { name: 'demandeur_telephone', label: 'Téléphone', type: 'text', required: true },
      { name: 'permis_conduire_numero', label: 'N° Permis de Conduire', type: 'text', required: true },
      { name: 'permis_conduire_categorie', label: 'Catégorie de Permis', type: 'select', required: true,
        options: ['A', 'B', 'C', 'D', 'E(B)', 'E(C)', 'E(D)'] },
      { name: 'permis_conduire_date', label: 'Date d\'Obtention du Permis', type: 'date', required: true },
      { name: 'entreprise_denomination', label: 'Dénomination de l\'Entreprise', type: 'text', required: false },
      { name: 'entreprise_forme_juridique', label: 'Forme Juridique', type: 'select', required: false,
        options: ['Entreprise individuelle', 'EURL', 'SARL', 'SPA'] },
      { name: 'vehicules_nombre', label: 'Nombre de Véhicules', type: 'number', required: true },
      { name: 'vehicules_types', label: 'Types de Véhicules', type: 'textarea', required: true },
      { name: 'itineraires_proposes', label: 'Itinéraires Proposés', type: 'textarea', required: true },
      { name: 'zone_desserte', label: 'Zone de Desserte', type: 'select', required: true,
        options: ['Urbaine', 'Suburbaine', 'Intercommunale', 'Interwilayas', 'Internationale'] },
      { name: 'conducteurs_nombre', label: 'Nombre de Conducteurs', type: 'number', required: true },
      { name: 'conducteurs_qualifications', label: 'Qualifications des Conducteurs', type: 'textarea', required: true },
      { name: 'garage_adresse', label: 'Adresse du Garage', type: 'textarea', required: true },
      { name: 'garage_superficie', label: 'Superficie du Garage (m²)', type: 'number', required: true },
      { name: 'assurance_responsabilite', label: 'Assurance Responsabilité Civile', type: 'text', required: true },
      { name: 'capacite_financiere', label: 'Capacité Financière', type: 'number', required: true },
      { name: 'experience_transport', label: 'Expérience dans le Transport', type: 'textarea', required: false },
      { name: 'documents_joints', label: 'Documents Joints', type: 'textarea', required: true },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  },

  // Fiscalité
  {
    id: 'procedure_fiscalite',
    name: 'Procédure Fiscalité',
    type: 'Procédure Administrative',
    category: 'Fiscalité',
    description: 'Formulaire pour les procédures fiscales (déclarations, réclamations, exonérations)',
    createdAt: '2024-01-01',
    isSystem: true,
    fields: [
      { name: 'numero_dossier', label: 'N° de Dossier', type: 'text', required: true },
      { name: 'date_depot', label: 'Date de Dépôt', type: 'date', required: true },
      { name: 'type_procedure', label: 'Type de Procédure', type: 'select', required: true,
        options: ['Déclaration d\'existence', 'Déclaration de cessation', 'Demande d\'exonération', 'Réclamation fiscale', 'Demande de délai de paiement', 'Régularisation fiscale'] },
      { name: 'contribuable_nom', label: 'Nom du Contribuable', type: 'text', required: true },
      { name: 'contribuable_prenom', label: 'Prénom du Contribuable', type: 'text', required: true },
      { name: 'contribuable_qualite', label: 'Qualité du Contribuable', type: 'select', required: true,
        options: ['Personne physique', 'Personne morale', 'Entreprise individuelle', 'Société'] },
      { name: 'contribuable_adresse', label: 'Adresse du Contribuable', type: 'textarea', required: true },
      { name: 'contribuable_telephone', label: 'Téléphone', type: 'text', required: true },
      { name: 'numero_identification_fiscale', label: 'N° d\'Identification Fiscale', type: 'text', required: true },
      { name: 'activite_principale', label: 'Activité Principale', type: 'text', required: true },
      { name: 'code_activite', label: 'Code d\'Activité', type: 'text', required: true },
      { name: 'date_debut_activite', label: 'Date de Début d\'Activité', type: 'date', required: true },
      { name: 'regime_fiscal', label: 'Régime Fiscal', type: 'select', required: true,
        options: ['Forfaitaire', 'Réel simplifié', 'Réel normal', 'Micro-entreprise'] },
      { name: 'chiffre_affaires_annuel', label: 'Chiffre d\'Affaires Annuel (DA)', type: 'number', required: true },
      { name: 'impots_concernes', label: 'Impôts Concernés', type: 'select', required: true,
        options: ['IBS', 'IRG', 'TAP', 'TVA', 'Droits de douane', 'Taxe foncière'] },
      { name: 'periode_fiscale', label: 'Période Fiscale', type: 'text', required: true },
      { name: 'montant_impot', label: 'Montant de l\'Impôt (DA)', type: 'number', required: false },
      { name: 'montant_penalites', label: 'Montant des Pénalités (DA)', type: 'number', required: false },
      { name: 'motif_demande', label: 'Motif de la Demande', type: 'textarea', required: true },
      { name: 'pieces_justificatives', label: 'Pièces Justificatives', type: 'textarea', required: true },
      { name: 'situation_familiale', label: 'Situation Familiale', type: 'select', required: false,
        options: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)'] },
      { name: 'nombre_enfants', label: 'Nombre d\'Enfants à Charge', type: 'number', required: false },
      { name: 'revenus_autres', label: 'Autres Revenus', type: 'textarea', required: false },
      { name: 'observations', label: 'Observations', type: 'textarea', required: false }
    ]
  }
];

export const ALL_FORM_TEMPLATES: FormTemplate[] = FINAL_FORM_TEMPLATES;
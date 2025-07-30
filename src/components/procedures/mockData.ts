import { AdministrativeProcedure } from "@/types/legal";

export const mockProcedures: AdministrativeProcedure[] = [
  {
    id: "1",
    title: "Création d'entreprise SARL",
    category: "commercial", 
    description: "Procédure complète pour créer une société à responsabilité limitée en Algérie",
    institution: "Centre National du Registre de Commerce",
    duration: "15-30 jours",
    difficulty: "Moyen",
    requiredDocuments: [
      "Formulaire de demande d'immatriculation",
      "Statuts de la société",
      "Attestation de dépôt de capital", 
      "Pièce d'identité des associés",
      "Justificatif de domicile du siège social"
    ],
    documents: [
      "Formulaire de demande d'immatriculation",
      "Statuts de la société",
      "Attestation de dépôt de capital",
      "Pièce d'identité des associés",
      "Justificatif de domicile du siège social"
    ],
    steps: [
      {
        id: "1",
        title: "Réservation de la dénomination sociale",
        description: "Vérifier la disponibilité et réserver le nom de l'entreprise",
        duration: "2-3 jours",
        required: true
      },
      {
        id: "2", 
        title: "Dépôt du capital social",
        description: "Effectuer le dépôt du capital dans une banque agréée",
        duration: "1 jour",
        required: true
      },
      {
        id: "3",
        title: "Rédaction des statuts",
        description: "Rédiger les statuts de la société",
        duration: "2-5 jours",
        required: true
      },
      {
        id: "4",
        title: "Enregistrement au registre de commerce",
        description: "Déposer le dossier complet au centre du registre de commerce",
        duration: "5-7 jours",
        required: true
      },
      {
        id: "5",
        title: "Publication au BOAL",
        description: "Publier l'annonce légale au Bulletin Officiel des Annonces Légales",
        duration: "3-5 jours",
        required: true
      },
      {
        id: "6",
        title: "Immatriculation fiscale",
        description: "Obtenir le numéro d'identification fiscale",
        duration: "2-3 jours",
        required: true
      }
    ],
    forms: [
      {
        id: "1",
        title: "Formulaire G50 - Demande d'immatriculation",
        description: "Formulaire officiel pour l'immatriculation au registre de commerce",
        downloadUrl: "#",
        format: "pdf"
      },
      {
        id: "2",
        title: "Modèle de statuts SARL",
        description: "Modèle type de statuts pour société à responsabilité limitée",
        downloadUrl: "#",
        format: "doc"
      }
    ],
    lastUpdate: new Date("2024-01-15"),
    tags: ["entreprise", "SARL", "commercial", "immatriculation"],
    rating: 4.2,
    completedCount: 1247,
    cost: "50,000 - 100,000 DA",
    successRate: 89,
    status: "Validée"
  },
  {
    id: "2",
    title: "Obtention du passeport biométrique",
    category: "civil",
    description: "Procédure pour obtenir ou renouveler un passeport biométrique algérien",
    institution: "Direction Générale de la Sûreté Nationale",
    duration: "7-15 jours",
    difficulty: "Facile",
    requiredDocuments: [
      "Acte de naissance intégral",
      "Pièce d'identité nationale",
      "Justificatif de domicile récent",
      "2 photos d'identité aux normes",
      "Certificat de nationalité (si première demande)",
      "Ancien passeport (pour renouvellement)"
    ],
    documents: [
      "Acte de naissance intégral",
      "Pièce d'identité nationale", 
      "Justificatif de domicile récent",
      "2 photos d'identité aux normes",
      "Certificat de nationalité (si première demande)",
      "Ancien passeport (pour renouvellement)"
    ],
    steps: [
      {
        id: "1",
        title: "Prise de rendez-vous en ligne",
        description: "Réserver un créneau sur le portail électronique",
        duration: "Immédiat",
        required: true
      },
      {
        id: "2",
        title: "Dépôt du dossier",
        description: "Se présenter avec tous les documents requis",
        duration: "30 minutes",
        required: true
      },
      {
        id: "3",
        title: "Prise d'empreintes et photo",
        description: "Enregistrement biométrique au centre",
        duration: "15 minutes",
        required: true
      },
      {
        id: "4",
        title: "Paiement des frais",
        description: "Règlement des frais de dossier",
        duration: "5 minutes",
        required: true
      },
      {
        id: "5",
        title: "Retrait du passeport",
        description: "Récupération du passeport avec récépissé",
        duration: "10 minutes",
        required: true
      }
    ],
    forms: [
      {
        id: "1",
        title: "Formulaire de demande de passeport",
        description: "Formulaire officiel à remplir avant le dépôt",
        downloadUrl: "#",
        format: "pdf"
      }
    ],
    lastUpdate: new Date("2024-02-01"),
    tags: ["passeport", "identité", "voyage", "biométrique"],
    rating: 4.5,
    completedCount: 8934,
    cost: "6,000 DA",
    successRate: 95,
    status: "Validée"
  },
  {
    id: "3",
    title: "Demande de permis de conduire",
    category: "civil",
    description: "Procédure complète pour obtenir un permis de conduire en Algérie",
    institution: "Direction des Transports de Wilaya",
    duration: "30-45 jours",
    difficulty: "Moyen",
    requiredDocuments: [
      "Demande manuscrite",
      "Acte de naissance",
      "Certificat de résidence",
      "Certificat médical d'aptitude",
      "6 photos d'identité",
      "Justificatif de paiement des droits",
      "Attestation de groupe sanguin"
    ],
    documents: [
      "Demande manuscrite",
      "Acte de naissance",
      "Certificat de résidence",
      "Certificat médical d'aptitude",
      "6 photos d'identité",
      "Justificatif de paiement des droits",
      "Attestation de groupe sanguin"
    ],
    steps: [
      {
        id: "1",
        title: "Inscription à l'auto-école",
        description: "Choisir une auto-école agréée et s'inscrire",
        duration: "1 jour",
        required: true
      },
      {
        id: "2",
        title: "Cours théoriques",
        description: "Suivre les cours de code de la route",
        duration: "15-20 jours",
        required: true
      },
      {
        id: "3",
        title: "Examen théorique",
        description: "Passer l'examen du code de la route",
        duration: "1 jour",
        required: true
      },
      {
        id: "4",
        title: "Cours pratiques",
        description: "Leçons de conduite avec moniteur",
        duration: "10-15 jours",
        required: true
      },
      {
        id: "5",
        title: "Examen pratique",
        description: "Test de conduite avec inspecteur",
        duration: "1 jour",
        required: true
      },
      {
        id: "6",
        title: "Retrait du permis",
        description: "Récupération du permis définitif",
        duration: "7-10 jours",
        required: true
      }
    ],
    forms: [
      {
        id: "1",
        title: "Formulaire de demande de permis",
        description: "Demande officielle de permis de conduire",
        downloadUrl: "#",
        format: "pdf"
      }
    ],
    lastUpdate: new Date("2024-01-20"),
    tags: ["permis", "conduire", "transport", "auto-école"],
    rating: 3.8,
    completedCount: 2156,
    cost: "15,000 - 25,000 DA",
    successRate: 78,
    status: "Validée"
  },
  {
    id: "4",
    title: "Demande de logement social",
    category: "social",
    description: "Procédure pour faire une demande de logement social (LSP/LPA)",
    institution: "Office de Promotion et de Gestion Immobilière",
    duration: "6-12 mois",
    difficulty: "Difficile",
    requiredDocuments: [
      "Formulaire de demande dûment rempli",
      "Acte de naissance du demandeur",
      "Acte de naissance des enfants",
      "Acte de mariage (si marié)",
      "Certificat de résidence",
      "Justificatifs de revenus",
      "Certificat de non-propriété",
      "Attestation de travail"
    ],
    documents: [
      "Formulaire de demande dûment rempli",
      "Acte de naissance du demandeur",
      "Acte de naissance des enfants",
      "Acte de mariage (si marié)",
      "Certificat de résidence",
      "Justificatifs de revenus",
      "Certificat de non-propriété",
      "Attestation de travail"
    ],
    steps: [
      {
        id: "1",
        title: "Constitution du dossier",
        description: "Réunir tous les documents requis",
        duration: "7-10 jours",
        required: true
      },
      {
        id: "2",
        title: "Dépôt de la demande",
        description: "Soumettre le dossier à l'OPGI",
        duration: "1 jour",
        required: true
      },
      {
        id: "3",
        title: "Étude du dossier",
        description: "Examen de la demande par la commission",
        duration: "30-60 jours",
        required: true
      },
      {
        id: "4",
        title: "Enquête sociale",
        description: "Visite de contrôle du logement actuel",
        duration: "15-30 jours",
        required: true
      },
      {
        id: "5",
        title: "Inscription sur liste d'attente",
        description: "Validation et classement de la demande",
        duration: "7 jours",
        required: true
      },
      {
        id: "6",
        title: "Attribution du logement",
        description: "Notification et signature du contrat",
        duration: "Variable",
        required: true
      }
    ],
    forms: [
      {
        id: "1",
        title: "Formulaire de demande de logement",
        description: "Formulaire officiel OPGI",
        downloadUrl: "#",
        format: "pdf"
      },
      {
        id: "2",
        title: "Déclaration sur l'honneur",
        description: "Attestation de non-propriété",
        downloadUrl: "#",
        format: "pdf"
      }
    ],
    lastUpdate: new Date("2024-01-10"),
    tags: ["logement", "social", "OPGI", "LSP", "LPA"],
    rating: 3.2,
    completedCount: 15678,
    cost: "Gratuit",
    successRate: 45,
    status: "Validée"
  },
  {
    id: "5",
    title: "Obtention de l'extrait de naissance",
    category: "civil",
    description: "Procédure pour obtenir un extrait d'acte de naissance",
    institution: "Mairie du lieu de naissance",
    duration: "1-3 jours",
    difficulty: "Facile",
    requiredDocuments: [
      "Demande écrite",
      "Pièce d'identité du demandeur",
      "Justificatif de lien de parenté (si demande pour autrui)",
      "Frais de timbre"
    ],
    documents: [
      "Demande écrite",
      "Pièce d'identité du demandeur",
      "Justificatif de lien de parenté (si demande pour autrui)",
      "Frais de timbre"
    ],
    steps: [
      {
        id: "1",
        title: "Rédaction de la demande",
        description: "Écrire une demande précisant les informations nécessaires",
        duration: "15 minutes",
        required: true
      },
      {
        id: "2",
        title: "Dépôt à la mairie",
        description: "Se présenter à l'état civil avec les documents",
        duration: "30 minutes",
        required: true
      },
      {
        id: "3",
        title: "Traitement de la demande",
        description: "Recherche et préparation de l'extrait",
        duration: "1-2 jours",
        required: true
      },
      {
        id: "4",
        title: "Retrait de l'extrait",
        description: "Récupération du document à la mairie",
        duration: "10 minutes",
        required: true
      }
    ],
    forms: [
      {
        id: "1",
        title: "Modèle de demande d'extrait",
        description: "Exemple de demande écrite",
        downloadUrl: "#",
        format: "doc"
      }
    ],
    lastUpdate: new Date("2024-02-15"),
    tags: ["naissance", "état civil", "extrait", "mairie"],
    rating: 4.7,
    completedCount: 25431,
    cost: "200 DA",
    successRate: 98,
    status: "Validée"
  }
];

const procedureStats = {
  total: 156,
  easy: 89,
  medium: 45,
  complex: 22,
  forms: 234,
  institutions: 45,
  averageCompletionTime: "12 jours",
  successRate: 94.2
};

const institutionStats = [
  {
    name: "Mairie",
    procedures: 45,
    avgDuration: "3 jours",
    satisfaction: 4.2
  },
  {
    name: "OPGI",
    procedures: 12,
    avgDuration: "45 jours",
    satisfaction: 3.1
  },
  {
    name: "Direction des Transports",
    procedures: 8,
    avgDuration: "21 jours",
    satisfaction: 3.8
  },
  {
    name: "CNRC",
    procedures: 15,
    avgDuration: "18 jours",
    satisfaction: 4.0
  }
];

const recentCompletions = [
  {
    id: "1",
    procedureTitle: "Création d'entreprise SARL",
    userName: "Ahmed B.",
    completedAt: "2024-02-28",
    rating: 5,
    comment: "Procédure claire et bien détaillée. Très utile!"
  },
  {
    id: "2",
    procedureTitle: "Obtention du passeport biométrique",
    userName: "Fatima K.",
    completedAt: "2024-02-27",
    rating: 4,
    comment: "Bon guide, quelques étapes pourraient être plus précises."
  },
  {
    id: "3",
    procedureTitle: "Demande de permis de conduire",
    userName: "Mohamed L.",
    completedAt: "2024-02-26",
    rating: 4,
    comment: "Très complet, merci pour ces informations détaillées."
  }
];

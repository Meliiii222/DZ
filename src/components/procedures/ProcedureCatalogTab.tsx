import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Users, Building, Clock, Star, Filter, SortAsc, Eye, Scale, BookOpen, Heart, Upload, Quote, Search, Download, Share2 } from 'lucide-react';
import { TabSearchField } from '@/components/common/TabSearchField';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimpleFilterModal } from '../legal/modals/SimpleFilterModal';
import { SimpleSortModal } from '../legal/modals/SimpleSortModal';
import { ProcedureConsultationModal } from '@/components/modals/ProcedureConsultationModal';

interface ProcedureCatalogTabProps {
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProcedureCatalogTab({ onAddProcedure, onOpenApprovalQueue }: ProcedureCatalogTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'type' | 'status' | 'digitization'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDigitization, setSelectedDigitization] = useState<string | null>(null);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleTabSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Procedure tab search:', query);
  };

  const handleFilterChange = (filters: { type?: string; status?: string; digitization?: string }) => {
    if (filters.type !== undefined) setSelectedType(filters.type);
    if (filters.status !== undefined) setSelectedStatus(filters.status);
    if (filters.digitization !== undefined) setSelectedDigitization(filters.digitization);
    console.log('Filters changed:', filters);
  };

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFilterModalOpen(true);
  };

  const handleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSortModalOpen(true);
  };

  const handleFiltersApplied = (filters: any) => {
    console.log('✅ Filters applied to procedures:', filters);
    // Ici on pourrait filtrer la liste des procédures
    setIsFilterModalOpen(false);
  };

  const handleSortApplied = (sort: any) => {
    console.log('✅ Sort applied to procedures:', sort);
    // Ici on pourrait trier la liste des procédures
    setIsSortModalOpen(false);
  };

  const handleTypeSelect = (typeId: string) => {
    const type = typeId === 'all' ? null : typeId;
    setSelectedType(type);
    handleFilterChange({ type });
  };

  const handleStatusSelect = (statusId: string) => {
    const status = statusId === 'all' ? null : statusId;
    setSelectedStatus(status);
    handleFilterChange({ status });
  };

  const handleDigitizationSelect = (digitizationId: string) => {
    const digitization = digitizationId === 'all' ? null : digitizationId;
    setSelectedDigitization(digitization);
    handleFilterChange({ digitization });
  };

  // Gestionnaire pour consulter une procédure - VERSION COMPACTE
  const handleViewProcedure = (procedure: any) => {
    // Enrichir les données de la procédure avec des informations supplémentaires
    const enrichedProcedure = {
      ...procedure,
      duration: procedure.duration || '15-30 jours',
      audience: procedure.audience || 'Citoyens algériens',
      organization: procedure.institution || 'Administration publique',
      lastUpdate: '15 janvier 2025',
      requiredDocuments: procedure.requiredDocuments || [
        'Pièce d\'identité nationale en cours de validité',
        'Justificatif de domicile récent (facture, contrat)',
        'Formulaire de demande dûment rempli',
        'Timbre fiscal (si applicable)'
      ],
      steps: procedure.steps || [
        'Rassembler tous les documents nécessaires',
        'Se rendre au guichet de l\'administration compétente',
        'Déposer le dossier complet et obtenir un récépissé',
        'Suivre l\'avancement via le numéro de dossier',
        'Récupérer le document final une fois prêt'
      ]
    };
    
    setSelectedProcedure(enrichedProcedure);
    setIsConsultationModalOpen(true);
  };

  const types = [
    { id: 'all', label: 'Tous', color: 'bg-gray-600' },
    { id: 'civil', label: 'État Civil', color: 'bg-emerald-600' },
    { id: 'commercial', label: 'Commercial', color: 'bg-blue-600' },
    { id: 'urbanisme', label: 'Urbanisme', color: 'bg-purple-600' },
    { id: 'fiscalite', label: 'Fiscalité', color: 'bg-orange-600' }
  ];

  const statuses = [
    { id: 'all', label: 'Tous', color: 'bg-teal-600' },
    { id: 'active', label: 'Active', color: 'bg-green-600' },
    { id: 'suspended', label: 'Suspendue', color: 'bg-yellow-600' },
    { id: 'modified', label: 'Modifiée', color: 'bg-blue-600' }
  ];

  const digitizationOptions = [
    { id: 'all', label: 'Tous', color: 'bg-gray-600' },
    { id: 'yes', label: 'Oui', color: 'bg-green-600' },
    { id: 'no', label: 'Non', color: 'bg-red-600' },
    { id: 'partially', label: 'Partiellement', color: 'bg-orange-600' }
  ];

  const procedures = [
    {
      id: 1,
      title: "Création d'entreprise SARL",
      description: "Procédure complète pour créer une société à responsabilité limitée",
      category: "Entreprise",
      type: "commercial",
      duration: "15-30 jours",
      complexity: "Moyenne",
      popularity: 95,
      status: "active",
      digitization: "yes"
    },
    {
      id: 2,
      title: "Permis de construire",
      description: "Demande d'autorisation de construction pour bâtiment résidentiel",
      category: "Urbanisme",
      type: "urbanisme",
      duration: "2-3 mois",
      complexity: "Élevée",
      popularity: 87,
      status: "active",
      digitization: "partially"
    },
    {
      id: 3,
      title: "Carte nationale d'identité",
      description: "Renouvellement ou première demande de CNI",
      category: "État Civil",
      type: "civil",
      duration: "7-14 jours",
      complexity: "Faible",
      popularity: 92,
      status: "active",
      digitization: "yes"
    },
    {
      id: 4,
      title: "Passeport biométrique",
      description: "Demande de passeport biométrique pour voyages internationaux",
      category: "État Civil",
      type: "civil",
      duration: "10-21 jours",
      complexity: "Moyenne",
      popularity: 89,
      status: "active",
      digitization: "yes"
    },
    {
      id: 5,
      title: "Licence d'importation",
      description: "Obtention d'une licence pour l'importation de marchandises",
      category: "Commerce",
      type: "commercial",
      duration: "30-45 jours",
      complexity: "Élevée",
      popularity: 76,
      status: "modified",
      digitization: "partially"
    },
    {
      id: 6,
      title: "Certificat de résidence",
      description: "Demande de certificat de résidence pour usage administratif",
      category: "État Civil",
      type: "civil",
      duration: "3-7 jours",
      complexity: "Faible",
      popularity: 85,
      status: "active",
      digitization: "no"
    },
    {
      id: 7,
      title: "Agrément sanitaire",
      description: "Obtention d'agrément pour activités liées à l'alimentation",
      category: "Santé",
      type: "commercial",
      duration: "45-60 jours",
      complexity: "Élevée",
      popularity: 73,
      status: "suspended",
      digitization: "no"
    },
    {
      id: 8,
      title: "Déclaration fiscale entreprise",
      description: "Procédure de déclaration fiscale annuelle pour entreprises",
      category: "Fiscalité",
      type: "fiscalite",
      duration: "5-15 jours",
      complexity: "Moyenne",
      popularity: 91,
      status: "active",
      digitization: "yes"
    }
  ];

  const institutions = [
    {
      id: 1,
      name: "Centre National du Registre de Commerce (CNRC)",
      type: "Organisme public",
      description: "Gestion du registre de commerce et des procédures d'immatriculation des entreprises",
      proceduresCount: 47,
      icon: Building
    },
    {
      id: 2,
      name: "Direction Générale des Impôts (DGI)",
      type: "Administration fiscale",
      description: "Gestion des procédures fiscales et déclarations d'impôts",
      proceduresCount: 89,
      icon: FileText
    },
    {
      id: 3,
      name: "Ministère de l'Intérieur",
      type: "Ministère",
      description: "Procédures administratives civiles et d'état civil",
      proceduresCount: 156,
      icon: Users
    },
    {
      id: 4,
      name: "Ministère du Travail",
      type: "Ministère",
      description: "Procédures liées à l'emploi et à la protection sociale",
      proceduresCount: 78,
      icon: Users
    },
    {
      id: 5,
      name: "Ministère de l'Environnement",
      type: "Ministère",
      description: "Autorisations environnementales et études d'impact",
      proceduresCount: 34,
      icon: Building
    },
    {
      id: 6,
      name: "Assemblée Populaire de Wilaya (APW)",
      type: "Collectivité locale",
      description: "Procédures de délibération et d'autorisation locale",
      proceduresCount: 92,
      icon: Building
    },
    {
      id: 7,
      name: "Assemblée Populaire Communale (APC)",
      type: "Collectivité locale",
      description: "Procédures communales et autorisations locales",
      proceduresCount: 127,
      icon: Building
    },
    {
      id: 8,
      name: "Ministère de la Justice",
      type: "Ministère",
      description: "Procédures judiciaires et légalisation",
      proceduresCount: 203,
      icon: Scale
    },
    {
      id: 9,
      name: "Ministère des Finances",
      type: "Ministère",
      description: "Procédures budgétaires et marchés publics",
      proceduresCount: 145,
      icon: FileText
    },
    {
      id: 10,
      name: "Ministère de l'Habitat",
      type: "Ministère",
      description: "Permis de construire et autorisations d'urbanisme",
      proceduresCount: 67,
      icon: Building
    },
    {
      id: 11,
      name: "Ministère de la Santé",
      type: "Ministère", 
      description: "Autorisations sanitaires et procédures médicales",
      proceduresCount: 89,
      icon: Heart
    },
    {
      id: 12,
      name: "Ministère de l'Éducation",
      type: "Ministère",
      description: "Procédures éducatives et diplômes",
      proceduresCount: 112,
      icon: BookOpen
    }
  ];

  const procedureTypes = [
    {
      id: 1,
      name: "Création d'entreprise",
      count: 47,
      description: "Procédures d'immatriculation et de création d'activités commerciales",
      icon: Building,
      color: "blue"
    },
    {
      id: 2,
      name: "Fiscalité",
      count: 89,
      description: "Déclarations fiscales, TVA et procédures douanières",
      icon: FileText,
      color: "green"
    },
    {
      id: 3,
      name: "État civil",
      count: 156,
      description: "Actes d'état civil, cartes d'identité et passeports",
      icon: Users,
      color: "purple"
    },
    {
      id: 4,
      name: "Emploi",
      count: 78,
      description: "Contrats de travail, CNAS et procédures d'emploi",
      icon: Users,
      color: "orange"
    },
    {
      id: 5,
      name: "Environnement",
      count: 34,
      description: "Études d'impact et autorisations environnementales",
      icon: Building,
      color: "teal"
    },
    {
      id: 6,
      name: "Marchés publics",
      count: 92,
      description: "Appels d'offres et procédures de passation de marchés",
      icon: FileText,
      color: "indigo"
    },
    {
      id: 7,
      name: "Urbanisme",
      count: 127,
      description: "Permis de construire et autorisations d'urbanisme",
      icon: Building,
      color: "red"
    },
    {
      id: 8,
      name: "Justice",
      count: 203,
      description: "Procédures judiciaires et légalisation de documents",
      icon: Scale,
      color: "gray"
    }
  ];

  const featuredProcedures = [
    {
      id: 1,
      title: "Création d'une SARL",
      description: "Procédure complète de création d'une société à responsabilité limitée",
      institution: "CNRC",
      duration: "15 jours",
      difficulty: "Moyenne",
      views: 15234,
      rating: 4.8,
      lastUpdated: "2025-01-10",
      tags: ["Entreprise", "SARL", "Commerce"]
    },
    {
      id: 2,
      title: "Déclaration TVA mensuelle",
      description: "Guide pour déclarer la TVA mensuelle auprès de la DGI",
      institution: "DGI",
      duration: "2 heures",
      difficulty: "Facile",
      views: 23456,
      rating: 4.9,
      lastUpdated: "2025-01-08",
      tags: ["Fiscalité", "TVA", "Déclaration"]
    },
    {
      id: 3,
      title: "Demande de passeport biométrique",
      description: "Procédure de demande et renouvellement de passeport",
      institution: "Ministère de l'Intérieur",
      duration: "10 jours",
      difficulty: "Facile",
      views: 34567,
      rating: 4.7,
      lastUpdated: "2025-01-12",
      tags: ["État civil", "Passeport", "Identité"]
    },
    {
      id: 4,
      title: "Permis de construire",
      description: "Obtention d'un permis de construire pour logement individuel",
      institution: "APC",
      duration: "45 jours",
      difficulty: "Difficile",
      views: 12345,
      rating: 4.5,
      lastUpdated: "2025-01-05",
      tags: ["Urbanisme", "Construction", "Permis"]
    },
    {
      id: 5,
      title: "Inscription CNAS",
      description: "Inscription d'un employé à la sécurité sociale",
      institution: "CNAS",
      duration: "5 jours",
      difficulty: "Facile",
      views: 18765,
      rating: 4.6,
      lastUpdated: "2025-01-11",
      tags: ["Emploi", "Sécurité sociale", "CNAS"]
    },
    {
      id: 6,
      title: "Autorisation d'exploitation commerciale",
      description: "Demande d'autorisation pour activité commerciale",
      institution: "Wilaya",
      duration: "20 jours",
      difficulty: "Moyenne",
      views: 9876,
      rating: 4.4,
      lastUpdated: "2025-01-09",
      tags: ["Commerce", "Autorisation", "Exploitation"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      author: "Ahmed Benali",
      role: "Entrepreneur",
      company: "StartUp Tech DZ",
      content: "Grâce à cette plateforme, j'ai pu créer ma SARL en suivant exactement les étapes. Très clair et bien expliqué.",
      rating: 5,
      procedure: "Création d'une SARL",
      date: "2025-01-10",
      helpful: 45,
      avatar: "/avatars/ahmed.jpg"
    },
    {
      id: 2,
      author: "Fatima Zohra",
      role: "Comptable",
      company: "Cabinet Expert",
      content: "Les procédures fiscales sont enfin accessibles ! Mes clients apprécient la clarté des explications.",
      rating: 5,
      procedure: "Déclaration TVA",
      date: "2025-01-08",
      helpful: 38,
      avatar: "/avatars/fatima.jpg"
    },
    {
      id: 3,
      author: "Mohamed Tahar",
      role: "Architecte",
      company: "Atelier Design",
      content: "Le guide pour les permis de construire m'a fait gagner énormément de temps. Merci !",
      rating: 4,
      procedure: "Permis de construire",
      date: "2025-01-07",
      helpful: 29,
      avatar: "/avatars/mohamed.jpg"
    },
    {
      id: 4,
      author: "Aicha Mansouri",
      role: "RH Manager",
      company: "Entreprise Moderne",
      content: "Parfait pour gérer les inscriptions CNAS de nos employés. Interface intuitive.",
      rating: 5,
      procedure: "Inscription CNAS",
      date: "2025-01-06",
      helpful: 52,
      avatar: "/avatars/aicha.jpg"
    },
    {
      id: 5,
      author: "Karim Boucherit",
      role: "Commerçant",
      company: "Import Export KB",
      content: "Les procédures douanières enfin expliquées simplement. Très utile pour mon activité.",
      rating: 4,
      procedure: "Procédures douanières",
      date: "2025-01-05",
      helpful: 33,
      avatar: "/avatars/karim.jpg"
    },
    {
      id: 6,
      author: "Samira Hadj",
      role: "Juriste",
      company: "Cabinet Juridique",
      content: "Excellent outil de référence pour conseiller mes clients sur les démarches administratives.",
      rating: 5,
      procedure: "Légalisation documents",
      date: "2025-01-04",
      helpful: 41,
      avatar: "/avatars/samira.jpg"
    }
  ];

  const contributeOptions = [
    {
      id: 1,
      title: "Ajouter une procédure",
      description: "Contribuez en ajoutant de nouvelles procédures administratives",
      icon: Plus,
      action: "Ajouter",
      color: "emerald"
    },
    {
      id: 2,
      title: "Importer des documents",
      description: "Importez des documents pour enrichir les procédures",
      icon: Upload,
      action: "Importer",
      color: "blue"
    },
    {
      id: 3,
      title: "Rejoindre la communauté",
      description: "Participez aux discussions sur les procédures",
      icon: Users,
      action: "Rejoindre",
      color: "purple"
    },
    {
      id: 4,
      title: "Signaler un problème",
      description: "Aidez-nous à améliorer les procédures existantes",
      icon: Heart,
      action: "Signaler",
      color: "red"
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuickSearch = !quickSearchQuery || 
                              procedure.title.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
                              procedure.description.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
                              procedure.category.toLowerCase().includes(quickSearchQuery.toLowerCase());
    
    const matchesType = !selectedType || procedure.type === selectedType;
    const matchesStatus = !selectedStatus || procedure.status === selectedStatus;
    const matchesDigitization = !selectedDigitization || procedure.digitization === selectedDigitization;
    
    return matchesSearch && matchesQuickSearch && matchesType && matchesStatus && matchesDigitization;
  });

  // Pagination
  const {
    currentData: paginatedProcedures,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredProcedures,
    itemsPerPage: 10
  });

  // Pagination pour les institutions
  const {
    currentData: paginatedInstitutions,
    currentPage: institutionsCurrentPage,
    totalPages: institutionsTotalPages,
    itemsPerPage: institutionsItemsPerPage,
    totalItems: institutionsTotalItems,
    setCurrentPage: setInstitutionsCurrentPage,
    setItemsPerPage: setInstitutionsItemsPerPage
  } = usePagination({
    data: institutions,
    itemsPerPage: 6
  });

  // Pagination pour les types de procédures
  const {
    currentData: paginatedProcedureTypes,
    currentPage: typesCurrentPage,
    totalPages: typesTotalPages,
    itemsPerPage: typesItemsPerPage,
    totalItems: typesTotalItems,
    setCurrentPage: setTypesCurrentPage,
    setItemsPerPage: setTypesItemsPerPage
  } = usePagination({
    data: procedureTypes,
    itemsPerPage: 8
  });

  // Pagination pour les procédures en vedette
  const {
    currentData: paginatedFeaturedProcedures,
    currentPage: featuredCurrentPage,
    totalPages: featuredTotalPages,
    itemsPerPage: featuredItemsPerPage,
    totalItems: featuredTotalItems,
    setCurrentPage: setFeaturedCurrentPage,
    setItemsPerPage: setFeaturedItemsPerPage
  } = usePagination({
    data: featuredProcedures,
    itemsPerPage: 6
  });

  // Pagination pour les témoignages
  const {
    currentData: paginatedTestimonials,
    currentPage: testimonialsCurrentPage,
    totalPages: testimonialsTotalPages,
    itemsPerPage: testimonialsItemsPerPage,
    totalItems: testimonialsTotalItems,
    setCurrentPage: setTestimonialsCurrentPage,
    setItemsPerPage: setTestimonialsItemsPerPage
  } = usePagination({
    data: testimonials,
    itemsPerPage: 6
  });

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", button: "bg-purple-600 hover:bg-purple-700" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", button: "bg-orange-600 hover:bg-orange-700" },
      red: { bg: "bg-red-100", text: "text-red-600", button: "bg-red-600 hover:bg-red-700" }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getTabButtonClass = (tab: 'type' | 'status' | 'digitization') => {
    const isActive = activeTab === tab;
    return `px-4 py-2 font-medium transition-colors ${
      isActive 
        ? 'bg-emerald-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } ${tab === 'type' ? 'rounded-l-lg' : tab === 'digitization' ? 'rounded-r-lg' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Champ de recherche avec reconnaissance vocale */}
      <TabSearchField
        placeholder="Rechercher des procédures administratives..."
        onSearch={handleTabSearch}
        suggestions={[
          "Création d'entreprise",
          "Permis de construire",
          "Carte d'identité",
          "Passeport",
          "Acte de naissance",
          "Certificat de résidence",
          "Agrément commercial",
          "Licence d'importation"
        ]}
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">248</div>
            <div className="text-sm text-gray-600">Procédures</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1,542</div>
            <div className="text-sm text-gray-600">Utilisateurs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-sm text-gray-600">Organismes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">12.5</div>
            <div className="text-sm text-gray-600">Jours (moy.)</div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et boutons d'action modifiée */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="text-lg font-semibold">
          {filteredProcedures.length} procédure(s) trouvée(s)
        </div>
        
        <div className="flex gap-2 flex-wrap items-center">
          {/* Nouveau champ de recherche rapide */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Recherche rapide..."
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={handleFilter} type="button">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleSort} type="button">
            <SortAsc className="w-4 h-4 mr-2" />
            Trier
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('File d\'approbation clicked - redirection vers Alimentation de la Banque de Données');
              const event = new CustomEvent('navigate-to-section', {
                detail: 'bank-feeding-procedures-approval'
              });
              window.dispatchEvent(event);
            }}
            className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            File d'approbation
          </Button>
          
          <Button size="sm" onClick={() => {
            console.log('Ajouter une procédure clicked - redirection vers Alimentation de la Banque de Données');
            const event = new CustomEvent('navigate-to-section', {
              detail: 'bank-feeding-procedures-enrichment'
            });
            window.dispatchEvent(event);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une procédure
          </Button>
        </div>
      </div>

      {/* Filtre avec onglets Type, Statut et Numérisation */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex">
              <button
                onClick={() => setActiveTab('type')}
                className={getTabButtonClass('type')}
              >
                Type
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={getTabButtonClass('status')}
              >
                Statut
              </button>
              <button
                onClick={() => setActiveTab('digitization')}
                className={getTabButtonClass('digitization')}
              >
                Numérisation
              </button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-2">
              {activeTab === 'type' && types.map((type) => (
                <Badge
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedType === type.id || (selectedType === null && type.id === 'all')
                      ? `${type.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
              
              {activeTab === 'status' && statuses.map((status) => (
                <Badge
                  key={status.id}
                  variant={selectedStatus === status.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedStatus === status.id || (selectedStatus === null && status.id === 'all')
                      ? `${status.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleStatusSelect(status.id)}
                >
                  {status.label}
                </Badge>
              ))}
              
              {activeTab === 'digitization' && digitizationOptions.map((option) => (
                <Badge
                  key={option.id}
                  variant={selectedDigitization === option.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm ${
                    selectedDigitization === option.id || (selectedDigitization === null && option.id === 'all')
                      ? `${option.color} text-white hover:opacity-80`
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleDigitizationSelect(option.id)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des procédures avec pagination */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedProcedures.map((procedure) => (
            <Card key={procedure.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{procedure.title}</h3>
                      <Badge variant="secondary">{procedure.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{procedure.popularity}%</span>
                      </div>
                      <Badge 
                        variant={
                          procedure.digitization === 'yes' ? 'default' :
                          procedure.digitization === 'partially' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {procedure.digitization === 'yes' ? 'Numérisée' : 
                         procedure.digitization === 'partially' ? 'Partiellement' : 'Non numérisée'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{procedure.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Durée: {procedure.duration}</span>
                      </div>
                      <div>
                        Complexité: <Badge variant={
                          procedure.complexity === 'Faible' ? 'default' :
                          procedure.complexity === 'Moyenne' ? 'secondary' : 'destructive'
                        }>{procedure.complexity}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProcedure(procedure)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredProcedures.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}
      </div>

      {/* Onglets horizontaux pour les éléments */}
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="types">Types de procédures</TabsTrigger>
          <TabsTrigger value="featured">Procédures en vedette</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages récents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedInstitutions.map((institution) => {
              const IconComponent = institution.icon;
              return (
                <Card key={institution.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{institution.name}</CardTitle>
                        <p className="text-sm text-gray-600">{institution.type}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{institution.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-600">
                        {institution.proceduresCount} procédures
                      </span>
                      <Button variant="outline" size="sm">
                        Voir les procédures
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Pagination pour les institutions */}
          <div className="mt-6">
            <Pagination
              currentPage={institutionsCurrentPage}
              totalPages={institutionsTotalPages}
              totalItems={institutionsTotalItems}
              itemsPerPage={institutionsItemsPerPage}
              onPageChange={setInstitutionsCurrentPage}
              onItemsPerPageChange={setInstitutionsItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedProcedureTypes.map((type) => {
              const IconComponent = type.icon;
              const colorClasses = getColorClasses(type.color);
              return (
                <Card key={type.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                        <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                        <p className="text-sm text-gray-600">{type.count} procédures</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Parcourir
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Pagination pour les types de procédures */}
          <div className="mt-6">
            <Pagination
              currentPage={typesCurrentPage}
              totalPages={typesTotalPages}
              totalItems={typesTotalItems}
              itemsPerPage={typesItemsPerPage}
              onPageChange={setTypesCurrentPage}
              onItemsPerPageChange={setTypesItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {paginatedFeaturedProcedures.map((procedure) => (
              <Card key={procedure.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{procedure.institution}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{procedure.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{procedure.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{procedure.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Durée :</span>
                      <span className="font-medium">{procedure.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Difficulté :</span>
                      <Badge variant={procedure.difficulty === 'Facile' ? 'default' : procedure.difficulty === 'Moyenne' ? 'secondary' : 'destructive'}>
                        {procedure.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Vues :</span>
                      <span className="font-medium">{procedure.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {procedure.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSelectedProcedure(procedure);
                      setIsConsultationModalOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les procédures en vedette */}
          <div className="mt-6">
            <Pagination
              currentPage={featuredCurrentPage}
              totalPages={featuredTotalPages}
              totalItems={featuredTotalItems}
              itemsPerPage={featuredItemsPerPage}
              onPageChange={setFeaturedCurrentPage}
              onItemsPerPageChange={setFeaturedItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                      <p className="text-sm text-gray-600">{testimonial.role} - {testimonial.company}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm text-gray-700 mb-3 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Procédure : {testimonial.procedure}</span>
                    <span>{testimonial.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {testimonial.helpful} personnes ont trouvé cela utile
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Utile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les témoignages */}
          <div className="mt-6">
            <Pagination
              currentPage={testimonialsCurrentPage}
              totalPages={testimonialsTotalPages}
              totalItems={testimonialsTotalItems}
              itemsPerPage={testimonialsItemsPerPage}
              onPageChange={setTestimonialsCurrentPage}
              onItemsPerPageChange={setTestimonialsItemsPerPage}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Contribuez à la base de données */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Contribuez à la base de données des procédures administratives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contributeOptions.map((option) => {
            const IconComponent = option.icon;
            const colorClasses = getColorClasses(option.color);
            return (
              <Card key={option.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${colorClasses.bg} mb-3`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-center">
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <Button 
                      className={`w-full ${colorClasses.button}`}
                      onClick={() => {
                        if (option.id === 1) {
                          onAddProcedure?.();
                        } else if (option.id === 2) {
                          // Importer des documents
                          import('@/utils/modalManager').then(({ openDataImportModal }) => {
                            openDataImportModal();
                          });
                        } else if (option.id === 3) {
                          // Rejoindre la communauté - naviguer vers le forum
                          window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'forum' }));
                        } else if (option.id === 4) {
                          // Signaler un problème
                          import('@/utils/modalManager').then(({ openDocumentSuggestionModal }) => {
                            openDocumentSuggestionModal();
                          });
                        }
                      }}
                    >
                      {option.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modales */}
      <SimpleFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleFiltersApplied}
      />

      <SimpleSortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onApplySort={handleSortApplied}
      />

      <ProcedureConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        procedure={selectedProcedure}
      />
    </div>
  );
}

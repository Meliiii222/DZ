import { Search, MapPin, Bot, Bookmark, TrendingUp } from "lucide-react";
import { SearchCard } from "../common/SearchCard";
import { SavedItemsList } from "../common/SavedItemsList";
import { PopularItemsList } from "../common/PopularItemsList";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";

export function ProcedurePopularSearchesTab() {
  const searchCards = [
    {
      title: "Recherche avancée",
      description: "Outils de recherche avancée avec filtres par type de procédure, wilaya, délais et complexité",
      icon: Search,
      buttonText: "Recherche avancée",
      buttonColor: "blue" as const,
      transparent: true
    },
    {
      title: "Recherche par Géolocalisation", 
      description: "Trouvez des procédures administratives spécifiques à votre wilaya ou commune en Algérie",
      icon: MapPin,
      buttonText: "Recherche géolocalisée",
      buttonColor: "emerald" as const,
      transparent: true
    },
    {
      title: "Recherche Intelligente",
      description: "Recherche avancée avec traitement automatique du langage naturel pour les procédures",
      icon: Bot,
      buttonText: "Recherche IA", 
      buttonColor: "purple" as const,
      transparent: true
    }
  ];

  const savedProcedureSearches = [
    {
      id: 1,
      title: "Demande de passeport biométrique",
      date: "12 jan 2025",
      results: 156,
      category: "Identité",
      lastAccessed: "Il y a 1 jour",
      authority: "Wilaya d'Alger"
    },
    {
      id: 2,
      title: "Création d'entreprise EURL", 
      date: "10 jan 2025",
      results: 89,
      category: "Commercial",
      lastAccessed: "Il y a 3 jours",
      authority: "CNRC"
    },
    {
      id: 3,
      title: "Permis de construire individuel",
      date: "8 jan 2025",
      results: 67, 
      category: "Urbanisme",
      lastAccessed: "Il y a 1 semaine",
      authority: "APC Oran"
    },
    {
      id: 4,
      title: "Certificat de résidence",
      date: "6 jan 2025",
      results: 234,
      category: "Administration", 
      lastAccessed: "Il y a 2 jours",
      authority: "Commune de Constantine"
    },
    {
      id: 5,
      title: "Demande de carte d'identité",
      date: "4 jan 2025",
      results: 189,
      category: "Identité",
      lastAccessed: "Il y a 4 jours",
      authority: "Wilaya d'Oran"
    },
    {
      id: 6,
      title: "Acte de naissance en ligne",
      date: "2 jan 2025",
      results: 312,
      category: "État civil",
      lastAccessed: "Il y a 1 jour",
      authority: "Commune d'Alger"
    },
    {
      id: 7,
      title: "Permis de conduire catégorie B",
      date: "30 déc 2024",
      results: 145,
      category: "Transport",
      lastAccessed: "Il y a 3 jours",
      authority: "Wilaya de Constantine"
    },
    {
      id: 8,
      title: "Création d'entreprise SARL",
      date: "28 déc 2024",
      results: 78,
      category: "Commercial",
      lastAccessed: "Il y a 1 semaine",
      authority: "CNRC"
    },
    {
      id: 9,
      title: "Certificat de scolarité",
      date: "26 déc 2024",
      results: 267,
      category: "Éducation",
      lastAccessed: "Il y a 2 jours",
      authority: "Ministère de l'Éducation"
    },
    {
      id: 10,
      title: "Attestation de travail",
      date: "24 déc 2024",
      results: 198,
      category: "Travail",
      lastAccessed: "Il y a 5 jours",
      authority: "Ministère du Travail"
    },
    {
      id: 11,
      title: "Certificat de propriété",
      date: "22 déc 2024",
      results: 89,
      category: "Propriété",
      lastAccessed: "Il y a 1 semaine",
      authority: "Conservation foncière"
    },
    {
      id: 12,
      title: "Demande de logement social",
      date: "20 déc 2024",
      results: 345,
      category: "Logement",
      lastAccessed: "Il y a 3 jours",
      authority: "Ministère de l'Habitat"
    }
  ];

  // Pagination pour les recherches sauvegardées
  const {
    currentData: paginatedSavedSearches,
    currentPage: savedSearchesCurrentPage,
    totalPages: savedSearchesTotalPages,
    itemsPerPage: savedSearchesItemsPerPage,
    totalItems: savedSearchesTotalItems,
    setCurrentPage: setSavedSearchesCurrentPage,
    setItemsPerPage: setSavedSearchesItemsPerPage
  } = usePagination({
    data: savedProcedureSearches,
    itemsPerPage: 6
  });

  const popularProcedures = [
    {
      query: "Demande de passeport",
      count: "67,891 recherches",
      category: "Identité", 
      wilaya: "National",
      trend: "+15%",
      description: "Procédures d'obtention de passeport"
    },
    {
      query: "Acte de naissance",
      count: "54,234 recherches",
      category: "État civil",
      wilaya: "National", 
      trend: "+8%",
      description: "Demande d'extrait d'acte de naissance"
    },
    {
      query: "Carte d'identité nationale",
      count: "48,567 recherches", 
      category: "Identité",
      wilaya: "National",
      trend: "+12%",
      description: "Renouvellement carte d'identité"
    },
    {
      query: "Permis de conduire",
      count: "42,901 recherches",
      category: "Transport",
      wilaya: "National",
      trend: "+22%", 
      description: "Obtention du permis de conduire"
    },
    {
      query: "Certificat de résidence",
      count: "38,876 recherches",
      category: "Administration",
      wilaya: "National",
      trend: "+18%",
      description: "Attestation de domicile"
    },
    {
      query: "Création d'entreprise", 
      count: "35,234 recherches",
      category: "Commercial",
      wilaya: "National",
      trend: "+25%",
      description: "Immatriculation au registre du commerce"
    },
    {
      query: "Permis de construire",
      count: "28,456 recherches",
      category: "Urbanisme",
      wilaya: "National", 
      trend: "+10%",
      description: "Autorisation de construction"
    },
    {
      query: "Certificat de scolarité",
      count: "24,789 recherches",
      category: "Éducation",
      wilaya: "National",
      trend: "+14%",
      description: "Attestation de scolarité"
    },
    {
      query: "Attestation de travail",
      count: "22,345 recherches",
      category: "Travail",
      wilaya: "National",
      trend: "+16%",
      description: "Certificat d'emploi"
    },
    {
      query: "Certificat de propriété",
      count: "19,678 recherches",
      category: "Propriété",
      wilaya: "National",
      trend: "+9%",
      description: "Attestation de propriété foncière"
    },
    {
      query: "Demande de logement social",
      count: "18,234 recherches",
      category: "Logement",
      wilaya: "National",
      trend: "+20%",
      description: "Demande de logement social"
    },
    {
      query: "Certificat de mariage",
      count: "16,789 recherches",
      category: "État civil",
      wilaya: "National",
      trend: "+7%",
      description: "Extrait d'acte de mariage"
    }
  ];

  // Pagination pour les procédures populaires
  const {
    currentData: paginatedPopularProcedures,
    currentPage: popularProceduresCurrentPage,
    totalPages: popularProceduresTotalPages,
    itemsPerPage: popularProceduresItemsPerPage,
    totalItems: popularProceduresTotalItems,
    setCurrentPage: setPopularProceduresCurrentPage,
    setItemsPerPage: setPopularProceduresItemsPerPage
  } = usePagination({
    data: popularProcedures,
    itemsPerPage: 6
  });

  const statistics = {
    monthlySearches: "850K",
    wilayas: "48", 
    procedures: "1,567",
    evolution: "+16%"
  };

  return (
    <div className="space-y-6">
      <PopularItemsList
        title="Procédures administratives populaires"
        description="Les procédures les plus recherchées par les citoyens algériens"
        icon={TrendingUp}
        items={paginatedPopularProcedures}
        statistics={statistics}
        pagination={{
          currentPage: popularProceduresCurrentPage,
          totalPages: popularProceduresTotalPages,
          totalItems: popularProceduresTotalItems,
          itemsPerPage: popularProceduresItemsPerPage,
          onPageChange: setPopularProceduresCurrentPage,
          onItemsPerPageChange: setPopularProceduresItemsPerPage
        }}
      />
      
      <SavedItemsList
        title="Recherches sauvegardées"
        description="Vos recherches récentes et favoris"
        icon={Bookmark}
        items={paginatedSavedSearches}
        pagination={{
          currentPage: savedSearchesCurrentPage,
          totalPages: savedSearchesTotalPages,
          totalItems: savedSearchesTotalItems,
          itemsPerPage: savedSearchesItemsPerPage,
          onPageChange: setSavedSearchesCurrentPage,
          onItemsPerPageChange: setSavedSearchesItemsPerPage
        }}
      />
    </div>
  );
}
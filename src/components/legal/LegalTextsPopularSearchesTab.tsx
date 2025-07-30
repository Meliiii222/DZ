import { Search, MapPin, Bot, Bookmark, TrendingUp } from "lucide-react";
import { SearchCard } from "../common/SearchCard";
import { SavedItemsList } from "../common/SavedItemsList";
import { PopularItemsList } from "../common/PopularItemsList";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";

export function LegalTextsPopularSearchesTab() {
  const searchCards = [
    {
      title: "Recherche avancée",
      description: "Outils de recherche avancée avec filtres par type de texte, date, autorité et domaine juridique",
      icon: Search,
      buttonText: "Recherche avancée",
      buttonColor: "blue" as const,
      transparent: true
    },
    {
      title: "Recherche par Géolocalisation", 
      description: "Trouvez des textes juridiques spécifiques à votre wilaya ou région en Algérie",
      icon: MapPin,
      buttonText: "Recherche géolocalisée",
      buttonColor: "emerald" as const,
      transparent: true
    },
    {
      title: "Recherche Intelligente",
      description: "Recherche avancée avec traitement automatique du langage naturel et analyse sémantique",
      icon: Bot,
      buttonText: "Recherche IA", 
      buttonColor: "purple" as const,
      transparent: true
    }
  ];

  const savedLegalSearches = [
    {
      id: 1,
      title: "Code civil algérien - Obligations et contrats",
      date: "12 jan 2025",
      results: 234,
      category: "Civil",
      lastAccessed: "Il y a 2 jours",
      authority: "Assemblée Populaire Nationale"
    },
    {
      id: 2,
      title: "Lois sur l'investissement - Secteur privé", 
      date: "10 jan 2025",
      results: 156,
      category: "Économique",
      lastAccessed: "Il y a 5 jours",
      authority: "Conseil des Ministres"
    },
    {
      id: 3,
      title: "Réglementation environnementale - Algérie",
      date: "8 jan 2025",
      results: 89, 
      category: "Environnement",
      lastAccessed: "Il y a 1 semaine",
      authority: "Ministère de l'Environnement"
    },
    {
      id: 4,
      title: "Code du travail - Relations collectives",
      date: "6 jan 2025",
      results: 198,
      category: "Social", 
      lastAccessed: "Il y a 3 jours",
      authority: "Ministère du Travail"
    },
    {
      id: 5,
      title: "Code de procédure civile - Voies de recours",
      date: "4 jan 2025",
      results: 167,
      category: "Procédure",
      lastAccessed: "Il y a 1 jour",
      authority: "Assemblée Populaire Nationale"
    },
    {
      id: 6,
      title: "Loi sur les marchés publics - Procédures",
      date: "2 jan 2025",
      results: 145,
      category: "Administratif",
      lastAccessed: "Il y a 4 jours",
      authority: "Ministère des Finances"
    },
    {
      id: 7,
      title: "Code pénal - Infractions économiques",
      date: "30 déc 2024",
      results: 178,
      category: "Pénal",
      lastAccessed: "Il y a 6 jours",
      authority: "Assemblée Populaire Nationale"
    },
    {
      id: 8,
      title: "Loi sur la propriété intellectuelle",
      date: "28 déc 2024",
      results: 123,
      category: "Propriété intellectuelle",
      lastAccessed: "Il y a 2 semaines",
      authority: "Ministère de la Culture"
    },
    {
      id: 9,
      title: "Code de commerce - Sociétés commerciales",
      date: "26 déc 2024",
      results: 189,
      category: "Commercial",
      lastAccessed: "Il y a 1 semaine",
      authority: "Assemblée Populaire Nationale"
    },
    {
      id: 10,
      title: "Loi sur l'urbanisme et l'aménagement",
      date: "24 déc 2024",
      results: 134,
      category: "Urbanisme",
      lastAccessed: "Il y a 3 jours",
      authority: "Ministère de l'Habitat"
    },
    {
      id: 11,
      title: "Code de la santé publique",
      date: "22 déc 2024",
      results: 156,
      category: "Santé",
      lastAccessed: "Il y a 5 jours",
      authority: "Ministère de la Santé"
    },
    {
      id: 12,
      title: "Loi sur l'éducation nationale",
      date: "20 déc 2024",
      results: 167,
      category: "Éducation",
      lastAccessed: "Il y a 2 semaines",
      authority: "Ministère de l'Éducation"
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
    data: savedLegalSearches,
    itemsPerPage: 10
  });

  const popularItems = [
    {
      query: "Code civil algérien",
      count: "45,234 recherches",
      category: "Civil", 
      wilaya: "National",
      trend: "+12%",
      description: "Dispositions civiles et obligations"
    },
    {
      query: "Loi de finances",
      count: "38,567 recherches",
      category: "Fiscal",
      wilaya: "National", 
      trend: "+18%",
      description: "Budget et fiscalité de l'État"
    },
    {
      query: "Code pénal",
      count: "32,901 recherches", 
      category: "Pénal",
      wilaya: "National",
      trend: "+8%",
      description: "Infractions et sanctions pénales"
    },
    {
      query: "Code de commerce",
      count: "29,345 recherches",
      category: "Commercial",
      wilaya: "National",
      trend: "+15%",
      description: "Règles du commerce et des sociétés"
    },
    {
      query: "Code du travail",
      count: "27,890 recherches",
      category: "Social",
      wilaya: "National",
      trend: "+22%",
      description: "Relations de travail et protection sociale"
    },
    {
      query: "Loi sur les marchés publics",
      count: "25,123 recherches",
      category: "Administratif",
      wilaya: "National",
      trend: "+9%",
      description: "Procédures d'achat public"
    },
    {
      query: "Code de procédure civile",
      count: "23,456 recherches",
      category: "Procédure",
      wilaya: "National",
      trend: "+11%",
      description: "Règles de procédure civile"
    },
    {
      query: "Loi sur l'investissement",
      count: "21,789 recherches",
      category: "Économique",
      wilaya: "National",
      trend: "+25%",
      description: "Encouragement à l'investissement"
    },
    {
      query: "Code de l'environnement",
      count: "19,567 recherches",
      category: "Environnement",
      wilaya: "National",
      trend: "+14%",
      description: "Protection de l'environnement"
    },
    {
      query: "Loi sur l'urbanisme",
      count: "18,234 recherches",
      category: "Urbanisme",
      wilaya: "National",
      trend: "+7%",
      description: "Aménagement du territoire"
    },
    {
      query: "Code de la santé",
      count: "16,789 recherches",
      category: "Santé",
      wilaya: "National",
      trend: "+13%",
      description: "Santé publique et médicale"
    },
    {
      query: "Loi sur l'éducation",
      count: "15,456 recherches",
      category: "Éducation",
      wilaya: "National",
      trend: "+6%",
      description: "Système éducatif national"
    }
  ];

  // Pagination pour les éléments populaires
  const {
    currentData: paginatedPopularItems,
    currentPage: popularItemsCurrentPage,
    totalPages: popularItemsTotalPages,
    itemsPerPage: popularItemsItemsPerPage,
    totalItems: popularItemsTotalItems,
    setCurrentPage: setPopularItemsCurrentPage,
    setItemsPerPage: setPopularItemsItemsPerPage
  } = usePagination({
    data: popularItems,
    itemsPerPage: 10
  });

  const statistics = {
    monthlySearches: "1.2M",
    wilayas: "48", 
    procedures: "2,847",
    evolution: "+19%"
  };

  return (
    <div className="space-y-6">
      <PopularItemsList
        title="Recherches juridiques populaires"
        description="Les textes juridiques les plus consultés par les professionnels du droit"
        icon={TrendingUp}
        items={paginatedPopularItems}
        statistics={statistics}
        pagination={{
          currentPage: popularItemsCurrentPage,
          totalPages: popularItemsTotalPages,
          totalItems: popularItemsTotalItems,
          itemsPerPage: popularItemsItemsPerPage,
          onPageChange: setPopularItemsCurrentPage,
          onItemsPerPageChange: setPopularItemsItemsPerPage
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
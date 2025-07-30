
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Bot, 
  Bookmark,
  TrendingUp,
  History
} from "lucide-react";
import { SavedSearchesEnhanced } from "./SavedSearchesEnhanced";
import { SearchCard } from "./common/SearchCard";
import { SavedItemsList } from "./common/SavedItemsList";
import { PopularItemsList } from "./common/PopularItemsList";
import { ProcedureSearchHistoryTab } from "./procedures/ProcedureSearchHistoryTab";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";

export function ProcedureSearchSection() {
  const searchCards = [
    {
      title: "Recherche avancée",
      description: "Outils de recherche avancée avec filtres multiples et critères spécifiques",
      icon: Search,
      buttonText: "Recherche avancée",
      buttonColor: "blue" as const,
      transparent: true
    },
    {
      title: "Recherche par Géolocalisation", 
      description: "Trouvez des procédures spécifiques à votre wilaya en Algérie",
      icon: MapPin,
      buttonText: "Recherche géolocalisée",
      buttonColor: "emerald" as const,
      transparent: true
    },
    {
      title: "Recherche Intelligente",
      description: "Recherche avancée avec traitement automatique du langage naturel et IA",
      icon: Bot,
      buttonText: "Recherche IA", 
      buttonColor: "purple" as const,
      transparent: true
    }
  ];

  const savedProcedureSearches = [
    {
      id: 1,
      title: "Passeport biométrique algérien - Consulat de France",
      date: "12 jan 2025",
      results: 45,
      category: "Identité",
      lastAccessed: "Il y a 2 jours",
      wilaya: "Alger"
    },
    {
      id: 2,
      title: "Création EURL Algérie - CNRC Oran", 
      date: "10 jan 2025",
      results: 67,
      category: "Commercial",
      lastAccessed: "Il y a 5 jours",
      wilaya: "Oran"
    },
    {
      id: 3,
      title: "Permis de conduire catégorie B - Wilaya Constantine",
      date: "8 jan 2025",
      results: 89, 
      category: "Transport",
      lastAccessed: "Il y a 1 semaine",
      wilaya: "Constantine"
    },
    {
      id: 4,
      title: "Acte de naissance - État civil Tizi Ouzou",
      date: "6 jan 2025",
      results: 34,
      category: "État civil", 
      lastAccessed: "Il y a 3 jours",
      wilaya: "Tizi Ouzou"
    },
    {
      id: 5,
      title: "Carte d'identité nationale - Commune d'Alger",
      date: "4 jan 2025",
      results: 56,
      category: "Identité",
      lastAccessed: "Il y a 1 jour",
      wilaya: "Alger"
    },
    {
      id: 6,
      title: "Certificat de résidence - Wilaya d'Oran",
      date: "2 jan 2025",
      results: 23,
      category: "Administratif",
      lastAccessed: "Il y a 4 jours",
      wilaya: "Oran"
    },
    {
      id: 7,
      title: "Attestation de travail - Ministère du Travail",
      date: "30 déc 2024",
      results: 78,
      category: "Social",
      lastAccessed: "Il y a 6 jours",
      wilaya: "Alger"
    },
    {
      id: 8,
      title: "Licence commerciale - Wilaya de Constantine",
      date: "28 déc 2024",
      results: 45,
      category: "Commercial",
      lastAccessed: "Il y a 2 semaines",
      wilaya: "Constantine"
    },
    {
      id: 9,
      title: "Certificat médical - Hôpital d'Alger",
      date: "26 déc 2024",
      results: 67,
      category: "Santé",
      lastAccessed: "Il y a 1 semaine",
      wilaya: "Alger"
    },
    {
      id: 10,
      title: "Attestation de scolarité - Université d'Oran",
      date: "24 déc 2024",
      results: 34,
      category: "Éducation",
      lastAccessed: "Il y a 3 jours",
      wilaya: "Oran"
    },
    {
      id: 11,
      title: "Certificat de propriété - Conservateur d'Alger",
      date: "22 déc 2024",
      results: 89,
      category: "Propriété",
      lastAccessed: "Il y a 5 jours",
      wilaya: "Alger"
    },
    {
      id: 12,
      title: "Attestation de domicile - Commune de Constantine",
      date: "20 déc 2024",
      results: 23,
      category: "Administratif",
      lastAccessed: "Il y a 2 semaines",
      wilaya: "Constantine"
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
    itemsPerPage: 10
  });

  const popularItems = [
    {
      query: "Passeport biométrique",
      count: "32,456 recherches",
      category: "État civil",
      wilaya: "National",
      trend: "+12%",
      description: "Passeport biométrique ordinaire et service"
    },
    {
      query: "Permis de conduire",
      count: "18,901 recherches", 
      category: "Transport",
      wilaya: "National",
      trend: "+8%",
      description: "Permis biométrique catégories A, B, C"
    },
    {
      query: "Carte d'identité nationale",
      count: "22,345 recherches",
      category: "État civil",
      wilaya: "National",
      trend: "+5%", 
      description: "CIN biométrique avec puce électronique"
    },
    {
      query: "Inscription universitaire",
      count: "9,876 recherches",
      category: "Éducation",
      wilaya: "National",
      trend: "+25%",
      description: "Orientation et inscription MESRS"
    },
    {
      query: "Certificat de résidence", 
      count: "8,234 recherches",
      category: "Administration",
      wilaya: "Communal",
      trend: "+7%",
      description: "Attestation domicile APC"
    },
    {
      query: "Agrément d'importation",
      count: "7,456 recherches",
      category: "Commercial",
      wilaya: "National", 
      trend: "+22%",
      description: "Licence d'importation CNIS"
    },
    {
      query: "Certificat médical",
      count: "6,789 recherches",
      category: "Santé",
      wilaya: "National",
      trend: "+15%",
      description: "Aptitude physique et mentale"
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
    monthlySearches: "247k",
    wilayas: "48", 
    procedures: "156",
    evolution: "+14%"
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search" className="text-sm">
            Recherche
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm">
            Historique des recherches
          </TabsTrigger>
          <TabsTrigger value="saved-searches" className="text-sm">
            Recherches sauvegardées
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchCards.map((card, index) => (
                <SearchCard key={index} {...card} />
              ))}
            </div>

            <SavedItemsList
              title="Recherches sauvegardées"
              description="Vos dernières recherches de procédures administratives algériennes"
              icon={Bookmark}
              items={paginatedSavedSearches}
              onViewAll={() => {}}
              pagination={{
                currentPage: savedSearchesCurrentPage,
                totalPages: savedSearchesTotalPages,
                totalItems: savedSearchesTotalItems,
                itemsPerPage: savedSearchesItemsPerPage,
                onPageChange: setSavedSearchesCurrentPage,
                onItemsPerPageChange: setSavedSearchesItemsPerPage
              }}
            />

            <PopularItemsList
              title="Recherches populaires en Algérie"
              description="Les procédures les plus recherchées par les citoyens algériens"
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
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <ProcedureSearchHistoryTab />
        </TabsContent>
        
        <TabsContent value="saved-searches" className="mt-6">
          <SavedSearchesEnhanced />
        </TabsContent>
      </Tabs>
    </div>
  );
}

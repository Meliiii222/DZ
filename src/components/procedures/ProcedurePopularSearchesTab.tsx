import { Search, MapPin, Bot, Bookmark, TrendingUp } from "lucide-react";
import { SearchCard } from "../common/SearchCard";
import { SavedItemsList } from "../common/SavedItemsList";
import { PopularItemsList } from "../common/PopularItemsList";

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
    }
  ];

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
    }
  ];

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
        items={popularProcedures}
        statistics={statistics}
      />
    </div>
  );
}
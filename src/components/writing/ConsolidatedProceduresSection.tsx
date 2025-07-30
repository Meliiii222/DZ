import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  ClipboardList, 
  Search, 
  Calendar,
  Building,
  Clock,
  Download,
  Eye,
  Settings,
  Filter,
  CheckCircle
} from "lucide-react";

export function ConsolidatedProceduresSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const consolidatedProcedures = [
    {
      id: 1,
      titre: "Création d'entreprise SARL - Procédure complète",
      categorie: "Commerce et Investissement",
      institution: "CNRC & Ministère du Commerce",
      etapes: 12,
      duree: "15-30 jours",
      documents: 8,
      derniereMiseAJour: "10 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 92
    },
    {
      id: 2,
      titre: "Demande de passeport biométrique",
      categorie: "Documents d'identité",
      institution: "Ministère de l'Intérieur",
      etapes: 6,
      duree: "7-14 jours",
      documents: 5,
      derniereMiseAJour: "2024-01-15",
      statut: "Validée",
      difficulte: "Facile",
      taux_reussite: 98
    },
    {
      id: 3,
      titre: "Permis de construire résidentiel",
      categorie: "Urbanisme et Construction",
      institution: "APC & Direction de l'Urbanisme",
      etapes: 18,
      duree: "45-90 jours",
      documents: 15,
      derniereMiseAJour: "05 janvier 2024",
      statut: "En révision",
      difficulte: "Difficile",
      taux_reussite: 76
    },
    {
      id: 4,
      titre: "Obtention de l'agrément d'importation",
      categorie: "Commerce extérieur",
      institution: "Ministère du Commerce",
      etapes: 10,
      duree: "20-40 jours",
      documents: 12,
      derniereMiseAJour: "08 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 85
    },
    {
      id: 5,
      titre: "Demande de carte nationale d'identité",
      categorie: "Documents d'identité",
      institution: "Ministère de l'Intérieur",
      etapes: 4,
      duree: "5-10 jours",
      documents: 3,
      derniereMiseAJour: "12 janvier 2024",
      statut: "Validée",
      difficulte: "Facile",
      taux_reussite: 95
    },
    {
      id: 6,
      titre: "Licence d'exploitation commerciale",
      categorie: "Commerce",
      institution: "APC & Ministère du Commerce",
      etapes: 8,
      duree: "15-25 jours",
      documents: 6,
      derniereMiseAJour: "15 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 88
    },
    {
      id: 7,
      titre: "Demande de visa de travail",
      categorie: "Immigration",
      institution: "Ministère des Affaires Étrangères",
      etapes: 15,
      duree: "30-60 jours",
      documents: 12,
      derniereMiseAJour: "18 janvier 2024",
      statut: "En révision",
      difficulte: "Difficile",
      taux_reussite: 72
    },
    {
      id: 8,
      titre: "Certificat de conformité technique",
      categorie: "Industrie",
      institution: "Institut Algérien de Normalisation",
      etapes: 6,
      duree: "10-20 jours",
      documents: 4,
      derniereMiseAJour: "20 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 90
    },
    {
      id: 9,
      titre: "Demande de pension de retraite",
      categorie: "Sécurité Sociale",
      institution: "Caisse Nationale des Retraites",
      etapes: 7,
      duree: "20-30 jours",
      documents: 8,
      derniereMiseAJour: "22 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 82
    },
    {
      id: 10,
      titre: "Licence de transport de marchandises",
      categorie: "Transport",
      institution: "Ministère des Transports",
      etapes: 12,
      duree: "25-40 jours",
      documents: 10,
      derniereMiseAJour: "25 janvier 2024",
      statut: "En révision",
      difficulte: "Difficile",
      taux_reussite: 78
    },
    {
      id: 11,
      titre: "Demande de carte d'invalidité",
      categorie: "Sécurité Sociale",
      institution: "Ministère de la Solidarité",
      etapes: 5,
      duree: "15-25 jours",
      documents: 6,
      derniereMiseAJour: "28 janvier 2024",
      statut: "Validée",
      difficulte: "Moyen",
      taux_reussite: 85
    },
    {
      id: 12,
      titre: "Autorisation d'ouverture de pharmacie",
      categorie: "Santé",
      institution: "Ministère de la Santé",
      etapes: 14,
      duree: "30-45 jours",
      documents: 12,
      derniereMiseAJour: "30 janvier 2024",
      statut: "Validée",
      difficulte: "Difficile",
      taux_reussite: 75
    }
  ];

  // Pagination pour les procédures consolidées
  const {
    currentData: paginatedProcedures,
    currentPage: proceduresCurrentPage,
    totalPages: proceduresTotalPages,
    itemsPerPage: proceduresItemsPerPage,
    totalItems: proceduresTotalItems,
    setCurrentPage: setProceduresCurrentPage,
    setItemsPerPage: setProceduresItemsPerPage
  } = usePagination({
    data: consolidatedProcedures,
    itemsPerPage: 10
  });

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Validée": return "bg-green-100 text-green-800";
      case "En révision": return "bg-yellow-100 text-yellow-800";
      case "Obsolète": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case "Facile": return "bg-green-100 text-green-800";
      case "Moyen": return "bg-yellow-100 text-yellow-800";
      case "Difficile": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSuccessRateColor = (taux: number) => {
    if (taux >= 90) return "text-green-600";
    if (taux >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher dans les procédures consolidées..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des procédures consolidées */}
      <div className="grid grid-cols-1 gap-4">
        {paginatedProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <ClipboardList className="w-5 h-5 text-teal-600" />
                    {procedure.titre}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">
                      {procedure.categorie}
                    </Badge>
                    <Badge className={getStatusColor(procedure.statut)}>
                      {procedure.statut}
                    </Badge>
                    <Badge className={getDifficultyColor(procedure.difficulte)}>
                      {procedure.difficulte}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {procedure.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Mis à jour: {procedure.derniereMiseAJour}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getSuccessRateColor(procedure.taux_reussite)}`}>
                    {procedure.taux_reussite}%
                  </div>
                  <div className="text-xs text-gray-500">Taux de réussite</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{procedure.etapes}</div>
                  <div className="text-xs text-gray-600">Étapes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{procedure.documents}</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{procedure.duree}</div>
                  <div className="text-xs text-gray-600">Délai</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-600">Vérifiée</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  Durée moyenne: {procedure.duree}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir détails
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Guide PDF
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Commencer la procédure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pagination pour les procédures consolidées */}
      <Pagination
        currentPage={proceduresCurrentPage}
        totalPages={proceduresTotalPages}
        totalItems={proceduresTotalItems}
        itemsPerPage={proceduresItemsPerPage}
        onPageChange={setProceduresCurrentPage}
        onItemsPerPageChange={setProceduresItemsPerPage}
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">48</div>
            <div className="text-sm text-gray-600">Procédures consolidées</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Taux de réussite moyen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">32</div>
            <div className="text-sm text-gray-600">Mises à jour ce mois</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">1.8k</div>
            <div className="text-sm text-gray-600">Procédures démarrées</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
